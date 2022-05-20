// obtenemos todos los requisitos en los elementos
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
	let userData = inputBox.value; // obtenemos la entrada del valor
	if(userData.trim() != 0){		  // si el valor del usuario no tiene espacio
		addBtn.classList.add("active");  // active the add button
	} else{
		addBtn.classList.remove("active");  // unactive the add button
	}
}
showTasks(); // calling showtasks function

// if user click on the add button
addBtn.onclick = ()=>{
	let userData = inputBox.value; // getting user entered value
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // getting localstorage
	if(getLocalStorage == null){						      // if localstorage is null
		listArr = []; // creating blank array
	} else{
		listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
	}
	listArr.push(userData); // pushing or adding user data
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transforming js object into a json sting
	showTasks(); // calling showtasks function
	addBtn.classList.remove("active");  // unactive the add button
}


// function to add task list inside ul
function showTasks(){
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // getting localstorage
	if(getLocalStorage == null){						      // if localstorage is null
		listArr = []; // creating blank array
	} else{
		listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
	}
	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = listArr.length; // passing the length value in pendingNumb
	if(listArr.length > 0){ // if array length is greater than 0
		deleteAllBtn.classList.add("active"); // unactive the creal all button
	} else{
		deleteAllBtn.classList.remove("active");
	}
	let newLiTag = "";
	listArr.forEach((element, index) =>{
		newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="bx bxs-trash-alt"></i></span></li>`;
	});
	todolist.innerHTML = newLiTag; // adding new li tag inside ul tag
	inputBox.value = ""; // once task added leave the input field blank
}

// delete task function
function deleteTask(index){
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // getting localstorage
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); // delete or remove the particular indexed li
	// after remove the li again update the local storage 
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transforming js object into a json sting
	showTasks(); // calling showtasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
	listArr =[]; // empty an array
	// after delete all task again update the local storage
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transforming js object into a json sting
	showTasks(); // calling showtasks function
}