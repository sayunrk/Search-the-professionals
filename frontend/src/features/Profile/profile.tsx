import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { FaUserCircle, FaEnvelope, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { updateUserApi } from "../../shared/config/api";
import "./profile.css";
import type { IUser, IExperience } from "../../shared/interfaces/user.interface";

export default function Profile() {
  const storedUser: IUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [user, setUser] = useState<IUser>(storedUser);
  const [formData, setFormData] = useState<IUser>(storedUser);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEdit = () => {
    setFormData(user);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    if (!formData._id) {
      alert("User ID is missing. Cannot update.");
      return;
    }
    try {
      const result = await updateUserApi(formData._id, formData);
      setUser(result.user);
      setFormData(result.user);
      setEditing(false);
      alert(result.message || "Profile updated successfully");
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred";
      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.message || "Error updating profile from server.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
      console.error(err);
    }
  };

  const handleDetailChange = (field: keyof IUser, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleExperienceChange = (index: number, field: keyof IExperience, value: string) => {
    setFormData(prev => {
      const updatedExperiences = (prev.experience || []).map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { ...prev, experience: updatedExperiences };
    });
  };

  const handleAddExperience = () => {
    const newExperience: IExperience = { title: "", company: "", description: "" };
    setFormData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience],
    }));
  };
  
  const handleDeleteExperience = (index: number) => {
    if (window.confirm("Are you sure you want to remove this experience entry?")) {
      setFormData(prev => {
        const updatedExperience = (prev.experience || []).filter((_, i) => i !== index);
        return { ...prev, experience: updatedExperience };
      });
    }
  };

  const displayData = editing ? formData : user;

  if (!user || !user.username) return <div>No user data found.</div>;

  return (
    <div className="profile-main-container">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <FaUserCircle size={90} color="#222" className="profile-avatar-img" />
          <div className="profile-header-info">
            <div className="profile-header-name">{displayData.username}</div>
            <div className="profile-header-email">{displayData.email || "No email"}</div>
          </div>
        </div>
        {editing ? (
          <div>
            <button className="profile-edit-btn" onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </button>
            <button className="button-light" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="profile-edit-btn" onClick={handleEdit}>
            <FaEdit style={{ marginRight: 6 }} /> Edit
          </button>
        )}
      </div>

      <div className="profile-details-grid">
        {["username", "role", "email", "designation", "address", "bio"].map((field) => (
          <div className="profile-detail" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              value={(displayData[field as keyof IUser] as string) || ""}
              placeholder={`Enter ${field}`}
              onChange={(e) => handleDetailChange(field as keyof IUser, e.target.value)}
              readOnly={!editing || field === "role" || field === "email"}
              style={{ background: (field === "role" || field === "email") ? '#f0f0f0' : 'white' }}
            />
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h3>My Email Address</h3>
        <div className="profile-email-box">
          <FaEnvelope size={20} style={{ marginRight: 10 }} />
          <div>
            <div>{displayData.email || "No email"}</div>
            <div className="profile-email-meta">1 month ago</div>
          </div>
        </div>
      </div>
      
      <div className="profile-section">
        <h3>Work Experience</h3>
        {displayData.experience?.map((exp, index) => (
          <div className="experience-item" key={exp._id || index}>
            <div className="experience-inputs">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                readOnly={!editing}
                onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                readOnly={!editing}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={exp.description || ''}
                readOnly={!editing}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
              />
            </div>
            {editing && (
              <button onClick={() => handleDeleteExperience(index)} className="delete-experience-btn">
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        {editing && (
          <button onClick={handleAddExperience} className="add-experience-btn">
            <FaPlus style={{ marginRight: 8 }} /> Add Experience
          </button>
        )}
        {!editing && (!displayData.experience || displayData.experience.length === 0) && (
            <p>No work experience added yet. Click "Edit" to add an entry.</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="logout-button"
        style={{ marginTop: "2rem" }}
      >
        Logout
      </button>
    </div>
  );
}