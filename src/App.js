import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [usersOnline, setUsersOnline] = useState([]);
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
  useEffect(()=> {
    let userOnline = [];
    fetchUserIds().then((users)=>{
      
      for (const [i,user] of users.entries()){
         checkStatus(i).then((val)=>{ 
           if(val.status === 'online'){
             sendIntroduction(val.id).then((send)=>{

               if(send){
                 userOnline.push(user);
                 console.log("user",userOnline);

                 setUsersOnline(userOnline);
               }
             })
           }
         })
      }
    }
    );
    
  },[])
  
  // });
  
  const data =[{"name":"test1"},{"name":"test2"}];

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
            {usersOnline.map(function(d, idx){
              return (<li key={idx}>{d}</li>)
            })}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
