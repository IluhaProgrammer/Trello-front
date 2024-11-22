import type { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import type { ITimerState } from "../timer.types"
import { useLoadSetting } from "./useLoadSettings"
import { useUpdateRound } from "./useUpdateRound"


type TypeUseTimerActions = ITimerState & {
    rounds: IPomodoroRoundResponse[] | undefined
}

export function useTimerActions({
    activeRound, 
    secondLeft,
    setIsRunning, 
    rounds,
    setActiveRound
}: TypeUseTimerActions) {

    const {workInterval} = useLoadSetting()
    const {isUpdateRoundPending, updateRound} = useUpdateRound()

    const pauseHandler = () => {
        setIsRunning(false)

        if (activeRound?.id) 
            updateRound({
                id: activeRound?.id,
                data: {
                    totalSeconds: secondLeft,
                    isCompleted: Math.floor(secondLeft / 60) >= workInterval
                }
            })
    }

    const playHandler = () => {
        setIsRunning(true)
    }

    const nextRoundHandler = () => {
        if (!activeRound?.id) return 

        updateRound({
            id: activeRound?.id,
            data: {
                isCompleted: true,
                totalSeconds: workInterval * 60
            }
        })
    }

    const prevRoundHandler = () => {
        // ES2023
        const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

        if (!lastCompletedRound?.id) return 

        updateRound({
            id: lastCompletedRound?.id,
            data: {
                isCompleted: false,
                totalSeconds: 0
            }
        })

        setActiveRound(lastCompletedRound)
    }

    return {
        isUpdateRoundPending,
        pauseHandler, 
        playHandler, 
        nextRoundHandler,
        prevRoundHandler
    }
}
