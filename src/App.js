import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  

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

 const [isUserOnline, setIsUserOnline] = useState()

//  useEffect(() => {
//   // console.log("first called")
//   fetchUserIds().then(res => {
//     setAllUsers(res)
//   })
//  }, [])

//  useEffect(() => {
//   allUsers.map(res => {
//     if (checkStatus(res)){
//       console.log(res)
//     }
//   })
//  }, [allUsers])

useEffect(()=>{
  fetchUserIds().then( allUsers =>{
    return Promise.all(allUsers.map(async each=>{
      return checkStatus(each)
    }))
  }).then(response =>{
    return response.filter(each=> each.status === "online")
    .map(each=> each.id)
  })
  .then(onlineUsers=>{
    return Promise.all(onlineUsers.map(async each=>{
      return { sent: await sendIntroduction(each), userId: each}
    }))
  })
  .then(response=>{
    setIsUserOnline(response.filter(each=> each.sent).map(each=> each.userId))
  })
},[])

 

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {isUserOnline.map(
              (each , i )=>{
                return <li key={i}>{each}</li>
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
