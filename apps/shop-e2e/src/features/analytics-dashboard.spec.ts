// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  ANALYTICS_DASHBOARD_FEATURE,
  ANALYTICS_DASHBOARD_ITEM_COUNT,
} from '@org/shop-feature-analytics-dashboard';
import { padTo } from '../support/pacing';

test.describe('Analytics Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ANALYTICS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(ANALYTICS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ANALYTICS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ANALYTICS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
