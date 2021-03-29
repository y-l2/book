<template>
	<div class="head-content">
		<div class="content">
			<div class="hand-logo"><img src="../../assets/images/logo.png" alt=""></div>
			<div class="nav">
				<span class="nav-item" @click="jump('/')">首页</span>
				<span class="nav-item" v-for="item in list" @click="jumpList(item.id)">{{item.name}}</span>
			</div>
			<div class="hand-search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label-width="200">
						<el-input v-model="formInline.content" placeholder="商品搜索"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchContent()">搜索</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
    import { getCategoriesList } from '../../utils/index'
    import { jumpRouter } from '../../utils/function'
    export default {
        name: "headContent",
	    data() {
            return {
                formInline: {
                    content: '',
                },
				list: []
            }
	    },
        methods: {
            // 跳转到列表
            jumpList(id){
                this.$router.push({
                    path: '/list',
                    query: {
                        id
                    }
                })
            },
            jump(info) {
                jumpRouter(info)
            },
            // 获取分类列表
            getCategoriesListFun() {
                getCategoriesList().then((res) => {
                    console.log(res.data)
                    this.list = res.data.data
                })
            },
			// 搜索内容
            searchContent() {
                this.$router.push({
                    path: '/list',
                    query: {
                        content: this.formInline.content
                    }
                })
			}
        },
		created() {
			this.getCategoriesListFun()
		}
    }
</script>

<style lang="stylus" scoped>
	>>> .el-form
			position relative
			top 30px
	.head-content
		width 100%
		.content
			width 1200px
			height 100px;
			margin 0 auto
			display flex
			justify-content space-between
			.hand-logo
				line-height 100px
				img
					position relative
					top 20px
					width 70px
					height auto
			.hand-search
				width 558px
			.nav
				text-align center
				line-height 100px
				.nav-item
					display inline-block
					cursor pointer
					padding 0 15px


</style>