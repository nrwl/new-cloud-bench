// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  COMPARE_LIST_FEATURE,
  COMPARE_LIST_ITEM_COUNT,
} from '@org/shop-feature-compare-list';
import { padTo } from '../support/pacing';

test.describe('Compare List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(COMPARE_LIST_FEATURE.route);
    await expect(page.getByTestId(COMPARE_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${COMPARE_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(COMPARE_LIST_FEATURE.title);
    const rows = page.getByTestId(`${COMPARE_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(COMPARE_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
