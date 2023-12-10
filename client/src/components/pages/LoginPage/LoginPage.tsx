import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const handleResetLoginData = () => {
        setLogin('');
        setPassword('');
    };
    const [error, setError] = useState(false);
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const onLogin = async (userName: string, password: string) => {
        try {
            const { data } = await axios.post('http://localhost:3001/user/login', {
                userName,
                password,
            });
            setToken(data);
            navigate('/home', { replace: true });
        } catch (e) {
            setError(true);
            handleResetLoginData();
        }
    };

    return (
        <div className="flex justify-content-center align-items-center">
            <Card>
                <h2 className="mb-4">Transport management system</h2>
                <form className="flex flex-column gap-4 w-25rem">
                    <div className="flex flex-column gap-1">
                        <label htmlFor="username">Userame</label>
                        <InputText
                            name="username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className={error ? 'p-invalid' : ''}
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex flex-column gap-1">
                        <label htmlFor="password">Password</label>
                        <InputText
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={error ? 'p-invalid' : ''}
                            placeholder="Password"
                        />
                    </div>
                    {error && <p className="p-invalid">Bad credentials</p>}
                    <Button
                        icon="pi pi-sign-in"
                        type="button"
                        onClick={() => onLogin(login, password)}
                        label="Sign in"
                    />
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
