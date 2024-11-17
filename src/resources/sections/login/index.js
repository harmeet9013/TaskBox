"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
//
import { loginSchema, PATHS } from "@/config";
import { FormProvider, RHFTextField } from "@/resources";

export const LoginView = () => {
    const router = useRouter();
    const formMethods = useForm(loginSchema({ username: "" }));

    const [error, setError] = useState(null);

    const onSubmit = formMethods["handleSubmit"](async (data) => {
        setError(null);
        const response = await signIn("credentials", {
            ...data,
            redirect: false,
        });

        if (!!response?.ok) {
            return router.push(PATHS["home"]);
        }

        setError(response?.error);
    });

    return (
        <FormProvider methods={formMethods} onSubmit={onSubmit}>
            <Container maxWidth="sm">
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
                                fontWeight={700}
                            >
                                login / sign up
                            </Typography>

                            <RHFTextField
                                name="username"
                                variant="standard"
                                color="tertiary"
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
                            >
                                Continue
                            </LoadingButton>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </FormProvider>
    );
};
