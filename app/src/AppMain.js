import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppContent';
import './AppFooter';

export class AppMain extends LitElement {
  static get properties() {
    return {
      year: { type: Number },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.year = 2020;
  }
  render() {
    return html`
    <app-header .title=${this.title}></app-header>
    <app-content @year-change=${this._onYearChanged}></app-content>
    <app-footer .year=${this.year}></footer>`;
  }

  _onYearChanged(event) {
    this.year = event.detail.year;
    this.title = event.detail.title;
  }
}
