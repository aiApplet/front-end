// store/index.js
import {
	defineStore
} from 'pinia'
import {
	pictures
} from '@/utils/all.js'
import {
	getCurrentInstance,
	computed
} from 'vue';


export const useIndexStore = defineStore('index', {
	state: () => {
		return {
			data: {
				list: [],
				column: 2,
				columnSpace: 1,
			},
			_this: {},
			navBareight: 0,
			BarHeight: 0,
			w: 0,
			m: 0
		}
	},
	actions: {
		// 初始化
		init() {
			// 数据赋值
			pictures({
				page:1,
				size:10
			}).then(res=>{
				
			})
			this.data.list = [{
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
			for (let i = 1; i <= this.data.column; i++) {
				this.data[`column_${i}`] = [];
			}

			// 顶部安全距离
			let {
				statusBarHeight,
				windowWidth
			} = uni.getSystemInfoSync()
			this.BarHeight = statusBarHeight

			let {
				top,
				bottom,
				left
			} = uni.getMenuButtonBoundingClientRect()
			this.navBareight = (bottom - statusBarHeight) + (top - statusBarHeight)

			this._this = getCurrentInstance();

			this.w = computed(() => {
				const column_rate = `${100 / this.data.column - (+this.data.columnSpace)}%`;
				return column_rate;
			})
			this.m = computed(() => {
				const column_margin =
					`${(100-(100 / this.data.column - (+this.data.columnSpace)).toFixed(5)*this.data.column)/(this.data.column-1)}%`;
				return column_margin;
			})
		},
		// 获取最小值的对象
		getMin(a, s) {
			let m = a[0][s];
			let mo = a[0];
			for (var i = a.length - 1; i >= 0; i--) {
				if (a[i][s] < m) {
					m = a[i][s];
				}
			}
			mo = a.filter(i => i[s] == m);
			return mo[0];
		},
		// 图片加载完成
		imgLoad(item) {
			const i = item.index;
			this.initValue(i + 1);
		},
		// 图片加载失败
		imgError(item) {
			const i = item.index;
			this.initValue(i + 1);
		},
		async initValue(i) {
			if (i >= this.data.list.length) return false;
			const minHeightRes = await this.getMinColumnHeight();
			this.data[`column_${minHeightRes.column}`].push({
				...this.data.list[i],
				index: i
			});
		},
		// 计算每列的高度
		getMinColumnHeight() {
			return new Promise(resolve => {
				const heightArr = [];
				for (let i = 1; i <= this.data.column; i++) {
					const query = uni.createSelectorQuery().in(this._this);
					query.select(`#waterfalls_flow_column_${i}`).boundingClientRect(data => {
						heightArr.push({
							column: i,
							height: data.height
						});
					}).exec(() => {
						if (this.data.column <= heightArr.length) {
							resolve(this.getMin(heightArr, 'height'));
						}
					});
				}
			})
		}
	},
})