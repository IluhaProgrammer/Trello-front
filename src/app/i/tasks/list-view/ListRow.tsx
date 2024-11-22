import type { ITaskResponse, TypeTaskFromState } from "@/types/tasks.types"
import { Dispatch, SetStateAction } from "react"
import cn from 'clsx'
import { useTaskDebounce } from "../hooks/useTaskDebounce"
import { Controller, useForm } from "react-hook-form"
import { Grip, GripVertical, Loader, Trash } from "lucide-react"
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker"
import { SingleSelect } from "@/components/ui/task-edit/SignleSelect"
import { useDeleteTask } from "../hooks/useDeleteTask"
import styles from '../list-view/List-view.module.scss'
import { TransparentField } from "@/components/ui/fields/TransparentField"
import { CheckBox } from "@/components/ui/checkbox"

interface IListRow {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRow({item, setItems} : IListRow) {

    const {register, control, watch} = useForm<TypeTaskFromState>({
        defaultValues: {
            name: item.name,
            isCompleted: item.isCompleted,
            createdAt: item.createdAt,
            priority: item.priority
        }
    })

    const {deleteTask, isDeletePending} = useDeleteTask()

    useTaskDebounce({watch, itemId: item.id})
    


    return <div className={cn(
        styles.row,
        watch('isCompleted') ? styles.completed : '',
        'animation-opacity'
    )}>

        <div>
            <span className="inline-flex items-center gap-2.5 w-full">
                <button aria-describedby='todo-item'>
                    <GripVertical className={styles.grip}/>
                </button>

                <Controller
                    control={control}
                    name='isCompleted'
                    render={({field: {value, onChange}}) => (
                        <CheckBox
                            onChange={onChange}
                            checked={value}
                        />
                    )}
                />

                <TransparentField {...register('name')}/>
            </span>
        </div>

        <div>
            <Controller
                control={control}
                name='createdAt'
                render={({field: {value, onChange}}) => (
                    <DatePicker
                        onChange={onChange}
                        value={value || ''}
                    />
                )}
            />
        </div>

        <div className="capitalize">
                <Controller
                    control={control}
                    name='priority'
                    render={({field: {value, onChange}}) => (
                        <SingleSelect
                            data={['high', 'medium', 'low'].map(item => ({
                                value: item,
                                label: item
                            }))}
                            onChange={onChange}
                            value={value || ''}
                        />
                    )}
                />
        </div>

        <div>
            <button
                onClick={() => 
                    item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
                }
                className="opacity-50 transition-opacity hover:opacity-100"
            >
                {isDeletePending ? <Loader size={15}/> : <Trash size={15} />}
            </button>
        </div>

    </div>
}