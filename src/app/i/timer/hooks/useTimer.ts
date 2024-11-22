import type { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import { useEffect, useState } from "react"
import { useLoadSetting } from "./useLoadSettings"

export function useTimer() {

    const {workInterval, breakInterval} = useLoadSetting()

    const [isRunning, setIsRunning] = useState(false)
    const [isBreakingTime, setIsBreakingTime] = useState(false)

    const [secondLeft, setSecondLeft] = useState(workInterval * 60)
    const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

    useEffect(() => {

        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
                setSecondLeft(secondLeft => secondLeft - 1)
            }, 1000)
        } else if (!isRunning && secondLeft !== 0 && interval) {
            clearInterval(interval)
        }

        return () => {
            if (interval) clearInterval(interval)
        }

    }, [isRunning, secondLeft, workInterval, activeRound])

    useEffect(() => {
        // Ранний вход если время не истекло
        if (secondLeft > 0) return

        // Переключение режима и установка нового времени одной операции
        setIsBreakingTime(!isBreakingTime)
        setSecondLeft((isBreakingTime ? workInterval : breakInterval) * 60)

    }, [secondLeft, isBreakingTime, workInterval, breakInterval])

    return {
        setSecondLeft,
        setActiveRound,
        setIsRunning,
        secondLeft,
        activeRound,
        isRunning
    }
}