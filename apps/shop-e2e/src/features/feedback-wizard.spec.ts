// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  FEEDBACK_WIZARD_FEATURE,
  FEEDBACK_WIZARD_ITEM_COUNT,
} from '@org/shop-feature-feedback-wizard';
import { padTo } from '../support/pacing';

test.describe('Feedback Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(FEEDBACK_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(FEEDBACK_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${FEEDBACK_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(FEEDBACK_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${FEEDBACK_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(FEEDBACK_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
