// @nx-ignore-server-inputs
import { expect, test } from '@playwright/test';
import {
  PREORDERS_LIST_FEATURE,
  PREORDERS_LIST_ITEM_COUNT,
} from '@org/shop-feature-preorders-list';
import { padTo } from '../support/pacing';

test.describe('Preorders List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PREORDERS_LIST_FEATURE.route);
    await expect(page.getByTestId(PREORDERS_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${PREORDERS_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PREORDERS_LIST_FEATURE.title);
    const rows = page.getByTestId(`${PREORDERS_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PREORDERS_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
