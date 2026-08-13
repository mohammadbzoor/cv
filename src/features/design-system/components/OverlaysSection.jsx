import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { Tooltip } from '../../../components/ui/Tooltip';
import { Button } from '../../../components/ui/Button';
import { HelpCircle, Trash2 } from 'lucide-react';

export function OverlaysSection() {
  const { t } = useTranslation(['feedback', 'common']);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDestructiveOpen, setIsDestructiveOpen] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  function handleConfirmAction() {
    setLoadingConfirm(true);
    setTimeout(() => {
      setLoadingConfirm(false);
      setIsConfirmOpen(false);
      setIsDestructiveOpen(false);
    }, 1500);
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">عناصر الطبقات العائمة والتنبيهات (Overlays & Dialogs)</h2>
        <p className="text-sm text-foreground-secondary">
          مكونات النوافذ المنبثقة وحوارات التأكيد والتلميحات: Modal و ConfirmDialog و Tooltip.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Modal Showcase */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">النافذة المنبثقة (Modal)</h3>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            تعتمد على React Portal وقفل التمرير مع إدارة التركيز واستعادة موقع Focus السابق بعد الإغلاق.
          </p>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            فتح Modal التجريبي
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="تحديث البيانات الشخصية"
            description="قم بإدخال البيانات الجديدة لحفظها في ملفك."
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  {t('feedback:cancel')}
                </Button>
                <Button size="sm" onClick={() => setIsModalOpen(false)}>
                  {t('feedback:confirm')}
                </Button>
              </>
            }
          >
            <p className="text-sm text-foreground leading-relaxed">
              هذا نص توضيحي داخل النافذة المنبثقة. يدعم الإغلاق بزر Esc أو بالنقر على الخلفية أو بزر الإغلاق الصريح X.
            </p>
          </Modal>
        </div>

        {/* ConfirmDialog Showcase */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">حوارات التأكيد (ConfirmDialog)</h3>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            مكون حوار تأكيد مرن يعيد استخدام Modal و Button مع دعم حالة التحميل والعمليات المدمرة.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => setIsConfirmOpen(true)}>
              تأكيد عادي
            </Button>
            <Button size="sm" variant="danger" leadingIcon={Trash2} onClick={() => setIsDestructiveOpen(true)}>
              حذف مدمر
            </Button>
          </div>

          {/* Normal Confirm */}
          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmAction}
            title="تأكيد حفظ التغييرات"
            description="هل ترغب في اعتماد النسخة الجديدة للسيرة الذاتية؟"
            confirmLabel={t('feedback:confirm')}
            cancelLabel={t('feedback:cancel')}
            loading={loadingConfirm}
          />

          {/* Destructive Confirm */}
          <ConfirmDialog
            isOpen={isDestructiveOpen}
            onClose={() => setIsDestructiveOpen(false)}
            onConfirm={handleConfirmAction}
            title={t('feedback:deleteConfirmTitle')}
            description={t('feedback:deleteConfirmDesc')}
            confirmLabel={t('common:delete', 'حذف')}
            cancelLabel={t('feedback:cancel')}
            destructive
            loading={loadingConfirm}
          />
        </div>

        {/* Tooltip Showcase */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">التلميحات (Tooltip)</h3>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            تظهر عند التمرير بالماوس أو التركيز باللوحة المفاتيح وتدعم الاتجاهات المنطقية.
          </p>
          <div className="flex flex-wrap gap-3 items-center pt-2">
            <Tooltip content="تلميح من الأعلى (Top)" side="top">
              <Button size="sm" variant="outline">أعلى (Top)</Button>
            </Tooltip>
            <Tooltip content="تلميح من الأسفل (Bottom)" side="bottom">
              <Button size="sm" variant="outline">أسفل (Bottom)</Button>
            </Tooltip>
            <Tooltip content="تلميح مساند لمعايير التوظيف" side="start">
              <button type="button" className="p-2 text-foreground-secondary hover:text-foreground">
                <HelpCircle className="w-5 h-5" aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}
