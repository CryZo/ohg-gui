<template>
	<div class="flex row">
		<label :for="device.id">{{ device.TargetTemperature }}</label>
		<input :id="device.id" class="w-full" type="range" min="0" max="40" v-model="device.TargetTemperature" @change="Control()">
	</div>
</template>

<script lang="ts">
import { Device } from 'ohg-connector';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device!: Device
  }
})
export default class TemperatureSetting extends Vue {
	device!: Device;

	public Control(e: Event) {
		this.device.SetTemperature();
	}
}
</script>
