import {
    ArrowForwardRounded,
    CancelRounded,
    CheckCircleRounded,
    PersonRounded,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    Grow,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";

export default function UserAuth(props) {
    const confirmDialog = useConfirm();

    // this state hook hold the icon which is for helping user in setting a username
    const [usernameCheckIcon, setUsernameCheckIcon] = useState(
        <PersonRounded color="primary" />
    );
    // this state hook hold whether the username is valid or not
    // it is this hook that will determine if the POST request to the backend is sent or not
    const [usernameValid, setUsernameValid] = useState(false);

    // this function changes the icon depending on the user's entered value
    const handleChange = (e) => {
        const username = e.target.value;

        if (username) {
            if (username.length > 8 && username.length < 24) {
                setUsernameCheckIcon(<CheckCircleRounded color="success" />);
                setUsernameValid(true);
            } else {
                setUsernameCheckIcon(<CancelRounded color="error" />);
                setUsernameValid(false);
            }
        } else {
            setUsernameCheckIcon(<PersonRounded color="primary" />);
            setUsernameValid(false);
        }
    };

    // this function calls the authentication request function
    // only when username is valud (i.e. === true)
    const handleSubmit = (e) => {
        e.preventDefault();
        usernameValid && sendAuthRequest(e.target.username.value);
    };

    // function that handles the login request
    const sendAuthRequest = async (username) => {
        props.setShowLoading(true);

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/users`,
                {
                    username,
                }
            );
            Cookies.set("username", result.data.username);
            props.setLoggedUser(result.data.username);
        } catch (error) {
            confirmDialog({
                title: "Server Error",
                description:
                    "There was an error from the server. Try again later.",
                hideCancelButton: true,
            });
        } finally {
            props.setShowLoading(false);
        }
    };

    // this useEffect runs on the first render of component
    // determines if a cookie exist with the username
    // if it does, then sends the post request
    useEffect(() => {
        const username = Cookies.get("username");

        if (username) sendAuthRequest(username);
    }, []);

    return (
        <Grow in={true} timeout={{ enter: 500 }}>
            <Stack
                spacing={3}
                width={props.isMobile ? "100%" : "30rem"}
                sx={(theme) => ({
                    cursor: "default",
                })}
            >
                <Typography
                    variant="h4"
                    color={(theme) => theme.palette.tertiary.main}
                    fontWeight={500}
                    letterSpacing={3}
                    align="left"
                >
                    Login/Sign-up
                </Typography>

                <Divider
                    flexItem
                    sx={(theme) => ({
                        width: 80,
                        borderBottomWidth: 5,
                        borderRadius: 10,
                    })}
                />

                <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    gap={(theme) => theme.spacing(3)}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.low,
                        borderRadius: 10,
                        padding: "2rem",
                    })}
                >
                    <TextField
                        id="username"
                        fullWidth
                        required
                        helperText="Username should be more than 8 and less than 16 characters"
                        placeholder="Username"
                        variant="outlined"
                        type="text"
                        onChange={handleChange}
                        InputProps={{
                            sx: (theme) => ({
                                borderRadius: 50,
                                transition: `${theme.transitions.create()} !important`,
                                "&.Mui-focused": {
                                    backgroundColor:
                                        theme.palette.background.low,
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
                                        borderColor:
                                            theme.palette.primary.container.on,
                                    },
                                },
                            }),
                            startAdornment: (
                                <InputAdornment position="start">
                                    {usernameCheckIcon}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <props.CustomButton
                        type="submit"
                        disabled={!usernameValid}
                        endIcon={<ArrowForwardRounded />}
                    >
                        Continue
                    </props.CustomButton>
                </Box>
            </Stack>
        </Grow>
    );
}
