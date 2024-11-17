"use client";

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const RHFTextField = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        {...other}
                        ref={field.ref}
                        error={!!error}
                        helperText={error ? error?.message : false}
                    />
                );
            }}
        />
    );
};
