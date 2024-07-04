import { defineConfig } from '@commoners/solidarity'
import * as bluetoothPlugin from '@commoners/bluetooth'

// const defineConfig = (o) => o 

const flaskService = {
    name: 'flask',
    src: './src/services/python/main.py',
    distpath: './build/python'
}

export default defineConfig({

    name: "Brains@Play",
    appId: 'com.neuralinterfaces.brainsatplay',
    
    electron: {
        window: {
            width: 1000 // Adjust default width
        }
    },

    plugins: {
        bluetooth: bluetoothPlugin,
    },

    services: {

        // Packaged with pyinstaller
        [flaskService.name]: {
            description: 'A simple Flask server',
            src: flaskService.src,
            publish: {
                build: `python -m PyInstaller --name ${flaskService.name} --onedir --clean ${flaskService.src} --distpath ${flaskService.distpath}`,
                local: {
                    src: flaskService.name,
                    base: `${flaskService.distpath}/${flaskService.name}`,
                }
            }
        }
    }
})