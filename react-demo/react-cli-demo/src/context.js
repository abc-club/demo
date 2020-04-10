import React from 'react';

export const themes = {
  light: {
    color: '#000000',
    background: '#fff',
  },
  dark: {
    color: '#ffffff',
    background: '#000',
  },
};
export const ThemeContext = React.createContext(themes.light);
