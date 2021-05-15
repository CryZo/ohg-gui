<template>
  <div class="min-h-screen">
    <div as="header" class="pb-24 bg-gradient-to-r from-primary-300 to-primary-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative flex flex-wrap items-center justify-center lg:justify-between">
          <div class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
            <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
              <h1 class="text-while text-2xl font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">{{ $t('pages.dashboard.title') }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">

            <!-- Room panels -->
            <section v-for="room in rooms" :key="room._id" :aria-label="room.Name">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">{{ room.Name }}</h3>
                </div>
                <ul class="divide-y divide-gray-200">
                  <SingleDevice v-for="device in room.Devices" :key="device._id" :device="device" />
                </ul>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Announcements -->
            <section aria-labelledby="announcements-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2 class="text-base font-medium text-gray-900" id="announcements-title">Announcements</h2>
                  <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                      <!-- <li v-for="announcement in announcements" :key="announcement.id" class="py-5">
                        <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 class="text-sm font-semibold text-gray-800">
                            <a :href="announcement.href" class="hover:underline focus:outline-none">
                              <-- Extend touch target to entire panel ->
                              <span class="absolute inset-0" aria-hidden="true" />
                              {{ announcement.title }}
                            </a>
                          </h3>
                          <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                            {{ announcement.preview }}
                          </p>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <!-- Recent Hires -->
            <section aria-labelledby="recent-hires-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2 class="text-base font-medium text-gray-900" id="recent-hires-title">Recent Hires</h2>
                  <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                      <!-- <li v-for="person in recentHires" :key="person.handle" class="py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img class="h-8 w-8 rounded-full" :src="person.imageUrl" alt="" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              {{ person.name }}
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              {{ '@' + person.handle }}
                            </p>
                          </div>
                          <div>
                            <a :href="person.href" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                              View
                            </a>
                          </div>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { SingleDevice } from "@/components";
import { Room } from 'ohg-connector';

@Options({
  components: {
    SingleDevice
  },
})
export default class Devices extends Vue {
  private rooms: Room[] = [];
  private interval: number = 0;

  refresh() {
    this.rooms.length = 0;
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      this.rooms.push(r);
    });
  }


  mounted() {
    this.refresh();
    this.interval = setInterval(this.refresh.bind(this), 500);
  }

  unmounted() {
    clearInterval(this.interval);
  }
}
</script>
