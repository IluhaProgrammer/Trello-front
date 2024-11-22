'use client'

import { DragDropContext } from "@hello-pangea/dnd"
import { useTasks } from "../hooks/useTasks"
import { useTaskDnd } from "../hooks/useTaskDnd"

import styles from './Kanban-view.module.scss'
import { COLUMNS } from "../columns.data"
import { KanbanRowParent } from "./KanbanColumn"

export function KanbanView() {

    const {items, setItems} = useTasks()

    const {onDragEnd} = useTaskDnd()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.board}>
                {COLUMNS.map(column => (
                    <KanbanRowParent
                        key={column.value}
                        value={column.value}
                        label={column.label}
                        items={items}
                        setItems={setItems}
                    />
                ))}
            </div>  
        </DragDropContext>
    )
}