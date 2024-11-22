import { pomodoroService } from "@/services/pomodoro.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// setSecondLeft(workInterval * 60) 

export function useDeleteSession(onDeleteSuccess: () => void) {

    const  queryClient = useQueryClient()

    const {mutate: deleteSession, isPending: isDeletePending} = useMutation({
        mutationKey: ['create new session'],
        mutationFn: (id: string) => pomodoroService.deleteSession(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get today session']
            })
            onDeleteSuccess()
        }
    })

    return {
        deleteSession, isDeletePending
    }
}