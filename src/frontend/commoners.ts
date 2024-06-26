
const log = (data: any) => {
    if (data.error) return console.error(data.error)
    console.warn(`${data.source ? `${data.source} (${data.command})` : data.command} - ${JSON.stringify(data.payload)}`)
}


const service = commoners.services.python

// Check if the Python service is available
if (service) {

    const pythonUrl = new URL(service.url) // Equivalent to commoners://python

    const runCommands = async () => {
        fetch(new URL('connected', pythonUrl))
            .then(res => res.json())
            .then(payload => log({ source: 'Python', command: 'connected', payload }))
            .catch(e => console.error('Failed to request from Python server', e))
    }

    if (commoners.target === 'desktop') {
        service.onActivityDetected(runCommands)

        service.onClosed(() => {
            console.error('Python server was closed!')
        })
    }

    else runCommands()

}

// Disable devices if bluetooth plugin is not available
commoners.ready.then(plugins => {
    if (!('bluetooth' in plugins)) {
        const deviceElements = document.querySelectorAll('.device')
        deviceElements.forEach(device => device.setAttribute('disabled', ''))
    }
})
