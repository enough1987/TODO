'use client'

import { FORMAT, ITask, MIN_DATE, POST_EDIT_LIST_HEADERS, PRIORITIES, toastCofig } from "@/api/dictioneries";
import { editTaskApi } from "@/api/tasks";
import FormButton from "../../../components/formButton";
import { useStoreInContext } from "@/store/storeProvider";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import { format } from 'date-fns';
import FormDatePicker from "@/components/formDatePicker";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { taskSchema } from "@/api/validation";
import { useEffect } from "react";

export function EditTask({ task }: { task: ITask }) {
  const editable = useStoreInContext((state) => state.editable);
  const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
  const resetEditable = useStoreInContext((state) => state.resetEditable);

    const formik = useFormik({
      initialValues: task,
      validateOnMount: false,
      validateOnChange: false,
      validationSchema: toFormikValidationSchema(taskSchema),
      onSubmit: async (values) => {
        setPendingGlocal?.(true);
  
        try {
          const data: ITask = {
                id: task.id,
                name: values.name,
                due_date: values.due_date,
                priority: values.priority,
                completed: task.completed,
                created: task.created,
          }
          const res = await editTaskApi(data);
  
          if(res.error) toast.error(res.error as string, toastCofig);
          if(res.data) resetEditable?.();
        } catch(error) {
          toast.error(error as string, toastCofig)
        } finally {
          setPendingGlocal?.(false);
        }
      },
    });

    useEffect(() => {
        formik.setValues(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editable]);

  return (
    <form 
        onSubmit={formik.handleSubmit}
        className="flex w-[50rem]" 
        aria-labelledby="edit-task-form"
        noValidate
    >
        <Box   
            className="pl-2 pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[0].width }}>
            {
                !editable?.[task?.id as string] 
                ? <Box className="truncate p-2">{formik.values.name ?? 'N/A'}</Box>
                :   <FormInput label="name" 
                        value={formik.values.name}
                        error={formik.touched.name && !!formik.errors.name}
                        onChange={(value) => formik.setFieldValue('name', value)}
                />
            }
        </Box>
        <Box   
            className="pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[1].width }}>
            {
                !editable?.[task?.id as string] 
                ? <Box className="truncate p-2">{format(new Date(task?.due_date), FORMAT)}</Box>
                : <FormDatePicker 
                    label="due_date"             
                    value={formik.values.due_date ? new Date(formik.values.due_date) : MIN_DATE}
                    error={formik.touched.due_date && !!formik.errors.due_date}
                    onChange={(value) => formik.setFieldValue('due_date', value)}         
                    minDate={MIN_DATE} 
                />
            }
        </Box>
        <Box  
            className="pr-2"
            sx={{ width: POST_EDIT_LIST_HEADERS[2].width }}>
            {
                !editable?.[task?.id as string]
                ? <Box className="truncate p-2">{task?.priority ?? 'N/A'}</Box>
                : <FormSelect label="priority" 
                    empty={false}
                    value={formik.values.priority}
                    error={formik.touched.priority && !!formik.errors.priority}
                    onChange={(value) => formik.setFieldValue('priority', value)}
                    options={PRIORITIES} 
                />
            }
        </Box>
        {
            editable?.[task?.id as string] && (
                <Box sx={{
                    width: '11.875rem',
                }}
                className="">
                    <FormButton label='Save'type="submit" />
                </Box>
            )
        }
    </form>
  );
}