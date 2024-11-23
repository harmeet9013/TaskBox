"use client";

import { getCookie } from "cookies-next";
import { getSession } from "next-auth/react";
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

    const updateSession = async () => {
        const newSession = await getSession();
        setUpdatedSession(newSession);
    };

    useEffect(() => {
        setUpdatedSession(session);
    }, [session]);

    const providerValues = useMemo(
        () => ({
            isMobile,
            mode,
            setMode,
            session: updatedSession,
            updateSession,
            selectedPalette,
        }),
        [isMobile, mode, setMode, updateSession, selectedPalette]
    );

    return (
        <settingsContext.Provider value={providerValues}>
            {children}
        </settingsContext.Provider>
    );
};
