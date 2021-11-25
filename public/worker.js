onmessage = function(event) {
  console.log("[WorkerThread] onmessage called", event.data);

  const users = fetchUsers();

  postMessage(users);
};


const fetchUsers = () => {
  console.log("[WorkerThread] fetchUsers called");

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

  return users;
};