// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  PROFILE_HISTORY_FEATURE,
  PROFILE_HISTORY_ITEM_COUNT,
} from '@org/shop-feature-profile-history';
import { padTo } from '../support/pacing';

test.describe('Profile History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROFILE_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(PROFILE_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROFILE_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${PROFILE_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROFILE_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
