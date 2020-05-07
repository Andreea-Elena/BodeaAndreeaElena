import { LitElement, html } from 'lit-element';

import './AppContent';

export class AppMain extends LitElement {
  render() {
    return html`
      <app-content></app-content>
    `;
  }
}