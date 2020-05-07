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

  constructor() {
    super();
    this.numberOfTodos = '';
  }

  render() {
    return html`
      <app-content
        @add-todo=${this._onAddTodo}
        @remove-todo-main=${this._onRemoveTodo}
      ></app-content>
    `;
  }

  _onAddTodo(event) {
    event.preventDefault();
    const todos = read();
    this.numberOfTodos++;
    const items = todos.map(
      element => `
    <app-todo todo="${element.todo}"></app-todo>
    `
    );
    this.shadowRoot
      .querySelector('app-content')
      .shadowRoot.querySelector('app-todo-list')
      .shadowRoot.querySelector('ul').innerHTML = items.join('');
  }

  _onRemoveTodo() {
    this.numberOfTodos = this.numberOfTodos - 1;
  }
}