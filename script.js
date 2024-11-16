const WEEKLY_ALLOCATION = 24 * 7;

// generate unique string
const randomIdGenerator = () => {
  let randomStringLength = 10;
  let randomString = "";
  let alphabetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < randomStringLength; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetString.length);
    randomString += alphabetString[randomIndex];
  }

  return randomString;
};

let taskList = [
  {
    id: "OQaCmVDVB3",
    task: "Task 1",
    hour: 10,
    type: "entry",
  },
  {
    id: "29JR1fr3iX",
    task: "Task 2",
    hour: 20,
    type: "entry",
  },
  {
    id: "d1mQJzpGgE",
    task: "Tak 3",
    hour: 30,
    type: "entry",
  },
];

// INPUT TASK AND HOUR
// ADD the TASK to task list
const addTask = () => {
  // console.log("ADD TASK CALLED");

  const taskField = document.getElementById("task");
  const hourField = document.getElementById("hour");

  if (taskField.value != "" && hourField.value != "") {
    const taskObject = {
      id: randomIdGenerator(),
      task: taskField.value,
      hour: parseInt(hourField.value),
      type: "entry",
    };

    if (taskObject.hour + calculateTotalhour() <= WEEKLY_ALLOCATION) {
      taskList.push(taskObject);
      displayTask();
      const toastLiveExample = document.getElementById("liveToast");

      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    } else {
      alert("TASK HOUR ALLOCATION EXCEEDED");
    }
  } else {
    alert("Please enter task or hour!!");
  }


};

// displaying entry list and bad list
const displayTask = () => {
  const goodListElement = document.getElementById("entry-list");
  const badListElement = document.getElementById("bad-list");

  goodListElement.innerHTML = "";
  badListElement.innerHTML = "";

  taskList.map((item, index) => {
    let goodTrValue = "";
    let badTrValue = "";
    if (item.type == "entry") {
      goodTrValue = `
                  <tr class='task-row'>
                    <td> <input type='checkbox' /></td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td class="text-end "><button class="btn btn-danger me-1" onclick="deleteTask('${
                      item.id
                    }')">Delete</button>
                          <button class="btn btn-success" onclick="convertTask('${
                            item.id
                          }')">Move</button></td>
                  </tr>
      `;
    } else {
      badTrValue = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                  <td class="text-end "> <button class="btn btn-warning" onclick="convertTask('${
                    item.id
                  }')">Move</button>
                        <button class="btn btn-danger ms-1" onclick="deleteTask('${
                          item.id
                        }')">Delete</button></td>
                </tr>`;
    }

    goodListElement.innerHTML = goodListElement.innerHTML + goodTrValue;
    badListElement.innerHTML = badListElement.innerHTML + badTrValue;
  });

  // display total hour
  const totalHourSpan = document.getElementById("totalHours");
  totalHourSpan.innerText = calculateTotalhour();

  // display bad hour
  const badHourSpan = document.getElementById("badHour");
  badHourSpan.innerText = calculateBadHours();
};

// change type from entry -> bad or bad -> entry
const convertTask = (id) => {
  console.log("TASK CONVERTED");

  let task = taskList.find((task) => task.id == id);

  task.type = task.type == "entry" ? "bad" : "entry";

  displayTask();
};

// Delete Task
const deleteTask = (id) => {
  console.log("ID TO DELETE:", id);

  if (confirm("Deleting Task....\n Are you Sure ?")) {
    taskList = taskList.filter((task) => task.id !== id);

    displayTask();
  }
};

const calculateTotalhour = () => {
  let totalHour = taskList.reduce((acc, item) => acc + item.hour, 0);

  return totalHour;
};

const calculateBadHours = () => {
  // let badHour = taskList.reduce((acc, item) => {
  //   return acc + (item.type == "bad" ? item.hour : 0);
  // }, 0);

  let badHour = taskList.reduce((acc, task) => {
    if (task.type == "bad") {
      return acc + task.hour;
      0;
    } else {
      return acc;
    }
  }, 0);

  return badHour;
};

displayTask();

displayTask();
