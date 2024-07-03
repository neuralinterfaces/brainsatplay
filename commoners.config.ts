// import { defineConfig } from '@commoners/solidarity'
import * as bluetoothPlugin from '@commoners/bluetooth'

const defineConfig = (o) => o 

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
        python: {
            description: 'A simple Python server',
            src: './src/services/python/main.py',
            publish: {
                build: 'python -m PyInstaller --name flask --onedir --clean ./src/services/python/main.py --distpath ./build/python',
                local: {
                    src: 'flask',
                    base: './build/python/flask', // Will be copied
                }
            }
        }
    }
})