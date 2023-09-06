import { useState } from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Divider,
    IconButton,
    Stack,
    ThemeProvider,
    createTheme,
    styled,
    useMediaQuery,
} from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import {
    CloseRounded,
    CancelRounded,
    CheckCircleRounded,
    GitHub,
    DnsRounded,
    ViewQuiltRounded,
} from "@mui/icons-material";

import Tasks from "./components/Tasks";
import Header from "./components/Header";
import UserAuth from "./components/UserAuth";
import {
    MaterialDesignContent,
    SnackbarProvider,
    closeSnackbar,
} from "notistack";
import { green, orange, red } from "@mui/material/colors";

export default function App() {
    //mediq query to check the width of the screen in order to determine if mobile or not
    const isMobile = useMediaQuery("(max-width: 900px)");

    //media query to check the system theme (dark or light)
    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)")
        ? true
        : false;

    // state hooks
    const [loggedUser, setLoggedUser] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    // custom theme palette designed specifically using the material 3 design language
    const material3Theme = createTheme({
        palette: {
            mode: systemTheme ? "dark" : "light",
            ...(systemTheme
                ? {
                      primary: {
                          main: "#7ad0ff",
                          on: "#003549",
                          container: {
                              main: "#004c68",
                              on: "#c3e8ff",
                          },
                          fixed: {
                              main: "#c3e8ff",
                              dim: "#7ad0ff",
                              on: "#001e2c",
                              onvar: "#004c68",
                          },
                      },
                      secondary: {
                          main: "#b5c9d7",
                          on: "#003549",
                          container: {
                              main: "#364955",
                              on: "#d1e5f4",
                          },
                          fixed: {
                              main: "#d1e5f4",
                              dim: "#b5c9d7",
                              on: "#0a1e28",
                              onvar: "#364955",
                          },
                      },
                      tertiary: {
                          main: "#cac1ea",
                          on: "#322c4c",
                          container: {
                              main: "#484264",
                              on: "#e6deff",
                          },
                          fixed: {
                              main: "#e6deff",
                              dim: "#1c1736",
                              on: "#1c1736",
                              onvar: "#633b48",
                          },
                      },

                      background: {
                          default: "#0c0f10",
                          low: "#191c1e",
                          med: "#1d2022",
                          high: "#282a2c",
                          highest: "#333537",
                          header: "#0c0f10df",
                      },

                      divider: "#41484d",
                      dividervar: "#8a9297",
                      backdrop: "#000000da",
                  }
                : {
                      primary: {
                          main: "#00668a",
                          on: "#ffffff",
                          container: {
                              main: "#c3e8ff",
                              on: "#001e2c",
                          },
                          fixed: {
                              main: "#c3e8ff",
                              dim: "#7ad0ff",
                              on: "#001e2c",
                              onvar: "#004c68",
                          },
                      },
                      secondary: {
                          main: "#4e616d",
                          on: "#ffffff",
                          container: {
                              main: "#d1e5f4",
                              on: "#0a1e28",
                          },
                          fixed: {
                              main: "#d1e5f4",
                              dim: "#b5c9d7",
                              on: "#0a1e28",
                              onvar: "#364955",
                          },
                      },
                      tertiary: {
                          main: "#605a7d",
                          on: "#ffffff",
                          container: {
                              main: "#e6deff",
                              on: "#1c1736",
                          },
                          fixed: {
                              main: "#e6deff",
                              dim: "#1c1736",
                              on: "#1c1736",
                              onvar: "#633b48",
                          },
                      },

                      background: {
                          default: "#ffffff",
                          low: "#f3f3f6",
                          med: "#edeef0",
                          high: "#e7e8ea",
                          highest: "#e1e2e5",
                          header: "#ffffffdf",
                      },

                      divider: "#c0c7cd",
                      dividervar: "#71787d",
                      backdrop: "#000000da",
                  }),
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontFamily: "work sans",
                        transition: "background-color 0.4s ease",
                    },
                },
            },
        },
        typography: {
            fontFamily: "work sans",
        },
    });

    // styled attributes for the tooltip component
    const TooltipSX = {
        tooltip: {
            sx: (theme) => ({
                backgroundColor: theme.palette.tertiary.fixed.main,
                color: theme.palette.tertiary.fixed.on,
                fontSize: theme.typography.caption.fontSize,
                borderRadius: 10,
                padding: "0.5rem 1rem",
            }),
        },
    };

    // custom styled component for the snackbar
    // the styled options are provided on the module package
    const StyledMaterialDesignContent = styled(MaterialDesignContent)(
        ({ theme }) => ({
            color: theme.palette.text.primary,
            borderRadius: 20,
            transition: (theme) => `${theme.transitions.create()} !important`,
            "&.notistack-MuiContent-success": {
                backgroundColor: systemTheme ? green[900] : green[300],
            },
            "&.notistack-MuiContent-error": {
                backgroundColor: systemTheme ? red[900] : red[300],
            },
            "&.notistack-MuiContent-warning": {
                backgroundColor: systemTheme ? orange[900] : orange[300],
            },
            "&.notistack-MuiContent-info": {
                color: theme.palette.tertiary.main,
                backgroundColor: theme.palette.background.high,
            },
        })
    );

    // custom styled Button Components
    const CustomButton = styled(Button)(({ theme }) => ({
        textTransform: "none",
        color: theme.palette.secondary.main,
        borderRadius: 40,
        backgroundColor: theme.palette.background.low,
        padding: "0.6rem 1.5rem",
        fontSize: theme.typography.h6.fontSize,
        border: `2px solid ${theme.palette.dividervar}`,
        transition: `${theme.transitions.create()} !important`,
        "&:hover": {
            color: theme.palette.tertiary.container.on,
            backgroundColor: theme.palette.primary.container.main,
            border: `2px solid ${theme.palette.primary.container.on}`,
        },
    }));

    return (
        <ThemeProvider theme={material3Theme}>
            {/* dialog npm component that utlizes the material ui dialog component */}
            <ConfirmProvider
                defaultOptions={{
                    confirmationButtonProps: {
                        startIcon: <CheckCircleRounded color="primary" />,
                    },
                    cancellationButtonProps: {
                        startIcon: <CancelRounded color="primary" />,
                    },
                    cancellationText: "No",
                    confirmationText: "Yes",
                    dialogProps: {
                        maxWidth: "xs",
                        slotProps: {
                            backdrop: {
                                sx: (theme) => ({
                                    backgroundColor: theme.palette.backdrop,
                                }),
                            },
                        },
                        disableScrollLock: true,
                        PaperProps: {
                            elevation: 0,
                            sx: (theme) => ({
                                cursor: "default",
                                borderRadius: 10,
                                backgroundColor: theme.palette.background.low,
                                padding: "20px 0px 20px 0",
                            }),
                        },
                    },
                    titleProps: {
                        fontSize: (theme) => theme.typography.h4.fontSize,
                        fontWeight: 500,
                        textAlign: "center",
                        color: (theme) => theme.palette.primary.main,
                    },
                    contentProps: {
                        sx: (theme) => ({
                            ...theme.typography.body1,
                            textAlign: "center",
                        }),
                    },
                    dialogActionsProps: {
                        sx: {
                            justifyContent: "center",
                            alignItems: "center",
                            ".MuiButton-root": (theme) => ({
                                textTransform: "none",
                                fontSize: "1rem",
                                borderRadius: 50,
                                backgroundColor:
                                    theme.palette.background.highest,
                                padding: "8px 20px",
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.secondary.container.main,
                                },
                            }),
                        },
                    },
                }}
            >
                <CssBaseline enableColorScheme />

                {/* snackbar component */}
                <SnackbarProvider
                    preventDuplicate
                    maxSnack={1}
                    iconVariant={{
                        warning: (
                            <CircularProgress
                                disableShrink
                                size={20}
                                sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                    marginRight: 1,
                                })}
                            />
                        ),
                    }}
                    Components={{
                        success: StyledMaterialDesignContent,
                        warning: StyledMaterialDesignContent,
                        error: StyledMaterialDesignContent,
                        info: StyledMaterialDesignContent,
                    }}
                    action={(snackbarId) => (
                        <IconButton onClick={() => closeSnackbar(snackbarId)}>
                            <CloseRounded />
                        </IconButton>
                    )}
                />

                {/* backdrop component responsible for showing loading */}
                <Backdrop
                    sx={(theme) => ({
                        transition: `${theme.transitions.create()} !important`,
                        backgroundColor: theme.palette.backdrop,
                        zIndex: 999,
                        display: "flex",
                        flexDirection: "column",
                    })}
                    open={showLoading}
                >
                    <CircularProgress disableShrink color="primary" />
                </Backdrop>

                {/* Header component */}
                <Header isMobile={isMobile} />

                {/* Main components */}
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    mb={4}
                    pt="10rem"
                    component={Container}
                >
                    {loggedUser ? (
                        <Tasks
                            isMobile={isMobile}
                            loggedUser={loggedUser}
                            TooltipSX={TooltipSX}
                            CustomButton={CustomButton}
                            setLoggedUser={setLoggedUser}
                            setShowLoading={setShowLoading}
                        />
                    ) : (
                        <UserAuth
                            isMobile={isMobile}
                            CustomButton={CustomButton}
                            setLoggedUser={setLoggedUser}
                            setShowLoading={setShowLoading}
                        />
                    )}

                    <Divider flexItem />

                    {/* Footer */}
                    <Stack direction={isMobile ? "column" : "row"} spacing={4}>
                        <CustomButton
                            startIcon={<ViewQuiltRounded color="primary" />}
                            onClick={() =>
                                window.open(
                                    "https://github.com/harmeet9013/EmergentX-assesment"
                                )
                            }
                        >
                            Frontend Source
                        </CustomButton>
                        <CustomButton
                            startIcon={<DnsRounded color="primary" />}
                            onClick={() =>
                                window.open(
                                    "https://github.com/harmeet9013/EmergentX-assesment-server"
                                )
                            }
                        >
                            Backend Source
                        </CustomButton>
                    </Stack>
                </Stack>
            </ConfirmProvider>
        </ThemeProvider>
    );
}
