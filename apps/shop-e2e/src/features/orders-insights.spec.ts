// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  ORDERS_INSIGHTS_FEATURE,
  ORDERS_INSIGHTS_ITEM_COUNT,
} from '@org/shop-feature-orders-insights';
import { padTo } from '../support/pacing';

test.describe('Orders Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ORDERS_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(ORDERS_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ORDERS_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ORDERS_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${ORDERS_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ORDERS_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
