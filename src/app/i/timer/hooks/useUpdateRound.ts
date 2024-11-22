import { pomodoroService } from "@/services/pomodoro.service"
import { TypePomodoroRoundState } from "@/types/pomodoro.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateRound() {

    interface IUpdateRound {
        id: string
        data: TypePomodoroRoundState
    }
    
    const queryClient = useQueryClient()

    const {mutate: updateRound, isPending: isUpdateRoundPending} = useMutation({
        mutationKey: ['update round'],
        mutationFn: ({
            id,
            data
        }: IUpdateRound) => pomodoroService.updateRound(id, data),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['get today session']})
        }
    })
    
    return {
        updateRound, isUpdateRoundPending
    }
}