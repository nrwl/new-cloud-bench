import { ChartsToolbarGroup } from '@org/shop-ui-charts-toolbar';
import { NavigationCard } from '@org/shop-ui-navigation-card';
import { OverlayToolbar } from '@org/shop-ui-overlay-toolbar';
import type { ReviewsWizardItem } from './reviews-wizard.model';
import { REVIEWS_WIZARD_FEATURE } from './reviews-wizard.routes';
import { describeReviewsWizardItem } from './reviews-wizard.utils';

export interface ReviewsWizardPanelProps {
  selected: ReviewsWizardItem | null;
  onClear: () => void;
}

export function ReviewsWizardPanel({
  selected,
  onClear,
}: ReviewsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReviewsWizardItem(selected)}
      </p>
      <ChartsToolbarGroup
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
        <NavigationCard
          label="Navigation Card"
          value={selected.product.rating}
          size="sm"
        />
        <OverlayToolbar
          label="Overlay Toolbar"
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
        data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
