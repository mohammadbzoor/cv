import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../../components/ui/Accordion';

export function NavigationSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">عناصر التنقل والقوائم (Navigation & Containers)</h2>
        <p className="text-sm text-foreground-secondary">
          مكونات التبويب والقوائم المنسدلة المتطابقة مع معايير WAI-ARIA: Tabs و Accordion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tabs */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">التبويبات (Tabs - Horizontal)</h3>
          <Tabs defaultValue="preview">
            <TabsList aria-label="أقسام المعاينة">
              <TabsTrigger value="preview">المعاينة الحية</TabsTrigger>
              <TabsTrigger value="editor">محرر السيرة</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-4 bg-app-bg rounded-lg">
              <p className="text-sm text-foreground">
                محتوى تبويب المعاينة الحية. تدعم التبويبات التنقل بالأسهم والأزرار Home و End مع مراعاة اتجاه اللغة RTL/LTR.
              </p>
            </TabsContent>
            <TabsContent value="editor" className="p-4 bg-app-bg rounded-lg">
              <p className="text-sm text-foreground">
                محتوى محرر السيرة الذاتية.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 bg-app-bg rounded-lg">
              <p className="text-sm text-foreground">
                محتوى قسم الإعدادات التفضيلية.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Accordion */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground-secondary">القائمة المنسدلة (Accordion - Collapsible)</h3>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>كيف تضمن التوافق مع أنظمة التوظيف (ATS)؟</AccordionTrigger>
              <AccordionContent>
                تُبنى جميع النماذج والقوالب وفقاً لمعايير الهيكلة الرقمية الواضحة التي تسمح بمسح البيانات وتصنيف المهارات بسلاسة.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>هل السيرة الذاتية تكون باللغة الإنجليزية دائماً؟</AccordionTrigger>
              <AccordionContent>
                نعم، واجهة المنصة تدعم العربية والإنجليزية، بينما يُبنى مستند السيرة الذاتية باللغة الإنجليزية دائماً وباتجاه LTR.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>ما هي خيارات التصدير المتاحة مستقبلاً؟</AccordionTrigger>
              <AccordionContent>
                ستدعم المنصة التصدير بصيغ PDF و DOCX مع الحفاظ على التنسيق والطباعة عالية الجودة.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
