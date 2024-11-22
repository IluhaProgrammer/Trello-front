import type { PropsWithChildren } from "react"
import { SideBar } from "./sidebar/SideBar"
import { Header } from "./header/Header"

export function DashboardLayout({children}: PropsWithChildren<unknown>) {
    return <div className="grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]">
        <SideBar/>

        <main className="p-big-layout overflow-x-hidden max-h-screen relative">
            <Header/>
          {children}  
        </main>
    </div> 
}