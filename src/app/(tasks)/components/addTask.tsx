'use client'

import { INITIAL_TASK, ITask, MIN_DATE, PRIORITIES } from "@/api/dictioneries";
import { addTaskApi } from "@/api/tasks";
import { startTransition, useActionState, useEffect } from "react";
import FormButton from "../../../components/formButton";
import { useStoreInContext } from "@/store/storeProvider";
import dayjs from "dayjs";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import FormDatePicker from "@/components/formDatePicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function AddTask() {
  const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
  const [state, formAction, pending] = useActionState(addTaskApi, { data: INITIAL_TASK as ITask, error: null });

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

  return (
    <form 
        key={state.resetKey}
        className="flex flex-col"
        action={formAction}
        onSubmit={onSubmit}
        aria-labelledby="add-task-form"
        noValidate
    >
        <Typography component="h2" variant="h2" id="add-task-form" className="sr-only">Add Task Form</Typography>
        <Box className="mb-4">
          <FormInput label="name" value={state?.data?.name as string} />
        </Box>
        <Box className="mb-4">
          <FormDatePicker 
            name="due_date" 
            label="Due date"             
            value={dayjs(state?.data?.due_date || MIN_DATE)}
            minDate={dayjs(MIN_DATE)} 
          />
        </Box>
        <Box className="mb-4">
          <FormSelect 
            label="priority" value={state?.data?.priority as string} options={PRIORITIES} />
        </Box>
        <Box>
          <FormButton 
            sx={{ width: '100%' }} label='Add task' type="submit" />
        </Box>
    </form>
  );
}