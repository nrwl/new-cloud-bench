import { formatCurrency } from '@org/shop-util-format-currency';
import { i18nNumber } from '@org/shop-util-i18n-number';
import { mathName } from '@org/shop-util-math-name';
import { TypographyPanel } from '@org/shop-ui-typography-panel';
import type { MarketingToolbarProps } from './marketing-toolbar.types';
import { resolveMarketingToolbarStyle } from './marketing-toolbar-variants';

export function MarketingToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-toolbar',
  onSelect,
  children,
}: MarketingToolbarProps) {
  const formatted = value === undefined ? '' : formatCurrency(value);
  const style = resolveMarketingToolbarStyle(tone, size);
  const ariaLabel = mathName(i18nNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-toolbar ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <TypographyPanel
        label="Typography Panel"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default MarketingToolbar;
