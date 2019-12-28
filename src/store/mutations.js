//主要用来定义方法，改变state里面的数据
let mutations = {
    userState : (state,newVal) => { //用户的状态
        state.userState = newVal
    },
    RegistrationButtonStatus:(state,newVal) => { //登录注册按钮的状态
        state.RegistrationButtonStatus = newVal
    },
    active:(state,newVal) => {
        state.active = newVal
    },
    mobile:(state, newVal) =>{
        state.mobile = newVal
    }
}
export default mutations