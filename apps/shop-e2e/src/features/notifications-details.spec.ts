// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  NOTIFICATIONS_DETAILS_FEATURE,
  NOTIFICATIONS_DETAILS_ITEM_COUNT,
} from '@org/shop-feature-notifications-details';
import { padTo } from '../support/pacing';

test.describe('Notifications Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(NOTIFICATIONS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(NOTIFICATIONS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(NOTIFICATIONS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(
      `${NOTIFICATIONS_DETAILS_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(NOTIFICATIONS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
