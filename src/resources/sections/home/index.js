"use client";

import {
    Card,
    Stack,
    Tooltip,
    Divider,
    Checkbox,
    Container,
    Typography,
    IconButton,
    CardContent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
//
import {
    GET_REQUEST,
    POST_REQUEST,
    RHFTextField,
    FormProvider,
    useSettingsContext,
    PUT_REQUEST,
    DELETE_REQUEST,
} from "@/resources";
import { endpoints, PATHS } from "@/config";
import { DeleteRounded } from "@mui/icons-material";

export const HomeView = () => {
    const router = useRouter();
    const formMethods = useForm();
    const { session } = useSettingsContext();

    const [allTasks, setAllTasks] = useState(null);

    console.log(allTasks);

    const onSubmit = formMethods["handleSubmit"](async (data) => {
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

    const updateTask = async (data) => {
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
    };

    const fetchTasks = async () => {
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
    };

    const handleDeleteTask = async (task_id) => {
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
    };

    const handleLogout = () => {
        signOut({ redirect: false });
        router.push(PATHS["login"]);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Container maxWidth="md">
            <Stack
                width={1}
                gap={6}
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h4" fontWeight={200}>
                    Hey{" "}
                    <Typography
                        variant="inline"
                        color="tertiary"
                        fontWeight={600}
                    >
                        {session?.user?.name}
                    </Typography>{" "}
                    !
                    <br />
                    What's on your mind today?
                </Typography>

                <FormProvider
                    onSubmit={onSubmit}
                    methods={formMethods}
                    style={{
                        width: "100%",
                    }}
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
                                            onClick={handleLogout}
                                        >
                                            <ArrowBackIosRounded />
                                        </IconButton>
                                    </Tooltip>

                                    <LoadingButton
                                        loading={
                                            formMethods["formState"][
                                                "isSubmitting"
                                            ]
                                        }
                                        type="submit"
                                        color="tertiary"
                                        variant="contained"
                                        startIcon={<AddRounded />}
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
                    }}
                >
                    <CardContent>
                        <Stack
                            width={1}
                            gap={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                width={1}
                                align="left"
                                variant="h5"
                                fontWeight={500}
                            >
                                all tasks
                            </Typography>

                            <Divider flexItem />

                            <Stack
                                width={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                {allTasks?.map((item, index) => (
                                    <Stack
                                        width={1}
                                        key={index}
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
                                                checked={item?.is_done}
                                                onChange={() => {
                                                    updateTask({
                                                        ...item,
                                                        is_done: !item?.is_done,
                                                    });
                                                }}
                                            />

                                            <Typography variant="body1">
                                                {item?.task}
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
                                                    handleDeleteTask(item?.key)
                                                }
                                            >
                                                <DeleteRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
};
