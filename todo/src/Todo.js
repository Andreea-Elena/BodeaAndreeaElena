import { LitElement, html, css } from 'lit-element';

export class Todo extends LitElement {
    static get properties() {
        return {
          todo: { type: String },
          id: { type: Number },
        };
      }
      render() {
        return html`
          <li>
              <input type="text" readonly name="todo" id="todo" value="${this.todo}" />
              <input type="button" name="delete" id="delete" value="Delete" />
          </li>
        `;
      }
}

window.customElements.define('app-todo', Todo);