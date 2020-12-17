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

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            <li>Student 1</li>
            <li>Student 2</li>
            <li>Student 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
