<template>
    <div class="commodity">
        <div class="add" style="margin: 20px 0">
            <el-button type="primary" round @click="addCommodity()">添加商品</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="缩略图"
                    width="200">
                <template slot-scope="scope">
                    <span>
                        <img style="height: 100px" :src="scope.row.image" alt="">
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品"
                    width="300">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格"
                    width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="作者"
                    width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="出版社"
                    width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.publish }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="出版时间"
                    width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.time }}</span>
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

        <el-dialog title="商品管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="图书名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择分类" :label-width="formLabelWidth">
                    <el-select v-model="form.categoryId" placeholder="请选择分类">
                        <el-option
                                :label="item.name"
                                :value="item.id"
                                v-for="item in this.form.category"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="售价" :label-width="formLabelWidth">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input v-model="form.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社" :label-width="formLabelWidth">
                    <el-input v-model="form.publish" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版时间" :label-width="formLabelWidth">
                    <el-input v-model="form.time" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字数" :label-width="formLabelWidth">
                    <el-input v-model="form.word" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品图片" :label-width="formLabelWidth">
                    <el-upload
                            class="upload-demo"
                            :action="url + '/upload'"
                            :headers="headers"
                            :on-success="success"
                            multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item :label-width="formLabelWidth">
                    <img :src="form.image" alt="">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savaCommodity">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { baseUrl, getGoodsList, addGoods, editGoods , delectGoods, getCategoriesList} from '../../utils/index'
    import { getToken } from '../../utils/function';
    export default {
        name: "commodity",
        data() {
            return {
                url:'',
                tableData: [],
                dialogFormVisible: false,
                form: {
                    id: '',
                    name: '',
                    price: '',
                    author: '',
                    publish: '',
                    time: '',
                    word: '',
                    description: '',
                    image: '',
                    categoryId: '',
                    category:{

                    }
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.form.id = row.id
                this.form.name = row.name
                this.form.price = row.price
                this.form.author = row.author
                this.form.publish = row.publish
                this.form.time = row.time
                this.form.word = row.word
                this.form.image = row.image
                this.form.description = row.description
                this.form.categoryId = row.category.id
                this.editCommodity()
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delectCommodityFun(row)
                })
            },
            // 添加商品窗口
            addCommodity() {
                this.form.id = ''
                this.form.name = ''
                this.form.price = ''
                this.form.author = ''
                this.form.publish = ''
                this.form.time = ''
                this.form.word = ''
                this.form.describe = ''
                this.form.image = ''
                this.form.categoryId = ''
                this.dialogFormVisible = true
            },
            // 编辑商品窗口
            editCommodity() {
                this.dialogFormVisible = true
            },
            // 保存当前商品修改
            savaCommodity() {
                if(this.form.name != '' && this.form.categoryId != ''){
                    if(this.form.id == ''){
                        // 保存新的
                        this.addGoodsFun()
                        this.dialogFormVisible = false
                    }else{
                        this.editGoodsFun()
                        this.dialogFormVisible = false
                    }

                }else {
                    this.open4()
                }

            },
            // 获取商品列表
            getGoodsListFun() {
                getGoodsList().then((res) => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
            },
            // 获取分类列表
            getCategoriesListFun() {
                getCategoriesList().then((res) => {
                    console.log(res.data)
                    this.form.category = res.data.data
                })
            },
            // 添加商品
            addGoodsFun() {
                addGoods(this.form).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            // 编辑商品
            editGoodsFun() {
                console.log(this.form)
                editGoods(this.form).then((res) => {
                    if(res.data.code == 0){
                        this.open3()
                    }
                })
            },
            //删除商品
            delectCommodityFun(row) {
                delectGoods(row).then((res) => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getGoodsListFun()
                    }
                })
            },
            //警告弹框提示
            open4() {
                this.$notify({
                    title: '警告',
                    message: '商品名称、分类不能为空',
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
                this.getGoodsListFun()
            },
            success(res) {
                this.form.image = this.url+ '/' + res.data.name
                console.log(this.form.image)
            }
        },
        computed: {
            headers() {
                return {
                    'token': getToken()
                }
            }
        },
        created() {
            console.log(`baseUrl=${baseUrl}`)
            this.url = baseUrl
        },
        mounted() {
            // 获取商品列表
            this.getGoodsListFun()

            // 获取分类列表
            this.getCategoriesListFun()
        }
    }
</script>

<style lang="stylus" scoped>
    >>> .el-upload-list
        display none
</style>