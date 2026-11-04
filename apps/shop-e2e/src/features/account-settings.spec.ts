// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  ACCOUNT_SETTINGS_FEATURE,
  ACCOUNT_SETTINGS_ITEM_COUNT,
} from '@org/shop-feature-account-settings';
import { padTo } from '../support/pacing';

test.describe('Account Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ACCOUNT_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(ACCOUNT_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ACCOUNT_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ACCOUNT_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${ACCOUNT_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ACCOUNT_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
