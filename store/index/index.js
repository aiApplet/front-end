// store/index.js
import {
    defineStore
} from 'pinia'
import {
    pictures,
    carousel_figure,
    styles
} from '@/utils/all.js'
import {
    getCurrentInstance,
    computed
} from 'vue';


export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            page: 1,
            data: {
                list: [],
                column: 2,
                columnSpace: 1,
            },
            swiperList: [],
            _this: {},
            navBareight: 0,
            BarHeight: 0,
            w: 0,
            m: 0,
            styles_list: [], //筛选风格列表
            styles_index: null,
            next: true
        }
    },
    actions: {
        // 初始化
        init() {
            // 展示列表
            pictures({
                page: this.page,
                size: 10
            }).then(res => {
                this.data.list = res.data.result.results
                this.initValue(0);
            })
            // 轮播图
            carousel_figure().then(res => {
                this.swiperList = res.data.result
            })
            // 获取风格列表
            styles().then(res => {
                this.styles_list = res.data.result
            })
        },
        // 选择风格筛选
        styles_select(e, i) {
            this.page = 1
            let per = {}
            this.data.list = []
            if (this.styles_index == i) {
                this.styles_index = null
                per = {
                    page: this.page,
                    size: 10
                }
            } else {
                this.styles_index = i
                per = {
                    page: this.page,
                    size: 10,
                    config__style: e.id
                }
            }

            pictures(per).then(res => {
                this.data.list = res.data.result.results
                this.initValue(0);
            })
        },
        popupChange(e) {
        },
        // 筛选展开
        popupOpen(popup) {
            popup.value.open()
        },
        // 刷新展示列表
        Refresh() {
            this.page = 1
            this.data.column_2 = []
            this.data.column_1 = []
            pictures({
                page: this.page,
                size: 10
            }).then(res => {
                this.data.list = res.data.result.results
                this.initValue(0);
                uni.stopPullDownRefresh()
            })
        },
        getconfiguration() {
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
                    `${(100 - (100 / this.data.column - (+this.data.columnSpace)).toFixed(5) * this.data.column) / (this.data.column - 1)}%`;
                return column_margin;
            })

            for (let i = 1; i <= this.data.column; i++) {
                this.data[`column_${i}`] = [];
            }
        },
        // 轮播图跳转
        swiperlink(e) {
            uni.navigateTo({
                url: e
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
        async Bottoming() {
            if (!this.next) {
                uni.showToast({
                    title: '已经到底了~',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            this.page += 1
            pictures({
                page: this.page,
                size: 10
            }).then(res => {
                this.data.list = res.data.result.results
                this.next = !!res.data.result.next
                this.initValue(0);
            })
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