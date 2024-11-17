import { alpha } from "@mui/material";
//
import { PALETTE_NAMES } from "./themes";

const COLORS = (mode, theme) => {
    const light = {
        primary: {
            main: PALETTE_NAMES[theme]["palettes"]["primary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["primary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["primary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["primary"][100],
        },
        secondary: {
            main: PALETTE_NAMES[theme]["palettes"]["secondary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["secondary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["secondary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["secondary"][100],
        },
        tertiary: {
            main: PALETTE_NAMES[theme]["palettes"]["tertiary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["tertiary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["tertiary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["tertiary"][100],
        },
        text: {
            primary: PALETTE_NAMES[theme]["palettes"]["neutral"][0],
            secondary: PALETTE_NAMES[theme]["palettes"]["neutral"][40],
            disabled: PALETTE_NAMES[theme]["palettes"]["neutral"][60],
        },
    };

    const dark = {
        primary: {
            main: PALETTE_NAMES[theme]["palettes"]["primary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["primary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["primary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["primary"][20],
        },
        secondary: {
            main: PALETTE_NAMES[theme]["palettes"]["secondary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["secondary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["secondary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["secondary"][20],
        },
        tertiary: {
            main: PALETTE_NAMES[theme]["palettes"]["tertiary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["tertiary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["tertiary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["tertiary"][20],
        },
        text: {
            primary: PALETTE_NAMES[theme]["palettes"]["neutral"][100],
            secondary: PALETTE_NAMES[theme]["palettes"]["neutral"][60],
            disabled: PALETTE_NAMES[theme]["palettes"]["neutral"][50],
        },
    };

    return {
        mode,
        ...(mode === "light" ? light : dark),
        background: {
            default:
                PALETTE_NAMES[theme]["palettes"]["neutral"][
                    mode === "light" ? "95" : "0"
                ],
            paper: PALETTE_NAMES[theme]["palettes"]["neutral"][
                mode === "light" ? "90" : "5"
            ],
        },
        divider: alpha(
            PALETTE_NAMES[theme]["schemes"][mode]["outlineVariant"],
            0.7
        ),
        grey: {
            ...PALETTE_NAMES[theme]["palettes"]["neutral"],
        },
    };
};

export default function palette(mode, theme) {
    return {
        mode,
        ...COLORS(mode, theme),
    };
}
