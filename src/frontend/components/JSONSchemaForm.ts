import { LitElement, css } from "lit"

type Schema = {
    properties: Record<string, any>
}

type Data = Record<string, any>

type JSONSchemaFormProps = {
    schema: Schema,
    data: Data
}

const getInputType = (type) => {
    if (type === 'boolean') return 'checkbox'
    if (type === 'number') return 'number'
    return 'text'
}

export class JSONSchemaForm extends LitElement {

    static get styles() {
        
        return css`
            label {
            font-weight: bold;
            font-size: 80%;
            margin-right: 5px;
          }
        `

    }

    schema: JSONSchemaFormProps['schema']
    data: JSONSchemaFormProps['data']

    constructor({
        schema,
        data = {},
    }: JSONSchemaFormProps) {
        super()
        this.schema = schema
        this.data = data
    }   

    render() {

        if (!this.schema) return null

        const form = document.createElement('form')
        const properties = this.schema.properties
        
        for (const key in properties) {
            const container = document.createElement('div')
            const property = properties[key]
            const input = document.createElement('input')
            input.name = key

            const inputType = getInputType(property.type)
            input.type = inputType

            if (property.default) {
                if (inputType === 'checkbox') input.checked = property.default
                else input.value = property.default
            }

            input.onchange = (e) => {
                if (inputType === 'checkbox') this.data[key] = e.target.checked
                else if (inputType === 'number') this.data[key] = Number(e.target.value)
                else this.data[key] = e.target.value
                console.log(this.data)
            }

            const label = document.createElement('label')
            label.innerHTML = property.title || key
            label.setAttribute('for', key)
            container.append(label, input)

            form.append(container)
        }

        return form
    }


}

customElements.define('jsonschema-form', JSONSchemaForm)