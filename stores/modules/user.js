import { defineStore } from 'pinia'
import cookies from '@/utils/cookies'
import { TOKEN, AVATAR } from '@/config/constant'
import { getInfo } from '@/api/user'

const useUserStore = defineStore({
    id: 'users',
    state: () => {
        return {
            token: cookies.get(TOKEN),
            avatar: AVATAR,
            nickname: '游客',
            uid: null,
        }
    },
    actions: {
        set_token(token = '') {
            token ? cookies.set(TOKEN, token) : cookies.remove(TOKEN)
            this.token = token
        },
        async get_user_info() {
            try {
                const { code, result } = await getInfo()
                if (code == '0') {
                    const { id, nickname, avatar } = result
                    this.uid = id || null
                    this.nickname = nickname || '游客'
                    this.avatar = avatar || AVATAR
                    return {
                        ...result,
                        uid: this.uid,
                    }
                }
            } catch (error) {
                return error
            }
        },
        async login_out() {
            this.token = ''
            this.name = ''
            this.avatar = ''
            this.clear_login_info()
        },

        async verification_token() {
            // TODO 验证token
        },

        // 清空所有登录信息
        clear_login_info() {
            return new Promise((resolve) => {
                cookies.clearAll()
                resolve()
            })
        },
    },
})
export default useUserStore
