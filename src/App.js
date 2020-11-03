import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [userWithIntroSuccess, setUserWithIntroSuccess] = useState([]);

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
    async function returnUSerID() {
      let users = await fetchUserIds();

      // map through the array of user
      users.map((user, index) => {
        // check users' status using their id
        async function getStatus() {
          let status = await checkStatus(index);
          // if user is online, send them an introduction
          if (status.status === "online") {
            async function sendIntro() {
              let intro = await sendIntroduction(status.id);
              // check if sendIntroduction delivered succefully
              if (intro) {
                // save succeful user on the state
                setUserWithIntroSuccess((current) => [...current, user]);
              }
            }
            sendIntro();
          }
        }
        getStatus();
      });
    }
    returnUSerID();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          {userWithIntroSuccess ? (
            <>
              {userWithIntroSuccess.map((user, index) => (
                <ul key={index}>
                  <li>{user} </li>
                </ul>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
