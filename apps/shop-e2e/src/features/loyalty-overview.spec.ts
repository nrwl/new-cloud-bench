// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  LOYALTY_OVERVIEW_FEATURE,
  LOYALTY_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-loyalty-overview';
import { padTo } from '../support/pacing';

test.describe('Loyalty Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(LOYALTY_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(LOYALTY_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(LOYALTY_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${LOYALTY_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(LOYALTY_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
