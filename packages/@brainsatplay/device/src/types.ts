
type BaseReading = {
    index: number,
    channel: string | number,
    samples: number[]
}

export type InputReading = BaseReading & { timestamp?: number }

export type Reading = BaseReading & {
    timestamp: { device?: number, local: number }
}

type ModalityInfo = {
    frequency: number,
    samples: number
}

export type DeviceMetadata = {
    
    modalities: {
        eeg?: ModalityInfo,
        ppg?: ModalityInfo,
        acceleration?: ModalityInfo,
    },

    versions?: {
        hardware?: string,
        firmware?: string
    }
}