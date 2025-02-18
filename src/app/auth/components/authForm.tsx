'use client'

import { IUser, IAuthState } from "@/api/dictioneries";
import FormButton from "@/components/formButton";
import FormInput from "@/components/formInput";
import { useAuthFormik } from "@/utils/customHooks";
import Box from "@mui/material/Box";

interface IProps {
    label: string;
    api: (data: Omit<IUser,'id'>) => Promise<IAuthState>;
    children?: React.ReactNode;
}

export default function AuthForm({ children, label, api }: IProps) {
  const formik = useAuthFormik(api);
  
  return (
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-96"
        aria-labelledby="signup-form"
        noValidate
      >
          <Box className="mb-4">
            <FormInput label="email"  
              value={formik.values.email}
              error={formik.touched.email && !!formik.errors.email}
              onChange={(value) => formik.setFieldValue('email', value)}
            />
          </Box>
          <Box className="mb-4">
            <FormInput label="Password"  
              value={formik.values.password}
              error={formik.touched.password && !!formik.errors.password}
              onChange={(value) => formik.setFieldValue('password', value)}
            />
          </Box>
          <Box>
          <FormButton
              sx={{ width: '100%' }} label={label} type="submit" />
          </Box>
          <Box>
            { children }
          </Box>

      </form>
  )
}