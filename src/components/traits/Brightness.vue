<template>
	<div class="flex flex-1">
		<input class="w-full" type="range" min="0" max="100" v-model="device.Brightness" @change="Control()">
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
export default class Brightness extends Vue {
	device!: Device;

	public Control() {
		this.device.SetBrightness();
	}
}
</script>
