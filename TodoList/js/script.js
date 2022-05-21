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
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // obtiene el almacenamiento local
	if(getLocalStorage == null){						      // si el almacenamiento local es null
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
	todolist.innerHTML = newLiTag; // agrega un nuevo li tag dentro de la etiqueta ul
	inputBox.value = ""; // una vez agregado la tarea deja el campo de entrada en blanco 

// borra la funcion de tarea
function deleteTask(index){
	let getLocalStorage = localStorage.getItem("Nuevo Todo"); // obtiene el almacenamiento local
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); // elimina la li indexada particular 
	// despues de remover el li nuevamente, actualiza el almacenamiento local 
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transforma el objeto js en una cadena json
	showTasks(); // llama la funcion showtasks
}

// elimina toda las funciones de tarea
deleteAllBtn.onclick = ()=>{
	listArr =[]; // vacia un array
	// despues de remover el li nuevamente, actualiza el almacenamiento local 
	localStorage.setItem("Nuevo Todo", JSON.stringify(listArr)); // transforma el objeto js en una cadena json
	showTasks(); // llama la funcion showtasks
}