import './profile.css';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (!user || !user.username) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email || "No email"}</p>
      <p><strong>Role:</strong> {user.role || "No role set"}</p>
    </div>
  );
}
