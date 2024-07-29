
// import { DESKTOP, SERVICES, READY } from 'commoners:env'
const { DESKTOP, SERVICES, READY } = commoners

const log = (data: any) => {
    if (data.error) return console.error(data.error)
    console.warn(`${data.source ? `${data.source} (${data.command})` : data.command} - ${JSON.stringify(data.payload)}`)
}


const service = SERVICES.flask

// Check if the Python service is available
if (service) {

    const pythonUrl = new URL(service.url) // Equivalent to commoners://flask

    const runCommands = async () => {
        fetch(new URL('connected', pythonUrl))
            .then(res => res.json())
            .then(payload => log({ source: 'Python', command: 'connected', payload }))
            .catch(e => console.error('Failed to request from Python server', e))
    }

    if (DESKTOP) {
        service.onActive(runCommands)

        service.onClosed(() => {
            console.error('Python server was closed!')
        })
    }

    else runCommands()

}

// Disable devices if bluetooth plugin is not available
READY.then(plugins => {
    if (!('bluetooth' in plugins)) {
        const deviceElements = document.querySelectorAll('.device')
        deviceElements.forEach(device => device.setAttribute('disabled', ''))
    }
})
