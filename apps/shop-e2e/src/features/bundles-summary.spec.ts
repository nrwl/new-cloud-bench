// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  BUNDLES_SUMMARY_FEATURE,
  BUNDLES_SUMMARY_ITEM_COUNT,
} from '@org/shop-feature-bundles-summary';
import { padTo } from '../support/pacing';

test.describe('Bundles Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(BUNDLES_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(BUNDLES_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(BUNDLES_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(BUNDLES_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
