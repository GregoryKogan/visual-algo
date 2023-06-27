var y=Object.defineProperty;var b=(s,t,e)=>t in s?y(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var r=(s,t,e)=>(b(s,typeof t!="symbol"?t+"":t,e),e);import{P as _,V as S,a as f,b as k}from"./VSlider-c608493c.js";import{s as M}from"./shuffle-dbe9666a.js";import{s as m}from"./sleep-9eff569f.js";import{d as H,_ as N,o as v,f as w,j as n,i as l,w as V,t as g,k as W}from"./index-291fb8bf.js";/* empty css              */class ${constructor(t){r(this,"painter");r(this,"width");r(this,"height");r(this,"values");r(this,"n");r(this,"l");r(this,"m");r(this,"r");r(this,"stepsPer10ms");r(this,"compsCounter");r(this,"stepsCounter");r(this,"finished");r(this,"curPid");this.painter=new _(t),this.width=t.width,this.height=t.height,this.values=[],this.n=100,this.l=0,this.m=0,this.r=0,this.stepsPer10ms=1,this.compsCounter=0,this.stepsCounter=0,this.finished=!1,this.curPid=0}setup(t){t&&(this.n=t.n,this.stepsPer10ms=Math.round(t.stepsPerSecond/100)),this.finished=!1,this.compsCounter=0,this.stepsCounter=0,this.l=0,this.m=0,this.r=0,this.values=[];for(let e=1;e<=this.n;++e)this.values.push(e);M(this.values),this.curPid++,this.mergeSort(this.curPid,0,this.n-1,!0)}async mergeSort(t,e,h,i=!1){if(t!=this.curPid||(this.stepsCounter++,this.compsCounter++,e>=h))return;const o=e+Math.floor((h-e)/2);await this.mergeSort(t,e,o),t==this.curPid&&(await this.mergeSort(t,o+1,h),t==this.curPid&&(await this.merge(t,e,o,h),t==this.curPid&&i&&(this.finished=!0,this.renderValues())))}async merge(t,e,h,i){if(t!=this.curPid)return;this.l=e,this.m=h,this.r=i,this.stepsCounter++;const o=h-e+1,a=i-h,P=new Array(o),C=new Array(a);for(let u=0;u<o;u++){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,P[u]=this.values[e+u],this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(let u=0;u<a;u++){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,C[u]=this.values[h+1+u],this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}let p=0,c=0,d=e;for(;p<o&&c<a;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,P[p]<=C[c]?(this.values[d]=P[p],p++):(this.values[d]=C[c],c++),d++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(;p<o;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,this.values[d]=P[p],p++,d++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}for(;c<a;){if(t!=this.curPid)return;this.stepsCounter++,this.compsCounter++,this.values[d]=C[c],c++,d++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await m(10))}}renderValues(){this.painter.background("#282a36");const t=this.width/this.n,h=this.height/this.n;for(let i=0;i<this.n;++i){this.painter.setStrokeWeight(t+1),this.painter.stroke("#f8f8f2"),i==this.l?this.painter.stroke("#ff79c6"):i==this.m?this.painter.stroke("#ff5555"):i==this.r&&this.painter.stroke("#ff79c6"),(i==this.l||i==this.m||i==this.r)&&!this.finished&&this.painter.setStrokeWeight(Math.max(t+1,7)),this.finished&&this.painter.stroke("#50fa7b");const o=h*this.values[i];this.painter.line(i*t+t/2,this.height-o,i*t+t/2,this.height)}}}const B=H({name:"MergeSort",data:()=>({canvasWidth:2e3,canvasHeight:1125,sketch:{},n:100,stepsPerSecond:100}),mounted(){const s=document.getElementById("sketch");s&&_.isCanvas(s)&&(this.sketch=new $(s),this.sketch.setup())}});const j={class:"sort-page"},A=n("h1",{style:{"margin-top":"20px"}},[n("a",{href:"https://en.wikipedia.org/wiki/Merge_sort"},"Merge Sort")],-1),T=n("h3",null,"Time complexity O(n log n)",-1),z=n("h3",{style:{"margin-bottom":"20px"}},"Space complexity O(n)",-1),E={class:"stats"},O={key:0},R=["width","height"],U={class:"controls"},D={style:{"font-size":"large"}},I={style:{"font-size":"large"}};function L(s,t,e,h,i,o){return v(),w("div",j,[A,T,z,n("div",E,[l(S,null,{default:V(()=>[n("span",null,g(s.sketch.compsCounter)+" comparisons",1),l(f),s.sketch.values?(v(),w("span",O,"N: "+g(s.sketch.values.length),1)):W("",!0),l(f),n("span",null,"Steps per second: "+g(s.stepsPerSecond),1)]),_:1})]),n("canvas",{id:"sketch",width:s.canvasWidth,height:s.canvasHeight},null,8,R),n("div",U,[l(S,null,{default:V(()=>[n("button",{onClick:t[0]||(t[0]=a=>s.sketch.setup({n:s.n,stepsPerSecond:s.stepsPerSecond}))}," START "),l(f),n("span",D,"N: "+g(s.n),1),l(f),l(k,{modelValue:s.n,"onUpdate:modelValue":t[1]||(t[1]=a=>s.n=a),min:"10",max:"2000",step:"10",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"]),n("span",I,"Steps per second: "+g(s.stepsPerSecond),1),l(f),l(k,{modelValue:s.stepsPerSecond,"onUpdate:modelValue":t[2]||(t[2]=a=>s.stepsPerSecond=a),min:"100",max:"30000",step:"100",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"])]),_:1})])])}const X=N(B,[["render",L]]);export{X as default};
