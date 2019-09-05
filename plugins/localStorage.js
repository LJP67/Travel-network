import createPersistedState from 'vuex-persistedstate'
// store:仓库
export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}