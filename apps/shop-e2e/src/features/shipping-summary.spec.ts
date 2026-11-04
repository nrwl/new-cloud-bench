// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  SHIPPING_SUMMARY_FEATURE,
  SHIPPING_SUMMARY_ITEM_COUNT,
} from '@org/shop-feature-shipping-summary';
import { padTo } from '../support/pacing';

test.describe('Shipping Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SHIPPING_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(SHIPPING_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SHIPPING_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${SHIPPING_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SHIPPING_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
