"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";

export const ThemeProvider = ({ children }) => {
    return <MuiThemeProvider theme={{}}>{children}</MuiThemeProvider>;
};
