<template>
	<div class="user">
		<div class="header" @click="jumpHome">
			<div class="logo">
				<img src="../assets/images/logo.png" alt="">
			</div>
		</div>
		<div class="content">
			<div class="left">
				<img src="../assets/images/loginbaner.png" alt="">
			</div>
			<div class="right">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "User",
        methods: {
            // 跳转至首页
            jumpHome() {
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
	.header
		height: 82px;
		width: 990px;
		margin: 0 auto;
		border-bottom 1px solid #f2f2f2
		padding-bottom 20px
		.logo
			margin-top 20px
			img
				width 100px
	.content
		width 1200px
		margin 20px auto
		overflow hidden
		.left
			float: left
			width 800px
			img
				width 60%
		.right
			margin-top 50px
			float: left
			width 400px
			height 300px
			box-sizing border-box
			border 1px solid #f2f2f2

</style>