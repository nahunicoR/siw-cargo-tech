/*eslint-disable no-unused-vars*/

import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [error, setError] = useState({});

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
        setError(validate({ ...formState, [name]: value }))
    }


    const validate = (formState) => {
        let error = {}
        //verificar campos vacios
        if ([formState].length === 0) {
            return error
        }
        return error
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        onInputChange,
        onResetForm,
        validate,
        error
    }
}