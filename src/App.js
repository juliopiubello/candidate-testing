import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [attendants, setNewUser] = useState([])
  const [showusers, setUser] = useState(true)
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

  /*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

useEffect(()=> {
  getUsers()
},[])

 const getUsers = async()=> {

  const users = await fetchUserIds()

  const onLine = []
  
  for(let user in users){

    const userStatus = await checkStatus(users[user])
    if(userStatus.status === 'online'){
      await sendIntroduction(userStatus.id)
      onLine.push(userStatus.id)
    }
  }
  setNewUser(onLine)

 }

 const handleUsers = () => {
   setUser(!showusers)
 }

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <div> <button onClick={handleUsers}>changeUsers</button></div>
        
          {
            showusers?  <ul>
            {
              attendants.map((attendant, index) => (<li key={index}>{attendant}</li>))
            }
          </ul> : <p>No online uses</p>
          }
         
        </div>
      </div>
    </div>
  );
}

export default App;
