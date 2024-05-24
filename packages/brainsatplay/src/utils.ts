import { InputReading, Reading } from "./types"

export const getTimestamp = () => performance.now()

export const formatReading = (reading: InputReading): Reading => {

    return {
        ...reading,
        timestamp: { 
            local: getTimestamp(),
            device: reading.timestamp
        }
    }

}