import { TextField } from '@mui/material';
import { Field } from 'formik';
import { ReactNode } from 'react';

// Generische TextField-Komponente
interface FormikTextFieldProps {
  name: string;
  label: string;
  type?: string;
  props?: ReactNode[] | ReactNode | undefined | null;
}

const FormikTextField = ({ name, label, type = 'text', ...props }: FormikTextFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: { field: React.JSX.Element; meta: { touched: boolean; error?: string } }) => (
        <TextField
          sx={{ minWidth: 280 }}
          {...field}
          type={type}
          label={label}
          fullWidth
          variant="standard"
          error={meta.touched && Boolean(meta.error)} 
          helperText={meta.touched && meta.error ? meta.error : ''} 
          {...props}
        />
      )}
    </Field>
  );
};

export default FormikTextField;
