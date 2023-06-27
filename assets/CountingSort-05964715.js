var S=Object.defineProperty;var P=(s,t,i)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var o=(s,t,i)=>(P(s,typeof t!="symbol"?t+"":t,i),i);import{P as C,V as p,a as l,b as c}from"./VSlider-c608493c.js";import{s as v}from"./shuffle-dbe9666a.js";import{s as f}from"./sleep-9eff569f.js";import{d as _,_ as V,o as m,f as g,j as n,i as h,w as k,t as u,k as w}from"./index-291fb8bf.js";/* empty css              */class y{constructor(t){o(this,"painter");o(this,"width");o(this,"height");o(this,"values");o(this,"n");o(this,"i");o(this,"stepsPer10ms");o(this,"compsCounter");o(this,"stepsCounter");o(this,"finished");o(this,"curPid");this.painter=new C(t),this.width=t.width,this.height=t.height,this.values=[],this.n=100,this.i=0,this.stepsPer10ms=1,this.compsCounter=0,this.stepsCounter=0,this.finished=!1,this.curPid=0}setup(t){t&&(this.n=t.n,this.stepsPer10ms=Math.round(t.stepsPerSecond/100)),this.finished=!1,this.i=0,this.compsCounter=0,this.stepsCounter=0,this.values=[];for(let i=1;i<=this.n;++i)this.values.push(i);v(this.values),this.curPid++,this.countingSort(this.curPid)}async countingSort(t){if(t!=this.curPid)return;const i=new Array(this.n+1);for(let e=0;e<this.n+1;++e){if(t!=this.curPid)return;i[e]=0}for(let e=0;e<this.n;++e){if(t!=this.curPid)return;this.compsCounter++,this.stepsCounter++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await f(10)),this.i=e,i[this.values[e]]++}let r=0;for(let e=1;e<=this.n;++e)for(let a=0;a<i[e];++a){if(t!=this.curPid)return;this.compsCounter++,this.stepsCounter++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await f(10)),this.values[r]=e,r++,this.i=r}t==this.curPid&&(this.finished=!0,this.renderValues())}renderValues(){this.painter.background("#282a36");const t=this.width/this.n,r=this.height/this.n;for(let e=0;e<this.n;++e){this.painter.setStrokeWeight(t+1),this.painter.stroke("#f8f8f2"),e==this.i&&this.painter.stroke("#ff79c6"),e==this.i&&!this.finished&&this.painter.setStrokeWeight(Math.max(t+1,7)),this.finished&&this.painter.stroke("#50fa7b");const a=r*this.values[e];this.painter.line(e*t+t/2,this.height-a,e*t+t/2,this.height)}}}const b=_({name:"CountingSort",data:()=>({canvasWidth:2e3,canvasHeight:1125,sketch:{},n:100,stepsPerSecond:100}),mounted(){const s=document.getElementById("sketch");s&&C.isCanvas(s)&&(this.sketch=new y(s),this.sketch.setup())}});const H={class:"sort-page"},N=n("h1",{style:{"margin-top":"20px"}},[n("a",{href:"https://en.wikipedia.org/wiki/Counting_sort"},"Counting Sort")],-1),W=n("h3",null,"Time complexity O(n + k)",-1),$=n("h3",null,"Space complexity O(n + k)",-1),B=n("h3",{style:{"margin-bottom":"20px"}}," k - range of the non-negative key values ",-1),T={class:"stats"},j={key:0},z=["width","height"],A={class:"controls"},E={style:{"font-size":"large"}},M={style:{"font-size":"large"}};function O(s,t,i,r,e,a){return m(),g("div",H,[N,W,$,B,n("div",T,[h(p,null,{default:k(()=>[n("span",null,u(s.sketch.compsCounter)+" comparisons",1),h(l),s.sketch.values?(m(),g("span",j,"N: "+u(s.sketch.values.length),1)):w("",!0),h(l),n("span",null,"Steps per second: "+u(s.stepsPerSecond),1)]),_:1})]),n("canvas",{id:"sketch",width:s.canvasWidth,height:s.canvasHeight},null,8,z),n("div",A,[h(p,null,{default:k(()=>[n("button",{onClick:t[0]||(t[0]=d=>s.sketch.setup({n:s.n,stepsPerSecond:s.stepsPerSecond}))}," START "),h(l),n("span",E,"N: "+u(s.n),1),h(l),h(c,{modelValue:s.n,"onUpdate:modelValue":t[1]||(t[1]=d=>s.n=d),min:"10",max:"2000",step:"10",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"]),n("span",M,"Steps per second: "+u(s.stepsPerSecond),1),h(l),h(c,{modelValue:s.stepsPerSecond,"onUpdate:modelValue":t[2]||(t[2]=d=>s.stepsPerSecond=d),min:"100",max:"5000",step:"100",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"])]),_:1})])])}const G=V(b,[["render",O]]);export{G as default};