import { CoreTileGroup } from '@org/shop-ui-core-tile';
import { FeedbackToolbar } from '@org/shop-ui-feedback-toolbar';
import { ChartsBanner } from '@org/shop-ui-charts-banner';
import type { SizingInsightsItem } from './sizing-insights.model';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';
import { describeSizingInsightsItem } from './sizing-insights.utils';

export interface SizingInsightsPanelProps {
  selected: SizingInsightsItem | null;
  onClear: () => void;
}

export function SizingInsightsPanel({
  selected,
  onClear,
}: SizingInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingInsightsItem(selected)}
      </p>
      <CoreTileGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <FeedbackToolbar
          label="Feedback Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <ChartsBanner
          label="Charts Banner"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
