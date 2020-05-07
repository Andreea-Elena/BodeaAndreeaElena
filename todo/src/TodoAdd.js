import { LitElement, html } from 'lit-element';
import { append } from './storage';

export class TodoAdd extends LitElement {
  render() {
    return html`
      <form @submit=${this._onSubmitAdd}>
        <label class="add"
          >Todo
          <input type="text" name="todo" required minlength="2" placeholder="Type what you have to do" />
          <select id="category" name="category">
            <option value="facultate">Facultate</option>
            <option value="licenta">Licenta</option>
            <option value="devSchool">DevSchool</option>
            <option value="timpLiber">Timp Liber</option>
          </select>
        </label>
        <button>Add</button>
      </form>
    `;
  }

  _onSubmitAdd(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    fd.set('id', Date.now().toString());
    const data = Object.fromEntries(fd);
    console.log(data);
    append(data);
  }
}

window.customElements.define('todo-add', TodoAdd);