import { createTheme } from '@mui/material/styles';

export const designTokens = {
  radius: {
    sm: 8,
    md: 14,
    lg: 18,
    xl: 22,
  },
  shadows: {
    sm: '0 12px 34px rgba(20, 20, 24, 0.07)',
    md: '0 20px 56px rgba(20, 20, 24, 0.11)',
    lg: '0 34px 86px rgba(20, 20, 24, 0.16)',
  },
  spacing: {
    pageX: { xs: 2, sm: 3, md: 4 },
    pageY: { xs: 2.5, sm: 3.5, md: 5 },
    card: { xs: 2.5, sm: 3 },
  },
  layout: {
    headerHeight: { xs: 64, sm: 72 },
    sidebarWidth: 292,
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#20232d',
      light: '#454b5f',
      dark: '#10131b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b96978',
      light: '#dda0aa',
      dark: '#85434e',
      contrastText: '#ffffff',
    },
    success: {
      main: '#477864',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#bd8541',
    },
    error: {
      main: '#b14d5a',
    },
    background: {
      default: '#f8f4ef',
      paper: '#ffffff',
    },
    text: {
      primary: '#18191d',
      secondary: '#6f727a',
    },
    divider: 'rgba(24, 25, 29, 0.1)',
  },
  shape: {
    borderRadius: designTokens.radius.md,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 850,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 850,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 800,
    },
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 12px 34px rgba(20, 20, 24, 0.05)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.md,
          fontWeight: 650,
        },
        filled: {
          boxShadow: designTokens.shadows.md,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 900,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.md,
          minHeight: 44,
          letterSpacing: 0,
          boxShadow: 'none',
          transition:
            'background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 14px 30px rgba(20, 20, 24, 0.12)',
          },
          '&.Mui-focusVisible': {
            outline: '3px solid rgba(184, 107, 119, 0.32)',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.lg,
          boxShadow: designTokens.shadows.sm,
          backgroundImage: 'none',
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.sm,
          fontWeight: 800,
          letterSpacing: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: designTokens.radius.xl,
          boxShadow: designTokens.shadows.lg,
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.99), rgba(255,255,255,0.96))',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 850,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,247,243,0.98))',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 180ms ease, color 180ms ease, transform 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&.Mui-focusVisible': {
            outline: '3px solid rgba(184, 107, 119, 0.3)',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          overflow: 'hidden',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.md,
          marginInline: 6,
          marginBlock: 2,
          '&.Mui-focusVisible': {
            outline: '2px solid rgba(184, 107, 119, 0.36)',
            outlineOffset: -2,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 800,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.md,
          backgroundColor: 'rgba(255,255,255,0.72)',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(31,36,48,0.28)',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 4px rgba(184, 107, 119, 0.14)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b96978',
            borderWidth: 1,
          },
        },
        notchedOutline: {
          borderColor: 'rgba(24, 25, 29, 0.13)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.md,
          backgroundColor: 'rgba(31,36,48,0.08)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#ffffff',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#b96978',
            opacity: 1,
          },
        },
        track: {
          opacity: 1,
          backgroundColor: 'rgba(31,36,48,0.18)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#6f727a',
          fontWeight: 850,
          backgroundColor: 'rgba(248,244,239,0.72)',
        },
        root: {
          borderBottomColor: 'rgba(24,25,29,0.08)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: designTokens.radius.sm,
          fontWeight: 700,
        },
      },
    },
  },
});
