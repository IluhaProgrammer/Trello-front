import type { Metadata } from "next"
import { TasksView } from "./TasksView"
import { NO_INDEX_PAGE } from "@/constants/seo.constatns"
import { Heading } from "@/components/ui/Heading"

export const metadata: Metadata = {
    title: 'Tasks',
    ...NO_INDEX_PAGE
}
 
export default function TasksPage() {
    return <div>
        <Heading title="Tasks"/>
        <TasksView/>
    </div>
}