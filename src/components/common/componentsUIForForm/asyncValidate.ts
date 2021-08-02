import {FormDataType} from "../../../redux/types/Types";

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

type ValueType = {email:string}

type ErrorType = {[key:string]:string}
type ValidateValueType = {[key:string]:string}

export const asyncValidate = (values:ValueType ) => {
    return sleep(1000).then(() => {
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            throw { email: 'Email already Exists' }
        }
    })
}

export const validate = (values: any) => {
    const errors: ErrorType = {}
    const requiredFields = ['email']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
}