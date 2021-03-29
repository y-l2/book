<template>
    <div class="hot-list">
        <div class="hot-title">
            <h3>书轩聚焦</h3>
            <span>倾情推荐当下最热门书籍</span>
        </div>
        <div class="hot-list">
            <div class="hot-item" v-for="item in list" @click="jumpDetail(item.id)">
                <div class="hot-img">
                    <img :src="item.image" alt="">
                </div>
                <div class="hot-name">
                    {{item.name}}
                </div>
                <div class="hot-price">
                    ￥ {{item.price}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getGoodsList } from '../../utils/index';

    export default {
        name: "hot-list",
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
            // 获取商品列表
            getGoodsListFun() {
                getGoodsList().then((res) => {
                    console.log(res.data)
                    this.list = res.data.data
                })
            }
        },
        created() {
            this.getGoodsListFun()
        }
    }
</script>

<style lang="stylus" scoped>
    .hot-list
        width 1200px
        margin 15px auto
    .hot-title
        overflow hidden
        h3
            font-size: 18px;
            float: left
        span
            float: left;
            padding-left: 18px;
            margin-top: 4px;
            color: #999;
    .hot-list
        overflow hidden
        .hot-item
            float: left
            width: 182px;
            height: 260px;
            padding: 0 28px;
            display: inline;
            background: #fff;
            border: 1px solid #f1f1f1;
            margin: 0 -1px -1px 0;
            .hot-img
                width 100%
                height 182px
                display: flex;
                justify-content: center;
                align-items: center;
                img
                    width 100%
            .hot-name
                text-align left
                color: #666;
                font-size 12px
            .hot-price
                color: #db2a41;
                font-size: 14px;
                font-family: "Microsoft Yahei";
                float: left;
</style>