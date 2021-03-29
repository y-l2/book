<template>
    <div class="address">
        <div class="add" style="margin: 20px 0">
            <el-button type="primary" round @click="addAddress()">添加地址</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="姓名"
                    width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="联系方式"
                    width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.mobile }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地址"
                    width="500">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="地址管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savaAddress">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getAddressList, addAddress, editAddress , delectAddress} from '../../utils/index'
    export default {
        name: "address",
        data() {
            const self = this
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    id: '',
                    name: '',
                    mobile: '',
                    address: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            handleEdit(index, row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.mobile = row.mobile;
                this.form.address = row.address;
                this.editAddress()
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('您要删除这条地址信息吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delectAddresssFun(row)
                })
            },
            // 添加地址窗口
            addAddress() {
                this.form.name = ''
                this.form.id = ''
                this.form.mobile = ''
                this.form.address = ''
                this.dialogFormVisible = true
            },
            // 编辑地址窗口
            editAddress() {
                this.dialogFormVisible = true
            },
            // 保存当前地址修改
            savaAddress() {
                if(this.form.name != ''){
                    if(this.form.id == ''){
                        // 保存新的
                        this.addAddressFun()
                    }else{
                        // 编辑保存
                        this.editAddressFun()
                    }

                }else {
                    this.open4()
                }
                this.dialogFormVisible = false
            },
            // 获取地址列表
            getAddressListFun() {
                getAddressList().then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
            },
            // 添加地址
            addAddressFun() {
                addAddress({
                    name: this.form.name,
                    mobile: this.form.mobile,
                    address: this.form.address
                }).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                        this.getAddressListFun()
                    }
                })
            },
            // 编辑地址
            editAddressFun() {
                editAddress(this.form).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                        this.getAddressListFun()
                    }
                })
            },
            //删除地址
            delectAddresssFun(row) {
                const _this = this
                delectAddress(row).then((res) => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getAddressListFun()
                    }
                })

            },
            //警告弹框提示
            open4() {
                this.$notify({
                    title: '警告',
                    message: '内容不能为空',
                    type: 'warning'
                });
            },
            //确认弹框提示
            open3() {
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                });

            }
        },
        mounted() {
            this.getAddressListFun()
        }
    }
</script>

<style scoped>

</style>