const fs = require("fs");

const args = process.argv.slice(2);
// console.log('Arguments:', args);


if(args[0] !== "list" || args[0] !== "add" || args[0] !== "update" || args[0] !== "delete" || args[0] !== "mark-in-progress" || args[0] !== "mark-done"){
  console.log("Hii, Here are the commands to try:");
  console.log("1. add 'your description here'");
  console.log("2. list - to display the list of tasks");
  console.log("3. delete id - to delete a task ");
  console.log("4. update id 'message' - to update your description");
  console.log("5. mark-in-progress or mark-done - to update the status");
}


// const description = args[1];
//console.log(description);

const tasksFilePath = "tasklist.json";

if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, "[]");
}

function loadtasks() {
  // Read existing tasks from the JSON file
  const tasksData = fs.readFileSync(tasksFilePath, "utf8");
  const tasks = JSON.parse(tasksData);
  return tasks;
}

const tasks = loadtasks();

// console.log("Existing tasks:", tasks);

const timestamp = new Date().toISOString();

const highestid = tasks.reduce((maxId, number) => {
// console.log("maxid: ", maxId);
// console.log("number: ", number.id);
 return number.id > maxId ? number.id : maxId
}, 0);


// console.log("Highest task ID:", highestid);

const newtaskId = highestid + 1;

// console.log("New task ID:", newtaskId);


const newtask = {
  id: newtaskId,
  description: "",
  status: "todo",
  createdAt: timestamp,
  updatedAt: timestamp,
}


// console.log("New task:", newtask);
if(args[0] == "add"){
  if(args[1] !== ""){
  console.log(args[1]);
  console.log(newtask.description = args[1]);
  tasks.push(newtask);
fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
} else{
  console.log("Enter a valid description")
}
} 


// if(args[0] == "list"){
//   console.log(tasks);
// }

const tasksdone = tasks.filter(task => task.status == "done");
const tasksinprogress = tasks.filter(task => task.status == "in-progress");
const taskstodo = tasks.filter(task => task.status == "todo")

if(args[0] == "list"){
switch(args[1]){
   case "done":
    console.log(tasksdone);
    break;
   case "in-progress":
    console.log(tasksinprogress);
    break;
   case "todo":
    console.log(taskstodo);
    break;
   default:
    console.log(tasks);
    break;
}
}

if(args[0] == "delete" && args[1] !== ""){
const deletingitem = Number(args[1]);
// console.log("deletingitem", deletingitem);
const index = tasks.findIndex(task => task.id === deletingitem);
// console.log(index);
if(index !== -1){
  tasks.splice(index, 1);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
} else {
  console.log("Enter a valid ID");
}
}
// console.log(tasks);


if(args[0] == "update"){

  const updatingid = Number(args[1]);

  const index = tasks.findIndex(task => task.id === updatingid);

  if(index !== -1){
    tasks[index].description = args[2];
    tasks[index].updatedAt = new Date().toISOString();
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } else {
    console.log(" Enter a valid ID");
  }

}


if(args[0] == "mark-done" || args[0] == "mark-in-progress"){
  const index = tasks.findIndex(task => task.id === Number(args[1]));
  
  if(index !== -1){
  if(args[0] == "mark-done"){
    tasks[index].status = "done";
  } else if(args[0] == "mark-in-progress") {
    console.log("index", index);
    tasks[index].status = "in-progress";
  } else {
    console.log("Enter any one of the following commands:");
    console.log("1. mark-done   2. mark-in-progress");
  }
   tasks[index].updatedAt = new Date().toISOString();
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

}
}
 






