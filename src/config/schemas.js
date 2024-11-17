import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const returnObject = (schema, values) => {
    return {
        resolver: yupResolver(schema),
        defaultValues: values,
    };
};

export const loginSchema = (defaultValues) => {
    const schema = Yup.object().shape({
        username: Yup.string().min(8).required(),
    });

    return returnObject(schema, defaultValues);
};
