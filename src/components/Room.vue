<template>
  <div class="flex flex-row items-center px-2 sm:px-6 pt-6 pb-4">
    <router-link :to="{name: 'rooms'}" class="inline-flex xl:hidden items-center p-1.5 mr-2 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <mdicon name="chevron-left" />
    </router-link>
    <h2 class="text-lg font-medium text-gray-900">{{ room.Name }}</h2>
  </div>

  <!-- TODO Stats -->

  <nav class="flex-1 min-h-0 overflow-y-auto bg-white" :aria-label="room.Name">
    <div class="relative">
      <ul class="relative z-0 divide-y divide-gray-200">
        <li v-for="type in deviceTypes" :key="type" :class="type == $route.params.type ? 'bg-primary-50' : ''">
          <div class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
            <div class="flex-1 min-w-0">
              <router-link :to="{name: 'type', params: {id: room.id, type: type}}" class="focus:outline-none">
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900">{{ $t(`deviceTypes.${type}`) }}</p>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { DeviceType } from 'ohg-connector/dist/Enums';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Room extends Vue {
  private room: {id: string, Name: string, desc: string} = {id: '', Name: '', desc: ''};
  private deviceTypes: DeviceType[] = [];
  private interval: number = 0;

  refresh() {
    this.deviceTypes.length = 0;
    if (!window.rooms) return;

    window.rooms.forEach(r => {
      if (r._id === this.$route.params.id) {
        this.room = {id: r._id, Name: r.Name, desc: ''};
        //TODO Temperatur etc

        r.Devices.forEach(d => {
          if (!this.deviceTypes.includes(d.Type))
            this.deviceTypes.push(d.Type);
        });
      }
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
