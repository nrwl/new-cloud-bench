import { ErrorMessage, LoadingSpinner } from '@org/shop-shared-ui';
import { AuthEditorSummary } from '@org/shop-feature-auth-editor';
import { FeedbackHistoryFilters } from './feedback-history-filters';
import { FeedbackHistoryHeader } from './feedback-history-header';
import { FeedbackHistoryPanel } from './feedback-history-panel';
import { FeedbackHistoryTable } from './feedback-history-table';
import { FEEDBACK_HISTORY_FEATURE } from './feedback-history.routes';
import { useFeedbackHistory } from './use-feedback-history';

export function FeedbackHistoryPage() {
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
  } = useFeedbackHistory();

  return (
    <section
      className="feature-page"
      data-testid={FEEDBACK_HISTORY_FEATURE.testId}
    >
      <FeedbackHistoryHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <FeedbackHistoryFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <FeedbackHistoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <FeedbackHistoryPanel
            selected={selected}
            onClear={() => select(null)}
          />
          <AuthEditorSummary compact />
        </div>
      </div>
    </section>
  );
}

export default FeedbackHistoryPage;
