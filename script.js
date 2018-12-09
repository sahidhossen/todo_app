/**
 * Create ToDo Object for create everything about todo 
 * This object will hold all functions about todo application
 */

function ToDo(){
    this.todoListIdName = 'todoList'
    this.textField = 'todoName'
    this.addBtn = 'addBtn'
    this.errorIdName = 'errorMsg'
    this.todo_name = ''

    this.error = ''

    this.todoList= []

    this.interval = 0
    // run init method
    this.init()
    // All events
    this.Events()
}   

/**
 * Init method for doto application
 * Cache your element ids with this constractor
 * Check if it has already todolist 
 * If has then render the todo list item 
 * Else print empty todolist (later)
 */
ToDo.prototype.init = function() {
    
    this.todoListId = document.getElementById(this.todoListIdName)
    this.textFieldId = document.getElementById(this.textField)
    this.addBtnId = document.getElementById(this.addBtn)
    this.errorId = document.getElementById(this.errorIdName)

    if(this.todoList.length > 0 ){
        // Loop each time to print into html 
        this.renderList()
    }else {
        // Print empty html 
    }
}
/**
 * Render each todo list 
 * 
 * Delete/empty everything from the todolist element
 * Loop each item  as list in todoList element
 * 
 * @param (object)  each list item
 */
ToDo.prototype.renderList = function(){
    this.todoListId.innerHTML = ''
    this.todoList.map( list => {
        this.list(list)
    })
}
/**
 * Print each list item 
 */
ToDo.prototype.list = function(list) {
    let listDom = `<div class="list flex-box">
                    <div class="flex-1 todo-name">
                        <span> ${list.name} </span>
                        <small> ${list.date} </small>
                    </div>
                    <div class="options"> <span class="delete-btn"> Delete </span></div>
                </div>
    `
    this.todoListId.innerHTML += listDom
}

/**
 * Fire each event into this Events method
 * Like- click, change, keyup etc....
 */
ToDo.prototype.Events = function(){

    /**
     * onKey up events for todo field 
     */
    this.textFieldId.addEventListener('keyup', event => {
        let value  = event.target.value
        this.todo_name = value
        this.checkError()
    }, false)

    /**
     * 
     */
    this.addBtnId.addEventListener('click', () => {
        let { todo_name } = this 
        if(todo_name === ''){
            this.error = 'Your field is empty!'
        }else {
            this.error = ''
            // push the todo name into todolist
            this.addTodoList()
        }
        this.checkError()
    }, false)   
}

ToDo.prototype.addTodoList = function(){
    let date =   Date.now()
    // let currentDate = new Date(date);
    let id = new Date().getTime();
    let list = { name: this.todo_name, id, date}
    this.todoList.unshift(list)
    this.renderList()
    this.flash()
}
/**
 * Flash everything you want!
 */
ToDo.prototype.flash = function(){
    this.todo_name = ''
    this.error = ''
    this.textFieldId.value = ''
}

ToDo.prototype.checkError = function(){
    let { error } = this 
    if(error !== ''){
        this.errorId.style = 'display: block'
        this.errorId.innerHTML = error

        if(this.interval > 0 ){
            clearInterval(this.interval)
            this.interval = 0
        }

        this.interval = setTimeout(()=>{
            this.error = ''
            this.errorId.style = 'display: none'
        }, 3000)
        
    }
}

ToDo.prototype.flashError = function(){
    
    this.checkError()
}

new ToDo()

 