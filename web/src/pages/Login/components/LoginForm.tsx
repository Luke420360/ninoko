import { Form, Formik } from 'formik';
import FormikTextField from '../../../components/Formik/FormikTextFields';
import FormikButton from '../../../components/Formik/FormikButton';
import FormikCheckbox from '../../../components/Formik/FormikCheckbox';
import * as Yup from 'yup';
import { useLoginMutation } from '../../../app/authApi';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    interface LoginFormValues {
      email: string;
      password: string;
      stayLoggedIn: boolean;
    }

    const handleSubmit = async (values: LoginFormValues) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setCredentials({ access_token: result.access_token, refresh_token: result.refresh_token }));
      navigate('/company');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed');
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '', stayLoggedIn: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
            <div className='p-2'>
                <FormikTextField name="email" label="Email" />
            </div>
            <div className='p-2'>
                <FormikTextField name="password" label="Password" type="password" />
            </div>
            <div className='p-2'>
                <FormikCheckbox name="stayLoggedIn" label="Remember?" />
            </div>
             <div className='p-2'>
            <FormikButton type="submit" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </FormikButton>
            {error && <Typography color="error">{error.toString()}</Typography>}
          </div>
            <div className='p-2'>
                <FormikButton type="button" color='primary' href='/register' variant='outlined'>Sign Up</FormikButton>
            </div>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default LoginForm;