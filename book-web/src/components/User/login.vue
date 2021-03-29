<template>
    <div class="login">
        <div class="login-title">
            登录
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
        <p class="tips" @click="jump('/user/register')">暂无账号,现在注册</p>
    </div>
</template>

<script>
    import { jumpRouter } from '../../utils/function'
    import { login } from "../../utils";
    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login({
                            username: this.ruleForm.username,
                            password: this.ruleForm.password
                        }).then((res) => {
                            if(res.data.code == 0){
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                localStorage.bookStoreInfo = JSON.stringify(res.data.data)
                                this.jump('/')
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            jump(info) {
                jumpRouter(info)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .login
        width 350px
        .login-title
            height 80px
            line-height 80px
        .tips
            text-align right
            padding 20px 0
            color #1a66b3
            cursor pointer
            font-size 12px
</style>