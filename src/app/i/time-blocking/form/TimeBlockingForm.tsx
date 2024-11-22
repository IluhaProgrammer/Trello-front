import type { TypeTimeBlockFromState } from "@/types/time-block.types"
import { Controller, SubmitHandler, useFormContext } from "react-hook-form"
import { useUpdateTimeBlock } from "./useUpdateTimeBlock"
import { useCreateTimeBLock } from "./useCreateTimeBLock"
import { COLORS } from "./colors.data"
import { Field } from "@/components/ui/fields/Field"
import { SingleSelect } from "@/components/ui/task-edit/SignleSelect"
import { Button } from "@/components/ui/buttons/Button"

export function TimeBlockingForm() {

    const {register, control, watch, reset, handleSubmit, getValues} = useFormContext<TypeTimeBlockFromState>()

    const existedId = watch('id')

    const {updateTimeBlocks} = useUpdateTimeBlock(existedId)
    const {createTimeBlock, isPending} = useCreateTimeBLock()

    const onSubmit: SubmitHandler<TypeTimeBlockFromState> = data => {

        const {color, id, ...rest} = data
        const dto = {...rest, color: color || undefined}

        if (id) {
            updateTimeBlocks({
                id,
                data: dto
            })
        } else {
            createTimeBlock(dto)
        }

        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: '',
            id: undefined,
            order: 1
        })

    }

    return <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/5"
    >
        <Field
            {...register('name', {
                required: true
            })}
            id="name"
            label="Enter name"
            placeholder="Enter name"
            extra="mb-4"
        />

        <Field
            {...register('duration', {
                required: true,
                valueAsNumber: true
            })}
            id="duration"
            label="Enter duration (min.)"
            placeholder="Enter duration (min.)"
            isNumber
            extra="mb-4"
        />

        <div>
            <span className="inline-block mb-1.5">Color:</span>
            <Controller
                control={control}
                name="color"
                render={({field: {value, onChange}}) => (
                    <SingleSelect
                        onChange={onChange}
                        value={value || COLORS[COLORS.length - 1]}
                        data={COLORS.map(item => ({
                            value: item,
                            label: item
                        }))}
                        isColorSelect
                    />
                )}
            />
        </div>

        <Button
            type='submit'
            disabled={isPending}
            className="mt-6"
        >
            {existedId ? 'Update' : 'Create'}
        </Button>
    </form>
}
