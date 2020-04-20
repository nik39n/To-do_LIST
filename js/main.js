const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");
form.addEventListener("submit", function(event){
	event.preventDefault();
	console.log("Submit");


 let taskText= input.value;
	taskText = taskText.trim();
	
	const taskHTML = `
        <li class="list-group-item d-flex justify-content-between">
					<span class="task-title" contenteditable="true">${taskText}</span>
          <div>
            <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово!</button>
					  <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
          </div>
				</li>`;
 tasksList.insertAdjacentHTML("afterbegin", taskHTML);
 // очищаем поле ввода
 input.value = "";
 // фокус после добавления новой задачи
 input.focus();

 toggleemptyListItem();
 showNotification("new");

});
// прослушивам клик внутри всего списка с задачами
 tasksList.addEventListener("click", function(event){
 	// Проверяем что клик произошел по кнопке "удалить"
 	if(event.target.getAttribute("data-action") == "delete-task"){
 		console.log('button');
 		 // находим родителский тег "li"
    event.target.closest(".list-group-item").remove();
 		// И удаляем его 
 		toggleemptyListItem();
 		showNotification("delete");
  } else if(event.target.getAttribute("data-action") == "ready"){
    console.log("Ready button!");
    const parentElement = event.target.closest(".list-group-item");
    console.log(parentElement);
    parentElement.querySelector(".task-title").classList.add("task-title--done");
    parentElement.querySelector(".task-title").setAttribute("contenteditable","false");
    tasksList.insertAdjacentElement("beforeend",parentElement);
    event.target.remove();
    // event.target.closest(".btn").remove();


    showNotification("ready");

  }


 });


 function toggleemptyListItem(){
 	if(tasksList.children.length > 1){
 		document.querySelector(".empty-list-item").style.display = "none";
 	} else{
 		document.querySelector(".empty-list-item").style.display = "block";
 	}
 }


 function showNotification(type){
 	 const notifyNew = document.createElement("div");
  notifyNew.className = "alert alert-warning alertOPacity";
  notifyNew.textContent = "Задача Добавлена!";
 		
  const notifyDelete = document.createElement("div");
  notifyDelete.className = "alert alert-danger alertOPacity";
  notifyDelete.textContent = "Задача Удалена!";

  const notifyReady = document.createElement("div");
  notifyReady.className = "alert alert-primary alertOPacity";
  notifyReady.textContent = "Задача Выполнена!";

 	let newElement;
  switch(type){
  	case 'new':
  		newElement = notifyNew;
  		break;
  	case "delete":
  	 newElement = notifyDelete;
  	 break;
    case "ready":
     newElement = notifyReady;
     break;
  }
  console.log(notifyNew);
 	document.querySelector(".notiify_holder").insertAdjacentElement("afterbegin", newElement);
  
 	setTimeout(function(){
 		newElement.style.opacity = "1";

 	},300);

 	setTimeout(function (){
 		newElement.style.opacity = "0";
 	},2300);

 	setTimeout(function(){
 		newElement.remove();
 	},2600);




 }
