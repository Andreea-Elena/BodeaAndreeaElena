import { LitElement, html } from 'lit-element';

import './AppContent';
import './TodoList';
import './Todo';
import { read } from './storage';

export class AppMain extends LitElement {
  static get properties() {
    return {
      numberOfTodos: { type: Number },
    };
  }

  render() {
    return html`
      <app-content
        @add-todo=${this._onAddTodo}
      ></app-content>
    `;
  }

  _onAddTodo(event) {
    event.preventDefault();
    const todos = read();
    const items = todos.map(
      element => `
    <app-todo todo="${element.todo}" id="${element.id}"></app-todo>
    `
    );
    this.shadowRoot
      .querySelector('app-content')
      .shadowRoot.querySelector('app-todo-list')
      .shadowRoot.querySelector('ul').innerHTML = items.join('');
  }
}