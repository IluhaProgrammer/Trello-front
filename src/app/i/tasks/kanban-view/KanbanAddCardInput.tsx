import type { ITaskResponse } from "@/types/tasks.types"
import { Dispatch, SetStateAction } from "react"

import styles from '../kanban-view/Kanban-view.module.scss'

interface IKanbanAddRowInput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanAddCardInput({filterDate, setItems}: IKanbanAddRowInput) {

    const addCard = () => {
        setItems(prev => {
            if(!prev) return

            return [
                ...prev,
                {
                    id: '',
                    name: '',
                    isCompleted: false,
                    createdAt: filterDate
                }
            ]
        })
    }


    return (
        <div className='mt-5'>
            <button 
                onClick={addCard}
                className="italic opacity-40 text-sm"
            >
                Add task...
            </button>
        </div>
    )
}