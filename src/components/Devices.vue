<template>
  <div class="px-6 pt-6 pb-4">
    <h2 class="text-lg font-medium text-gray-900">{{ $t(`deviceTypes.${$route.params.type}`) }}</h2>
  </div>

  <!-- TODO Raumkontrollen -->

  <nav class="flex-1 min-h-0 overflow-y-auto bg-white" :aria-label="$t('components.devices.title')">
    <ul class="divide-y divide-gray-200">
      <SingleDevice v-for="device in devices" :key="device._id" :device="device" />
    </ul>
  </nav>
</template>

<script lang="ts">
import { Device } from 'ohg-connector';
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    SingleDevice: defineAsyncComponent(() => import("./SingleDevice.vue"))
  }
})
export default class Devices extends Vue {
  private devices: Device[] = [];
  private interval: number = 0;

  refresh() {
    this.devices.length = 0;
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      if (r._id === this.$route.params.id) {
        r.Devices.forEach(d => {
          if (`${d.Type}` === this.$route.params.type)
            this.devices.push(d);
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
