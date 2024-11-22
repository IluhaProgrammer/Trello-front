'use client'

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ListView } from "./list-view/ListView"
import { Loader } from "lucide-react"
import { SwitcherView } from "./SwitcherView"
import { KanbanView } from "./kanban-view/KanbanView"

export type TypeView = 'list' | 'kanban'

export function TasksView() {
    const [type, setType, isLoading] = useLocalStorage<TypeView>(
        {
            key: 'view-type',
            defaultValue: 'list'
        }
    )

    if (isLoading) return <Loader/>

    return <div>
        <SwitcherView type={type} setType={setType}/>
        {type === 'list' ?
            <ListView/> : <KanbanView/>
        }
        
    </div>
}