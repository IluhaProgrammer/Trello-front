import type { ITaskResponse } from "@/types/tasks.types"
import { Dispatch, SetStateAction } from "react"

import styles from '../list-view/List-view.module.scss'

interface IListAddRowInput {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListAddRowInput({filterDate, setItems}: IListAddRowInput) {

    const addRow = () => {
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
        <div className={styles.addRow}>
            <button 
                onClick={addRow}
                className="italic opacity-40 text-sm"
            >
                Add task...
            </button>
        </div>
    )
}