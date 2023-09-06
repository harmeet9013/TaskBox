import { Link, Slide, Stack, Typography } from "@mui/material";

export default function Header(props) {
    return (
        <Slide direction="down" in={true} timeout={{ enter: 500 }}>
            <Stack
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={(theme) => ({
                    position: "fixed",
                    padding: "0.5rem 0 0.5rem 0",
                    backgroundColor: theme.palette.background.header,
                    backdropFilter: "blur(10px)",
                    width: "100%",
                    borderBottom: `1px solid ${theme.palette.dividervar}`,
                    cursor: "default",
                    zIndex: "50",
                })}
            >
                <Typography
                    variant={props.isMobile ? "h5" : "h4"}
                    letterSpacing={3}
                    fontWeight={500}
                    sx={(theme) => ({
                        background: `linear-gradient(to left, ${theme.palette.tertiary.container.on}, ${theme.palette.primary.main})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    })}
                >
                    EmergentX Assesment
                </Typography>
                <Typography
                    variant="body1"
                    component={Link}
                    color={(theme) => theme.palette.text.primary}
                    onClick={() =>
                        window.open("https://github.com/harmeet9013")
                    }
                    sx={(theme) => ({ cursor: "pointer" })}
                >
                    Created by Harmeet Singh
                </Typography>
            </Stack>
        </Slide>
    );
}
