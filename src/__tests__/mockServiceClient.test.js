import { describe, it, expect } from 'vitest';
import { mockServiceClient } from '../features/ai-services/services/mockServiceClient';

describe('Mock Service Client Utility', () => {
  it('resolves data payload asynchronously after simulated delay', async () => {
    const res = await mockServiceClient({ data: { message: 'hello' }, delay: 10 });
    expect(res).toEqual({ message: 'hello' });
  });

  it('handles controlled service failure', async () => {
    await expect(mockServiceClient({ data: {}, delay: 10, shouldFail: true })).rejects.toThrow();
  });

  it('supports cancellation via AbortSignal', async () => {
    const controller = new AbortController();
    const promise = mockServiceClient({ data: {}, delay: 100, signal: controller.signal });
    controller.abort();
    await expect(promise).rejects.toThrow();
  });
});
