// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  CHECKOUT_EDITOR_FEATURE,
  CHECKOUT_EDITOR_ITEM_COUNT,
} from '@org/shop-feature-checkout-editor';
import { padTo } from '../support/pacing';

test.describe('Checkout Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CHECKOUT_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(CHECKOUT_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CHECKOUT_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${CHECKOUT_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CHECKOUT_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
