import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../cv/store/useCVStore';
import { selectCertificates } from '../../cv/store/cvSelectors';
import { createCertificate } from '../../cv/models/cvFactories';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function CertificatesEditor() {
  const certificates = useCVStore(selectCertificates) || [];
  const addCertificate = useCVStore((state) => state.addCertificate);
  const updateCertificate = useCVStore((state) => state.updateCertificate);
  const removeCertificate = useCVStore((state) => state.removeCertificate);

  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <div key={cert.id} className="bg-surface-muted border border-border p-3 rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
            <span className="text-xs font-bold text-foreground truncate">{cert.name || 'New Certificate'}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeCertificate(cert.id)}
              className="h-6 w-6 p-0 text-error shrink-0"
            >
              <Trash2 className="w-3 h-3" aria-hidden="true" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Name"
              value={cert.name || ''}
              onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
              lang="en"
              dir="ltr"
            />
            <Input
              placeholder="Issuer"
              value={cert.issuer || ''}
              onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
              lang="en"
              dir="ltr"
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        leadingIcon={Plus}
        onClick={() => addCertificate(createCertificate())}
        className="w-full border-dashed"
      >
        + Add Certificate
      </Button>
    </div>
  );
}
