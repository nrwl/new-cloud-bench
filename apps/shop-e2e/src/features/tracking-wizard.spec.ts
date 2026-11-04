// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  TRACKING_WIZARD_FEATURE,
  TRACKING_WIZARD_ITEM_COUNT,
} from '@org/shop-feature-tracking-wizard';
import { padTo } from '../support/pacing';

test.describe('Tracking Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(TRACKING_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(TRACKING_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(TRACKING_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${TRACKING_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(TRACKING_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
