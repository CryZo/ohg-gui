<template>
  <div class="px-6 pt-6 pb-4 border-b border-gray-200">
    <DevTypeControl v-if="room" :room="room" :type="$route.params.type">
      <h2 class="text-lg font-medium text-gray-900">{{ $t(`deviceTypes.${$route.params.type}`) }}</h2>
    </DevTypeControl>
  </div>

  <nav class="flex-1 min-h-0 overflow-y-auto bg-white" :aria-label="$t('components.devices.title')">
    <ul class="divide-y divide-gray-200">
      <SingleDevice v-for="device in devices" :key="device._id" :device="device" />
    </ul>
  </nav>
</template>

<script lang="ts">
import { Device, Room } from 'ohg-connector';
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
  private interval: number = 0;

  refresh() {
    this.devices.length = 0;
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      if (r._id === this.$route.params.id) {
        this.room = r;

        r.Devices.forEach(d => {
          if (`${d.Type}` === this.$route.params.type)
            this.devices.push(d);
        });
      }
    });
  }

  mounted() {
    this.autoGoBack();
    this.refresh();
    this.interval = setInterval(this.refresh.bind(this), 500);
  }

  unmounted() {
    clearInterval(this.interval);
  }

  async autoGoBack() {
    //Check if this is an mobile device and go back automatically on timeout
    // @ts-ignore
    const tw = await import('@/../tailwind.config');
    if (window.innerWidth < parseInt(tw.theme.screens.sm.replace(/[^0-9]/g,''))) {
      setTimeout(() => {
        this.$router.push({name: 'room', params: {id: this.$route.params.id}})
      }, 30000);
    }
  }
}
</script>
