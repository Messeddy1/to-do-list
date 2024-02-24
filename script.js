let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".task-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAll = document.getElementById("delele-all");
let finishedALL = document.getElementById("finish-all");

window.onload = function () {
  theInput.focus();
};
theAddButton.onclick = function () {
  if (theInput.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No Value",
    });
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");
    if (document.body.contains(noTasksMsg)) {
      noTasksMsg.remove();
    }
    let mainSpan = document.createElement("span");
    mainSpan.className = "task-box";
    let text = document.createTextNode(theInput.value);
    mainSpan.appendChild(text);
    let deletButton = document.createElement("span");
    deletButton.className = "delete";
    let textDelete = document.createTextNode("Delete");
    deletButton.appendChild(textDelete);
    mainSpan.appendChild(deletButton);
    tasksContainer.appendChild(mainSpan);
    theInput.value = "";
    theInput.focus();
    calcTasks();
  }
};

document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Task has been deleted.",
          icon: "success",
        });
        e.target.parentNode.remove();
        if (tasksContainer.childElementCount == 0) {
          creatNoTasks();
        }
      }
    });
  }
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  calcTasks();
});

function creatNoTasks() {
  let msgSpan = document.createElement("span");
  msgSpan.className = "no-tasks-message";
  let msgText = document.createTextNode("No Tasks To Show");
  msgSpan.appendChild(msgText);
  tasksContainer.appendChild(msgSpan);
}
function calcTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

