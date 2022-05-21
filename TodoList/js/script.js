// obtenemos todos los requisitos en los elementos
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
	let userData = inputBox.value; // obtenemos la entrada del valor
	if(userData.trim() != 0){		  // si el valor del usuario no tiene espacio
		addBtn.classList.add("active");  // activa el boton de agregar
	} else{
		addBtn.classList.remove("active");  // desactiva el boton de agregar
	}
}
showTasks(); // llama la funcion showtasks

// cuando el usuario hace click en el boton agregar
addBtn.onclick = ()=>{
	let userData = inputBox.value; // obtiene el valor ingresado por el usuario
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // obtiene el almacenamiento local
	if(getLocalStorage == null){						      // si el almacenamiento local es null
		listArr = []; // creando un array en blanco
	} else{
		listArr = JSON.parse(getLocalStorage); // transformando la cadena json en un objeto js
	}
	listArr.push(userData); // empuja o agrega datos de usuario
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transformando el objeto js en una cadena json
	showTasks(); // llama la funcion showtasks
	addBtn.classList.remove("active");  // desactiva el boton de agregado
}


// funcion para añadir lista de tareas dentro del ul
function showTasks(){
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // obtener el almacenamiento local
	if(getLocalStorage == null){	// si el almacenamiento local es null
		listArr = []; // creando un array blanco
	} else{
		listArr = JSON.parse(getLocalStorage); // transformando la cadena json en un objeto js
	}
	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = listArr.length; // pasando el valor length en pendingNumb
	if(listArr.length > 0){ // si el array length es mayor que 0
		deleteAllBtn.classList.add("active"); // inactiva el boton borrar todo
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