import {
    MuseClient,
    MuseClientOptions,
    TelemetryData,
    EEGReading,
    PPGReading,
    AccelerometerData
} from 'muse-capacitor'

export * from 'muse-capacitor'

import { Device } from 'brainsatplay'

// Transformation from generic to 10-20 system
const indexToChannel = (index: number) => {
    switch (index) {
        case 0: return 'TP9'
        case 1: return 'AF7'
        case 2: return 'AF8'
        case 3: return 'TP10'
        case 4: return 'AUX'
        default: return 'Unknown'
    }
}

export class MuseDevice extends Device {

    client?: MuseClient

    static schema = {
        properties: {
            aux: {
                title: "Auxiliary Channel",
                type: 'boolean',
                default: false,
            },
            ppg: {
                title: "PPG Data",
                type: 'boolean',
                default: false,
            },
        }
    }

    constructor() {
        super()
    }

    info = async () => {

        if (!this.client) return Promise.resolve({ versions: {} })

        return this.client.deviceInfo().then((info) => {
            console.warn('info', info)
            return {
                versions: {
                    hardware: info.hw,
                    firmware: info.fw
                }
            }
        })

    }

    connect = async ( options: MuseClientOptions ) => {

        const client = new MuseClient(options);

        await client.connect();
    
        await client.start();
    
        client.eegReadings.subscribe(({
            electrode,
            ...reading
        }: EEGReading) => {
    
            this.notify('eeg', this.format({
                ...reading,
                channel: indexToChannel(electrode)
            }))
    
        });
    
        client.telemetryData.subscribe(({
            sequenceId,
            ...telemetry
        }: TelemetryData) => {
    
    
            for (let key in telemetry) {
    
                const reading = this.format({
                    index: sequenceId,
                    channel: key,
                    samples: [ telemetry[key] ]
                })
    
                this.notify('telemetry', reading)
            }
        });
    
        client.accelerometerData.subscribe((acceleration: AccelerometerData) => {
    
            const { samples, sequenceId } = acceleration
    
            const axes = Object.keys(samples[0])
    
            axes.forEach((axis) => {
                const reading = this.format({
                    index: sequenceId,
                    channel: axis,
                    samples: samples.map((sample: any) => sample[axis])
                })
    
                this.notify('acceleration', reading)
            })
        });
    
        if (client.ppgReadings) {
    
            client.ppgReadings.subscribe(({
                ppgChannel,
                ...reading
            }: PPGReading) => {
    
                this.notify('ppg', this.format({
                    ...reading,
                    channel: ppgChannel
                }))
            })    
        }
    }
}