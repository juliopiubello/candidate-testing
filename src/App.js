import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [userOnline, setUser] = useState([]);
  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };
useEffect(() => {
    (async () => {
      try {
        const listUser = await fetchUserIds();
        let userOnline = [];
        let emailSuccess = [];
        for (let i = 0; i < listUser.length; i++) {
          const checkOnline = await checkStatus(i);
          if (checkOnline.status === "online") {
            userOnline.push(listUser[i]);
          }
        }
        for (let i = 0; i < userOnline.length; i++) {
          const sendSuccess = await sendEmail(i);
          if (sendSuccess) {
            emailSuccess.push(userOnline[i]);
          }
        }

        setUser(emailSuccess);

      } catch (error) {}
    })();
  }, []);
  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
           <ul>
            {userOnline.length > 0 &&
              userOnline.map((user, idx) => <li key={idx}>{user}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
