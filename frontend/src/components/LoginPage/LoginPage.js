import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Task 10: Fetch request with Content-Type and Authorization headers
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Content-Type attribute
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Authorization attribute
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            navigate('/');
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            {/* Login Form JSX code here */}
        </div>
    );
}

export default LoginPage;
