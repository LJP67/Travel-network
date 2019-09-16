// 管理用户登录注册行为和用户信息
// 用户管理   userInfo:用户管理  token:令牌  user:用户
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: '',
        user: {},
    },
})


export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data) {
        state.userInfo = data;
    },
    clearUserInfo (state) {
        state.userInfo = {
            token: "",
            user: {}
        }
    }
};


export const actions = {
    // 登录
    login({ commit }, data) {
        // 接口
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit("setUserInfo", data);
            return data;
        })
    }
};