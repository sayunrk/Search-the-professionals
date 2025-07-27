import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css"; // You can reuse the same CSS
import type { AxiosError, AxiosResponse } from "axios";
import { register } from "../../shared/config/api"; 

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '' 
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        register(formData)
            .then((res: AxiosResponse) => {
                console.log("Registration successful:", res);
                // Optional: Automatically log the user in or redirect
                alert("Registration successful!");
            })
            .catch((error: AxiosError) => {
                console.error("Registration error:", error);
                alert("Registration failed!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="register-wraper">
            <form className="Login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                />
                <input
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    type="text"
                />
                <input
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    type="password"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}