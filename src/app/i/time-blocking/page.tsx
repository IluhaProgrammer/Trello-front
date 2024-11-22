import { Heading } from "@/components/ui/Heading"
import { NO_INDEX_PAGE } from "@/constants/seo.constatns"
import { Metadata } from "next"
import { TimeBlocking } from "./form/TimeBlocking"

export const metadata: Metadata = {
    title: 'Time Blocking timer',
    ...NO_INDEX_PAGE
}

export default function TimeBlockingPage() {
    return (
        <div>
            <Heading title="Time Blocking" />
            <TimeBlocking/>
        </div>
    )
}