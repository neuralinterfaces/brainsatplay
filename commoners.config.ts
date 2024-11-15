// import { defineConfig } from '@commoners/solidarity'
import { python } from '@commoners/solidarity/services'
import * as bluetoothPlugin from '@commoners/bluetooth'

const defineConfig = (o) => o 

const flaskService = {
    name: "flask",
    src: './src/services/python/main.py',
  };

export default defineConfig({

    name: "Brains@Play",
    appId: 'com.neuralinterfaces.brainsatplay',
    
    electron: { window: { width: 1000 } },

    plugins: {
        bluetooth: bluetoothPlugin,
    },

    services: python.services([ flaskService ])
})