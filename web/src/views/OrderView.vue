<template>
    <main class="-mt-24 pb-8 flex flex-col gap-3 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <OrderIncentives />

        <section aria-labelledby="mt-48 quick-links-title">
            <div class="sm:w-3/4 rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0">
                <h2 class="sr-only" id="quick-links-title">System Notice</h2>

                <div class="bg-white p-6">
                    <h2 class="text-2xl text-gray-800 font-medium">
                        System Notice
                    </h2>

                    <span class="text-gray-500">
                        Our team is still working to upgrade all of our system to the newest v1.0.2.0 of Nexa Core.
                        We will send out emails as soon as pending deployments are completed.
                    </span>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-lg">
            <div class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                    Nexa <em class="text-blue-400">Cloud</em> Mining Sites
                </h1>
                
                <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" class="lg:col-span-7">
                        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

                        <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
                            <li class="flex py-6 sm:py-10 cursor-default">
                                <div class="flex-shrink-0">
                                    <img
                                        src="https://i.ibb.co/fkNh9Jg/image.png"
                                        alt="The Vaalserberg"
                                        class="h-18 w-24 rounded-md object-cover object-center sm:h-36 sm:w-48"
                                    />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div class="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0">
                                        <div class="col-span-2">
                                            <div class="flex justify-between">
                                                <h3 class="text-2xl text-gray-700">
                                                    The Vaalserberg
                                                </h3>
                                            </div>
                                            
                                            <div class="mt-1 flex text-sm">
                                                <p class="text-gray-500">
                                                    Limburg, Netherlands
                                                </p>
                                            </div>
                                            
                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ 30-day contract:
                                                <span class="text-indigo-500 font-bold">
                                                    US$5.00
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Avg. hashrate: 
                                                <span class="text-indigo-500 font-bold">
                                                    6K - 7K H/s
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Est. coins earned: 
                                                <span class="text-indigo-500 font-bold">
                                                    300M - 450M NEX
                                                </span>
                                            </p>
                                        </div>

                                        <div class="mt-4 sm:mt-0 sm:pr-9">
                                            <label for="quantity-0" class="sr-only">Quantity, Basic Tee</label>
                                            <select
                                                id="quantity-0"
                                                name="quantity-0"
                                                class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                v-model="numVaalserberg"
                                            >
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>

                                            <div class="hidden absolute top-0 right-0">
                                                <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                    <span class="sr-only">Remove</span>
                                                    <!-- Heroicon name: mini/x-mark -->
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                                        <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>

                                        <span>In stock</span>
                                    </p>
                                </div>
                            </li>

                            <li class="flex py-6 sm:py-10 cursor-default">
                                <div class="flex-shrink-0">
                                    <img
                                        src="https://i.ibb.co/9GZrXnK/image.png"
                                        alt="The Vaalserberg"
                                        class="h-18 w-24 rounded-md object-cover object-center sm:h-36 sm:w-48"
                                    />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div class="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0">
                                        <div class="col-span-2">
                                            <div class="flex justify-between">
                                                <h3 class="text-2xl text-gray-700">
                                                    Transfagarasan
                                                </h3>
                                            </div>
                                            
                                            <div class="mt-1 flex text-sm">
                                                <p class="text-gray-500">
                                                    Transylvania, Romania
                                                </p>
                                            </div>
                                            
                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ 30-day contract:
                                                <span class="text-indigo-500 font-bold">
                                                    US$5.00
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Avg. hashrate: 
                                                <span class="text-indigo-500 font-bold">
                                                    6K - 7K H/s
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Est. coins earned: 
                                                <span class="text-indigo-500 font-bold">
                                                    300M - 450M NEX
                                                </span>
                                            </p>
                                        </div>

                                        <div class="mt-4 sm:mt-0 sm:pr-9">
                                            <label for="quantity-1" class="sr-only">Quantity, Basic Tee</label>
                                            <select
                                                id="quantity-1"
                                                name="quantity-1"
                                                class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                v-model="numTransfagarasan"
                                            >
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>

                                            <div class="hidden absolute top-0 right-0">
                                                <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                    <span class="sr-only">Remove</span>
                                                    <!-- Heroicon name: mini/x-mark -->
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                                        <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>

                                        <span>In stock</span>
                                    </p>
                                </div>
                            </li>

                            <li class="flex py-6 sm:py-10 opacity-50 cursor-not-allowed">
                                <div class="flex-shrink-0">
                                    <img
                                        src="https://i.ibb.co/K7rJ5ny/image.png"
                                        alt="Kékestető"
                                        class="h-18 w-24 rounded-md object-cover object-center sm:h-36 sm:w-48"
                                    />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div class="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0">
                                        <div class="col-span-2">
                                            <div class="flex justify-between">
                                                <h3 class="text-2xl text-gray-700">
                                                    Kékestető
                                                </h3>
                                            </div>
                                            
                                            <div class="mt-1 flex text-sm">
                                                <p class="text-gray-500">
                                                    Mátra Mountains, Hungary
                                                </p>
                                            </div>
                                            
                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ 30-day contract:
                                                <span class="text-indigo-500 font-bold">
                                                    US$5.00
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Avg. hashrate: 
                                                <span class="text-indigo-500 font-bold">
                                                    6K - 7K H/s
                                                </span>
                                            </p>

                                            <p class="mt-1 text-sm text-gray-600">
                                                ↳ Est. coins earned: 
                                                <span class="text-indigo-500 font-bold">
                                                    300M - 450M NEX
                                                </span>
                                            </p>
                                        </div>

                                        <div class="mt-4 sm:mt-0 sm:pr-9">
                                            <label for="quantity-2" class="sr-only">Quantity, Nomad Tumbler</label>
                                            <select
                                                id="quantity-2"
                                                name="quantity-2"
                                                class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                v-model="numKekesteto"
                                                disabled
                                            >
                                                <option value="0">0</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>

                                            <div class="hidden absolute top-0 right-0">
                                                <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                    <span class="sr-only">Remove</span>
                                                    <!-- Heroicon name: mini/x-mark -->
                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                                        <svg class="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        
                                        <span>Out of stock</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <!-- Order summary -->
                    <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 shadow sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 id="summary-heading" class="text-2xl font-medium text-gray-900">
                            Mining Contract Summary
                        </h2>

                        <dl class="mt-6 space-y-4">
                            <div class="flex items-center justify-between">
                                <dt :class="[ hasQuantityError ? 'text-base font-medium text-red-500' : 'text-sm text-gray-600' ]">
                                    Total Mining Contracts
                                </dt>
                                
                                <dd :class="[ hasQuantityError ? 'text-lg font-bold text-red-500' : 'text-base font-medium text-gray-900' ]">
                                    {{totalMiners}}
                                </dd>
                            </div>
                            
                            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt class="flex items-center text-sm text-gray-600">
                                    <span>
                                        Cost Per Miner
                                    </span>
                                    
                                    <a href="javascript://" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about how shipping is calculated</span>
                                        <!-- Heroicon name: mini/question-mark-circle -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </dt>
                                
                                <dd class="text-base font-medium text-gray-900">
                                    $5.00 per month
                                </dd>
                            </div>
                            
                            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt class="flex text-sm text-gray-600">
                                    <span>
                                        Est. Total Hashrate
                                    </span>
                                    
                                    <a href="javascript://" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about how tax is calculated</span>
                                        <!-- Heroicon name: mini/question-mark-circle -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </dt>
                                
                                <dd class="text-base font-medium text-gray-900">
                                    <span class="uppercase">{{estTotalHashrateLower}}</span> to <span class="uppercase">{{estTotalHashrateUpper}}</span> H/s
                                </dd>
                            </div>
                            
                            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt class="flex text-sm text-gray-600">
                                    <span>
                                        Est. Coins Earned
                                    </span>
                                    
                                    <a href="javascript://" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about how tax is calculated</span>
                                        <!-- Heroicon name: mini/question-mark-circle -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </dt>
                                
                                <dd class="text-base font-medium text-gray-900">
                                    <span class="uppercase">{{estMiningTotalLower}}</span> to <span class="uppercase">{{estMiningTotalUpper}}</span> NEX
                                </dd>
                            </div>
                            
                            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt :class="[ hasQuantityError ? 'text-xl font-bold text-red-500' : 'text-lg font-medium text-indigo-700' ]">
                                    Your Order Total
                                </dt>
                                
                                <dd :class="[ hasQuantityError ? 'text-2xl font-bold text-red-500' : 'text-xl font-medium text-indigo-700' ]">
                                    {{orderTotal}}
                                </dd>
                            </div>
                        </dl>

                        <hr class="my-5" />

                        <div>
                            <label for="company-website" class="block text-2xl font-medium text-gray-900">
                                Your Mining Address
                            </label>

                            <div 
                                class="relative flex mt-3 rounded-md shadow-sm"
                                :class="{ 'opacity-30': isAddressConfirmed }"
                            >
                                <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                    nexa:
                                </span>
                                
                                <input
                                    type="text"
                                    class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="type or paste your Nexa mining address"
                                    v-model="address"
                                    @keyup="validateAddress"
                                    :disabled="isAddressConfirmed"
                                />
                                
                                <div v-if="hasAddressError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <!-- Heroicon name: mini/exclamation-circle -->
                                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <p v-if="hasAddressError" class="mt-2 text-sm text-red-600" id="email-error">
                                You MUST provide a destination nexa: address for your mining rewards.
                            </p>
                        </div>

                        <div class="mt-6">
                            <button
                                @click="loadPayment"
                                type="button"
                                :class="[ isAddressConfirmed ? validClass : errorClass ]"
                            >
                                Continue to Payment Options
                            </button>
                        </div>

                        <PaymentOptions 
                            v-if="isShowingPaymentOptions" 
                            :order="order"
                        />
                    </section>
                </div>

            </div>
        </section>
    </main>
</template>

<script>
/* Import modules. */
import numeral from 'numeral'

/* Import components. */
import OrderIncentives from './OrderView/OrderIncentives'
import PaymentOptions from './OrderView/PaymentOptions'

export default {
    components: {
        OrderIncentives,
        PaymentOptions,
    },
    data: () => ({
        address: null,
        coins: null,
        numVaalserberg: null,
        numTransfagarasan: null,
        numKekesteto: null,

        isShowingPaymentOptions: null,
        hasAddressError: null,
        hasQuantityError: null,
        isAddressConfirmed: null,
    }),
    watch: {
        totalMiners: function (_totalMiners) {
            console.log('CHANGED TOTAL MINERS', _totalMiners)

            if (_totalMiners < 2) {
                this.hasQuantityError = true

                return
            }

            this.hasQuantityError = false
        }
    },
    computed: {
        order() {
            return {
                totalMiners: this.totalMiners,
                address: this.address,
                numVaalserberg: this.numVaalserberg,
                numTransfagarasan: this.numTransfagarasan,
                numKekesteto: this.numKekesteto,
            }
        },
        validClass() {
            return 'w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-xl font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
        },
        errorClass() {
            return 'w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-xl font-medium text-white shadow opacity-30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
        },

        totalMiners() {
            if (!this.numVaalserberg && !this.numTransfagarasan) return 0

            let total = 0

            if (this.numVaalserberg) {
                total += Number(this.numVaalserberg)
            }

            if (this.numTransfagarasan) {
                total += Number(this.numTransfagarasan)
            }

            return total
        },

        estTotalHashrateLower() {
            if (this.totalMiners === 0) return 0

            const total = numeral(this.totalMiners * 6121.88).format('0.0a')

            return total
        },

        estTotalHashrateUpper() {
            if (this.totalMiners === 0) return 0

            const total = numeral(this.totalMiners * 7230.12).format('0.0a')

            return total
        },

        estMiningTotalLower() {
            if (this.totalMiners === 0) return 0

            const total = numeral(this.totalMiners * 281518304).format('0.00a')

            return total
        },

        estMiningTotalUpper() {
            if (this.totalMiners === 0) return 0

            const total = numeral(this.totalMiners * 508119449).format('0.00a')

            return total
        },

        orderTotal() {
            if (this.totalMiners === 0) return '$0.00'

            const total = this.totalMiners * 5.00

            return numeral(total).format('$0,0.00')
        },
    },
    methods: {
        loadPayment() {
            if (this.totalMiners < 2) {
                this.hasQuantityError = true
                
                return
            }

            if (!this.validateAddress()) {
                this.hasAddressError = true
                
                return
            }

            this.isShowingPaymentOptions = true
        },

        /**
         * Validate Address
         * 
         * Makes a remote call to the the Core endpoint of the API.
         */
        async validateAddress() {
            // NOTE Reset this each time to protect against bad Order data.
            this.isAddressConfirmed = false

            if (!this.address || this.address === '') {
                this.hasAddressError = false

                return false
            }

            const endpoint = 'https://api.nexa.rocks/v1/core/'
            const rawResponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'validateaddress',
                        params: [this.address]
                    })
                })
            // console.log('RAW RESPONSE', rawResponse)

            const content = await rawResponse.json()
            console.log('CONTENT', content)

            if (!content) {
                console.error('API ERROR!')

                return false
            }

            /* Validate content. */
            if (content.isvalid) {
                /* Set error flag. */
                this.hasAddressError = false

                /* Set confirmation flag. */
                this.isAddressConfirmed = true

                return true
            }

            /* Set error flag. */
            this.hasAddressError = true

            return false
        },

        /**
         * Initialize Coins
         */
        async initCoins() {
            let coin

            /* Set target. */
            const target = 'https://sideshift.ai/api/v2/coins'
            
            /* Request coins. */
            const result = await fetch(target)
                .catch(err => {
                    console.error(err)
                })
            // console.log('RESULT (coins):', result)

            const json = await result.json()
            console.log('JSON', json)

            /* Initialize coins container. */
            this.coins = {}


            /* 5x STABLECOINS */

            /* Find USD Coin. */
            coin = json.find(_coin => {
                return _coin.coin === 'USDC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['usdc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Tether. */
            coin = json.find(_coin => {
                return _coin.coin === 'USDT'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['usdt'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Binance USD. */
            coin = json.find(_coin => {
                return _coin.coin === 'BUSD'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['busd'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find MakerDAO Dai. */
            coin = json.find(_coin => {
                return _coin.coin === 'DAI'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['dai'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Magic Internet Money. */
            coin = json.find(_coin => {
                return _coin.coin === 'MIM'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['mim'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }


            /* 11x COIN ASSETS */

            /* Find Avalanche. */
            coin = json.find(_coin => {
                return _coin.coin === 'AVAX'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['avax'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Binance Coin. */
            coin = json.find(_coin => {
                return _coin.coin === 'BNB'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['bnb'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Bitcoin Cash. */
            coin = json.find(_coin => {
                return _coin.coin === 'BCH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['bch'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Bitcoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'BTC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['btc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Dash. */
            coin = json.find(_coin => {
                return _coin.coin === 'DASH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['dash'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Dogecoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'DOGE'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['doge'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Ethereum. */
            coin = json.find(_coin => {
                return _coin.coin === 'ETH'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['eth'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Litecoin. */
            coin = json.find(_coin => {
                return _coin.coin === 'LTC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['ltc'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Monero. */
            coin = json.find(_coin => {
                return _coin.coin === 'XMR'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['xmr'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Polygon. */
            coin = json.find(_coin => {
                return _coin.coin === 'MATIC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['matic'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }

            /* Find Zcash. */
            coin = json.find(_coin => {
                return _coin.coin === 'ZEC'
            })

            /* Validate coin. */
            if (coin) {
                this.coins['zec'] = {
                    name: coin.name,
                    networks: coin.networks,
                }
            }
        },

    },
    created: async function () {
        this.isShowingPaymentOptions = false

        this.hasAddressError = false
        this.hasQuantityError = false
        this.isAddressConfirmed = false

        this.numVaalserberg = 0
        this.numTransfagarasan = 0
        this.numKekesteto = 0

        /* Get coins. */
        await this.initCoins()
        console.log('COINS', this.coins)

        console.log('USDC', this.coins.usdc)
        console.log('USDT', this.coins.usdt)
        console.log('BUSD', this.coins.busd)
        console.log('DAI', this.coins.dai)
        console.log('MIM', this.coins.mim)

        console.log('AVAX', this.coins.avax)
        console.log('BCH', this.coins.bch)
        console.log('BTC', this.coins.btc)
        console.log('DASH', this.coins.dash)
        console.log('ETH', this.coins.eth)
        console.log('MATIC', this.coins.matic)
    },
    mounted: function () {
        //
    },
}
</script>
