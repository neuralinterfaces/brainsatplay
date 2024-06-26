
import { LitElement, html, css } from 'lit';
// import { muse, Reading } from 'brainsatplay';
// import Graphs from './components/Graphs';
// import { perc2color } from './utils';
import { Device, DeviceElement, OnConnectCallback, OnDisconnectCallback } from './Device';


type DeviceManagerProps = {
    devices: Device[],
    onConnect: OnConnectCallback
    onDisconnect: OnDisconnectCallback
}

export class DeviceManager extends LitElement {

    static styles = css`
        :host {
            display: flex;
            flex-wrap: wrap;
            padding: 25px;
            gap: 20px;
            overflow: auto;
        }
  `;

    static properties = {
        devices: { type: Array },
    };

    declare devices: any[];

    onConnect: DeviceManagerProps['onConnect'] = () => { };
    onDisconnect: DeviceManagerProps['onDisconnect'] = () => { };

    constructor({
        devices = [],
        onConnect,
        onDisconnect,
    }: DeviceManagerProps) {
        super();
        this.devices = devices;
        if (onConnect) this.onConnect = onConnect;
        if (onDisconnect) this.onDisconnect = onDisconnect;
    }

    render() {
        return html`
        ${this.devices.map(device => {
            const el = new DeviceElement({
                device,
                onConnect: this.onConnect,
                onDisconnect: this.onDisconnect
            });
            el.id = device.name
            return el
        })}
    `;
    }
}

customElements.define('device-manager', DeviceManager);
