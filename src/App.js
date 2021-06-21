import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserIds();
      setUserIds(data);
   }

   fetchData();
  }, []);

  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1:
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent

  */

  let content = userIds.map(userId => {
    // check for the status of the user
    const userStatus = checkStatus(userId);
  
    if (userStatus.status === "online") {
      // send email if user is online
      const emailSent = sendEmail(userStatus.id);

      if (emailSent) {
        // display user if email was successfully sent
        return <li key={userStatus.id}>{userStatus.id}</li>
      }
    }
  });

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {content}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
