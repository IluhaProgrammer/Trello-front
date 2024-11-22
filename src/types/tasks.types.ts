import { IBase } from "./root.types"

export enum EnumTaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ITaskResponse extends IBase {
    name: string
    priority?: EnumTaskPriority
    isCompleted: boolean
}

export type TypeTaskFromState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>