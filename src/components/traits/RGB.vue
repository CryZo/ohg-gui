<template>
	<input class="h-10 w-20" type="color" id="favcolor" name="favcolor" :value="CurrentColor()" @change="Control($event)">
</template>

<script lang="ts">
import { Color, Device } from 'ohg-connector';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device!: Device
  }
})
export default class RGB extends Vue {
	device!: Device;

	public CurrentColor(): string {
		return `#${this.device.Color.GetHexColor()}`;
	}

	public Control(e: Event) {
		this.device.SetColor(Color.Parse((<HTMLInputElement>e.target).value.substring(1)));
	}
}
</script>
