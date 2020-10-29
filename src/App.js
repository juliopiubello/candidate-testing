import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import './App.css'

const App = () => {
  const [users, setUser] = useState([])

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: 'offline', id: userId }
      : { status: 'online', id: userId }
  }

  const fetchUserIds = async () => {
    return ['john.smith', 'sara.lee', 'jack.ma']
  }

  const sendIntroduction = async (userId) => {
    return Math.random() > 0.1 ? true : false
  }

  useEffect(() => {
    // fetch user ids
    fetchUserIds()
      .then((users) => {
        // create a promise for each value in the list of ids
        return users.map((val) => {
          return Promise.resolve(val)
            .then((ret) => {
              // check the status for each user (returns an object)
              return checkStatus(ret)
            })
            .then((ret) => {
              // check if the user status is set to online; send invitation if true
              return ret.status === 'online'
                ? { ...ret, intro: sendIntroduction(ret.id) }
                : { ...ret, intro: false }
            })
        })
      })
      .then((users) => {
        // set the list of users to the result of the composite encapsulated in promise context
        return Promise.all(users).then((res) => {
          setUser(res)
        })
      })
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
          {
            <ul>
              {!isEmpty(users) &&
                users.map(
                  (val, idx) =>
                    val.intro && <li key={idx.toString()}>{val.id}</li>,
                )}
            </ul>
          }
        </div>
      </div>
    </div>
  )
}

export default App
