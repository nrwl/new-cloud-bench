import { ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { AccountEditorSummary } from '@org/shop-feature-account-editor';
import { AddressesDetailsFilters } from './addresses-details-filters';
import { AddressesDetailsHeader } from './addresses-details-header';
import { AddressesDetailsPanel } from './addresses-details-panel';
import { AddressesDetailsTable } from './addresses-details-table';
import { ADDRESSES_DETAILS_FEATURE } from './addresses-details.routes';
import { useAddressesDetails } from './use-addresses-details';

export function AddressesDetailsPage() {
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
  } = useAddressesDetails();

  return (
    <section
      className="feature-page"
      data-testid={ADDRESSES_DETAILS_FEATURE.testId}
    >
      <AddressesDetailsHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <AddressesDetailsFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <AddressesDetailsTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <AddressesDetailsPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AccountEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default AddressesDetailsPage;
