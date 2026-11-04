// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  STORE_LOCATOR_DETAILS_FEATURE,
  STORE_LOCATOR_DETAILS_ITEM_COUNT,
} from '@org/shop-feature-store-locator-details';
import { padTo } from '../support/pacing';

test.describe('Store Locator Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(STORE_LOCATOR_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(STORE_LOCATOR_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${STORE_LOCATOR_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(STORE_LOCATOR_DETAILS_FEATURE.title);
    const rows = page.getByTestId(
      `${STORE_LOCATOR_DETAILS_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(STORE_LOCATOR_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
