import LoginForm from './components/LoginForm';
import { Card, Typography,  } from "@mui/material"
const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className='p-8' sx={{ borderRadius: 2}}>
        <Typography variant='h4' className='font-extrabold tracking-tighter' align='center'>Welcome!</Typography>
        <Typography variant='body1' align='center' color='primary'>Please sign in to continue</Typography>
        <LoginForm />
      </Card>
    </div>
  );
}

export default LoginPage