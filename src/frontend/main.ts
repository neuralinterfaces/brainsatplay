import './commoners' // Trigger commoners checks

import { Reading } from '../../packages/brainsatplay/src';

import { Graphs } from './components/Graphs';

import { perc2color } from './utils';
import * as registry from './manifest';
// import { Device } from './types';

import './tasks/Oddball'
import { Tabs } from './components/Tabs';
import { DeviceManager } from './components/DeviceManager';
import { OddballTask } from './components/tasks/OddballTask';
import './performance'

type Timestamp = {
  device?: number,
  local: number
}

type Data = {
  timestamp: Timestamp,
  samples: number[]
}[]

type DeviceContext = {
  battery: HTMLDivElement,
  temperature: HTMLDivElement,
  hardware: HTMLDivElement,
  firmware: HTMLDivElement,
  plot: {
    samples: {
      [key: string]: number
    }
  }
}

// Load previous devices
const registeredDevices = JSON.parse(globalThis.localStorage.getItem('devices') || '{}')

console.warn('Registered devices', registeredDevices)

const previousDevice = null
// const previousDevice = {
//   deviceId: "/F7ZGWIyP5+KPJCTnJiJfg==", // NOTE: This is only relevant on web and mobile
//   name: "Muse-7F37" // NOTE: This is only relevant on desktop
// }


const recording: any = {}

const getTimestamp = (timestamp: Timestamp) => timestamp.device == null ? timestamp.local : timestamp.device

const formatData = (data: Data) => {
  return [
    data.map(o => getTimestamp(o.timestamp)).map((n: any) => n / 1000), // Timestamps (seconds)
    data.map(o => o.samples[o.samples.length - 1]) // Samples
  ]
}

function recordData(name: string, reading: Reading) {
  const { channel } = reading
  if (!recording[name]) recording[name] = {}
  const data = recording[name][channel] ?? ( recording[name][channel] = [] )
  data.push(reading)
}

function plotData(
  this: DeviceContext,
  name: string,
  reading: Reading
) {

  const { channel, samples } = reading
  
  const data = recording[name][channel]

  if (name === 'telemetry') {

    const value = samples.slice(-1)[0]

    // Update Battery Indicator
    if (channel === 'batteryLevel') return Object.assign(this.battery.querySelector('.level')!.style, {
      width: `${value}%`,
      background: perc2color(value)
    })

    // Update Temperature
    else if (channel === 'temperature') return this.temperature.querySelector('span')!.innerHTML = `${value}°C`

  }

  else if (name === 'eeg') return graphs.updateData(`EEG (${channel})`, formatData(data.slice(-this.plot.samples['eeg'])))

  else if (name === 'acceleration') return graphs.updateData(`Acceleration ${channel}`, formatData(data.slice(-this.plot.samples['acceleration'])))

  else if (name === 'ppg')  return graphs.updateData(`PPG (${channel})`, formatData(data.slice(-this.plot.samples['ppg'])))

  console.log('Uncaptured data', name, reading)
  
}

// // ---------------------- Worker threads ----------------------

// import AcquireWorker from '../services/workers/acquisition.worker?worker'
// import AnalyzeWorker from '../services/workers/analysis.worker?worker'

// // Share Worker Stuff
// const acquire = new AcquireWorker();
// const analyze = new AnalyzeWorker();
// const channel = new MessageChannel();
// acquire.postMessage({port: channel.port1}, [channel.port1]);
// analyze.postMessage({port: channel.port2}, [channel.port2]);

// analyze.onmessage = (e) => {
//   console.warn(`Worker Analysis Output - ${e.data}`, 'analysis-output')
// }


// Initialize the UI
const main = document.querySelector('main')!


const oddballTask = new OddballTask()

const states = {}


if (commoners.target === 'desktop') {
  commoners.ready.then(() => {
    const { bluetooth } = commoners.plugins
    bluetooth.onSelect((device) => {
      if (device) console.warn('Selected MAC Address', device)
      else console.warn('Device selection cancelled.')
    })
  })
}

const onConnect = async function ({ device, options }) {

  const deviceClass = device.cls

  const deviceInstance = states.device = new deviceClass()

  // Immediately start recording data when available
  const toSubscribe = [ 'eeg', 'telemetry', 'acceleration', 'ppg' ]
  toSubscribe.forEach((name) => deviceInstance.subscribe(name, (data) => recordData(name, data)))

  if (commoners.target === 'desktop') commoners.plugins.bluetooth.match(previousDevice, 5000) // Set device to match on desktop

  // options.device = previousDevice

  await deviceInstance.connect(options)

  const deviceInfo = deviceInstance.client.device

  // Save previous devices in local storage based on name
  if (!(deviceInfo.name in registeredDevices)) {
    registeredDevices[deviceInfo.name] = {
      ...deviceInfo,
    }
    
    globalThis.localStorage.setItem('devices', JSON.stringify(registeredDevices))

    console.warn('Updated devices', registeredDevices)
  }

  this.connect() // Render connected state

  

  // Get metadata and use this to properly plot data
  const metadata = await deviceInstance.info()
  const secondsToPlot = 4

  const root = this.shadowRoot!
  const battery = root.getElementById('battery') as HTMLDivElement
  const temperature = root.getElementById('temperature') as HTMLDivElement
  const hardware = root.getElementById('hardware') as HTMLDivElement
  const firmware = root.getElementById('firmware') as HTMLDivElement

  const ctx: DeviceContext = {
      battery,
      temperature,
      hardware,
      firmware,
      plot: {
        samples: {}
      }
  } 

  Object.entries(metadata.modalities).forEach(([ name, modality ]) => { 
    ctx.plot.samples[name] = Math.round((modality.frequency / modality.samples) * secondsToPlot)
  })

  toSubscribe.forEach((name) => deviceInstance.subscribe(name, (data) => plotData.call(ctx, name, data)))

  hardware.querySelector('span')!.innerHTML = metadata.versions.hardware
  firmware.querySelector('span')!.innerHTML = metadata.versions.firmware
}

const onDisconnect = async function () {
  if (!states.device) return
  await states.device.disconnect()
  delete states.device
  graphs.deleteAll()
  this.disconnect()
}

const deviceTabContent = new DeviceManager({
  devices: registry.devices,
  onConnect,
  onDisconnect
})

const graphs = new Graphs({
  height: 400,
})



const tabs = new Tabs({
  tabs: {
    devices: {
      label: 'Devices',
      content: deviceTabContent
    },
    data: {
      label: 'Data',
      content: graphs,
      onActive: () => graphs.resizeAll()
    },
    task: {
      label: 'Task',
      content: oddballTask,
      onInactive: () => oddballTask.reset()
    }
  }
})

main.append(tabs)
