import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'

interface IUseLocalStorage<T> {
    key: string
    defaultValue: T
}

export function useLocalStorage<T>(
    {key, defaultValue}: IUseLocalStorage<T>
): [T, Dispatch<SetStateAction<T>>, boolean] {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const isMounted = useRef(false) // ДЛя того что бы в нужный момент загрузить данные в local storage
    const [value, setValue] = useState<T>(defaultValue)

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                setValue(JSON.parse(item))
            }
        } catch(e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }

        return () => {
            isMounted.current = false
        }
    }, [key])

    useEffect(() => {
        if(isMounted.current) {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])


    return [value, setValue, isLoading]
}