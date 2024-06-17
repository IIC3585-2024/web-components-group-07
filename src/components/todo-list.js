class TodoList extends HTMLElement {
    constructor() {
        super();
        this.todos = [];
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');

        const title = document.createElement('h1');
        title.textContent = 'Todo';
        title.setAttribute('class', 'title');

        const input = document.createElement('input');
        input.setAttribute('class', 'input');
        input.setAttribute('placeholder', 'Enter a todo item');
        input.setAttribute('type', 'text');

        const button = document.createElement('button');
        button.textContent = 'Add Todo';
        button.setAttribute('class', 'button');

        const list = document.createElement('ul');
        list.setAttribute('class', 'list');
        
        wrapper.appendChild(title);
        wrapper.appendChild(input);
        wrapper.appendChild(button);
        wrapper.appendChild(list);

        const style = document.createElement('style');

        style.textContent = `
            .wrapper {
                width: 300px;
                margin: 0 auto;
                font-family: Arial, sans-serif;
            }
            .title {
                font-size: 24px;
                text-align: center;
            }
            .input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                box-sizing: border-box;
            }
            .button {
                width: 100%;
                padding: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                cursor: pointer;
            }
            .list {
                list-style: none;
                padding: 0;
            }
            .item {
                padding: 10px;
                margin: 10px 0;
                background-color: #f9f9f9;
            }
            .done {
                cursor: pointer;
                float: left;
                cursor: pointer;
                margin-right: 10px;
            }
            .remove {
                color: white;
                cursor: pointer;
                border: none;
                float: right;
            }
            .remove:hover {
                background-color: #c82333;
            }
                
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        
        this.render();

        const addTodoFromInput = () => {
            this.addTodo({
                text: input.value,
                done: false
            });
            input.value = '';
        }
        button.addEventListener('click', addTodoFromInput);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodoFromInput();
            }
        });
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.render();
    }

    render() {
        const list = this.shadowRoot.querySelector('.list');
        list.innerHTML = '';

        this.todos.forEach((todo, index) => {
            const item = document.createElement('li');
            item.setAttribute('class', 'item');
            item.textContent = todo.text;

            // add button to mark todo as done
            const doneButton = document.createElement('input');
            doneButton.setAttribute('type', 'checkbox');
            doneButton.classList.add('done');
            
            doneButton.checked = todo.done;

            doneButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.todos[index].done = !this.todos[index].done;
                this.render();
            });

            // add button to remove todo
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove');
            removeButton.textContent = 'X';

            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.todos.splice(index, 1);
                this.render();
            });
            
            item.appendChild(removeButton);
            item.appendChild(doneButton);
        
            list.appendChild(item);
            
            if (todo.done) {
                item.style.textDecoration = 'line-through';
            }
        }
        );
    }
}

customElements.define('todo-list', TodoList);