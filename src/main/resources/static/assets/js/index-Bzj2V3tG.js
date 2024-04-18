import{r as m,i as H,Y as W,o as d,c as f,a as S,U as l,O as c,F as X,a7 as Z,M,I as ee,R as v,u as y,a8 as te,S as se,bm as oe,bk as re,as as q}from"./@vue-D8ccHf85.js";import{E,a as ne,b as ae,c as le,d as ce,e as ie,f as ue,g as pe,h as de,i as me,j as fe,k as _e}from"./element-plus-7i_M9HxI.js";import{M as L}from"./vue3-markdown-it-vYJuc-oG.js";import{a as T}from"./axios-DmrN97jF.js";import{Q as he}from"./@element-plus-C_ANMyYu.js";import"./lodash-es-WEemOz_S.js";import"./@vueuse-YuAKVQ9s.js";import"./@popperjs-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-wmEaokm2.js";import"./async-validator-CRbnkQr6.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./@floating-ui-CtcGg-6p.js";import"./vue-C0Uo1qJo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const ve="/images/i.jpg",ye="/images/huaji.gif";function U(e){return e!=null&&e!==""}const V={401:"认证失败，无法访问系统资源",403:"当前操作没有权限",404:"访问资源不存在",default:"系统未知错误，请反馈给管理员"};T.defaults.headers["Content-Type"]="application/json;charset=utf-8";const k=T.create({baseURL:"/",timeout:30*1e3,transformResponse:[function(e){try{return JSON.parse(e)}catch{return e}}]});k.interceptors.request.use(e=>{if(e.method==="get"&&e.params){let t=e.url+"?"+tansParams(e.params);t=t.slice(0,-1),e.params={},e.url=t}return(e.method==="post"||e.method==="put")&&(e.url,typeof e.data=="object"?JSON.stringify(e.data):e.data,new Date().getTime()),e},e=>{Promise.reject(e)});k.interceptors.response.use(e=>{const t=e.data.code||200,o=V[t]||e.data.msg||V.default;return e.request.responseType==="blob"||e.request.responseType==="arraybuffer"?e.data:t===401?Promise.reject("无效的会话，或者会话已过期，请重新登录。"):t===500?(E({message:o,type:"error"}),Promise.reject(new Error(o))):t===601?(E({message:o,type:"warning"}),Promise.reject(new Error(o))):t!==200?(ne.error({title:o}),Promise.reject("error")):Promise.resolve(e.data)},e=>{let{message:t}=e;return t=="Network Error"?t="后端接口连接异常":t.includes("timeout")?t="系统接口请求超时":t.includes("Request failed with status code")&&(t="系统接口"+t.substr(t.length-3)+"异常"),E({message:t,type:"error",duration:5*1e3}),Promise.reject(e)});function ge(){return k({url:"/ai/getUniqueId",method:"get"})}const Ee=(e,t)=>{const o=e.__vccOpts||e;for(const[i,s]of t)o[i]=s;return o},Se=e=>(oe("data-v-6554a31c"),e=e(),re(),e),ke={class:"app-container"},we={class:"ai-chat-page"},Ne={key:0,class:"avatar-wrapper"},be=Se(()=>S("img",{src:ve,class:"user-avatar"},null,-1)),Ce=[be],Ie={key:1,class:"avatar-wrapper"},Oe=["onClick"],Pe={key:2},je={__name:"App",setup(e){const t=m(""),o=m(""),i=m(""),s=m(!1),r=m([{role:"assistant",content:"你好,我是萌新助手,有什么想问的?"}]);let a=null;const w=window.speechSynthesis;let p=null;const _=m(!1);H(()=>{ge().then(n=>{t.value=n.data}),N()}),W(()=>{a&&(a.removeEventListener("message",g),a.close()),N.value&&O()});function N(){"speechSynthesis"in window?(_.value=!0,p=new SpeechSynthesisUtterance):_.value=!1}const g=n=>{if(n.data==="[DONE]"){a&&(a.removeEventListener("message",g),a.close()),r.value.push({role:"assistant",content:i.value}),i.value="",s.value=!1;return}const h=JSON.parse(n.data);i.value+=h.response},b=()=>{s.value||U(o.value)&&(r.value.push({role:"user",content:o.value}),a=new EventSource("/ai/sse?content="+encodeURI(o.value)+"&id="+t.value),a.addEventListener("message",g),o.value="",s.value=!0)},B=n=>n==="user"?"user-background":"ai-background",R=n=>n==="user",C=n=>n==="assistant";function I(n){_.value&&A(n)}function A(n){p.text=n,p.lang="zh-CN",p.volume=1,p.rate=2,p.pitch=1,O(),w.speak(p)}function O(){w.cancel()}return(n,h)=>{const D=ae,P=le,j=ce,F=ie,J=ue,K=pe,z=de,$=me,Q=fe;return d(),f("div",ke,[S("div",we,[l(Q,null,{default:c(()=>[l(J,{class:"chat-container"},{default:c(()=>[l(F,null,{default:c(()=>[(d(!0),f(X,null,Z(r.value,(u,Y)=>(d(),M(j,{key:Y},{default:c(()=>[l(P,{class:ee(B(u.role))},{default:c(()=>[R(u.role)?(d(),f("div",Ne,Ce)):v("",!0),C(u.role)?(d(),f("div",Ie,[S("img",{src:ye,class:"user-avatar",onClick:G=>I(u.content)},null,8,Oe)])):v("",!0),l(y(L),{source:u.content},null,8,["source"]),C(u.role)&&_.value?(d(),f("div",Pe,[l(D,{onClick:G=>I(u.content)},{default:c(()=>[l(y(he))]),_:2},1032,["onClick"])])):v("",!0)]),_:2},1032,["class"])]),_:2},1024))),128)),y(U)(i.value)?(d(),M(j,{key:0},{default:c(()=>[l(P,null,{default:c(()=>[l(y(L),{source:i.value},null,8,["source"])]),_:1})]),_:1})):v("",!0)]),_:1})]),_:1}),l($,{class:"input-container"},{default:c(()=>[l(z,{modelValue:o.value,"onUpdate:modelValue":h[0]||(h[0]=u=>o.value=u),placeholder:"请输入消息...",onKeyup:te(b,["enter","native"])},{append:c(()=>[l(K,{onClick:b},{default:c(()=>[se("发送")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})])])}}},x=Ee(je,[["__scopeId","data-v-6554a31c"]]),Me=q(x);Me.use(_e);q(x).mount("#app");