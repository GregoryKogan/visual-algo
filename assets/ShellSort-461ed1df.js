var k=Object.defineProperty;var P=(t,s,e)=>s in t?k(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e;var o=(t,s,e)=>(P(t,typeof s!="symbol"?s+"":s,e),e);import{P as v,V as d,a as l,b as c}from"./VSlider-c608493c.js";import{s as _}from"./shuffle-dbe9666a.js";import{s as f}from"./sleep-9eff569f.js";import{d as C,_ as V,o as m,f as S,j as i,i as r,w as g,t as p,k as w}from"./index-291fb8bf.js";/* empty css              */class y{constructor(s){o(this,"painter");o(this,"width");o(this,"height");o(this,"values");o(this,"n");o(this,"i");o(this,"j");o(this,"stepsPer10ms");o(this,"compsCounter");o(this,"stepsCounter");o(this,"finished");o(this,"curPid");this.painter=new v(s),this.width=s.width,this.height=s.height,this.values=[],this.n=100,this.i=0,this.j=0,this.stepsPer10ms=1,this.compsCounter=0,this.stepsCounter=0,this.finished=!1,this.curPid=0}setup(s){s&&(this.n=s.n,this.stepsPer10ms=Math.round(s.stepsPerSecond/100)),this.i=0,this.j=0,this.finished=!1,this.compsCounter=0,this.stepsCounter=0,this.values=[];for(let e=1;e<=this.n;++e)this.values.push(e);_(this.values),this.curPid++,this.shellSort(this.curPid)}async shellSort(s){if(s==this.curPid){for(let e=Math.floor(this.n/2);e>0;e=Math.floor(e/2))for(let a=e;a<this.n;a+=1){if(s!=this.curPid)return;this.compsCounter++,this.stepsCounter++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await f(10)),this.i=a;const h=this.values[a];let n;for(n=a;n>=e&&this.values[n-e]>h;n-=e){if(this.values[n]=this.values[n-e],this.j=n,s!=this.curPid)return;this.compsCounter++,this.stepsCounter++,this.stepsCounter%this.stepsPer10ms==0&&(this.renderValues(),await f(10))}this.values[n]=h}this.finished=!0,this.renderValues()}}renderValues(){this.painter.background("#282a36");const s=this.width/this.n,a=this.height/this.n;for(let h=0;h<this.n;++h){this.painter.setStrokeWeight(s+1),this.painter.stroke("#f8f8f2"),h==this.i?this.painter.stroke("#8be9fd"):h==this.j&&this.painter.stroke("#ffb86c"),(h==this.i||h==this.j)&&!this.finished&&this.painter.setStrokeWeight(Math.max(s+1,7)),this.finished&&this.painter.stroke("#50fa7b");const n=a*this.values[h];this.painter.line(h*s+s/2,this.height-n,h*s+s/2,this.height)}}}const b=C({name:"ShellSort",data:()=>({canvasWidth:2e3,canvasHeight:1125,sketch:{},n:100,stepsPerSecond:100}),mounted(){const t=document.getElementById("sketch");t&&v.isCanvas(t)&&(this.sketch=new y(t),this.sketch.setup())}});const j={class:"sort-page"},B=i("h1",{style:{"margin-top":"20px"}},[i("a",{href:"https://en.wikipedia.org/wiki/Shellsort"},"Shell Sort")],-1),H=i("h3",null,"Time complexity",-1),N=i("h3",null,"O(n²) - worst case",-1),W=i("h3",null,"O(n log n) - average",-1),$=i("h3",{style:{"margin-bottom":"20px"}},"Space complexity O(1)",-1),M={class:"stats"},O={key:0},T=["width","height"],z={class:"controls"},E={style:{"font-size":"large"}},U={style:{"font-size":"large"}};function A(t,s,e,a,h,n){return m(),S("div",j,[B,H,N,W,$,i("div",M,[r(d,null,{default:g(()=>[i("span",null,p(t.sketch.compsCounter)+" comparisons",1),r(l),t.sketch.values?(m(),S("span",O,"N: "+p(t.sketch.values.length),1)):w("",!0),r(l),i("span",null,"Steps per second: "+p(t.stepsPerSecond),1)]),_:1})]),i("canvas",{id:"sketch",width:t.canvasWidth,height:t.canvasHeight},null,8,T),i("div",z,[r(d,null,{default:g(()=>[i("button",{onClick:s[0]||(s[0]=u=>t.sketch.setup({n:t.n,stepsPerSecond:t.stepsPerSecond}))}," START "),r(l),i("span",E,"N: "+p(t.n),1),r(l),r(c,{modelValue:t.n,"onUpdate:modelValue":s[1]||(s[1]=u=>t.n=u),min:"10",max:"2000",step:"10",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"]),i("span",U,"Steps per second: "+p(t.stepsPerSecond),1),r(l),r(c,{modelValue:t.stepsPerSecond,"onUpdate:modelValue":s[2]||(s[2]=u=>t.stepsPerSecond=u),min:"100",max:"30000",step:"100",color:"#50fa7b","thumb-color":"#f8f8f2"},null,8,["modelValue"])]),_:1})])])}const G=V(b,[["render",A]]);export{G as default};