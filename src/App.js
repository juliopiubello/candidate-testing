import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  
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

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */
 const [usersToRender, setUsersToRender] = useState([]);

 useEffect(()=> {
   const initIntroPage = async () => {
    const users = await fetchUserIds();
    const onlineUsers = [];
    const usersIntroduced = [];

    for (const user of users) {
      const { status } = await checkStatus(user);
        if(status === "online") onlineUsers.push(user);
    }

     for (const user of onlineUsers) {
      const isIntroduced = await sendIntroduction(user);
        if(isIntroduced) usersIntroduced.push(user);
    }
    
     setUsersToRender(usersIntroduced);
   }
   initIntroPage().catch(err => console.error(err));
 }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {usersToRender.map(userId => (<li key={userId}>{userId}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
