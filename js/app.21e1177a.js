(function(t){function e(e){for(var n,c,o=e[0],s=e[1],u=e[2],h=0,p=[];h<o.length;h++)c=o[h],r[c]&&p.push(r[c][0]),r[c]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var s=a[o];0!==r[s]&&(n=!1)}n&&(i.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},r={app:0},i=[];function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/hoo-gan-shi/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=s;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"0ca6":function(t,e,a){},"29fb":function(t,e,a){"use strict";var n=a("0ca6"),r=a.n(n);r.a},"5b24":function(t,e,a){},"5c0b":function(t,e,a){"use strict";var n=a("5e27"),r=a.n(n);r.a},"5e27":function(t,e,a){},"6ab2":function(t,e,a){},"70f1":function(t,e,a){"use strict";var n=a("6ab2"),r=a.n(n);r.a},"88da":function(t,e,a){"use strict";var n=a("a7d6"),r=a.n(n);r.a},"8ac7":function(t,e,a){},a7d6:function(t,e,a){},c590:function(t,e,a){"use strict";var n=a("5b24"),r=a.n(n);r.a},cd49:function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Desk")},i=[],c=a("d225"),o=a("308d"),s=a("6bb5"),u=a("4e2b"),l=a("9ab4"),h=a("60a3"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("PaperInput"),n("svg",{attrs:{viewBox:"0 0 1200 460",tabindex:"-1"}},[t._l(t.pages,function(t,e){return n("g",{key:e,attrs:{transform:"translate(0, 30)"}},[n("image",{attrs:{"xlink:href":a("fdc9"),width:"640",height:"430",preserveAspectRatio:"none",y:"-15",x:945-655*e}}),n("Paper",{tag:"g",attrs:{transform:"translate("+(960-655*e)+", 0)",characters:t}})],1)}),n("PaperCaret",{tag:"g",attrs:{transform:"translate(885, 30)"}})],2)],1)},f=[],d=a("75fc"),v=a("b0b4"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("g",{attrs:{transform:"translate(305, 0)"}},[a("rect",{staticClass:"bound",attrs:{height:"400",width:"610"}}),t._l(t.lines,function(t,e){return a("PaperLine",{key:e,tag:"g",attrs:{characters:t,index:e}})})],2)},m=[],g=(a("ac6a"),a("5df3"),a("1c4c"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("g",{attrs:{transform:"translate("+(600-30*t.index)+", 0)"}},[a("path",{attrs:{d:"m-20 0v400"}}),a("path",{attrs:{d:"m0 0v400"}}),t._l(t.characters,function(e,n){return a("g",{key:e.id,staticClass:"char",attrs:{transform:"translate(-20, "+20*n+")"},on:{click:function(a){return t.moveTo(e)}}},[a("rect",{attrs:{"fill-opacity":"0",width:"20",height:n===t.characters.length-1?20*(20-n):20}}),a("text",{attrs:{x:"10"}},[t._v(t._s(e.value))])])}),t._l(19,function(t,e){return a("g",{key:e},[a("path",{attrs:{d:"m-20 "+20*t+"h20"}})])})],2)}),y=[],O=function(t){function e(){return Object(c["a"])(this,e),Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),Object(v["a"])(e,[{key:"moveTo",value:function(t){this.$store.dispatch("moveTo",t)}}]),e}(h["c"]);l["a"]([Object(h["b"])()],O.prototype,"characters",void 0),l["a"]([Object(h["b"])()],O.prototype,"index",void 0),O=l["a"]([Object(h["a"])({})],O);var j=O,x=j,k=(a("29fb"),a("2877")),w=Object(k["a"])(x,g,y,!1,null,"52800686",null),C=w.exports,P=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.lines=Array.from(Array(20),function(){return[]}),t}return Object(u["a"])(e,t),Object(v["a"])(e,[{key:"updateCharacters",value:function(t,e){var a=this,n=(t[0]||{}).line||0;this.lines=Array.from(Array(20),function(){return[]}),t.forEach(function(t){return a.lines[t.line-n].push(t)})}},{key:"script",get:function(){return this.$store.state.script}}]),e}(h["c"]);l["a"]([Object(h["b"])()],P.prototype,"characters",void 0),l["a"]([Object(h["d"])("characters")],P.prototype,"updateCharacters",null),P=l["a"]([Object(h["a"])({components:{PaperLine:C}})],P);var S=P,A=S,T=(a("70f1"),Object(k["a"])(A,b,m,!1,null,"cd19d8bc",null)),_=T.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("g",{directives:[{name:"show",rawName:"v-show",value:t.caret.visibled,expression:"caret.visibled"}],staticClass:"caret",class:{"no-animate":t.noAnimate},on:{transitionstart:function(e){t.noAnimate=!0},transitionend:function(e){t.noAnimate=!1}}},[a("g",{attrs:{transform:t.transform}},[a("path",{attrs:{d:"m-1 -4v8"}}),a("path",{attrs:{d:"m21 -4v8"}}),a("path",{attrs:{d:"m-1 0h22"}})])])},L=[],E=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.noAnimate=!1,t}return Object(u["a"])(e,t),Object(v["a"])(e,[{key:"onSelectionStartChange",value:function(t,e){var a=this;this.noAnimate=!0,requestAnimationFrame(function(){return a.noAnimate=!1})}},{key:"caret",get:function(){return this.$store.state.caret}},{key:"transform",get:function(){return"translate(".concat(this.caret.x,", ").concat(this.caret.y,")")}}]),e}(h["c"]);l["a"]([Object(h["d"])("caret.selectionStart")],E.prototype,"onSelectionStartChange",null),E=l["a"]([Object(h["a"])({})],E);var M=E,R=M,G=(a("88da"),Object(k["a"])(R,$,L,!1,null,"3730890c",null)),Y=G.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("textarea",{ref:"textarea",staticClass:"input-area",style:t.position,attrs:{autofocus:""},domProps:{value:t.script.raw},on:{keydown:t.arrowManipulation,keyup:t.updateScript,blur:t.updateCaretVisibled,focus:t.updateCaretVisibled,compositionend:t.moveTo}})},U=[],I=(a("6762"),["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"]),V=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.position="left: 33%; top: 33%",t}return Object(u["a"])(e,t),Object(v["a"])(e,[{key:"mounted",value:function(){this.textarea.setSelectionRange(this.caret.selectionStart,this.caret.selectionStart)}},{key:"onClientRectChange",value:function(t,e){var a=t>-200?50:t>-400?66:50;this.position="left: ".concat(a,"%; top: 33%;")}},{key:"onPositionChange",value:function(t,e){this.textarea.setSelectionRange(t,t),this.textarea.focus()}},{key:"moveTo",value:function(t){var e=t.target;this.$store.dispatch("moveTo",e.selectionStart)}},{key:"updateScript",value:function(t){t.target.value!==this.script.raw&&(this.$store.dispatch("script",t.target.value),this.moveTo(t))}},{key:"updateCaretVisibled",value:function(){var t=this;requestAnimationFrame(function(){document.activeElement instanceof SVGElement&&t.textarea.focus();var e=t.textarea===document.activeElement;t.$store.commit("caret",{visibled:e})})}},{key:"arrowManipulation",value:function(t){I.includes(t.key)&&(t.preventDefault(),"ArrowUp"===t.key&&this.$store.dispatch("moveToBeforeCell"),"ArrowDown"===t.key&&this.$store.dispatch("moveToAfterCell"),"ArrowRight"===t.key&&this.$store.dispatch("moveToRightCell"),"ArrowLeft"===t.key&&this.$store.dispatch("moveToLeftCell"))}},{key:"caret",get:function(){return this.$store.state.caret}},{key:"script",get:function(){return this.$store.state.script}},{key:"textarea",get:function(){return this.$refs.textarea}}]),e}(h["c"]);l["a"]([Object(h["d"])("caret.x")],V.prototype,"onClientRectChange",null),l["a"]([Object(h["d"])("caret.char.position")],V.prototype,"onPositionChange",null),V=l["a"]([Object(h["a"])({})],V);var B=V,F=B,q=(a("f60d"),Object(k["a"])(F,D,U,!1,null,"72735945",null)),J=q.exports,N=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.rightCharacters=[],t.centerCharacters=[],t.leftCharacters=[],t.pages=[[],[],[]],t.pageGap=0,t}return Object(u["a"])(e,t),Object(v["a"])(e,[{key:"mounted",value:function(){this.detectPages()}},{key:"lineUpdate",value:function(t,e){this.pageGap=20*Math.floor(t/20)}},{key:"pageGapUpdate",value:function(t,e){this.detectPages()}},{key:"detectPages",value:function(t,e){var a,n,r,i=this,c=function(t){t+=i.pageGap;var e=null==i.script.linePositionList[t]?1/0:i.script.linePositionList[t],a=i.script.linePositionList[t+20]||1/0;return i.script.characters.slice(e,a)};(a=this.rightCharacters).splice.apply(a,[0,1/0].concat(Object(d["a"])(c(-20)))),(n=this.centerCharacters).splice.apply(n,[0,1/0].concat(Object(d["a"])(c(0)))),(r=this.leftCharacters).splice.apply(r,[0,1/0].concat(Object(d["a"])(c(20)))),this.pages=[this.rightCharacters,this.centerCharacters,this.leftCharacters]}},{key:"script",get:function(){return this.$store.state.script}},{key:"caret",get:function(){return this.$store.state.caret}},{key:"charaLength",get:function(){return this.script.characters.length}}]),e}(h["c"]);l["a"]([Object(h["d"])("caret.char.line")],N.prototype,"lineUpdate",null),l["a"]([Object(h["d"])("pageGap")],N.prototype,"pageGapUpdate",null),l["a"]([Object(h["d"])("script.raw")],N.prototype,"detectPages",null),N=l["a"]([Object(h["a"])({components:{Paper:_,PaperCaret:Y,PaperInput:J}})],N);var z=N,H=z,K=(a("c590"),Object(k["a"])(H,p,f,!1,null,"52371c44",null)),Q=K.exports,W=function(t){function e(){return Object(c["a"])(this,e),Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),e}(h["c"]);W=l["a"]([Object(h["a"])({components:{Desk:Q}})],W);var X=W,Z=X,tt=(a("5c0b"),Object(k["a"])(Z,r,i,!1,null,null,null)),et=tt.exports,at=a("2f62"),nt=/[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～？！?!‼⁇⁈⁉・:;。.\x2F]/,rt=function t(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(c["a"])(this,t),this.char=new it,this.internalY=0,this.visibled=!1,this.selectionStart=0,this.x=0,this.y=0,this.update=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(e,t),e},Object.assign(this,a)},it=function t(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(c["a"])(this,t),this.beforeChar={},this.br=!1,this.characters=[],this.index=0,this.line=0,this.lineStartProhivition=!1,this.position=0,this.value="",this.id="".concat(this.line,"-").concat(this.index,"-").concat(this.value),this.update=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.value,a=e.characters[e.position-1]||{};if(e.beforeChar.id===a.id)return e;e.beforeChar=a,e.value=t,e.lineStartProhivition=nt.test(t),e.position=a.position+1,(a.index>=19&&!e.lineStartProhivition||"\n"===a.value)&&(a.br=!0),a.br?(e.line=a.line+1,e.index=0):(e.line=a.line,e.index=a.index+1),e.id="".concat(e.line,"-").concat(e.index,"-").concat(e.value);var n=e.characters[e.position+1];return n&&n.update(),e},Object.assign(this,a)},ct=function t(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(c["a"])(this,t),this.characters=[],this.linePositionList=[0],this.raw="",this.update=function(t){localStorage.setItem("script",e.raw=t),e.characters=[],e.linePositionList=[0];var a=0;return Array.from(t+"\n",function(t,n){var r=new it({characters:e.characters,value:t,position:n});e.characters.push(r),r.update(),a<r.line&&(a=a+1|0,e.linePositionList.push(r.position))}),e},Object.assign(this,a)};n["a"].use(at["a"]);var ot=new at["a"].Store({state:{caret:new rt,script:(new ct).update(localStorage.getItem("script")||"")},mutations:{caret:function(t,e){t.caret.update(e)},script:function(t,e){t.script.update(e)}},actions:{script:function(t,e){t.commit("script",e)},moveTo:function(t,e){var a=t.state.script.characters,n="number"===typeof e?a[e]:e;if(null!=n){var r=n.line%20*-30,i=20*n.index,c=n.index,o=n.position;t.commit("caret",{char:n,internalY:c,selectionStart:o,x:r,y:i})}},moveToRightCell:function(t){var e=t.state.script.linePositionList,a=t.state.script.characters,n=t.state.caret.char,r=t.state.caret.internalY,i=e[n.line-1]||0,c=Math.max(n.position-n.index-1,0),o=a[c]||new it,s=Math.min(o.index,r),u=i+s;t.dispatch("moveTo",u).then(function(){return t.commit("caret",{internalY:r})})},moveToLeftCell:function(t){var e=t.state.script.linePositionList,a=t.state.script.characters,n=t.state.caret.char,r=t.state.caret.internalY,i=e[n.line+1];if(null!=i){var c=e[n.line+2]||a.length,o=a[c-1],s=Math.min(o.index,r),u=i+s;t.dispatch("moveTo",u).then(function(){return t.commit("caret",{internalY:r})})}else t.dispatch("moveTo",a[a.length-1]).then(function(){return t.commit("caret",{internalY:r})})},moveToBeforeCell:function(t){t.dispatch("moveTo",t.state.caret.char.position-1)},moveToAfterCell:function(t){t.dispatch("moveTo",t.state.caret.char.position+1)}}});n["a"].config.productionTip=!1,new n["a"]({store:ot,render:function(t){return t(et)}}).$mount("#app")},f60d:function(t,e,a){"use strict";var n=a("8ac7"),r=a.n(n);r.a},fdc9:function(t,e,a){t.exports=a.p+"img/paper-texture.515175d5.png"}});