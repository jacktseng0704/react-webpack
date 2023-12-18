import { useState, useEffect, useRef, useCallback } from 'react';

import { Button } from './shared';

interface IntervalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function IntervalButton({ onClick, children, disabled }: IntervalButtonProps) {
  const [isMouseDown, setMouseDown] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Event handlers with useCallback for memoization
  const handleMouseDown = useCallback(() => {
    setMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setMouseDown(false);
  }, []);

  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  // Effect for managing the interval and cleanup
  useEffect(() => {
    // Function to execute on each interval tick
    const tick = () => {
      if (isMouseDown) handleClick();
    };

    // Start or clear the interval based on isMouseDown
    if (isMouseDown) {
      intervalIdRef.current = setInterval(tick, 200);
    } else {
      clearInterval(intervalIdRef.current!);
      intervalIdRef.current = null;
    }

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalIdRef.current!);
    };
  }, [isMouseDown, handleClick]);

  return (
    <Button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      variant={disabled ? 'disabled' : 'default'}
    >
      {children}
    </Button>
  );
}
