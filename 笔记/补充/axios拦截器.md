axios拦截器分为请求(request)拦截器和响应(response)拦截器两种。

# 拦截器一般做什么？
很多时候我们需要在发送请求和响应数据的时候做一些页面处理，比如在请求服务器之前先判断以下用户是登录(通过token判断),或者设置请求头header，或者在请求到数据之前页面显示loading等等
还有在响应到数据的之后做一些判断，例如服务器返回401登录状态失效，需要重新登录的时候，跳转到登录页，请求成功后关闭页面loading等，这个时候我们就可以用到axios拦截器来做这一系列的事情。
# 添加请求拦截器
```js
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```
# 添加响应拦截器
```js
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```
# 移除拦截器
```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```
# 给自定义的 axios 实例添加拦截器
```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```