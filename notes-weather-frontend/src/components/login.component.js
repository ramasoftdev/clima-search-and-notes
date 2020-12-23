import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActionCreators';
import { toast } from 'react-toastify';

const LoginForm = ({ dispatchLoginAction }) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({login: false, password: false});

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(isFormInvalid()) updateErrorFlags();
        if ((login.length <= 1 || password.length <= 1 ) || (error.login || error.password))
            return false;
        const user = {
            login: login,
            password: password
        }
        dispatchLoginAction(user,
            () => {
                toast.success("User Loged In Successfully!");
                // console.log('User Loged In Successfully!');
            },
            (message) => {
                toast.error(`Error ${message}`);
                // console.log(`Error: ${message}`);
            });
    };

    const hanldeCancelForm = event => {
        event.preventDefault();
        setLogin('');
        setPassword('');
        setError({login: false, password: false});
    }

    const isFormInvalid = () => (!login || !password);

    const updateErrorFlags = () => {
        const errObj = { login: false, password: false};
        if(!login.trim()) errObj.login = true;
        if(!password.trim()) errObj.password = true;
        setError({login: true, password: true});
    }

    return (
        <React.Fragment>
            <h3>Have an Account??</h3>
            <h4>Login Here</h4>
            <Form noValidate onSubmit={handleOnSubmit}>
                <FormGroup>
                    <Label htmlFor="login">Email/Username</Label>
                    <Input noValidate id="login"
                        type="login"
                        placeholder="Email/Username"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className={`form-control ${error.login ? 'is-invalid' : ''}`}/>
                    <FormText className="invalid-feedback">Required</FormText>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input noValidate id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`}/>
                    <FormText className="invalid-feedback">Required</FormText>
                </FormGroup>
                <Button type="submit" color="primary" className="mr-2">Login | <i className="nc-icon nc-key-25" style={{top: 3, fontSize: 15}}></i></Button>
                <Button outline color="secondary" onClick={hanldeCancelForm}>Cancel | <i className="nc-icon nc-simple-remove" style={{top: 3, fontSize: 15}}></i></Button>
            </Form>
            
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (user, onSuccess, onError) =>
        dispatch(loginUser({ user }, onSuccess, onError))
})


export default connect(null, mapDispatchToProps)(LoginForm);