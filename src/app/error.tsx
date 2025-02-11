'use client'
 

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <Box className='flex flex-col items-center pt-20'>
      <Typography role="h6" component="h6" variant="h6" className='text-center'>Something went wrong!</Typography>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </Box>
  )
}