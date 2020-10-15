import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';

const App = () => {
	// 20% of the users are online, 80% offline on average.
	// Takes 4-8 secs to complete
	const checkStatus = (userId) => {
		return Math.random() > 0.8
			? { status: 'offline', id: userId }
			: { status: 'online', id: userId };
	};

	// fetch all the users in the database.
	// Takes 2-7secs to complete
	// Max: 5000 users
	const fetchUserIds = () => ['john.smith', 'sara.lee', 'jack.ma'];

	// send the introduction to a user.
	// If the user is online, it will be successful 90% of the time
	// Takes 1-6secs to complete
	const sendIntroduction = async (userId) => {
		return Math.random() > 0.1 ? true : false;
	};

	const [online, setUsers] = useState([]);

	const getUsers = async () => {
		const onlineUsers = [];
		const usersids = fetchUserIds();
		usersids.map((id) => {
			const status = checkStatus(id);

			if (status.status === 'online') {
				/**
				 * I send this user an introduction since he or she is onnline
				 */
				console.log(`sent introductions to ${id}`);
				onlineUsers.push(id);
			}

			/**
			 * Notes i don't know whether  this was intentional or mistake on 
       * const sendIntroduction = async (userId) => {
		      return Math.random() > 0.1 ? true : false;
        };
        because this function accepts userId as an argument but this argument was not used in the function body so it has no impact 
			 */
			// const sent = sendIntroduction(id);
			// if (sent) {
			// 	console.log(`sent introductions to ${id}`);
			// } else {
			// 	console.log(`Introduction was not sent t ${id}`);
			// }
			// Short hand way
			//  sent? console.log(`sent introductions to ${id}`): console.log(`Introduction was not sent t ${id}`)
		});
		setUsers(onlineUsers);
	};

	useEffect(() => {
		getUsers();

		// effect
		// return () => {
		//   cleanup
		// }
	}, [online]);

	/**
	 * Call getUsers function after every second to get uptodate online users and the component will rerender if array of onnline users change
	 */
	setInterval(() => getUsers, 1000);
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
	// console.log('online users', online);
	return (
		<div className='App'>
			<div className='App-header'>
				<div>
					All online users that introductions were sucessfully sent
					<ul>
						{online.map((user, i) => (
							<UserList key={i} user={user} />
						))}
						{/* <li>Student 1</li>
						<li>Student 2</li>
						<li>Student 3</li> */}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
