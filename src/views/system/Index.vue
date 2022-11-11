<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 系统管理 / 用户角色管理 / 操作员管理
			</div>
		</Travelpermit>
		
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="ruleFrom.sysUserId" placeholder="用户ID"></el-input>
				<el-input v-model="ruleFrom.realname" placeholder="用户姓名"></el-input> 
			</div>
			<div class="btnbox">
				<el-button type="primary" style="color: white;">查询</el-button>
				<el-button @click="resetdata()">重置</el-button>
				<el-button type="primary" @click="diables=true"  style="color: white;">新建</el-button>
			</div>
			<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
				<el-table-column prop="sysUserId" label="用户ID" >
				</el-table-column>
				<el-table-column prop="realname" label="姓名">
				</el-table-column>
				<el-table-column  label="性别">
					<template slot-scope="scope">
						{{scope.row.sex | sex}}
					</template>
				</el-table-column>
				<el-table-column  label="头像">
					<template slot-scope="scope">
						<img :src="scope.row.avatarUrl">
					</template>
				</el-table-column>
				<el-table-column prop="userNo" label="编号">
				</el-table-column>
				<el-table-column prop="telphone" label="手机号">
				</el-table-column>
				<el-table-column label="超管">
					<template slot-scope="scope">
						{{scope.row.isAdmin | isAdmin}}
					</template>>
				</el-table-column>
				<el-table-column prop="tel" label="状态">
					<template slot-scope="scope">
						{{scope.row.state | state}}
					</template>>
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间">
				</el-table-column>
				<el-table-column prop="updatedAt" label="修改时间">
				</el-table-column>
			</el-table>
			<el-pagination
				background
				@current-change="handleCurrentChange" 
				:current-page="currentPage"
				:page-sizes="pageSizes" 
				:page-size="PageSize" 
				layout="prev, pager, next"
				:total="totalCount">
			</el-pagination>
		</div>
		
		<!-- 蒙尘 -->
		<el-dialog title="新增操作员" append-to-body :visible.sync="diables" width="50%">
			<div class="chen">
				<el-form :model="myfrom" @submit.native.prevent :rules="rules2" ref="myfrom" label-width="100px"
					class="demo-ruleForm">
					<div>
						<el-form-item label="用户登录名" prop="loginUsernamet">
							<el-input type="text" v-model="myfrom.loginUsername"  placeholder='输入用户登录名'></el-input>
							<span style="margin-left: 15px;color: darkgray;">初始密码：123456</span>
						</el-form-item>
						<el-form-item label="用户姓名" prop="realnamet">
							<el-input type="text" v-model="myfrom.realname" placeholder='输入用户姓名'></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="telphonet">
							<el-input type="text" v-model="myfrom.telphone" placeholder='输入手机号'></el-input>
						</el-form-item>
						<el-form-item label="编号" prop="userNot">
							<el-input type="text" v-model="myfrom.userNo" placeholder='输入编号'></el-input>
						</el-form-item>
						<el-form-item label="请选择性别" prop="sext">
							<el-radio-group v-model="myfrom.sex">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="状态" prop="statet">
							<el-radio-group v-model="myfrom.state">
								<el-radio :label="1">启用</el-radio>
								<el-radio :label="0">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<el-form-item style="width: 100%;">
						<el-button>取消</el-button>
						<el-button type="primary" @click="subm('myfrom')" style="color: white;">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import {sysUsers} from '@/utils/system.js'
	import {addUser} from '@/utils/login.js'
	export default{
		components:{
			Travelpermit
		},
		filters:{
			sex(e){
				if(e==1){
					return '男'
				}else if(e==2){
					return '女'
				}else if(e==0){
					return '未知'
				}
			},
			isAdmin(e){
				if(e==0){
					return '否'
				}else if(e==1){
					return '是'
				}
			},
			state(e){
				if(e==1){
					return '启用'
				}
			}
		},
		data(){
			var validatePass = (rule, value, callback) => {
				let reg=/^1[3-9]\d{9}$/
				if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号'))
			  } 
			  callback()
			}
			return{
				ruleFrom:{
					 sysUserId:'',
					 realname:''
				},
				
				myfrom: {
						loginUsername: '',
						realname: '',
						 sex: 1,
						state: 1,
						telphone: '',
						userNo: ''
				 },
				 rules2: {
				 	loginUsernamet: [{
				 		required: true,
				 		message: '请输入用户登录名',
				 		trigger: 'blur'
				 	}],
				 	realnamet: [{
				 		message: '请输入用户姓名',
				 		required: true,
				 		trigger: 'blur'
				 	}],
				 	userNot:[{
				 		message: '请输入编号',
				 		required: true,
				 		trigger: 'blur'
				 	}],
				 	telphonet: [{
				 		validator: validatePass,
				 		required: true,
				 		trigger: 'blur'
				 	}]
				 },
				 tableData: [],
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
				diables:false
			}
		},
		methods: {
			getDatas(){
				sysUsers().then(res=>{
					this.tableData=res.data.data.records
				})
			},
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			// 新增操作员
			subm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.myfrom)
						addUser(this.myfrom).then(res=>{
							if(res.data.code !=200){
								this.$message.error(res.data.msg);
							}else{
								this.$message.success(res.data.msg);
								this.$store.state.rolindexdilago=false
								this.reload()
							}
							
							
						})
						 // 获取用户中心信息，查看手机号是否存在
						 // charkname({
						 // 	  phone:this.myfrom.telphone
						 // }).then(res=>{
							//  if(res.data.data==null){
							// 	 onetwo({
							// 		"name":this.myfrom.realname,
							// 		"username":this.myfrom.loginUsername,
							// 		"password":"123456",
							// 		"phone":this.myfrom.telphone
							// 	 }).then(inforegin=>{
							// 		 console.log(this.myfrom)
							// 		 apiysUsers(this.myfrom).then(inforegins=>{
							// 			 this.$message.success(inforegins.data.msg);
							// 			 this.$store.state.rolindexdilago=false
							// 		 	this.reload()
							// 		 })
							// 	 }).catch(()=>{
							// 		this.$message.error("新增失败，请联系相关人员")
							// 		this.$store.state.rolindexdilago=false
							// 		this.reload()
							// 		})
							// 	}else if(res.data.data.username==this.myfrom.loginUsername){
							// 		apiysUsers(this.myfrom).then(inforeginsss=>{
							// 			this.$message.success(inforeginsss.data.msg);
							// 			this.$store.state.rolindexdilago=false
							// 			this.reload()
							// 		 }).catch(()=>{
							// 			this.$message.error("新增失败，请联系相关人员")
							// 			this.$store.state.rolindexdilago=false
							// 			this.reload()
							// 			})
							// 	}else if(res.data.data.username!=this.myfrom.loginUsername){
							// 		this.$alert("该手机号已绑定登录名为：" + res.data.data.username + "，请更改用户名进行注册",{
							// 			confirmButtonText: '确定',
							// 		})
							// 	}
							// })
						 } else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetdata(){
				Object.assign(this.$data.ruleFrom,this.$options.data().ruleFrom)
			}
		},
		created() {
			this.getDatas()
			this.getData()
		},
		watch:{
			tableData(){
				this.getData()
			}
		}
	}
</script>
<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		border-bottom: none !important;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
	}
	.el-table::before {
		height:0;
	}
	.el-button{
		border: 1px solid #278DE580;
		color: #278DE5;
	}
	.datable{
		height:450px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.control{
		color: #278DE5;
		cursor: pointer;
	}
	.cell img{
		width: 32px;
		height: 30px;
		border-radius: 50%;
	}
	.inputBox{
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}
	.el-input , .el-select{
		width: 300px;
		margin-right: 20px;
		margin-bottom: 30px;
	}
	.btnbox{
		margin-bottom: 30px;
	}
	.el-button{
		margin-right: 30px;
	}
	.block{
		margin-right: 20px;
		width: 400px;
	}
	:deep(.el-date-editor--daterange.el-input__inner){
		width: 100%;
		margin-bottom: 30px;
	}
	/* 蒙尘 */
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	:deep(.demo-ruleForm){
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.demo-ruleForm .el-input{
		width: 200px;
	}
	.demo-ruleForm .el-form-item{
		margin-bottom: 0;
	}
	.savediv{
		width: 320px;
		display: flex;
		justify-content: space-between;
	}
	.accou{
		width: 100px;
		text-align: right;
		padding-right: 12px;
		box-sizing: border-box;
	}
</style>