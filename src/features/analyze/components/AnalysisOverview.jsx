import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

export function AnalysisOverview({ result }) {
  if (!result) return null;

  const { overallScore, categories, strengths, weaknesses, recommendations } = result;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="p-6 text-center space-y-3 bg-surface border-primary/20">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Overall Readiness Score</h3>
        <div className="text-4xl font-black text-primary font-mono">{overallScore} / 100</div>
        <p className="text-xs text-foreground-secondary">
          {overallScore >= 80 ? 'Excellent formatting & ATS structure' : 'Good baseline, needs minor improvements'}
        </p>
      </Card>

      {/* Category Scores */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground">Category Score Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(categories).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-mono">{val}%</span>
              </div>
              <div className="w-full h-2 bg-surface-muted border border-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${val >= 80 ? 'bg-success' : 'bg-primary'}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Strengths */}
      <Card className="p-6 space-y-3 border-success/30 bg-success-subtle/10">
        <div className="flex items-center gap-2 text-success font-bold text-sm">
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          <h3>Key Strengths</h3>
        </div>
        <ul className="space-y-2 text-xs text-foreground-secondary">
          {strengths.map((str) => (
            <li key={str.id} className="flex items-start gap-2">
              <span className="text-success font-bold">•</span>
              <span>{str.message}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Weaknesses */}
      <Card className="p-6 space-y-3 border-warning/30 bg-warning-subtle/10">
        <div className="flex items-center gap-2 text-warning font-bold text-sm">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          <h3>Areas Needing Improvement</h3>
        </div>
        <ul className="space-y-2 text-xs text-foreground-secondary">
          {weaknesses.map((w) => (
            <li key={w.id} className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>{w.message}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="p-6 space-y-3 border-primary/30 bg-primary-subtle/10">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
            <h3>Actionable Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-surface rounded-xl border border-border space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{rec.title}</span>
                  <span className="uppercase text-[10px] font-mono px-2 py-0.5 bg-primary-subtle text-primary rounded">
                    {rec.priority}
                  </span>
                </div>
                <p className="text-foreground-secondary">{rec.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
