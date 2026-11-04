// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  COMPARE_HISTORY_FEATURE,
  COMPARE_HISTORY_ITEM_COUNT,
} from '@org/shop-feature-compare-history';
import { padTo } from '../support/pacing';

test.describe('Compare History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(COMPARE_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(COMPARE_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(COMPARE_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${COMPARE_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(COMPARE_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
