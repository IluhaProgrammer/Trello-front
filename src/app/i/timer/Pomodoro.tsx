'use client'

import { Loader, Pause, Play, RefreshCcw } from "lucide-react"
import { formatTime } from "./format-time"
import { useTimer } from "./hooks/useTimer"
import { useTimerActions } from "./hooks/useTimerActions"
import { useTodaySession } from "./hooks/useTodaySession"
import { PomodoroRounds } from "./rounds/PomodoroRounds"
import { useUpdateRound } from "./hooks/useUpdateRound"
import { useDeleteSession } from "./hooks/useDeleteSession"
import { Button } from "@/components/ui/buttons/Button"
import { useCreateSession } from "./hooks/useCreateSession"


export function Pomodoro() {

    const timerState = useTimer()
    const {isLoading, sessionResponse, workInterval} = useTodaySession(timerState)
    const rounds = sessionResponse?.data.pomodoroRounds

    const {mutate, isPending} = useCreateSession()

    const actions = useTimerActions({...timerState, rounds})
    const {deleteSession, isDeletePending} = useDeleteSession(() => timerState.setSecondLeft(workInterval * 60))

    return <div className="relative w-80 text-center">
        {!isLoading && (
            <div className="text-7xl font-semibold">
                {formatTime(timerState.secondLeft)}
            </div>
        )}
        {isLoading ? (
            <Loader/>
        ) : sessionResponse?.data ? (
            <>
                <PomodoroRounds
                    rounds={rounds}
                    nextRoundHandler={actions.nextRoundHandler}
                    prevRoundHandler={actions.prevRoundHandler}
                    activeRound={timerState.activeRound}
                />
                <button
                    className="mt-6 opacity-80 hover:opacity-100 transition-opacity"
                    onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
                    disabled={actions.isUpdateRoundPending}
                >
                    {timerState.isRunning ? <Pause size={30}/> : <Play size={30}/>}
                </button>
                <button
                    onClick={() => {
                        timerState.setIsRunning(false)
                        deleteSession(sessionResponse.data.id)
                    }}
                    className="absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity"
                    disabled={isDeletePending}
                >
                    <RefreshCcw size={19}/>
                </button>   
            </>
        ) : (
            <Button
                onClick={() => mutate()}
                className="mt-1"
                disabled={isPending}
            >
                Create session
            </Button>
        )}
    </div>
}
