<template>
    <div class="home">
        <slider></slider>
        <hotList></hotList>
    </div>
</template>

<script>
    import slider from '@/components/Home/slider.vue';
    import hotList from '@/components/Home/hotList.vue';
    export default {
        name: "home",
        components: {
            slider,
            hotList
        }
    }
</script>

<style scoped>

</style>