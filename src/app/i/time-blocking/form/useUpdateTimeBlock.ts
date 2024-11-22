import { timeBlockService } from "@/services/time-block.service"
import { TypeTimeBlockFromState } from "@/types/time-block.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateTimeBlock(key?: string) {

    const queryClient = useQueryClient()

    const {mutate: updateTimeBlocks} = useMutation({
        mutationKey: ['update time-block', key],
        mutationFn: ({id, data}: {id: string; data: TypeTimeBlockFromState}) => 
            timeBlockService.updateTimeBlock(id, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })

    return {
        updateTimeBlocks
    }
}
