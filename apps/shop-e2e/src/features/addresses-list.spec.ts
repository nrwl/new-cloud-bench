// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  ADDRESSES_LIST_FEATURE,
  ADDRESSES_LIST_ITEM_COUNT,
} from '@org/shop-feature-addresses-list';
import { padTo } from '../support/pacing';

test.describe('Addresses List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ADDRESSES_LIST_FEATURE.route);
    await expect(page.getByTestId(ADDRESSES_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ADDRESSES_LIST_FEATURE.title);
    const rows = page.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ADDRESSES_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
