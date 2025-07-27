import { useEffect,useState, type ChangeEvent } from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import { searchUserApi } from '../../shared/config/api';

interface IUser {
  _id: string;
  username: string;
  email: string;
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
  const searchTags: string[] = ["All", 'Designer', 'Develper', 'Photographer']

  useEffect(() =>{
    setLoading(true)
    searchUserApi(search).then(
      (res: AxiosResponse<IUserResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(
      () => {
        setLoading(false)
      }
    )
  }, [search])

  const onValueChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearch(value)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/');
  };

  return (
    <div className="homepage-wrapper">
      <div className="top-navigation">
        <p>Welcome back, {user.username.toUpperCase()}</p>
        <button onClick={handleLogout} className="button-primary button-light logout-button">
          Logout
        </button>
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
              className="pills"
              onClick={() => setSearch(tag === "All" ? "" : tag)}
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
                  <p>Developer</p>
                  <p>ING Tech</p>
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