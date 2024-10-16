import { Card, Typography } from "@mui/material"
import RegisterForm from "./components/RegisterForm"

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className='p-8' sx={{ borderRadius: 2}}>
        <Typography variant='h4' className='font-extrabold tracking-tighter' align='center'>Welcome!</Typography>
        <Typography variant='body1' align='center' color='primary'>Please sign up to continue</Typography>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default RegisterPage