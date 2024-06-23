import {
    MuseClient,
    MuseClientOptions,
    TelemetryData,
    EEGReading,
    PPGReading,
    AccelerometerData,
    EEG_FREQUENCY,
    PPG_FREQUENCY,
    ACCELEROMETER_FREQUENCY,
    EEG_SAMPLES_PER_READING,
    PPG_SAMPLES_PER_READING,
    ACCELEROMETER_SAMPLES_PER_READING
} from 'muse-capacitor'

export * from 'muse-capacitor'

import { Device, DeviceMetadata } from 'brainsatplay'

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


    metadata: DeviceMetadata = {
        modalities: {
            eeg: {
                frequency: EEG_FREQUENCY,
                samples: EEG_SAMPLES_PER_READING,
            },
            ppg: {
                frequency: PPG_FREQUENCY,
                samples: PPG_SAMPLES_PER_READING,
            },
            acceleration: {
                frequency: ACCELEROMETER_FREQUENCY,
                samples: ACCELEROMETER_SAMPLES_PER_READING,
            }
        }
    }

    constructor() {
        super()
    }

    info = async () => {

        const metadata = structuredClone(this.metadata)

        if (!this.client) return Promise.resolve({ versions: {}, ...metadata })

       const info = await this.client.deviceInfo()
        metadata.versions ={
            hardware: info.hw,
            firmware: info.fw
        }

        return metadata

    }

    connect = async ( 
        options: MuseClientOptions 
    ) => {

        this.client = new MuseClient(options);

        await this.client.connect();
    
        await this.client.start();

        this.client.eegReadings.subscribe(({
            electrode,
            ...reading
        }: EEGReading) => {
    
            this.notify('eeg', this.format({
                ...reading,
                channel: indexToChannel(electrode)
            }))
    
        });
    
        this.client.telemetryData.subscribe(({
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
    
        this.client.accelerometerData.subscribe((acceleration: AccelerometerData) => {
    
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
    
        if (this.client.ppgReadings) {
    
            this.client.ppgReadings.subscribe(({
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