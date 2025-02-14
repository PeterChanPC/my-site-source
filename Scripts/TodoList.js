//A list to store the todo items
class TodoList {
    constructor() {
        //Create the list
        //Get local save files if possible
        this.list = JSON.parse(localStorage.getItem("todoList")) || [];
    }

    //Add TodoItem into TodoList
    addItem(todoItem) {
        this.list.push(todoItem);
        this.createDiv(); //update list container
    }

    //Delete TodoItem from TodoList
    deleteItem(targetIndex) {
        this.list.forEach((item, i) => { //search item
            if (item.index === targetIndex) {
                this.list.splice(i, 1); //remove item
                this.createDiv(); //update list container
            }
        });
    }

    //Create or refresh div elements in TodoList
    createDiv() {
        const listContainerList = document.querySelectorAll(".TodoList");
        console.log(listContainerList);
        listContainerList.forEach((listContainer) => {
            listContainer.innerHTML = ""; //reset list
            

            this.list.forEach((item) => {
                //create item name div
                const todoItem = document.createElement("div");
                todoItem.textContent = item.name;
                todoItem.className = "TodoItem";

                //create item deadline div
                

                //create the delete button for item
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.setAttribute("onclick", `todoList.deleteItem(${item.index})`);
                deleteButton.className = "delete";

                //create item container that holds the details
                const todoItemContainer = document.createElement("div");
                todoItemContainer.appendChild(todoItem);
                todoItemContainer.appendChild(deleteButton);
                todoItemContainer.className = "TodoItemContainer";

                //Push the item container into the list container
                listContainer.appendChild(todoItemContainer);
            });
        });
        this.saveLocal();
    }

    //Save the list in local storage
    saveLocal() {
        localStorage.setItem("todoList", JSON.stringify(this.list));
    }
}

//Todo items
class TodoItem {
    constructor(name, index, ddl) {
        //Create item with attributes
        this.name = name;
        this.index = index;
        this.deadline = ddl;
    }
}

//Initialize
const todoList = new TodoList;
let index = 0;

function AddInput(id) {
    const listContainer = document.getElementById(id);
    const input = document.createElement("input");
    input.className = "Input";
    listContainer.appendChild(input);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") AddFromInput(input);
    });
}

//Add item to list from input
function AddFromInput(input) {
    if (!input.value) return; //cannot add empty object
    let todoItem = new TodoItem(input.value, index++);
    todoList.addItem(todoItem);
    input.value = ""; //clear input
}