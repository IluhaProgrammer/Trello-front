import { pomodoroService } from "@/services/pomodoro.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"




export function useCreateSession() {

    const  queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationKey: ['create new session'],
        mutationFn: () => pomodoroService.createSession(),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get today session']
            })
        }
    })

    return {
        mutate, isPending
    }
}