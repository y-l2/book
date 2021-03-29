import router from '../router'
/**
 * 删除localStorage 内容
 */
export const delectUserInfo = function () {
    localStorage.removeItem("bookStoreInfo");
    router.push({
        path: '/user'
    })
}

/**
 * 获取UserInfo
 */
export const getUserInfo = function (index) {
    if(!localStorage.bookStoreInfo){
        if(index == 'null'){
            console.log('没有登录信息')
        }else{
            router.push({
                path: '/user'
            })
        }

    }else {
        let userInfo = JSON.parse(localStorage.bookStoreInfo);
        return userInfo
    }
}


/*
*  获取token
* */
export const getToken = function () {
    if(!localStorage.bookStoreInfo){
        router.push({
            path: '/user'
        })
    }else {
        let userInfo = JSON.parse(localStorage.bookStoreInfo);
        if(!userInfo.token){
            router.push({
                path: '/user'
            })
        }else{
            let token = userInfo.token
            return token
        }
    }
}

//跳转页面方法封装
export function jumpRouter(path) {
    router.push({
        path
    })
}