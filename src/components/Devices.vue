<template>
  <div class="min-h-full">
    <div class="px-2 sm:px-6 pt-6 pb-4 border-b border-gray-200">
      <DevTypeControl v-if="room" :room="room" :type="$route.params.type">
          <router-link :to="{name: 'room', params: {id: $route.params.id}}" class="inline-flex sm:hidden items-center p-1.5 mr-2 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <mdicon name="chevron-left" />
          </router-link>
        <h2 class="text-lg font-medium text-gray-900">{{ $t(`deviceTypes.${$route.params.type}`) }}</h2>
      </DevTypeControl>
    </div>

    <nav class="flex-1 min-h-0 overflow-y-auto bg-white" :aria-label="$t('components.devices.title')">
      <ul class="divide-y divide-gray-200">
        <SingleDevice v-for="device in devices" :key="device._id" :device="device" />
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Device, Room } from 'ohg-connector';
import { DeviceType } from 'ohg-connector/dist/Enums';
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    SingleDevice: defineAsyncComponent(() => import("./SingleDevice.vue")),
    DevTypeControl: defineAsyncComponent(() => import("./DevTypeControl.vue")),
  }
})
export default class Devices extends Vue {
  private room?: Room;
  private devices: Device[] = [];
  private deviceTypes: DeviceType[] = [];
  private interval?: number;
  private autoGoBackTimeout?: number;

  refresh() {
    this.devices.length = 0;
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      if (r._id === this.$route.params.id) {
        this.room = r;

        r.Devices.forEach(d => {
          if (`${d.Type}` === this.$route.params.type)
            this.devices.push(d);

          if (!this.deviceTypes.includes(d.Type))
            this.deviceTypes.push(d.Type);
        });
      }
    });
  }

  mounted() {
    this.refreshAutoGoBack();
    this.$el.addEventListener('mousemove', ()=>this.refreshAutoGoBack());
    this.refresh();
    this.interval = setInterval(this.refresh.bind(this), 500);
  }

  unmounted() {
    clearInterval(this.interval);
    clearTimeout(this.autoGoBackTimeout);
  }

  async refreshAutoGoBack() {
    clearTimeout(this.autoGoBackTimeout);
    if (this.deviceTypes.length <= 1) return;
    //Check if this is an mobile device and go back automatically on timeout
    // @ts-ignore
    const tw = await import('@/../tailwind.config');
    if (window.innerWidth < parseInt(tw.theme.screens.sm.replace(/[^0-9]/g,''))) {
      this.autoGoBackTimeout = setTimeout(() => {
        if (this.$route.params.id)
          this.$router.push({name: 'room', params: {id: this.$route.params.id}})
      }, 10000);
    }
  }
}
</script>
