(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function fe(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var q={exports:{}},le;/**
* @link https://github.com/gajus/sister for the canonical source repository
* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
*/le=function(){var t={},e={};return t.on=function(n,r){var l={name:n,handler:r};return e[n]=e[n]||[],e[n].unshift(l),l},t.off=function(n){var r=e[n.name].indexOf(n);r!==-1&&e[n.name].splice(r,1)},t.trigger=function(n,r){var l=e[n],o;if(l)for(o=l.length;o--;)l[o].handler(r)},t};var ye=le,$={exports:{}},ve=function(e,n,r){var l=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script");typeof n=="function"&&(r=n,n={}),n=n||{},r=r||function(){},o.type=n.type||"text/javascript",o.charset=n.charset||"utf8",o.async="async"in n?!!n.async:!0,o.src=e,n.attrs&&ge(o,n.attrs),n.text&&(o.text=""+n.text);var f="onload"in o?ie:pe;f(o,r),o.onload||ie(o,r),l.appendChild(o)};function ge(t,e){for(var n in e)t.setAttribute(n,e[n])}function ie(t,e){t.onload=function(){this.onerror=this.onload=null,e(null,t)},t.onerror=function(){this.onerror=this.onload=null,e(new Error("Failed to load "+this.src),t)}}function pe(t,e){t.onreadystatechange=function(){this.readyState!="complete"&&this.readyState!="loaded"||(this.onreadystatechange=null,e(null,t))}}(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=ve,r=l(n);function l(o){return o&&o.__esModule?o:{default:o}}e.default=function(o){var f=new Promise(function(v){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function){v(window.YT);return}else{var s=window.location.protocol==="http:"?"http:":"https:";(0,r.default)(s+"//www.youtube.com/iframe_api",function(a){a&&o.trigger("error",a)})}var u=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){u&&u(),v(window.YT)}});return f},t.exports=e.default})($,$.exports);var Q={exports:{}},z={exports:{}},G={exports:{}},B=1e3,k=B*60,R=k*60,V=R*24,me=V*365.25,he=function(t,e){e=e||{};var n=typeof t;if(n==="string"&&t.length>0)return we(t);if(n==="number"&&isNaN(t)===!1)return e.long?Ee(t):be(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function we(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(!!e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*me;case"days":case"day":case"d":return n*V;case"hours":case"hour":case"hrs":case"hr":case"h":return n*R;case"minutes":case"minute":case"mins":case"min":case"m":return n*k;case"seconds":case"second":case"secs":case"sec":case"s":return n*B;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function be(t){return t>=V?Math.round(t/V)+"d":t>=R?Math.round(t/R)+"h":t>=k?Math.round(t/k)+"m":t>=B?Math.round(t/B)+"s":t+"ms"}function Ee(t){return F(t,V,"day")||F(t,R,"hour")||F(t,k,"minute")||F(t,B,"second")||t+" ms"}function F(t,e,n){if(!(t<e))return t<e*1.5?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}(function(t,e){e=t.exports=l.debug=l.default=l,e.coerce=s,e.disable=f,e.enable=o,e.enabled=v,e.humanize=he,e.names=[],e.skips=[],e.formatters={};var n;function r(u){var a=0,i;for(i in u)a=(a<<5)-a+u.charCodeAt(i),a|=0;return e.colors[Math.abs(a)%e.colors.length]}function l(u){function a(){if(!!a.enabled){var i=a,c=+new Date,y=c-(n||c);i.diff=y,i.prev=n,i.curr=c,n=c;for(var d=new Array(arguments.length),p=0;p<d.length;p++)d[p]=arguments[p];d[0]=e.coerce(d[0]),typeof d[0]!="string"&&d.unshift("%O");var g=0;d[0]=d[0].replace(/%([a-zA-Z%])/g,function(m,b){if(m==="%%")return m;g++;var w=e.formatters[b];if(typeof w=="function"){var M=d[g];m=w.call(i,M),d.splice(g,1),g--}return m}),e.formatArgs.call(i,d);var h=a.log||e.log||console.log.bind(console);h.apply(i,d)}}return a.namespace=u,a.enabled=e.enabled(u),a.useColors=e.useColors(),a.color=r(u),typeof e.init=="function"&&e.init(a),a}function o(u){e.save(u),e.names=[],e.skips=[];for(var a=(typeof u=="string"?u:"").split(/[\s,]+/),i=a.length,c=0;c<i;c++)!a[c]||(u=a[c].replace(/\*/g,".*?"),u[0]==="-"?e.skips.push(new RegExp("^"+u.substr(1)+"$")):e.names.push(new RegExp("^"+u+"$")))}function f(){e.enable("")}function v(u){var a,i;for(a=0,i=e.skips.length;a<i;a++)if(e.skips[a].test(u))return!1;for(a=0,i=e.names.length;a<i;a++)if(e.names[a].test(u))return!0;return!1}function s(u){return u instanceof Error?u.stack||u.message:u}})(G,G.exports);(function(t,e){e=t.exports=G.exports,e.log=l,e.formatArgs=r,e.save=o,e.load=f,e.useColors=n,e.storage=typeof chrome<"u"&&typeof chrome.storage<"u"?chrome.storage.local:v(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function n(){return typeof window<"u"&&window.process&&window.process.type==="renderer"?!0:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}e.formatters.j=function(s){try{return JSON.stringify(s)}catch(u){return"[UnexpectedJSONParseError]: "+u.message}};function r(s){var u=this.useColors;if(s[0]=(u?"%c":"")+this.namespace+(u?" %c":" ")+s[0]+(u?"%c ":" ")+"+"+e.humanize(this.diff),!!u){var a="color: "+this.color;s.splice(1,0,a,"color: inherit");var i=0,c=0;s[0].replace(/%[a-zA-Z%]/g,function(y){y!=="%%"&&(i++,y==="%c"&&(c=i))}),s.splice(c,0,a)}}function l(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function o(s){try{s==null?e.storage.removeItem("debug"):e.storage.debug=s}catch{}}function f(){var s;try{s=e.storage.debug}catch{}return!s&&typeof process<"u"&&"env"in process&&(s=process.env.DEBUG),s}e.enable(f());function v(){try{return window.localStorage}catch{}}})(z,z.exports);var J={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],t.exports=e.default})(J,J.exports);var H={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],t.exports=e.default})(H,H.exports);var W={exports:{}},Z={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},t.exports=e.default})(Z,Z.exports);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=Z.exports,r=l(n);function l(o){return o&&o.__esModule?o:{default:o}}e.default={pauseVideo:{acceptableStates:[r.default.ENDED,r.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[r.default.ENDED,r.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[r.default.ENDED,r.default.PLAYING,r.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},t.exports=e.default})(W,W.exports);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=z.exports,r=a(n),l=J.exports,o=a(l),f=H.exports,v=a(f),s=W.exports,u=a(s);function a(y){return y&&y.__esModule?y:{default:y}}var i=(0,r.default)("youtube-player"),c={};c.proxyEvents=function(y){var d={},p=function(O){var _="on"+O.slice(0,1).toUpperCase()+O.slice(1);d[_]=function(C){i('event "%s"',_,C),y.trigger(O,C)}},g=!0,h=!1,m=void 0;try{for(var b=v.default[Symbol.iterator](),w;!(g=(w=b.next()).done);g=!0){var M=w.value;p(M)}}catch(Y){h=!0,m=Y}finally{try{!g&&b.return&&b.return()}finally{if(h)throw m}}return d},c.promisifyPlayer=function(y){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,p={},g=function(_){d&&u.default[_]?p[_]=function(){for(var C=arguments.length,D=Array(C),A=0;A<C;A++)D[A]=arguments[A];return y.then(function(E){var T=u.default[_],se=E.getPlayerState(),ne=E[_].apply(E,D);return T.stateChangeRequired||Array.isArray(T.acceptableStates)&&T.acceptableStates.indexOf(se)===-1?new Promise(function(re){var ce=function oe(){var de=E.getPlayerState(),ae=void 0;typeof T.timeout=="number"&&(ae=setTimeout(function(){E.removeEventListener("onStateChange",oe),re()},T.timeout)),Array.isArray(T.acceptableStates)&&T.acceptableStates.indexOf(de)!==-1&&(E.removeEventListener("onStateChange",oe),clearTimeout(ae),re())};E.addEventListener("onStateChange",ce)}).then(function(){return ne}):ne})}:p[_]=function(){for(var C=arguments.length,D=Array(C),A=0;A<C;A++)D[A]=arguments[A];return y.then(function(E){return E[_].apply(E,D)})}},h=!0,m=!1,b=void 0;try{for(var w=o.default[Symbol.iterator](),M;!(h=(M=w.next()).done);h=!0){var Y=M.value;g(Y)}}catch(O){m=!0,b=O}finally{try{!h&&w.return&&w.return()}finally{if(m)throw b}}return p},e.default=c,t.exports=e.default})(Q,Q.exports);(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},r=ye,l=u(r),o=$.exports,f=u(o),v=Q.exports,s=u(v);function u(i){return i&&i.__esModule?i:{default:i}}var a=void 0;e.default=function(i){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},y=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,d=(0,l.default)();if(a||(a=(0,f.default)(d)),c.events)throw new Error("Event handlers cannot be overwritten.");if(typeof i=="string"&&!document.getElementById(i))throw new Error('Element "'+i+'" does not exist.');c.events=s.default.proxyEvents(d);var p=new Promise(function(h){if((typeof i>"u"?"undefined":n(i))==="object"&&i.playVideo instanceof Function){var m=i;h(m)}else a.then(function(b){var w=new b.Player(i,c);return d.on("ready",function(){h(w)}),null})}),g=s.default.promisifyPlayer(p,y);return g.on=d.on,g.off=d.off,g},t.exports=e.default})(q,q.exports);const Se=fe(q.exports);var ue;const te=(ue=new URL(location.href).searchParams.get("v"))!=null?ue:"dQw4w9WgXcQ",L=Se("player");L.loadVideoById(te);const K=document.getElementById("start-button"),X=document.getElementById("end-button"),j=document.getElementById("reset-button"),Pe=document.getElementById("clear-select-button"),N=document.getElementById("loop-list");let P=[],S=null,I=null;if(window.localStorage){const t=localStorage.getItem(te);t&&(P=JSON.parse(t),S=P[0].id)}else alert("Local save is not available in this browser.");U();x();K.addEventListener("click",async()=>{I=await L.getCurrentTime(),x()});X.addEventListener("click",async()=>{const t=await L.getCurrentTime();if(typeof I=="number"&&I<t){const e=Math.random();P.push({id:e,range:[I,t],name:`#${P.length}`}),S=e,I=null,x(),U(),_e()}else alert("The end time of the loop is earlier than the start time.")});j.addEventListener("click",()=>{I=null,x()});Pe.addEventListener("click",()=>{S=null,ee()});function x(){I===null?(K.style.display="unset",X.style.display="none",j.style.display="none"):I!==null&&(K.style.display="none",X.style.display="unset",j.style.display="unset")}function U(){const t=[];for(const n of P){const{id:r,name:l,range:[o,f]}=n,v=document.createElement("li"),s=document.createElement("div");s.innerHTML=`${l} <small>${e(o)} ~ ${e(f)}</small>`;const u=document.createElement("button");u.innerText="rename";const a=document.createElement("button");a.innerText="Delete",v.append(s,u,a),v.addEventListener("click",()=>{S=S===r?null:r,ee()}),a.addEventListener("click",i=>{i.stopPropagation(),P=P.filter(c=>c.id!==r),r===S&&(S=null),U()}),u.addEventListener("click",i=>{i.stopPropagation();const c=prompt("Please name this loop.");typeof c=="string"&&c.length>0?(n.name=c,U()):alert("Your input is not valid.")}),t.push(v)}for(;N.firstChild;)N.removeChild(N.firstChild);N.append(...t),ee();function e(n){let r=[];if(n>3600&&r.push((n/3600).toFixed()),n>60){const l=n%3600;r.push((l/60).toFixed())}return r.push((n%60).toFixed(2)),r.join(":")}}function ee(){const t=document.getElementById("selected-loop");t&&(t.id="");const e=P.findIndex(n=>n.id===S);e>-1&&(N.children[e].id="selected-loop")}function _e(){window.localStorage.setItem(te,JSON.stringify(P))}setInterval(async()=>{if(!L||!L.getPlayerState)return;if(await L.getPlayerState()===1&&S!==null){const e=await L.getCurrentTime(),n=P.find(r=>r.id===S);if(n){const[r,l]=n.range;(e<r||l<e)&&L.seekTo(r)}}},80);