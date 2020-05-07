import { LitElement, html, css } from 'lit-element';
import { remove } from './storage';

export class Todo extends LitElement {
  static get properties() {
    return {
      todo: {
        type: String,
      },
      id: { type: String },
    };
  }
  render() {
    return html`
         <li>
      ${this.todo}
      <button @click=${() => remove(this.id)}>Remove</button>
    </li> 
        `;
  }
}

window.customElements.define('app-todo', Todo);