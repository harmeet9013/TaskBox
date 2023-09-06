import {
    AddRounded,
    ArrowBackIosNewRounded,
    ArticleRounded,
} from "@mui/icons-material";
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import Cookies from "js-cookie";

export default function TasksCreateTask(props) {
    return (
        <Stack
            spacing={2}
            sx={(theme) => ({
                width: "100%",
                backgroundColor: theme.palette.background.low,
                borderRadius: 10,
                padding: props.isMobile ? "1.5rem" : "2rem",
            })}
        >
            <TextField
                fullWidth
                required
                autoFocus
                placeholder="What's up?"
                helperText="Give your task a meaningful name!"
                variant="outlined"
                value={props.newTask}
                type="text"
                onChange={(e) => {
                    props.setNewTask(e.target.value);
                }}
                onKeyDown={(event) =>
                    event.key === "Enter" && props.handleCreateNewTask()
                }
                inputProps={{ maxLength: 240 }}
                InputProps={{
                    sx: (theme) => ({
                        borderRadius: 10,
                        transition: `${theme.transitions.create()} !important`,
                        "&.Mui-focused": {
                            backgroundColor: theme.palette.background.low,
                        },
                        "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                                transition: theme.transitions.create(),
                                border: 2,
                                borderColor: theme.palette.dividervar,
                            },
                            "&:hover fieldset": {
                                borderColor:
                                    theme.palette.tertiary.container.on,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.container.on,
                            },
                        },
                    }),
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArticleRounded color="primary" />
                        </InputAdornment>
                    ),
                }}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Tooltip
                    title="Logout"
                    disableInteractive
                    componentsProps={props.TooltipSX}
                >
                    <IconButton
                        onClick={() => {
                            Cookies.remove("username");
                            props.setLoggedUser(null);
                        }}
                    >
                        <ArrowBackIosNewRounded color="secondary" />
                    </IconButton>
                </Tooltip>
                <props.CustomButton
                    onClick={props.handleCreateNewTask}
                    startIcon={<AddRounded />}
                    sx={{
                        width: "8rem",
                    }}
                >
                    Create
                </props.CustomButton>
            </Stack>
        </Stack>
    );
}
