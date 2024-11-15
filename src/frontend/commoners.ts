
// import { DESKTOP, SERVICES, READY } from 'commoners:env'
const { DESKTOP, SERVICES, READY } = commoners

const log = (data: any) => {
    if (data.error) return console.error(data.error)
    console.warn(`${data.source ? `${data.source} (${data.command})` : data.command} - ${JSON.stringify(data.payload)}`)
}


const service = SERVICES.flask
console.log('Service', service)

// Ping for activity
const ping = async (url) => {
    await fetch(new URL('connected', url))
        .then(res => res.json())
        .then(payload => log({ source: 'Python', command: 'ping', payload }))
}

const pingUntilAvailable = async (url) => {
    const id = setInterval(async () => {
        await ping(url)
        clearInterval(id)
    }, 500)
}

// Check if the Python service is available
if (service) {

    const pythonUrl = new URL(service.url) // Equivalent to commoners://flask

    if (DESKTOP) {

        // Ping until available
        ping(pythonUrl).catch(() => pingUntilAvailable(pythonUrl))

        service.onClosed(() => {
            console.error('Python server was closed!')
        })
    }

    else ping(pythonUrl).catch(() => pingUntilAvailable(pythonUrl))

}

// Disable devices if bluetooth plugin is not available
READY.then(plugins => {
    if (!('bluetooth' in plugins)) {
        const deviceElements = document.querySelectorAll('.device')
        deviceElements.forEach(device => device.setAttribute('disabled', ''))
    }
})
