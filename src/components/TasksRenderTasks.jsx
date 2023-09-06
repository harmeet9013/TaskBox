import { TransitionGroup } from "react-transition-group";
import {
    Checkbox,
    Collapse,
    Divider,
    Grow,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

export default function TasksRenderTasks(props) {
    return (
        <Grow in={Boolean(props.allTasks.length)} timeout={{ enter: 500 }}>
            <Stack
                spacing={2}
                sx={(theme) => ({
                    width: "100%",
                    backgroundColor: theme.palette.background.low,
                    borderRadius: 10,
                    padding: props.isMobile ? "1.5rem" : "2rem",
                })}
            >
                <Typography variant="h4" align="left" color="secondary">
                    Your list
                </Typography>

                <Divider
                    flexItem
                    sx={(theme) => ({
                        width: 80,
                        borderBottomWidth: 5,
                        borderRadius: 10,
                    })}
                />

                <TransitionGroup>
                    {props.allTasks &&
                        props.allTasks.map((task) => (
                            <Collapse
                                key={task.id}
                                timeout={{ enter: 250, exit: 250 }}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="space-between"
                                    width="100%"
                                    mb={1.5}
                                    sx={(theme) => ({
                                        cursor: "default",
                                    })}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        <Tooltip
                                            title="Mark done"
                                            disableInteractive
                                            componentsProps={props.TooltipSX}
                                        >
                                            <Checkbox
                                                checked={task.completed}
                                                onChange={(event) => {
                                                    props.handleDoneTask(
                                                        task.id,
                                                        event.target.checked
                                                    );
                                                }}
                                                color="primary"
                                            />
                                        </Tooltip>
                                        <Typography
                                            variant="body1"
                                            align="left"
                                            sx={(theme) => ({
                                                textDecoration: task.completed
                                                    ? "line-through"
                                                    : "none",
                                            })}
                                        >
                                            {task.task}
                                        </Typography>
                                    </Stack>

                                    <Tooltip
                                        title="Delete task"
                                        disableInteractive
                                        componentsProps={props.TooltipSX}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                props.handleTaskDelete(task.id)
                                            }
                                        >
                                            <DeleteRounded color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Collapse>
                        ))}
                </TransitionGroup>
            </Stack>
        </Grow>
    );
}
