// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  STORE_LOCATOR_EDITOR_FEATURE,
  STORE_LOCATOR_EDITOR_ITEM_COUNT,
} from '@org/shop-feature-store-locator-editor';
import { padTo } from '../support/pacing';

test.describe('Store Locator Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(STORE_LOCATOR_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(STORE_LOCATOR_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${STORE_LOCATOR_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(STORE_LOCATOR_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${STORE_LOCATOR_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(STORE_LOCATOR_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
