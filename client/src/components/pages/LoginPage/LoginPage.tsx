import axios from 'axios';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (login, password) => {
        const { data } = await axios.post('http://localhost:3001/user/login', {
            userName: login,
            password,
        });
        sessionStorage.setItem('token', data);
    };
    return (
        <div>
            <form>
                <input value={login} onChange={(e) => setLogin(e.target.value)}></input>
                <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="button" onClick={() => onLogin(login, password)}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
