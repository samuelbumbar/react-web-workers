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
      setCount(currentCount => currentCount + event.data.length);
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


/// with onmessage

// import React, { useEffect, useState } from "react";
// import ReactCountdownClock from "react-countdown-clock";
// import workerFile from "./worker.js";
// import WebWorker from "./workerSetup";
// import "./App.css";

// const Home = () => {
//   const [count, setCount] = useState(0);
//   // const worker = new WebWorker(workerFile);
//   // const worker = new WebWorker("./worker.js");
//   // const myWorker = new WebWorker("worker.js");
//   const myWorker = new window.Worker("worker.js");

//   // useEffect(() => {
//   //   return () => {
//   //     myWorker.terminate();
//   //   }
//   // }, [])

//   // useEffect(() => {
//     // console.log("worker", worker);
//     // worker.onmessage = (event) => {
//     //   console.log("[MainThread] fetchUsersWebWorker received");
//     //   setCount(currentCount => currentCount + event.data.length);
//     // };
//     myWorker.postMessage({ msg: "heya" });
//     myWorker.onmessage = function(event) {
//       console.log("[MainThread] fetchUsersWebWorker received");
//       setCount(currentCount => currentCount + event.data.length);
//       myWorker.terminate();
//     };
//   // }, [worker]);
//   // }, []);

//   const fetchUsers = () => {
//     console.log("[MainThread] fetchUsers called");
//     const users = [];

//     const userDetails = {
//       name: "Jane Doe",
//       email: "jane.doe@gmail.com",
//       id: 1,
//     };

//     for (let i = 0; i < 10000000; i++) {
//       userDetails.id = i++;
//       userDetails.dateJoined = Date.now();

//       users.push(userDetails);
//     }

//     setCount(count + users.length);
//   };

//   const fetchUsersWebWorker = () => {
//     // worker.postMessage("Fetch Users");
//     myWorker.postMessage({ msg: 'incApple', currentUsers: 1 });
//     console.log("[MainThread] fetchUsersWebWorker called");

    
//     // worker.addEventListener("message", event => {
//     //   console.log("fetchUsersWebWorker received")
//     //   setCount(count + event.data.length);
//     // });
//   };

//   return (
//     <div className="App-bottom">
//       <section className="App-left">
//         <ReactCountdownClock
//           seconds={100}
//           color="#000"
//           alpha={0.9}
//           size={300}
//         />
//         <p className="text-center">Total User Count: {count}</p>
//         <button className="btn-direct" onClick={fetchUsers}>
//           Fetch Users Directly
//         </button>
//       </section>

//       <section className="App-right">
//         <ReactCountdownClock
//           seconds={100}
//           color="#e56"
//           alpha={0.9}
//           size={300}
//         />
//         <p className="text-center">Total User Count: {count}</p>
//         <button className="btn-worker" onClick={fetchUsersWebWorker}>
//           Fetch Users with Web Worker
//         </button>
//       </section>
//     </div>
//   );
// };

// export default Home;

// import React, { Component } from "react";
// import ReactCountdownClock from "react-countdown-clock";
// import workerFile from "./worker.js";
// import WebWorker from "./workerSetup";
// import "./App.css";

// class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       count: 0
//     };
//   }

//   fetchUsers = () => {
//     console.log("fetchUsers called")
//     const users = [];

//     const userDetails = {
//       name: "Jane Doe",
//       email: "jane.doe@gmail.com",
//       id: 1
//     };

//     for (let i = 0; i < 10000000; i++) {
//       userDetails.id = i++;
//       userDetails.dateJoined = Date.now();

//       users.push(userDetails);
//     }

//     this.setState({
//       count: this.state.count + users.length
//     });
//   };

//   fetchUsersWebWorker = () => {
//     console.log("fetchUsersWebWorker called")
//     this.worker.postMessage("Fetch Users");

//     this.worker.addEventListener("message", event => {
//       console.log("fetchUsersWebWorker received")
//       this.setState({
//         count: this.state.count + event.data.length
//       });
//     });
//   };

//   componentDidMount = () => {
//     this.worker = new WebWorker(workerFile);
//   };

//   render() {
//     return (
//       <div className="App-bottom">
//         <section className="App-left">
//           <ReactCountdownClock
//             seconds={100}
//             color="#000"
//             alpha={0.9}
//             size={300}
//           />
//           <p className="text-center">Total User Count: {this.state.count}</p>
//           <button className="btn-direct" onClick={this.fetchUsers}>
//             Fetch Users Directly
//           </button>
//         </section>

//         <section className="App-right">
//           <ReactCountdownClock
//             seconds={100}
//             color="#e56"
//             alpha={0.9}
//             size={300}
//           />
//           <p className="text-center">Total User Count: {this.state.count}</p>
//           <button className="btn-worker" onClick={this.fetchUsersWebWorker}>
//             Fetch Users with Web Worker
//           </button>
//         </section>
//       </div>
//     );
//   }
// }

// export default Home;
