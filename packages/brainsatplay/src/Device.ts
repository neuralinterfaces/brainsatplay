import { DeviceMetadata } from "./types"
import { formatReading } from "./utils"

type Options = Record<string, any>

type Subscribers = Record<symbol, any>

export class Device {

    // Schema for UI generation
    static schema: any = {}

    // Connection client
    client?: any

    // Device metadata, tracked before or after connection
    metadata: any = {}

    // Subscriptions
    #subscribers: Record<string, Subscribers> = {}

    format = formatReading

    subscribe = (name: string, callback: any) => {
        const subscriptions = this.#subscribers[name] ?? ( this.#subscribers[name] = {} )
        const id = Symbol('subscription')
        subscriptions[id] = callback
    }

    notify = (name: string, reading: any) => {
        if (!this.#subscribers[name]) return
        Object.getOwnPropertySymbols(this.#subscribers[name]).forEach((id) => this.#subscribers[name][id](reading))
    }

    info = async (): Promise<DeviceMetadata> => this.metadata

    connect = async (options: Options) => {}

    disconnect = () => {
        if (!this.client) return
        this.client.disconnect()
    }


}