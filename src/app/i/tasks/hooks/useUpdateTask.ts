import { taskService } from "@/services/task.service"
import { TypeTaskFromState } from "@/types/tasks.types"
import { useQueryClient, useMutation } from "@tanstack/react-query"

export function useUpdateTask(key?: string) {

    const queryClient = useQueryClient()

    const {mutate: updateTask} = useMutation({
        mutationKey: ['update task', key],
        mutationFn: ({id, data}: {id: string, data: TypeTaskFromState}) => taskService.updateTask(id, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })

    return {updateTask}
}