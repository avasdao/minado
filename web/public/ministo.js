/*******************************************************************************
 * Ministo JavaScript Engine
 * v24.6.22
 *
 * A pure JavaScript token mining engine.
 *
 *
 * OFFICIAL SOURCES
 * ------------------------------
 * ↳ https://github.com/avasdao/ministo/???
 * ↳ TBD
 *
 *
 * OFFICIAL DEPLOYMENTS
 * ------------------------------
 *   ↳ https://minado.io/ministo.js
 *   ↳ https://minado.io/ministo.min.js
 *   ↳ TBD (eg. IPFS, Flux Drive, etc...)
 *
 *
 * INSTALLATION
 * ------------------------------
 * Add the following script tag anywhere between the <body> tag your document:
 *
 * <script
 *   type="module"
 *   src="https://minado.io/ministo.min.js"
 *   integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
 *   crossorigin="anonymous"></script>
 *
 * Then add the following tag where you want the widget to appear:
 *
 * <div
 *   id="ministo"
 *   data-address="enter_your_mining_address_here"
 *   data-assetid="enter_a_list_of_asset_ids_here"></div>
 *
 *
 * CONFIGURATION OPTIONS
 * ------------------------------
 * In addition to the required options specified above, you have the option
 * to easily configure any of the following parameters below, to best match
 * the look & feel of your own application(s):
 *   ↳ Background color (default: light-gray)
 *   ↳ Font type (default: Helvetica)
 *   ↳ Public message
 *   ↳ CPU % utilization (default: 80)
 *   ↳ Difficulty management (default: 16)
 *   ↳ Multi-address distribution
 *   ↳ and much more...
 *
 */
console.log('\n\n  Initializing MinistoJS Engine...\n')

/* Initialize constants. */
const MINADO_STRATUM_ENDPOINT = 'https://stratum.minado.io'

/* Initialize globals. */
let ministo

/**
 * Initialization
 *
 * Performs the initial setup for the mining engine.
 */
const init = async (_configFile) => {
    let config
    let response
    let version

    console.info('\n  Starting WIDGET initialization...\n')

    response = await fetch(_configFile)
    // console.log('RESPONSE', response)

    config = await response.json()
    console.log('CONFIG', config)

    version = config.version
    console.log('VERSION', version)
    // console.log('Current version ->', version)

    // TODO Download WebAssembly binary.

}

/**
 * Window (Web Browser) Ready
 *
 * Handles the initial window loading completion.
 */
window.onload = () => {
    /* Initialize locals. */
    let configFile

    /* Initialize Ministo DOM element. */
    ministo = document.querySelector('#minado')
    console.log('MINISTO', ministo)

    if (!ministo) {
        throw new Error('Oops! Could not locate ministo.')
    }

    if (ministo.dataset && ministo.dataset.config) {
        configFile = ministo.dataset.config
        console.log('CONFIG FILE', configFile)

        init(configFile)
    }
}
