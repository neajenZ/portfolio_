import { useValidation } from "./useValidation"
import { useState } from "react"


interface OnChangeProps {
}

export const useInput = (initialValue: string, validations: any) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = (e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value.split(' ').join(''))
        console.log(e.currentTarget.value)
    }

    const onChangeWithoutSpace = (e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const onChangeNumber = (e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.currentTarget.value === '+' || e.currentTarget.value === '-') {
            return null
        } else {
            setValue(e.currentTarget.value)
        }
    }

    const onBlur = () => {
        setDirty(true)
    }

    const onClear = () => {
        setValue('')
        setDirty(false)
    }

    return {
        value,
        onChange,
        onChangeWithoutSpace,
        onBlur,
        onClear,
        onChangeNumber,
        isDirty,
        ...valid
    }
}
