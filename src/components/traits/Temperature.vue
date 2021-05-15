<template>
	<div class="flex row">
		<label>Temp: {{device.Temperature}}</label>
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
export default class Temperature extends Vue {
	device!: Device;
}
</script>
