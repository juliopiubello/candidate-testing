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

  const sendIntroduction = async (userId) => {
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1: 
    Find all online users and send them introductions. Render the users for which the introductions were successfully sent

    Step 1: Load users
    Step 2: Check users onlinne
    Step 3: Send introduction for whom are oline
    Step 4: Render those which the intro was sucessfully sentt
  
  */
 const checkStatusAndSendIntroductionToUsers = async () => {
   const usersIds = await fetchUserIds();
   let successfulUser = [];
   let onlineUsers = [];

   for(let userId of usersIds){
     let status = await checkStatus(userId);
     if (status.status === 'online'){
      onlineUsers.push(userId);
     }
   }

   for(let userId of onlineUsers){ 
      const isIntroSent = await sendIntroduction(userId);
      if(isIntroSent){
        successfulUser.push(userId);
      }
   }

  //  console.log({successfulUser});
  setUserNames(successfulUser);
 }

 const [userNames, setUserNames] = useState([]);
 const [isHidden, setIsHidden] = useState(false);

 useEffect(()=> {
  checkStatusAndSendIntroductionToUsers().catch(err => console.error(err));
 }, [])

 const showOrHide = () => {
   setIsHidden(isHidden => !isHidden);
 }

  return (
    <div className="App">
      <div className="App-header">
        <button onClick={showOrHide}>Show/Hide</button>
        {
          !isHidden && 
          <div>
            All online users that introductions were sucessfully sent
            <ul>
              {userNames.map(user => <li key={user}> {user} </li>)}
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
