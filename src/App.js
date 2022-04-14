import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [renderUser, setRenderUser] = useState([]);
  
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

  const exercicio = async () => {
    const usersArray = [];
    const users = await fetchUserIds()
    console.log(users);
    for (let i = 0; i < users.length ; i ++){
      const user = await checkStatus(users[i]);
      console.log(user);
      if (user.status === 'online') {
        const sendEmailUser = await sendEmail(users[i])
        console.log(sendEmailUser);
        usersArray.push(user)
    }
    console.log(usersArray);
  }
  setRenderUser(usersArray);
}

  useEffect(() => {
    exercicio();
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
          <ul>
          All online users that introductions were sucessfully sent
          {renderUser.map((user, index) => 
              <li key={index}>{user.id}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
