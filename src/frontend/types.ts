import { muse } from 'brainsatplay';

export type MockDevice = {
    schema?: {
        properties: {
            [key: string]: {
                title?: string,
                type: string,
                default?: any
            }
        }
    }
}

export type Device = {
    name: string,
    cls: typeof muse.MuseDevice | MockDevice
}