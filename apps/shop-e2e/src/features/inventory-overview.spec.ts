// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  INVENTORY_OVERVIEW_FEATURE,
  INVENTORY_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-inventory-overview';
import { padTo } from '../support/pacing';

test.describe('Inventory Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(INVENTORY_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(INVENTORY_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(INVENTORY_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${INVENTORY_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(INVENTORY_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
