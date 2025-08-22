import { useEffect, useState, type ChangeEvent } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import { searchUserApi } from '../../shared/config/api';
import { FaUserCircle } from "react-icons/fa";

interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
}

interface IUserResponse {
  message: string;
  users: IUser[];
}

function Home() {
  const navigate = useNavigate();
  const user: IUser = JSON.parse(localStorage.getItem('currentUser')!);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const searchTags: string[] = ["All", 'Designer', 'Developer', 'Photographer', 'Animator', 'Content Creator', 'Social Media Manager'];

  useEffect(() => {
    setLoading(true);
    const fetchUsers = selectedTag === "All" 
      ? searchUserApi(search)
      : searchUserApi(search, selectedTag);

    fetchUsers.then((res: AxiosResponse<IUserResponse>) => {
      setUserList(res.data.users);
    }).finally(() => setLoading(false));
  }, [search, selectedTag]);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleTagClick = (tag: string) => setSelectedTag(tag);

  return (
    <div className="homepage-wrapper">
      <div className="top-navigation">
        <p>Welcome back, {user.username.toUpperCase()}</p>
       <FaUserCircle
  className="profile-icon"
  size={36}
  onClick={() => navigate('/profile', { state: { user } })}
  title="Profile"
/>
      </div>

      <div className="hero-wrapper">
         <video className="hero-video" autoPlay loop muted>
    <source src="/search.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        <div className="hero-overlay">
          <h1>Find and connect with professionals who inspire you every day.</h1>
          <input
            type="text"
            placeholder="Search Professionals"
            value={search}
            onChange={onValueChange}
          />
        </div>
      </div>

      <div className="search-tags">
        {searchTags.map(tag => (
          <div
            key={tag}
            className={`pills${selectedTag === tag ? ' selected' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      {!loading && (
  <div className="results">
    {userList.length > 0 ? (
      userList.map(user => (
        <div className="card" key={user._id}>
          <div className="card-header">
            <h3>{user.username}</h3>
            <span className="role-badge">{user.role || "No role"}</span>
          </div>
          <p>{user.email || "No email"}</p>
        </div>
      ))
    ) : (
      <p>No users found.</p>
    )}
  </div>
)}

    </div>
  );
}

export default Home;
