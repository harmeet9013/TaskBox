"use client";

import { getCookie } from "cookies-next";
import { useMediaQuery } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
//
import { settingsContext } from "./settings-context";

export const SettingsProvider = ({ children, session }) => {
    const isMobile = useMediaQuery("(max-width: 900px");
    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)");

    const [mode, setMode] = useState("dark");
    const [selectedPalette, setSelectedPalette] = useState(3);
    const [updatedSession, setUpdatedSession] = useState(session);

    useEffect(() => {
        setMode(getCookie("theme") || systemTheme ? "dark" : "light");
    }, [systemTheme]);

    useEffect(() => {
        setUpdatedSession(session);
    }, [session]);

    const providerValues = useMemo(
        () => ({
            isMobile,
            mode,
            setMode,
            session: updatedSession,
            selectedPalette,
        }),
        [isMobile, mode, setMode, selectedPalette]
    );

    return (
        <settingsContext.Provider value={providerValues}>
            {children}
        </settingsContext.Provider>
    );
};