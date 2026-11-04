import { ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { SearchSettingsSummary } from '@org/shop-feature-search-settings';
import { PromotionsDetailsFilters } from './promotions-details-filters';
import { PromotionsDetailsHeader } from './promotions-details-header';
import { PromotionsDetailsPanel } from './promotions-details-panel';
import { PromotionsDetailsTable } from './promotions-details-table';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';
import { usePromotionsDetails } from './use-promotions-details';

export function PromotionsDetailsPage() {
  const {
    items,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  } = usePromotionsDetails();

  return (
    <section
      className="feature-page"
      data-testid={PROMOTIONS_DETAILS_FEATURE.testId}
    >
      <PromotionsDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <PromotionsDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <PromotionsDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <PromotionsDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <SearchSettingsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default PromotionsDetailsPage;
