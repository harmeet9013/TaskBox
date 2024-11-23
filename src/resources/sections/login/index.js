"use client";

import {
    Card,
    CardContent,
    Container,
    Fade,
    Alert,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
//
import { loginSchema, PATHS } from "@/config";
import { FormProvider, RHFTextField, useSettingsContext } from "@/resources";

export const LoginView = () => {
    const router = useRouter();
    const { updateSession } = useSettingsContext();
    const formMethods = useForm(loginSchema({ username: "" }));

    const [error, setError] = useState(null);

    const onSubmit = formMethods["handleSubmit"](async (data) => {
        setError(null);
        const response = await signIn("credentials", {
            ...data,
            redirect: false,
        });

        if (!response?.error) {
            await updateSession();
            return router.push(PATHS["home"]);
        }

        setError(response?.error);
    });

    return (
        <FormProvider methods={formMethods} onSubmit={onSubmit}>
            <Container maxWidth="sm">
                <Fade in={true}>
                    <Card
                        variant="outlined"
                        sx={{
                            mt: 10,
                        }}
                    >
                        <CardContent>
                            <Stack
                                gap={2}
                                width={1}
                                direction="column"
                                alignItems="center"
                            >
                                <Typography
                                    pb={4}
                                    width={1}
                                    align="left"
                                    variant="h4"
                                    fontWeight={200}
                                >
                                    login / sign up
                                </Typography>

                                <RHFTextField
                                    name="username"
                                    variant="standard"
                                    color="tertiary"
                                    size="large"
                                    label="email/username"
                                />

                                <LoadingButton
                                    fullWidth
                                    loading={
                                        formMethods["formState"]["isSubmitting"]
                                    }
                                    size="large"
                                    type="submit"
                                    color="tertiary"
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        py: 2,
                                    }}
                                >
                                    Continue
                                </LoadingButton>
                            </Stack>
                        </CardContent>
                    </Card>
                </Fade>

                <Fade in={!!error} unmountOnExit>
                    <Alert
                        severity="error"
                        color="error"
                        variant="filled"
                        sx={{ mt: 4 }}
                    >
                        {error}
                    </Alert>
                </Fade>
            </Container>
        </FormProvider>
    );
};
