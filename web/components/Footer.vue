<template>
    <main>
        <div class="flex flex-col sm:flex-row justify-between border-t border-gray-200 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="flex-col sm:flex-row py-8 text-sm text-gray-400 text-center sm:text-left">
                <span class="block sm:inline mr-1">
                    &copy; 2022-{{new Date().getFullYear()}} The Minado DAO.
                </span>

                <span class="block sm:inline">
                    All rights reserved.
                </span>
            </div>

            <div class="border-t border-gray-200 py-8 text-center sm:text-right">
                <NuxtLink to="/terms" class="text-sm text-gray-400 hover:underline">
                    Terms of Service
                </NuxtLink>
            </div>
        </div>

        <SidePanel />
    </main>
</template>
