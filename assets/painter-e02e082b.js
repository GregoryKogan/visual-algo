var b=Object.defineProperty;var C=(e,t,s)=>t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var r=(e,t,s)=>(C(e,typeof t!="symbol"?t+"":t,s),s);/* empty css              */import{g as d,e as c,n as P,m as g,h as S,b as h,p as F,a as N,c as W}from"./index-c9176d23.js";function V(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",s=arguments.length>2?arguments[2]:void 0;return d()({name:s??c(P(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...g()},setup(i,l){let{slots:o}=l;return()=>{var n;return S(i.tag,{class:[e,i.class],style:i.style},(n=o.default)==null?void 0:n.call(o))}}})}const k=(()=>h.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}))(),x=(()=>h.reduce((e,t)=>{const s="offset"+c(t);return e[s]={type:[String,Number],default:null},e},{}))(),m=(()=>h.reduce((e,t)=>{const s="order"+c(t);return e[s]={type:[String,Number],default:null},e},{}))(),u={col:Object.keys(k),offset:Object.keys(x),order:Object.keys(m)};function w(e,t,s){let i=e;if(!(s==null||s===!1)){if(t){const l=t.replace(e,"");i+=`-${l}`}return e==="col"&&(i="v-"+i),e==="col"&&(s===""||s===!0)||(i+=`-${s}`),i.toLowerCase()}}const v=["auto","start","end","center","baseline","stretch"],L=F({cols:{type:[Boolean,String,Number],default:!1},...k,offset:{type:[String,Number],default:null},...x,order:{type:[String,Number],default:null},...m,alignSelf:{type:String,default:null,validator:e=>v.includes(e)},...g(),...N()},"VCol"),E=d()({name:"VCol",props:L(),setup(e,t){let{slots:s}=t;const i=W(()=>{const l=[];let o;for(o in u)u[o].forEach(a=>{const y=e[a],f=w(o,a,y);f&&l.push(f)});const n=l.some(a=>a.startsWith("v-col-"));return l.push({"v-col":!n||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),l});return()=>{var l;return S(e.tag,{class:[i.value,e.class],style:e.style},(l=s.default)==null?void 0:l.call(s))}}}),T=V("flex-grow-1","div","VSpacer");class _{constructor(t){r(this,"canvas");r(this,"ctx");r(this,"width");r(this,"height");r(this,"doFill");r(this,"fillStyle");r(this,"doStroke");r(this,"strokeStyle");r(this,"strokeWeight");r(this,"font");this.canvas=t,this.ctx=t.getContext("2d"),this.ctx&&(this.ctx.imageSmoothingEnabled=!1),this.width=t.width,this.height=t.height,this.doFill=!1,this.fillStyle="#ffffff",this.doStroke=!1,this.strokeStyle="#000000",this.strokeWeight=1,this.font="30px Arial"}static isCanvas(t){return t.tagName==="CANVAS"}background(t){this.ctx&&(this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.width,this.height))}fill(t){this.doFill=!0,this.fillStyle=t}noFill(){this.doFill=!1}stroke(t){this.doStroke=!0,this.strokeStyle=t}noStroke(){this.doStroke=!1}setStrokeWeight(t){this.strokeWeight=t}setFont(t){this.font=t}circle(t,s,i){this.ctx&&(this.ctx.beginPath(),this.ctx.arc(t,s,i,0,2*Math.PI,!1),this.doFill&&(this.ctx.fillStyle=this.fillStyle,this.ctx.fill()),this.doStroke&&(this.ctx.lineWidth=this.strokeWeight,this.ctx.strokeStyle=this.strokeStyle,this.ctx.stroke()))}rect(t,s,i,l){this.ctx&&(this.ctx.beginPath(),this.ctx.rect(t,s,i,l),this.doFill&&(this.ctx.fillStyle=this.fillStyle,this.ctx.fill()),this.doStroke&&(this.ctx.lineWidth=this.strokeWeight,this.ctx.strokeStyle=this.strokeStyle,this.ctx.stroke()))}line(t,s,i,l){this.ctx&&(this.ctx.lineWidth=this.strokeWeight,this.ctx.strokeStyle=this.strokeStyle,this.ctx.beginPath(),this.ctx.moveTo(t,s),this.ctx.lineTo(i,l),this.ctx.stroke())}text(t,s,i){var l;(l=this.ctx)==null||l.fillText(t,s,i)}}export{_ as P,E as V,T as a};
