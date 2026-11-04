// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  NOTIFICATIONS_EDITOR_FEATURE,
  NOTIFICATIONS_EDITOR_ITEM_COUNT,
} from '@org/shop-feature-notifications-editor';
import { padTo } from '../support/pacing';

test.describe('Notifications Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(NOTIFICATIONS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(NOTIFICATIONS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(NOTIFICATIONS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(NOTIFICATIONS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
