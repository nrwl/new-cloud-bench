import { mathDate } from '@org/shop-util-math-date';
import { validateCurrency } from '@org/shop-util-validate-currency';
import { storageCode } from '@org/shop-util-storage-code';
import type { InputsCardProps } from './inputs-card.types';
import { resolveInputsCardStyle } from './inputs-card-variants';

export function InputsCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-card',
  onSelect,
  children,
}: InputsCardProps) {
  const formatted = value === undefined ? '' : mathDate(value);
  const style = resolveInputsCardStyle(tone, size);
  const ariaLabel = storageCode(validateCurrency(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-card ui-element"
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
    </div>
  );
}

export default InputsCard;
