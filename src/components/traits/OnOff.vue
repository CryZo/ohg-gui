<template>
	<!-- <div class="flex">
		<button v-if="device.Status" class="bg-success-500 hover:bg-success-700 text-white font-bold py-6 px-8 rounded-lg | flex-grow" @click="Control()">Turn off</button>
		<button v-else class="bg-danger-500 hover:bg-danger-700 text-white font-bold py-6 px-8 rounded-lg | flex-grow" @click="Control()">Turn on</button>
	</div> -->
	<toggle :enabled="device.Status" @click="Control()" />
</template>

<script lang="ts">
import { Device } from 'ohg-connector';
import { Options, Vue } from 'vue-class-component';
import { Toggle } from '@/components/elements';

@Options({
	components: {
		Toggle
	},
	props: {
		device!: Device
	}
})
export default class OnOff extends Vue {
	device!: Device;

	public Control(): void {
		this.device.Toggle()
	}

	public WrittenStatus(): string {
		if (this.device.Status) 
			return 'On';
		else
			return 'Off';
	}
}
</script>