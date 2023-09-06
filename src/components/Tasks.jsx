import axios from "axios";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { Grow, Stack, Typography } from "@mui/material";

import TasksCreateTask from "./TasksCreateTask";
import TasksRenderTasks from "./TasksRenderTasks";

export default function Tasks(props) {
    const confirmDialog = useConfirm();

    const [allTasks, setAllTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [shouldFetch, setShouldFetch] = useState(true);

    const throwServerError = async () => {
        confirmDialog({
            title: "Server Error",
            description: "There was an error from the server. Try again later.",
            hideCancelButton: true,
        });
    };

    // function that handles request to create a new task CREATE
    const handleCreateNewTask = async () => {
        props.setShowLoading(true);

        if (newTask.length > 0) {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/newtask`, {
                    username: props.loggedUser,
                    task: newTask,
                });
                setNewTask("");
                setShouldFetch(true);
            } catch (error) {
                throwServerError();
            }
        } else {
            confirmDialog({
                title: "Invalid inputs",
                description:
                    "Make sure your input is less than 240 characters.",
                hideCancelButton: true,
            });
        }

        props.setShowLoading(false);
    };

    // function that fetches all the tasks from the backend READ
    const handleFetchTasks = async () => {
        props.setShowLoading(true);

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/alltasks`,
                { username: props.loggedUser }
            );
            setAllTasks(result.data);
        } catch (error) {
            throwServerError();
        } finally {
            props.setShowLoading(false);
        }
    };

    // function that handles the request to mark the task as done or not UPDATE
    const handleDoneTask = async (taskID, isDone) => {
        props.setShowLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/taskdone`, {
                taskID,
                username: props.loggedUser,
                isDone,
            });
            setShouldFetch(true);
        } catch (error) {
            throwServerError();
        }

        props.setShowLoading(false);
    };

    // function that handles the request to delete a specific task of user DELETE
    const handleTaskDelete = async (taskID) => {
        props.setShowLoading(true);

        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_API_URL}/deletetask`,
                {
                    header: {},
                    data: {
                        taskID,
                        username: props.loggedUser,
                    },
                }
            );
            enqueueSnackbar(result.data.message, { variant: "success" });
            setShouldFetch(true);
        } catch (error) {
            throwServerError();
        }

        props.setShowLoading(false);
    };

    // this useffect helps to fetchTasks when the shouldFetch is set to true
    useEffect(() => {
        shouldFetch && handleFetchTasks();

        setShouldFetch(false);
    }, [shouldFetch]);

    return (
        <Grow in={true} timeout={{ enter: 500 }}>
            <Stack
                spacing={4}
                width={props.isMobile ? "100%" : "40rem"}
                justifyContent="center"
                alignItems="center"
            >
                {/* top welcome text */}
                <Typography
                    variant={props.isMobile ? "h4" : "h3"}
                    fontWeight={300}
                    sx={(theme) => ({
                        cursor: "default",
                    })}
                >
                    Hey{" "}
                    <Typography
                        variant="inline"
                        color="primary"
                        fontWeight={600}
                    >
                        {props.loggedUser}
                    </Typography>
                    !
                    <br />
                    What's on your mind today?
                </Typography>

                <TasksCreateTask
                    newTask={newTask}
                    isMobile={props.isMobile}
                    TooltipSX={props.TooltipSX}
                    CustomButton={props.CustomButton}
                    handleCreateNewTask={handleCreateNewTask}
                    setNewTask={setNewTask}
                    setLoggedUser={props.setLoggedUser}
                />

                <TasksRenderTasks
                    allTasks={allTasks}
                    isMobile={props.isMobile}
                    TooltipSX={props.TooltipSX}
                    handleDoneTask={handleDoneTask}
                    handleTaskDelete={handleTaskDelete}
                />
            </Stack>
        </Grow>
    );
}
