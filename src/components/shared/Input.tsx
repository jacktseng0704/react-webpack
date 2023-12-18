import { styled } from '@stitches/react';

export const Input = styled('input', {
  backgroundColor: '#fff',
  borderRadius: '6px',

  width: '48px',
  cursor: 'pointer',
  fontSize: '1rem',
  color: 'LightGray',
  borderColor: 'inherit',
  borderStyle: 'solid',

  textAlign: 'center',

  '&:hover': {
    opacity: 0.8,
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: '0',
  },
  '&[type=number]': {
    MozAppearance: 'textfield',
  },
});
