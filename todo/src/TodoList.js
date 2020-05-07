import { LitElement, html } from 'lit-element';

import './Todo';
import { remove } from './storage';

export class TodoList extends LitElement {
  render() {
    return html` <ul @click=${this._onRemoveTodo}></ul> `;
  }

  _onRemoveTodo(event) {
    event.preventDefault();
    if (event.path[0].name === 'remove') {
      const todo = {
        todo: event.target.todo,
        id: event.target.id,
      };
      const newTodos = remove(todo);
      const items = newTodos.map(
        element => `
      <app-todo todo="${element.todo}" ></app-todo>
      `
      );
      this.shadowRoot.querySelector('ul').innerHTML = items.join('');
      this.dispatchEvent(new CustomEvent('remove-todo'));
    }
  }
}

window.customElements.define('app-todo-list', TodoList);