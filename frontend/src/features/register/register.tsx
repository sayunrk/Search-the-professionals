import type { AxiosError, AxiosResponse } from "axios";
import { register } from "../../shared/config/api";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  username: '',
  password: '',
  email: '',
  role: '' 
});
  const [loading, setLoading] = useState(false);

  const roles = [
    "Designer",
    "Developer",
    "Animator",
    "Content Creator",
    "Social Media Manager",
    "Photographer"
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        alert("Registration successful!");
        navigate("/login"); // Navigate to login after successful registration
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
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
        />
        <input
          className="register-input"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={formData.username}
          type="text"
        />
        <input
          className="register-input"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
        />
        <select
          className="register-input"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="switcher">
          Already have an account?{" "}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
