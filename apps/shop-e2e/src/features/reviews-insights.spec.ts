// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  REVIEWS_INSIGHTS_FEATURE,
  REVIEWS_INSIGHTS_ITEM_COUNT,
} from '@org/shop-feature-reviews-insights';
import { padTo } from '../support/pacing';

test.describe('Reviews Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(REVIEWS_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(REVIEWS_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(REVIEWS_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(REVIEWS_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
