import { DeviceInfo } from "./types"
import { formatReading } from "./utils"

type Options = Record<string, any>

type Subscribers = Record<symbol, any>

interface Client {
    connect: (options: Options) => Promise<void>
    disconnect: () => void
}

export class Device {

    static schema: any = {}

    client?: any

    #subscribers: Record<string, Subscribers> = {}

    constructor() {

    }

    format = formatReading

    subscribe = (name: string, callback: any) => {
        const subscriptions = this.#subscribers[name] ?? ( this.#subscribers[name] = {} )
        const id = Symbol('subscription')
        subscriptions[id] = callback
    }

    notify = (name: string, reading: any) => {
        if (!this.#subscribers[name]) return
        for (const id in this.#subscribers[name]) this.#subscribers[name][id](reading)
    }

    info = async (): Promise<DeviceInfo> => {
        return {
            versions: {}
        }
    }

    connect = async (options: Options) => {}

    disconnect = () => {
        if (!this.client) return
        this.client.disconnect()
    }


}