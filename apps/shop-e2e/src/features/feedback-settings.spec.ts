// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  FEEDBACK_SETTINGS_FEATURE,
  FEEDBACK_SETTINGS_ITEM_COUNT,
} from '@org/shop-feature-feedback-settings';
import { padTo } from '../support/pacing';

test.describe('Feedback Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(FEEDBACK_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(FEEDBACK_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(FEEDBACK_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${FEEDBACK_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(FEEDBACK_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
