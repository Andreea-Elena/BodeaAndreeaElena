import { LitElement, html, css } from 'lit-element';

import './TodoList';
import './Todo';
import { append } from './storage';

export class AppContent extends LitElement {
  render() {
    return html`
      <form @submit=${this._onSubmit}>
        Type your Todo here:
        <input type="text" name="todo" placeholder="Todo" />
        <app-todo-list name="todoList" id="list"></app-todo-list>
        <button>ADD</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());
    const todo = Object.fromEntries(data);
    if (todo.todo !== '') {
      append(todo);
      this.dispatchEvent(new CustomEvent('add-todo'));
    }
  }
}

window.customElements.define('app-content', AppContent);