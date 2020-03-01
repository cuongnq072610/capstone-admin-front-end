import { isNumber as _isNumber, isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

const phoneRegex = /^\+[0-9]{1,2} [0-9]*$/;
const emailRegex = /^[0-9A-Za-z_\-\.]{1,63}@[A-Za-z_\-]([A-Za-z_\-\.]{1,253})[A-Za-z_\-]$/;

const isRequired = (data) => {
    let err = {}
    data.forEach(field => {
        if (_isNumber(field.value)) {
            if ((0, NaN).include(field.value)) {
                err = {
                    ...err,
                    [field.name]: 'Please fill all required fields.'
                }
            }
        } else if (_isEmpty(field.value)) {
            err = {
                ...err,
                [field.name]: 'Please fill all required fields.'
            }
        }
    })
    return err
};

const isRequiredImage = ({ name, data }) => {
    return (
        data && data.length === 0 || !data ? {
            [name]: 'Please choose some photos for your item.'
        } : {}
    )
}

const isEmail = ({ name, value }) => {
    return (
        value && !emailRegex.test(value) ?
            {
                [name]: 'Invalid type of email.'
            } : {}
    )
};

const isMaxLength = ({ name, value, max }) => {
    return (
        value && value.length > max ?
            {
                [name]: `Please enter ${name} less than ${max}.`
            } : {}
    )
};

const isMinLength = ({ name, value, min }) => {
    return (
        value && value.length < min ?
            {
                [name]: `Please enter ${name} more than ${min}.`
            } : {}
    )
};

const isEqualPassword = ({ name, password, rePassword }) => {
    return (
        password && rePassword && !_isEqual(password, rePassword) ?
            {
                [name]: 'Please enter Re-password equal to password.'
            } : {}
    )
}

export {
    isRequired,
    isEmail,
    isMaxLength,
    isMinLength,
    isEqualPassword,
    isRequiredImage,
}
