// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  ACCOUNT_SUMMARY_FEATURE,
  ACCOUNT_SUMMARY_ITEM_COUNT,
} from '@org/shop-feature-account-summary';
import { padTo } from '../support/pacing';

test.describe('Account Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ACCOUNT_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(ACCOUNT_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ACCOUNT_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${ACCOUNT_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ACCOUNT_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
