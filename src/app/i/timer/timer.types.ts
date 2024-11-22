import type { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import type { Dispatch, SetStateAction } from "react"

export interface ITimerState {
    secondLeft: number
    isRunning: boolean
    activeRound: IPomodoroRoundResponse | undefined

    setIsRunning: Dispatch<SetStateAction<boolean>>
    setSecondLeft: Dispatch<SetStateAction<number>>
    setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
}