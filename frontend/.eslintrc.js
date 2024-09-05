import React from 'react';

const Header = ({ user }) => {
  return (
    <header>
      <h1>My App</h1>
      {user ? (
        <>
          <span>{user.username}</span>
          <button>Logout</button>
        </>
      ) : (
        <>
          <button>Login</button>
          <button>Register</button>
        </>
      )}
    </header>
  );
};

export default Header;