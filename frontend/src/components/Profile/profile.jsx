import React, { useContext } from 'react';
import { AuthContext } from './../../context/Authcontext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
     const goToIntro = () => {
       navigate("/intro");
     };

  return (
    <>
      <button className="pbh" onClick={goToIntro}>
        Home
      </button>
      <div style={{ padding: "20px" }}>
        <h2>Profile</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
