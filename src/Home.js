import React, { useState } from "react";
import ReactCountdownClock from "react-countdown-clock";
import "./App.css";

const Home = () => {
  const [count, setCount] = useState(0);

  const fetchUsers = () => {
    console.log("[MainThread] fetchUsers called");
    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1,
    };

    for (let i = 0; i < 10000000; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    setCount(count + users.length);
  };

  const fetchUsersWebWorker = () => {
    const worker = new Worker("./worker.js");

    worker.postMessage("Fetch Users");

    console.log("[MainThread] fetchUsersWebWorker called");

    worker.onmessage = (event) => {
      console.log("[MainThread] fetchUsersWebWorker received");
      setCount((currentCount) => currentCount + event.data.length);
      worker.terminate();
    };
  };

  return (
    <div className="App-bottom">
      <section className="App-left">
        <ReactCountdownClock
          seconds={100}
          color="#000"
          alpha={0.9}
          size={300}
        />
        <p className="text-center">Total User Count: {count}</p>
        <button className="btn-direct" onClick={fetchUsers}>
          Fetch Users Directly
        </button>
      </section>

      <section className="App-right">
        <ReactCountdownClock
          seconds={100}
          color="#e56"
          alpha={0.9}
          size={300}
        />
        <p className="text-center">Total User Count: {count}</p>
        <button className="btn-worker" onClick={fetchUsersWebWorker}>
          Fetch Users with Web Worker
        </button>
      </section>
    </div>
  );
};

export default Home;
