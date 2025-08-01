import { useState, type ChangeEvent, type FormEvent } from "react"
import './login.css';
import { login } from "../../shared/config/api";
import type { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password:""})
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value})

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(loading){
            return;
        }

        setLoading(true);
        login(formData).then((res: AxiosResponse) => {
            console.log("Login response:", res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('currentUser', JSON.stringify(res.data.user))
            navigate('/home');
        }).catch(
            (error: AxiosError) => {
                console.log(error);
            }
        ).finally(
            () =>{
                setLoading(false);
            }
        )
    }


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} action="">
                <h1 className="login-title">Login</h1>
                <input className="login-input" placeholder="username" name='username' onChange={handleChange} value= {formData.username}type="text" />
                <input className="login-input" placeholder="password" name='password' onChange={handleChange} value= {formData.password}type="text" />
                <button className="login-button" type="submit">Submit</button><span onClick={() => navigate('/home')}></span>

                <p className="switcher">
                    Don’t have an account?{" "}
                    <span onClick={() => navigate('/register')} style={{ color: 'blue', cursor: 'pointer' }}>
                        Register here
                    </span>
                </p>

            </form>

        </div>
    );
}