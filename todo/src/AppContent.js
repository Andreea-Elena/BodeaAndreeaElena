import { LitElement, html, css } from 'lit-element';

import './TodoList';
import './TodoAdd';

export class AppContent extends LitElement {
  render() {
    return html`
      <todo-add></todo-add>
      <app-todo-list></app-todo-list>
    `;
  }
}

window.customElements.define('app-content', AppContent);