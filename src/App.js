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


  const [success, setSuccess] = useState([]);

  async function runAll(){
    let users = await fetchUserIds(),
    succ = [];

    await users.forEach( (user, index)=>{
      checkStatus(index).then(
          res=>{
            if(res.status === "online"){
              sendIntroduction(index).then(res=>{
                if(res === true){
                  succ.push(user);
                }
              })
            }
          }
      )
    });

    return succ;
  }

  useEffect(()=>{
    runAll().then(res=>{
      setSuccess(res)
    });
  }, [])



  /*
    Question 1: Find all online users and send them introductions.
      return the users for which the introductions were successfully sent
  */

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent

          <ul>
            {success.map((item, index)=> <li key={index}>{item}</li>)}
          </ul>
          {/*<ul>
            <li>Student 1</li>
            <li>Student 2</li>
            <li>Student 3</li>
          </ul>*/}
        </div>
      </div>
    </div>
  );
}

export default App;
