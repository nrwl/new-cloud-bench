// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  PREORDERS_INSIGHTS_FEATURE,
  PREORDERS_INSIGHTS_ITEM_COUNT,
} from '@org/shop-feature-preorders-insights';
import { padTo } from '../support/pacing';

test.describe('Preorders Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PREORDERS_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(PREORDERS_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PREORDERS_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PREORDERS_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
