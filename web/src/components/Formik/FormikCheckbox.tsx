import { Field } from 'formik';
import { Checkbox, FormControlLabel, CheckboxProps } from '@mui/material';

interface FormikCheckboxProps extends CheckboxProps {
  name: string;
  label: string;
}

const FormikCheckbox = ({ name, label, ...props }: FormikCheckboxProps) => {
  return (
    <Field name={name}>
      {({ field }: {field: React.JSX.Element}) => (
        <FormControlLabel
          control={<Checkbox {...field} {...props} />}
          label={label}
        />
      )}
    </Field>
  );
};

export default FormikCheckbox;
