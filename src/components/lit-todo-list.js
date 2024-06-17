import { LitElement, html, css } from 'lit';

class LitTodoList extends LitElement {
  static styles = css`
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

  .line-through {
    text-decoration: line-through;
  }
  `;

  static properties = {
    items: { type: Array }
  };

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <div class="wrapper">
        <h1 class="title">Todo List</h1>
        <input class="input" type="text" placeholder="Add a new item" @keyup=${this.addItem} />
        <button class="button" @click=${this.addItem}>Add Todo</button>
        <ul class="list">
          ${this.items.map((item, index) => html`
            <li class=${item.done ? 'item line-through' : 'item'}>
              <input type="checkbox" .checked=${item.done} @change=${() => this.toggleDone(index)} />
              ${item.text}
              <button class="remove" @click=${() => this.removeItem(index)}>X</button>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

  addItem(event) {
    if (event.key && event.key !== 'Enter') {
      return;
    }
    const input = this.shadowRoot.querySelector('.input');
    this.items = [...this.items, { text: input.value, done: false }];
    input.value = '';
  }

  removeItem(index) {
    this.items = this.items.filter((_, i) => i !== index);
  }

  toggleDone(index) {
    this.items = this.items.map((item, i) => i === index ? { ...item, done: !item.done } : item);
  }

}

customElements.define('lit-todo-list', LitTodoList);