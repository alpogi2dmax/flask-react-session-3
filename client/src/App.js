import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/user', {
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) setUser(data.user);
  };

  const login = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(loginData),
    });
    if (res.ok) fetchUser();
  };

  const logout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Flask + React Auth</h1>
      {user ? (
        <>
          <p>Hello, {user}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input
            placeholder="Username"
            value={loginData.username}
            onChange={e => setLoginData({ ...loginData, username: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;