const clock = () => {
    // 現在の日時・時刻の情報を取得
    const d = new Date();
  
    // 年を取得
    let year = d.getFullYear();
    // 月を取得
    let month = d.getMonth() + 1;
    // 日を取得
    let date = d.getDate();
    // 曜日を取得
    let dayNum = d.getDay();
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let day = weekday[dayNum];
    // 時を取得
    let hour = d.getHours();
    // 分を取得
    let min = d.getMinutes();
    // 秒を取得
    let sec = d.getSeconds();
  
    // 1桁の場合は0を足して2桁に
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    // 日付・時刻の文字列を作成
    let today = `${year}.${month}.${date} ${day}`;
    let time = `${hour}:${min}:${sec}`;
  
    // 文字列をpタグに挿入
    document.querySelector(".clock-date").innerText = today;
    document.querySelector(".clock-time").innerText = time;
  };
  
  // 1秒ごとにclock関数を呼び出す
  setInterval(clock, 1000);

  
// TODO
const addBtn = document.querySelector(".add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    taskCount++;
    displayCount(taskCount);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className === "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling.innerText;
            targetElement.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount--;
            } else {
                taskCount++;
            }
            displayCount(taskCount);
        };
    });

    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload  =  () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value="";
}