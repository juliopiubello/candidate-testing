import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  // 20% of the users are online, 80% offline on average.
  // Takes 4-8 secs to complete
  const [users, setUsers] = useState([]);
  const [sentIntros, setSentIntros] = useState([]);

  const checkStatus = async (userId) => {
    return Math.random() > 0.2
      ? {status: 'offline', id: userId}
      : {status: 'online', id: userId};
  };

  // fetch all the users in the database.
  // Takes 2-7secs to complete
  // Max: 5000 users
  const fetchUserIds = async () => {
    await sleep(randomIntFromInterval(2000, 7000));
    return [
      'john.smith',
      'sara.lee',
      'jack.ma',
      'benjamin',
      'julio',
      '7UVrkZY7kf',
      'mGOm7UrDzr',
      'WWY9JHUC7t',
      'bQMfFDMzxV',
      '6FHkyzLSVI',
      'x5F7fgH3jb',
      'b3YmUocOAM',
      'vZFmwy1wMW',
      'ojsRxTI4qH',
      'xmboWucm4u',
      'VgFdVS5qkA',
      'mHtxn5YzcY',
      'rdfnlBMbMG',
      'Jf6jgBHi04',
      'noxeI8ov29',
      'XKCZ8MnEMg',
      'vce4E7qpyw',
      'XlfNbmkK5o',
      'JDe7VzEWLp',
      '7YXhZ3jAB5',
    ];
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // send the introduction to a user.
  // If the user is online, it will be successful 90% of the time
  // Takes 1-6secs to complete
  const sendIntroduction = async (userId) => {
    await sleep(randomIntFromInterval(1000, 6000));
    return Math.random() > 0.1 ? true : false;
  };

  async function checkStatusAndSendIntroductions() {
    let sentIntroductions = [];

    for (let user of users) {
      const userWithStatus = await checkStatus(user);

      if (userWithStatus.status === 'online') {
        const isSent = await sendIntroduction(userWithStatus.id);

        if (isSent) {
          sentIntroductions = [...sentIntroductions, userWithStatus.id];
        }
      }
    }

    return sentIntroductions;
  }

  useEffect(() => {
    // Fetch user and store them in state on the first time
    // that the app loads
    (async () => {
      const usersResponse = await fetchUserIds();
      setUsers(usersResponse);
    })();
  }, []);

  useEffect(() => {
    // Whenever the users in state change, check their status
    // and sent invitations
    (async () => {
      const sent = await checkStatusAndSendIntroductions();
      setSentIntros(sent);
    })();
  }, [users]);

  // console.log(users);
  // console.log(sentIntros);
  // sent introductions to: [john.smith, sara.lee, ...]
  // sent introductions to: [Promise, Promise, ...]

  /*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

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
          <ul>
            {sentIntros.map((user) => {
              return <li key={user}>{user}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
