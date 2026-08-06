import type { Theme } from '@mui/material/styles';

export const globalStyles = (theme: Theme) => ({
  ':root': {
    colorScheme: 'light',
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '*': {
    boxSizing: 'border-box',
  },
  'html, body, #account-orders-root': {
    minHeight: '100%',
  },
  body: {
    margin: 0,
    background:
      'linear-gradient(180deg, rgba(246, 244, 241, 0.96) 0%, rgba(255, 255, 255, 1) 100%)',
    color: theme.palette.text.primary,
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    font: 'inherit',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  '#account-orders-root': {
    isolation: 'isolate',
  },
});
