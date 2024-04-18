<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MarkdownIt from 'vue3-markdown-it'

import { isNotNull } from "@/utils/validate.js";
import { getUniqueId } from "@/api/ai/chat.js";
import {Mic} from "@element-plus/icons-vue";

const id = ref('');
const userMessage = ref('');
const assistantMessage = ref('');
const isBotResponse = ref(false);
const messages = ref([
  {
    "role": "assistant",
    "content": "你好,我是萌新助手,有什么想问的?"
  }
]);
let eventSource = null;

const synth = window.speechSynthesis;
let speech = null;
const speechSynthesisSupported=ref(false)

onMounted(() => {
  getUniqueId().then(res => {
    console.log(res);
    id.value = res.data;
  });
  checkSpeechSynthesis()
});


onUnmounted(() => {
  if (eventSource) {
    eventSource.removeEventListener('message', handleEvent);
    eventSource.close();
  }
  if (checkSpeechSynthesis.value){
    handleStop()
  }
});


function checkSpeechSynthesis(){
  console.log('checkSpeechSynthesis')
  if ('speechSynthesis' in window) {
    // Speech synthesis is supported
    console.log('Speech synthesis is supported.');
    speechSynthesisSupported.value= true;
    speech=new SpeechSynthesisUtterance();
    // Additional checks can be performed here if needed
  } else {
    // Speech synthesis is not supported
    console.log('Speech synthesis is not supported.');
    speechSynthesisSupported.value= false;
  }
}

const handleEvent = (event) => {
  if (event.data === "[DONE]") {
    console.log('[DONE]');
    if (eventSource) {
      eventSource.removeEventListener('message', handleEvent);
      eventSource.close();
    }
    messages.value.push({
      "role": "assistant",
      "content": assistantMessage.value
    });
    assistantMessage.value = '';
    isBotResponse.value = false; // 标记对话已经结束
    return;
  }
  const eventData = JSON.parse(event.data);
  assistantMessage.value += eventData.response;
};

const sendMessage = () => {
  if (isBotResponse.value) {
    return; // 如果对话已经结束，不执行发送消息的操作
  }
  if (isNotNull(userMessage.value)) {
    messages.value.push({
      "role": "user",
      "content": userMessage.value
    });
    console.log(id.value)
    eventSource = new EventSource(import.meta.env.VITE_APP_BASE_API + 'ai/sse?content=' + encodeURI(userMessage.value) + "&id=" + id.value);
    eventSource.addEventListener('message', handleEvent);
    userMessage.value = '';
    isBotResponse.value=true
  }
};

const getMessageClass = (role) => {
  return role === 'user' ?  'user-background':'ai-background';
};

const isUser = (role) => {
  return role === 'user';
};
const isAssistant = (role) => {
  return role === 'assistant';
};

function playVoice(content) {
  if (speechSynthesisSupported.value){
    handleSpeak(content); // 传入需要播放的文字
  }
}

function handleSpeak(text) {
  speech.text = text; // 文字内容: 如果能播放出声音 那可真是泰裤辣！
  speech.lang = "zh-CN"; // 使用的语言:中文
  speech.volume = 1; // 声音音量：1
  speech.rate = 2; // 语速：1
  speech.pitch = 1; // 音高：1
  handleStop()
  synth.speak(speech); // 播放
}

function handleStop() {
  synth.cancel();
}

</script>

<template>
  <div class="app-container">
    <div class="ai-chat-page">
      <el-container>
        <el-main class="chat-container">
          <el-timeline>
            <el-timeline-item v-for="(message, index) in messages" :key="index">
              <el-card :class="getMessageClass(message.role)">
                <div class="avatar-wrapper" v-if="isUser(message.role)">
                  <img src="/images/i.jpg" class="user-avatar" />
                </div>
                <div class="avatar-wrapper" v-if="isAssistant(message.role)" >
                  <img src="/images/huaji.gif" class="user-avatar" @click="playVoice(message.content)"  />
                </div>
                <MarkdownIt :source="message.content"></MarkdownIt>
                <div v-if="isAssistant(message.role)&&speechSynthesisSupported">
                  <el-icon @click="playVoice(message.content)"><Mic /></el-icon>
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item v-if="isNotNull(assistantMessage)">
              <el-card>
                <MarkdownIt :source="assistantMessage"></MarkdownIt>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-main>
        <el-footer class="input-container">
          <el-input v-model="userMessage" placeholder="请输入消息..." @keyup.enter.native="sendMessage">
            <template #append>
              <el-button  @click="sendMessage" >发送</el-button>
            </template>
          </el-input>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  bottom: 100px;
  left: 0;
  width: 100%;
}

.user-background {
  background-color: #b4e19e;
  font-weight: bold;
}

.ai-background {
  background-color: #FFFFFF;
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
