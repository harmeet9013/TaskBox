"use client";

import { FormProvider as RHFFormProvider } from "react-hook-form";

export const FormProvider = ({ methods, onSubmit, children, ...other }) => {
    return (
        <RHFFormProvider {...methods}>
            <form onSubmit={onSubmit} {...other}>
                {children}
            </form>
        </RHFFormProvider>
    );
};
