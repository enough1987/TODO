'use client';

import { IAuthState, INITIAL_AUTH, IUser, toastCofig } from "@/api/dictioneries";
import { authSchema } from "@/api/validation";
import { useStoreInContext } from "@/store/storeProvider";
import { FormikProps, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";



export const useParamsList = (list: string[]) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const resault = list.reduce((acc: { [key: string]: string | null }, item) => {
        acc[item] = params.get(item) || '';
        return acc;
    }, {});

    return resault;
}

export const useAuthFormik = (api: (values: Omit<IUser,'id'>) => Promise<IAuthState> ) => {
        const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
        
        const formik = useFormik({
            initialValues: INITIAL_AUTH,
            validateOnMount: false,
            validateOnChange: false,
            validationSchema: toFormikValidationSchema(authSchema),
            onSubmit: async (values) => {
              setPendingGlocal?.(true);
        
              try {
                const res = await api(values);
        
                if(res.error) toast.error(res.error as string, toastCofig);
              } catch(error) {
                toast.error(error as string, toastCofig)
              } finally {
                setPendingGlocal?.(false);
              }
            },
          });

    return formik as FormikProps<Omit<IUser,'id'>>;
}