// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  COMPARE_INSIGHTS_FEATURE,
  COMPARE_INSIGHTS_ITEM_COUNT,
} from '@org/shop-feature-compare-insights';
import { padTo } from '../support/pacing';

test.describe('Compare Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(COMPARE_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(COMPARE_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(COMPARE_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(COMPARE_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
