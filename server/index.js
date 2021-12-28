var ws = require("nodejs-websocket");

console.log("开始建立连接...")


var server = ws.createServer(function(conn) {
    conn.on("text", function(obj) {
        console.log(obj)
        server.connections.forEach(function(conn) {
            conn.sendText(obj);
        })
    })
    conn.on("close", function(code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function(code, reason) {
        console.log("异常关闭")
    });
}).listen(1081)
console.log("WebSocket建立完毕")