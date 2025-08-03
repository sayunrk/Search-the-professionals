import { useEffect,useState, type ChangeEvent } from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import { searchUserApi } from '../../shared/config/api';

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

function Home(){
  const navigate = useNavigate();
  const user: IUser = JSON.parse(localStorage.getItem('currentUser')!);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const searchTags: string[] = ["All", 'Designer', 'Developer', 'Photographer'];

  useEffect(() => {
    setLoading(true);
    // ALl
    if (selectedTag === "All") {
      searchUserApi(search).then(
        (res: AxiosResponse<IUserResponse>) => {
          setUserList(res.data.users);
        }
      ).finally(() => {
        setLoading(false);
      });
    } else {
      // If a tag is selected, search by role
      searchUserApi(search, selectedTag).then(
        (res: AxiosResponse<IUserResponse>) => {
          setUserList(res.data.users);
        }
      ).finally(() => {
        setLoading(false);
      });
    }
  }, [search, selectedTag]);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="homepage-wrapper">
      <div className="top-navigation" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <p>Welcome back, {user.username.toUpperCase()}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/profile', { state: { user } })}
            className="button-primary"
            style={{ marginRight: '1rem' }}
          >
            Profile
          </button>
          <button onClick={handleLogout} className="button-primary button-light logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="hero-wrapper">
        <input
          type="text"
          onChange={onValueChange}
          value={search}
          placeholder="Search"
        />

        <div className="search-tags">
          {searchTags.map((tag: string) => (
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
              userList.map((user: IUser) => (
                <div className="card" key={user._id}>
                  <h3>{user.username}</h3>
                  <p>{user.role || "No role set"}</p>
                  <p>{user.email || "No email"}</p>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default Home;