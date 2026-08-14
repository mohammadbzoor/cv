import { useState, useRef, useEffect } from 'react';
import { SERVICE_STATUS } from '../../ai-services/contracts/serviceStatus';
import { runMatchService } from '../services/matchService';

export function useMatchCV() {
  const [status, setStatus] = useState(SERVICE_STATUS.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  async function execute(jobDescription, { shouldFail = false } = {}) {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setStatus(SERVICE_STATUS.LOADING);
    setError(null);

    try {
      const result = await runMatchService({
        jobDescription,
        shouldFail,
        signal: abortRef.current.signal,
      });
      setData(result);
      setStatus(SERVICE_STATUS.SUCCESS);
      return result;
    } catch (err) {
      if (err?.code !== 'REQUEST_CANCELLED') {
        setError(err);
        setStatus(SERVICE_STATUS.ERROR);
      }
      return null;
    }
  }

  function reset() {
    setStatus(SERVICE_STATUS.IDLE);
    setData(null);
    setError(null);
  }

  return {
    status,
    data,
    error,
    execute,
    retry: (jd) => execute(jd),
    reset,
    isLoading: status === SERVICE_STATUS.LOADING,
    isSuccess: status === SERVICE_STATUS.SUCCESS,
    isError: status === SERVICE_STATUS.ERROR,
  };
}
