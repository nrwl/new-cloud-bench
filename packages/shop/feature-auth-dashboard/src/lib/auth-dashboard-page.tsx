import { ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { CartOverviewSummary } from '@org/shop-feature-cart-overview';
import { AuthDashboardFilters } from './auth-dashboard-filters';
import { AuthDashboardHeader } from './auth-dashboard-header';
import { AuthDashboardPanel } from './auth-dashboard-panel';
import { AuthDashboardTable } from './auth-dashboard-table';
import { AUTH_DASHBOARD_FEATURE } from './auth-dashboard.routes';
import { useAuthDashboard } from './use-auth-dashboard';

export function AuthDashboardPage() {
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
  } = useAuthDashboard();

  return (
    <section
      className="feature-page"
      data-testid={AUTH_DASHBOARD_FEATURE.testId}
    >
      <AuthDashboardHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AuthDashboardFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AuthDashboardTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AuthDashboardPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <CartOverviewSummary compact />
        </div>
      </div>
    </section>
  );
}

export default AuthDashboardPage;
