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
        for (let listContainer of listContainerList) {
            listContainer.innerHTML = ""; //reset list

            let i = 0;
            for (let item of this.list) {
                //check Div routine type
                if (item.routine !== listContainer.id) continue;

                //create checkbox
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "Completion";
                if (item.completion) checkbox.checked = true;;

                //create index div


                //create item name div
                const todoItem = document.createElement("p");
                todoItem.textContent = item.name;
                todoItem.className = "TodoItem";

                //create item deadline div
                if (item.ddl) {

                }

                //create the delete button for item
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
                deleteButton.setAttribute("onclick", `todoList.deleteItem(${item.index})`);
                deleteButton.className = "delete";

                //create item container that holds the details
                const todoItemContainer = document.createElement("div");
                todoItemContainer.appendChild(checkbox);
                todoItemContainer.appendChild(todoItem);
                todoItemContainer.appendChild(deleteButton);
                todoItemContainer.className = "TodoItemContainer";

                //Push the item container into the list container
                listContainer.appendChild(todoItemContainer);
            };
        };
        this.saveLocal();
    }

    //Save the list in local storage
    saveLocal() {
        localStorage.setItem("todoList", JSON.stringify(this.list));
    }
}

//Todo items
class TodoItem {
    constructor(name, routine, ddl, completion=false) {
        //Create item with attributes
        this.name = name;
        this.routine = routine;
        this.deadline = ddl;
        this.completion = completion;
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
        if (e.key === "Enter") AddFromInput(input, id);
    });
}

//Add item to list from input
function AddFromInput(input, routine) {
    if (!input.value) return; //cannot add empty object
    const todoItem = new TodoItem(input.value, routine);
    todoList.addItem(todoItem);
}