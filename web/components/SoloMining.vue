<template>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Solo Mining</h1>

        <section class="p-5 flex flex-col col-span-2 space-y-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
            <h1 class="text-4xl font-bold text-yellow-900">
                Solo Mining
            </h1>

            <h2 class="pt-5 text-3xl">
                Introduction
            </h2>

            <p class="text-yellow-900">
                Purpose of this tutorial is to setup a computer system to mine the NEX tokens minted approximately every 2 minutes from <a class="text-blue-500 font-bold hover:underline" href="https://nexa.org" target="_blank">Nexa</a>, a Peer-to-Peer Digital Value System.
                We will not be installing any software to your system, instead we will running a standalone, portable version of the Nexa wallet and mining software.
            </p>

            <p class="text-lg font-bold italic">
                When we're done, we want your Nexa wallet to look similar to the image below 👇
            </p>

            <img class="border-4 border-yellow-500 rounded-lg" src="~/assets/qt-mining-wallet.png" alt="Nexa (QT) Mining Wallet" />

            <h3 class="pt-5 text-2xl">
                Prerequisites
            </h3>

            <ol class="pl-5 list-disc list-inside">
                <li>
                    A dedicated computer system <em>(eg. desktop pc, laptop pc, vps)</em>.
                    <span class="block pl-5 text-sm text-yellow-600">
                        This computer system should be running 24x7x365.
                    </span>
                </li>

                <li>
                    Basic knowledge of Window or MacOS.
                    <span class="block pl-5 text-sm text-yellow-600">
                        We will be using the File Manager and Terminals for your respective platform.
                    </span>
                </li>

                <li>
                    You should have some knowledge of how to use a Terminal shell.
                    <span class="block pl-5 text-sm text-yellow-600">
                        We will need to issue specific commands that cannot be done from the GUI.
                    </span>
                </li>
            </ol>

            <h3 class="pt-5 text-2xl">
                Requirements
            </h3>

            <ol class="pl-5 list-disc list-inside">
                <li>
                    Windows 10 (or above) -OR- MacOS ? (or above) must be installed.
                </li>

                <li>
                    Internet connection is required.
                </li>
            </ol>

            <h4 class="text-xl text-yellow-800 font-medium text-center italic">
                Use of a VPN is highly recommended to protect your privacy
            </h4>

            <h2 class="pt-10 text-3xl">
                STEP 1: Download
            </h2>

            <p>
                Begin by visiting the <a class="text-blue-500 font-bold hover:underline" href="https://www.nexa.org/download" target="_blank">Download page</a> for Nexa.
            </p>

            <h5 class="font-medium">
                You have the option to choose 1 of 4 system types:
            </h5>

            <ol class="pl-5 list-disc list-inside">
                <li>Windows</li>
                <li>MacOS</li>
                <li>Linux</li>
                <li>ARM</li>
            </ol>

            <h4 class="text-xl">
                For Windows users
            </h4>

            <ol class="pl-5 list-disc list-inside">
                <li>Find the Windows link labeled <strong>"ZIP"</strong></li>
                <li>Right click and choose a location to save.</li>
                <li>
                    Right click Windows (ZIP) -> <strong>"Save link as.."</strong>
                    <span class="block text-sm pl-5 text-yellow-800 italic">
                        (DO NOT DISCARD -- Click on <strong>"Keep"</strong> file)
                    </span>
                </li>
            </ol>

            <nav class="flex justify-between px-10 pt-10 pb-3 border-b-2 border-pink-500">
                <button class="py-1 px-3 bg-yellow-200 border-2 border-yellow-400 rounded-lg">
                    Windows
                </button>

                <button>
                    Windows (Secure)
                </button>

                <button>
                    MacOS &amp; Linux
                </button>

                <button>
                    MacOS &amp; Linux (Secure)
                </button>
            </nav>

            <h2 class="pt-10 text-3xl">
                STEP 2: Unpack your archive
            </h2>

            <p>
                It's completely up to you to choose a location.
            </p>

            <h4>
                There are essential only 3 options to consider:
            </h4>

            <ol class="pl-5 list-disc list-inside">
                <li><strong>C:\Users\&lt;username>\AppData\Roaming\nexa-data</strong> <em>(default)</em></li>
                <li><strong>C:\Users\&lt;username>\Desktop</strong> <em>(easy to locate)</em></li>
                <li><strong>D:\</strong> <em>(external/portable flash drive)</em> <span class="text-sm font-medium text-red-500">&lt;-- this is recommended</span></li>
            </ol>

            <p>
                Open File Explorer
            </p>

            <p>
                Right click on <code class="font-bold text-red-500">`nexa-{{version}}-win64`</code> -> click <strong>"Extract All"</strong>
            </p>

            <h2 class="pt-10 text-3xl">
                STEP 3: Configure your wallet/server
            </h2>

            <p>
                Start by changing the data path. Select "custom path".
            </p>

            <p>
                <code class="text-red-500 font-bold">C:\Users\&lt;username>\AppData\Roaming\nexa-data</code> <em>(old path)</em>
            </p>

            <p>
                <code class="text-red-500 font-bold">C:\Users\&lt;username>\nexa-data</code> <em>(new path)</em>
            </p>

            <p>
                Then we need to add the <code class="text-red-500 font-bold">nexa.conf</code> to <code class="text-red-500 font-bold">\nexa</code> using the Command prompt.
            </p>

            <p>
                Click the Windows icon and type <code class="text-red-500 font-bold">cmd</code>.
            </p>

            <p>
                You should see <strong>"Command Prompt"</strong>. Click it <em>(or press enter)</em> to open.
            </p>

            <p>
                At the command prompt, type <code class="text-red-500 font-bold">`notepad &lt;data-directory-path>/nexa.conf`</code>.
            </p>

            <p>
                You will see a prompt. <strong>"Do you want to create a new file?"</strong>.
                Click <strong>"yes"</strong>.
            </p>

            <p>
                Enter <em>(at least)</em> the first 3 lines:
            </p>

<pre class="lg:hidden p-3 bg-yellow-200 rounded-lg border-4 border-yellow-500"><code class="text-lg">server=1
rpcuser=user
rpcpassword=password
txindex=1 # (optional)
</code></pre>
<pre class="hidden lg:flex p-3 bg-yellow-200 rounded-lg border-4 border-yellow-500"><code class="text-lg">server=1
rpcuser=user
rpcpassword=password
txindex=1 # (optional) for more advanced use-cases
</code></pre>

            <p>
                Then save and close the file.
            </p>

            <h2 class="pt-10 text-3xl">
                STEP 4: Launch your wallet/server
            </h2>

            <p>
                Double-click <code class="text-red-500 font-bold">`nexa-qt`</code>
                <span class="block text-sm pl-5">
                        (Run Anyway)
                    </span>
            </p>

            <h2 class="pt-10 text-3xl">
                STEP 5: Launch your miner
            </h2>

            <p>
                Now it's time to start your mining software.
                The filename of this software is `nexa-miner`.
            </p>

            <h4 class="text-xl">
                For Windows
            </h4>

            <p>
                `C:/Users/&lt;username>/nexa-1.0.1.0/bin/nexa-miner -datadir=C:\Users\&lt;username>\nexa-data`
            </p>

            <h4 class="text-xl">
                For MacOS
            </h4>

            <p>
                `/Users/&lt;username>/nexa-1.0.1.0/bin/nexa-miner -datadir=/Users/&lt;username>/nexa-data`
            </p>

            <h4 class="text-lg font-bold">
                THIS SETUP WILL ONLY LAUNCH ONE MINER
            </h4>

In order to maximize your PCs performance, we need to launch multiple miners. To do so, you need to set a flag at the end of the lauch command with __` -cpus=#`__ _(note the space at the beginning)_, to specify the number of CPUs _(aka miners)_ you wish to launch.

> To determine the number of CPUs your system is running, you have to launch the __Performance Monitor__

#### For Windows

Press __`ctrl + shift + esc`__ all at the same time to launch the monitor.

If this is your first time opening the Performance Monitor, you need to click on __"More details"__ to open the full window.

Next, click on the __"Performance"__ tab.

You will see __"Cores"__ and __"Logical processors"__.

I recommend that you don't set your CPU any higher than __`1.5x`__ the number of __"Logical processors"__. This is to allow your CPU some "breathing room" which will maximize its efficiency.

### Conclusion

After you start your miner, it could take several hours before you find your first block. Give it at least 24 hours of continuous mining before attempting to stop and restart the miner.

            <p>
                When we're done, we want your Nexa mining setup to look similar to the image below.__ 👇
            </p>

            <img class="border-4 border-yellow-500 rounded-lg" src="~/assets/found-a-block.png" alt="Found a Nexa mining block worth 10M NEX" />

            <h2 class="pt-10 text-3xl">
                Additional tips & resources
            </h2>

            <p>
                Here a few tips & warnings to help you succeed!
            </p>

            <h4>
                Disable "power-saving" mode
            </h4>

            <p>
                Most computers will enter a suspended <strong>"power-saving"</strong> mode after about 15-30 minutes. If this occurs, it will pause the blockchain and prevent ALL mining for running.
            </p>

            <h4 class="text-xl font-bold">
                SO DON'T FORGET TO DISABLE THIS OPTION!!
            </h4>

            <h4 class="text-xl">
                For Windows:
            </h4>

            <p>
                <strong>"When plugged in"</strong> power should be set to <strong>"never"</strong>.
            </p>

            <h4 class="text-xl">
                For MacOS:
            </h4>

            <p>
                <em>TBD</em>
            </p>
        </section>
    </main>
</template>

<script>
export default {
    data: () => ({
        version: null
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        /* Set current version. */
        this.version = '1.0.2.0'
    },
    mounted: function () {
        //
    }
}
</script>
