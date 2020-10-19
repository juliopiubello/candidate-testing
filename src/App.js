import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [show, setShow] = useState(true)

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  useEffect(()=>{
      handleFetch()
  },[]) 

  const handleFetch = async ()=>{
    const users = await fetchUserIds()
    const onlineUsers = []

    for(let user in users){
      
      const result = await checkStatus(users[user])
      if(result.status === 'online'){
         await sendIntroduction(result.id)
         onlineUsers.push(result.id)
      }
    }
    setOnlineUsers(onlineUsers)
  }

  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const sendIntroduction = async (userId) => {
    return Math.random() > 0.1 ? true : false;
  };
   const handleClick = ()=>{
     setShow(!show)
   }

  /*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

  return (
    <div className="App">
      <div className="App-header">
        <div className='students'>
          <p>All online users that introductions were sucessfully sent</p>
          <button onClick={handleClick} >{show?'Hide Students':'Show Students'}</button>
         {show && <ul>
            {onlineUsers.map((user, index)=>(
                <li key={index}>{user}</li>
            ))}
          </ul>}
        </div>
      </div>
    </div>
  );
}

export default App;
