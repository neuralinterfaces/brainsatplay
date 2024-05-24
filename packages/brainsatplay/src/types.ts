
type BaseReading = {
    index: number,
    channel: string | number,
    samples: number[]
}

export type InputReading = BaseReading & { timestamp?: number }

export type Reading = BaseReading & {
    timestamp: { device?: number, local: number }
}


export type DeviceInfo = {
    versions: Record<string, string>
}