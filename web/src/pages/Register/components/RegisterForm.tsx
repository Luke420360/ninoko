import { Form, Formik } from 'formik';
import FormikTextField from '../../../components/Formik/FormikTextFields';
import FormikButton from '../../../components/Formik/FormikButton';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../../app/authApi';

const RegisterForm = () => {
    const [register, { isLoading, error }] = useRegisterMutation();
    interface RegisterFormValues {
        email: string;
        username: string;
        password: string;
        stayLoggedIn?: boolean;
    }

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            const { stayLoggedIn = false, ...registerData } = values;
            const result = await register({ ...registerData, stayLoggedIn }).unwrap();
            console.log('Registration successful:', result);
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };
  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
            <div className='p-2'>
                <FormikTextField name="email" label="Email" />
            </div>
            <div className='p-2'>
                <FormikTextField name="username" label="Username" />
            </div>
            <div className='p-2'>
                <FormikTextField name="password" label="Password" type="password" />
            </div>
            <div className='p-2 pt-4'>
                <FormikButton type="submit" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
                </FormikButton>
                {error && <Typography color="error">{error.toString()}</Typography>}
            </div>
            <div className='p-2'>
                <Typography variant='body1' align='center' color='primary'>
                    Already have an account?
                </Typography>
                <FormikButton type="button" color='primary' href='/login' variant='outlined'>
                Sign In
                </FormikButton>
            </div>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default RegisterForm;