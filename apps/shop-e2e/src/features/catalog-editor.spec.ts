// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  CATALOG_EDITOR_FEATURE,
  CATALOG_EDITOR_ITEM_COUNT,
} from '@org/shop-feature-catalog-editor';
import { padTo } from '../support/pacing';

test.describe('Catalog Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CATALOG_EDITOR_FEATURE.route);
    await expect(page.getByTestId(CATALOG_EDITOR_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${CATALOG_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CATALOG_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${CATALOG_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CATALOG_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
