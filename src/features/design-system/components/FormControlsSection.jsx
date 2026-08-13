import { useState } from 'react';
import { Select } from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { RadioGroup } from '../../../components/ui/RadioGroup';
import { Switch } from '../../../components/ui/Switch';
import { FormField } from '../../../components/ui/FormField';
import { Input } from '../../../components/ui/Input';

export function FormControlsSection() {
  const [selectVal, setSelectVal] = useState('');
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('option-1');
  const [switchVal, setSwitchVal] = useState(false);

  const options = [
    { value: 'option-1', label: 'الخيار الأول (Option 1)' },
    { value: 'option-2', label: 'الخيار الثاني (Option 2)' },
    { value: 'option-3', label: 'الخيار الثالث (Disabled Option 3)', disabled: true },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">عناصر التحديد والنماذج (Form Controls)</h2>
        <p className="text-sm text-foreground-secondary">
          مكونات الاختيار والتحديد: Select و Checkbox و RadioGroup و Switch و FormField.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Select */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">القائمة المنسدلة (Select)</h3>
          <Select
            label="اختر المستوى المهني"
            placeholder="اختر من القائمة..."
            options={options}
            value={selectVal}
            onChange={(e) => setSelectVal(e.target.value)}
            helperText="القائمة مبنية على عنصر select الأصلي لإمكانية وصول مثالية."
          />
          <Select
            label="اختيار مع خطأ"
            placeholder="اختر..."
            options={options}
            error="يرجى تحديد خيار من القائمة."
            required
          />
        </div>

        {/* Checkbox */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">مربع الاختيار (Checkbox)</h3>
          <Checkbox
            label="الموافقة على الشروط والأحكام"
            description="يجب الموافقة لمتابعة إنشاء السيرة الذاتية."
            checked={checkboxVal}
            onChange={(e) => setCheckboxVal(e.target.checked)}
          />
          <Checkbox
            label="حالة غير محددة (Indeterminate)"
            indeterminate
          />
          <Checkbox
            label="اختيار معطّل"
            disabled
            defaultChecked
          />
          <Checkbox
            label="اختيار مع خطأ"
            error="يجب تحديد هذا المربع للبدء."
          />
        </div>

        {/* RadioGroup */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">مجموعة الأزرار الدائرية (RadioGroup)</h3>
          <RadioGroup
            label="ترتيب الأقسام في السيرة الذاتية"
            options={options}
            value={radioVal}
            onChange={(e) => setRadioVal(e.target.value)}
            helperText="مبنية باستخدام fieldset و legend لحماية إمكانية الوصول."
          />
          <RadioGroup
            label="تنسيق الأفقية (Horizontal)"
            options={options.slice(0, 2)}
            defaultValue="option-1"
            orientation="horizontal"
          />
        </div>

        {/* Switch & FormField */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground-secondary">زر التبديل (Switch)</h3>
            <Switch
              label="تفعيل التحليل الذكي للوظائف"
              description="يساعد على مطابقة مهاراتك مع متطلبات سوق العمل."
              checked={switchVal}
              onChange={setSwitchVal}
            />
            <Switch
              label="تنبيهات البريد الإلكتروني (معطّل)"
              disabled
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/60">
            <h3 className="text-sm font-semibold text-foreground-secondary">حاوي النموذج (FormField Wrapper)</h3>
            <FormField
              label="عنوان البريد الإلكتروني الرسمي"
              description="سنرسل رابط التفعيل إلى هذا العنوان."
              required
            >
              <Input placeholder="name@company.com" type="email" />
            </FormField>
          </div>
        </div>
      </div>
    </section>
  );
}
