<template>
	<view class="background"></view>
	<view class="padding-top-lg">
		<view class="waterfalls-flow">
			<view v-for="(item,index) in data.column" :key="index" class="waterfalls-flow-column"
				:style="{'width':w,'margin-left':index==0?0:m}" :id="`waterfalls_flow_column_${index+1}`">
				<view class="column-value" v-for="(item2,index2) in data[`column_${index+1}`]" :key="index2">
					<image :src="item2.image" mode="widthFix" @load="imgLoad(item2)" @error="imgError(item2)"
						class="imgsty"></image>
					<view class="introduce">
						{{item2.title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		watch,
		computed,
		getCurrentInstance,
		onMounted
	} from 'vue';
	import {
		onReachBottom
	} from '@dcloudio/uni-app'
	const _this = getCurrentInstance();
	const data = reactive({
		list: [],
		column: 2,
		columnSpace: 1,
	});
	// 数据赋值
	data.list = [{
			image: 'https://via.placeholder.com/200x500.png/ff0000',
			title: '我是标题1',
			desc: '描述描述描述描述描述描述描述描述1'
		},
		{
			image: 'https://via.placeholder.com/200x200.png/2878ff',
			title: '我是标题2',
			desc: '描述描述描述描述描述描述描述描述2'
		},
		{
			image: 'https://via.placeholder.com/200x100.png/FFB6C1',
			title: '我是标题3',
			desc: '描述描述描述描述描述描述描述描述3'
		},
		{
			image: 'https://via.placeholder.com/200x300.png/9400D3',
			title: '我是标题4',
			desc: '描述描述描述描述描述描述描述描述4'
		},
		{
			image: 'https://via.placeholder.com/100x240.png/B0E0E6',
			title: '我是标题5',
			desc: '描述描述描述描述描述描述描述描述5'
		},
		{
			image: 'https://via.placeholder.com/140x280.png/7FFFAA',
			title: '我是标题6',
			desc: '描述描述描述描述描述描述描述描述6'
		},
		{
			image: 'https://via.placeholder.com/40x60.png/EEE8AA',
			title: '我是标题7',
			desc: '描述描述描述描述描述描述描述描述7'
		},
		{
			image: 'https://via.placeholder.com/200x500.png/ff0000',
			title: '我是标题1',
			desc: '描述描述描述描述描述描述描述描述1'
		},
		{
			image: 'https://via.placeholder.com/200x200.png/2878ff',
			title: '我是标题2',
			desc: '描述描述描述描述描述描述描述描述2'
		},
		{
			image: 'https://via.placeholder.com/200x100.png/FFB6C1',
			title: '我是标题3',
			desc: '描述描述描述描述描述描述描述描述3'
		},
		{
			image: 'https://via.placeholder.com/200x300.png/9400D3',
			title: '我是标题4',
			desc: '描述描述描述描述描述描述描述描述4'
		},
		{
			image: 'https://via.placeholder.com/100x240.png/B0E0E6',
			title: '我是标题5',
			desc: '描述描述描述描述描述描述描述描述5'
		},
		{
			image: 'https://via.placeholder.com/140x280.png/7FFFAA',
			title: '我是标题6',
			desc: '描述描述描述描述描述描述描述描述6'
		},
		{
			image: 'https://via.placeholder.com/40x60.png/EEE8AA',
			title: '我是标题7',
			desc: '描述描述描述描述描述描述描述描述7'
		},
	];
	// 计算列宽
	const w = computed(() => {
		const column_rate = `${100 / data.column - (+data.columnSpace)}%`;
		return column_rate;
	})
	// 计算margin
	const m = computed(() => {
		const column_margin =
			`${(100-(100 / data.column - (+data.columnSpace)).toFixed(5)*data.column)/(data.column-1)}%`;
		return column_margin;
	})
	// 每列的数据初始化
	for (let i = 1; i <= data.column; i++) {
		data[`column_${i}`] = [];
	}
	// 获取最小值的对象
	const getMin = (a, s) => {
		let m = a[0][s];
		let mo = a[0];
		for (var i = a.length - 1; i >= 0; i--) {
			if (a[i][s] < m) {
				m = a[i][s];
			}
		}
		mo = a.filter(i => i[s] == m);
		return mo[0];
	}
	// 计算每列的高度
	function getMinColumnHeight() {
		return new Promise(resolve => {
			const heightArr = [];
			for (let i = 1; i <= data.column; i++) {
				const query = uni.createSelectorQuery().in(_this);
				query.select(`#waterfalls_flow_column_${i}`).boundingClientRect(data => {
					heightArr.push({
						column: i,
						height: data.height
					});
				}).exec(() => {
					if (data.column <= heightArr.length) {
						resolve(getMin(heightArr, 'height'));
					}
				});
			}
		})
	};
	async function initValue(i) {
		if (i >= data.list.length) return false;
		const minHeightRes = await getMinColumnHeight();
		data[`column_${minHeightRes.column}`].push({
			...data.list[i],
			index: i
		});
	}
	onMounted(() => {
		initValue(0);
	})

	onReachBottom(() => {
		initValue(0);
	})
	// 图片加载完成
	function imgLoad(item) {
		const i = item.index;
		initValue(i + 1);
	}
	// 图片加载失败
	function imgError(item) {
		const i = item.index;
		initValue(i + 1);
	}
</script>

<style scoped lang="scss">
	.waterfalls-flow {
		padding-top: 50upx;
		
		&-column {
			float: left;
			padding: 0 0 200upx;
			
		}
	}
	.background{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fafafa;
		z-index: -1;
	}
	.column-value {
		margin-top: 20rpx;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 0 0 10rpx #ebebeb;
		background-color: #ffffff;
		.introduce{
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx;
			margin: 0;
		}
		.imgsty {
			width: 100%;
			border-radius: 10rpx;
			margin: 0;
		}
	}

	
</style>