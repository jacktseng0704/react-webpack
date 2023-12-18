import { styled } from '@stitches/react';

export const Button = styled('button', {
  backgroundColor: '#fff',
  borderRadius: '6px',
  height: '48px',
  width: '48px',
  cursor: 'pointer',
  fontSize: '1.8rem',
  color: '#3ebafd',
  borderColor: 'inherit',
  borderStyle: 'solid',

  '&:hover': {
    opacity: 0.8,
  },

  variants: {
    variant: {
      disabled: {
        color: '#ade2ff',
        cursor: 'not-allowed',
      },
      default: {},
    },
  },
});
