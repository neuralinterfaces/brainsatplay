import { LitElement, css, html, unsafeCSS } from 'lit';
import uPlot from 'uplot';
import uplotCSS from 'uplot/dist/uPlot.min.css?inline'

type GraphsParameters = {
    height?: number
    width?: number
}

export class Graphs extends LitElement {

    static get styles() {
        return css`
            #container {
                width: 100%;
                height: 100%;
            }

            ${unsafeCSS(uplotCSS)}
        `
    }

    // Internal
    plots: {[x:string]: uPlot} = {}

    // Parameters
    height: number
    width?: number

    options = {
        series: [
          {},
          {
            // initial toggled state (optional)
            show: true,
      
            spanGaps: false,
      
            // in-legend display
            label: "Reading",
            // value: (self, rawValue) => "$" + rawValue.toFixed(2),
      
            // series style
            stroke: "red",
            width: 1,
            // fill: "rgba(255, 0, 0, 0.3)",
            // dash: [10, 5],
          }
        ],
      };

    constructor({
        width,
        height = 400,
    }: GraphsParameters) {

        super()

        this.height = height
        this.width = width

        document.body.onresize =  this.resizeAll

    }

    resize = (plot: uPlot) => {
        const width = this.width ?? this.offsetWidth
        plot.setSize({ width, height: this.height })
    }

    resizeAll = () => Object.values(this.plots).forEach(this.resize)

    create = (label: string) => {

        const opts = {
            ...this.options,
            id: label,
            title: label
        }

        const container = this.shadowRoot!.getElementById('container')!
        const plot = new uPlot(opts, undefined, container);
        this.plots[label] = plot

        this.resize(plot)

        return plot
    }

    updateData = (label: string, data: any) => {
        const plot = this.plots[label] ?? this.create(label)
        plot.setData(data);
    }

    delete = (label: string) => {
        this.plots[label].destroy()
        delete this.plots[label]
    }

    deleteAll = () => Object.keys(this.plots).forEach(this.delete)

    render() {
        return html`
            <div id="container"></div>
        `
    }
}

customElements.define('graphs-component', Graphs)