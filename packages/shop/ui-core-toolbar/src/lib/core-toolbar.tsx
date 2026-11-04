import { formatCurrency } from '@org/shop-util-format-currency';
import { collectionText } from '@org/shop-util-collection-text';
import { validateDate } from '@org/shop-util-validate-date';
import { CorePanel } from '@org/shop-ui-core-panel';
import type { CoreToolbarProps } from './core-toolbar.types';
import { resolveCoreToolbarStyle } from './core-toolbar-variants';

export function CoreToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-toolbar',
  onSelect,
  children,
}: CoreToolbarProps) {
  const formatted = value === undefined ? '' : formatCurrency(value);
  const style = resolveCoreToolbarStyle(tone, size);
  const ariaLabel = validateDate(collectionText(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-toolbar ui-element"
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
      <CorePanel label="Core Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreToolbar;
