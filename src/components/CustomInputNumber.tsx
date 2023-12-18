import { useState, ChangeEvent } from 'react';
import { Input, Flex } from './shared';

import IntervalButton from './IntervalButton';
import { minAdultGuestPerRoom } from './RoomCard';

interface CustomInputNumberProps {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  isAddButtonDisabled: boolean;
}

export default function CustomInputNumber({
  min,
  max,
  step,
  value,
  name,
  onChange,
  onBlur,
  disabled,
  isAddButtonDisabled,
}: CustomInputNumberProps) {
  const [inputValue, setInputValue] = useState<number | string>(value);

  const isMinusButtonDisabled = disabled || +inputValue <= min;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim(); // Trim whitespace from the input

    // Handle the case when inputValue is an empty string
    if (inputValue === '') {
      setInputValue(''); // Allow empty string if the user wants to erase the input
    } else {
      let newValue = parseInt(inputValue, 10);

      // Check if the entered value is within the valid range
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        setInputValue(newValue);
      } else {
        // If not, set the value to the closest valid boundary
        newValue = Math.min(Math.max(newValue, min), max);
        setInputValue(newValue);
      }
      const newEvent = createChangeEvent(+newValue);

      onChange && onChange(newEvent);
    }
  };

  const createChangeEvent = (newValue: number) => {
    return {
      target: {
        name,
        value: newValue,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
  };

  const handleBlur = () => {
    const blurEvent = createChangeEvent(+inputValue);
    const {
      target: { name },
    } = blurEvent;

    // User may clear input field and onBlur without any value
    if (inputValue === '') {
      let minValue = 0;

      if (name === 'adult') minValue = minAdultGuestPerRoom;

      onChange(createChangeEvent(minValue));
      setInputValue(minValue);
    }

    onBlur && onBlur(blurEvent);
  };

  const handleIncrement = () => {
    if (disabled || isAddButtonDisabled) return;

    const newValue = Math.min(+inputValue + step, max);
    setInputValue(newValue);
    onChange && onChange(createChangeEvent(newValue));
  };

  const handleDecrement = () => {
    if (isMinusButtonDisabled) return;

    const newValue = Math.max(+inputValue - step, min);
    setInputValue(newValue);
    onChange && onChange(createChangeEvent(newValue));
  };

  return (
    <Flex onBlur={handleBlur}>
      <IntervalButton onClick={handleDecrement} disabled={isMinusButtonDisabled}>
        -
      </IntervalButton>
      <Input
        type="number"
        name={name}
        value={inputValue}
        onInput={handleInputChange}
        max={max}
        min={min}
        disabled={disabled}
      />

      <IntervalButton onClick={handleIncrement} disabled={disabled || isAddButtonDisabled}>
        +
      </IntervalButton>
    </Flex>
  );
}
