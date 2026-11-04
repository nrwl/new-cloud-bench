// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  WISHLIST_SUMMARY_FEATURE,
  WISHLIST_SUMMARY_ITEM_COUNT,
} from '@org/shop-feature-wishlist-summary';
import { padTo } from '../support/pacing';

test.describe('Wishlist Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(WISHLIST_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(WISHLIST_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(WISHLIST_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(WISHLIST_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
