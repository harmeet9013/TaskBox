"use client";

import {
    Box,
    Card,
    Fade,
    Slide,
    Stack,
    Tooltip,
    Divider,
    useTheme,
    Collapse,
    Checkbox,
    Container,
    Typography,
    IconButton,
    CardContent,
    LinearProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { DeleteRounded } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
//
import {
    GET_REQUEST,
    PUT_REQUEST,
    FormProvider,
    RHFTextField,
    POST_REQUEST,
    DELETE_REQUEST,
    useSettingsContext,
} from "@/resources";
import { endpoints, PATHS } from "@/config";

export const HomeView = () => {
    const theme = useTheme();
    const router = useRouter();
    const formMethods = useForm();
    const { session } = useSettingsContext();

    const [allTasks, setAllTasks] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isUpdatingDeleting, setIsUpdatingDeleting] = useState(false);

    const handleLogout = () => {
        signOut({ redirect: false });
        router.push(PATHS["login"]);
    };

    const fetchTasks = async () => {
        setIsFetching(true);

        const response = await GET_REQUEST(endpoints["tasks"], {
            user: session?.user?.key,
        });

        if (response?.status) {
            // do something
            setAllTasks([...response?.data?.tasks]);
        } else {
            enqueueSnackbar({
                message: response?.message || "Unexpected Error",
                variant: "error",
            });
        }

        setIsFetching(false);
    };

    const handleCreateTask = formMethods["handleSubmit"](async (data) => {
        const response = await POST_REQUEST(endpoints["tasks"], data, {
            user: session?.user?.key,
        });

        if (!!response.status) {
            setAllTasks(response?.data?.tasks);
            // await fetchTasks();
            formMethods["reset"]();
        } else {
            enqueueSnackbar({
                message: response?.message || "Unexpected Error",
                variant: "error",
            });
        }
    });

    const handleUpdateTask = async (data) => {
        setIsUpdatingDeleting(true);

        const response = await PUT_REQUEST(endpoints["tasks"], data, {
            user: session?.user?.key,
        });

        if (!!response.status) {
            setAllTasks((prevState) =>
                prevState?.map((item) =>
                    item?.key === response?.data?.key ? response?.data : item
                )
            );
        } else {
            enqueueSnackbar({
                message: response?.message || "Unexpected Error",
                variant: "error",
            });
        }

        setIsUpdatingDeleting(false);
    };

    const handleDeleteTask = async (task_id) => {
        setIsUpdatingDeleting(true);

        const response = await DELETE_REQUEST(endpoints["tasks"], {
            task: task_id,
        });

        if (!!response.status) {
            setAllTasks(response?.data?.tasks);
        } else {
            enqueueSnackbar({
                message: response?.message || "Unexpected Error",
                variant: "error",
            });
        }

        setIsUpdatingDeleting(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Container maxWidth="md">
            <Fade in={true}>
                <Stack
                    pt={4}
                    gap={6}
                    width={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" fontWeight={200}>
                        hey{" "}
                        <Typography
                            variant="inline"
                            color="tertiary"
                            fontWeight={600}
                        >
                            {session?.user?.name}
                        </Typography>
                        !
                        <br />
                        {"what's on your mind today?"}
                    </Typography>

                    <FormProvider
                        style={{
                            width: "100%",
                        }}
                        methods={formMethods}
                        onSubmit={handleCreateTask}
                    >
                        <Card variant="outlined">
                            <CardContent>
                                <Stack
                                    gap={4}
                                    width={1}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <RHFTextField
                                        name="task"
                                        color="tertiary"
                                        variant="outlined"
                                        label="what's up?"
                                        disabled={
                                            formMethods["formState"][
                                                "isSubmitting"
                                            ] ||
                                            isFetching ||
                                            isUpdatingDeleting
                                        }
                                    />

                                    <Stack
                                        width={1}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Tooltip title="logout">
                                            <IconButton
                                                type="button"
                                                disabled={
                                                    formMethods["formState"][
                                                        "isSubmitting"
                                                    ] ||
                                                    isFetching ||
                                                    isUpdatingDeleting
                                                }
                                                onClick={handleLogout}
                                                sx={{
                                                    p: 2,
                                                }}
                                            >
                                                <ArrowBackIosRounded />
                                            </IconButton>
                                        </Tooltip>

                                        <LoadingButton
                                            loading={
                                                formMethods["formState"][
                                                    "isSubmitting"
                                                ] ||
                                                isFetching ||
                                                isUpdatingDeleting
                                            }
                                            type="submit"
                                            color="tertiary"
                                            variant="contained"
                                            startIcon={<AddRounded />}
                                            sx={{
                                                py: 2,
                                                px: 4,
                                            }}
                                        >
                                            create
                                        </LoadingButton>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </FormProvider>

                    <Card
                        variant="outlined"
                        sx={{
                            width: 1,
                            overflow: "hidden",
                            transition: theme.transitions.create(["height"]),
                        }}
                    >
                        <CardContent>
                            <Stack
                                width={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Slide direction="down" in={!!isFetching}>
                                    <Box
                                        width={0.5}
                                        sx={{
                                            transition:
                                                theme.transitions.create([
                                                    "height",
                                                ]),
                                            height: !!isFetching ? "auto" : 0,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            align="left"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            please wait...
                                        </Typography>
                                        <LinearProgress color="tertiary" />
                                    </Box>
                                </Slide>

                                <Slide
                                    unmountOnExit
                                    direction="up"
                                    in={!!allTasks?.length || !isFetching}
                                >
                                    <Stack width={1} gap={2}>
                                        <Typography
                                            width={1}
                                            align={
                                                !!allTasks?.length
                                                    ? "left"
                                                    : "center"
                                            }
                                            variant="h4"
                                            fontWeight={500}
                                            color={
                                                !!allTasks?.length
                                                    ? "text.primary"
                                                    : "text.disabled"
                                            }
                                        >
                                            {!!allTasks?.length
                                                ? `your tasks`
                                                : `create some tasks`}
                                        </Typography>

                                        {!!allTasks?.length && (
                                            <Divider flexItem />
                                        )}

                                        <Stack
                                            width={1}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <TransitionGroup
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {allTasks?.map(
                                                    (item, index) => (
                                                        <Collapse key={index}>
                                                            <Stack
                                                                width={1}
                                                                direction="row"
                                                                alignItems="center"
                                                                justifyContent="space-between"
                                                            >
                                                                <Stack
                                                                    width={1}
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            item?.is_done
                                                                        }
                                                                        onChange={() => {
                                                                            handleUpdateTask(
                                                                                {
                                                                                    ...item,
                                                                                    is_done:
                                                                                        !item?.is_done,
                                                                                }
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !!isUpdatingDeleting
                                                                        }
                                                                    />

                                                                    <Typography variant="body1">
                                                                        {
                                                                            item?.task
                                                                        }
                                                                    </Typography>
                                                                </Stack>

                                                                <Tooltip
                                                                    title="delete task"
                                                                    disableInteractive
                                                                >
                                                                    <IconButton
                                                                        type="button"
                                                                        color="error"
                                                                        onClick={() =>
                                                                            handleDeleteTask(
                                                                                item?.key
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            !!isUpdatingDeleting
                                                                        }
                                                                    >
                                                                        <DeleteRounded />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Collapse>
                                                    )
                                                )}
                                            </TransitionGroup>
                                        </Stack>
                                    </Stack>
                                </Slide>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Fade>
        </Container>
    );
};
