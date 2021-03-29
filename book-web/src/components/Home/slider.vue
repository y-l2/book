<template>
    <div class="slider">
        <el-carousel :interval="4000" type="card" height="330px" class="elimg">
            <el-carousel-item v-for="item in imgList" :key="item.id" class="el-img">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "slider",
        data() {
            return {
                imgList: [
                    {
                        id: 0,
                        imgUrl: require('../../assets/images/banner.jpg')
                    },
                    {
                        id: 1,
                        imgUrl: require('../../assets/images/banner1.jpg')
                    },
                    {
                        id: 2,
                        imgUrl: require('../../assets/images/banner2.jpg')
                    },
                    {
                        id: 3,
                        imgUrl: require('../../assets/images/banner3.jpg')
                    },
                    {
                        id: 4,
                        imgUrl: require('../../assets/images/banner4.jpg')
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .elimg
        height 360px
        .el-img
            height 360px
            img
                width 100%
</style>