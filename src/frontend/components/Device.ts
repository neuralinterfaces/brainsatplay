import { LitElement, html, css } from 'lit';
import { JSONSchemaForm } from './JSONSchemaForm';

export type Device = {
    cls: any
    name: string
}

type OnConnectProps = {
    device: Device,
    options: Record<string, any>
}

export type OnConnectCallback = (this: DeviceElement, info: OnConnectProps) => void
export type OnDisconnectCallback = (this: DeviceElement, device: Device) => void

type DeviceProps = {
    device: Device,
    onConnect: OnConnectCallback,
    onDisconnect: OnDisconnectCallback
}

export class DeviceElement extends LitElement {
  static styles = css`
  
  :host {
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    flex-grow: 1;
  }

  :host([mock]) button, [mock] .main{
    opacity: 0.5;
    pointer-events: none;
  }

  :host([mock]) header div:first-child::after {
    content: 'In Development';
    font-size: 70%;
    color: rgb(210, 210, 210);
  }

  [hidden] {
    display: none !important;
  }
  
  header {
    display: flex;
    gap: 25px;
    justify-content: space-between;
    align-items: center;
    background: black;
    color: white;
    padding: 10px 15px;
    border-radius: 8px 8px 0 0;
  }
  
  header button {
    font-size: 80%;
  }

  input {
    border-radius: 5px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: #0f0f0f;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  label {
    font-weight: bold;
    font-size: 80%;
    margin-right: 5px;
  }
  
  button {
    text-align: left;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 700;
    font-family: inherit;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    transition: background-color 0.25s;
  }
  
  button:hover {
    border-color: #d2e0ff;
    background-color: #121212;
  }
  
  button:active {
    border-color: #396cd8;
    background-color: #e8e8e8;
  }
  
  input,
  button {
    outline: none;
  }
  
  #main {
    padding: 15px 25px;
  }
  
  #controls { 
    display: flex;
    gap: 10px;
  }
  
  h3 {
    margin: 0;
  }
  
  #connected {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    padding: 15px 25px;
  }
  
  #battery {
    display: flex;
    align-items: center;
  }
  
  #battery > div {
    width: 20px;
    height: 10px;
    border: 1px solid gray;
  }
  
  #battery > div > .level {
    width: 100%;
    height: 100%;
  }
  
  `;

  declare device: DeviceProps['device']
  declare onConnect: DeviceProps['onConnect']
  declare onDisconnect: DeviceProps['onDisconnect']

  form: JSONSchemaForm

  static properties = {
    device: { type: Object },
  };

  constructor({
    device,
    onConnect,
    onDisconnect,
  }: DeviceProps) {
    super();
    
    this.device = device
    this.onConnect = onConnect
    this.onDisconnect = onDisconnect

    // Check if the device is a mock
    const deviceClass = device.cls
    const isMock = deviceClass.constructor.name === 'Object'
    if (isMock) this.setAttribute('mock', '')
  }

    connect = () => this.show('connection')
    disconnect = () => this.show('disconnection')

  show = (key: string) => {
    const root = this.shadowRoot!
    const connectButton = root.querySelector('#connect')!
    const disconnectButton = root.getElementById('disconnect')!
    const connectedInfo = root.getElementById('connected')!
    const optionsContainer = root.getElementById('options')!

    const showOn = {
        connection: [ disconnectButton, connectedInfo ],
        disconnection: [ connectButton, optionsContainer ]
      }
    
    Object.entries(showOn).forEach(([k, value]) => {
        if (k === key) value.forEach(el => el.removeAttribute('hidden'))
        else value.forEach(el => el.setAttribute('hidden', ''))
    })
  }

  updated() {
    this.show('disconnection')
  }

  render() {
    const { cls, name } = this.device

    const schema = cls.schema

    this.form = new JSONSchemaForm({ schema })

    return html`
        <header>
            <div>
                <h3>${name}</h3>
            </div>
            <div id="controls">
                <button id="connect" @click=${() => this.onConnect.call(this, { device: this.device, options: this.form.data })}>Connect</button>
                <button id="disconnect" @click=${() => this.onDisconnect.call(this, this.device)}>Disconnect</button>
            </div>
        </header>
        <div id="main">
          <div id="connected">
            <div id="battery">
              <label>Battery</label>
              <div><div class="level"></div></div>
            </div>
            <div id="temperature">
              <label>Temperature</label>
              <span></span>
            </div>
            <div id="hardware">
              <label>Hardware</label>
              <span></span>
            </div>
            <div id="firmware">
              <label>Firmware</label>
              <span></span>
            </div>
          </div>
          <div id="options">
            ${this.form}
          </div>
        </div>
    `;
  }

}

customElements.define('device-element', DeviceElement)