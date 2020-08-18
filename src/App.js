import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

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

const App = () => {
  const [usersArray, setUsers] = useState([]);

  const checkStatus = async (userId) => {
    return Math.random() > 0.2
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const fetchUserIds = async () => {
    return Promise.resolve(["john.smith", "sara.lee", "jack.ma"]);
  };

  const sendIntroduction = async (userId) => {
    const random = Math.random();
    return Promise.resolve(random > 0.7 ? true : false);
  };

  const retrySendIntroduction = (fn, val, retries = 10, time = 2000) => {
    return fn()
      .then((result) => {
        if (result) {
          return val;
        } else {
          return delay(time).then(() => {
            if (retries > 1) {
              return retrySendIntroduction(fn, val, retries - 1, time);
            } else {
              alert("can't send introduction to", val);
              return false;
            }
          });
        }
      })
      .catch((err) => {
        return delay(time).then(() => {
          retries > 1
            ? retrySendIntroduction(fn, val, retries - 1, time)
            : console.log(err);
        });
      });
  };

  const retryCheckStatus = (fn, val, retries = 10, time = 2000) => {
    return fn(val)
      .then((result) => {
        if (result.status === "online") return result;
        else {
          return delay(time).then(() =>
            retries > 1
              ? retryCheckStatus(fn, val, retries - 1, time)
              : alert("can't get online", val)
          );
        }
      })
      .catch((err) => {
        return delay(time).then(() =>
          retries > 1 ? retryCheckStatus(fn, val, retries - 1, time) : false
        );
      });
  };

  const promiseAllToArray = (arrayPromisesCheckStatus) => {
    Promise.allSettled(arrayPromisesCheckStatus).then((results) =>
      results.forEach((result) => {
        if (result.value.status === "online") {
          sendIntroduction(result.value.id).then((res) => {
            if (res) {
              setUsers((oldUsers) => [...oldUsers, result.value.id]);
            } else {
              retrySendIntroduction(sendIntroduction, result.value.id).then(
                (val) => {
                  if (val) {
                    setUsers((oldUsers) => [...oldUsers, result.value.id]);
                  }
                }
              );
            }
          });
        } else {
          retryCheckStatus(checkStatus, result.value.id).then(
            (resultFromStatus) => {
              if (resultFromStatus) {
                sendIntroduction(resultFromStatus).then((res) => {
                  if (res) {
                    setUsers((oldUsers) => [...oldUsers, result.value.id]);
                  } else {
                    retrySendIntroduction(
                      sendIntroduction,
                      result.value.id
                    ).then((val) => {
                      if (val)
                        setUsers((oldUsers) => [...oldUsers, result.value.id]);
                    });
                  }
                });
              }
            }
          );
        }
      })
    );
  };

  const callbackPromiseAll = useCallback(() => {
    fetchUserIds().then((userId) => {
      const arrayPromisesCheckStatus = userId.map((user) => checkStatus(user));
      promiseAllToArray(arrayPromisesCheckStatus);
    });
  }, []);

  useEffect(() => {
    callbackPromiseAll();
  }, [callbackPromiseAll]);

  const delay = (time) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(), time));

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were successfully sent
          <ul>
            {usersArray.map((user, index) => (
              <li key={`${user}+${index}`}>
                {index} {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
