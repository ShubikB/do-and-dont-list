const WEEKLY_ALLOCATION = 24 * 7
const RANDOM_STRING_LENGTH = 10

// Generates ramndom Stinng for unique task ID
const generateRandomId = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length: RANDOM_STRING_LENGTH }, () =>
    alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  ).join("")
}

// Initial Task List
let taskList = [
  { id: generateRandomId(), task: "Task 1", hour: 10, type: "entry" },
  { id: generateRandomId(), task: "Task 2", hour: 20, type: "entry" },
  { id: generateRandomId(), task: "Task 3", hour: 30, type: "entry" },
]

const addTask = () => {
  const taskField = document.getElementById("task")
  const hourField = document.getElementById("hour")

  if (!taskField.value || !hourField.value) {
    return alert("Please enter task and hour!")
  }

  // Create a new task object
  const taskObject = {
    id: generateRandomId(),
    task: taskField.value,
    hour: parseInt(hourField.value),
    type: "entry",
  }

  if (calculateTotalHours() + taskObject.hour > WEEKLY_ALLOCATION) {
    return alert("TASK HOUR ALLOCATION EXCEEDED")
  }

  taskList.push(taskObject)
  displayTask()
  const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("liveToast"))
  toast.show()
}

// Displays the tasks in the "entry" and "bad" lists
const displayTask = () => {
  const goodList = document.getElementById("entry-list")
  const badList = document.getElementById("bad-list")
  goodList.innerHTML = ""
  badList.innerHTML = ""

  // Iterate through the task list and create rows for each task
  taskList.forEach((task, index) => {
    const taskRow = `
      <tr>
        <td>${task.type === "entry" ? `<input type="checkbox" />` : index + 1}</td>
        <td>${task.task}</td>
        <td>${task.hour}</td>
        <td class="text-end">
          <button class="btn btn-${task.type === "entry" ? "success" : "warning"}" 
            onclick="convertTask('${task.id}')">${
      task.type === "entry" ? "Move" : "Return"
    }</button>
          <button class="btn btn-danger ms-1" onclick="deleteTask('${task.id}')">Delete</button>
        </td>
      </tr>`
    if (task.type === "entry") goodList.innerHTML += taskRow
    else badList.innerHTML += taskRow
  })

  document.getElementById("totalHours").innerText = calculateTotalHours()
  document.getElementById("badHour").innerText = calculateBadHours()
}

// Converts a task's type between "entry" and "bad"
const convertTask = (id) => {
  const task = taskList.find((task) => task.id === id)
  task.type = task.type === "entry" ? "bad" : "entry"
  displayTask()
}

// deletes Task
const deleteTask = (id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    taskList = taskList.filter((task) => task.id !== id)
    displayTask()
  }
}

// Calculates the total hours of all tasks
const calculateTotalHours = () => taskList.reduce((acc, task) => acc + task.hour, 0)

// Calculates the total hours of tasks marked as "bad"
const calculateBadHours = () =>
  taskList.reduce((acc, task) => (task.type === "bad" ? acc + task.hour : acc), 0)

displayTask()
