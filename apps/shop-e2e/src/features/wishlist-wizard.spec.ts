// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  WISHLIST_WIZARD_FEATURE,
  WISHLIST_WIZARD_ITEM_COUNT,
} from '@org/shop-feature-wishlist-wizard';
import { padTo } from '../support/pacing';

test.describe('Wishlist Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(WISHLIST_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(WISHLIST_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${WISHLIST_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(WISHLIST_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${WISHLIST_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(WISHLIST_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
