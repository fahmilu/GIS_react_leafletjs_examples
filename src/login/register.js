import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import CONFIG from "../config";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true); // State for password match validation
    const [validEmail, setValidEmail] = useState(true); // State for email validation
    const [validPassword, setValidPassword] = useState(true); // State for password validation
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for registration success
    const history = useNavigate();// Get the history object

    const submit = async (e) => {
        e.preventDefault();

        // Perform password match validation
        if (password !== repassword) {
            setPasswordMatch(false);
            return;
        }

        // Perform email validation
        if (!validateEmail(email)) {
            setValidEmail(false);
            return;
        }

        // Perform password validation
        if (!validatePassword(password)) {
            setValidPassword(false);
            return;
        }

        const user = {
            username: username,
            password: password,
            email: email,
        };

        try {
            const { data } = await axios.post(
                CONFIG.JWT_REGISTER,
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            //window.location.href = CONFIG.COOKIE_PATH;
            // Registration success, set the registrationSuccess state to true
            setRegistrationSuccess(true);
            console.log(data)
        } catch (error) {
            // Handle any error scenarios
            console.error(error);
        }
    };

    // Handle real-time password match validation
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === repassword);
    };

    const handleRePasswordChange = (e) => {
        setRePassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        // Check if the password has at least 8 characters and contains both letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div>
            {registrationSuccess ? ( // Render success message if registration is successful
                <div>
                    <h3>Account Pending Approval</h3>
                    <p>
                        We have sent the administrators a notice to approve your account associated with {email}. If the account is approved, you will receive a confirmation notice.
                    </p>
                </div>
            ) : (<div>
                <p>Please Register:</p>
                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={submit}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Register</h3>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Enter Username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Enter a valid email"
                                    name="email"
                                    type="text"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {!validEmail && <p>Please enter a valid email address.</p>}
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    value={password}
                                    required
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    name="re-password"
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter Again your password"
                                    value={repassword}
                                    required
                                    onChange={handleRePasswordChange}
                                />
                            </div>
                            {!passwordMatch && <p>Passwords do not match. Please repeat the password.</p>}
                            {!validPassword && (
                                <p>
                                    Password must be at least 8 characters long and contain both letters and numbers.
                                </p>
                            )}
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>)}
        </div>
    );
}

export default Register;