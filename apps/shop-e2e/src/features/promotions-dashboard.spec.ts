// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  PROMOTIONS_DASHBOARD_FEATURE,
  PROMOTIONS_DASHBOARD_ITEM_COUNT,
} from '@org/shop-feature-promotions-dashboard';
import { padTo } from '../support/pacing';

test.describe('Promotions Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROMOTIONS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(PROMOTIONS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROMOTIONS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROMOTIONS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
