
<template>
  <div class="h-screen flex bg-blue-gray-50 overflow-hidden">
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" static class="fixed inset-0 flex z-40 lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-blue-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-4">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <mdicon name="close" class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="pt-5 pb-4">
              <div class="flex-shrink-0 flex items-center px-4">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=600" alt="Workflow" />
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <router-link v-for="item in navigation" :key="item.name" :to="item.to" class="group p-2 rounded-md flex items-center text-base font-medium text-blue-gray-600 hover:bg-blue-gray-50 hover:text-blue-gray-900">
                    <mdicon :name="item.icon" class="mr-4 h-6 w-6 text-blue-gray-400 group-hover:text-blue-gray-500" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </div>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-20">
        <div class="flex flex-col h-0 flex-1 overflow-y-auto bg-primary-600">
          <div class="flex-1 flex flex-col">
            <div class="flex-shrink-0 bg-primary-700 py-4 flex items-center justify-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
            </div>
            <nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
              <router-link v-for="item in navigation" :key="item.name" :to="item.to" class="flex items-center p-4 rounded-lg text-primary-900 hover:bg-primary-700">
                <mdicon :name="item.icon" class="h-6 w-6" aria-hidden="true" />
                <span class="sr-only">{{ item.name }}</span>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <!-- Mobile top navigation -->
      <div class="lg:hidden">
        <div class="bg-primary-600 py-2 px-4 flex items-center justify-between sm:px-6">
          <div>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
          </div>
          <div>
            <button type="button" class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-primary-600 rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="mobileMenuOpen = true">
              <span class="sr-only">Open sidebar</span>
              <mdicon name="menu"  class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <main class="flex-1 flex overflow-hidden">
        <router-view />
      </main>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

@Options({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
})
export default class App extends Vue {
  mobileMenuOpen = false;
  navigation = [
    { name: 'Dashboard', to: {name: 'dashboard'}, icon: 'home' },
    { name: 'Rooms', to: {name: 'rooms'}, icon: 'cube-outline' },
    { name: 'Charts', to: {name: 'charts'}, icon: 'chart-areaspline' },
    { name: 'Messages', to: {name: 'messages'}, icon: 'message-text-outline' },
  ];
}
</script>
