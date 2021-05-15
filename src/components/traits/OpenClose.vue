<template>
	<div class="grid grid-cols-4">
		<button v-bind:class="{ active: IsActive('close') }" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-6 rounded-l-lg" type="button" @click.prevent="device.Close()"><p>{{ $t('components.openClose.close') }}</p></button>
		<button v-bind:class="{ active: IsActive('stop') }" class="bg-danger-500 hover:bg-danger-700 text-white font-bold py-6 | col-span-2" type="button" @click.prevent="device.Stop()"><p>{{ $t('components.openClose.stop') }}</p></button>
		<button v-bind:class="{ active: IsActive('open') }" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-6 rounded-r-lg" type="button" @click.prevent="device.Open()"><p>{{ $t('components.openClose.open') }}</p></button>
	</div>
</template>

<script lang="ts">
import { Device } from 'ohg-connector';
import { BlindStatus } from 'ohg-connector/dist/Enums';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device!: Device
  }
})
export default class OpenClose extends Vue {
	device!: Device;

	public IsActive(element: 'open' | 'close' | 'stop'): boolean {
		if ((this.device.MovementStatus === BlindStatus.Opening && element === 'open') ||
			(this.device.MovementStatus === BlindStatus.Closing && element === 'close') ||
			(this.device.MovementStatus === BlindStatus.Stop && element === 'stop'))
			return true;

		return false;
	}
}
</script>

<style scoped lang="scss">
</style>