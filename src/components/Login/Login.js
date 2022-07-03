import React from "react";
import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";

import "./Login.css";

function Login(props) {
    const validation = useFormAndValidation();
    const { email, password } = validation.values;

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(email, password);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            validation={validation}
            title="Добро пожаловать!"
            type="login"
            error={props.error}
        />
    );
}

export default Login;
