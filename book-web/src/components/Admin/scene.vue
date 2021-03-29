<template>
    <div class="scene">
        <div class="add" style="margin: 20px 0">
            <el-button type="primary" round @click="addScene()">添加场景</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="场景"
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

        <el-dialog title="场景管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="场景名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savaScene">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getScenesList, addScenes, editScenes , delectScenes} from '../../utils/index'
    export default {
        name: "scene",
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
                this.editScene()
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delectScenesFun(row)
                })
            },
            // 添加场景窗口
            addScene() {
                this.form.name = ''
                this.form.id = ''
                this.dialogFormVisible = true
            },
            // 编辑场景窗口
            editScene() {
                this.dialogFormVisible = true
            },
            // 保存当前场景修改
            savaScene() {
                if(this.form.name != ''){
                    if(this.form.id == ''){
                        // 保存新的
                        this.addSceneFun()
                    }else{
                        // 编辑保存
                        this.editSceneFun()
                    }

                }else {
                    this.open4()
                }
                this.dialogFormVisible = false
            },
            // 获取场景列表
            getScenesListFun() {
                getScenesList().then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
            },
            // 添加场景
            addSceneFun() {
                addScenes({
                    name: this.form.name
                }).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            // 编辑场景
            editSceneFun() {
                editScenes(this.form).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            //删除场景
            delectScenesFun(row) {
                delectScenes(row).then((res) => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getScenesListFun()
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
                this.getScenesListFun()
            }
        },
        mounted() {
            // this.getScenesListFun()
        }
    }
</script>

<style scoped>

</style>