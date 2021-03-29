<template>
    <div class="classify">
        <div class="add" style="margin: 20px 0">
            <el-button type="primary" round @click="addClassify()">添加分类</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="分类"
                    width="500">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
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

        <el-dialog title="分类管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savaClassify">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getCategoriesList, addCategory, editCategory , delectCategory} from '../../utils/index'
    export default {
        name: "classify",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    id: '',
                    name: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            handleEdit(index, row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.editClassify()
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delectCategoryFun(row)
                })
            },
            // 添加分类窗口
            addClassify() {
                this.form.name = ''
                this.form.id = ''
                this.dialogFormVisible = true
            },
            // 编辑分类窗口
            editClassify() {
                this.dialogFormVisible = true
            },
            // 保存当前分类修改
            savaClassify() {
                if(this.form.name != ''){
                    if(this.form.id == ''){
                        // 保存新的
                        this.addCategoryFun()
                    }else{
                        // 编辑保存
                        this.editCategoryFun()
                    }

                }else {
                    this.open4()
                }
                this.dialogFormVisible = false
            },
            // 获取分类列表
            getCategoriesListFun() {
                getCategoriesList().then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
            },
            // 添加分类
            addCategoryFun() {
                addCategory({
                    name: this.form.name
                }).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            // 编辑分类
            editCategoryFun() {
                editCategory(this.form).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            //删除分类
            delectCategoryFun(row) {
                delectCategory(row).then((res) => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getCategoriesListFun()
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
                this.getCategoriesListFun()
            }
        },
        mounted() {
            this.getCategoriesListFun()
        }
    }
</script>

<style scoped>

</style>