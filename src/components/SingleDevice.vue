<template>
  <li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
    <div class="flex justify-between space-x-3">
      <div class="min-w-0 flex-1">
        <div class="flex items-center">
          <p class="text-sm font-medium text-gray-900 truncate mr-auto">{{ device.Name }}</p>

          <!-- Small controls -->
          <temperature class="ml-1" v-if="CheckTrait('Temperature', device)" :device="device"></temperature>
          <humidity class="ml-1" v-if="CheckTrait('Humidity', device)" :device="device"></humidity>

          <r-g-b class="ml-1" v-if="CheckTrait('RGB', device)" :device="device"></r-g-b>
          <on-off class="ml-1" v-if="CheckTrait('OnOff', device)" :device="device"></on-off>
        </div>

        <!-- Large controls -->
        <brightness class="mt-4" v-if="CheckTrait('Brightness', device)" :device="device"></brightness>

        <open-close class="mt-4" v-if="CheckTrait('OpenClose', device)" :device="device"></open-close>
        <position class="mt-4" v-if="CheckTrait('Position', device)" :device="device"></position>

        <temperature-setting class="mt-4" v-if="CheckTrait('TemperatureSetting', device)" :device="device"></temperature-setting>

        <!-- <p class="text-sm text-gray-500 truncate">{{ message.subject }}</p> -->
      </div>
      <!-- <time :datetime="message.datetime" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ message.time }}</time> -->
    </div>
    <!-- <div class="mt-1">
      <p class="line-clamp-2 text-sm text-gray-600">
        {{ message.preview }}
      </p>
    </div> -->
  </li>
</template>


<script lang="ts">
import { Device } from 'ohg-connector';
import { Trait } from 'ohg-connector/dist/Enums';
import { Options, Vue } from 'vue-class-component';

import { Brightness, Humidity, OnOff, OpenClose, Position, RGB, Temperature, TemperatureSetting } from '@/components/traits';

@Options({
  components: {
			OnOff,
			Brightness,
			RGB,
			OpenClose,
			Position,

			TemperatureSetting,
			Temperature,
			Humidity
  },
  props: {
    device!: Device
  }
})
export default class SingleDevice extends Vue {
  public CheckTrait(traitName: Trait, device: Device): boolean {
    return device.Traits.includes(traitName);
  }
}
</script>
