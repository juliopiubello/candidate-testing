import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const [ids, setIds] = useState([]);
	const [showList, setShowList] = useState(true);

	const checkStatus = async userId => {
		return Math.random() > 0.8
			? { status: "offline", id: userId }
			: { status: "online", id: userId };
	};

	const fetchUserIds = async () => {
		return ["john.smith", "sara.lee", "jack.ma"];
	};

	const sendIntroduction = async userId => {
		return Math.random() > 0.1 ? true : false;
	};

	/*
    Question 1: Find all online users and send them introductions. 
      return the users for which the introductions were successfully sent
  */

	useEffect(() => {
		const getIds = async () => {
			const ids = await fetchUserIds();
			const successfulIds = [];

			for (let i = 0; i < ids.length; i++) {
				const user = await checkStatus(ids[i]);

				if (user.status === "online") {
					const isIntroductionSent = await sendIntroduction(user.id);
					if (isIntroductionSent) {
						successfulIds.push(user.id);
					}
				}
			}

			setIds(successfulIds);
		};
		getIds();
	}, []);

	const style = {
		display: `${showList ? "block" : "none"}`,
	};

	return (
		<div className="App">
			<div className="App-header">
				<div>
					All online users that introductions were successfully sent
					<button type="button" onClick={e => setShowList(prev => !prev)}>
						{showList ? "Hide List" : "Show List"}
					</button>
					<ul style={style}>
						{ids.length > 0 ? (
							ids.map(id => <li key={id}> {id} </li>)
						) : (
							<p>No Users got an Introduction</p>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
