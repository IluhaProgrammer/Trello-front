import { ITaskResponse, TypeTaskFromState } from "@/types/tasks.types"
import debounce from "lodash.debounce"
import { useCallback, useEffect } from "react"
import { useCreateTask } from "./useCreateTask"
import { useUpdateTask } from "./useUpdateTask"
import { UseFormWatch } from "react-hook-form"

interface IUseTaskDebounce {
    watch: UseFormWatch<TypeTaskFromState>,
    itemId: string
}

export function useTaskDebounce({watch, itemId} : IUseTaskDebounce) {

    const { createTask } = useCreateTask()
    const { updateTask } = useUpdateTask()

    const debounceCreateTask = useCallback(
        debounce((formDate: TypeTaskFromState) => {
            createTask(formDate)
        }, 444),
        []
    )

    const debounceUpdateTask = useCallback(
        debounce((formDate: TypeTaskFromState) => {
            updateTask({id: itemId, data: formDate})
        }, 444),
        []
    )

    useEffect(() => {
        const {unsubscribe} = watch(formDate => {
            if (itemId) {
                debounceUpdateTask({
                    ...formDate,
                    priority: formDate.priority || undefined
                })
            } else {
                debounceCreateTask(formDate)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [watch(), debounceUpdateTask, debounceCreateTask])

    return {}
}