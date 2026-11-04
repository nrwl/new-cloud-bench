// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  FEEDBACK_SUMMARY_FEATURE,
  FEEDBACK_SUMMARY_ITEM_COUNT,
} from '@org/shop-feature-feedback-summary';
import { padTo } from '../support/pacing';

test.describe('Feedback Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(FEEDBACK_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(FEEDBACK_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(FEEDBACK_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${FEEDBACK_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(FEEDBACK_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
