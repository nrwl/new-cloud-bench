// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  BUNDLES_WIZARD_FEATURE,
  BUNDLES_WIZARD_ITEM_COUNT,
} from '@org/shop-feature-bundles-wizard';
import { padTo } from '../support/pacing';

test.describe('Bundles Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(BUNDLES_WIZARD_FEATURE.route);
    await expect(page.getByTestId(BUNDLES_WIZARD_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(BUNDLES_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(BUNDLES_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
