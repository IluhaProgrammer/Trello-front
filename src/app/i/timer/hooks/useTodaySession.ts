import { pomodoroService } from "@/services/pomodoro.service"
import type { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import { useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useLoadSetting } from "./useLoadSettings"
import type { ITimerState } from "../timer.types"

interface IUseTodaySession {
    setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
    setSecondLeft: Dispatch<SetStateAction<number>>
}

export function useTodaySession({
    setActiveRound, 
    setSecondLeft
}: ITimerState) {
    const {workInterval} = useLoadSetting()

    const {
        data: sessionResponse,
        isLoading,
        refetch,
        isSuccess
    } = useQuery({
        queryKey: ['get today session'],
        queryFn: () => pomodoroService.getTodaySession()
    })

    const rounds = sessionResponse?.data.pomodoroRounds

    useEffect(() => {

        if (isSuccess && rounds) {
            const activeRound = rounds.find(round => !round.isCompleted)
            setActiveRound(activeRound)

            if (activeRound && activeRound?.totalSeconds !== 0) {
                setSecondLeft(activeRound.totalSeconds)
            }
        }

    }, [isSuccess, rounds])

    return {
        sessionResponse, isLoading, workInterval
    }
}