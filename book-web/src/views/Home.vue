<template>
	<div class="home">
		<topNav></topNav>
		<headContent></headContent>
		<div style="margin-bottom: 20px">
			<router-view />
		</div>
		<copyright></copyright>
	</div>
</template>

<script>
	import topNav from '@/components/Home/topNav.vue';
	import copyright from '@/components/Home/copyright.vue';
	import headContent from '@/components/Home/headContent.vue';
    export default {
        name: "Home",
        components: {
            topNav,
            copyright,
            headContent
        }
    }
</script>

<style scoped>

</style>