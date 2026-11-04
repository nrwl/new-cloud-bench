// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  SEARCH_DASHBOARD_FEATURE,
  SEARCH_DASHBOARD_ITEM_COUNT,
} from '@org/shop-feature-search-dashboard';
import { padTo } from '../support/pacing';

test.describe('Search Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SEARCH_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(SEARCH_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SEARCH_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SEARCH_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
