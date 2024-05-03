import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

export const AlertRegisterForm = ({ formErrors, color, message }) => {
    return (
        <>
            {formErrors && <Alert variant={color}>{formErrors}</Alert>}
            {message && <Alert variant={color}>{message}</Alert>}
        </>
    );
};

AlertRegisterForm.propTypes = {
    formErrors: PropTypes.string,
    color: PropTypes.string,
    message: PropTypes.string,
};
