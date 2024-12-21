import React, { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <div>
          <Login setUser={setUser} />
          <Register setUser={setUser} />
        </div>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}

export default App;
