import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [students, setStudent] = useState([])
  const [show, setShow] = useState(true)
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

useEffect(() => {
  const returnData = async () => {
    let result = await fetchUserIds()
    let successfulIntroductions = []
    for(let i=0; i<result.length; i++){
      let status = await checkStatus(result[i]);
      if(status.status === 'online'){
        let successfulMessage = await sendIntroduction(result[i])
        if(successfulMessage){
          successfulIntroductions.push(result[i])
        }
      }
      
    }
    setStudent(successfulIntroductions)
    return result
  }
  returnData()
},[])

const toggle = (data) => {
setShow(show?false: true)
}

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <br />
          <button onClick={() => toggle()}>toggle</button>
          {show?
          <ul>
            {
              students.map((items, index) => {
                return <li key={index}>{items}</li>
              })
            }
          </ul>:""}
        </div>
      </div>
    </div>
  );
}

export default App;
