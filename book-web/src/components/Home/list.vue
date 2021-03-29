<template>
    <div class="list">
        <div class="list-banner">
            <img src="../../assets/images/2000-480.jpg" alt="">
        </div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>筛选的列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="goodList">
            <div class="good-list" v-if="list.length == 0">未找到相关商品</div>
            <div class="good-list" v-for="item in list" @click="jumpDetail(item.id)" v-if="list.length != 0">
                <div class="good-item">
                    <div class="left">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="right">
                        <div class="title">{{item.name}}</div>
                        <div class="price">￥{{item.price}}</div>
                        <div class="author">{{item.author}}</div>
                        <div class="look">
                            <el-button type="info">查看详情</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getGoodsList } from '../../utils/index'
    export default {
        name: "list",
        data() {
            return {
                list: []
            }
        },
        methods: {
            // 跳转到详情页面
            jumpDetail(id){
                this.$router.push({
                    path: '/detail',
                    query: {
                        id
                    }
                })
            },
            judgeQuery() {
                console.log(this.$route.query)
                if(this.$route.query.id) {
                    getGoodsList({
                        categoryId: this.$route.query.id
                    }).then((res) => {
                        this.list = res.data.data
                    })
                }else if(this.$route.query.content) {
                    getGoodsList({
                        name: this.$route.query.content
                    }).then((res) => {
                        this.list = res.data.data
                    })
                }else{
                    getGoodsList().then((res) => {
                        this.list = res.data.data
                    })
                }
            },
        },
        created() {
            this.judgeQuery()
        },
        watch:{
            '$route':function(to,from){
                window.scrollTo(0,0);
                this.judgeQuery()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .list
        width 1200px
        margin 0 auto
        .breadcrumb
            margin 10px 0
        .good-list
            margin-bottom 20px
            .good-item
                border 1px solid #ddd
                padding 20px 0
                overflow hidden
                .left
                    width 200px
                    height 200px
                    float left
                    img
                        width 200px
                        height 200px
                .right
                    margin-left 15px
                    float: left
                    text-align left
                    .title
                        padding 10px 0
                        font-size: 14px;
                        color: #1a66b3;
                        font-family: simsun;
                    .price
                        padding 10px 0
                        font-size: 18px;
                        color: #ff2832;
                    .author
                        padding 10px 0
                        color: rgb(26, 102, 179);
                        font-size: 12px;
                    .look
                        padding 10px 0
        .good-list:hover
            border 1px solid #1a66b3
</style>