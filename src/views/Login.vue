<template>
	<div class="whole">
		<div class="navbar">
			<div class='bgc'>
				<img class='logo' src="@/assets/images/loginlogo.png">
				<el-menu v-if="this.$route.path == '/login'" mode="horizontal" default-active="activeMenu" router
					:active-text-color="activeColor">
					<el-menu-item v-for="item in headerMenu" :key="item.id" :index="item.path">{{ item.name }}
					</el-menu-item>
				</el-menu>
				<Right/>
			</div>
		</div>
		<div class="loginbox">
			<!-- 轮播图 -->
			<el-carousel :interval="3000" arrow="never" height="500px">
				<el-carousel-item v-for="item in loginImg" :key="item.id" :label="item.text">
					<img :src="item.img" :alt="item.id">
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	import img1 from '@/assets/images/login1.png'
	import img2 from '@/assets/images/login2.png'
	import Right from '@/components/login/Right.vue'
	import {
		iToken
	} from '@/utils/home.js'
	export default {
		name: 'Login',
		components: {
			Right
		},
		data() {
			return {
				loginImg: [{
						id: 1,
						img: img1
					},
					{
						id: 2,
						img: img2
					}
				],
				headerMenu: [{
						id: 1,
						name: '首页',
						path: '/home'
					},
					{
						id: 2,
						name: '审核认证',
						path: '/home/adminCenter/examine/index'
					},
				],
				activeColor: '#278DE5'
			}
		},
		// created() {
		// 	iToken().then(res => {
		// 		localStorage.setItem('iToken', JSON.stringify(res.data.data.iToken))
		// 	})
		// },
		computed: {
			activeMenu() {
				const router = this.$router
				return router
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.loginbox {
		width: 1300px;
		margin: 0 auto;
	}

	.whole {
		background-color: #2A3035;
		height: 100vh;
	}

	/* 头部 */
	.navbar {
		width: 100%;
		height: 72px;
		background-color: white;
		display: flex;
		justify-content: center;
		font-size: 18px;
	}

	.el-menu-item {
		font-size: 18px;
	}

	.navbar .bgc {
		width: 80%;
		height: 72px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}

	.el-menu--horizontal>.el-menu-item {
		margin-right: 30px;
	}

	.logo {
		width: 200px;
	}
</style>
