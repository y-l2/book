<template>
    <div class="content">
        <!--头部登陆注册部分-->
        <div class="top-nav">
            <div class="top-content">
                <span class="link" @click="jump('/')">欢迎光临书轩阁</span>
                <span class="link" v-if="!userInfo.username || userInfo.username == ''">
                    <span class="item" @click="jump('/user')">登录</span>
				    <span class="item" @click="jump('/user/register')">注册</span>
			    </span>
                <span class="link" v-if="this.userInfo.role == 1">
				    <span class="item" @click="jump('/personal')">{{this.userInfo.username}}</span>
				    <span class="item" @click="jump('/personal')">个人中心</span>
				    <span class="item" @click="exitUser">退出</span>
			    </span>
                <span class="link" v-if="this.userInfo.role == 2">
				    <span class="item" @click="jump('/admin')">{{this.userInfo.username}}</span>
				    <span class="item" @click="jump('/admin')">后台管理</span>
				    <span class="item" @click="exitUser">退出</span>
			    </span>
            </div>
        </div>
        <!--广告-->
        <div class="ad">
            <span class="ad-span"></span>
        </div>
    </div>
</template>

<script>
    import { jumpRouter, getUserInfo, delectUserInfo} from '../../utils/function'
    export default {
        name: "topNav",
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            jump(info) {
                jumpRouter(info)
            },
            // 获取用户信息
            getUserInfo(){
                let userInfo = getUserInfo()
                this.userInfo = userInfo
            },
            //退出登录
            exitUser() {
                delectUserInfo()
                this.jump('/user')
            }
        },
        mounted() {
            this.getUserInfo()
        }
    }
</script>

<style lang="stylus" scoped>
    .top-nav
        background: #f7f7f7;
        height: 24px;
        line-height: 24px;
        .top-content
            display flex
            justify-content space-between
            width 1200px;
            margin 0 auto
            text-align left
            color: #666;
            font-size: 12px;
            .item
                margin 0 10px

    .ad
        height: 100px;
        min-width: 1210px;
        overflow: hidden;
        .ad-span
            background url("../../assets/images/2000-480.jpg");
            background-position: center center;
            background-repeat: no-repeat;
            display: block;
            height: 100px;
            width: 100%;
            background-size 80%
</style>