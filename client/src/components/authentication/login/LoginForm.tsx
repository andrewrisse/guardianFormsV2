import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useAuth0 } from '@auth0/auth0-react';
//

// ----------------------------------------------------------------------
type InitialValues = {
};
export default function LoginForm() {
  const { loginWithRedirect } = useAuth0();
  const isMountedRef = useIsMountedRef();


  const formik = useFormik<InitialValues>({
    initialValues: {
    },
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // await loginWithPopup(values.email, values.password);
        await loginWithRedirect();
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
