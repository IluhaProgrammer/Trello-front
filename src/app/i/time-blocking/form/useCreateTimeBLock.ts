import { timeBlockService } from "@/services/time-block.service"

import { TypeTimeBlockFromState } from "@/types/time-block.types"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateTimeBLock() {

    const queryClient = useQueryClient()

    const {mutate: createTimeBlock, isPending} = useMutation({
        mutationKey: ['create time-block'],
        mutationFn: (data: TypeTimeBlockFromState) =>
            timeBlockService.createTimeBlock(data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })

    return {    
        createTimeBlock,
        isPending
    }
}
