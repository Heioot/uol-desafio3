import React from 'react';

const Auth = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        <button type="button">Sign in with Google</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Auth;
