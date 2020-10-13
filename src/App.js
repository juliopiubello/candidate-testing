import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [ userNames, setUserNames ] = useState([])
  // 20% of the users are online, 80% offline on average.
  // Takes 4-8 secs to complete
  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  // fetch all the users in the database.
  // Takes 2-7secs to complete
  // Max: 5000 users
  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  // send the introduction to a user.
  // If the user is online, it will be successful 90% of the time
  // Takes 1-6secs to complete
  const sendIntroduction = async (userId) => {
    return Math.random() > 0.1 ? true : false;
  };

  // sent introductions to: [john.smith, sara.lee, ...]
  // sent introductions to: [Promise, Promise, ...]

  /*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

  useEffect(()=>{
    const userList = []
    async  function fetchUsers(){
      const userIds = await fetchUserIds()
      if (userIds){
        userIds.map(async(userid, index)=>{
          const data =  await checkStatus(userid)
          if(data.status == 'online'){
            const intro = await sendIntroduction(userid)
            if(intro){
              userList.push(data.id)
            }
          }
          setUserNames(userList)
        })
      } 
    }
    
    fetchUsers()
  },[])
  /*
  Question 2:
    - Re-try for each user if they are offline or if sendIntroduction is false
    - Re-try up to maximum 10 times
    - Each Re-try should have 2 second delay between them
  */

  /*
  Assumptions:
  - 20% of the users will be online in any 2 sec window
  - 90% of the introductions are successfully sent in a 2 second window
  - 5000 users in total
  */

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          {
            userNames.map((name, id)=>{
              return(
                <ul key={id}>
                <li>{name}</li>
              </ul>
              )
            })
          }        
        </div>
      </div>
    </div>
  );
}

export default App;
