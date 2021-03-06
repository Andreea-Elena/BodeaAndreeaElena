import { LitElement, html, css } from 'lit-element';

export class AppContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5 rem;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }
  render() {
    return html` <form @submit=${this._onSubmit}>
      <label
        >Please choose a year:
        <input type="number" name="year" min="2020" max="2030" value="2020" />
        <input type="text" name="title" value="My app" />
      </label>
      <button>OK</button>
    </form>`;
  }

  _onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);
    console.log(data, event.target.elements);
    this.dispatchEvent(new CustomEvent('year-change', { detail: data }));
  }
}

window.customElements.define('app-content', AppContent);
