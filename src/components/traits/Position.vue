<template>
	<div class="flex flex-1">
		<input class="w-full" type="range" min="0" max="100" v-model="device.Position" @change="Control()">
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
export default class Position extends Vue {
	device!: Device;

	public Control(): void {
		this.device.SetPosition();
	}
}
</script>
