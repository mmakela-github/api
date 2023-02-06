class Error {
    constructor(message) {
        this.message = message;
        this.name = 'Error';
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError'
    }
}

// undefined values gets filtered out when using JSON.stringify(), so this will replace those with null
export const replacerForUndefined = (key, value) => {
    if (value === undefined) {
        return null;
    }
    return value;
}

export const checkIfNan = (value) => {
    return isNaN(value);
}

export const checkPositiveNumber = (value) => {
    return value > 0;
}

export const checkMissingValue = (value) => {
    return value === 0 ? false : !value;
}

export const VALIDATION_ERROR_MESSAGE = 'Following keys did not pass validation';

export const validateInput = (input) => {
    const errors = {};
    Object.keys(input).forEach((key) => {
        const value = input[key];
        const valueMissing = checkMissingValue(value);
        if (!valueMissing) {
            const isPositiveNumber = (!checkIfNan(value) && checkPositiveNumber(value));
            if (!isPositiveNumber) {
                errors[key] = { notPositive: true };
            }
        } else {
            errors[key] = { missing: true };
        }
    });
    if (Object.keys(errors).length > 0) {
        const errorInfo = {
            info: VALIDATION_ERROR_MESSAGE,
            ...errors
        }
        throw new ValidationError(errorInfo);
    }
    return errors
}