<template>
	<div class="flex row">
		<label>Hum: {{device.Humidity}}</label>
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
export default class Humidity extends Vue {
	device!: Device;
}
</script>
