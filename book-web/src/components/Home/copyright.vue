<template>
    <div class="copyright">
        <div class="unit">
            <div class="unit-img">

            </div>
        </div>
        <div class="foot">
            版权归 本人 所有
        </div>
    </div>
</template>

<script>
    export default {
        name: "copyright"
    }
</script>

<style lang="stylus" scoped>
    .copyright
        width 100vw
        background #ECECEC
        .foot
            color #72717
            font-size 14px
            width 1440px
            margin 0 auto
            background #ECECEC
            height 50px
            line-height 50px
            text-align center
        .unit
            .unit-img
                background: url('../../assets/images/foot-service.png') no-repeat;
                height: 83px;
                margin: auto;
                width: 1210px;
</style>