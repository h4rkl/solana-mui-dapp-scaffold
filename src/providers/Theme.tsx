import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { common, blueGrey, purple, pink, teal, green } from "@mui/material/colors";
import { useContext, useMemo } from "react";

import { ChosenTheme } from "./ChosenTheme";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { theme } = useContext(ChosenTheme);
  const muiTheme = useMemo(() => createThemeHelper(theme), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const createThemeHelper = (theme: "dark" | "light") => {
  const isDark = theme === "dark";
  return createTheme({
    palette: {
      mode: theme,
      background: {
        default: isDark ? blueGrey[900] : common["white"],
        paper: isDark ? blueGrey[600] : blueGrey[100],
      },
      primary: {
        main: purple[700],
      },
      secondary: {
        main: teal[700],
      },
      error: {
        main: pink[500],
      },
      success: {
        main: green[500],
      },
    },
  });
};
