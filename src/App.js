import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [sendUsers, setSendUsers] = useState([]);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const sendIntroduction = async (userId) => {
    return Math.random() > 0.1 ? true : false;
  };

  const fetchUser = async () => {
    const users = await fetchUserIds();
 

    for (let x = 0; x < users.length; x++) {
      const id = users[x];
      const userData = await checkStatus(id);
      if (userData.status === "online") {
        const isWasSend = await sendIntroduction(id);
        console.log(isWasSend);
        if (isWasSend) {
          setSendUsers([...sendUsers, userData]);
        }
      }
    }
  };

  /*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

  return (
    <div className='App'>
      <div className='App-header'>
        <div>
          All online users that introductions were sucessfully sent
          {showUser && (
            <ul>
              {sendUsers.map((user) => (
                <li key={user.id}>{user.id}</li>
              ))}
            </ul>
          )}
          <br/>
          <button onClick={() => setShowUser(!showUser)}>
            {showUser ? "Hide User" : "Show User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
