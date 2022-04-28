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


  const [countUser, setCountUser] = useState([]);

  const question1 = async () => {
    const users = await fetchUserIds();

    // console.log(users);

    const arrayValidEmails = [];

    for (let index = 0; index < users.length; index++) {
      const validUsers = await checkStatus(users[index]);
      console.log(validUsers);

      if (validUsers.status === 'online') {
        const validEmail = await sendEmail(validUsers.id);
          if (validEmail) {
            arrayValidEmails.push(validUsers.id);
          }
      }
    }
    setCountUser(arrayValidEmails);
  }
  // console.log(countUser);

  useEffect(() => {
    question1();
  }, []);

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users V
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
            {countUser.map((user) => <li key={user}>{user}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
