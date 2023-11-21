import { useState, useEffect } from "react"



export const useValidation = (value:string, validations:any) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [validInput, setValidInput] = useState(false)

    const isClear = () => {
        setEmailError(false);
        setMaxLengthError(false);
        setMinLengthError(false);
        setEmpty(false);
        setValidInput(false);
    }

    useEffect(() => {
        if(isEmpty || minLengthError || maxLengthError || emailError) {
            setValidInput(false)
        } else {
            setValidInput(true)
        }
    }, [isEmpty, minLengthError, maxLengthError, emailError])

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
            }
        }
    }, [value])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        validInput,
        isClear,
    }
}