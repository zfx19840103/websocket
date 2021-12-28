<!-- vue + websocket连接demo -->
<template>
  <div>
    <h3>ima</h3>
    <ul>
      <li v-for="(item, index) in uldata" :key="index">
        <span :key="index + 'ima'" v-if="item.indexOf('ima') > 0" class="red">{{
          item.substring(0, item.indexOf("_"))
        }}</span>
        <span
          :key="index + 'imc'"
          v-if="item.indexOf('imc') > 0"
          class="blue"
          >{{ item.substring(0, item.indexOf("_")) }}</span
        >
      </li>
    </ul>
    <textarea @keydown="downbtn" v-model="textData"></textarea>
    <Button @click="test">button</Button>
  </div>
</template>

<script>
let socket;
// 给服务器发送一个字符串:
export default {
  data() {
    return {
      // 连接标志位
      lockReconnect: false,
      wsCfg: {
        // websocket地址
        url: "ws://127.0.0.1:1081"
      },
      textData: "",
      uldata: []
    };
  },

  methods: {
    downbtn(e) {
      if (e.keyCode == 13) {
        this.test();
      }
    },
    createWebSocket() {
      try {
        // 创建Web Socket 连接
        socket = new WebSocket(this.wsCfg.url); // 初始化事件
        this.initEventHandle(socket);
      } catch (e) {
        // 出错时重新连接
        this.reconnect(this.wsCfg.url);
      }
    },
    initEventHandle(socket) {
      // 连接关闭时触发
      socket.onclose = () => {
        console.log("连接关闭");
      }; // 通信发生错误时触发
      socket.onerror = () => {
        // 重新创建长连接
        this.reconnect();
      }; // 连接建立时触发
      socket.onopen = () => {
        console.log("连接成功");
      }; // 客户端接收服务端数据时触发
      socket.onmessage = msg => {
        this.uldata.push(msg.data);
      };
    },
    reconnect() {
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true; // 没连接上会一直重连，设置延迟避免请求过多

      setTimeout(() => {
        this.lockReconnect = false;
        this.createWebSocket(this.wsCfg.url);
      }, 2000);
    },
    test() {
      socket.send(this.textData + "_ima");
      this.textData = "";
    }
  },
  mounted() {
    this.createWebSocket();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

textarea {
  margin: 20px 0 0;
  width: 50%;
  height: 100px;
}

ul {
  border: black solid 1px;
  width: 60%;
  margin: 0 auto;
  height: 400px;
  overflow-y: scroll;
}

li {
  list-style-type: none;
  width: 60%;
  margin: 0 auto;
  overflow: hidden;
  clear: both;
  border-bottom: 1px dashed black;
}

li span {
  display: inline-block;
}

.blue {
  color: blue;
  float: left;
}

.red {
  color: red;
  float: right;
}
</style>
