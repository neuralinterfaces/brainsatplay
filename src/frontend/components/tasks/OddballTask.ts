import { LitElement, css, html } from "lit";
import { OddballManager } from "../../tasks/Oddball";

export class OddballTask extends LitElement {

    static get styles() {
        return css`
        
            canvas {
                width: 100%;
                max-width: 500px;
                aspect-ratio: 1 / 1;
                border: 1px solid #e8e8e8;
            }
  
        `
    }

    manager: OddballManager

    constructor() {
        super()

        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 1000

        this.manager = new OddballManager({ canvas })
    }

    start = async () => {
        const root = this.shadowRoot! as ShadowRoot
        const startContainer = root.querySelector('#start')! as HTMLDivElement
        const main = root.querySelector('main')! as HTMLDivElement
        startContainer.hidden = true
        main.hidden = false

        await this.manager.start()

        this.reset()
    }

    reset = () => {

        const root = this.shadowRoot! as ShadowRoot
        const startContainer = root.querySelector('#start')! as HTMLDivElement
        const main = root.querySelector('main')! as HTMLDivElement

        startContainer.hidden = false
        main.hidden = true

        this.manager.reset()
    }

    render() {
        return html`
            <div id="start">
                <button @click=${this.start}>Start</button>
            </div>
            <main hidden>
                ${this.manager.canvas}
            </main>
        `
    }
    
}

customElements.define('oddball-task-component', OddballTask);