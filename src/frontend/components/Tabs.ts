import { LitElement, html, css } from 'lit';

type Tab = {
    label: string
    content: string
    onActive?: () => void,
    onInactive?: () => void
}

type TabsProps = {
    tabs: Record<string, Tab>
    activeTab?: number
}

export class Tabs extends LitElement {
  static styles = css`

    * {
      box-sizing: border-box;
    }

    :host {
      display: grid !important;
      height: 100%;
      grid-template-rows: auto 1fr;
    }

    slot {
      overflow: hidden;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 0;
      margin: 0px;
      list-style: none;
    }

    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
    }

    .tab.active {
      border-bottom-color: blue;
    }

    .tab-content {
      display: none;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    
    .tab-content.active {
      display: block;
    }

  `;

  declare activeTab: string | number
  declare tabs: Record<string, Tab>

  static properties = {
    activeTab: { type: Number },
    tabs: { type: Object },
  };

  constructor({ tabs, activeTab }: TabsProps) {
    super();
    this.tabs = tabs;
    this.activeTab = activeTab ?? Object.keys(tabs)[0];
  }

  async updated(
    _changedProperties: Record<string, any>
  ) {

    const oldTab = _changedProperties.get('activeTab');

    await this.updateComplete
    
    const activeTab = this.tabs[this.activeTab];

      if (oldTab) {
      const previousTab = this.tabs[oldTab];
      if (previousTab.onInactive) previousTab.onInactive();
    }

    if (activeTab.onActive) activeTab.onActive();
  }

  render() {

    return html`
      <ul class="tabs">
        ${Object.entries(this.tabs).map(([id, tab ]) => html`
          <li class="tab ${this.activeTab === id ? 'active' : ''}" @click=${() => this.activeTab = id}>
            ${tab.label ?? id}
          </li>
        `)}
      </ul>
      <slot>
        ${Object.entries(this.tabs).map(([ id, tab ]) => html`
          <div class="tab-content ${this.activeTab === id ? 'active' : ''}">
            ${tab.content}
          </div>
        `)}
      <slot>
    `;
  }

  addTab(tab) {
    this.tabs.push(tab);
    this.requestUpdate();
  }
}

customElements.define('tab-manager', Tabs);
