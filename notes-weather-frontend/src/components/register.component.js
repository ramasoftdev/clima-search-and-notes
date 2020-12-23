import React, { useState } from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/authActionCreators';
import { toast } from 'react-toastify';

const ReisterForm = ({ dispatchRegisterAction }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [error, setError] = useState({email: false, username: false, password: false, password_confirmation: false});

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(isFormInvalid()) updateErrorFlags();
        const user = {
            email: email,
            username: username,
            password: password,
            password_confirmation: password_confirmation
        }
        dispatchRegisterAction(user,
            () => {
                toast.success("User Created Successfully!");
                // console.log('User Created Successfully!');
            },
            (message) => {
                toast.error(`Error ${message}`);
                // console.log(`Error: ${message}`);
            });
    };

    const hanldeCancelForm = event => {
        event.preventDefault();
        setEmail('');
        setUsername('');
        setPassword('');
        setPassword_confirmation('');
        setError({email: false, username: false, password: false, password_confirmation: false});
    }

    const isFormInvalid = () => (!email || !username || !password || !password_confirmation);

    const updateErrorFlags = () => {
        const errObj = { email: false, username: false, password: false, password_confirmation: false};
        if(!email.trim()) errObj.email = true;
        if(!username.trim()) errObj.username = true;
        if(!password.trim()) errObj.password = true;
        if(!password_confirmation.trim()) errObj.password_confirmation = true;
        setError(errObj);
    }

    return (
        <React.Fragment>
            <h3>New User?</h3>
            <h4>Register Here</h4>

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input noValidate id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`form-control ${error.email ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input noValidate id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`form-control ${error.username ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input noValidate id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>

                <div className="form-group">
                    <label htmlFor="Password_confirmation">Password Confirmation</label>
                    <input noValidate id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        value={password_confirmation}
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                        className={`form-control ${error.password_confirmation ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                    Register | <i className="nc-icon nc-circle-10" style={{top: 3, fontSize: 15}}></i>
                </button>
                <button onClick={hanldeCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="nc-icon nc-simple-remove" style={{top: 3, fontSize: 15}}></i>
                </button>
            </form>
        </React.Fragment>
    );
};


const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (user, onSuccess, onError) =>
        dispatch(registerUser({ user }, onSuccess, onError))
})


export default connect(null, mapDispatchToProps)(ReisterForm);