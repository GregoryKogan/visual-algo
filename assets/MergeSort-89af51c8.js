var M=Object.defineProperty;var H=(s,t,e)=>t in s?M(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var n=(s,t,e)=>(H(s,typeof t!="symbol"?t+"":t,e),e);import{P as V,V as v,a as f}from"./painter-e02e082b.js";import{s as N}from"./shuffle-dbe9666a.js";import{s as m}from"./sleep-9eff569f.js";import{d as W,_ as $,o as w,f as k,j as r,i as d,w as S,t as g,k as b,l as y,v as _}from"./index-c9176d23.js";/* empty css              */class B{constructor(t){n(this,"painter");n(this,"width");n(this,"height");n(this,"values");n(this,"n");n(this,"l");n(this,"m");n(this,"r");n(this,"stepsPer10ms");n(this,"compsCounter");n(this,"stepsCounter");n(this,"finished");n(this,"curPid");this.painter=new V(t),this.width=t.width,this.height=t.height,this.values=[],this.n=100,this.l=0,this.m=0,this.r=0,this.stepsPer10ms=1,this.compsCounter=0,this.stepsCounter=0,this.finished=!1,this.curPid=0}setup(t){t&&(this.n=t.n,this.stepsPer10ms=Math.round(t.stepsPerSecond/100)),this.finished=!1,this.compsCounter=0,this.stepsCounter=0,this.l=0,this.m=0,this.r=0,this.values=[];for(let e=1;e<=this.n;++e)this.values.push(e);N(this.values),this.curPid++,this.mergeSort(this.curPid,0,this.n-1,!0)}async mergeSort(t,e,h,i=!1){if(t!=this.curPid||(this.stepsCounter++,this.compsCounter++,e>=h))return;const o=e+Math.floor((h-e)/2);await this.mergeSort(t,e,o),t==this.curPid&&(await this.mergeSort(t,o+1,h),t==this.curPid&&(await this.merge(t,e,o,h),t==this.curPid&&i&&(this.finished=!0,this.renderValues())))}async merge(t,e,h,i){if(t!=this.curPid)return;this.l=e,this.m=h,this.r=i,this.stepsCounter++;const o=h-e+1,a=i-h,P=new Array(o),C=new Array(a);for(let u=0;u<o;u++){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,P[u]=this.values[e+u],this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(let u=0;u<a;u++){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,C[u]=this.values[h+1+u],this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}let l=0,p=0,c=e;for(;l<o&&p<a;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,P[l]<=C[p]?(this.values[c]=P[l],l++):(this.values[c]=C[p],p++),c++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(;l<o;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,this.values[c]=P[l],l++,c++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(;p<a;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,this.values[c]=C[p],p++,c++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}}renderValues(){this.painter.background("#282a36");const t=this.width/this.n,h=this.height/this.n;for(let i=0;i<this.n;++i){this.painter.setStrokeWeight(t+1),this.painter.stroke("#f8f8f2"),i==this.l?this.painter.stroke("#ff79c6"):i==this.m?this.painter.stroke("#ff5555"):i==this.r&&this.painter.stroke("#ff79c6"),(i==this.l||i==this.m||i==this.r)&&!this.finished&&this.painter.setStrokeWeight(Math.max(t+1,7)),this.finished&&this.painter.stroke("#50fa7b");const o=h*this.values[i];this.painter.line(i*t+t/2,this.height-o,i*t+t/2,this.height)}}}const T=W({name:"MergeSort",data:()=>({canvasWidth:2e3,canvasHeight:1125,sketch:{},n:100,stepsPerSecond:100}),mounted(){const s=document.getElementById("sketch");s&&V.isCanvas(s)&&(this.sketch=new B(s),this.sketch.setup())}});const j={class:"sort-page"},x=r("h1",{style:{"margin-top":"20px"}},[r("a",{href:"https://en.wikipedia.org/wiki/Merge_sort"},"Merge Sort")],-1),A=r("h3",null,"Time complexity O(n log n)",-1),z=r("h3",{style:{"margin-bottom":"20px"}},"Space complexity O(n)",-1),D={class:"stats"},E={key:0},O=["width","height"],R={class:"controls"},U={style:{"font-size":"large"}},I=r("div",{style:{height:"20px"}},null,-1),L={style:{"font-size":"large"}};function q(s,t,e,h,i,o){return w(),k("div",j,[x,A,z,r("div",D,[d(v,null,{default:S(()=>[r("span",null,g(s.sketch.compsCounter)+" comparisons",1),d(f),s.sketch.values?(w(),k("span",E,"N: "+g(s.sketch.values.length),1)):b("",!0),d(f),r("span",null,"Steps per second: "+g(s.stepsPerSecond),1)]),_:1})]),r("canvas",{id:"sketch",width:s.canvasWidth,height:s.canvasHeight},null,8,O),r("div",R,[d(v,null,{default:S(()=>[r("button",{onClick:t[0]||(t[0]=a=>s.sketch.setup({n:s.n,stepsPerSecond:s.stepsPerSecond}))}," START "),d(f),r("span",U,"N: "+g(s.n),1),d(f),y(r("input",{style:{width:"min(100%, 800px)"},"onUpdate:modelValue":t[1]||(t[1]=a=>s.n=a),type:"range",min:"10",max:"2000",step:"10"},null,512),[[_,s.n]]),I,r("span",L,"Steps per second: "+g(s.stepsPerSecond),1),d(f),y(r("input",{style:{width:"min(100%, 800px)"},"onUpdate:modelValue":t[2]||(t[2]=a=>s.stepsPerSecond=a),type:"range",min:"100",max:"30000",step:"100"},null,512),[[_,s.stepsPerSecond]])]),_:1})])])}const Y=$(T,[["render",q]]);export{Y as default};
