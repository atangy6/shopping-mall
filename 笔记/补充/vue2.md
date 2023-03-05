## 路由传参的两种方式（params,query)
路由传参分为 params 传参与 query 传参
params 传参类似于网络请求中的 post 请求，params 传过去的参数不会显示在地址栏中（但是不能刷新）。params 只能配合 name 使用，如果提供了 path，params 会失效。
query 传参类似于网络请求中的 get 请求，query 传过去的参数会拼接在地址栏中（?name=xx）。query 较为灵活既可以配合 path 使用，也能配合 name 使用。