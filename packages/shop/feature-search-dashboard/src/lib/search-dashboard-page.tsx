import { ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { ReviewsInsightsSummary } from '@org/shop-feature-reviews-insights';
import { SearchDashboardFilters } from './search-dashboard-filters';
import { SearchDashboardHeader } from './search-dashboard-header';
import { SearchDashboardPanel } from './search-dashboard-panel';
import { SearchDashboardTable } from './search-dashboard-table';
import { SEARCH_DASHBOARD_FEATURE } from './search-dashboard.routes';
import { useSearchDashboard } from './use-search-dashboard';

export function SearchDashboardPage() {
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
  } = useSearchDashboard();

  return (
    <section
      className="feature-page"
      data-testid={SEARCH_DASHBOARD_FEATURE.testId}
    >
      <SearchDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <SearchDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <SearchDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <SearchDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <ReviewsInsightsSummary compact />
        </div>
      </div>
    </section>
  );
}

export default SearchDashboardPage;
