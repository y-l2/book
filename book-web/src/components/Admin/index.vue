<template>
    <div class="Admin">
        <topNav></topNav>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="2">分类管理</el-menu-item>
            <el-menu-item index="3">商品管理</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
        <div class="line"></div>
        <router-view/>
    </div>
</template>

<script>
    import topNav from '@/components/Home/topNav.vue'
    export default {
        name: "Admin",
        components: {
            topNav
        },
        data() {
            return {
                activeIndex: '2'
            };
        },
        methods: {
            handleSelect(key) {
                console.log(key);
                if(key == '2'){
                    this.$router.push({
                        path: '/admin/'
                    })
                }else if(key == '3'){
                    this.$router.push({
                        path: '/admin/commodity'
                    })
                }else if(key == '4'){
                    this.$router.push({
                        path: '/admin/order'
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .Admin
        width 1440px
        margin 0 auto
</style>