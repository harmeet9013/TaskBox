"use client";

import { FavoriteRounded } from "@mui/icons-material";
import { Stack, Typography, alpha, useTheme } from "@mui/material";
//
import { useSettingsContext } from "@/resources/settings";

export const Header = () => {
    const theme = useTheme();
    const { isMobile } = useSettingsContext();

    return (
        <Stack
            width={1}
            py={isMobile ? 1 : 2}
            direction={{ xs: "column", md: "row" }}
            gap={isMobile ? 2 : 1}
            justifyContent="space-between"
            alignItems="center"
            // position="relative"
            // position="sticky"
            // top={0}
            sx={{
                cursor: "default",
                backdropFilter: "blur(4px)",
                background: alpha(theme.palette.background.default, 0.8),
            }}
        >
            <Typography variant={isMobile ? "h3" : "h2"}>taskbox</Typography>

            <Stack
                direction={{ xs: "column", md: "row" }}
                gap={1}
                alignItems="center"
            >
                <Typography variant="button">
                    Created with love{" "}
                    <FavoriteRounded
                        fontSize="20"
                        sx={{
                            color: theme.palette.tertiary.main,
                            my: -0.2,
                            mx: 0.5,
                        }}
                    />
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: "Creattion",
                        fontWeight: 600,
                        textTransform: "none",
                        letterSpacing: 2,
                        pt: 1,
                    }}
                >
                    Harmeet Singh
                </Typography>
            </Stack>
        </Stack>
    );
};
