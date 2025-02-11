'use client'

import { INITIAL_TASK, MIN_DATE, PRIORITIES, toastCofig } from "@/api/dictioneries";
import { addTaskApi } from "@/api/tasks";
import FormButton from "../../../components/formButton";
import { useStoreInContext } from "@/store/storeProvider";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import FormDatePicker from "@/components/formDatePicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { taskSchema } from "@/api/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";

export function AddTask() {
  const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);

  const formik = useFormik({
    initialValues: INITIAL_TASK,
    validateOnMount: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(taskSchema),
    onSubmit: async (values) => {
      setPendingGlocal?.(true);

      try {
        const res = await addTaskApi(values);

        if(res.error) toast.error(res.error as string, toastCofig);
        if(res.data) formik.setValues(INITIAL_TASK);
      } catch(error) {
        toast.error(error as string, toastCofig)
      } finally {
        setPendingGlocal?.(false);
      }
    },
  });

  return (
    <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col"
        aria-labelledby="add-task-form"
        noValidate
    >
        <Typography component="h2" variant="h2" id="add-task-form" className="sr-only">Add Task Form</Typography>
        <Box className="mb-4">
          <FormInput label="name"  
            value={formik.values.name}
            error={formik.touched.name && !!formik.errors.name}
            onChange={(value) => formik.setFieldValue('name', value)}
        />
        </Box>
        <Box className="mb-4">
          <FormDatePicker 
            name="due_date" 
            label="Due date"   
            value={formik.values.due_date ? new Date(formik.values.due_date) : MIN_DATE}
            error={formik.touched.due_date && !!formik.errors.due_date}
            onChange={(value) => formik.setFieldValue('due_date', value)}         
            minDate={MIN_DATE} 
          />
        </Box>
        <Box className="mb-4">
          <FormSelect 
            empty={false}
            label="priority" 
            value={formik.values.priority}
            error={formik.touched.priority && !!formik.errors.priority}
            onChange={(value) => formik.setFieldValue('priority', value)}
            options={PRIORITIES} />
        </Box>
        <Box>
          <FormButton
            sx={{ width: '100%' }} label='Add task' type="submit" />
        </Box>
    </form>
  );
}
