import { useCVStore } from '../../cv/store/useCVStore';
import { selectPersonalInfo } from '../../cv/store/cvSelectors';
import { Input } from '../../../components/ui/Input';

export function PersonalInfoEditor() {
  const personalInfo = useCVStore(selectPersonalInfo) || {};
  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);

  function handleChange(field, value) {
    updatePersonalInfo({ [field]: value });
  }

  return (
    <div className="space-y-3">
      <Input
        label="Full Name"
        value={personalInfo.fullName || ''}
        onChange={(e) => handleChange('fullName', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="Job Title"
        value={personalInfo.jobTitle || ''}
        onChange={(e) => handleChange('jobTitle', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="Email"
        type="email"
        value={personalInfo.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="Phone"
        type="tel"
        value={personalInfo.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="Location"
        value={personalInfo.location || ''}
        onChange={(e) => handleChange('location', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="Website"
        type="url"
        value={personalInfo.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="LinkedIn"
        type="url"
        value={personalInfo.linkedin || ''}
        onChange={(e) => handleChange('linkedin', e.target.value)}
        lang="en"
        dir="ltr"
      />

      <Input
        label="GitHub"
        type="url"
        value={personalInfo.github || ''}
        onChange={(e) => handleChange('github', e.target.value)}
        lang="en"
        dir="ltr"
      />
    </div>
  );
}
