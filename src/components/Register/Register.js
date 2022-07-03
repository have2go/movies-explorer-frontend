import React from "react";
import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";

import "./Register.css";

function Register(props) {
    const validation = useFormAndValidation();
    const { name, email, password } = validation.values;

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(name, email, password);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            validation={validation}
            title="Добро пожаловать!"
            type="register"
            error={props.error}
        />
    );
}

export default Register;
