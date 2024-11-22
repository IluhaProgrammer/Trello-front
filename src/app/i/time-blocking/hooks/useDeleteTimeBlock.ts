import { timeBlockService } from "@/services/time-block.service"
import { ITimeBlockResponse } from "@/types/time-block.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteTimeBlock(itemId: string) {

    const queryClient = useQueryClient()

    const {mutate: deleteTimeBlock, isPending: isDeletePending} = useMutation({
        mutationKey: ['delete time-block', itemId],
        mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })


    return {
        deleteTimeBlock, isDeletePending
    }
}
