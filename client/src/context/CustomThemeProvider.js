import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: "light",
  setTheme: null,
});

export const light = {
  palette: {
    type: "light",
    background: {
      default: "#fff",
    },
  },
};

export const dark = {
  palette: {
    type: "dark",
    primary: {
      main: "#ffac41",
    },
    secondary: {
      main: "#e45826",
    },
    background: {
      default: "#303030",
    },
  },
};

const CustomThemeProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem("appTheme") || "light";

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve the theme object by theme name
  const theme = createMuiTheme(themeName === "light" ? light : dark);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
