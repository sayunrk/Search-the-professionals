import { useState, type ChangeEvent, type FormEvent } from "react"
import './register.css';

export default function Register(){
    const [formData, setFormData] = useState({email: "", username: "", password: ""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} action="">
                <h1 className="register-title">Register</h1>
                <input className="register-input" placeholder="email" name="email" onChange={handleChange} value={formData.email} type="email" />
                <input className="register-input" placeholder="username" name="username" onChange={handleChange} value={formData.username} type="text" />
                <input className="register-input" placeholder="password" name="password" onChange={handleChange} value={formData.password} type="password" />
                <button className="register-button" type="submit">Register</button>
            </form>
        </div>
    );
}
