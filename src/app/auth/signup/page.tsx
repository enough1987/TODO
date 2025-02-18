'use client';

import { signupApi } from "@/api/auth";
import Box from "@mui/material/Box";
import AuthForm from "../components/authForm";
import FormButton from "@/components/formButton";
import { redirect } from "next/navigation";

export default function Signup() {
    
  const handleRedirect = () => {
    redirect('/auth/login');
  };

  return (
    <Box className="h-screen flex justify-center mt-40">
      <AuthForm api={signupApi} label="Sign Up">
        <FormButton sx={{ mt: 2 }} label='Go to Sign In' onClick={handleRedirect}/>
      </AuthForm>
    </Box>
  )
}