import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Task 9: Fetch request with proper method and headers
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST', // Method attribute
            headers: {
                'Content-Type': 'application/json', // Header attribute
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            navigate('/login');
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            {/* Registration Form JSX code here */}
        </div>
    );
}

export default RegisterPage;
