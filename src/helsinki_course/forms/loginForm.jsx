import { useState } from "react";
import PropTypes from "prop-types";


function Login({ login }) {
    const [userInfos, setUserInfos] = useState({ username: '', password: '' });

    function handleLogin(e) {
        e.preventDefault();
        login(userInfos);
        setUserInfos({ ...userInfos, username: '', password: '' });
    }

    function handleChange(e) {
        const { value, name } = e.target;
        setUserInfos({ ...userInfos, [name]: value });
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            username
            <input
                type="text"
                name="username"
                value={userInfos.username}
                onChange={handleChange}
            />
            password
            <input
                type="password"
                name="password"
                value={userInfos.password}
                onChange={handleChange}
            />
            <button type="submit">login</button>
        </form>
    )
}

Login.prototype = {
    login: PropTypes.func.isRequired
}

export default Login;