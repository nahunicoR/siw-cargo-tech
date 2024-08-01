

export const validate = (input) => {
    let errors = {};

    if (!input.username) {
        errors.username = 'Usuario requerido';
    }

    if (!input.password) {
        errors.password = 'Password requerido';
    }
    return errors;
};