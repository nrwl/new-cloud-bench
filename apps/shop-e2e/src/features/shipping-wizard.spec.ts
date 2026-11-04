// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  SHIPPING_WIZARD_FEATURE,
  SHIPPING_WIZARD_ITEM_COUNT,
} from '@org/shop-feature-shipping-wizard';
import { padTo } from '../support/pacing';

test.describe('Shipping Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SHIPPING_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(SHIPPING_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SHIPPING_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SHIPPING_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
