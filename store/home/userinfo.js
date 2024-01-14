import {
    defineStore,
} from 'pinia'
import {
    getuser,
    cuser, aliyun_oss_token
} from '@/utils/all.js'
import {oss} from "@/utils/oss";

export const useUserinfoStore = defineStore('userinfo', {
    state: () => {
        return {
            userinfo: {
                id: 0,
                avatar: '',
                nickname: '',
                balance: 0,
                shares_count: 0,
                draw_count: 0,
                sign_in: false
            },
        }
    },
    actions: {
        init() {
            getuser().then(res => {
                this.userinfo = res.data.result
            })

        },
        blur(e) {
            this.userinfo.nickname = e.detail.value
        },
        profilechange() {
            cuser({
                id: this.userinfo.id,
                nickname: this.userinfo.nickname,
                avatar: this.userinfo.avatar,
            }).then(res => {
                if (res.data.code == 0) {
                    uni.showToast({
                        title: '修改成功',
                        duration: 2000
                    });
                    uni.navigateBack()
                }
            })
        },
        ChangeAvatar() {
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], //从相册选择
                success: (chooseImageRes) => {
                    const tempFilePaths = chooseImageRes.tempFilePaths;
                    uni.showLoading({
                        title: "上传中..."
                    });
                    aliyun_oss_token().then(res => {
                        const file_name = tempFilePaths[0].substr(tempFilePaths[0].lastIndexOf('/') + 1)
                        oss(res.data.result, tempFilePaths[0], file_name).then(({success, data}) => {
                            if (success) {
                                this.userinfo.avatar = data
                            }
                            uni.hideLoading()
                        }).catch(() => {
                            uni.hideLoading()
                        })
                    })
                },
            })
        }
    }
})