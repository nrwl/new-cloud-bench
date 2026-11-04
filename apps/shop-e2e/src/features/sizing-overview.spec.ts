// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  SIZING_OVERVIEW_FEATURE,
  SIZING_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-sizing-overview';
import { padTo } from '../support/pacing';

test.describe('Sizing Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SIZING_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(SIZING_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SIZING_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${SIZING_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SIZING_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
