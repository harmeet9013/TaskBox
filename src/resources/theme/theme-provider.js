"use client";

import {
    createTheme,
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
//
import palette from "./palette";
import { useSettingsContext } from "../settings";
import { ComponentsOverrides } from "./components-overrides";

export const ThemeProvider = ({ children }) => {
    const { mode, selectedPalette } = useSettingsContext();

    const theme = createTheme({
        // cssVariables: true,
        // colorSchemes: {
        //     light: true,
        //     dark: true,
        // },
        typography: {
            fontFamily: "inherit",
        },
        palette: {
            ...palette(mode, selectedPalette),
        },
        transitions: {
            duration: {
                enteringScreen: 500,
                leavingScreen: 500,
                // standard: 4000,
                // complex: 4000,
                // short: 4000,
                // shorter: 4000,
                // shortest: 4000,
            },
        },
    });

    theme.components = ComponentsOverrides(theme);
    // theme.typography = responsiveFontSizes(theme);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <SnackbarProvider>{children}</SnackbarProvider>
        </MuiThemeProvider>
    );
};
