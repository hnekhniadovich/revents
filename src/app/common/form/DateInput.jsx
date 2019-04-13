import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const InputInput = ({input: {value, onChange, ...restInputs}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DatePicker
                {...rest}
                placeholderText={placeholder}
                selected={value ? moment(value) : null}
                onChange={onChange}
                {...restInputs}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default InputInput;