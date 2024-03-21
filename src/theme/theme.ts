// src/theme/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#63B3ED',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
      disabled: '#4A5568',
    },
    background: {
      default: '#1A202C',
      paper: '#2D3748',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#2D3748',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            color: '#4A5568',
            WebkitTextFillColor: '#4A5568',
          },
          '& .MuiInputLabel-root': {
            color: '#A0AEC0',
          },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: '#4A5568',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2D3748',
            },
            '&:hover fieldset': {
              borderColor: '#4A5568',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#63B3ED',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default theme;