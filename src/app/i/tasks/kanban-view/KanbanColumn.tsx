import type { ITaskResponse } from "@/types/tasks.types"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Dispatch, SetStateAction } from "react"
import { KanbanRow } from "./KanbanCard"
import { FILTERS } from "../columns.data"
import { filterTasks } from "../filterTasks"

import styles from '../kanban-view/Kanban-view.module.scss'
import { KanbanAddCardInput } from "./KanbanAddCardInput"

interface IKanbanRowParent {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanRowParent({value, label, items, setItems}: IKanbanRowParent) {

    return (
        <Droppable droppableId={value}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >

                    <div className={styles.column}>
                        <div className={styles.columnHeading}>{label}</div>

                        {filterTasks(items, value)?.map((item, index) => (
                        <Draggable 
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="z-[4] relative"
                                >
                                    <KanbanRow
                                        key={item.id}
                                        item={item}
                                        setItems={setItems}
                                    />
                                </div>
                            )}

                        </Draggable>
                    ))}

                        {provided.placeholder}

                        {value !== 'completed' && !items?.some(item => !item.id) && (
                        <KanbanAddCardInput
                            setItems={setItems}
                            filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
                        />
                        )}

                    </div>
                    </div>
                )}
        </Droppable>
    )
}