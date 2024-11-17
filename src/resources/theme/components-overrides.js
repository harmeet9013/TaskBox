import { alpha } from "@mui/material/styles";

export const ComponentsOverrides = (theme) => {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                "html *": {
                    fontFamily: "inherit",
                    "&:link": {
                        color: theme.palette.tertiary.main,
                    },
                },
                body: {
                    textAlign: "center",
                    justfifyContent: "center",
                    alignItems: "center",
                    transition: theme.transitions.create(),
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(4),
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing(0),
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    zIndex: 5000,
                    backgroundColor: alpha("#000000", 0.9),
                },
                invisible: {
                    background: "transparent",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    elevation: 0,
                    borderRadius: theme.spacing(0),
                    padding: `${theme.spacing(2)} ${theme.spacing(1.5)}`,
                    sx: {
                        backgroundColor: theme.palette.background.low,
                    },
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: theme.typography.h2.fontSize,
                    color: theme.palette.primary.main,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing(0),
                    textTransform: "none",
                    padding: `${theme.spacing(0.8)} ${theme.spacing(2.5)}`,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing(0),
                    textTransform: "none",
                    // padding: `${theme.spacing(0.8)} ${theme.spacing(2.5)}`,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    transition: theme.transitions.create(),
                },
                paper: {
                    marginTop: theme.spacing(1),
                    padding: `${theme.spacing(0.8)} ${theme.spacing(1)}`,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.spacing(0),
                    WebkitBackfaceVisibility: "hidden",
                    WebkitPerspective: "1000",
                    WebkitTransform: "translate3d(0,0,0)",
                    WebkitTransform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000",
                    transform: "translate3d(0,0,0)",
                    transform: "translateZ(0)",
                    backdropFilter: "blur(5px)",
                    backgroundColor: alpha(
                        theme.palette.background.default,
                        0.95
                    ),
                },
            },
        },
        MuiMenuItem: {
            styledOverrides: {
                root: {
                    padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing(0),
                    width: "100%",
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme.palette.tertiary.main,
                    color: theme.palette.tertiary.contrastText,
                    fontSize: theme.typography.caption.fontSize,
                    borderRadius: theme.spacing(0),
                    padding: `${theme.spacing(0.8)} ${theme.spacing(1.2)}`,
                    transition: `${theme.transitions.create()} !important`,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing(0),
                    transition: `${theme.transitions.create()} !important`,
                },
            },
        },
    };
};
