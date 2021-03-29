<template>
    <div class="detail">
        <div class="list-banner">
            <img src="../../assets/images/2000-480.jpg" alt="">
        </div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{form.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail-content">
            <div class="detail-left">
                <img :src="form.image" alt="">
            </div>
            <div class="detail-right">
                <div class="title">{{form.name}}</div>
                <div class="price">
                    <div class="price-title">
                        售价：
                    </div>
                    <div class="price-num">
                        ￥{{form.price}}
                    </div>
                </div>
                <div class="area_info">
                    <div class="letter">服务：</div>
                    <div class="time">
                        仅支持货到付款
                    </div>
                </div>
            </div>
            <div style="width: 400px;float: left;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item label="收货地址" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择收货地址">
                            <el-option :label="item.name + ' ' + item.mobile + ' ' + item.address" :value="item.id" v-for="item in selectList"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <p style="font-size: 12px;padding: 10px 0">如果你还没有收货地址，点击<span style="color: darkturquoise" @click="jump('personal')"> 这里 </span>前去添加
                </p>
                <el-button type="success" @click="submitForm('ruleForm')">购买商品</el-button>
            </div>
        </div>
        <div class="more">
            <div class="more-title">
                <span>更多商品详情</span>
            </div>
            <div class="more-list">
                <div class="more-item">作者：{{form.author}}</div>
                <div class="more-item">出版社：{{form.publish}}</div>
                <div class="more-item">出版时间：{{form.time}}</div>
                <div class="more-item">字数：{{form.word}}</div>
            </div>
        </div>
        <div class="more">
            <div class="more-title">
                <span>商品简介</span>
            </div>
            <div class="more-text">
                {{form.description}}
            </div>
        </div>
    </div>
</template>

<script>
    import { jumpRouter } from '../../utils/function'
    import {getGoodsdetail, getAddressList, createOrder} from '../../utils/index'

    export default {
        name: "detail",
        data() {
            return {
                form: {
                    author: "---",
                    description: "---",
                    id: "",
                    image: "---",
                    name: " ---",
                    price: "---",
                    publish: "---",
                    time: "---",
                    word: "---"
                },
                ruleForm: {
                    region: ''
                },
                rules: {
                    region: [
                        {required: true, message: '请选择收货地址', trigger: 'change'}
                    ],
                },
                selectList: []
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        createOrder({
                            goodsId: this.form.id,
                            addressId: this.ruleForm.region
                        }).then((res)=> {
                            console.log(res.data)
                            if(res.data.code == 0){
                                this.$notify({
                                    title: '成功',
                                    message: '订单提交成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getGoodsdetailFun() {
                getGoodsdetail({
                    id: this.$route.query.id
                }).then(res => {
                    console.log(res)
                    this.form = res.data.data
                })
            },
            // 获取收货地址
            getAddressList() {
                getAddressList().then((res) => {
                    let data = res.data;
                    if(data.code != 0){
                        this.$Message.error(data.msg);
                    }else{
                        this.selectList = data.data
                        console.log(this.selectList)
                    }
                })
            },
            jump(info) {
                jumpRouter(info)
            }

        },
        created() {
            this.getGoodsdetailFun()
            this.getAddressList()
        }
    }
</script>

<style lang="stylus" scoped>
    .detail
        width 1200px
        margin 0 auto
        .breadcrumb
            margin 10px 0
        .detail-content
            overflow hidden
            .detail-left
                float: left
                width 400px
                box-sizing border-box
                img
                    width 100%
            .detail-right
                float: left
                width 800px
                .title
                    text-align left
                    line-height: 24px;
                    max-height: 48px;
                    overflow: hidden;
                    color: #323232;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px auto;
                .price
                    background-color: #ebebeb;
                    padding: 0 0 0 10px;
                    margin: 20px 0 20px -10px;
                    line-height: 28px;
                    position: relative;
                    width: 630px;
                    z-index: 6666;
                    text-align left
                    .price-title
                        padding-bottom: 7px;
                    .price-num
                        font-size: 26px;
                        color: #e52222;
                .area_info
                    padding 15px 0
                    overflow: hidden;
                    .letter
                        line-height 14px
                        font-size 12px
                        float: left;
                        color: #969696;
                        white-space: nowrap;
                    .time
                        line-height 14px
                        font-size 14px
                        float: left;
                        color: #646464;
        .more
            margin-bottom 20px
            .more-title
                width 100%
                box-sizing border-box
                border-bottom 1px solid #323232;
                span
                    display inline-block
                    width 100px
                    text-align center
                    border: 1px solid #323232;
                    border-bottom: 0;
                    padding: 0 29px 1px;
                    margin-bottom: -1px;
                    position: relative;
                    background-color: #fff;
                    color: #ff2832;
            .more-list
                overflow hidden
                .more-item
                    font-size 12px
                    text-align left
                    padding 5px 0
                    float: left
                    width 33.3%
                    overflow: hidden;
                    line-height: 22px;
                    height: 22px;
                    color: #323232;
            .more-text
                text-align left
                font-size 12px
                padding 5px 0
                overflow: hidden;
                line-height: 22px;
                color: #323232;
</style>