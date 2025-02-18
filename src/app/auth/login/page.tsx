'use client';

import { signinApi } from "@/api/auth";
import Box from "@mui/material/Box";
import AuthForm from "../components/authForm";
import FormButton from "@/components/formButton";
import { redirect } from "next/navigation";

export default function Login() {
  
  const handleRedirect = () => {
    redirect('/auth/signup');
  }

  return (
    <Box className="h-screen flex justify-center mt-40">
      <AuthForm api={signinApi} label='Sign In'>
        <FormButton sx={{ mt: 2 }} label='Go to Sign Up' onClick={handleRedirect}/>
      </AuthForm>
    </Box>
  )
}