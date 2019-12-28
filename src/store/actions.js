//使mutations可以异步操作
let actions = {
    getAndrogynyList (context, params) {
        return this._vm.$axios.post(`/user/login`)
    }
}
export default actions
