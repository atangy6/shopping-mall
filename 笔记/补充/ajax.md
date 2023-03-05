# ajax请求
## 原生js发送请求
1.创建一个XMLHttpRequest对象
2.调用对象的open方法启用。
3.监听对象的 onreadystatechange 事件（或者是onload和onerror事件），处理函数对返回的数据进行处理。
4.调用对象的send方法发送请求。
```js
const btn=document.querySelector('#btn')
btn.addEventListener('click',function(){
    const xhr=new XMLHttpRequest();
    // methods：GET/POST请求方式等，url：请求地址，true异步（可为false同步）
    xhr.open("methods","url" ,true);
    // POST请求：设置Content-Type属性（固定写法）
    xhr.setRequestHeader('Content-Type',application/x-www-form-urlencoded)
    xhr.send(); // 发送;post方式要填写发送的数据
    xhr.onreadystatechange = function() {    // 判断
    // 4表示响应结束；200为http状态码,表示成功
        if (xhr.readyState == 4 && ajax.status == 200) {  // 成功，接收到数据
                console.log(xhr.response);       // 查看返回的数据(可输出 xhr 哈)
                //JSON.parse(xhr.response);       // 如果数据为字符串的对象，可转换一下
            }else if(xhr.status == 404) {       // 失败，页面未找到
        }
    }
})
```
## Promise封装ajax请求
https://juejin.cn/post/6968796449618264072
Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled/resolved（已成功）和rejected（已失败）
