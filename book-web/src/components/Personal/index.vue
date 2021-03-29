<template>
    <div class="Personal">
        <topNav></topNav>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">地址管理</el-menu-item>
            <el-menu-item index="2">订单管理</el-menu-item>
        </el-menu>
        <div class="line"></div>
        <router-view/>
    </div>
</template>

<script>
    import topNav from '@/components/Home/topNav.vue'
    export default {
        name: "Personal",
        components: {
            topNav
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key) {
                console.log(key);
                if(key == '1'){
                    this.$router.push({
                        path: '/personal'
                    })
                }else if(key == '2'){
                    this.$router.push({
                        path: '/personal/myorder'
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .Personal
        width 1440px
        margin 0 auto
</style>