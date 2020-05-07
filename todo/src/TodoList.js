import { LitElement, html } from 'lit-element';

import './Todo';
import { read } from './storage';

export class TodoList extends LitElement {

  static get properties() {
    return {
      todos: {
        type: Array,
      },
      todo: { type: String },
      id: { type: String },
      color: {type: String}
    };
  }

  render() {
    const data = read();
    this.todos = Object.values(data);
    return html`  <ol>
    ${this.todos.map(element => html`<app-todo todo=${element.todo} id=${element.id}}></app-todo>`)}
  </ol>`;
  }

}

window.customElements.define('app-todo-list', TodoList);