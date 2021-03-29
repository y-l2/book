<template>
    <div class="order">
        <div class="add" style="margin: 20px 0">

        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="商品名"
                    width="350">
                <template slot-scope="scope">
                    <span>{{ scope.row.goods.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="收货人"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.address.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="联系方式"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.address.mobile }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="收货地址"
                    width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.address.address }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="订单状态"
                    width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">未发货</span>
                    <span v-if="scope.row.status == 1">已发货</span>
                    <span v-if="scope.row.status == 2">已完成</span>
                    <span v-if="scope.row.status == 3">已取消</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看详情
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, 1)">设置发货
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, 3)">取消订单
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, 2)">完成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.goodsName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="收货人" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getOrderList, orderStatus} from '../../utils/index'
    export default {
        name: "order",
        data() {
            return {
                tableData: [
                    {
                        goods:{
                            name: ''
                        },
                        address: {
                            name: '',
                            mobile: '',
                            address: '',
                        },
                        status: 99
                    }
                ],
                dialogFormVisible: false,
                form: {
                    id: '',
                    goodsName: '',
                    name: '',
                    mobile: '',
                    address: '',
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            handleEdit(index, row) {
                this.form.id = row.id;
                this.form.goodsName = row.goods.name;
                this.form.name = row.address.name;
                this.form.mobile = row.address.mobile;
                this.form.address = row.address.address;
                this.editOrder()
            },
            handleDelete(index, row , status) {
                console.log(index, row);
                this.$confirm('当前商品暂未发货, 是否取消订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.orderStatusFun(row, status)
                })
            },
            // 编辑订单窗口
            editOrder() {
                this.dialogFormVisible = true
            },
            // 获取订单列表
            getOrdersListFun() {
                getOrderList().then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
            },
            //设置订单状态
            orderStatusFun(row, status) {
                orderStatus({
                    id: row.id,
                    status
                }).then((res) => {
                    console.log(res.data)
                    if(res.data.code == 0){
                        this.$message({
                            type: 'success',
                            message: '订单已取消!'
                        });
                        this.getOrdersListFun()
                    }
                })
            }
        },
        mounted() {
            this.getOrdersListFun()
        }
    }
</script>

<style scoped>

</style>