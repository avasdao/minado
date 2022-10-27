console.log('Welcome to Nexa Rocks! Widget')

const init = async (_configFile) => {
    let config
    let response
    let version

    console.info('Starting widget initialization...')

    response = await fetch(_configFile)
    // console.log('RESPONSE', response)

    config = await response.json()
    console.log('CONFIG', config)

    version = config.version
    console.log('VERSION', version)
    // console.log('Current version ->', version)

}

window.onload = () => {
    let configFile
    let widget

    widget = document.querySelector('#nexa-rocks-widget')
    console.log('WIDGET', widget)

    if (!widget) {
        throw new Error('Oops! Could not locate widget.')
    }

    if (widget.dataset && widget.dataset.config) {
        configFile = widget.dataset.config
        console.log('CONFIG FILE', configFile)

        init(configFile)
    }
}
