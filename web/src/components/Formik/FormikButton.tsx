import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface FormikButtonProps extends ButtonProps {
  children: ReactNode;
}

const FormikButton = ({ children, type = "submit", ...props }: FormikButtonProps) => {
  return (
    <Button type={type} variant="contained" sx={{ borderRadius: 2}} fullWidth size='large' {...props}>
      {children}
    </Button>
  );
};

export default FormikButton;
