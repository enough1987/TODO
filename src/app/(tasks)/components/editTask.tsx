'use client'

import { FORMAT, ITask, MIN_DATE, POST_EDIT_LIST_HEADERS, PRIORITIES } from "@/api/dictioneries";
import { editTaskApi } from "@/api/tasks";
import { startTransition, useActionState, useEffect } from "react";
import FormButton from "../../../components/formButton";
import { useStoreInContext } from "@/store/storeProvider";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import dayjs from "dayjs";
import FormDatePicker from "@/components/formDatePicker";
import Box from "@mui/material/Box";

export function EditTask({ task }: { task: ITask }) {
  const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
  const [state, formAction, pending] = useActionState(editTaskApi, { data: task, error: null });
  const editable = useStoreInContext((state) => state.editable);
  const resetEditable = useStoreInContext((state) => state.resetEditable);

  useEffect(() => {
    resetEditable?.();
  }, [state.data?.name, state.data?.due_date, state.data?.priority, resetEditable]);

  useEffect(() => {
    setPendingGlocal?.(pending);
  }, [pending, setPendingGlocal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPendingGlocal?.(true);
    const data = new FormData(e.currentTarget);
    data.set('due_date', dayjs(data.get('due_date') as string).toISOString());
    startTransition(() => {
        formAction(data);
    });
  };

  if(editable?.[state?.data?.id as string]) console.log('state', state);

  return (
    <form 
        key={state.resetKey}
        action={formAction}
        onSubmit={onSubmit}
        className="flex w-[50rem]" 
        aria-labelledby="edit-task-form"
        noValidate
    >
        <Box   
            className="pl-2 pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[0].width }}>
            {
                !editable?.[state?.data?.id as string] 
                ? <Box className="truncate p-2">{state.data?.name ?? 'N/A'}</Box>
                :   <FormInput label="name" value={state?.data?.name as string} />
            }
        </Box>
        <Box   
            className="pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[1].width }}>
            {
                !editable?.[state.data?.id as string] 
                ? <Box className="truncate p-2">{dayjs(state.data?.due_date as unknown as string)?.format(FORMAT)}</Box>
                : <FormDatePicker 
                    label="due_date"             
                    value={dayjs(state?.data?.due_date || MIN_DATE)}
                    minDate={dayjs(MIN_DATE)} 
                />
            }
        </Box>
        <Box  
            className="pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[2].width }}>
            {
                !editable?.[state.data?.id as string]
                ? <Box className="truncate p-2">{state.data?.priority ?? 'N/A'}</Box>
                : <FormSelect label="priority" defaultValue={state?.data?.priority as string} options={PRIORITIES} />
            }
        </Box>
        {
            editable?.[state.data?.id as string] && (
                <Box sx={{
                    width: '11.875rem',
                }}
                className="p-2">
                    <FormButton label='Save'type="submit" />
                </Box>
            )
        }
    </form>
  );
}