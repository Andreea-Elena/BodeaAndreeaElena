import { LitElement, html } from 'lit-element';

import './Todo';
import { remove } from './storage';

export class TodoList extends LitElement {
  render() {
    return html` <ul @click=${this._onRemoveTodo}></ul> `;
  }

  _onRemoveTodo(event) {
    event.preventDefault();
      const todo = {
        todo: event.target.todo,
        id: event.target.id,
      };
      console.log(todo);
      const newTodos = remove(todo);
      const items = newTodos.map(
        element => `
      <app-todo todo="${element.todo}" id="${element.id}" ></app-todo>
      `
      );
      this.shadowRoot.querySelector('ul').innerHTML = items.join('');
      this.dispatchEvent(new CustomEvent('remove-todo', {composed: true, bubbles:true}));
  }
}

window.customElements.define('app-todo-list', TodoList);