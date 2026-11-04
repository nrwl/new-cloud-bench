// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  PROMOTIONS_EDITOR_FEATURE,
  PROMOTIONS_EDITOR_ITEM_COUNT,
} from '@org/shop-feature-promotions-editor';
import { padTo } from '../support/pacing';

test.describe('Promotions Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROMOTIONS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(PROMOTIONS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROMOTIONS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${PROMOTIONS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROMOTIONS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
