(()=>{var Er=Object.create;var un=Object.defineProperty;var Sr=Object.getOwnPropertyDescriptor;var Cr=Object.getOwnPropertyNames;var Br=Object.getPrototypeOf,Ar=Object.prototype.hasOwnProperty;var et=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,r)=>(typeof require!="undefined"?require:t)[r]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var pn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ir=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Cr(t))!Ar.call(e,s)&&s!==r&&un(e,s,{get:()=>t[s],enumerable:!(i=Sr(t,s))||i.enumerable});return e};var _t=(e,t,r)=>(r=e!=null?Er(Br(e)):{},Ir(t||!e||!e.__esModule?un(r,"default",{value:e,enumerable:!0}):r,e));var hn=pn((St,Ct)=>{((e,t)=>{typeof define=="function"&&define.amd?define([],t):typeof Ct=="object"&&typeof St<"u"?Ct.exports=t():e.Papa=t()})(St,function e(){var t=typeof self<"u"?self:typeof window<"u"?window:t!==void 0?t:{},r,i=!t.document&&!!t.postMessage,s=t.IS_PAPA_WORKER||!1,a={},o=0,p={};function v(g){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(m){var S=T(m);S.chunkSize=parseInt(S.chunkSize),m.step||m.chunk||(S.chunkSize=null),this._handle=new d(S),(this._handle.streamer=this)._config=S}.call(this,g),this.parseChunk=function(m,S){var R=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<R){let N=this._config.newline;N||(h=this._config.quoteChar||'"',N=this._handle.guessLineEndings(m,h)),m=[...m.split(N).slice(R)].join(N)}this.isFirstChunk&&A(this._config.beforeFirstChunk)&&(h=this._config.beforeFirstChunk(m))!==void 0&&(m=h),this.isFirstChunk=!1,this._halted=!1;var R=this._partialLine+m,h=(this._partialLine="",this._handle.parse(R,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(m=h.meta.cursor,R=(this._finished||(this._partialLine=R.substring(m-this._baseIndex),this._baseIndex=m),h&&h.data&&(this._rowCount+=h.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),s)t.postMessage({results:h,workerId:p.WORKER_ID,finished:R});else if(A(this._config.chunk)&&!S){if(this._config.chunk(h,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=h=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(h.data),this._completeResults.errors=this._completeResults.errors.concat(h.errors),this._completeResults.meta=h.meta),this._completed||!R||!A(this._config.complete)||h&&h.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),R||h&&h.meta.paused||this._nextChunk(),h}this._halted=!0},this._sendError=function(m){A(this._config.error)?this._config.error(m):s&&this._config.error&&t.postMessage({workerId:p.WORKER_ID,error:m,finished:!1})}}function x(g){var m;(g=g||{}).chunkSize||(g.chunkSize=p.RemoteChunkSize),v.call(this,g),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(S){this._input=S,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(m=new XMLHttpRequest,this._config.withCredentials&&(m.withCredentials=this._config.withCredentials),i||(m.onload=q(this._chunkLoaded,this),m.onerror=q(this._chunkError,this)),m.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var S,R=this._config.downloadRequestHeaders;for(S in R)m.setRequestHeader(S,R[S])}var h;this._config.chunkSize&&(h=this._start+this._config.chunkSize-1,m.setRequestHeader("Range","bytes="+this._start+"-"+h));try{m.send(this._config.downloadRequestBody)}catch(N){this._chunkError(N.message)}i&&m.status===0&&this._chunkError()}},this._chunkLoaded=function(){m.readyState===4&&(m.status<200||400<=m.status?this._chunkError():(this._start+=this._config.chunkSize||m.responseText.length,this._finished=!this._config.chunkSize||this._start>=(S=>(S=S.getResponseHeader("Content-Range"))!==null?parseInt(S.substring(S.lastIndexOf("/")+1)):-1)(m),this.parseChunk(m.responseText)))},this._chunkError=function(S){S=m.statusText||S,this._sendError(new Error(S))}}function y(g){(g=g||{}).chunkSize||(g.chunkSize=p.LocalChunkSize),v.call(this,g);var m,S,R=typeof FileReader<"u";this.stream=function(h){this._input=h,S=h.slice||h.webkitSlice||h.mozSlice,R?((m=new FileReader).onload=q(this._chunkLoaded,this),m.onerror=q(this._chunkError,this)):m=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var h=this._input,N=(this._config.chunkSize&&(N=Math.min(this._start+this._config.chunkSize,this._input.size),h=S.call(h,this._start,N)),m.readAsText(h,this._config.encoding));R||this._chunkLoaded({target:{result:N}})},this._chunkLoaded=function(h){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(h.target.result)},this._chunkError=function(){this._sendError(m.error)}}function u(g){var m;v.call(this,g=g||{}),this.stream=function(S){return m=S,this._nextChunk()},this._nextChunk=function(){var S,R;if(!this._finished)return S=this._config.chunkSize,m=S?(R=m.substring(0,S),m.substring(S)):(R=m,""),this._finished=!m,this.parseChunk(R)}}function w(g){v.call(this,g=g||{});var m=[],S=!0,R=!1;this.pause=function(){v.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){v.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(h){this._input=h,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){R&&m.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),m.length?this.parseChunk(m.shift()):S=!0},this._streamData=q(function(h){try{m.push(typeof h=="string"?h:h.toString(this._config.encoding)),S&&(S=!1,this._checkIsFinished(),this.parseChunk(m.shift()))}catch(N){this._streamError(N)}},this),this._streamError=q(function(h){this._streamCleanUp(),this._sendError(h)},this),this._streamEnd=q(function(){this._streamCleanUp(),R=!0,this._streamData("")},this),this._streamCleanUp=q(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function d(g){var m,S,R,h,N=Math.pow(2,53),l=-N,F=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,ne=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,$=this,Q=0,j=0,G=!1,I=!1,M=[],W={data:[],errors:[],meta:{}};function X(te){return g.skipEmptyLines==="greedy"?te.join("").trim()==="":te.length===1&&te[0].length===0}function Z(){if(W&&R&&(me("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+p.DefaultDelimiter+"'"),R=!1),g.skipEmptyLines&&(W.data=W.data.filter(function(de){return!X(de)})),le()){let de=function(he,n){A(g.transformHeader)&&(he=g.transformHeader(he,n)),M.push(he)};var se=de;if(W)if(Array.isArray(W.data[0])){for(var te=0;le()&&te<W.data.length;te++)W.data[te].forEach(de);W.data.splice(0,1)}else W.data.forEach(de)}function re(de,he){for(var n=g.header?{}:[],D=0;D<de.length;D++){var z=D,E=de[D],E=((c,_)=>(O=>(g.dynamicTypingFunction&&g.dynamicTyping[O]===void 0&&(g.dynamicTyping[O]=g.dynamicTypingFunction(O)),(g.dynamicTyping[O]||g.dynamicTyping)===!0))(c)?_==="true"||_==="TRUE"||_!=="false"&&_!=="FALSE"&&((O=>{if(F.test(O)&&(O=parseFloat(O),l<O&&O<N))return 1})(_)?parseFloat(_):ne.test(_)?new Date(_):_===""?null:_):_)(z=g.header?D>=M.length?"__parsed_extra":M[D]:z,E=g.transform?g.transform(E,z):E);z==="__parsed_extra"?(n[z]=n[z]||[],n[z].push(E)):n[z]=E}return g.header&&(D>M.length?me("FieldMismatch","TooManyFields","Too many fields: expected "+M.length+" fields but parsed "+D,j+he):D<M.length&&me("FieldMismatch","TooFewFields","Too few fields: expected "+M.length+" fields but parsed "+D,j+he)),n}var oe;W&&(g.header||g.dynamicTyping||g.transform)&&(oe=1,!W.data.length||Array.isArray(W.data[0])?(W.data=W.data.map(re),oe=W.data.length):W.data=re(W.data,0),g.header&&W.meta&&(W.meta.fields=M),j+=oe)}function le(){return g.header&&M.length===0}function me(te,re,oe,se){te={type:te,code:re,message:oe},se!==void 0&&(te.row=se),W.errors.push(te)}A(g.step)&&(h=g.step,g.step=function(te){W=te,le()?Z():(Z(),W.data.length!==0&&(Q+=te.data.length,g.preview&&Q>g.preview?S.abort():(W.data=W.data[0],h(W,$))))}),this.parse=function(te,re,oe){var se=g.quoteChar||'"',se=(g.newline||(g.newline=this.guessLineEndings(te,se)),R=!1,g.delimiter?A(g.delimiter)&&(g.delimiter=g.delimiter(te),W.meta.delimiter=g.delimiter):((se=((de,he,n,D,z)=>{var E,c,_,O;z=z||[",","	","|",";",p.RECORD_SEP,p.UNIT_SEP];for(var U=0;U<z.length;U++){for(var L,P=z[U],K=0,Y=0,H=0,ee=(_=void 0,new f({comments:D,delimiter:P,newline:he,preview:10}).parse(de)),J=0;J<ee.data.length;J++)n&&X(ee.data[J])?H++:(L=ee.data[J].length,Y+=L,_===void 0?_=L:0<L&&(K+=Math.abs(L-_),_=L));0<ee.data.length&&(Y/=ee.data.length-H),(c===void 0||K<=c)&&(O===void 0||O<Y)&&1.99<Y&&(c=K,E=P,O=Y)}return{successful:!!(g.delimiter=E),bestDelimiter:E}})(te,g.newline,g.skipEmptyLines,g.comments,g.delimitersToGuess)).successful?g.delimiter=se.bestDelimiter:(R=!0,g.delimiter=p.DefaultDelimiter),W.meta.delimiter=g.delimiter),T(g));return g.preview&&g.header&&se.preview++,m=te,S=new f(se),W=S.parse(m,re,oe),Z(),G?{meta:{paused:!0}}:W||{meta:{paused:!1}}},this.paused=function(){return G},this.pause=function(){G=!0,S.abort(),m=A(g.chunk)?"":m.substring(S.getCharIndex())},this.resume=function(){$.streamer._halted?(G=!1,$.streamer.parseChunk(m,!0)):setTimeout($.resume,3)},this.aborted=function(){return I},this.abort=function(){I=!0,S.abort(),W.meta.aborted=!0,A(g.complete)&&g.complete(W),m=""},this.guessLineEndings=function(de,se){de=de.substring(0,1048576);var se=new RegExp(b(se)+"([^]*?)"+b(se),"gm"),oe=(de=de.replace(se,"")).split("\r"),se=de.split(`
`),de=1<se.length&&se[0].length<oe[0].length;if(oe.length===1||de)return`
`;for(var he=0,n=0;n<oe.length;n++)oe[n][0]===`
`&&he++;return he>=oe.length/2?`\r
`:"\r"}}function b(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function f(g){var m=(g=g||{}).delimiter,S=g.newline,R=g.comments,h=g.step,N=g.preview,l=g.fastMode,F=null,ne=!1,$=g.quoteChar==null?'"':g.quoteChar,Q=$;if(g.escapeChar!==void 0&&(Q=g.escapeChar),(typeof m!="string"||-1<p.BAD_DELIMITERS.indexOf(m))&&(m=","),R===m)throw new Error("Comment character same as delimiter");R===!0?R="#":(typeof R!="string"||-1<p.BAD_DELIMITERS.indexOf(R))&&(R=!1),S!==`
`&&S!=="\r"&&S!==`\r
`&&(S=`
`);var j=0,G=!1;this.parse=function(I,M,W){if(typeof I!="string")throw new Error("Input must be a string");var X=I.length,Z=m.length,le=S.length,me=R.length,te=A(h),re=[],oe=[],se=[],de=j=0;if(!I)return K();if(l||l!==!1&&I.indexOf($)===-1){for(var he=I.split(S),n=0;n<he.length;n++){if(se=he[n],j+=se.length,n!==he.length-1)j+=S.length;else if(W)return K();if(!R||se.substring(0,me)!==R){if(te){if(re=[],O(se.split(m)),Y(),G)return K()}else O(se.split(m));if(N&&N<=n)return re=re.slice(0,N),K(!0)}}return K()}for(var D=I.indexOf(m,j),z=I.indexOf(S,j),E=new RegExp(b(Q)+b($),"g"),c=I.indexOf($,j);;)if(I[j]===$)for(c=j,j++;;){if((c=I.indexOf($,c+1))===-1)return W||oe.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:re.length,index:j}),L();if(c===X-1)return L(I.substring(j,c).replace(E,$));if($===Q&&I[c+1]===Q)c++;else if($===Q||c===0||I[c-1]!==Q){D!==-1&&D<c+1&&(D=I.indexOf(m,c+1));var _=U((z=z!==-1&&z<c+1?I.indexOf(S,c+1):z)===-1?D:Math.min(D,z));if(I.substr(c+1+_,Z)===m){se.push(I.substring(j,c).replace(E,$)),I[j=c+1+_+Z]!==$&&(c=I.indexOf($,j)),D=I.indexOf(m,j),z=I.indexOf(S,j);break}if(_=U(z),I.substring(c+1+_,c+1+_+le)===S){if(se.push(I.substring(j,c).replace(E,$)),P(c+1+_+le),D=I.indexOf(m,j),c=I.indexOf($,j),te&&(Y(),G))return K();if(N&&re.length>=N)return K(!0);break}oe.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:re.length,index:j}),c++}}else if(R&&se.length===0&&I.substring(j,j+me)===R){if(z===-1)return K();j=z+le,z=I.indexOf(S,j),D=I.indexOf(m,j)}else if(D!==-1&&(D<z||z===-1))se.push(I.substring(j,D)),j=D+Z,D=I.indexOf(m,j);else{if(z===-1)break;if(se.push(I.substring(j,z)),P(z+le),te&&(Y(),G))return K();if(N&&re.length>=N)return K(!0)}return L();function O(H){re.push(H),de=j}function U(H){var ee=0;return ee=H!==-1&&(H=I.substring(c+1,H))&&H.trim()===""?H.length:ee}function L(H){return W||(H===void 0&&(H=I.substring(j)),se.push(H),j=X,O(se),te&&Y()),K()}function P(H){j=H,O(se),se=[],z=I.indexOf(S,j)}function K(H){if(g.header&&!M&&re.length&&!ne){var ee=re[0],J={},ue=new Set(ee);let be=!1;for(let pe=0;pe<ee.length;pe++){let ge=ee[pe];if(J[ge=A(g.transformHeader)?g.transformHeader(ge,pe):ge]){let fe,Ae=J[ge];for(;fe=ge+"_"+Ae,Ae++,ue.has(fe););ue.add(fe),ee[pe]=fe,J[ge]++,be=!0,(F=F===null?{}:F)[fe]=ge}else J[ge]=1,ee[pe]=ge;ue.add(ge)}be&&console.warn("Duplicate headers found and renamed."),ne=!0}return{data:re,errors:oe,meta:{delimiter:m,linebreak:S,aborted:G,truncated:!!H,cursor:de+(M||0),renamedHeaders:F}}}function Y(){h(K()),re=[],oe=[]}},this.abort=function(){G=!0},this.getCharIndex=function(){return j}}function k(g){var m=g.data,S=a[m.workerId],R=!1;if(m.error)S.userError(m.error,m.file);else if(m.results&&m.results.data){var h={abort:function(){R=!0,C(m.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:B,resume:B};if(A(S.userStep)){for(var N=0;N<m.results.data.length&&(S.userStep({data:m.results.data[N],errors:m.results.errors,meta:m.results.meta},h),!R);N++);delete m.results}else A(S.userChunk)&&(S.userChunk(m.results,h,m.file),delete m.results)}m.finished&&!R&&C(m.workerId,m.results)}function C(g,m){var S=a[g];A(S.userComplete)&&S.userComplete(m),S.terminate(),delete a[g]}function B(){throw new Error("Not implemented.")}function T(g){if(typeof g!="object"||g===null)return g;var m,S=Array.isArray(g)?[]:{};for(m in g)S[m]=T(g[m]);return S}function q(g,m){return function(){g.apply(m,arguments)}}function A(g){return typeof g=="function"}return p.parse=function(g,m){var S=(m=m||{}).dynamicTyping||!1;if(A(S)&&(m.dynamicTypingFunction=S,S={}),m.dynamicTyping=S,m.transform=!!A(m.transform)&&m.transform,!m.worker||!p.WORKERS_SUPPORTED)return S=null,p.NODE_STREAM_INPUT,typeof g=="string"?(g=(R=>R.charCodeAt(0)!==65279?R:R.slice(1))(g),S=new(m.download?x:u)(m)):g.readable===!0&&A(g.read)&&A(g.on)?S=new w(m):(t.File&&g instanceof File||g instanceof Object)&&(S=new y(m)),S.stream(g);(S=(()=>{var R;return!!p.WORKERS_SUPPORTED&&(R=(()=>{var h=t.URL||t.webkitURL||null,N=e.toString();return p.BLOB_URL||(p.BLOB_URL=h.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",N,")();"],{type:"text/javascript"})))})(),(R=new t.Worker(R)).onmessage=k,R.id=o++,a[R.id]=R)})()).userStep=m.step,S.userChunk=m.chunk,S.userComplete=m.complete,S.userError=m.error,m.step=A(m.step),m.chunk=A(m.chunk),m.complete=A(m.complete),m.error=A(m.error),delete m.worker,S.postMessage({input:g,config:m,workerId:S.id})},p.unparse=function(g,m){var S=!1,R=!0,h=",",N=`\r
`,l='"',F=l+l,ne=!1,$=null,Q=!1,j=((()=>{if(typeof m=="object"){if(typeof m.delimiter!="string"||p.BAD_DELIMITERS.filter(function(M){return m.delimiter.indexOf(M)!==-1}).length||(h=m.delimiter),typeof m.quotes!="boolean"&&typeof m.quotes!="function"&&!Array.isArray(m.quotes)||(S=m.quotes),typeof m.skipEmptyLines!="boolean"&&typeof m.skipEmptyLines!="string"||(ne=m.skipEmptyLines),typeof m.newline=="string"&&(N=m.newline),typeof m.quoteChar=="string"&&(l=m.quoteChar),typeof m.header=="boolean"&&(R=m.header),Array.isArray(m.columns)){if(m.columns.length===0)throw new Error("Option columns is empty");$=m.columns}m.escapeChar!==void 0&&(F=m.escapeChar+l),m.escapeFormulae instanceof RegExp?Q=m.escapeFormulae:typeof m.escapeFormulae=="boolean"&&m.escapeFormulae&&(Q=/^[=+\-@\t\r].*$/)}})(),new RegExp(b(l),"g"));if(typeof g=="string"&&(g=JSON.parse(g)),Array.isArray(g)){if(!g.length||Array.isArray(g[0]))return G(null,g,ne);if(typeof g[0]=="object")return G($||Object.keys(g[0]),g,ne)}else if(typeof g=="object")return typeof g.data=="string"&&(g.data=JSON.parse(g.data)),Array.isArray(g.data)&&(g.fields||(g.fields=g.meta&&g.meta.fields||$),g.fields||(g.fields=Array.isArray(g.data[0])?g.fields:typeof g.data[0]=="object"?Object.keys(g.data[0]):[]),Array.isArray(g.data[0])||typeof g.data[0]=="object"||(g.data=[g.data])),G(g.fields||[],g.data||[],ne);throw new Error("Unable to serialize unrecognized input");function G(M,W,X){var Z="",le=(typeof M=="string"&&(M=JSON.parse(M)),typeof W=="string"&&(W=JSON.parse(W)),Array.isArray(M)&&0<M.length),me=!Array.isArray(W[0]);if(le&&R){for(var te=0;te<M.length;te++)0<te&&(Z+=h),Z+=I(M[te],te);0<W.length&&(Z+=N)}for(var re=0;re<W.length;re++){var oe=(le?M:W[re]).length,se=!1,de=le?Object.keys(W[re]).length===0:W[re].length===0;if(X&&!le&&(se=X==="greedy"?W[re].join("").trim()==="":W[re].length===1&&W[re][0].length===0),X==="greedy"&&le){for(var he=[],n=0;n<oe;n++){var D=me?M[n]:n;he.push(W[re][D])}se=he.join("").trim()===""}if(!se){for(var z=0;z<oe;z++){0<z&&!de&&(Z+=h);var E=le&&me?M[z]:z;Z+=I(W[re][E],z)}re<W.length-1&&(!X||0<oe&&!de)&&(Z+=N)}}return Z}function I(M,W){var X,Z;return M==null?"":M.constructor===Date?JSON.stringify(M).slice(1,25):(Z=!1,Q&&typeof M=="string"&&Q.test(M)&&(M="'"+M,Z=!0),X=M.toString().replace(j,F),(Z=Z||S===!0||typeof S=="function"&&S(M,W)||Array.isArray(S)&&S[W]||((le,me)=>{for(var te=0;te<me.length;te++)if(-1<le.indexOf(me[te]))return!0;return!1})(X,p.BAD_DELIMITERS)||-1<X.indexOf(h)||X.charAt(0)===" "||X.charAt(X.length-1)===" ")?l+X+l:X)}},p.RECORD_SEP=String.fromCharCode(30),p.UNIT_SEP=String.fromCharCode(31),p.BYTE_ORDER_MARK="\uFEFF",p.BAD_DELIMITERS=["\r",`
`,'"',p.BYTE_ORDER_MARK],p.WORKERS_SUPPORTED=!i&&!!t.Worker,p.NODE_STREAM_INPUT=1,p.LocalChunkSize=10485760,p.RemoteChunkSize=5242880,p.DefaultDelimiter=",",p.Parser=f,p.ParserHandle=d,p.NetworkStreamer=x,p.FileStreamer=y,p.StringStreamer=u,p.ReadableStreamStreamer=w,t.jQuery&&((r=t.jQuery).fn.parse=function(g){var m=g.config||{},S=[];return this.each(function(N){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&t.FileReader)||!this.files||this.files.length===0)return!0;for(var l=0;l<this.files.length;l++)S.push({file:this.files[l],inputElem:this,instanceConfig:r.extend({},m)})}),R(),this;function R(){if(S.length===0)A(g.complete)&&g.complete();else{var N,l,F,ne,$=S[0];if(A(g.before)){var Q=g.before($.file,$.inputElem);if(typeof Q=="object"){if(Q.action==="abort")return N="AbortError",l=$.file,F=$.inputElem,ne=Q.reason,void(A(g.error)&&g.error({name:N},l,F,ne));if(Q.action==="skip")return void h();typeof Q.config=="object"&&($.instanceConfig=r.extend($.instanceConfig,Q.config))}else if(Q==="skip")return void h()}var j=$.instanceConfig.complete;$.instanceConfig.complete=function(G){A(j)&&j(G,$.file,$.inputElem),h()},p.parse($.file,$.instanceConfig)}}function h(){S.splice(0,1),R()}}),s&&(t.onmessage=function(g){g=g.data,p.WORKER_ID===void 0&&g&&(p.WORKER_ID=g.workerId),typeof g.input=="string"?t.postMessage({workerId:p.WORKER_ID,results:p.parse(g.input,g.config),finished:!0}):(t.File&&g.input instanceof File||g.input instanceof Object)&&(g=p.parse(g.input,g.config))&&t.postMessage({workerId:p.WORKER_ID,results:g,finished:!0})}),(x.prototype=Object.create(v.prototype)).constructor=x,(y.prototype=Object.create(v.prototype)).constructor=y,(u.prototype=Object.create(u.prototype)).constructor=u,(w.prototype=Object.create(v.prototype)).constructor=w,p})});var At=pn((mn,Bt)=>{(function(e){typeof mn=="object"&&typeof Bt<"u"?Bt.exports=e():typeof define=="function"&&define.amd?define([],e):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=e()})(function(){return function e(t,r,i){function s(p,v){if(!r[p]){if(!t[p]){var x=typeof et=="function"&&et;if(!v&&x)return x(p,!0);if(a)return a(p,!0);var y=new Error("Cannot find module '"+p+"'");throw y.code="MODULE_NOT_FOUND",y}var u=r[p]={exports:{}};t[p][0].call(u.exports,function(w){var d=t[p][1][w];return s(d||w)},u,u.exports,e,t,r,i)}return r[p].exports}for(var a=typeof et=="function"&&et,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(e,t,r){"use strict";var i=e("./utils"),s=e("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(o){for(var p,v,x,y,u,w,d,b=[],f=0,k=o.length,C=k,B=i.getTypeOf(o)!=="string";f<o.length;)C=k-f,x=B?(p=o[f++],v=f<k?o[f++]:0,f<k?o[f++]:0):(p=o.charCodeAt(f++),v=f<k?o.charCodeAt(f++):0,f<k?o.charCodeAt(f++):0),y=p>>2,u=(3&p)<<4|v>>4,w=1<C?(15&v)<<2|x>>6:64,d=2<C?63&x:64,b.push(a.charAt(y)+a.charAt(u)+a.charAt(w)+a.charAt(d));return b.join("")},r.decode=function(o){var p,v,x,y,u,w,d=0,b=0,f="data:";if(o.substr(0,f.length)===f)throw new Error("Invalid base64 input, it looks like a data url.");var k,C=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===a.charAt(64)&&C--,o.charAt(o.length-2)===a.charAt(64)&&C--,C%1!=0)throw new Error("Invalid base64 input, bad content length.");for(k=s.uint8array?new Uint8Array(0|C):new Array(0|C);d<o.length;)p=a.indexOf(o.charAt(d++))<<2|(y=a.indexOf(o.charAt(d++)))>>4,v=(15&y)<<4|(u=a.indexOf(o.charAt(d++)))>>2,x=(3&u)<<6|(w=a.indexOf(o.charAt(d++))),k[b++]=p,u!==64&&(k[b++]=v),w!==64&&(k[b++]=x);return k}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var i=e("./external"),s=e("./stream/DataWorker"),a=e("./stream/Crc32Probe"),o=e("./stream/DataLengthProbe");function p(v,x,y,u,w){this.compressedSize=v,this.uncompressedSize=x,this.crc32=y,this.compression=u,this.compressedContent=w}p.prototype={getContentWorker:function(){var v=new s(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),x=this;return v.on("end",function(){if(this.streamInfo.data_length!==x.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),v},getCompressedWorker:function(){return new s(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},p.createWorkerFrom=function(v,x,y){return v.pipe(new a).pipe(new o("uncompressedSize")).pipe(x.compressWorker(y)).pipe(new o("compressedSize")).withStreamInfo("compression",x)},t.exports=p},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var i=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var i=e("./utils"),s=function(){for(var a,o=[],p=0;p<256;p++){a=p;for(var v=0;v<8;v++)a=1&a?3988292384^a>>>1:a>>>1;o[p]=a}return o}();t.exports=function(a,o){return a!==void 0&&a.length?i.getTypeOf(a)!=="string"?function(p,v,x,y){var u=s,w=y+x;p^=-1;for(var d=y;d<w;d++)p=p>>>8^u[255&(p^v[d])];return-1^p}(0|o,a,a.length,0):function(p,v,x,y){var u=s,w=y+x;p^=-1;for(var d=y;d<w;d++)p=p>>>8^u[255&(p^v.charCodeAt(d))];return-1^p}(0|o,a,a.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var i=null;i=typeof Promise<"u"?Promise:e("lie"),t.exports={Promise:i}},{lie:37}],7:[function(e,t,r){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",s=e("pako"),a=e("./utils"),o=e("./stream/GenericWorker"),p=i?"uint8array":"array";function v(x,y){o.call(this,"FlateWorker/"+x),this._pako=null,this._pakoAction=x,this._pakoOptions=y,this.meta={}}r.magic="\b\0",a.inherits(v,o),v.prototype.processChunk=function(x){this.meta=x.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(p,x.data),!1)},v.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},v.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},v.prototype._createPako=function(){this._pako=new s[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var x=this;this._pako.onData=function(y){x.push({data:y,meta:x.meta})}},r.compressWorker=function(x){return new v("Deflate",x)},r.uncompressWorker=function(){return new v("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function i(u,w){var d,b="";for(d=0;d<w;d++)b+=String.fromCharCode(255&u),u>>>=8;return b}function s(u,w,d,b,f,k){var C,B,T=u.file,q=u.compression,A=k!==p.utf8encode,g=a.transformTo("string",k(T.name)),m=a.transformTo("string",p.utf8encode(T.name)),S=T.comment,R=a.transformTo("string",k(S)),h=a.transformTo("string",p.utf8encode(S)),N=m.length!==T.name.length,l=h.length!==S.length,F="",ne="",$="",Q=T.dir,j=T.date,G={crc32:0,compressedSize:0,uncompressedSize:0};w&&!d||(G.crc32=u.crc32,G.compressedSize=u.compressedSize,G.uncompressedSize=u.uncompressedSize);var I=0;w&&(I|=8),A||!N&&!l||(I|=2048);var M=0,W=0;Q&&(M|=16),f==="UNIX"?(W=798,M|=function(Z,le){var me=Z;return Z||(me=le?16893:33204),(65535&me)<<16}(T.unixPermissions,Q)):(W=20,M|=function(Z){return 63&(Z||0)}(T.dosPermissions)),C=j.getUTCHours(),C<<=6,C|=j.getUTCMinutes(),C<<=5,C|=j.getUTCSeconds()/2,B=j.getUTCFullYear()-1980,B<<=4,B|=j.getUTCMonth()+1,B<<=5,B|=j.getUTCDate(),N&&(ne=i(1,1)+i(v(g),4)+m,F+="up"+i(ne.length,2)+ne),l&&($=i(1,1)+i(v(R),4)+h,F+="uc"+i($.length,2)+$);var X="";return X+=`
\0`,X+=i(I,2),X+=q.magic,X+=i(C,2),X+=i(B,2),X+=i(G.crc32,4),X+=i(G.compressedSize,4),X+=i(G.uncompressedSize,4),X+=i(g.length,2),X+=i(F.length,2),{fileRecord:x.LOCAL_FILE_HEADER+X+g+F,dirRecord:x.CENTRAL_FILE_HEADER+i(W,2)+X+i(R.length,2)+"\0\0\0\0"+i(M,4)+i(b,4)+g+F+R}}var a=e("../utils"),o=e("../stream/GenericWorker"),p=e("../utf8"),v=e("../crc32"),x=e("../signature");function y(u,w,d,b){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=w,this.zipPlatform=d,this.encodeFileName=b,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(y,o),y.prototype.push=function(u){var w=u.meta.percent||0,d=this.entriesCount,b=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,o.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:d?(w+100*(d-b-1))/d:100}}))},y.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var w=this.streamFiles&&!u.file.dir;if(w){var d=s(u,w,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:d.fileRecord,meta:{percent:0}})}else this.accumulate=!0},y.prototype.closedSource=function(u){this.accumulate=!1;var w=this.streamFiles&&!u.file.dir,d=s(u,w,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(d.dirRecord),w)this.push({data:function(b){return x.DATA_DESCRIPTOR+i(b.crc32,4)+i(b.compressedSize,4)+i(b.uncompressedSize,4)}(u),meta:{percent:100}});else for(this.push({data:d.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},y.prototype.flush=function(){for(var u=this.bytesWritten,w=0;w<this.dirRecords.length;w++)this.push({data:this.dirRecords[w],meta:{percent:100}});var d=this.bytesWritten-u,b=function(f,k,C,B,T){var q=a.transformTo("string",T(B));return x.CENTRAL_DIRECTORY_END+"\0\0\0\0"+i(f,2)+i(f,2)+i(k,4)+i(C,4)+i(q.length,2)+q}(this.dirRecords.length,d,u,this.zipComment,this.encodeFileName);this.push({data:b,meta:{percent:100}})},y.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},y.prototype.registerPrevious=function(u){this._sources.push(u);var w=this;return u.on("data",function(d){w.processChunk(d)}),u.on("end",function(){w.closedSource(w.previous.streamInfo),w._sources.length?w.prepareNextSource():w.end()}),u.on("error",function(d){w.error(d)}),this},y.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},y.prototype.error=function(u){var w=this._sources;if(!o.prototype.error.call(this,u))return!1;for(var d=0;d<w.length;d++)try{w[d].error(u)}catch{}return!0},y.prototype.lock=function(){o.prototype.lock.call(this);for(var u=this._sources,w=0;w<u.length;w++)u[w].lock()},t.exports=y},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var i=e("../compressions"),s=e("./ZipFileWorker");r.generateWorker=function(a,o,p){var v=new s(o.streamFiles,p,o.platform,o.encodeFileName),x=0;try{a.forEach(function(y,u){x++;var w=function(k,C){var B=k||C,T=i[B];if(!T)throw new Error(B+" is not a valid compression method !");return T}(u.options.compression,o.compression),d=u.options.compressionOptions||o.compressionOptions||{},b=u.dir,f=u.date;u._compressWorker(w,d).withStreamInfo("file",{name:y,dir:b,date:f,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(v)}),v.entriesCount=x}catch(y){v.error(y)}return v}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var s=new i;for(var a in this)typeof this[a]!="function"&&(s[a]=this[a]);return s}}(i.prototype=e("./object")).loadAsync=e("./load"),i.support=e("./support"),i.defaults=e("./defaults"),i.version="3.10.1",i.loadAsync=function(s,a){return new i().loadAsync(s,a)},i.external=e("./external"),t.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var i=e("./utils"),s=e("./external"),a=e("./utf8"),o=e("./zipEntries"),p=e("./stream/Crc32Probe"),v=e("./nodejsUtils");function x(y){return new s.Promise(function(u,w){var d=y.decompressed.getContentWorker().pipe(new p);d.on("error",function(b){w(b)}).on("end",function(){d.streamInfo.crc32!==y.decompressed.crc32?w(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(y,u){var w=this;return u=i.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),v.isNode&&v.isStream(y)?s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",y,!0,u.optimizedBinaryString,u.base64).then(function(d){var b=new o(u);return b.load(d),b}).then(function(d){var b=[s.Promise.resolve(d)],f=d.files;if(u.checkCRC32)for(var k=0;k<f.length;k++)b.push(x(f[k]));return s.Promise.all(b)}).then(function(d){for(var b=d.shift(),f=b.files,k=0;k<f.length;k++){var C=f[k],B=C.fileNameStr,T=i.resolve(C.fileNameStr);w.file(T,C.decompressed,{binary:!0,optimizedBinaryString:!0,date:C.date,dir:C.dir,comment:C.fileCommentStr.length?C.fileCommentStr:null,unixPermissions:C.unixPermissions,dosPermissions:C.dosPermissions,createFolders:u.createFolders}),C.dir||(w.file(T).unsafeOriginalName=B)}return b.zipComment.length&&(w.comment=b.zipComment),w})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var i=e("../utils"),s=e("../stream/GenericWorker");function a(o,p){s.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(p)}i.inherits(a,s),a.prototype._bindStream=function(o){var p=this;(this._stream=o).pause(),o.on("data",function(v){p.push({data:v,meta:{percent:0}})}).on("error",function(v){p.isPaused?this.generatedError=v:p.error(v)}).on("end",function(){p.isPaused?p._upstreamEnded=!0:p.end()})},a.prototype.pause=function(){return!!s.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function s(a,o,p){i.call(this,o),this._helper=a;var v=this;a.on("data",function(x,y){v.push(x)||v._helper.pause(),p&&p(y)}).on("error",function(x){v.emit("error",x)}).on("end",function(){v.push(null)})}e("../utils").inherits(s,i),s.prototype._read=function(){this._helper.resume()},t.exports=s},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(i,s){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(i,s);if(typeof i=="number")throw new Error('The "data" argument must not be a number');return new Buffer(i,s)},allocBuffer:function(i){if(Buffer.alloc)return Buffer.alloc(i);var s=new Buffer(i);return s.fill(0),s},isBuffer:function(i){return Buffer.isBuffer(i)},isStream:function(i){return i&&typeof i.on=="function"&&typeof i.pause=="function"&&typeof i.resume=="function"}}},{}],15:[function(e,t,r){"use strict";function i(T,q,A){var g,m=a.getTypeOf(q),S=a.extend(A||{},v);S.date=S.date||new Date,S.compression!==null&&(S.compression=S.compression.toUpperCase()),typeof S.unixPermissions=="string"&&(S.unixPermissions=parseInt(S.unixPermissions,8)),S.unixPermissions&&16384&S.unixPermissions&&(S.dir=!0),S.dosPermissions&&16&S.dosPermissions&&(S.dir=!0),S.dir&&(T=f(T)),S.createFolders&&(g=b(T))&&k.call(this,g,!0);var R=m==="string"&&S.binary===!1&&S.base64===!1;A&&A.binary!==void 0||(S.binary=!R),(q instanceof x&&q.uncompressedSize===0||S.dir||!q||q.length===0)&&(S.base64=!1,S.binary=!0,q="",S.compression="STORE",m="string");var h=null;h=q instanceof x||q instanceof o?q:w.isNode&&w.isStream(q)?new d(T,q):a.prepareContent(T,q,S.binary,S.optimizedBinaryString,S.base64);var N=new y(T,h,S);this.files[T]=N}var s=e("./utf8"),a=e("./utils"),o=e("./stream/GenericWorker"),p=e("./stream/StreamHelper"),v=e("./defaults"),x=e("./compressedObject"),y=e("./zipObject"),u=e("./generate"),w=e("./nodejsUtils"),d=e("./nodejs/NodejsStreamInputAdapter"),b=function(T){T.slice(-1)==="/"&&(T=T.substring(0,T.length-1));var q=T.lastIndexOf("/");return 0<q?T.substring(0,q):""},f=function(T){return T.slice(-1)!=="/"&&(T+="/"),T},k=function(T,q){return q=q!==void 0?q:v.createFolders,T=f(T),this.files[T]||i.call(this,T,null,{dir:!0,createFolders:q}),this.files[T]};function C(T){return Object.prototype.toString.call(T)==="[object RegExp]"}var B={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(T){var q,A,g;for(q in this.files)g=this.files[q],(A=q.slice(this.root.length,q.length))&&q.slice(0,this.root.length)===this.root&&T(A,g)},filter:function(T){var q=[];return this.forEach(function(A,g){T(A,g)&&q.push(g)}),q},file:function(T,q,A){if(arguments.length!==1)return T=this.root+T,i.call(this,T,q,A),this;if(C(T)){var g=T;return this.filter(function(S,R){return!R.dir&&g.test(S)})}var m=this.files[this.root+T];return m&&!m.dir?m:null},folder:function(T){if(!T)return this;if(C(T))return this.filter(function(m,S){return S.dir&&T.test(m)});var q=this.root+T,A=k.call(this,q),g=this.clone();return g.root=A.name,g},remove:function(T){T=this.root+T;var q=this.files[T];if(q||(T.slice(-1)!=="/"&&(T+="/"),q=this.files[T]),q&&!q.dir)delete this.files[T];else for(var A=this.filter(function(m,S){return S.name.slice(0,T.length)===T}),g=0;g<A.length;g++)delete this.files[A[g].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(T){var q,A={};try{if((A=a.extend(T||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:s.utf8encode})).type=A.type.toLowerCase(),A.compression=A.compression.toUpperCase(),A.type==="binarystring"&&(A.type="string"),!A.type)throw new Error("No output type specified.");a.checkSupport(A.type),A.platform!=="darwin"&&A.platform!=="freebsd"&&A.platform!=="linux"&&A.platform!=="sunos"||(A.platform="UNIX"),A.platform==="win32"&&(A.platform="DOS");var g=A.comment||this.comment||"";q=u.generateWorker(this,A,g)}catch(m){(q=new o("error")).error(m)}return new p(q,A.type||"string",A.mimeType)},generateAsync:function(T,q){return this.generateInternalStream(T).accumulate(q)},generateNodeStream:function(T,q){return(T=T||{}).type||(T.type="nodebuffer"),this.generateInternalStream(T).toNodejsStream(q)}};t.exports=B},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var i=e("./DataReader");function s(a){i.call(this,a);for(var o=0;o<this.data.length;o++)a[o]=255&a[o]}e("../utils").inherits(s,i),s.prototype.byteAt=function(a){return this.data[this.zero+a]},s.prototype.lastIndexOfSignature=function(a){for(var o=a.charCodeAt(0),p=a.charCodeAt(1),v=a.charCodeAt(2),x=a.charCodeAt(3),y=this.length-4;0<=y;--y)if(this.data[y]===o&&this.data[y+1]===p&&this.data[y+2]===v&&this.data[y+3]===x)return y-this.zero;return-1},s.prototype.readAndCheckSignature=function(a){var o=a.charCodeAt(0),p=a.charCodeAt(1),v=a.charCodeAt(2),x=a.charCodeAt(3),y=this.readData(4);return o===y[0]&&p===y[1]&&v===y[2]&&x===y[3]},s.prototype.readData=function(a){if(this.checkOffset(a),a===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,o},t.exports=s},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var i=e("../utils");function s(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}s.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var o,p=0;for(this.checkOffset(a),o=this.index+a-1;o>=this.index;o--)p=(p<<8)+this.byteAt(o);return this.index+=a,p},readString:function(a){return i.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},t.exports=s},{"../utils":32}],19:[function(e,t,r){"use strict";var i=e("./Uint8ArrayReader");function s(a){i.call(this,a)}e("../utils").inherits(s,i),s.prototype.readData=function(a){this.checkOffset(a);var o=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,o},t.exports=s},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var i=e("./DataReader");function s(a){i.call(this,a)}e("../utils").inherits(s,i),s.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},s.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},s.prototype.readAndCheckSignature=function(a){return a===this.readData(4)},s.prototype.readData=function(a){this.checkOffset(a);var o=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,o},t.exports=s},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var i=e("./ArrayReader");function s(a){i.call(this,a)}e("../utils").inherits(s,i),s.prototype.readData=function(a){if(this.checkOffset(a),a===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,o},t.exports=s},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var i=e("../utils"),s=e("../support"),a=e("./ArrayReader"),o=e("./StringReader"),p=e("./NodeBufferReader"),v=e("./Uint8ArrayReader");t.exports=function(x){var y=i.getTypeOf(x);return i.checkSupport(y),y!=="string"||s.uint8array?y==="nodebuffer"?new p(x):s.uint8array?new v(i.transformTo("uint8array",x)):new a(i.transformTo("array",x)):new o(x)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,t,r){"use strict";var i=e("./GenericWorker"),s=e("../utils");function a(o){i.call(this,"ConvertWorker to "+o),this.destType=o}s.inherits(a,i),a.prototype.processChunk=function(o){this.push({data:s.transformTo(this.destType,o.data),meta:o.meta})},t.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var i=e("./GenericWorker"),s=e("../crc32");function a(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(a,i),a.prototype.processChunk=function(o){this.streamInfo.crc32=s(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var i=e("../utils"),s=e("./GenericWorker");function a(o){s.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}i.inherits(a,s),a.prototype.processChunk=function(o){if(o){var p=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=p+o.data.length}s.prototype.processChunk.call(this,o)},t.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var i=e("../utils"),s=e("./GenericWorker");function a(o){s.call(this,"DataWorker");var p=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(v){p.dataIsReady=!0,p.data=v,p.max=v&&v.length||0,p.type=i.getTypeOf(v),p.isPaused||p._tickAndRepeat()},function(v){p.error(v)})}i.inherits(a,s),a.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,p=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,p);break;case"uint8array":o=this.data.subarray(this.index,p);break;case"array":case"nodebuffer":o=this.data.slice(this.index,p)}return this.index=p,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function i(s){this.name=s||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(s){this.emit("data",s)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(s){this.emit("error",s)}return!0},error:function(s){return!this.isFinished&&(this.isPaused?this.generatedError=s:(this.isFinished=!0,this.emit("error",s),this.previous&&this.previous.error(s),this.cleanUp()),!0)},on:function(s,a){return this._listeners[s].push(a),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(s,a){if(this._listeners[s])for(var o=0;o<this._listeners[s].length;o++)this._listeners[s][o].call(this,a)},pipe:function(s){return s.registerPrevious(this)},registerPrevious:function(s){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=s.streamInfo,this.mergeStreamInfo(),this.previous=s;var a=this;return s.on("data",function(o){a.processChunk(o)}),s.on("end",function(){a.end()}),s.on("error",function(o){a.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var s=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),s=!0),this.previous&&this.previous.resume(),!s},flush:function(){},processChunk:function(s){this.push(s)},withStreamInfo:function(s,a){return this.extraStreamInfo[s]=a,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var s in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,s)&&(this.streamInfo[s]=this.extraStreamInfo[s])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var s="Worker "+this.name;return this.previous?this.previous+" -> "+s:s}},t.exports=i},{}],29:[function(e,t,r){"use strict";var i=e("../utils"),s=e("./ConvertWorker"),a=e("./GenericWorker"),o=e("../base64"),p=e("../support"),v=e("../external"),x=null;if(p.nodestream)try{x=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function y(w,d){return new v.Promise(function(b,f){var k=[],C=w._internalType,B=w._outputType,T=w._mimeType;w.on("data",function(q,A){k.push(q),d&&d(A)}).on("error",function(q){k=[],f(q)}).on("end",function(){try{var q=function(A,g,m){switch(A){case"blob":return i.newBlob(i.transformTo("arraybuffer",g),m);case"base64":return o.encode(g);default:return i.transformTo(A,g)}}(B,function(A,g){var m,S=0,R=null,h=0;for(m=0;m<g.length;m++)h+=g[m].length;switch(A){case"string":return g.join("");case"array":return Array.prototype.concat.apply([],g);case"uint8array":for(R=new Uint8Array(h),m=0;m<g.length;m++)R.set(g[m],S),S+=g[m].length;return R;case"nodebuffer":return Buffer.concat(g);default:throw new Error("concat : unsupported type '"+A+"'")}}(C,k),T);b(q)}catch(A){f(A)}k=[]}).resume()})}function u(w,d,b){var f=d;switch(d){case"blob":case"arraybuffer":f="uint8array";break;case"base64":f="string"}try{this._internalType=f,this._outputType=d,this._mimeType=b,i.checkSupport(f),this._worker=w.pipe(new s(f)),w.lock()}catch(k){this._worker=new a("error"),this._worker.error(k)}}u.prototype={accumulate:function(w){return y(this,w)},on:function(w,d){var b=this;return w==="data"?this._worker.on(w,function(f){d.call(b,f.data,f.meta)}):this._worker.on(w,function(){i.delay(d,arguments,b)}),this},resume:function(){return i.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(w){if(i.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new x(this,{objectMode:this._outputType!=="nodebuffer"},w)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",r.nodebuffer=typeof Buffer<"u",r.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=new Blob([i],{type:"application/zip"}).size===0}catch{try{var s=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);s.append(i),r.blob=s.getBlob("application/zip").size===0}catch{r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch{r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,r){"use strict";for(var i=e("./utils"),s=e("./support"),a=e("./nodejsUtils"),o=e("./stream/GenericWorker"),p=new Array(256),v=0;v<256;v++)p[v]=252<=v?6:248<=v?5:240<=v?4:224<=v?3:192<=v?2:1;p[254]=p[254]=1;function x(){o.call(this,"utf-8 decode"),this.leftOver=null}function y(){o.call(this,"utf-8 encode")}r.utf8encode=function(u){return s.nodebuffer?a.newBufferFrom(u,"utf-8"):function(w){var d,b,f,k,C,B=w.length,T=0;for(k=0;k<B;k++)(64512&(b=w.charCodeAt(k)))==55296&&k+1<B&&(64512&(f=w.charCodeAt(k+1)))==56320&&(b=65536+(b-55296<<10)+(f-56320),k++),T+=b<128?1:b<2048?2:b<65536?3:4;for(d=s.uint8array?new Uint8Array(T):new Array(T),k=C=0;C<T;k++)(64512&(b=w.charCodeAt(k)))==55296&&k+1<B&&(64512&(f=w.charCodeAt(k+1)))==56320&&(b=65536+(b-55296<<10)+(f-56320),k++),b<128?d[C++]=b:(b<2048?d[C++]=192|b>>>6:(b<65536?d[C++]=224|b>>>12:(d[C++]=240|b>>>18,d[C++]=128|b>>>12&63),d[C++]=128|b>>>6&63),d[C++]=128|63&b);return d}(u)},r.utf8decode=function(u){return s.nodebuffer?i.transformTo("nodebuffer",u).toString("utf-8"):function(w){var d,b,f,k,C=w.length,B=new Array(2*C);for(d=b=0;d<C;)if((f=w[d++])<128)B[b++]=f;else if(4<(k=p[f]))B[b++]=65533,d+=k-1;else{for(f&=k===2?31:k===3?15:7;1<k&&d<C;)f=f<<6|63&w[d++],k--;1<k?B[b++]=65533:f<65536?B[b++]=f:(f-=65536,B[b++]=55296|f>>10&1023,B[b++]=56320|1023&f)}return B.length!==b&&(B.subarray?B=B.subarray(0,b):B.length=b),i.applyFromCharCode(B)}(u=i.transformTo(s.uint8array?"uint8array":"array",u))},i.inherits(x,o),x.prototype.processChunk=function(u){var w=i.transformTo(s.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(s.uint8array){var d=w;(w=new Uint8Array(d.length+this.leftOver.length)).set(this.leftOver,0),w.set(d,this.leftOver.length)}else w=this.leftOver.concat(w);this.leftOver=null}var b=function(k,C){var B;for((C=C||k.length)>k.length&&(C=k.length),B=C-1;0<=B&&(192&k[B])==128;)B--;return B<0||B===0?C:B+p[k[B]]>C?B:C}(w),f=w;b!==w.length&&(s.uint8array?(f=w.subarray(0,b),this.leftOver=w.subarray(b,w.length)):(f=w.slice(0,b),this.leftOver=w.slice(b,w.length))),this.push({data:r.utf8decode(f),meta:u.meta})},x.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:r.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},r.Utf8DecodeWorker=x,i.inherits(y,o),y.prototype.processChunk=function(u){this.push({data:r.utf8encode(u.data),meta:u.meta})},r.Utf8EncodeWorker=y},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,r){"use strict";var i=e("./support"),s=e("./base64"),a=e("./nodejsUtils"),o=e("./external");function p(d){return d}function v(d,b){for(var f=0;f<d.length;++f)b[f]=255&d.charCodeAt(f);return b}e("setimmediate"),r.newBlob=function(d,b){r.checkSupport("blob");try{return new Blob([d],{type:b})}catch{try{var f=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return f.append(d),f.getBlob(b)}catch{throw new Error("Bug : can't construct the Blob.")}}};var x={stringifyByChunk:function(d,b,f){var k=[],C=0,B=d.length;if(B<=f)return String.fromCharCode.apply(null,d);for(;C<B;)b==="array"||b==="nodebuffer"?k.push(String.fromCharCode.apply(null,d.slice(C,Math.min(C+f,B)))):k.push(String.fromCharCode.apply(null,d.subarray(C,Math.min(C+f,B)))),C+=f;return k.join("")},stringifyByChar:function(d){for(var b="",f=0;f<d.length;f++)b+=String.fromCharCode(d[f]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function y(d){var b=65536,f=r.getTypeOf(d),k=!0;if(f==="uint8array"?k=x.applyCanBeUsed.uint8array:f==="nodebuffer"&&(k=x.applyCanBeUsed.nodebuffer),k)for(;1<b;)try{return x.stringifyByChunk(d,f,b)}catch{b=Math.floor(b/2)}return x.stringifyByChar(d)}function u(d,b){for(var f=0;f<d.length;f++)b[f]=d[f];return b}r.applyFromCharCode=y;var w={};w.string={string:p,array:function(d){return v(d,new Array(d.length))},arraybuffer:function(d){return w.string.uint8array(d).buffer},uint8array:function(d){return v(d,new Uint8Array(d.length))},nodebuffer:function(d){return v(d,a.allocBuffer(d.length))}},w.array={string:y,array:p,arraybuffer:function(d){return new Uint8Array(d).buffer},uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return a.newBufferFrom(d)}},w.arraybuffer={string:function(d){return y(new Uint8Array(d))},array:function(d){return u(new Uint8Array(d),new Array(d.byteLength))},arraybuffer:p,uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return a.newBufferFrom(new Uint8Array(d))}},w.uint8array={string:y,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return d.buffer},uint8array:p,nodebuffer:function(d){return a.newBufferFrom(d)}},w.nodebuffer={string:y,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return w.nodebuffer.uint8array(d).buffer},uint8array:function(d){return u(d,new Uint8Array(d.length))},nodebuffer:p},r.transformTo=function(d,b){if(b=b||"",!d)return b;r.checkSupport(d);var f=r.getTypeOf(b);return w[f][d](b)},r.resolve=function(d){for(var b=d.split("/"),f=[],k=0;k<b.length;k++){var C=b[k];C==="."||C===""&&k!==0&&k!==b.length-1||(C===".."?f.pop():f.push(C))}return f.join("/")},r.getTypeOf=function(d){return typeof d=="string"?"string":Object.prototype.toString.call(d)==="[object Array]"?"array":i.nodebuffer&&a.isBuffer(d)?"nodebuffer":i.uint8array&&d instanceof Uint8Array?"uint8array":i.arraybuffer&&d instanceof ArrayBuffer?"arraybuffer":void 0},r.checkSupport=function(d){if(!i[d.toLowerCase()])throw new Error(d+" is not supported by this platform")},r.MAX_VALUE_16BITS=65535,r.MAX_VALUE_32BITS=-1,r.pretty=function(d){var b,f,k="";for(f=0;f<(d||"").length;f++)k+="\\x"+((b=d.charCodeAt(f))<16?"0":"")+b.toString(16).toUpperCase();return k},r.delay=function(d,b,f){setImmediate(function(){d.apply(f||null,b||[])})},r.inherits=function(d,b){function f(){}f.prototype=b.prototype,d.prototype=new f},r.extend=function(){var d,b,f={};for(d=0;d<arguments.length;d++)for(b in arguments[d])Object.prototype.hasOwnProperty.call(arguments[d],b)&&f[b]===void 0&&(f[b]=arguments[d][b]);return f},r.prepareContent=function(d,b,f,k,C){return o.Promise.resolve(b).then(function(B){return i.blob&&(B instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(B))!==-1)&&typeof FileReader<"u"?new o.Promise(function(T,q){var A=new FileReader;A.onload=function(g){T(g.target.result)},A.onerror=function(g){q(g.target.error)},A.readAsArrayBuffer(B)}):B}).then(function(B){var T=r.getTypeOf(B);return T?(T==="arraybuffer"?B=r.transformTo("uint8array",B):T==="string"&&(C?B=s.decode(B):f&&k!==!0&&(B=function(q){return v(q,i.uint8array?new Uint8Array(q.length):new Array(q.length))}(B))),B):o.Promise.reject(new Error("Can't read the data of '"+d+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var i=e("./reader/readerFor"),s=e("./utils"),a=e("./signature"),o=e("./zipEntry"),p=e("./support");function v(x){this.files=[],this.loadOptions=x}v.prototype={checkSignature:function(x){if(!this.reader.readAndCheckSignature(x)){this.reader.index-=4;var y=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+s.pretty(y)+", expected "+s.pretty(x)+")")}},isSignature:function(x,y){var u=this.reader.index;this.reader.setIndex(x);var w=this.reader.readString(4)===y;return this.reader.setIndex(u),w},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var x=this.reader.readData(this.zipCommentLength),y=p.uint8array?"uint8array":"array",u=s.transformTo(y,x);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var x,y,u,w=this.zip64EndOfCentralSize-44;0<w;)x=this.reader.readInt(2),y=this.reader.readInt(4),u=this.reader.readData(y),this.zip64ExtensibleData[x]={id:x,length:y,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var x,y;for(x=0;x<this.files.length;x++)y=this.files[x],this.reader.setIndex(y.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),y.readLocalPart(this.reader),y.handleUTF8(),y.processAttributes()},readCentralDir:function(){var x;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(x=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(x);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var x=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(x<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(x);var y=x;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){if(this.zip64=!0,(x=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(x),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var w=y-u;if(0<w)this.isSignature(y,a.CENTRAL_FILE_HEADER)||(this.reader.zero=w);else if(w<0)throw new Error("Corrupted zip: missing "+Math.abs(w)+" bytes.")},prepareReader:function(x){this.reader=i(x)},load:function(x){this.prepareReader(x),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=v},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var i=e("./reader/readerFor"),s=e("./utils"),a=e("./compressedObject"),o=e("./crc32"),p=e("./utf8"),v=e("./compressions"),x=e("./support");function y(u,w){this.options=u,this.loadOptions=w}y.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var w,d;if(u.skip(22),this.fileNameLength=u.readInt(2),d=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(d),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((w=function(b){for(var f in v)if(Object.prototype.hasOwnProperty.call(v,f)&&v[f].magic===b)return v[f];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,w,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var w=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(w),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var w,d,b,f=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<f;)w=u.readInt(2),d=u.readInt(2),b=u.readData(d),this.extraFields[w]={id:w,length:d,value:b};u.setIndex(f)},handleUTF8:function(){var u=x.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=p.utf8decode(this.fileName),this.fileCommentStr=p.utf8decode(this.fileComment);else{var w=this.findExtraFieldUnicodePath();if(w!==null)this.fileNameStr=w;else{var d=s.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(d)}var b=this.findExtraFieldUnicodeComment();if(b!==null)this.fileCommentStr=b;else{var f=s.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(f)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var w=i(u.value);return w.readInt(1)!==1||o(this.fileName)!==w.readInt(4)?null:p.utf8decode(w.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var w=i(u.value);return w.readInt(1)!==1||o(this.fileComment)!==w.readInt(4)?null:p.utf8decode(w.readData(u.length-5))}return null}},t.exports=y},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function i(w,d,b){this.name=w,this.dir=b.dir,this.date=b.date,this.comment=b.comment,this.unixPermissions=b.unixPermissions,this.dosPermissions=b.dosPermissions,this._data=d,this._dataBinary=b.binary,this.options={compression:b.compression,compressionOptions:b.compressionOptions}}var s=e("./stream/StreamHelper"),a=e("./stream/DataWorker"),o=e("./utf8"),p=e("./compressedObject"),v=e("./stream/GenericWorker");i.prototype={internalStream:function(w){var d=null,b="string";try{if(!w)throw new Error("No output type specified.");var f=(b=w.toLowerCase())==="string"||b==="text";b!=="binarystring"&&b!=="text"||(b="string"),d=this._decompressWorker();var k=!this._dataBinary;k&&!f&&(d=d.pipe(new o.Utf8EncodeWorker)),!k&&f&&(d=d.pipe(new o.Utf8DecodeWorker))}catch(C){(d=new v("error")).error(C)}return new s(d,b,"")},async:function(w,d){return this.internalStream(w).accumulate(d)},nodeStream:function(w,d){return this.internalStream(w||"nodebuffer").toNodejsStream(d)},_compressWorker:function(w,d){if(this._data instanceof p&&this._data.compression.magic===w.magic)return this._data.getCompressedWorker();var b=this._decompressWorker();return this._dataBinary||(b=b.pipe(new o.Utf8EncodeWorker)),p.createWorkerFrom(b,w,d)},_decompressWorker:function(){return this._data instanceof p?this._data.getContentWorker():this._data instanceof v?this._data:new a(this._data)}};for(var x=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],y=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<x.length;u++)i.prototype[x[u]]=y;t.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,t,r){(function(i){"use strict";var s,a,o=i.MutationObserver||i.WebKitMutationObserver;if(o){var p=0,v=new o(w),x=i.document.createTextNode("");v.observe(x,{characterData:!0}),s=function(){x.data=p=++p%2}}else if(i.setImmediate||i.MessageChannel===void 0)s="document"in i&&"onreadystatechange"in i.document.createElement("script")?function(){var d=i.document.createElement("script");d.onreadystatechange=function(){w(),d.onreadystatechange=null,d.parentNode.removeChild(d),d=null},i.document.documentElement.appendChild(d)}:function(){setTimeout(w,0)};else{var y=new i.MessageChannel;y.port1.onmessage=w,s=function(){y.port2.postMessage(0)}}var u=[];function w(){var d,b;a=!0;for(var f=u.length;f;){for(b=u,u=[],d=-1;++d<f;)b[d]();f=u.length}a=!1}t.exports=function(d){u.push(d)!==1||a||s()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function s(){}var a={},o=["REJECTED"],p=["FULFILLED"],v=["PENDING"];function x(f){if(typeof f!="function")throw new TypeError("resolver must be a function");this.state=v,this.queue=[],this.outcome=void 0,f!==s&&d(this,f)}function y(f,k,C){this.promise=f,typeof k=="function"&&(this.onFulfilled=k,this.callFulfilled=this.otherCallFulfilled),typeof C=="function"&&(this.onRejected=C,this.callRejected=this.otherCallRejected)}function u(f,k,C){i(function(){var B;try{B=k(C)}catch(T){return a.reject(f,T)}B===f?a.reject(f,new TypeError("Cannot resolve promise with itself")):a.resolve(f,B)})}function w(f){var k=f&&f.then;if(f&&(typeof f=="object"||typeof f=="function")&&typeof k=="function")return function(){k.apply(f,arguments)}}function d(f,k){var C=!1;function B(A){C||(C=!0,a.reject(f,A))}function T(A){C||(C=!0,a.resolve(f,A))}var q=b(function(){k(T,B)});q.status==="error"&&B(q.value)}function b(f,k){var C={};try{C.value=f(k),C.status="success"}catch(B){C.status="error",C.value=B}return C}(t.exports=x).prototype.finally=function(f){if(typeof f!="function")return this;var k=this.constructor;return this.then(function(C){return k.resolve(f()).then(function(){return C})},function(C){return k.resolve(f()).then(function(){throw C})})},x.prototype.catch=function(f){return this.then(null,f)},x.prototype.then=function(f,k){if(typeof f!="function"&&this.state===p||typeof k!="function"&&this.state===o)return this;var C=new this.constructor(s);return this.state!==v?u(C,this.state===p?f:k,this.outcome):this.queue.push(new y(C,f,k)),C},y.prototype.callFulfilled=function(f){a.resolve(this.promise,f)},y.prototype.otherCallFulfilled=function(f){u(this.promise,this.onFulfilled,f)},y.prototype.callRejected=function(f){a.reject(this.promise,f)},y.prototype.otherCallRejected=function(f){u(this.promise,this.onRejected,f)},a.resolve=function(f,k){var C=b(w,k);if(C.status==="error")return a.reject(f,C.value);var B=C.value;if(B)d(f,B);else{f.state=p,f.outcome=k;for(var T=-1,q=f.queue.length;++T<q;)f.queue[T].callFulfilled(k)}return f},a.reject=function(f,k){f.state=o,f.outcome=k;for(var C=-1,B=f.queue.length;++C<B;)f.queue[C].callRejected(k);return f},x.resolve=function(f){return f instanceof this?f:a.resolve(new this(s),f)},x.reject=function(f){var k=new this(s);return a.reject(k,f)},x.all=function(f){var k=this;if(Object.prototype.toString.call(f)!=="[object Array]")return this.reject(new TypeError("must be an array"));var C=f.length,B=!1;if(!C)return this.resolve([]);for(var T=new Array(C),q=0,A=-1,g=new this(s);++A<C;)m(f[A],A);return g;function m(S,R){k.resolve(S).then(function(h){T[R]=h,++q!==C||B||(B=!0,a.resolve(g,T))},function(h){B||(B=!0,a.reject(g,h))})}},x.race=function(f){var k=this;if(Object.prototype.toString.call(f)!=="[object Array]")return this.reject(new TypeError("must be an array"));var C=f.length,B=!1;if(!C)return this.resolve([]);for(var T=-1,q=new this(s);++T<C;)A=f[T],k.resolve(A).then(function(g){B||(B=!0,a.resolve(q,g))},function(g){B||(B=!0,a.reject(q,g))});var A;return q}},{immediate:36}],38:[function(e,t,r){"use strict";var i={};(0,e("./lib/utils/common").assign)(i,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var i=e("./zlib/deflate"),s=e("./utils/common"),a=e("./utils/strings"),o=e("./zlib/messages"),p=e("./zlib/zstream"),v=Object.prototype.toString,x=0,y=-1,u=0,w=8;function d(f){if(!(this instanceof d))return new d(f);this.options=s.assign({level:y,method:w,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},f||{});var k=this.options;k.raw&&0<k.windowBits?k.windowBits=-k.windowBits:k.gzip&&0<k.windowBits&&k.windowBits<16&&(k.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new p,this.strm.avail_out=0;var C=i.deflateInit2(this.strm,k.level,k.method,k.windowBits,k.memLevel,k.strategy);if(C!==x)throw new Error(o[C]);if(k.header&&i.deflateSetHeader(this.strm,k.header),k.dictionary){var B;if(B=typeof k.dictionary=="string"?a.string2buf(k.dictionary):v.call(k.dictionary)==="[object ArrayBuffer]"?new Uint8Array(k.dictionary):k.dictionary,(C=i.deflateSetDictionary(this.strm,B))!==x)throw new Error(o[C]);this._dict_set=!0}}function b(f,k){var C=new d(k);if(C.push(f,!0),C.err)throw C.msg||o[C.err];return C.result}d.prototype.push=function(f,k){var C,B,T=this.strm,q=this.options.chunkSize;if(this.ended)return!1;B=k===~~k?k:k===!0?4:0,typeof f=="string"?T.input=a.string2buf(f):v.call(f)==="[object ArrayBuffer]"?T.input=new Uint8Array(f):T.input=f,T.next_in=0,T.avail_in=T.input.length;do{if(T.avail_out===0&&(T.output=new s.Buf8(q),T.next_out=0,T.avail_out=q),(C=i.deflate(T,B))!==1&&C!==x)return this.onEnd(C),!(this.ended=!0);T.avail_out!==0&&(T.avail_in!==0||B!==4&&B!==2)||(this.options.to==="string"?this.onData(a.buf2binstring(s.shrinkBuf(T.output,T.next_out))):this.onData(s.shrinkBuf(T.output,T.next_out)))}while((0<T.avail_in||T.avail_out===0)&&C!==1);return B===4?(C=i.deflateEnd(this.strm),this.onEnd(C),this.ended=!0,C===x):B!==2||(this.onEnd(x),!(T.avail_out=0))},d.prototype.onData=function(f){this.chunks.push(f)},d.prototype.onEnd=function(f){f===x&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=f,this.msg=this.strm.msg},r.Deflate=d,r.deflate=b,r.deflateRaw=function(f,k){return(k=k||{}).raw=!0,b(f,k)},r.gzip=function(f,k){return(k=k||{}).gzip=!0,b(f,k)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var i=e("./zlib/inflate"),s=e("./utils/common"),a=e("./utils/strings"),o=e("./zlib/constants"),p=e("./zlib/messages"),v=e("./zlib/zstream"),x=e("./zlib/gzheader"),y=Object.prototype.toString;function u(d){if(!(this instanceof u))return new u(d);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},d||{});var b=this.options;b.raw&&0<=b.windowBits&&b.windowBits<16&&(b.windowBits=-b.windowBits,b.windowBits===0&&(b.windowBits=-15)),!(0<=b.windowBits&&b.windowBits<16)||d&&d.windowBits||(b.windowBits+=32),15<b.windowBits&&b.windowBits<48&&(15&b.windowBits)==0&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new v,this.strm.avail_out=0;var f=i.inflateInit2(this.strm,b.windowBits);if(f!==o.Z_OK)throw new Error(p[f]);this.header=new x,i.inflateGetHeader(this.strm,this.header)}function w(d,b){var f=new u(b);if(f.push(d,!0),f.err)throw f.msg||p[f.err];return f.result}u.prototype.push=function(d,b){var f,k,C,B,T,q,A=this.strm,g=this.options.chunkSize,m=this.options.dictionary,S=!1;if(this.ended)return!1;k=b===~~b?b:b===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof d=="string"?A.input=a.binstring2buf(d):y.call(d)==="[object ArrayBuffer]"?A.input=new Uint8Array(d):A.input=d,A.next_in=0,A.avail_in=A.input.length;do{if(A.avail_out===0&&(A.output=new s.Buf8(g),A.next_out=0,A.avail_out=g),(f=i.inflate(A,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&m&&(q=typeof m=="string"?a.string2buf(m):y.call(m)==="[object ArrayBuffer]"?new Uint8Array(m):m,f=i.inflateSetDictionary(this.strm,q)),f===o.Z_BUF_ERROR&&S===!0&&(f=o.Z_OK,S=!1),f!==o.Z_STREAM_END&&f!==o.Z_OK)return this.onEnd(f),!(this.ended=!0);A.next_out&&(A.avail_out!==0&&f!==o.Z_STREAM_END&&(A.avail_in!==0||k!==o.Z_FINISH&&k!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(C=a.utf8border(A.output,A.next_out),B=A.next_out-C,T=a.buf2string(A.output,C),A.next_out=B,A.avail_out=g-B,B&&s.arraySet(A.output,A.output,C,B,0),this.onData(T)):this.onData(s.shrinkBuf(A.output,A.next_out)))),A.avail_in===0&&A.avail_out===0&&(S=!0)}while((0<A.avail_in||A.avail_out===0)&&f!==o.Z_STREAM_END);return f===o.Z_STREAM_END&&(k=o.Z_FINISH),k===o.Z_FINISH?(f=i.inflateEnd(this.strm),this.onEnd(f),this.ended=!0,f===o.Z_OK):k!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(A.avail_out=0))},u.prototype.onData=function(d){this.chunks.push(d)},u.prototype.onEnd=function(d){d===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=d,this.msg=this.strm.msg},r.Inflate=u,r.inflate=w,r.inflateRaw=function(d,b){return(b=b||{}).raw=!0,w(d,b)},r.ungzip=w},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";r.assign=function(o){for(var p=Array.prototype.slice.call(arguments,1);p.length;){var v=p.shift();if(v){if(typeof v!="object")throw new TypeError(v+"must be non-object");for(var x in v)v.hasOwnProperty(x)&&(o[x]=v[x])}}return o},r.shrinkBuf=function(o,p){return o.length===p?o:o.subarray?o.subarray(0,p):(o.length=p,o)};var s={arraySet:function(o,p,v,x,y){if(p.subarray&&o.subarray)o.set(p.subarray(v,v+x),y);else for(var u=0;u<x;u++)o[y+u]=p[v+u]},flattenChunks:function(o){var p,v,x,y,u,w;for(p=x=0,v=o.length;p<v;p++)x+=o[p].length;for(w=new Uint8Array(x),p=y=0,v=o.length;p<v;p++)u=o[p],w.set(u,y),y+=u.length;return w}},a={arraySet:function(o,p,v,x,y){for(var u=0;u<x;u++)o[y+u]=p[v+u]},flattenChunks:function(o){return[].concat.apply([],o)}};r.setTyped=function(o){o?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,s)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,a))},r.setTyped(i)},{}],42:[function(e,t,r){"use strict";var i=e("./common"),s=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{s=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var o=new i.Buf8(256),p=0;p<256;p++)o[p]=252<=p?6:248<=p?5:240<=p?4:224<=p?3:192<=p?2:1;function v(x,y){if(y<65537&&(x.subarray&&a||!x.subarray&&s))return String.fromCharCode.apply(null,i.shrinkBuf(x,y));for(var u="",w=0;w<y;w++)u+=String.fromCharCode(x[w]);return u}o[254]=o[254]=1,r.string2buf=function(x){var y,u,w,d,b,f=x.length,k=0;for(d=0;d<f;d++)(64512&(u=x.charCodeAt(d)))==55296&&d+1<f&&(64512&(w=x.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(w-56320),d++),k+=u<128?1:u<2048?2:u<65536?3:4;for(y=new i.Buf8(k),d=b=0;b<k;d++)(64512&(u=x.charCodeAt(d)))==55296&&d+1<f&&(64512&(w=x.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(w-56320),d++),u<128?y[b++]=u:(u<2048?y[b++]=192|u>>>6:(u<65536?y[b++]=224|u>>>12:(y[b++]=240|u>>>18,y[b++]=128|u>>>12&63),y[b++]=128|u>>>6&63),y[b++]=128|63&u);return y},r.buf2binstring=function(x){return v(x,x.length)},r.binstring2buf=function(x){for(var y=new i.Buf8(x.length),u=0,w=y.length;u<w;u++)y[u]=x.charCodeAt(u);return y},r.buf2string=function(x,y){var u,w,d,b,f=y||x.length,k=new Array(2*f);for(u=w=0;u<f;)if((d=x[u++])<128)k[w++]=d;else if(4<(b=o[d]))k[w++]=65533,u+=b-1;else{for(d&=b===2?31:b===3?15:7;1<b&&u<f;)d=d<<6|63&x[u++],b--;1<b?k[w++]=65533:d<65536?k[w++]=d:(d-=65536,k[w++]=55296|d>>10&1023,k[w++]=56320|1023&d)}return v(k,w)},r.utf8border=function(x,y){var u;for((y=y||x.length)>x.length&&(y=x.length),u=y-1;0<=u&&(192&x[u])==128;)u--;return u<0||u===0?y:u+o[x[u]]>y?u:y}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(i,s,a,o){for(var p=65535&i|0,v=i>>>16&65535|0,x=0;a!==0;){for(a-=x=2e3<a?2e3:a;v=v+(p=p+s[o++]|0)|0,--x;);p%=65521,v%=65521}return p|v<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var i=function(){for(var s,a=[],o=0;o<256;o++){s=o;for(var p=0;p<8;p++)s=1&s?3988292384^s>>>1:s>>>1;a[o]=s}return a}();t.exports=function(s,a,o,p){var v=i,x=p+o;s^=-1;for(var y=p;y<x;y++)s=s>>>8^v[255&(s^a[y])];return-1^s}},{}],46:[function(e,t,r){"use strict";var i,s=e("../utils/common"),a=e("./trees"),o=e("./adler32"),p=e("./crc32"),v=e("./messages"),x=0,y=4,u=0,w=-2,d=-1,b=4,f=2,k=8,C=9,B=286,T=30,q=19,A=2*B+1,g=15,m=3,S=258,R=S+m+1,h=42,N=113,l=1,F=2,ne=3,$=4;function Q(n,D){return n.msg=v[D],D}function j(n){return(n<<1)-(4<n?9:0)}function G(n){for(var D=n.length;0<=--D;)n[D]=0}function I(n){var D=n.state,z=D.pending;z>n.avail_out&&(z=n.avail_out),z!==0&&(s.arraySet(n.output,D.pending_buf,D.pending_out,z,n.next_out),n.next_out+=z,D.pending_out+=z,n.total_out+=z,n.avail_out-=z,D.pending-=z,D.pending===0&&(D.pending_out=0))}function M(n,D){a._tr_flush_block(n,0<=n.block_start?n.block_start:-1,n.strstart-n.block_start,D),n.block_start=n.strstart,I(n.strm)}function W(n,D){n.pending_buf[n.pending++]=D}function X(n,D){n.pending_buf[n.pending++]=D>>>8&255,n.pending_buf[n.pending++]=255&D}function Z(n,D){var z,E,c=n.max_chain_length,_=n.strstart,O=n.prev_length,U=n.nice_match,L=n.strstart>n.w_size-R?n.strstart-(n.w_size-R):0,P=n.window,K=n.w_mask,Y=n.prev,H=n.strstart+S,ee=P[_+O-1],J=P[_+O];n.prev_length>=n.good_match&&(c>>=2),U>n.lookahead&&(U=n.lookahead);do if(P[(z=D)+O]===J&&P[z+O-1]===ee&&P[z]===P[_]&&P[++z]===P[_+1]){_+=2,z++;do;while(P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&P[++_]===P[++z]&&_<H);if(E=S-(H-_),_=H-S,O<E){if(n.match_start=D,U<=(O=E))break;ee=P[_+O-1],J=P[_+O]}}while((D=Y[D&K])>L&&--c!=0);return O<=n.lookahead?O:n.lookahead}function le(n){var D,z,E,c,_,O,U,L,P,K,Y=n.w_size;do{if(c=n.window_size-n.lookahead-n.strstart,n.strstart>=Y+(Y-R)){for(s.arraySet(n.window,n.window,Y,Y,0),n.match_start-=Y,n.strstart-=Y,n.block_start-=Y,D=z=n.hash_size;E=n.head[--D],n.head[D]=Y<=E?E-Y:0,--z;);for(D=z=Y;E=n.prev[--D],n.prev[D]=Y<=E?E-Y:0,--z;);c+=Y}if(n.strm.avail_in===0)break;if(O=n.strm,U=n.window,L=n.strstart+n.lookahead,P=c,K=void 0,K=O.avail_in,P<K&&(K=P),z=K===0?0:(O.avail_in-=K,s.arraySet(U,O.input,O.next_in,K,L),O.state.wrap===1?O.adler=o(O.adler,U,K,L):O.state.wrap===2&&(O.adler=p(O.adler,U,K,L)),O.next_in+=K,O.total_in+=K,K),n.lookahead+=z,n.lookahead+n.insert>=m)for(_=n.strstart-n.insert,n.ins_h=n.window[_],n.ins_h=(n.ins_h<<n.hash_shift^n.window[_+1])&n.hash_mask;n.insert&&(n.ins_h=(n.ins_h<<n.hash_shift^n.window[_+m-1])&n.hash_mask,n.prev[_&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=_,_++,n.insert--,!(n.lookahead+n.insert<m)););}while(n.lookahead<R&&n.strm.avail_in!==0)}function me(n,D){for(var z,E;;){if(n.lookahead<R){if(le(n),n.lookahead<R&&D===x)return l;if(n.lookahead===0)break}if(z=0,n.lookahead>=m&&(n.ins_h=(n.ins_h<<n.hash_shift^n.window[n.strstart+m-1])&n.hash_mask,z=n.prev[n.strstart&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=n.strstart),z!==0&&n.strstart-z<=n.w_size-R&&(n.match_length=Z(n,z)),n.match_length>=m)if(E=a._tr_tally(n,n.strstart-n.match_start,n.match_length-m),n.lookahead-=n.match_length,n.match_length<=n.max_lazy_match&&n.lookahead>=m){for(n.match_length--;n.strstart++,n.ins_h=(n.ins_h<<n.hash_shift^n.window[n.strstart+m-1])&n.hash_mask,z=n.prev[n.strstart&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=n.strstart,--n.match_length!=0;);n.strstart++}else n.strstart+=n.match_length,n.match_length=0,n.ins_h=n.window[n.strstart],n.ins_h=(n.ins_h<<n.hash_shift^n.window[n.strstart+1])&n.hash_mask;else E=a._tr_tally(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++;if(E&&(M(n,!1),n.strm.avail_out===0))return l}return n.insert=n.strstart<m-1?n.strstart:m-1,D===y?(M(n,!0),n.strm.avail_out===0?ne:$):n.last_lit&&(M(n,!1),n.strm.avail_out===0)?l:F}function te(n,D){for(var z,E,c;;){if(n.lookahead<R){if(le(n),n.lookahead<R&&D===x)return l;if(n.lookahead===0)break}if(z=0,n.lookahead>=m&&(n.ins_h=(n.ins_h<<n.hash_shift^n.window[n.strstart+m-1])&n.hash_mask,z=n.prev[n.strstart&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=n.strstart),n.prev_length=n.match_length,n.prev_match=n.match_start,n.match_length=m-1,z!==0&&n.prev_length<n.max_lazy_match&&n.strstart-z<=n.w_size-R&&(n.match_length=Z(n,z),n.match_length<=5&&(n.strategy===1||n.match_length===m&&4096<n.strstart-n.match_start)&&(n.match_length=m-1)),n.prev_length>=m&&n.match_length<=n.prev_length){for(c=n.strstart+n.lookahead-m,E=a._tr_tally(n,n.strstart-1-n.prev_match,n.prev_length-m),n.lookahead-=n.prev_length-1,n.prev_length-=2;++n.strstart<=c&&(n.ins_h=(n.ins_h<<n.hash_shift^n.window[n.strstart+m-1])&n.hash_mask,z=n.prev[n.strstart&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=n.strstart),--n.prev_length!=0;);if(n.match_available=0,n.match_length=m-1,n.strstart++,E&&(M(n,!1),n.strm.avail_out===0))return l}else if(n.match_available){if((E=a._tr_tally(n,0,n.window[n.strstart-1]))&&M(n,!1),n.strstart++,n.lookahead--,n.strm.avail_out===0)return l}else n.match_available=1,n.strstart++,n.lookahead--}return n.match_available&&(E=a._tr_tally(n,0,n.window[n.strstart-1]),n.match_available=0),n.insert=n.strstart<m-1?n.strstart:m-1,D===y?(M(n,!0),n.strm.avail_out===0?ne:$):n.last_lit&&(M(n,!1),n.strm.avail_out===0)?l:F}function re(n,D,z,E,c){this.good_length=n,this.max_lazy=D,this.nice_length=z,this.max_chain=E,this.func=c}function oe(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=k,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new s.Buf16(2*A),this.dyn_dtree=new s.Buf16(2*(2*T+1)),this.bl_tree=new s.Buf16(2*(2*q+1)),G(this.dyn_ltree),G(this.dyn_dtree),G(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new s.Buf16(g+1),this.heap=new s.Buf16(2*B+1),G(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new s.Buf16(2*B+1),G(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function se(n){var D;return n&&n.state?(n.total_in=n.total_out=0,n.data_type=f,(D=n.state).pending=0,D.pending_out=0,D.wrap<0&&(D.wrap=-D.wrap),D.status=D.wrap?h:N,n.adler=D.wrap===2?0:1,D.last_flush=x,a._tr_init(D),u):Q(n,w)}function de(n){var D=se(n);return D===u&&function(z){z.window_size=2*z.w_size,G(z.head),z.max_lazy_match=i[z.level].max_lazy,z.good_match=i[z.level].good_length,z.nice_match=i[z.level].nice_length,z.max_chain_length=i[z.level].max_chain,z.strstart=0,z.block_start=0,z.lookahead=0,z.insert=0,z.match_length=z.prev_length=m-1,z.match_available=0,z.ins_h=0}(n.state),D}function he(n,D,z,E,c,_){if(!n)return w;var O=1;if(D===d&&(D=6),E<0?(O=0,E=-E):15<E&&(O=2,E-=16),c<1||C<c||z!==k||E<8||15<E||D<0||9<D||_<0||b<_)return Q(n,w);E===8&&(E=9);var U=new oe;return(n.state=U).strm=n,U.wrap=O,U.gzhead=null,U.w_bits=E,U.w_size=1<<U.w_bits,U.w_mask=U.w_size-1,U.hash_bits=c+7,U.hash_size=1<<U.hash_bits,U.hash_mask=U.hash_size-1,U.hash_shift=~~((U.hash_bits+m-1)/m),U.window=new s.Buf8(2*U.w_size),U.head=new s.Buf16(U.hash_size),U.prev=new s.Buf16(U.w_size),U.lit_bufsize=1<<c+6,U.pending_buf_size=4*U.lit_bufsize,U.pending_buf=new s.Buf8(U.pending_buf_size),U.d_buf=1*U.lit_bufsize,U.l_buf=3*U.lit_bufsize,U.level=D,U.strategy=_,U.method=z,de(n)}i=[new re(0,0,0,0,function(n,D){var z=65535;for(z>n.pending_buf_size-5&&(z=n.pending_buf_size-5);;){if(n.lookahead<=1){if(le(n),n.lookahead===0&&D===x)return l;if(n.lookahead===0)break}n.strstart+=n.lookahead,n.lookahead=0;var E=n.block_start+z;if((n.strstart===0||n.strstart>=E)&&(n.lookahead=n.strstart-E,n.strstart=E,M(n,!1),n.strm.avail_out===0)||n.strstart-n.block_start>=n.w_size-R&&(M(n,!1),n.strm.avail_out===0))return l}return n.insert=0,D===y?(M(n,!0),n.strm.avail_out===0?ne:$):(n.strstart>n.block_start&&(M(n,!1),n.strm.avail_out),l)}),new re(4,4,8,4,me),new re(4,5,16,8,me),new re(4,6,32,32,me),new re(4,4,16,16,te),new re(8,16,32,32,te),new re(8,16,128,128,te),new re(8,32,128,256,te),new re(32,128,258,1024,te),new re(32,258,258,4096,te)],r.deflateInit=function(n,D){return he(n,D,k,15,8,0)},r.deflateInit2=he,r.deflateReset=de,r.deflateResetKeep=se,r.deflateSetHeader=function(n,D){return n&&n.state?n.state.wrap!==2?w:(n.state.gzhead=D,u):w},r.deflate=function(n,D){var z,E,c,_;if(!n||!n.state||5<D||D<0)return n?Q(n,w):w;if(E=n.state,!n.output||!n.input&&n.avail_in!==0||E.status===666&&D!==y)return Q(n,n.avail_out===0?-5:w);if(E.strm=n,z=E.last_flush,E.last_flush=D,E.status===h)if(E.wrap===2)n.adler=0,W(E,31),W(E,139),W(E,8),E.gzhead?(W(E,(E.gzhead.text?1:0)+(E.gzhead.hcrc?2:0)+(E.gzhead.extra?4:0)+(E.gzhead.name?8:0)+(E.gzhead.comment?16:0)),W(E,255&E.gzhead.time),W(E,E.gzhead.time>>8&255),W(E,E.gzhead.time>>16&255),W(E,E.gzhead.time>>24&255),W(E,E.level===9?2:2<=E.strategy||E.level<2?4:0),W(E,255&E.gzhead.os),E.gzhead.extra&&E.gzhead.extra.length&&(W(E,255&E.gzhead.extra.length),W(E,E.gzhead.extra.length>>8&255)),E.gzhead.hcrc&&(n.adler=p(n.adler,E.pending_buf,E.pending,0)),E.gzindex=0,E.status=69):(W(E,0),W(E,0),W(E,0),W(E,0),W(E,0),W(E,E.level===9?2:2<=E.strategy||E.level<2?4:0),W(E,3),E.status=N);else{var O=k+(E.w_bits-8<<4)<<8;O|=(2<=E.strategy||E.level<2?0:E.level<6?1:E.level===6?2:3)<<6,E.strstart!==0&&(O|=32),O+=31-O%31,E.status=N,X(E,O),E.strstart!==0&&(X(E,n.adler>>>16),X(E,65535&n.adler)),n.adler=1}if(E.status===69)if(E.gzhead.extra){for(c=E.pending;E.gzindex<(65535&E.gzhead.extra.length)&&(E.pending!==E.pending_buf_size||(E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),I(n),c=E.pending,E.pending!==E.pending_buf_size));)W(E,255&E.gzhead.extra[E.gzindex]),E.gzindex++;E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),E.gzindex===E.gzhead.extra.length&&(E.gzindex=0,E.status=73)}else E.status=73;if(E.status===73)if(E.gzhead.name){c=E.pending;do{if(E.pending===E.pending_buf_size&&(E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),I(n),c=E.pending,E.pending===E.pending_buf_size)){_=1;break}_=E.gzindex<E.gzhead.name.length?255&E.gzhead.name.charCodeAt(E.gzindex++):0,W(E,_)}while(_!==0);E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),_===0&&(E.gzindex=0,E.status=91)}else E.status=91;if(E.status===91)if(E.gzhead.comment){c=E.pending;do{if(E.pending===E.pending_buf_size&&(E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),I(n),c=E.pending,E.pending===E.pending_buf_size)){_=1;break}_=E.gzindex<E.gzhead.comment.length?255&E.gzhead.comment.charCodeAt(E.gzindex++):0,W(E,_)}while(_!==0);E.gzhead.hcrc&&E.pending>c&&(n.adler=p(n.adler,E.pending_buf,E.pending-c,c)),_===0&&(E.status=103)}else E.status=103;if(E.status===103&&(E.gzhead.hcrc?(E.pending+2>E.pending_buf_size&&I(n),E.pending+2<=E.pending_buf_size&&(W(E,255&n.adler),W(E,n.adler>>8&255),n.adler=0,E.status=N)):E.status=N),E.pending!==0){if(I(n),n.avail_out===0)return E.last_flush=-1,u}else if(n.avail_in===0&&j(D)<=j(z)&&D!==y)return Q(n,-5);if(E.status===666&&n.avail_in!==0)return Q(n,-5);if(n.avail_in!==0||E.lookahead!==0||D!==x&&E.status!==666){var U=E.strategy===2?function(L,P){for(var K;;){if(L.lookahead===0&&(le(L),L.lookahead===0)){if(P===x)return l;break}if(L.match_length=0,K=a._tr_tally(L,0,L.window[L.strstart]),L.lookahead--,L.strstart++,K&&(M(L,!1),L.strm.avail_out===0))return l}return L.insert=0,P===y?(M(L,!0),L.strm.avail_out===0?ne:$):L.last_lit&&(M(L,!1),L.strm.avail_out===0)?l:F}(E,D):E.strategy===3?function(L,P){for(var K,Y,H,ee,J=L.window;;){if(L.lookahead<=S){if(le(L),L.lookahead<=S&&P===x)return l;if(L.lookahead===0)break}if(L.match_length=0,L.lookahead>=m&&0<L.strstart&&(Y=J[H=L.strstart-1])===J[++H]&&Y===J[++H]&&Y===J[++H]){ee=L.strstart+S;do;while(Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&Y===J[++H]&&H<ee);L.match_length=S-(ee-H),L.match_length>L.lookahead&&(L.match_length=L.lookahead)}if(L.match_length>=m?(K=a._tr_tally(L,1,L.match_length-m),L.lookahead-=L.match_length,L.strstart+=L.match_length,L.match_length=0):(K=a._tr_tally(L,0,L.window[L.strstart]),L.lookahead--,L.strstart++),K&&(M(L,!1),L.strm.avail_out===0))return l}return L.insert=0,P===y?(M(L,!0),L.strm.avail_out===0?ne:$):L.last_lit&&(M(L,!1),L.strm.avail_out===0)?l:F}(E,D):i[E.level].func(E,D);if(U!==ne&&U!==$||(E.status=666),U===l||U===ne)return n.avail_out===0&&(E.last_flush=-1),u;if(U===F&&(D===1?a._tr_align(E):D!==5&&(a._tr_stored_block(E,0,0,!1),D===3&&(G(E.head),E.lookahead===0&&(E.strstart=0,E.block_start=0,E.insert=0))),I(n),n.avail_out===0))return E.last_flush=-1,u}return D!==y?u:E.wrap<=0?1:(E.wrap===2?(W(E,255&n.adler),W(E,n.adler>>8&255),W(E,n.adler>>16&255),W(E,n.adler>>24&255),W(E,255&n.total_in),W(E,n.total_in>>8&255),W(E,n.total_in>>16&255),W(E,n.total_in>>24&255)):(X(E,n.adler>>>16),X(E,65535&n.adler)),I(n),0<E.wrap&&(E.wrap=-E.wrap),E.pending!==0?u:1)},r.deflateEnd=function(n){var D;return n&&n.state?(D=n.state.status)!==h&&D!==69&&D!==73&&D!==91&&D!==103&&D!==N&&D!==666?Q(n,w):(n.state=null,D===N?Q(n,-3):u):w},r.deflateSetDictionary=function(n,D){var z,E,c,_,O,U,L,P,K=D.length;if(!n||!n.state||(_=(z=n.state).wrap)===2||_===1&&z.status!==h||z.lookahead)return w;for(_===1&&(n.adler=o(n.adler,D,K,0)),z.wrap=0,K>=z.w_size&&(_===0&&(G(z.head),z.strstart=0,z.block_start=0,z.insert=0),P=new s.Buf8(z.w_size),s.arraySet(P,D,K-z.w_size,z.w_size,0),D=P,K=z.w_size),O=n.avail_in,U=n.next_in,L=n.input,n.avail_in=K,n.next_in=0,n.input=D,le(z);z.lookahead>=m;){for(E=z.strstart,c=z.lookahead-(m-1);z.ins_h=(z.ins_h<<z.hash_shift^z.window[E+m-1])&z.hash_mask,z.prev[E&z.w_mask]=z.head[z.ins_h],z.head[z.ins_h]=E,E++,--c;);z.strstart=E,z.lookahead=m-1,le(z)}return z.strstart+=z.lookahead,z.block_start=z.strstart,z.insert=z.lookahead,z.lookahead=0,z.match_length=z.prev_length=m-1,z.match_available=0,n.next_in=U,n.input=L,n.avail_in=O,z.wrap=_,u},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(i,s){var a,o,p,v,x,y,u,w,d,b,f,k,C,B,T,q,A,g,m,S,R,h,N,l,F;a=i.state,o=i.next_in,l=i.input,p=o+(i.avail_in-5),v=i.next_out,F=i.output,x=v-(s-i.avail_out),y=v+(i.avail_out-257),u=a.dmax,w=a.wsize,d=a.whave,b=a.wnext,f=a.window,k=a.hold,C=a.bits,B=a.lencode,T=a.distcode,q=(1<<a.lenbits)-1,A=(1<<a.distbits)-1;e:do{C<15&&(k+=l[o++]<<C,C+=8,k+=l[o++]<<C,C+=8),g=B[k&q];t:for(;;){if(k>>>=m=g>>>24,C-=m,(m=g>>>16&255)===0)F[v++]=65535&g;else{if(!(16&m)){if((64&m)==0){g=B[(65535&g)+(k&(1<<m)-1)];continue t}if(32&m){a.mode=12;break e}i.msg="invalid literal/length code",a.mode=30;break e}S=65535&g,(m&=15)&&(C<m&&(k+=l[o++]<<C,C+=8),S+=k&(1<<m)-1,k>>>=m,C-=m),C<15&&(k+=l[o++]<<C,C+=8,k+=l[o++]<<C,C+=8),g=T[k&A];n:for(;;){if(k>>>=m=g>>>24,C-=m,!(16&(m=g>>>16&255))){if((64&m)==0){g=T[(65535&g)+(k&(1<<m)-1)];continue n}i.msg="invalid distance code",a.mode=30;break e}if(R=65535&g,C<(m&=15)&&(k+=l[o++]<<C,(C+=8)<m&&(k+=l[o++]<<C,C+=8)),u<(R+=k&(1<<m)-1)){i.msg="invalid distance too far back",a.mode=30;break e}if(k>>>=m,C-=m,(m=v-x)<R){if(d<(m=R-m)&&a.sane){i.msg="invalid distance too far back",a.mode=30;break e}if(N=f,(h=0)===b){if(h+=w-m,m<S){for(S-=m;F[v++]=f[h++],--m;);h=v-R,N=F}}else if(b<m){if(h+=w+b-m,(m-=b)<S){for(S-=m;F[v++]=f[h++],--m;);if(h=0,b<S){for(S-=m=b;F[v++]=f[h++],--m;);h=v-R,N=F}}}else if(h+=b-m,m<S){for(S-=m;F[v++]=f[h++],--m;);h=v-R,N=F}for(;2<S;)F[v++]=N[h++],F[v++]=N[h++],F[v++]=N[h++],S-=3;S&&(F[v++]=N[h++],1<S&&(F[v++]=N[h++]))}else{for(h=v-R;F[v++]=F[h++],F[v++]=F[h++],F[v++]=F[h++],2<(S-=3););S&&(F[v++]=F[h++],1<S&&(F[v++]=F[h++]))}break}}break}}while(o<p&&v<y);o-=S=C>>3,k&=(1<<(C-=S<<3))-1,i.next_in=o,i.next_out=v,i.avail_in=o<p?p-o+5:5-(o-p),i.avail_out=v<y?y-v+257:257-(v-y),a.hold=k,a.bits=C}},{}],49:[function(e,t,r){"use strict";var i=e("../utils/common"),s=e("./adler32"),a=e("./crc32"),o=e("./inffast"),p=e("./inftrees"),v=1,x=2,y=0,u=-2,w=1,d=852,b=592;function f(h){return(h>>>24&255)+(h>>>8&65280)+((65280&h)<<8)+((255&h)<<24)}function k(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new i.Buf16(320),this.work=new i.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function C(h){var N;return h&&h.state?(N=h.state,h.total_in=h.total_out=N.total=0,h.msg="",N.wrap&&(h.adler=1&N.wrap),N.mode=w,N.last=0,N.havedict=0,N.dmax=32768,N.head=null,N.hold=0,N.bits=0,N.lencode=N.lendyn=new i.Buf32(d),N.distcode=N.distdyn=new i.Buf32(b),N.sane=1,N.back=-1,y):u}function B(h){var N;return h&&h.state?((N=h.state).wsize=0,N.whave=0,N.wnext=0,C(h)):u}function T(h,N){var l,F;return h&&h.state?(F=h.state,N<0?(l=0,N=-N):(l=1+(N>>4),N<48&&(N&=15)),N&&(N<8||15<N)?u:(F.window!==null&&F.wbits!==N&&(F.window=null),F.wrap=l,F.wbits=N,B(h))):u}function q(h,N){var l,F;return h?(F=new k,(h.state=F).window=null,(l=T(h,N))!==y&&(h.state=null),l):u}var A,g,m=!0;function S(h){if(m){var N;for(A=new i.Buf32(512),g=new i.Buf32(32),N=0;N<144;)h.lens[N++]=8;for(;N<256;)h.lens[N++]=9;for(;N<280;)h.lens[N++]=7;for(;N<288;)h.lens[N++]=8;for(p(v,h.lens,0,288,A,0,h.work,{bits:9}),N=0;N<32;)h.lens[N++]=5;p(x,h.lens,0,32,g,0,h.work,{bits:5}),m=!1}h.lencode=A,h.lenbits=9,h.distcode=g,h.distbits=5}function R(h,N,l,F){var ne,$=h.state;return $.window===null&&($.wsize=1<<$.wbits,$.wnext=0,$.whave=0,$.window=new i.Buf8($.wsize)),F>=$.wsize?(i.arraySet($.window,N,l-$.wsize,$.wsize,0),$.wnext=0,$.whave=$.wsize):(F<(ne=$.wsize-$.wnext)&&(ne=F),i.arraySet($.window,N,l-F,ne,$.wnext),(F-=ne)?(i.arraySet($.window,N,l-F,F,0),$.wnext=F,$.whave=$.wsize):($.wnext+=ne,$.wnext===$.wsize&&($.wnext=0),$.whave<$.wsize&&($.whave+=ne))),0}r.inflateReset=B,r.inflateReset2=T,r.inflateResetKeep=C,r.inflateInit=function(h){return q(h,15)},r.inflateInit2=q,r.inflate=function(h,N){var l,F,ne,$,Q,j,G,I,M,W,X,Z,le,me,te,re,oe,se,de,he,n,D,z,E,c=0,_=new i.Buf8(4),O=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!h||!h.state||!h.output||!h.input&&h.avail_in!==0)return u;(l=h.state).mode===12&&(l.mode=13),Q=h.next_out,ne=h.output,G=h.avail_out,$=h.next_in,F=h.input,j=h.avail_in,I=l.hold,M=l.bits,W=j,X=G,D=y;e:for(;;)switch(l.mode){case w:if(l.wrap===0){l.mode=13;break}for(;M<16;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(2&l.wrap&&I===35615){_[l.check=0]=255&I,_[1]=I>>>8&255,l.check=a(l.check,_,2,0),M=I=0,l.mode=2;break}if(l.flags=0,l.head&&(l.head.done=!1),!(1&l.wrap)||(((255&I)<<8)+(I>>8))%31){h.msg="incorrect header check",l.mode=30;break}if((15&I)!=8){h.msg="unknown compression method",l.mode=30;break}if(M-=4,n=8+(15&(I>>>=4)),l.wbits===0)l.wbits=n;else if(n>l.wbits){h.msg="invalid window size",l.mode=30;break}l.dmax=1<<n,h.adler=l.check=1,l.mode=512&I?10:12,M=I=0;break;case 2:for(;M<16;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(l.flags=I,(255&l.flags)!=8){h.msg="unknown compression method",l.mode=30;break}if(57344&l.flags){h.msg="unknown header flags set",l.mode=30;break}l.head&&(l.head.text=I>>8&1),512&l.flags&&(_[0]=255&I,_[1]=I>>>8&255,l.check=a(l.check,_,2,0)),M=I=0,l.mode=3;case 3:for(;M<32;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.head&&(l.head.time=I),512&l.flags&&(_[0]=255&I,_[1]=I>>>8&255,_[2]=I>>>16&255,_[3]=I>>>24&255,l.check=a(l.check,_,4,0)),M=I=0,l.mode=4;case 4:for(;M<16;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.head&&(l.head.xflags=255&I,l.head.os=I>>8),512&l.flags&&(_[0]=255&I,_[1]=I>>>8&255,l.check=a(l.check,_,2,0)),M=I=0,l.mode=5;case 5:if(1024&l.flags){for(;M<16;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.length=I,l.head&&(l.head.extra_len=I),512&l.flags&&(_[0]=255&I,_[1]=I>>>8&255,l.check=a(l.check,_,2,0)),M=I=0}else l.head&&(l.head.extra=null);l.mode=6;case 6:if(1024&l.flags&&(j<(Z=l.length)&&(Z=j),Z&&(l.head&&(n=l.head.extra_len-l.length,l.head.extra||(l.head.extra=new Array(l.head.extra_len)),i.arraySet(l.head.extra,F,$,Z,n)),512&l.flags&&(l.check=a(l.check,F,Z,$)),j-=Z,$+=Z,l.length-=Z),l.length))break e;l.length=0,l.mode=7;case 7:if(2048&l.flags){if(j===0)break e;for(Z=0;n=F[$+Z++],l.head&&n&&l.length<65536&&(l.head.name+=String.fromCharCode(n)),n&&Z<j;);if(512&l.flags&&(l.check=a(l.check,F,Z,$)),j-=Z,$+=Z,n)break e}else l.head&&(l.head.name=null);l.length=0,l.mode=8;case 8:if(4096&l.flags){if(j===0)break e;for(Z=0;n=F[$+Z++],l.head&&n&&l.length<65536&&(l.head.comment+=String.fromCharCode(n)),n&&Z<j;);if(512&l.flags&&(l.check=a(l.check,F,Z,$)),j-=Z,$+=Z,n)break e}else l.head&&(l.head.comment=null);l.mode=9;case 9:if(512&l.flags){for(;M<16;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(I!==(65535&l.check)){h.msg="header crc mismatch",l.mode=30;break}M=I=0}l.head&&(l.head.hcrc=l.flags>>9&1,l.head.done=!0),h.adler=l.check=0,l.mode=12;break;case 10:for(;M<32;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}h.adler=l.check=f(I),M=I=0,l.mode=11;case 11:if(l.havedict===0)return h.next_out=Q,h.avail_out=G,h.next_in=$,h.avail_in=j,l.hold=I,l.bits=M,2;h.adler=l.check=1,l.mode=12;case 12:if(N===5||N===6)break e;case 13:if(l.last){I>>>=7&M,M-=7&M,l.mode=27;break}for(;M<3;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}switch(l.last=1&I,M-=1,3&(I>>>=1)){case 0:l.mode=14;break;case 1:if(S(l),l.mode=20,N!==6)break;I>>>=2,M-=2;break e;case 2:l.mode=17;break;case 3:h.msg="invalid block type",l.mode=30}I>>>=2,M-=2;break;case 14:for(I>>>=7&M,M-=7&M;M<32;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if((65535&I)!=(I>>>16^65535)){h.msg="invalid stored block lengths",l.mode=30;break}if(l.length=65535&I,M=I=0,l.mode=15,N===6)break e;case 15:l.mode=16;case 16:if(Z=l.length){if(j<Z&&(Z=j),G<Z&&(Z=G),Z===0)break e;i.arraySet(ne,F,$,Z,Q),j-=Z,$+=Z,G-=Z,Q+=Z,l.length-=Z;break}l.mode=12;break;case 17:for(;M<14;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(l.nlen=257+(31&I),I>>>=5,M-=5,l.ndist=1+(31&I),I>>>=5,M-=5,l.ncode=4+(15&I),I>>>=4,M-=4,286<l.nlen||30<l.ndist){h.msg="too many length or distance symbols",l.mode=30;break}l.have=0,l.mode=18;case 18:for(;l.have<l.ncode;){for(;M<3;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.lens[O[l.have++]]=7&I,I>>>=3,M-=3}for(;l.have<19;)l.lens[O[l.have++]]=0;if(l.lencode=l.lendyn,l.lenbits=7,z={bits:l.lenbits},D=p(0,l.lens,0,19,l.lencode,0,l.work,z),l.lenbits=z.bits,D){h.msg="invalid code lengths set",l.mode=30;break}l.have=0,l.mode=19;case 19:for(;l.have<l.nlen+l.ndist;){for(;re=(c=l.lencode[I&(1<<l.lenbits)-1])>>>16&255,oe=65535&c,!((te=c>>>24)<=M);){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(oe<16)I>>>=te,M-=te,l.lens[l.have++]=oe;else{if(oe===16){for(E=te+2;M<E;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(I>>>=te,M-=te,l.have===0){h.msg="invalid bit length repeat",l.mode=30;break}n=l.lens[l.have-1],Z=3+(3&I),I>>>=2,M-=2}else if(oe===17){for(E=te+3;M<E;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}M-=te,n=0,Z=3+(7&(I>>>=te)),I>>>=3,M-=3}else{for(E=te+7;M<E;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}M-=te,n=0,Z=11+(127&(I>>>=te)),I>>>=7,M-=7}if(l.have+Z>l.nlen+l.ndist){h.msg="invalid bit length repeat",l.mode=30;break}for(;Z--;)l.lens[l.have++]=n}}if(l.mode===30)break;if(l.lens[256]===0){h.msg="invalid code -- missing end-of-block",l.mode=30;break}if(l.lenbits=9,z={bits:l.lenbits},D=p(v,l.lens,0,l.nlen,l.lencode,0,l.work,z),l.lenbits=z.bits,D){h.msg="invalid literal/lengths set",l.mode=30;break}if(l.distbits=6,l.distcode=l.distdyn,z={bits:l.distbits},D=p(x,l.lens,l.nlen,l.ndist,l.distcode,0,l.work,z),l.distbits=z.bits,D){h.msg="invalid distances set",l.mode=30;break}if(l.mode=20,N===6)break e;case 20:l.mode=21;case 21:if(6<=j&&258<=G){h.next_out=Q,h.avail_out=G,h.next_in=$,h.avail_in=j,l.hold=I,l.bits=M,o(h,X),Q=h.next_out,ne=h.output,G=h.avail_out,$=h.next_in,F=h.input,j=h.avail_in,I=l.hold,M=l.bits,l.mode===12&&(l.back=-1);break}for(l.back=0;re=(c=l.lencode[I&(1<<l.lenbits)-1])>>>16&255,oe=65535&c,!((te=c>>>24)<=M);){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(re&&(240&re)==0){for(se=te,de=re,he=oe;re=(c=l.lencode[he+((I&(1<<se+de)-1)>>se)])>>>16&255,oe=65535&c,!(se+(te=c>>>24)<=M);){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}I>>>=se,M-=se,l.back+=se}if(I>>>=te,M-=te,l.back+=te,l.length=oe,re===0){l.mode=26;break}if(32&re){l.back=-1,l.mode=12;break}if(64&re){h.msg="invalid literal/length code",l.mode=30;break}l.extra=15&re,l.mode=22;case 22:if(l.extra){for(E=l.extra;M<E;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.length+=I&(1<<l.extra)-1,I>>>=l.extra,M-=l.extra,l.back+=l.extra}l.was=l.length,l.mode=23;case 23:for(;re=(c=l.distcode[I&(1<<l.distbits)-1])>>>16&255,oe=65535&c,!((te=c>>>24)<=M);){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if((240&re)==0){for(se=te,de=re,he=oe;re=(c=l.distcode[he+((I&(1<<se+de)-1)>>se)])>>>16&255,oe=65535&c,!(se+(te=c>>>24)<=M);){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}I>>>=se,M-=se,l.back+=se}if(I>>>=te,M-=te,l.back+=te,64&re){h.msg="invalid distance code",l.mode=30;break}l.offset=oe,l.extra=15&re,l.mode=24;case 24:if(l.extra){for(E=l.extra;M<E;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}l.offset+=I&(1<<l.extra)-1,I>>>=l.extra,M-=l.extra,l.back+=l.extra}if(l.offset>l.dmax){h.msg="invalid distance too far back",l.mode=30;break}l.mode=25;case 25:if(G===0)break e;if(Z=X-G,l.offset>Z){if((Z=l.offset-Z)>l.whave&&l.sane){h.msg="invalid distance too far back",l.mode=30;break}le=Z>l.wnext?(Z-=l.wnext,l.wsize-Z):l.wnext-Z,Z>l.length&&(Z=l.length),me=l.window}else me=ne,le=Q-l.offset,Z=l.length;for(G<Z&&(Z=G),G-=Z,l.length-=Z;ne[Q++]=me[le++],--Z;);l.length===0&&(l.mode=21);break;case 26:if(G===0)break e;ne[Q++]=l.length,G--,l.mode=21;break;case 27:if(l.wrap){for(;M<32;){if(j===0)break e;j--,I|=F[$++]<<M,M+=8}if(X-=G,h.total_out+=X,l.total+=X,X&&(h.adler=l.check=l.flags?a(l.check,ne,X,Q-X):s(l.check,ne,X,Q-X)),X=G,(l.flags?I:f(I))!==l.check){h.msg="incorrect data check",l.mode=30;break}M=I=0}l.mode=28;case 28:if(l.wrap&&l.flags){for(;M<32;){if(j===0)break e;j--,I+=F[$++]<<M,M+=8}if(I!==(4294967295&l.total)){h.msg="incorrect length check",l.mode=30;break}M=I=0}l.mode=29;case 29:D=1;break e;case 30:D=-3;break e;case 31:return-4;case 32:default:return u}return h.next_out=Q,h.avail_out=G,h.next_in=$,h.avail_in=j,l.hold=I,l.bits=M,(l.wsize||X!==h.avail_out&&l.mode<30&&(l.mode<27||N!==4))&&R(h,h.output,h.next_out,X-h.avail_out)?(l.mode=31,-4):(W-=h.avail_in,X-=h.avail_out,h.total_in+=W,h.total_out+=X,l.total+=X,l.wrap&&X&&(h.adler=l.check=l.flags?a(l.check,ne,X,h.next_out-X):s(l.check,ne,X,h.next_out-X)),h.data_type=l.bits+(l.last?64:0)+(l.mode===12?128:0)+(l.mode===20||l.mode===15?256:0),(W==0&&X===0||N===4)&&D===y&&(D=-5),D)},r.inflateEnd=function(h){if(!h||!h.state)return u;var N=h.state;return N.window&&(N.window=null),h.state=null,y},r.inflateGetHeader=function(h,N){var l;return h&&h.state?(2&(l=h.state).wrap)==0?u:((l.head=N).done=!1,y):u},r.inflateSetDictionary=function(h,N){var l,F=N.length;return h&&h.state?(l=h.state).wrap!==0&&l.mode!==11?u:l.mode===11&&s(1,N,F,0)!==l.check?-3:R(h,N,F,F)?(l.mode=31,-4):(l.havedict=1,y):u},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var i=e("../utils/common"),s=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],p=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(v,x,y,u,w,d,b,f){var k,C,B,T,q,A,g,m,S,R=f.bits,h=0,N=0,l=0,F=0,ne=0,$=0,Q=0,j=0,G=0,I=0,M=null,W=0,X=new i.Buf16(16),Z=new i.Buf16(16),le=null,me=0;for(h=0;h<=15;h++)X[h]=0;for(N=0;N<u;N++)X[x[y+N]]++;for(ne=R,F=15;1<=F&&X[F]===0;F--);if(F<ne&&(ne=F),F===0)return w[d++]=20971520,w[d++]=20971520,f.bits=1,0;for(l=1;l<F&&X[l]===0;l++);for(ne<l&&(ne=l),h=j=1;h<=15;h++)if(j<<=1,(j-=X[h])<0)return-1;if(0<j&&(v===0||F!==1))return-1;for(Z[1]=0,h=1;h<15;h++)Z[h+1]=Z[h]+X[h];for(N=0;N<u;N++)x[y+N]!==0&&(b[Z[x[y+N]]++]=N);if(A=v===0?(M=le=b,19):v===1?(M=s,W-=257,le=a,me-=257,256):(M=o,le=p,-1),h=l,q=d,Q=N=I=0,B=-1,T=(G=1<<($=ne))-1,v===1&&852<G||v===2&&592<G)return 1;for(;;){for(g=h-Q,S=b[N]<A?(m=0,b[N]):b[N]>A?(m=le[me+b[N]],M[W+b[N]]):(m=96,0),k=1<<h-Q,l=C=1<<$;w[q+(I>>Q)+(C-=k)]=g<<24|m<<16|S|0,C!==0;);for(k=1<<h-1;I&k;)k>>=1;if(k!==0?(I&=k-1,I+=k):I=0,N++,--X[h]==0){if(h===F)break;h=x[y+b[N]]}if(ne<h&&(I&T)!==B){for(Q===0&&(Q=ne),q+=l,j=1<<($=h-Q);$+Q<F&&!((j-=X[$+Q])<=0);)$++,j<<=1;if(G+=1<<$,v===1&&852<G||v===2&&592<G)return 1;w[B=I&T]=ne<<24|$<<16|q-d|0}}return I!==0&&(w[q+I]=h-Q<<24|64<<16|0),f.bits=ne,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),s=0,a=1;function o(c){for(var _=c.length;0<=--_;)c[_]=0}var p=0,v=29,x=256,y=x+1+v,u=30,w=19,d=2*y+1,b=15,f=16,k=7,C=256,B=16,T=17,q=18,A=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],g=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],m=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],R=new Array(2*(y+2));o(R);var h=new Array(2*u);o(h);var N=new Array(512);o(N);var l=new Array(256);o(l);var F=new Array(v);o(F);var ne,$,Q,j=new Array(u);function G(c,_,O,U,L){this.static_tree=c,this.extra_bits=_,this.extra_base=O,this.elems=U,this.max_length=L,this.has_stree=c&&c.length}function I(c,_){this.dyn_tree=c,this.max_code=0,this.stat_desc=_}function M(c){return c<256?N[c]:N[256+(c>>>7)]}function W(c,_){c.pending_buf[c.pending++]=255&_,c.pending_buf[c.pending++]=_>>>8&255}function X(c,_,O){c.bi_valid>f-O?(c.bi_buf|=_<<c.bi_valid&65535,W(c,c.bi_buf),c.bi_buf=_>>f-c.bi_valid,c.bi_valid+=O-f):(c.bi_buf|=_<<c.bi_valid&65535,c.bi_valid+=O)}function Z(c,_,O){X(c,O[2*_],O[2*_+1])}function le(c,_){for(var O=0;O|=1&c,c>>>=1,O<<=1,0<--_;);return O>>>1}function me(c,_,O){var U,L,P=new Array(b+1),K=0;for(U=1;U<=b;U++)P[U]=K=K+O[U-1]<<1;for(L=0;L<=_;L++){var Y=c[2*L+1];Y!==0&&(c[2*L]=le(P[Y]++,Y))}}function te(c){var _;for(_=0;_<y;_++)c.dyn_ltree[2*_]=0;for(_=0;_<u;_++)c.dyn_dtree[2*_]=0;for(_=0;_<w;_++)c.bl_tree[2*_]=0;c.dyn_ltree[2*C]=1,c.opt_len=c.static_len=0,c.last_lit=c.matches=0}function re(c){8<c.bi_valid?W(c,c.bi_buf):0<c.bi_valid&&(c.pending_buf[c.pending++]=c.bi_buf),c.bi_buf=0,c.bi_valid=0}function oe(c,_,O,U){var L=2*_,P=2*O;return c[L]<c[P]||c[L]===c[P]&&U[_]<=U[O]}function se(c,_,O){for(var U=c.heap[O],L=O<<1;L<=c.heap_len&&(L<c.heap_len&&oe(_,c.heap[L+1],c.heap[L],c.depth)&&L++,!oe(_,U,c.heap[L],c.depth));)c.heap[O]=c.heap[L],O=L,L<<=1;c.heap[O]=U}function de(c,_,O){var U,L,P,K,Y=0;if(c.last_lit!==0)for(;U=c.pending_buf[c.d_buf+2*Y]<<8|c.pending_buf[c.d_buf+2*Y+1],L=c.pending_buf[c.l_buf+Y],Y++,U===0?Z(c,L,_):(Z(c,(P=l[L])+x+1,_),(K=A[P])!==0&&X(c,L-=F[P],K),Z(c,P=M(--U),O),(K=g[P])!==0&&X(c,U-=j[P],K)),Y<c.last_lit;);Z(c,C,_)}function he(c,_){var O,U,L,P=_.dyn_tree,K=_.stat_desc.static_tree,Y=_.stat_desc.has_stree,H=_.stat_desc.elems,ee=-1;for(c.heap_len=0,c.heap_max=d,O=0;O<H;O++)P[2*O]!==0?(c.heap[++c.heap_len]=ee=O,c.depth[O]=0):P[2*O+1]=0;for(;c.heap_len<2;)P[2*(L=c.heap[++c.heap_len]=ee<2?++ee:0)]=1,c.depth[L]=0,c.opt_len--,Y&&(c.static_len-=K[2*L+1]);for(_.max_code=ee,O=c.heap_len>>1;1<=O;O--)se(c,P,O);for(L=H;O=c.heap[1],c.heap[1]=c.heap[c.heap_len--],se(c,P,1),U=c.heap[1],c.heap[--c.heap_max]=O,c.heap[--c.heap_max]=U,P[2*L]=P[2*O]+P[2*U],c.depth[L]=(c.depth[O]>=c.depth[U]?c.depth[O]:c.depth[U])+1,P[2*O+1]=P[2*U+1]=L,c.heap[1]=L++,se(c,P,1),2<=c.heap_len;);c.heap[--c.heap_max]=c.heap[1],function(J,ue){var be,pe,ge,fe,Ae,Se,ye=ue.dyn_tree,cn=ue.max_code,wr=ue.stat_desc.static_tree,kr=ue.stat_desc.has_stree,_r=ue.stat_desc.extra_bits,dn=ue.stat_desc.extra_base,Qe=ue.stat_desc.max_length,at=0;for(fe=0;fe<=b;fe++)J.bl_count[fe]=0;for(ye[2*J.heap[J.heap_max]+1]=0,be=J.heap_max+1;be<d;be++)Qe<(fe=ye[2*ye[2*(pe=J.heap[be])+1]+1]+1)&&(fe=Qe,at++),ye[2*pe+1]=fe,cn<pe||(J.bl_count[fe]++,Ae=0,dn<=pe&&(Ae=_r[pe-dn]),Se=ye[2*pe],J.opt_len+=Se*(fe+Ae),kr&&(J.static_len+=Se*(wr[2*pe+1]+Ae)));if(at!==0){do{for(fe=Qe-1;J.bl_count[fe]===0;)fe--;J.bl_count[fe]--,J.bl_count[fe+1]+=2,J.bl_count[Qe]--,at-=2}while(0<at);for(fe=Qe;fe!==0;fe--)for(pe=J.bl_count[fe];pe!==0;)cn<(ge=J.heap[--be])||(ye[2*ge+1]!==fe&&(J.opt_len+=(fe-ye[2*ge+1])*ye[2*ge],ye[2*ge+1]=fe),pe--)}}(c,_),me(P,ee,c.bl_count)}function n(c,_,O){var U,L,P=-1,K=_[1],Y=0,H=7,ee=4;for(K===0&&(H=138,ee=3),_[2*(O+1)+1]=65535,U=0;U<=O;U++)L=K,K=_[2*(U+1)+1],++Y<H&&L===K||(Y<ee?c.bl_tree[2*L]+=Y:L!==0?(L!==P&&c.bl_tree[2*L]++,c.bl_tree[2*B]++):Y<=10?c.bl_tree[2*T]++:c.bl_tree[2*q]++,P=L,ee=(Y=0)===K?(H=138,3):L===K?(H=6,3):(H=7,4))}function D(c,_,O){var U,L,P=-1,K=_[1],Y=0,H=7,ee=4;for(K===0&&(H=138,ee=3),U=0;U<=O;U++)if(L=K,K=_[2*(U+1)+1],!(++Y<H&&L===K)){if(Y<ee)for(;Z(c,L,c.bl_tree),--Y!=0;);else L!==0?(L!==P&&(Z(c,L,c.bl_tree),Y--),Z(c,B,c.bl_tree),X(c,Y-3,2)):Y<=10?(Z(c,T,c.bl_tree),X(c,Y-3,3)):(Z(c,q,c.bl_tree),X(c,Y-11,7));P=L,ee=(Y=0)===K?(H=138,3):L===K?(H=6,3):(H=7,4)}}o(j);var z=!1;function E(c,_,O,U){X(c,(p<<1)+(U?1:0),3),function(L,P,K,Y){re(L),Y&&(W(L,K),W(L,~K)),i.arraySet(L.pending_buf,L.window,P,K,L.pending),L.pending+=K}(c,_,O,!0)}r._tr_init=function(c){z||(function(){var _,O,U,L,P,K=new Array(b+1);for(L=U=0;L<v-1;L++)for(F[L]=U,_=0;_<1<<A[L];_++)l[U++]=L;for(l[U-1]=L,L=P=0;L<16;L++)for(j[L]=P,_=0;_<1<<g[L];_++)N[P++]=L;for(P>>=7;L<u;L++)for(j[L]=P<<7,_=0;_<1<<g[L]-7;_++)N[256+P++]=L;for(O=0;O<=b;O++)K[O]=0;for(_=0;_<=143;)R[2*_+1]=8,_++,K[8]++;for(;_<=255;)R[2*_+1]=9,_++,K[9]++;for(;_<=279;)R[2*_+1]=7,_++,K[7]++;for(;_<=287;)R[2*_+1]=8,_++,K[8]++;for(me(R,y+1,K),_=0;_<u;_++)h[2*_+1]=5,h[2*_]=le(_,5);ne=new G(R,A,x+1,y,b),$=new G(h,g,0,u,b),Q=new G(new Array(0),m,0,w,k)}(),z=!0),c.l_desc=new I(c.dyn_ltree,ne),c.d_desc=new I(c.dyn_dtree,$),c.bl_desc=new I(c.bl_tree,Q),c.bi_buf=0,c.bi_valid=0,te(c)},r._tr_stored_block=E,r._tr_flush_block=function(c,_,O,U){var L,P,K=0;0<c.level?(c.strm.data_type===2&&(c.strm.data_type=function(Y){var H,ee=4093624447;for(H=0;H<=31;H++,ee>>>=1)if(1&ee&&Y.dyn_ltree[2*H]!==0)return s;if(Y.dyn_ltree[18]!==0||Y.dyn_ltree[20]!==0||Y.dyn_ltree[26]!==0)return a;for(H=32;H<x;H++)if(Y.dyn_ltree[2*H]!==0)return a;return s}(c)),he(c,c.l_desc),he(c,c.d_desc),K=function(Y){var H;for(n(Y,Y.dyn_ltree,Y.l_desc.max_code),n(Y,Y.dyn_dtree,Y.d_desc.max_code),he(Y,Y.bl_desc),H=w-1;3<=H&&Y.bl_tree[2*S[H]+1]===0;H--);return Y.opt_len+=3*(H+1)+5+5+4,H}(c),L=c.opt_len+3+7>>>3,(P=c.static_len+3+7>>>3)<=L&&(L=P)):L=P=O+5,O+4<=L&&_!==-1?E(c,_,O,U):c.strategy===4||P===L?(X(c,2+(U?1:0),3),de(c,R,h)):(X(c,4+(U?1:0),3),function(Y,H,ee,J){var ue;for(X(Y,H-257,5),X(Y,ee-1,5),X(Y,J-4,4),ue=0;ue<J;ue++)X(Y,Y.bl_tree[2*S[ue]+1],3);D(Y,Y.dyn_ltree,H-1),D(Y,Y.dyn_dtree,ee-1)}(c,c.l_desc.max_code+1,c.d_desc.max_code+1,K+1),de(c,c.dyn_ltree,c.dyn_dtree)),te(c),U&&re(c)},r._tr_tally=function(c,_,O){return c.pending_buf[c.d_buf+2*c.last_lit]=_>>>8&255,c.pending_buf[c.d_buf+2*c.last_lit+1]=255&_,c.pending_buf[c.l_buf+c.last_lit]=255&O,c.last_lit++,_===0?c.dyn_ltree[2*O]++:(c.matches++,_--,c.dyn_ltree[2*(l[O]+x+1)]++,c.dyn_dtree[2*M(_)]++),c.last_lit===c.lit_bufsize-1},r._tr_align=function(c){X(c,2,3),Z(c,C,R),function(_){_.bi_valid===16?(W(_,_.bi_buf),_.bi_buf=0,_.bi_valid=0):8<=_.bi_valid&&(_.pending_buf[_.pending++]=255&_.bi_buf,_.bi_buf>>=8,_.bi_valid-=8)}(c)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(i){(function(s,a){"use strict";if(!s.setImmediate){var o,p,v,x,y=1,u={},w=!1,d=s.document,b=Object.getPrototypeOf&&Object.getPrototypeOf(s);b=b&&b.setTimeout?b:s,o={}.toString.call(s.process)==="[object process]"?function(B){process.nextTick(function(){k(B)})}:function(){if(s.postMessage&&!s.importScripts){var B=!0,T=s.onmessage;return s.onmessage=function(){B=!1},s.postMessage("","*"),s.onmessage=T,B}}()?(x="setImmediate$"+Math.random()+"$",s.addEventListener?s.addEventListener("message",C,!1):s.attachEvent("onmessage",C),function(B){s.postMessage(x+B,"*")}):s.MessageChannel?((v=new MessageChannel).port1.onmessage=function(B){k(B.data)},function(B){v.port2.postMessage(B)}):d&&"onreadystatechange"in d.createElement("script")?(p=d.documentElement,function(B){var T=d.createElement("script");T.onreadystatechange=function(){k(B),T.onreadystatechange=null,p.removeChild(T),T=null},p.appendChild(T)}):function(B){setTimeout(k,0,B)},b.setImmediate=function(B){typeof B!="function"&&(B=new Function(""+B));for(var T=new Array(arguments.length-1),q=0;q<T.length;q++)T[q]=arguments[q+1];var A={callback:B,args:T};return u[y]=A,o(y),y++},b.clearImmediate=f}function f(B){delete u[B]}function k(B){if(w)setTimeout(k,0,B);else{var T=u[B];if(T){w=!0;try{(function(q){var A=q.callback,g=q.args;switch(g.length){case 0:A();break;case 1:A(g[0]);break;case 2:A(g[0],g[1]);break;case 3:A(g[0],g[1],g[2]);break;default:A.apply(a,g)}})(T)}finally{f(B),w=!1}}}}function C(B){B.source===s&&typeof B.data=="string"&&B.data.indexOf(x)===0&&k(+B.data.slice(x.length))}})(typeof self>"u"?i===void 0?this:i:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function ce(){document.querySelectorAll(".ui-button").forEach(e=>{let t=e.dataset.type||"primary",r=e.dataset.size||"medium",i=e.dataset.fixedWidth,s=e.hasAttribute("data-fullwidth"),a=e.hasAttribute("disabled")||e.disabled;switch(e.className="ui-button",e.type="button",e.classList.add("font-semibold","rounded-lg","transition-all","duration-200","ease-in-out","flex","items-center","justify-center"),e.style.transform="none",r){case"small":e.classList.add("px-2","py-1","text-xs","sm:px-3","sm:py-1.5","sm:text-sm");break;case"large":e.classList.add("px-4","py-2.5","text-sm","sm:px-6","sm:py-3","sm:text-base","md:px-8","md:py-4");break;case"medium":default:e.classList.add("px-3","py-2","text-sm","sm:px-5","sm:py-2","sm:text-sm");break}switch(a?(e.setAttribute("disabled",""),e.classList.add("opacity-50","cursor-not-allowed"),e.style.boxShadow="none"):(e.removeAttribute("disabled"),e.classList.add("cursor-pointer")),t){case"primary":e.classList.add("bg-blue-500","text-white","border","border-blue-500","shadow-sm"),a||e.classList.add("hover:bg-blue-600","hover:border-blue-600","focus:ring-2","focus:ring-blue-500","focus:ring-offset-2","active:bg-blue-700");break;case"secondary":e.classList.add("bg-white","text-gray-700","border","border-gray-300","shadow-sm"),a||e.classList.add("hover:bg-gray-50","hover:border-gray-400","hover:text-gray-800","focus:ring-2","focus:ring-gray-500","focus:ring-offset-2","active:bg-gray-100");break;case"text":e.classList.remove("px-2","px-3","px-4","px-5","px-6","px-8","py-1","py-1.5","py-2","py-2.5","py-3","py-4","sm:px-3","sm:px-5","sm:px-6","sm:px-8","sm:py-1.5","sm:py-2","sm:py-3","sm:py-4","md:px-8","md:py-4"),e.classList.add("bg-transparent","text-blue-600","px-2","py-1","sm:px-3","sm:py-1.5"),a||e.classList.add("hover:underline","hover:text-blue-700","focus:ring-2","focus:ring-blue-500","focus:ring-offset-2");break;case"danger":e.classList.add("bg-red-500","text-white","border","border-red-500","shadow-sm"),a||e.classList.add("hover:bg-red-600","hover:border-red-600","focus:ring-2","focus:ring-red-500","focus:ring-offset-2","active:bg-red-700");break;case"warning":e.classList.add("bg-orange-500","text-white","border","border-orange-500","shadow-sm"),a||e.classList.add("hover:bg-orange-600","hover:border-orange-600","focus:ring-2","focus:ring-orange-500","focus:ring-offset-2","active:bg-orange-700");break}i&&(e.style.width=`${i}px`),s&&e.classList.add("w-full"),a||(e.classList.add("touch-manipulation","select-none"),e.style.minHeight="44px",e.style.minWidth="44px")})}function Et(){document.querySelectorAll(".js-start").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault(),ae("/upload")})}),document.querySelectorAll(".js-synced-guide").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault(),ae("/synced-accounts")})}),ce();let e=Array.from(document.querySelectorAll(".faq-item"));e.forEach(t=>{let r=t.querySelector(".faq-q"),i=t.querySelector(".faq-a"),s=t.querySelector(".faq-chevron");r.addEventListener("click",()=>{let a=!i.classList.contains("hidden");e.forEach(o=>{o.querySelector(".faq-a").classList.add("hidden"),o.querySelector(".faq-chevron")?.classList.remove("rotate-180")}),a||(i.classList.remove("hidden"),s?.classList.add("rotate-180"))})})}var fn=`<div class="w-full text-gray-900 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12">

  <!-- ============================ HERO ============================ -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#005B96]/5 via-white to-white pointer-events-none"></div>
    <div class="relative max-w-7xl mx-auto px-6 pt-44 pb-16 sm:pt-40 sm:pb-12 text-center">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto">
        Move your whole YNAB history into Monarch, in one pass.
      </h1>
      <p class="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Every account, every transaction, every balance, mapped and imported together. Not one account at a time.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button class="js-start ui-button" data-type="primary" data-size="large">Start migrating, it's free</button>
      </div>
      <p class="mt-4 text-xs text-gray-500">No account needed to start \xB7 Your data never leaves your browser</p>
    </div>
  </section>

  <!-- ===================== FEATURE: BULK ===================== -->
  <section class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
    <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Bulk import</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Import every account at once</h2>
        <p class="mt-4 text-gray-600 text-lg">Monarch makes you import one account at a time. Bring them all in together
          and let them finish in parallel.</p>
      </div>
      <!-- Hero graphic: bulk import in progress -->
      <div class="w-full max-w-3xl mx-auto">
        <div class="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden text-left">
          <div class="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span class="w-3 h-3 rounded-full bg-red-400"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span class="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div class="p-4 sm:p-6 space-y-2">
            <!-- account rows -->
            <div class="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5">
              <span class="text-lg">\u{1F6D2}</span>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm">Everyday Chequing</div>
                <div class="text-xs text-gray-400">1,204 transactions</div>
              </div>
              <span class="text-xs font-medium text-green-600 inline-flex items-center gap-1">\u2713 Done</span>
            </div>
            <div class="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5">
              <span class="text-lg">\u{1F4B3}</span>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm">Amex Cobalt</div>
                <div class="text-xs text-gray-400">3,981 transactions</div>
              </div>
              <span class="text-xs font-medium text-green-600 inline-flex items-center gap-1">\u2713 Done</span>
            </div>
            <div class="flex items-center gap-3 rounded-lg border border-[#005B96]/30 bg-[#005B96]/5 px-3 py-2.5">
              <span class="text-lg">\u{1F3E6}</span>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm">High-Interest Savings</div>
                <div class="text-xs text-gray-400">2,531 transactions</div>
              </div>
              <span class="w-4 h-4 border-2 border-[#005B96]/30 border-t-[#005B96] rounded-full animate-spin"></span>
            </div>
            <div class="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 opacity-60">
              <span class="text-lg">\u{1F4C8}</span>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm">Brokerage</div>
                <div class="text-xs text-gray-400">9,426 transactions</div>
              </div>
              <span class="text-xs text-gray-400">Pending</span>
            </div>
            <div class="pt-1 text-xs text-gray-400 text-center">+ 10 more accounts</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== FEATURE: MAPPING ===================== -->
  <section class="bg-gray-50 border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="lg:order-2">
          <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Account mapping</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Create new, or merge into existing</h2>
          <p class="mt-4 text-gray-600 text-lg">Point each YNAB account at a brand-new Monarch account or one you
            already have. You decide, account by account.</p>
        </div>
        <div class="lg:order-1 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div class="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span class="w-3 h-3 rounded-full bg-red-400"></span><span
              class="w-3 h-3 rounded-full bg-yellow-400"></span><span class="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div class="p-5 space-y-3">
            <div class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm truncate">Everyday Chequing</div>
                <div class="text-xs text-gray-400">1,204 transactions</div>
              </div>
              <div
                class="w-44 flex-shrink-0 flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <span class="truncate">\u2795 Create new</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm truncate">Amex Cobalt</div>
                <div class="text-xs text-gray-400">3,981 transactions</div>
              </div>
              <div
                class="w-44 flex-shrink-0 flex items-center justify-between rounded-lg border border-[#005B96]/40 ring-2 ring-[#005B96]/10 px-3 py-2 text-sm">
                <span class="truncate">\u{1F4B3} Amex (existing)</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm truncate">Brokerage</div>
                <div class="text-xs text-gray-400">512 transactions</div>
              </div>
              <div
                class="w-44 flex-shrink-0 flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <span class="truncate">\u2795 Create new</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============== FEATURE: TRANSACTIONS + BALANCE ============== -->
  <section class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
    <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">One unified import</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Transactions <span class="text-[#005B96]">and</span>
          balance history, together</h2>
        <p class="mt-4 text-gray-600 text-lg">Monarch splits these into two separate imports. We bring both across in a
          single flow.</p>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        <div class="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
          <span class="w-3 h-3 rounded-full bg-red-400"></span><span
            class="w-3 h-3 rounded-full bg-yellow-400"></span><span class="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
        <div class="p-5 grid grid-cols-2 gap-4">
          <div class="rounded-xl border border-gray-100 p-4">
            <div class="text-xs text-gray-400 mb-1">Transactions</div>
            <div class="text-2xl font-bold">1,204</div>
            <div class="mt-3 space-y-1.5">
              <div class="h-2 rounded bg-gray-100"></div>
              <div class="h-2 rounded bg-gray-100 w-5/6"></div>
              <div class="h-2 rounded bg-gray-100 w-4/6"></div>
            </div>
          </div>
          <div class="rounded-xl border border-gray-100 p-4">
            <div class="text-xs text-gray-400 mb-1">Balance history</div>
            <div class="text-2xl font-bold">5 yrs</div>
            <svg viewBox="0 0 120 48" class="mt-3 w-full h-12" fill="none">
              <polyline points="0,40 20,34 40,36 60,24 80,26 100,12 120,8" stroke="#005B96" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" />
              <polyline points="0,48 0,40 20,34 40,36 60,24 80,26 100,12 120,8 120,48" fill="#005B96"
                fill-opacity="0.08" stroke="none" />
            </svg>
          </div>
          <div
            class="col-span-2 rounded-xl bg-[#005B96]/5 ring-1 ring-[#005B96]/15 px-4 py-3 text-sm text-[#005B96] font-medium text-center">
            \u2713 Imported in one pass
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== FEATURE: DUPLICATES ===================== -->
  <section class="bg-gray-50 border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="lg:order-2">
          <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Duplicate control</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">You stay in control of duplicates</h2>
          <p class="mt-4 text-gray-600 text-lg">Importing into an account that already has data? Choose which
            transactions win, per account.</p>
        </div>
        <div class="lg:order-1 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div class="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span class="w-3 h-3 rounded-full bg-red-400"></span><span
              class="w-3 h-3 rounded-full bg-yellow-400"></span><span class="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div class="p-5 space-y-3">
            <label class="flex items-start gap-3 rounded-xl border-2 border-[#005B96] bg-[#005B96]/5 p-3">
              <span class="mt-0.5 w-4 h-4 rounded-full border-[5px] border-[#005B96]"></span>
              <span><span class="block text-sm font-semibold">Prioritize the CSV</span><span
                  class="block text-xs text-gray-500">Replace overlapping Monarch transactions with your YNAB
                  data.</span></span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
              <span class="mt-0.5 w-4 h-4 rounded-full border-2 border-gray-300"></span>
              <span><span class="block text-sm font-semibold">Prioritize Monarch</span><span
                  class="block text-xs text-gray-500">Keep existing data; only fill in older history.</span></span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
              <span class="mt-0.5 w-4 h-4 rounded-full border-2 border-gray-300"></span>
              <span><span class="block text-sm font-semibold">Import everything</span><span
                  class="block text-xs text-gray-500">Bring it all in without removing anything.</span></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== FEATURE: DATA SOURCES ===================== -->
  <section class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
    <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Flexible sources</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Bring your data your way</h2>
        <p class="mt-4 text-gray-600 text-lg">Upload your YNAB export today. Secure one-click YNAB connect is on the
          way.</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div
            class="w-11 h-11 rounded-xl bg-[#005B96]/10 text-[#005B96] flex items-center justify-center text-xl mb-4">\u{1F4E6}
          </div>
          <div class="font-semibold">Upload YNAB export</div>
          <p class="mt-1 text-sm text-gray-600">Drop in your YNAB <span class="font-mono text-xs">.zip</span> and we
            handle the rest.</p>
          <span
            class="mt-4 inline-block text-xs font-semibold text-green-700 bg-green-50 rounded-full px-2.5 py-1">Available
            now</span>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div
            class="w-11 h-11 rounded-xl bg-[#005B96]/10 text-[#005B96] flex items-center justify-center text-xl mb-4">\u{1F517}
          </div>
          <div class="font-semibold">Connect with YNAB</div>
          <p class="mt-1 text-sm text-gray-600">Securely pull your data with one click, no files.</p>
          <span
            class="mt-4 inline-block text-xs font-semibold text-amber-700 bg-amber-50 rounded-full px-2.5 py-1">Coming
            soon</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== MORE CAPABILITIES ===================== -->
  <section class="bg-gray-50 border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">And more</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Every detail, handled</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u{1F3F7}\uFE0F</div>
          <div class="font-semibold">Category &amp; tag mapping</div>
          <p class="mt-1 text-sm text-gray-600">Match YNAB categories and tags to your Monarch ones, or create new
            ones, grouped, with icons.</p>
        </div>
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u270F\uFE0F</div>
          <div class="font-semibold">Rename &amp; edit first</div>
          <p class="mt-1 text-sm text-gray-600">Tidy account names and pick which accounts to bring over before anything
            imports.</p>
        </div>
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u{1F9E0}</div>
          <div class="font-semibold">Smart type detection</div>
          <p class="mt-1 text-sm text-gray-600">Account types and subtypes are detected for you. Adjust any with a tap.
          </p>
        </div>
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u{1F501}</div>
          <div class="font-semibold">Retry just the failures</div>
          <p class="mt-1 text-sm text-gray-600">If an account hiccups, re-run only that one, no starting over.</p>
        </div>
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u{1F512}</div>
          <div class="font-semibold">Private by design</div>
          <p class="mt-1 text-sm text-gray-600">Your data is processed in your browser and never stored on our servers.
          </p>
        </div>
        <div class="rounded-2xl bg-white border border-gray-100 p-6">
          <div class="text-2xl mb-3">\u{1F49B}</div>
          <div class="font-semibold">Free &amp; open source</div>
          <p class="mt-1 text-sm text-gray-600">No paywall. Review every line of code on GitHub.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== HOW IT WORKS ===================== -->
  <section id="how" class="max-w-7xl mx-auto px-6 py-16 sm:py-24">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">How it works</p>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Three steps. A few minutes.</h2>
    </div>
    <div class="grid sm:grid-cols-3 gap-6">
      <div class="text-center">
        <div
          class="w-12 h-12 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center mx-auto mb-4">
          1</div>
        <div class="font-semibold">Upload your YNAB data</div>
        <p class="mt-1 text-sm text-gray-600">Drop in your export and we parse every account and transaction.</p>
      </div>
      <div class="text-center">
        <div
          class="w-12 h-12 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center mx-auto mb-4">
          2</div>
        <div class="font-semibold">Map &amp; review</div>
        <p class="mt-1 text-sm text-gray-600">Choose accounts, categories, tags, and how duplicates are handled.</p>
      </div>
      <div class="text-center">
        <div
          class="w-12 h-12 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center mx-auto mb-4">
          3</div>
        <div class="font-semibold">Import to Monarch</div>
        <p class="mt-1 text-sm text-gray-600">Everything moves over in one pass: transactions and balances.</p>
      </div>
    </div>
  </section>

  <!-- ===================== FAQ ===================== -->
  <section class="bg-gray-50 border-t border-gray-100">
    <div class="max-w-3xl mx-auto px-6 py-16 sm:py-24">
      <div class="text-center mb-10">
        <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">FAQ</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">Questions, answered</h2>
      </div>

      <div class="rounded-2xl bg-white border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">Is my financial data safe?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">Yes. Your data is processed in your browser and is
            never stored, sold, or shared. The project is open source, so you can verify exactly what happens to it.
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">How is this different from Monarch's own importer?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">Monarch imports one account at a time and splits
            transactions and balance history into separate flows. This tool brings every account in at once, combines
            transactions and balances into a single import, and adds account/category/tag mapping and duplicate control
            on top.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">Do you import both transactions and balances?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">Yes, both, in a single pass, for every account you
            select.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">Can you create synced (bank-connected) accounts?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">No. Synced accounts, the ones connected to a bank or
            financial institution, can only be set up from inside Monarch, so this tool creates manual accounts. You can
            still end up with a synced account that holds your full YNAB history, though: import your history here, connect
            your bank in Monarch, then use Monarch's Transfer tool to merge the two. <a class="js-synced-guide font-semibold text-[#005B96] hover:underline" href="/synced-accounts">Read the step-by-step guide \u2192</a></div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">What happens to duplicate transactions?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">When you import into an account that already has
            data, you choose per account whether your YNAB data, the existing Monarch data, or all of it takes priority.
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">What do I need to get started?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">Your YNAB export file (a <span
              class="font-mono text-xs">.zip</span>) and your Monarch login. A secure one-click YNAB connection is
            coming soon.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">Is it affiliated with YNAB or Monarch?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">No. This is an independent, open-source tool and is
            not affiliated with or endorsed by YNAB or Monarch Money.</div>
        </div>
        <div class="faq-item">
          <button class="faq-q w-full flex items-center justify-between gap-4 px-5 py-5 text-left">
            <span class="font-semibold">Is it really free?</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="faq-a hidden px-5 pb-5 text-gray-600 text-sm">Yes, completely free. If it saved you time, a tip
            via the \u201CSupport this tool\u201D button is appreciated but never required.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== FINAL CTA ===================== -->
  <section class="bg-[#005B96]">
    <div class="max-w-4xl mx-auto px-6 py-16 sm:py-20 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">Ready to move to Monarch?</h2>
      <p class="mt-3 text-white/80">Bring your whole YNAB history over in a few minutes.</p>
      <div class="mt-8 flex justify-center">
        <button class="js-start ui-button" data-type="secondary" data-size="large">Start migrating, it's free</button>
      </div>
    </div>
  </section>

</div>`;var V={credentials:{email:"",encryptedPassword:"",otp:"",remember:!1,apiToken:"",awaitingOtp:!1,deviceUuid:""},monarchAccounts:null,accounts:{},mappings:{accountMapping:{},columnMapping:{},categoryMapping:{},tagMapping:{},priorityMapping:{}},ynabOauth:{code:null,state:null,error:null}};var bn=_t(hn(),1),yn=_t(At(),1);function Tr(){return"id-"+Math.random().toString(36).slice(2,11)}function gn(e){if(!e)return 0;let t=e.replace(/[^0-9.-]+/g,"").trim(),r=parseFloat(t);return isNaN(r)?0:Math.round(r*100)}function Lr(e){let t=e.toLowerCase();return t.includes("credit")?{type:"credit",subtype:"credit_card"}:t.includes("loan")||t.includes("mortgage")||t.includes("student loan")?{type:"loan",subtype:"loan"}:t.includes("savings")?{type:"depository",subtype:"savings"}:t.includes("checking")||t.includes("debit")?{type:"depository",subtype:"checking"}:{type:"depository",subtype:"checking"}}async function It(e,t){console.group("parseYNABCSV");let r=await yn.default.loadAsync(e),i=Object.keys(r.files).find(a=>a.toLowerCase().includes("register")&&a.toLowerCase().endsWith(".csv"));if(!i)throw console.error("\u274C No register CSV found in the ZIP file"),console.groupEnd("parseYNABCSV"),new Error("No register CSV found in the ZIP file");let s=await r.files[i].async("string");return console.groupEnd("parseYNABCSV"),Nr(s,t)}function Nr(e,t){return console.group("parseCSV"),new Promise((r,i)=>{bn.default.parse(e,{header:!0,skipEmptyLines:!0,complete:({data:s})=>{if(!s||s.length===0)return console.groupEnd("parseCSV"),i(new Error("\u274C CSV file appears to be empty or invalid."));let a=new Map;for(let o of s){let p=o.Account?.trim();if(!p){console.warn("\u274C Skipping row with missing account name:",o);continue}if(o.Date){let[w,d,b]=o.Date.split("/");w&&d&&b&&(o.Date=`${b}-${w.padStart(2,"0")}-${d.padStart(2,"0")}`)}let v=gn(o.Inflow),x=gn(o.Outflow),y=v-x;if(v>0?o.Amount=(v/100).toFixed(2):x>0?o.Amount=(-x/100).toFixed(2):o.Amount="0.00",!a.has(p)){let{type:w,subtype:d}=Lr(p,t);a.set(p,{id:Tr(),name:p,modifiedName:p,type:w,subtype:d,transactions:[],transactionCount:0,balanceCents:0,included:!0,selected:!1,status:"unprocessed"})}let u=a.get(p);u.transactions.push({Date:o.Date,Merchant:o.Payee||"",Category:o.Category||"","Category Group":o["Category Group"]||"",Notes:o.Memo||"",Amount:o.Amount,Tags:o.Flag||""}),u.transactionCount+=1,u.balanceCents+=y}for(let o of a.values())o.balance=o.balanceCents/100,o.included=o.transactionCount>0;console.groupEnd("parseCSV"),r(Object.fromEntries(a))},error:s=>i(s)})})}function xn(e){let t=document.getElementById(e),r=t.querySelector(".relative");t.classList.remove("pointer-events-none","opacity-0"),t.classList.add("pointer-events-auto","opacity-100"),requestAnimationFrame(()=>{r.classList.remove("translate-y-full"),r.classList.add("translate-y-0")})}function vn(e){let t=document.getElementById(e),r=t.querySelector(".relative");r.classList.remove("translate-y-0"),r.classList.add("translate-y-full"),setTimeout(()=>{t.classList.add("pointer-events-none","opacity-0"),t.classList.remove("pointer-events-auto","opacity-100")},500)}function Mt(){let e=document.getElementById("dropzone"),t=document.getElementById("manualFileInput"),r=document.getElementById("dropzoneIdle"),i=document.getElementById("dropzoneLoading"),s=document.getElementById("loadingFileName"),a=document.getElementById("errorMessage"),o=document.getElementById("errorMessageText"),p=document.getElementById("manualImportInfoModalButton"),v=document.getElementById("closeManualImportInfoModal");ce(),p?.addEventListener("click",()=>xn("manualImportInfoModal")),v?.addEventListener("click",()=>vn("manualImportInfoModal")),["dragover","drop"].forEach(d=>window.addEventListener(d,b=>b.preventDefault()));let x=0;e?.addEventListener("dragenter",d=>{d.preventDefault(),x+=1,e.classList.add("is-dragging")}),e?.addEventListener("dragover",d=>d.preventDefault()),e?.addEventListener("dragleave",()=>{x=Math.max(0,x-1),x===0&&e.classList.remove("is-dragging")}),e?.addEventListener("drop",d=>{d.preventDefault(),x=0,e.classList.remove("is-dragging");let b=d.dataTransfer?.files?.[0];b&&w(b)}),t?.addEventListener("change",d=>{let b=d.target.files[0];b&&w(b)});function y(d){o.textContent=d,a.classList.remove("hidden"),i.classList.add("hidden"),i.classList.remove("flex"),r.classList.remove("hidden"),r.classList.add("flex"),t.value=""}function u(d){a.classList.add("hidden"),s.textContent=d,r.classList.add("hidden"),r.classList.remove("flex"),i.classList.remove("hidden"),i.classList.add("flex")}async function w(d){let b=d.name.toLowerCase(),f=d.type.toLowerCase(),k=b.endsWith(".zip")||b.endsWith(".bin")||b.includes("ynab")||b.includes("register")||b.includes("export"),C=["application/zip","application/x-zip-compressed","application/octet-stream","application/x-zip","multipart/x-zip","application/x-compressed","application/binary"].includes(f);if(!(k||C||d.size>1e3)){y("That doesn\u2019t look like a YNAB export. Please upload the .zip file you exported from YNAB.");return}u(d.name);try{let T=await It(d);V.accounts=T,ve(),T&&Object.keys(T).length>0?ae("/review",!1,!0):y("We couldn\u2019t find any accounts in that file. Make sure it\u2019s your full YNAB export.")}catch(T){y("We couldn\u2019t read that file. Please make sure it\u2019s a valid YNAB .zip export containing register.csv and plan.csv."),console.error(T)}}}var wn=`<div class="w-full text-gray-900 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12">

  <!-- Subtle brand gradient wash + soft depth orbs behind the whole flow -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#005B96]/[0.06] via-white to-white pointer-events-none"></div>
    <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#1993e5]/20 blur-3xl pointer-events-none"></div>
    <div class="absolute top-32 -right-28 w-80 h-80 rounded-full bg-[#005B96]/10 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-3xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24">

      <!-- ===================== HEADER ===================== -->
      <div class="text-center mb-8 sm:mb-10">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          Upload your YNAB export
        </h1>
        <p class="mt-3 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          <span class="sm:hidden">Add</span><span class="hidden sm:inline">Drop in</span> your YNAB export and we\u2019ll pull out every account, transaction, and balance, ready to review.
        </p>
      </div>

      <!-- ===================== UPLOAD CARD ===================== -->
      <div class="rounded-3xl border border-gray-200 bg-white shadow-xl shadow-[#005B96]/[0.04] p-5 sm:p-7">

        <!-- Dropzone (label = whole area is clickable; input stays focusable) -->
        <label id="dropzone"
          class="group relative flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/60 px-6 py-12 sm:py-16 cursor-pointer transition-all duration-200 hover:border-[#005B96]/60 hover:bg-[#005B96]/[0.03] focus-within:border-[#005B96] focus-within:ring-4 focus-within:ring-[#005B96]/10">

          <input id="manualFileInput" type="file"
            accept=".zip,.bin,application/zip,application/x-zip-compressed,application/octet-stream,application/binary"
            class="sr-only" />

          <!-- IDLE state -->
          <div id="dropzoneIdle" class="flex flex-col items-center">
            <div class="relative mb-5">
              <!-- Soft gradient glow halo behind the icon; intensifies on hover -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#005B96]/40 to-[#1993e5]/40 blur-xl opacity-50 group-hover:opacity-90 transition-opacity duration-300"></div>
              <span class="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#005B96] to-[#1993e5] text-white shadow-lg shadow-[#005B96]/25">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12 3v12" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8 7l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>
            </div>
            <p class="text-base sm:text-lg font-semibold text-gray-900">
              <span class="text-[#005B96] underline decoration-2 underline-offset-2">
                <span class="sm:hidden">Tap to upload</span><span class="hidden sm:inline">Click to upload</span>
              </span>
              <span class="hidden sm:inline text-gray-700"> or drag and drop</span>
            </p>
            <p class="mt-1.5 text-sm text-gray-500">
              Your YNAB export, a <span class="font-mono text-xs bg-gray-100 rounded px-1.5 py-0.5">.zip</span> file
            </p>
          </div>

          <!-- PARSING state -->
          <div id="dropzoneLoading" class="hidden flex-col items-center">
            <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#005B96]/10 mb-5">
              <span class="w-7 h-7 border-[3px] border-[#005B96]/25 border-t-[#005B96] rounded-full animate-spin"></span>
            </span>
            <p class="text-base sm:text-lg font-semibold text-gray-900">Reading your export\u2026</p>
            <p id="loadingFileName" class="mt-1.5 text-sm text-gray-500 max-w-xs truncate">&nbsp;</p>
          </div>
        </label>

        <!-- Error message (hidden until needed) -->
        <div id="errorMessage" role="alert"
          class="hidden mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.01M10.34 3.34l-7.5 12.99A1.75 1.75 0 004.5 19h15a1.75 1.75 0 001.51-2.67l-7.5-12.99a1.75 1.75 0 00-3.17 0z" />
          </svg>
          <span id="errorMessageText">Something went wrong.</span>
        </div>

        <!-- What we'll pull out of the export -->
        <div class="mt-5 pt-5 border-t border-gray-100">
          <p class="text-center text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">We\u2019ll automatically detect</p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">\u{1F3E6} Accounts</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">\u{1F4B3} Transactions</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">\u{1F4C8} Balances</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">\u{1F3F7}\uFE0F Categories</span>
          </div>
        </div>

        <!-- Help link -->
        <div class="mt-5 flex items-center justify-center">
          <button id="manualImportInfoModalButton" type="button"
            class="nav-back inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#005B96] transition-colors focus:outline-none focus:ring-2 focus:ring-[#005B96]/40 rounded-md px-2 py-1">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01" />
            </svg>
            Where do I find my YNAB export?
          </button>
        </div>
      </div>

      <!-- ===================== TRUST STRIP ===================== -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500">
        <span class="inline-flex items-center gap-1.5">
          <svg class="w-4 h-4 text-[#005B96]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.5l7 3v5.5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V5.5l7-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.25 12l2 2 3.5-3.75" />
          </svg>
          Processed in your browser
        </span>
        <span class="inline-flex items-center gap-1.5">
          <svg class="w-4 h-4 text-[#005B96]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10V7a4 4 0 118 0v3" />
          </svg>
          Never stored on our servers
        </span>
        <span class="inline-flex items-center gap-1.5">
          <svg class="w-4 h-4 text-[#005B96]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 .9-.17 1.76-.46 2.56" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 11l2 2 4-4" />
          </svg>
          Free &amp; open source
        </span>
      </div>

    </div>
  </section>
</div>

<!-- Manual Import Info Modal -->
<div id="manualImportInfoModal"
  class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 p-3 sm:p-4 md:p-6">

  <!-- Overlay -->
  <div class="absolute inset-0 bg-black/40 transition-opacity duration-300"></div>

  <!-- Modal Content -->
  <div
    class="relative z-10 bg-white rounded-2xl p-5 sm:p-7 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full shadow-2xl transform translate-y-full transition-transform duration-500 max-h-[90vh] overflow-y-auto">

    <!-- Close Btn -->
    <button id="closeManualImportInfoModal"
      class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Close modal">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Title -->
    <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 pr-8 text-gray-900">
      Where do I find my YNAB export?
    </h3>

    <!-- Body: numbered steps -->
    <ol class="space-y-5">
      <li class="flex gap-3.5">
        <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#005B96]/10 text-[#005B96] text-sm font-bold">1</span>
        <div>
          <h4 class="text-gray-900 text-sm font-semibold mb-0.5">Sign in to YNAB</h4>
          <p class="text-gray-600 text-sm">Visit <a href="https://www.ynab.com" target="_blank" rel="noopener noreferrer" class="text-[#005B96] font-medium hover:underline">YNAB.com</a> and log into your account.</p>
        </div>
      </li>
      <li class="flex gap-3.5">
        <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#005B96]/10 text-[#005B96] text-sm font-bold">2</span>
        <div>
          <h4 class="text-gray-900 text-sm font-semibold mb-0.5">Export your plan</h4>
          <p class="text-gray-600 text-sm">Click your name in the top-left corner, then <span class="font-medium text-gray-900">Export Plan</span>. This downloads a <span class="font-mono text-xs bg-gray-100 rounded px-1 py-0.5">.zip</span> with all your data.</p>
        </div>
      </li>
      <li class="flex gap-3.5">
        <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#005B96]/10 text-[#005B96] text-sm font-bold">3</span>
        <div>
          <h4 class="text-gray-900 text-sm font-semibold mb-0.5">Upload it here</h4>
          <p class="text-gray-600 text-sm">
            <span class="hidden sm:inline">Drag the <span class="font-mono text-xs bg-gray-100 rounded px-1 py-0.5">.zip</span> onto the upload area, or click to browse for it.</span>
            <span class="sm:hidden">Tap the upload area and choose your <span class="font-mono text-xs bg-gray-100 rounded px-1 py-0.5">.zip</span> file.</span>
          </p>
        </div>
      </li>
      <li class="flex gap-3.5">
        <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#005B96]/10 text-[#005B96] text-sm font-bold">4</span>
        <div>
          <h4 class="text-gray-900 text-sm font-semibold mb-0.5">Review &amp; map</h4>
          <p class="text-gray-600 text-sm">Choose which accounts to bring over and how they map into Monarch.</p>
        </div>
      </li>
      <li class="flex gap-3.5">
        <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#005B96]/10 text-[#005B96] text-sm font-bold">5</span>
        <div>
          <h4 class="text-gray-900 text-sm font-semibold mb-0.5">Import to Monarch</h4>
          <p class="text-gray-600 text-sm">Everything moves over in one pass: transactions and balances.</p>
        </div>
      </li>
    </ol>
  </div>
</div>
`;function qe(e={}){let{backText:t="Back",nextText:r="Continue",backId:i="backBtn",nextId:s="continueBtn",showBack:a=!0,showNext:o=!1,nextType:p="primary",nextDisabled:v=!1,containerClass:x=""}=e,y=a?`
    <button id="${i}" class="ui-button order-2 sm:order-1 w-full sm:w-auto whitespace-nowrap" data-type="secondary" data-size="large">
      <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      ${t}
    </button>
  `:"<div></div>",u=o?`
    <button id="${s}" 
            class="ui-button order-1 sm:order-2 w-full sm:w-auto whitespace-nowrap" 
            data-type="${p}" 
            data-size="large"
            ${v?"disabled":""}>
      <span class="hidden sm:inline truncate">${r}</span>
      <span class="sm:hidden truncate">${r.split(" ")[0]}</span>
      <svg class="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  `:"<div></div>";return`
    <!-- Navigation Bar -->
    <div class="bg-white border-t border-gray-100 mt-8 sm:mt-12">
      <div class="container-responsive">
        <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-6 sm:py-8 gap-4 sm:gap-6 ${x}">
          ${y}
          ${u}
        </div>
      </div>
    </div>
  `}function Or(e={}){let{backText:t="Back",backId:r="backBtn",containerClass:i="",iconOnly:s=!1,ariaLabel:a=t}=e;return s?`
      <button id="${r}" type="button" title="${a}" aria-label="${a}"
              class="nav-back group inline-flex items-center justify-center w-10 h-10 ${i}
                     rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm
                     hover:bg-gray-50 hover:border-gray-400
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    `:`
    <!-- Back navigation -->
    <div class="w-full ${i}">
      <button id="${r}" type="button"
              class="nav-back group inline-flex items-center gap-1.5 -ml-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        ${t}
      </button>
    </div>
  `}function _e(e={}){let{title:t="",subtitle:r="",backText:i,backId:s="backBtn",titleId:a="",subtitleId:o=""}=e,p=i?Or({iconOnly:!0,ariaLabel:i,backId:s}):"";return`
    <div class="relative w-full mb-5 sm:mb-6">
      ${p?`<div class="absolute left-0 top-1/2 -translate-y-1/2">${p}</div>`:""}
      <div class="text-center max-w-2xl mx-auto px-12">
        <h2 ${a?`id="${a}"`:""} class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">${t}</h2>
        ${r?`<p ${o?`id="${o}"`:""} class="text-gray-500 text-sm sm:text-base leading-snug mt-1">${r}</p>`:""}
      </div>
    </div>
  `}var He=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2});function ke(e,t){e.disabled=t,e.classList.toggle("cursor-default",t),e.classList.toggle("cursor-pointer",!t),e.classList.toggle("opacity-50",t)}function we(e,t){t?(e.classList.remove("hidden"),e.removeAttribute("aria-hidden"),e.removeAttribute("hidden")):(e.classList.add("hidden"),e.setAttribute("aria-hidden","true"),e.setAttribute("hidden","true"))}var ot,Re,tt,Ye,ie={accountName:"",nameMatchType:"contains",nameCaseSensitive:!1,transactionsMin:null,transactionsMax:null,balanceMin:null,balanceMax:null,inclusion:"all"},We="",Me=null,je="asc";function Tt(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"Review accounts",subtitle:"We found these accounts in your YNAB export. Pick which to bring over and confirm each Monarch type.",backText:"Back to Upload"}));let e={showBack:!1,showNext:!0,nextText:"Continue",nextId:"continueBtn",nextType:"primary"};document.getElementById("reviewContent").insertAdjacentHTML("beforeend",qe(e)),ot=document.getElementById("reviewTableBody"),Re=document.getElementById("mobileAccountList"),tt=document.getElementById("continueBtn"),Ye=document.getElementById("searchInput"),ce(),Ie(),setTimeout(()=>{let o=Object.keys(V.accounts).length;On(o,o)},100);let t=document.getElementById("searchClearBtn"),r=()=>{t&&t.classList.toggle("hidden",!Ye.value)},i;Ye.addEventListener("input",()=>{r(),clearTimeout(i),i=setTimeout(()=>{We=Ye.value.toLowerCase(),Ie(),ve()},200)}),t&&t.addEventListener("click",()=>{clearTimeout(i),Ye.value="",We="",r(),Ie(),ve(),Ye.focus()}),r(),document.querySelectorAll("th[data-sort-key]").forEach(o=>{o.addEventListener("click",()=>{let p=o.getAttribute("data-sort-key");Me===p?je=je==="asc"?"desc":"asc":(Me=p,je="asc"),Ie()})}),setTimeout(()=>{let o=document.getElementById("filtersBtn");o?(console.log("Adding click listener to filters button"),o.addEventListener("click",w=>{console.log("Filters button clicked!"),w.preventDefault(),Tn()})):console.error("Filters button not found!");let p=document.getElementById("filtersModalClose");p&&p.addEventListener("click",De);let v=document.getElementById("filtersApply");v&&v.addEventListener("click",Nn);let x=document.getElementById("filtersReset");x&&x.addEventListener("click",lt);let y=document.getElementById("filtersModal");y&&y.addEventListener("click",w=>{w.target.id==="filtersModal"&&De()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&y&&!y.classList.contains("hidden")&&De()});let u=document.getElementById("clearFiltersBtn");u&&u.addEventListener("click",()=>{lt(),De()})},100),document.getElementById("unselectAllBtnMobile").addEventListener("click",()=>kn(!1)),document.getElementById("unselectAllBtnDesktop").addEventListener("click",()=>kn(!1)),document.getElementById("bulkIncludeBtnMobile").addEventListener("click",()=>it(!0)),document.getElementById("bulkIncludeBtnDesktop").addEventListener("click",()=>it(!0)),document.getElementById("bulkExcludeBtnMobile").addEventListener("click",()=>it(!1)),document.getElementById("bulkExcludeBtnDesktop").addEventListener("click",()=>it(!1)),document.getElementById("masterCheckbox").addEventListener("change",Sn);let s=document.getElementById("masterCheckboxMobile");s&&s.addEventListener("change",Sn);let a=document.getElementById("mobileSortSelect");a&&a.addEventListener("change",o=>{let p=o.target.value;if(p==="default")Me=null;else{let[v,x]=p.split("-");Me=v,je=x}Ie()}),document.getElementById("continueBtn").addEventListener("click",()=>ae("/method")),document.getElementById("backBtn").addEventListener("click",()=>Ee()),Ie()}function kn(e){Object.values(V.accounts).forEach(t=>{t.status!=="processed"&&(t.selected=e)}),ve(),Ie()}function it(e){Object.values(V.accounts).forEach(t=>{t.selected&&(t.included=e)}),ve(),Ie()}function Ie(){let e=document.createDocumentFragment(),t=document.createDocumentFragment(),r=Object.values(V.accounts);ot.innerHTML="",Re&&(Re.innerHTML="");let i=r.filter(a=>zn(a)&&(!We||a.modifiedName.toLowerCase().includes(We)));jr(i);let s=i.length;for(let a of i)e.appendChild($r(a)),Re&&t.appendChild(Ur(a));ot.appendChild(e),Re&&Re.appendChild(t),s===0&&(ot.appendChild(Fr()),Re&&Re.appendChild(Pr())),Dr(),On(s,r.length),Lt(ct()),zt(),Nt(),Cn()}function Rr(e){return e.included&&e.status!=="processed"}function Cn(){let e=Object.values(V.accounts).filter(Rr).length,t=e>0;ke(tt,!t),tt.title=tt.disabled?"At least one account must be included to proceed":"",tt.textContent=t?`Continue with ${e} account${e!==1?"s":""}`:"Continue",ce()}function _n(e){return String(e.id||e.modifiedName).replace(/[^a-zA-Z0-9_-]/g,"_")}function jr(e){if(!Me)return;let t=je==="asc"?1:-1;e.sort((r,i)=>{if(Me==="name")return t*r.modifiedName.localeCompare(i.modifiedName,void 0,{sensitivity:"base"});let s=Me==="balance"?r.balance:r.transactionCount,a=Me==="balance"?i.balance:i.transactionCount;return t*(s-a)})}function Dr(){document.querySelectorAll("th[data-sort-key]").forEach(t=>{let r=t.getAttribute("data-sort-key"),i=t.querySelector(".sort-indicator"),s=r===Me;t.setAttribute("aria-sort",s?je==="asc"?"ascending":"descending":"none"),i&&(i.textContent=s?je==="asc"?"\u2191":"\u2193":"\u2195",i.classList.toggle("opacity-0",!s))});let e=document.getElementById("mobileSortSelect");e&&(e.value=Me?`${Me}-${je}`:"default")}function Bn(e,{fixedWidth:t=!1}={}){let r=document.createElement("button");return r.type="button",r.dataset.accountToggle=_n(e),t&&(r.dataset.fixedWidth="1"),En(r,e),e.status!=="processed"&&r.addEventListener("click",()=>{if(e.included=!e.included,ve(),ie.inclusion!=="all"){Ie();return}document.querySelectorAll(`[data-account-toggle="${_n(e)}"]`).forEach(i=>En(i,e)),Cn()}),r}function En(e,t){let r=t.status==="processed",i="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",s;r?s="bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed":t.included?s="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 focus:ring-green-500":s="bg-white text-gray-500 border-gray-300 hover:bg-gray-50 focus:ring-gray-400",e.className=`${i} ${s}`,e.dataset.fixedWidth==="1"&&e.classList.add("min-w-[104px]");let a=r?"Processed":t.included?"Included":"Excluded",o=t.included&&!r?'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>':"";e.innerHTML=`${o}<span>${a}</span>`,e.disabled=r,r?e.removeAttribute("aria-pressed"):e.setAttribute("aria-pressed",String(t.included)),e.title=r?"This account has already been processed":t.included?"Click to exclude this account":"Click to include this account"}var An=`
  <div class="flex flex-col items-center gap-3">
    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <div>
      <p class="text-sm font-medium text-gray-600">No accounts match your filters</p>
      <p class="text-xs text-gray-500 mt-1">Try a different search term or clear your filters.</p>
    </div>
  </div>`;function Fr(){let e=document.createElement("tr"),t=document.createElement("td");return t.colSpan=5,t.className="px-4 py-16 text-center",t.innerHTML=An,e.appendChild(t),e}function Pr(){let e=document.createElement("div");return e.className="px-4 py-12 text-center",e.innerHTML=An,e}function In(e){return e.status==="processed"?"text-gray-500":e.balance<0?"text-red-600":"text-gray-900"}function Mn(){let e=document.createElement("span");return e.className="text-amber-500 cursor-default flex-shrink-0",e.title="Previously failed to process",e.innerHTML='<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',e}function $r(e){let t=document.createElement("tr");t.className="hover:bg-gray-50 transition-colors";let r=e.status==="processed",i=e.status==="failed",s=document.createElement("td");s.className="px-3 sm:px-4 py-2 text-center";let a=document.createElement("input");a.type="checkbox";let o=`account-checkbox-${e.id||e.modifiedName.replace(/\s+/g,"-")}`;a.id=o,a.name=o,a.setAttribute("aria-label",`Select account: ${e.modifiedName}`),a.className="w-5 h-5",ke(a,r),a.checked=e.selected,a.addEventListener("change",()=>{e.selected=a.checked,zt(),Lt(ct())}),s.appendChild(a),t.appendChild(s);let p=document.createElement("td");p.className="px-3 sm:px-4 py-2 max-w-[300px] truncate font-medium text-gray-900 cursor-default",p.textContent=e.modifiedName,p.title=e.modifiedName,r&&p.classList.add("text-gray-500"),t.appendChild(p);let v=document.createElement("td");v.className="px-3 sm:px-4 py-2 text-center text-gray-600 tabular-nums cursor-default",v.textContent=e.transactionCount,v.title=`${e.transactionCount} transaction${e.transactionCount!==1?"s":""}`,r&&v.classList.add("text-gray-500"),t.appendChild(v);let x=document.createElement("td");x.className=`px-3 sm:px-4 py-2 text-right font-medium tabular-nums cursor-default ${In(e)}`,x.textContent=He.format(e.balance),x.title=`Balance: ${He.format(e.balance)}`,t.appendChild(x);let y=document.createElement("td");return y.className="px-3 sm:px-4 py-2 flex items-center justify-center gap-2",y.appendChild(Bn(e,{fixedWidth:!0})),i&&y.appendChild(Mn()),t.appendChild(y),t}function Ur(e){let t=document.createElement("div");t.className="mobile-account-card";let r=e.status==="processed",i=e.status==="failed",s=document.createElement("label");s.className="custom-checkbox-container flex-shrink-0";let a=document.createElement("input");a.type="checkbox",a.className="custom-checkbox-input";let o=`mobile-account-checkbox-${e.id||e.modifiedName.replace(/\s+/g,"-")}`;a.id=o,a.name=o,a.setAttribute("aria-label",`Select account: ${e.modifiedName}`),a.disabled=r,a.checked=e.selected||!1,a.addEventListener("change",()=>{e.selected=a.checked,ve(),zt(),Lt(ct()),Nt()});let p=document.createElement("span");p.className="custom-checkbox-visual",s.appendChild(a),s.appendChild(p),t.appendChild(s);let v=document.createElement("div");v.className="card-content";let x=document.createElement("div");x.className="flex items-start justify-between gap-3";let y=document.createElement("div");y.className=`font-medium truncate min-w-0 ${r?"text-gray-500":"text-gray-900"}`,y.textContent=e.modifiedName,y.title=e.modifiedName,x.appendChild(y);let u=document.createElement("div");u.className="flex items-center gap-2 flex-shrink-0",i&&u.appendChild(Mn()),u.appendChild(Bn(e)),x.appendChild(u),v.appendChild(x);let w=document.createElement("div");w.className="mt-1.5 flex items-center justify-between gap-3 text-sm";let d=document.createElement("span");d.className=r?"text-gray-500":"text-gray-600",d.textContent=`${e.transactionCount} transaction${e.transactionCount!==1?"s":""}`;let b=document.createElement("span");return b.className=`font-medium tabular-nums ${In(e)}`,b.textContent=He.format(e.balance),w.appendChild(d),w.appendChild(b),v.appendChild(w),t.appendChild(v),t}function Lt(e){let t=document.getElementById("masterCheckbox"),r=document.getElementById("masterCheckboxMobile"),i=e.filter(o=>o.selected).length,s=i>0&&i===e.length,a=i>0&&i<e.length;t&&(t.checked=s,t.indeterminate=a),r&&(r.checked=s,r.indeterminate=a),Nt()}function Nt(){let e=document.getElementById("mobileSelectionCount");if(e){let t=Object.values(V.accounts).filter(r=>r.selected).length;e.textContent=`${t} selected`}}function ct(){return Object.values(V.accounts).filter(e=>!(e.status==="processed"||!zn(e)||We&&!e.modifiedName.toLowerCase().includes(We)))}function Sn(e){let t=e.target.checked;ct().forEach(r=>{r.selected=t}),Ie()}function zt(){let e=document.getElementById("bulkActionBar"),t=Object.values(V.accounts).filter(a=>a.selected).length,r=document.getElementById("selectedCountMobile");r&&(r.textContent=t);let i=document.getElementById("selectedCountDesktop");i&&(i.textContent=t);let s=document.querySelector(".flex.flex-col.max-w-7xl");s&&s.classList.toggle("pb-28",t>0),t>0?(e.classList.remove("hidden"),e.classList.add("active")):(e.classList.remove("active"),setTimeout(()=>{e.classList.contains("active")||e.classList.add("hidden")},300))}function Tn(){console.log("Opening filters modal...");try{let e=document.getElementById("filterAccountName");e&&(e.value=ie.accountName);let t=document.querySelector(`input[name="nameMatchType"][value="${ie.nameMatchType}"]`);t&&(t.checked=!0);let r=document.getElementById("nameCaseSensitive");r&&(r.checked=ie.nameCaseSensitive);let i=document.getElementById("filterTransactionsMin");i&&(i.value=ie.transactionsMin||"");let s=document.getElementById("filterTransactionsMax");s&&(s.value=ie.transactionsMax||"");let a=document.getElementById("filterBalanceMin");a&&(a.value=ie.balanceMin||"");let o=document.getElementById("filterBalanceMax");o&&(o.value=ie.balanceMax||"");let p=document.querySelector(`input[name="inclusionFilter"][value="${ie.inclusion}"]`);p&&(p.checked=!0);let v=document.getElementById("filtersModal");v?(console.log("Found modal, showing it..."),nt=document.activeElement,v.classList.remove("hidden"),document.addEventListener("keydown",Ln),setTimeout(()=>{v.classList.add("show");let x=document.getElementById("filterAccountName");x&&x.focus()},10)):console.error("Modal not found!")}catch(e){console.error("Error opening filters modal:",e)}}var nt=null;function Ln(e){if(e.key!=="Tab")return;let t=document.getElementById("filtersModal");if(!t||t.classList.contains("hidden"))return;let r=t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');if(!r.length)return;let i=r[0],s=r[r.length-1];e.shiftKey&&document.activeElement===i?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),i.focus())}window.openFiltersModal=Tn;function De(){let e=document.getElementById("filtersModal");document.removeEventListener("keydown",Ln),e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300),nt&&typeof nt.focus=="function"&&(nt.focus(),nt=null)}window.closeFiltersModal=De;function Nn(){console.log("Apply filters button clicked!");try{let e=document.getElementById("filterAccountName");ie.accountName=e?e.value.trim():"";let t=document.querySelector('input[name="nameMatchType"]:checked');ie.nameMatchType=t?t.value:"contains";let r=document.getElementById("nameCaseSensitive");ie.nameCaseSensitive=r?r.checked:!1;let i=document.getElementById("filterTransactionsMin"),s=document.getElementById("filterTransactionsMax");ie.transactionsMin=i&&i.value?parseInt(i.value):null,ie.transactionsMax=s&&s.value?parseInt(s.value):null;let a=document.getElementById("filterBalanceMin"),o=document.getElementById("filterBalanceMax");ie.balanceMin=a&&a.value?parseFloat(a.value):null,ie.balanceMax=o&&o.value?parseFloat(o.value):null;let p=document.querySelector('input[name="inclusionFilter"]:checked');ie.inclusion=p?p.value:"all",console.log("Applied filters:",ie),De(),Ie(),ve()}catch(e){console.error("Error applying filters:",e)}}window.applyFilters=Nn;function lt(){console.log("Reset filters button clicked!");try{let e=document.getElementById("filterAccountName");e&&(e.value="");let t=document.querySelector('input[name="nameMatchType"][value="contains"]');t&&(t.checked=!0);let r=document.getElementById("nameCaseSensitive");r&&(r.checked=!1);let i=document.getElementById("filterTransactionsMin");i&&(i.value="");let s=document.getElementById("filterTransactionsMax");s&&(s.value="");let a=document.getElementById("filterBalanceMin");a&&(a.value="");let o=document.getElementById("filterBalanceMax");o&&(o.value="");let p=document.querySelector('input[name="inclusionFilter"][value="all"]');p&&(p.checked=!0),ie={accountName:"",nameMatchType:"contains",nameCaseSensitive:!1,transactionsMin:null,transactionsMax:null,balanceMin:null,balanceMax:null,inclusion:"all"},Ie(),ve(),De(),console.log("Filters reset successfully")}catch(e){console.error("Error resetting filters:",e)}}window.resetFilters=lt;function qr(){console.log("Clear all filters clicked!"),lt(),De()}window.clearAllFilters=qr;function zn(e){if(ie.accountName){let i=ie.nameCaseSensitive?e.modifiedName:e.modifiedName.toLowerCase(),s=ie.nameCaseSensitive?ie.accountName:ie.accountName.toLowerCase();if(ie.nameMatchType==="exact"){if(i!==s)return!1}else if(!i.includes(s))return!1}let t=e.transactionCount||0;if(ie.transactionsMin!==null&&t<ie.transactionsMin||ie.transactionsMax!==null&&t>ie.transactionsMax)return!1;let r=parseFloat(e.balance)||0;return!(ie.balanceMin!==null&&r<ie.balanceMin||ie.balanceMax!==null&&r>ie.balanceMax||ie.inclusion==="included"&&!e.included||ie.inclusion==="excluded"&&e.included)}function On(e,t){let r=document.getElementById("visibleAccountCount"),i=document.getElementById("totalAccountCount"),s=document.getElementById("filterResultsSummary"),a=document.getElementById("filterNotificationBadge"),o=document.getElementById("clearFiltersBtn");r&&(r.textContent=e),i&&(i.textContent=t);let p=Hr(),v=Yr();p&&v>0&&a?(a.textContent=v,a.classList.remove("hidden")):a&&a.classList.add("hidden"),p&&o?o.classList.remove("hidden"):o&&o.classList.add("hidden"),p&&s?s.classList.add("filtered"):s&&s.classList.remove("filtered")}function Hr(){return ie.accountName||ie.transactionsMin!==null||ie.transactionsMax!==null||ie.balanceMin!==null||ie.balanceMax!==null||ie.inclusion!=="all"}function Yr(){let e=0;return ie.accountName&&e++,(ie.transactionsMin!==null||ie.transactionsMax!==null)&&e++,(ie.balanceMin!==null||ie.balanceMax!==null)&&e++,ie.inclusion!=="all"&&e++,e}var Rn=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div id="reviewContent" class="w-full">

    <!-- Control Bar: one responsive row. On mobile the filter controls collapse
         into a single icon button that opens the filters popup; the count and
         "Clear filters" are desktop-only (mobile surfaces them via the popup
         and the badge on the filter button). -->
    <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-2xl mb-4 sm:mb-6
                border border-gray-200 shadow-sm">

      <!-- Search (primary; fills available width) -->
      <div class="relative flex-1 min-w-0">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input id="searchInput"
               type="text"
               placeholder="Search accounts..."
               aria-label="Search accounts by name"
               style="padding-left: 2.75rem !important;"
               class="block w-full pr-10 py-2 sm:py-3 text-sm sm:text-base cursor-text
                      border border-gray-300 rounded-lg placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-colors duration-200">
        <button id="searchClearBtn" type="button" aria-label="Clear search"
                class="hidden absolute inset-y-0 right-0 pr-3 flex items-center
                       text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 z-10">
          <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Account Count Summary (desktop only) -->
      <div id="filterResultsSummary" class="hidden lg:block text-sm text-gray-600 whitespace-nowrap">
        Showing <span id="visibleAccountCount" class="font-medium text-gray-900">0</span>
        of <span id="totalAccountCount" class="font-medium text-gray-900">0</span> accounts
      </div>

      <!-- Clear filters (desktop only; mobile uses the popup's Reset). Wrapper
           gates to lg so JS toggling .hidden on the button stays desktop-only. -->
      <div class="hidden lg:block flex-shrink-0">
        <button id="clearFiltersBtn"
                class="hidden px-3 py-2 sm:py-3 text-sm font-medium text-gray-500 hover:text-gray-800
                       hover:bg-gray-100 rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-400"
                title="Clear all filters"
                onclick="window.clearAllFilters && window.clearAllFilters()">
          Clear filters
        </button>
      </div>

      <!-- Filters trigger: icon-only on mobile, icon + label on desktop. Opens the popup. -->
      <button id="filtersBtn"
              class="relative flex-shrink-0 inline-flex items-center gap-2 px-2.5 py-2.5 sm:px-4 sm:py-3
                     text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                     whitespace-nowrap"
              title="Open filters"
              aria-label="Open filters"
              onclick="window.openFiltersModal && window.openFiltersModal()">
        <!-- Notification Badge -->
        <div id="filterNotificationBadge" class="hidden"></div>

        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
        </svg>
        <span class="hidden sm:inline">Filters</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      <!-- Mobile Card View (hidden on larger screens). No nested scroll on mobile \u2014
           the page scrolls as one, so the header is not sticky here. -->
      <div id="mobileView" class="block lg:hidden">
        <!-- Mobile Header with Master Checkbox + Sort -->
        <div class="border-b border-gray-200 bg-gray-50 p-4 space-y-3">
          <div class="flex items-center justify-between">
            <label class="custom-checkbox-container"
                   title="Select accounts to include or exclude several at once">
              <input type="checkbox"
                     id="masterCheckboxMobile"
                     class="custom-checkbox-input">
              <span class="custom-checkbox-visual"></span>
              <span class="text-sm font-medium text-gray-700 pl-2">Select all</span>
            </label>
            <div class="text-xs text-gray-500 font-medium" id="mobileSelectionCount">0 selected</div>
          </div>
          <div class="flex items-center gap-2">
            <label for="mobileSortSelect" class="text-xs font-medium text-gray-500 whitespace-nowrap">Sort by</label>
            <select id="mobileSortSelect" aria-label="Sort accounts"
                    class="flex-1 text-sm border border-gray-300 rounded-lg bg-white px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="default">Original order</option>
              <option value="name-asc">Name (A\u2013Z)</option>
              <option value="name-desc">Name (Z\u2013A)</option>
              <option value="balance-desc">Balance (high to low)</option>
              <option value="balance-asc">Balance (low to high)</option>
              <option value="transactions-desc">Transactions (most first)</option>
              <option value="transactions-asc">Transactions (fewest first)</option>
            </select>
          </div>
        </div>

        <div id="mobileAccountList" class="divide-y divide-gray-100">
          <!-- populated dynamically for mobile -->
        </div>
      </div>

      <!-- Desktop Table View (hidden on mobile) -->
      <div class="hidden lg:block overflow-auto max-h-[60vh]">
        <table class="w-full min-w-[800px]">
          <thead>
            <tr>
              <th class="sticky top-0 z-10 align-middle bg-gray-50 border-b border-gray-200 px-3 sm:px-4 py-3 text-center w-[50px] sm:w-[60px]">
                <input type="checkbox"
                       id="masterCheckbox"
                       title="Select accounts to include or exclude several at once"
                       class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer rounded border-gray-300
                              text-blue-600 focus:ring-blue-500 focus:ring-2">
              </th>
              <th scope="col" aria-sort="none" data-sort-key="name"
                  class="group sticky top-0 z-10 align-middle bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200 px-3 sm:px-4 py-3 text-left min-w-[200px]">
                <button type="button" aria-label="Sort by account name" class="sort-header cursor-pointer inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 group-hover:text-gray-700 focus-visible:text-gray-700 focus:outline-none">
                  Account Name
                  <span class="sort-indicator text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">\u2195</span>
                </button>
              </th>
              <th scope="col" aria-sort="none" data-sort-key="transactions"
                  class="group sticky top-0 z-10 align-middle bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200 px-3 sm:px-4 py-3 text-center min-w-[100px]">
                <button type="button" aria-label="Sort by transaction count" class="sort-header cursor-pointer inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 group-hover:text-gray-700 focus-visible:text-gray-700 focus:outline-none">
                  Transactions
                  <span class="sort-indicator text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">\u2195</span>
                </button>
              </th>
              <th scope="col" aria-sort="none" data-sort-key="balance"
                  class="group sticky top-0 z-10 align-middle bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200 px-3 sm:px-4 py-3 text-right min-w-[120px]">
                <button type="button" aria-label="Sort by balance" class="sort-header cursor-pointer inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500 group-hover:text-gray-700 focus-visible:text-gray-700 focus:outline-none">
                  Balance
                  <span class="sort-indicator text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">\u2195</span>
                </button>
              </th>
              <th scope="col"
                  class="sticky top-0 z-10 align-middle bg-gray-50 border-b border-gray-200 px-3 sm:px-4 py-3 text-center min-w-[100px] text-xs font-medium uppercase tracking-wide text-gray-500">
                Import
              </th>
            </tr>
          </thead>
          <tbody id="reviewTableBody" class="divide-y divide-gray-100">
            <!-- populated dynamically -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bulk Action Bar -->
    <div id="bulkActionBar"
         class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
      
      <!-- Mobile Bulk Actions (visible on mobile/tablet) -->
      <div class="block lg:hidden bg-white shadow-2xl rounded-xl border border-gray-200 w-[calc(100vw-2rem)] max-w-md mx-auto">
        <div class="p-4">
          <div class="flex flex-col gap-3">
            <!-- Selection Info -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">
                <span id="selectedCountMobile">0</span> selected
              </span>
              <button id="unselectAllBtnMobile"
                      class="text-xs font-medium px-3 py-1.5 border border-gray-300 text-gray-700 
                             bg-white rounded-md hover:bg-gray-50 cursor-pointer transition-colors 
                             duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Unselect all accounts">
                Clear
              </button>
            </div>
            
            <!-- Action Buttons Grid -->
            <div class="grid grid-cols-2 gap-2">
              <button id="bulkIncludeBtnMobile"
                      class="flex items-center justify-center gap-2 px-3 py-3 border border-green-300 
                             text-green-700 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer 
                             transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      title="Include selected accounts">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm font-medium">Include</span>
              </button>

              <button id="bulkExcludeBtnMobile"
                      class="flex items-center justify-center gap-2 px-3 py-3 border border-gray-300
                             text-gray-700 bg-white rounded-lg hover:bg-gray-50 cursor-pointer
                             transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      title="Exclude selected accounts">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="text-sm font-medium">Exclude</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Bulk Actions (visible on desktop) -->
      <div class="hidden lg:block bg-white shadow-2xl rounded-xl border border-gray-200">
        <div class="px-6 py-4">
          <div class="flex items-center gap-6">
            <!-- Selection Count -->
            <button id="unselectAllBtnDesktop"
                    class="text-sm font-medium px-4 py-2 border border-gray-300 
                           rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap transition-colors 
                           duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Unselect all accounts">
              <span id="selectedCountDesktop">0</span> selected
            </button>

            <!-- Separator -->
            <div class="h-6 border-l border-gray-300"></div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <button id="bulkIncludeBtnDesktop"
                      class="text-sm font-medium px-4 py-2 border border-green-300 
                             text-green-700 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer 
                             transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                      title="Include selected accounts">
                Include
              </button>

              <button id="bulkExcludeBtnDesktop"
                      class="text-sm font-medium px-4 py-2 border border-gray-300
                             text-gray-700 bg-white rounded-lg hover:bg-gray-50 cursor-pointer
                             transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      title="Exclude selected accounts">
                Exclude
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation will be added here by JavaScript -->

  </div>
</div>

<!-- Advanced Filters Modal -->
<div id="filtersModal" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 hidden p-3 sm:p-4">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col relative">
    
    <!-- Modal Header -->
    <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 rounded-t-lg">
      <h2 class="text-lg sm:text-xl font-bold text-gray-900">Advanced Filters</h2>
      <button id="filtersModalClose" 
              class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
              title="Close filters"
              onclick="window.closeFiltersModal && window.closeFiltersModal()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Modal Content - Scrollable -->
    <div class="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 min-h-0">

      <!-- Account Name Filter -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-gray-900">Account Name</h3>
        <div class="space-y-3">
          <input id="filterAccountName" 
                 type="text" 
                 placeholder="Enter account name..."
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input type="radio" name="nameMatchType" value="contains" checked 
                     class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
              <span class="ml-2 text-sm text-gray-700">Contains</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="nameMatchType" value="exact" 
                     class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
              <span class="ml-2 text-sm text-gray-700">Exact match</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" id="nameCaseSensitive" 
                     class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <span class="ml-2 text-sm text-gray-700">Case sensitive</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Transactions Count Filter -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-gray-900">Transaction Count</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-600 mb-1">Minimum</label>
            <input id="filterTransactionsMin" 
                   type="number" 
                   placeholder="0"
                   min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs text-gray-600 mb-1">Maximum</label>
            <input id="filterTransactionsMax" 
                   type="number" 
                   placeholder="999999"
                   min="0"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
      </div>

      <!-- Balance Filter -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-gray-900">Balance</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-600 mb-1">Minimum ($)</label>
            <input id="filterBalanceMin" 
                   type="number" 
                   placeholder="0.00"
                   step="0.01"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs text-gray-600 mb-1">Maximum ($)</label>
            <input id="filterBalanceMax" 
                   type="number" 
                   placeholder="999999.99"
                   step="0.01"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
      </div>

      <!-- Inclusion Status Filter -->
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-gray-900">Include Status</h3>
        <div class="flex flex-wrap gap-4">
          <label class="flex items-center">
            <input type="radio" name="inclusionFilter" value="all" checked 
                   class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
            <span class="ml-2 text-sm text-gray-700">All accounts</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="inclusionFilter" value="included" 
                   class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
            <span class="ml-2 text-sm text-gray-700">Included only</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="inclusionFilter" value="excluded" 
                   class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
            <span class="ml-2 text-sm text-gray-700">Excluded only</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Modal Footer - Fixed at bottom -->
    <div class="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg flex-shrink-0">
      <button id="filtersReset" 
              class="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 
                     cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onclick="window.resetFilters && window.resetFilters()">
        Reset Filters
      </button>
      <button id="filtersApply" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer 
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onclick="window.applyFilters && window.applyFilters()">
        Apply Filters
      </button>
    </div>
  </div>
</div>

<style>
  /* Filter results summary styling */
  #filterResultsSummary {
    transition: all 0.3s ease;
  }

  #filterResultsSummary.filtered {
    color: #1e40af;
    font-weight: 500;
  }

  /* Filter notification badge */
  #filtersBtn {
    position: relative;
  }

  #filterNotificationBadge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #dc2626;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    z-index: 10;
  }

  #filterNotificationBadge.hidden {
    display: none;
  }

  /* Clear filters button animation */
  #clearFiltersBtn {
    transition: all 0.3s ease;
    transform: scale(0.95);
    opacity: 0;
  }

  #clearFiltersBtn:not(.hidden) {
    transform: scale(1);
    opacity: 1;
  }

  /* Modal animation and layout */
  #filtersModal {
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  #filtersModal.show {
    opacity: 1;
  }

  #filtersModal.hide {
    opacity: 0;
  }

  /* Ensure proper modal sizing and scrolling */
  #filtersModal .max-w-2xl {
    min-height: 300px;
  }

  /* Improve mobile modal experience */
  @media (max-width: 640px) {
    #filtersModal .max-w-2xl {
      max-width: calc(100vw - 1.5rem);
      margin: 0.75rem;
    }
    
    #filtersModal .max-h-\\[90vh\\] {
      max-height: calc(100vh - 1.5rem);
    }

    /* Ensure footer buttons are properly sized on mobile */
    #filtersModal .flex-col.sm\\:flex-row button {
      min-height: 44px;
    }
  }

  /* Bulk action bar styling */
  #bulkActionBar {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  #bulkActionBar:not(.active) {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
  }

  #bulkActionBar.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }


  /* Mobile grid button sizing */
  @media (max-width: 1024px) {
    #bulkActionBar .grid button {
      min-height: 48px;
    }
  }

  /* Mobile card styles for accounts */
  .mobile-account-card {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .mobile-account-card:last-child {
    border-bottom: none;
  }

  .mobile-account-card .card-content {
    flex: 1;
    min-width: 0;
  }

  /* Custom checkbox styling */
  .custom-checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .custom-checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .custom-checkbox-visual {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: #ffffff;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-checkbox-visual::after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .custom-checkbox-input:checked + .custom-checkbox-visual {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  .custom-checkbox-input:checked + .custom-checkbox-visual::after {
    display: block;
  }

  .custom-checkbox-input:focus + .custom-checkbox-visual {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    outline: none;
  }

  .custom-checkbox-input:disabled + .custom-checkbox-visual {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
    cursor: not-allowed;
  }

  .custom-checkbox-container:hover .custom-checkbox-input:not(:disabled) + .custom-checkbox-visual {
    border-color: #3b82f6;
  }

  /* Mobile specific enhancements */
  @media (max-width: 1024px) {
    .custom-checkbox-visual {
      height: 24px;
      width: 24px;
      min-width: 24px;
      min-height: 24px;
    }

    .custom-checkbox-visual::after {
      left: 8px;
      top: 3px;
      width: 5px;
      height: 10px;
    }

    button, select {
      min-height: 44px;
      padding: 0.75rem;
    }
    
    .token-btn {
      min-height: 44px;
    }

    input[type="text"], input[type="number"] {
      min-height: 44px;
      padding: 0.75rem;
    }
  }
</style>
`;function Ot(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"How do you want to import?",subtitle:"There are two ways to move your accounts into Monarch. Pick whichever suits how you like to work.",backText:"Back to Review"}));let e=document.getElementById("manualImportBtn"),t=document.getElementById("autoImportBtn"),r=document.getElementById("backBtn"),i=Object.values(V.accounts).filter(s=>s.included).length;document.getElementById("manualFileCount").textContent=i,e.addEventListener("click",()=>ae("/customize")),t.addEventListener("click",()=>ae("/login")),r.addEventListener("click",()=>Ee())}var jn=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div class="w-full">

    <!-- Migration options -->
    <div role="group" aria-label="Import method" class="grid gap-4 sm:gap-5 lg:grid-cols-2">

      <!-- Auto Import (recommended) -->
      <button type="button" id="autoImportBtn"
        class="group flex flex-col text-left w-full rounded-2xl border border-green-300 bg-white p-5 sm:p-6
               shadow-sm hover:border-green-400 hover:bg-green-50/40 transition-colors
               focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex-shrink-0 w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900">Auto Import</h3>
          <span class="ml-auto flex-shrink-0 inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1">
            Recommended
          </span>
        </div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          We sign in to Monarch and bring your selected accounts across for you.
        </p>
        <span class="mt-auto pt-5 inline-flex items-center gap-1.5 text-green-700 font-semibold text-sm sm:text-base">
          Continue with Auto Import
          <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      <!-- Manual Import -->
      <button type="button" id="manualImportBtn"
        class="group flex flex-col text-left w-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6
               shadow-sm hover:border-blue-300 hover:bg-blue-50/40 transition-colors
               focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </span>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900">Manual Import</h3>
        </div>
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
          Download <span id="manualFileCount" class="font-semibold text-blue-600">0</span> CSV files and import them
          into Monarch yourself.
        </p>
        <span class="mt-auto pt-5 inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm sm:text-base">
          Continue with Manual Import
          <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>

    </div>

  </div>
</div>
`;var Pn=_t(At(),1);var Rt=["Date","Merchant","Category","Account","Original Statement","Notes","Amount","Tags"],Dn={date:0,merchant_name:1,category:2,data_provider_description:4,notes:5,amount:6,tags:7},Fn=[{key:"amount",label:"Amount",required:!0},{key:"date",label:"Date",required:!0},{key:"category",label:"Category",required:!1},{key:"data_provider_description",label:"Data Provider Description",required:!1},{key:"merchant_name",label:"Merchant Name",required:!1},{key:"notes",label:"Notes",required:!1},{key:"tags",label:"Tags",required:!1}];function dt(e,t){let r=Rt.map(s=>`"${s}"`).join(","),i=t.map(s=>`"${s.Date}","${s.Merchant}","${s.Category}","${e}","","${s.Notes}","${s.Amount}","${s.Tags}"`);return[r,...i].join(`
`)}function jt(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"You're ready to import",subtitle:`<span id="accountCount" class="font-semibold text-gray-900">0 accounts</span> prepared and formatted for Monarch. Two steps and you're done.`,backText:"Back to Customize"}));let e=document.getElementById("accountCount"),t=document.getElementById("downloadBtn"),r=document.getElementById("switchToAuto"),i=document.getElementById("backBtn");ce();let s=Object.values(V.accounts).filter(a=>a.included);e.textContent=`${s.length} account${s.length!==1?"s":""}`,t.addEventListener("click",async a=>{a.preventDefault();let o=new Pn.default,p=1e3;s.forEach(v=>{let x=v.modifiedName||v.name,y=x.replace(/[\\/:*?"<>|]/g,"_"),u=v.transactions,w=u.length;if(w<=p){let d=dt(x,u);o.file(`${y}.csv`,d)}else{let d=Math.ceil(w/p);for(let b=0;b<d;b++){let f=b*p,k=f+p,C=u.slice(f,k),B=dt(x,C);o.file(`${y}_part${b+1}.csv`,B)}}});try{let v=await o.generateAsync({type:"blob"}),x=document.createElement("a");x.href=URL.createObjectURL(v),x.download="accounts_export.zip",x.click()}catch(v){console.error("\u274C ZIP generation failed",v),alert("Failed to generate ZIP file.")}}),r.addEventListener("click",()=>{ae("/login")}),i.addEventListener("click",()=>{Ee()})}var $n=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div class="w-full">

    <!-- Instructions card -->
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-7">

      <!-- Step 1: Download -->
      <div>
        <div class="flex items-center gap-3 mb-3">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</span>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900">Download your files</h3>
        </div>
        <div class="sm:pl-11">
          <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            Download a ZIP containing one CSV per account, each formatted specifically for Monarch Money.
          </p>
          <button id="downloadBtn" type="button" class="ui-button inline-flex items-center btn-responsive"
                  data-type="primary" data-size="large">
            <svg aria-hidden="true" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5 5-5M12 4v12" />
            </svg>
            Download CSV bundle
          </button>
        </div>
      </div>

      <!-- Flow divider -->
      <div class="relative" aria-hidden="true">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
        <div class="relative flex justify-center">
          <div class="px-3 bg-white">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Step 2: Import into Monarch -->
      <div>
        <div class="flex items-center gap-3 mb-3">
          <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">2</span>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900">Import into Monarch</h3>
        </div>
        <div class="sm:pl-11">
          <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            Repeat these steps in Monarch for each CSV file:
          </p>

          <div class="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
            <ol class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">a</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Go to <strong class="text-gray-900">Accounts &rarr; Add account</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">b</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Choose <strong class="text-gray-900">Add manual account</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">c</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Select your desired <strong class="text-gray-900">account type</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">d</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Give it a name and a starting balance of <strong class="text-gray-900 bg-yellow-100 px-1 rounded">$0.00</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">e</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Go to <strong class="text-gray-900">Edit &rarr; Upload transactions</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">f</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Upload your account CSV file</div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-semibold">g</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed"><strong class="text-green-700">Enable</strong> <em>"Adjust account's balances based on these transactions"</em></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">h</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed">Click <strong class="text-gray-900">Add to account</strong></div>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">i</span>
                <div class="text-sm sm:text-base text-gray-700 leading-relaxed"><strong class="text-blue-600">Repeat for all your accounts</strong></div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Auto Import promotion -->
    <div class="mt-5 sm:mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6
                flex flex-col sm:flex-row sm:items-center gap-4">
      <span class="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-gray-900">Want us to do this automatically?</h3>
        <p class="text-gray-600 text-sm mt-0.5 leading-relaxed">
          Auto Import signs in to Monarch and brings every account across for you, securely.
        </p>
      </div>
      <button id="switchToAuto" type="button" class="ui-button btn-responsive w-full sm:w-auto flex-shrink-0"
              data-type="secondary" data-size="large">
        Try Auto Import
      </button>
    </div>

  </div>
</div>
`;var Gr="2025-06-02T06:26:29.704Z",Kr="tools/fetchMonarchAccountTypes.js",Jr=[{typeName:"depository",typeDisplay:"Cash",group:"asset",subtypes:[{name:"cd",display:"CD"},{name:"checking",display:"Checking"},{name:"savings",display:"Savings"},{name:"money_market",display:"Money Market"},{name:"paypal",display:"Mobile Payment System"},{name:"prepaid",display:"Prepaid"},{name:"cash_management",display:"Cash Management"}]},{typeName:"brokerage",typeDisplay:"Investments",group:"asset",subtypes:[{name:"st_401a",display:"401a"},{name:"st_401k",display:"401k"},{name:"st_403b",display:"403b"},{name:"st_457b",display:"457b"},{name:"st_529",display:"529 Plan"},{name:"brokerage",display:"Brokerage (Taxable)"},{name:"cash_isa",display:"Individual Savings Account (ISA) - Cash"},{name:"cryptocurrency",display:"Cryptocurrency"},{name:"education_savings_account",display:"Coverdell Education Savings Account (ESA)"},{name:"gic",display:"Guaranteed Investment Certificate (GIC)"},{name:"fixed_annuity",display:"Fixed Annuity"},{name:"health_reimbursement_arrangement",display:"Health Reimbursement Arrangement (HRA)"},{name:"health_savings_account",display:"Health Savings Account (HSA)"},{name:"iso",display:"Incentive Stock Options (ISO)"},{name:"ira",display:"Individual Retirement Account (IRA)"},{name:"isa",display:"Individual Savings Account (ISA) - Non-cash"},{name:"lif",display:"Life Income Fund (LIF) Retirement Account"},{name:"lira",display:"Locked-in Retirement Account (LIRA)"},{name:"lrif",display:"Locked-in Retirement Income Fund (LRIF)"},{name:"lrsp",display:"Locked-in Retirement Savings Plan (LRSP)"},{name:"keogh_plan",display:"Keogh Plan"},{name:"mutual_fund",display:"Mutual Fund"},{name:"nso",display:"Non-qualified Stock Options (NSO)"},{name:"non_taxable_brokerage_account",display:"Brokerage (Non-taxable)"},{name:"other",display:"Other"},{name:"prif",display:"Prescribed Registered Retirement Income Fund (PRIF)"},{name:"rdsp",display:"Registered Disability Savings Plan (RDSP)"},{name:"resp",display:"Registered Education Savings Plan (RESP)"},{name:"rlif",display:"Restricted Life Income Fund (RLIF)"},{name:"rrif",display:"Registered Retirement Income Fund (RRIF)"},{name:"pension",display:"Pension"},{name:"profit_sharing_plan",display:"Profit Sharing Plan"},{name:"qualifying_share_account",display:"Qualifying Share Account"},{name:"retirement",display:"Retirement"},{name:"roth",display:"Roth IRA"},{name:"roth_401k",display:"Roth 401k"},{name:"rrsp",display:"Registered Retirement Savings Plan (RRSP)"},{name:"sarsep_pension",display:"Salary Reduction Simplified Employee Pension Plan (SARSEP)"},{name:"sep_ira",display:"Simplified Employee Pension IRA (SEP IRA)"},{name:"simple_ira",display:"Simple IRA"},{name:"sipp",display:"Self-Invested Personal Pension (SIPP)"},{name:"stock_plan",display:"Stock Plan"},{name:"thrift_savings_plan",display:"Thrift Savings Plan (TSP)"},{name:"trust",display:"Trust"},{name:"tfsa",display:"Tax-Free Savings Account (TFSA)"},{name:"ugma",display:"Uniform Gift to Minors Act (UGMA)"},{name:"utma",display:"Uniform Transfers to Minors Act (UTMA)"},{name:"variable_annuity",display:"Variable Annuity"},{name:"fhsa",display:"First Home Savings Account (FHSA)"}]},{typeName:"real_estate",typeDisplay:"Real Estate",group:"asset",subtypes:[{name:"primary_home",display:"Primary Home"},{name:"secondary_home",display:"Secondary Home"},{name:"rental_property",display:"Rental Property"}]},{typeName:"vehicle",typeDisplay:"Vehicles",group:"asset",subtypes:[{name:"car",display:"Car"},{name:"boat",display:"Boat"},{name:"motorcycle",display:"Motorcycle"},{name:"snowmobile",display:"Snowmobile"},{name:"bicycle",display:"Bicycle"},{name:"other",display:"Other"}]},{typeName:"valuables",typeDisplay:"Valuables",group:"asset",subtypes:[{name:"art",display:"Art"},{name:"jewelry",display:"Jewelry"},{name:"collectibles",display:"Collectibles"},{name:"furniture",display:"Furniture"},{name:"other",display:"Other"}]},{typeName:"credit",typeDisplay:"Credit Cards",group:"liability",subtypes:[{name:"credit_card",display:"Credit Card"}]},{typeName:"loan",typeDisplay:"Loans",group:"liability",subtypes:[{name:"auto",display:"Auto"},{name:"business",display:"Business"},{name:"commercial",display:"Commercial"},{name:"construction",display:"Construction"},{name:"consumer",display:"Consumer"},{name:"home",display:"Home"},{name:"home_equity",display:"Home Equity"},{name:"loan",display:"Loan"},{name:"mortgage",display:"Mortgage"},{name:"overdraft",display:"Overdraft"},{name:"line_of_credit",display:"Line of Credit"},{name:"student",display:"Student"}]},{typeName:"other_asset",typeDisplay:"Other Assets",group:"asset",subtypes:[{name:"other",display:"Other"}]},{typeName:"other_liability",typeDisplay:"Other Liabilities",group:"liability",subtypes:[{name:"other",display:"Other"}]}],pt={generatedAt:Gr,generatedBy:Kr,data:Jr};function Un(e){return pt.data.find(t=>t.typeName===e)}function Ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Dt(e){let t="";return e.icon?t=`<span class="cdd-icon w-5 flex-shrink-0 text-center">${Ce(e.icon)}</span>`:e.swatch&&(t=`<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${Ce(e.swatch)}"></span>`),`${t}<span class="truncate">${Ce(e.label)}</span>`}function Xr(e,t){for(let r of e.groups||[])for(let i of r.options)if(i.value===t)return i;for(let r of e.actions||[])if(r.value===t)return{value:r.value,label:r.label};return t?{value:t,label:t}:null}function Oe(e){let t=Xr(e,e.value),r=t?Dt(t):`<span class="text-gray-400">${Ce(e.placeholder||"Select\u2026")}</span>`,i=(e.groups||[]).map(a=>`
    ${a.label?`<div class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 border-y border-gray-200">${Ce(a.label)}</div>`:""}
    ${a.options.map(o=>`
        <button type="button"
                class="cdd-option w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-gray-50 ${o.value===e.value?"bg-blue-50 text-blue-700 font-medium":"text-gray-800"}"
                data-value="${Ce(o.value)}"
                data-label="${Ce(o.label)}"
                data-icon="${Ce(o.icon||"")}"
                data-swatch="${Ce(o.swatch||"")}">
          ${Dt(o)}
        </button>
      `).join("")}
  `).join(""),s=(e.actions||[]).length?`
    <div class="cdd-actions sticky bottom-0 bg-white border-t border-gray-100">
      ${e.actions.map(a=>`
        <button type="button"
                class="cdd-option w-full text-left px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-medium"
                data-value="${Ce(a.value)}"
                data-label="${Ce(a.label)}"
                data-icon="">
          ${Ce(a.label)}
        </button>
      `).join("")}
    </div>
  `:"";return`
    <div class="cdd relative" data-key="${Ce(e.key)}">
      <button type="button" class="cdd-trigger w-full flex items-center justify-between gap-2 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition">
        <span class="cdd-label flex items-center gap-2 min-w-0">${r}</span>
        <svg class="cdd-chevron w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="cdd-panel hidden absolute left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto py-1">
        ${i}
        ${s}
      </div>
    </div>
  `}function qn(e){e.querySelectorAll(".cdd-panel:not(.hidden)").forEach(t=>{t.classList.add("hidden");let r=t.parentElement?.querySelector(".cdd-chevron");r&&r.classList.remove("rotate-180")})}var Hn=!1;function Fe(e,t){Hn||(document.addEventListener("click",()=>qn(document)),Hn=!0),e.querySelectorAll(".cdd").forEach(r=>{let i=r.querySelector(".cdd-trigger"),s=r.querySelector(".cdd-panel"),a=r.querySelector(".cdd-chevron");i.addEventListener("click",o=>{o.stopPropagation();let p=s.classList.contains("hidden");qn(document),p&&(s.classList.remove("hidden"),a?.classList.add("rotate-180"))}),s.querySelectorAll(".cdd-option").forEach(o=>{o.addEventListener("click",p=>{p.stopPropagation();let{value:v,label:x,icon:y,swatch:u}=o.dataset,w=i.querySelector(".cdd-label");w.innerHTML=Dt({value:v,label:x,icon:y,swatch:u}),s.classList.add("hidden"),a?.classList.remove("rotate-180"),t(r.dataset.key,v)})})})}function Ve(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var Qr="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z";function Ft(){return pt.data.map(e=>({value:e.typeName,label:e.typeDisplay}))}function rt(e){return(Un(e)?.subtypes||[]).map(r=>({value:r.name,label:r.display}))}function ft(e,{accounts:t,allowTypeSubtype:r=!1,cardHover:i=!0,onChange:s=()=>{}}){let a=new Set,o=()=>t.filter(f=>a.has(f.id));e.innerHTML=`
    <div id="aseToolbar"></div>
    <div id="aseList" class="space-y-2.5"></div>
    <div id="aseBulkBar"
         class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 translate-y-3 opacity-0 pointer-events-none transition-all duration-300 w-[calc(100vw-1.5rem)] sm:w-auto sm:max-w-2xl"></div>
  `;let p=e.querySelector("#aseToolbar"),v=e.querySelector("#aseList"),x=e.querySelector("#aseBulkBar");function y(){p.innerHTML=u(),v.innerHTML=t.map(d).join(""),b(),w()}function u(){let f=a.size;return`
      <div class="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 mb-4">
        <input type="checkbox" id="selectAll"
               class="h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer"
               ${f===t.length&&f>0?"checked":""}>
        <label for="selectAll" class="text-sm font-medium text-gray-700 cursor-pointer select-none">Select all</label>
        <span class="text-xs font-medium ${f?"text-blue-500":"text-gray-400"}">
          ${f?`${f} selected`:`${t.length} account${t.length!==1?"s":""}`}
        </span>
      </div>
    `}function w(){let f=a.size;if(!f){x.classList.add("opacity-0","translate-y-3","pointer-events-none"),x.classList.remove("opacity-100","translate-y-0"),x.innerHTML="";return}let k=r?'<button type="button" id="bulkType" class="ui-button" data-type="secondary" data-size="small">Set type</button>':"";x.innerHTML=`
      <div class="bg-white shadow-2xl rounded-xl border border-gray-200 px-3 py-3 sm:px-5 flex items-center gap-3 sm:gap-4">
        <button type="button" id="bulkClear"
                class="text-sm font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          ${f} selected
        </button>
        <div class="h-6 border-l border-gray-300 flex-shrink-0"></div>
        <div class="flex items-center gap-2 flex-wrap justify-end">
          <button type="button" id="bulkRename" class="ui-button" data-type="secondary" data-size="small">Rename</button>
          ${k}
        </div>
      </div>
    `,ce(),x.querySelector("#bulkClear").addEventListener("click",()=>{a.clear(),y()}),x.querySelector("#bulkRename").addEventListener("click",()=>ts(o(),()=>{s(),y()}));let C=x.querySelector("#bulkType");C&&C.addEventListener("click",()=>ns(o(),()=>{s(),y()})),x.classList.remove("opacity-0","translate-y-3","pointer-events-none"),x.classList.add("opacity-100","translate-y-0")}function d(f){let k=f.modifiedName||f.name||"Account",C=(f.transactions||[]).length,B=a.has(f.id),T=typeof f.balance=="number"?` \xB7 ${Ve(He.format(f.balance))}`:"",q=r?`
      <div class="flex flex-col sm:flex-row gap-2 sm:items-center flex-shrink-0 w-full sm:w-auto">
        <div class="w-full sm:w-40">
          ${Oe({key:`type:${f.id}`,value:f.type,placeholder:"Type",groups:[{options:Ft()}]})}
        </div>
        <div class="w-full sm:w-40">
          ${Oe({key:`subtype:${f.id}`,value:f.subtype||"",placeholder:"Subtype",groups:[{options:rt(f.type)}]})}
        </div>
      </div>
    `:"";return`
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${B?"border-blue-500/40 bg-blue-500/5 ring-1 ring-blue-500/15":`border-gray-200 bg-white${i?" hover:border-gray-300":""}`}">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <input type="checkbox" class="js-select h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer flex-shrink-0"
                 data-id="${Ve(f.id)}" ${B?"checked":""} aria-label="Select ${Ve(k)}">
          <div class="min-w-0">
            <button type="button" class="js-name-edit group inline-flex items-center gap-1.5 max-w-full min-w-0 text-left"
                    data-id="${Ve(f.id)}" title="Click to rename '${Ve(k)}'">
              <span class="js-name-text truncate font-semibold text-gray-900 border-b border-dashed border-gray-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors duration-150">${Ve(k)}</span>
              <svg class="w-3.5 h-3.5 flex-shrink-0 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-150" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="${Qr}" /></svg>
            </button>
            <div class="text-xs text-gray-500 mt-0.5">${C} transaction${C!==1?"s":""}${T}</div>
          </div>
        </div>
        ${q}
      </div>
    `}function b(){e.querySelectorAll(".js-select").forEach(k=>{k.addEventListener("change",()=>{k.checked?a.add(k.dataset.id):a.delete(k.dataset.id),y()})});let f=e.querySelector("#selectAll");if(f){let k=a.size;f.indeterminate=k>0&&k<t.length,f.addEventListener("change",()=>{a.clear(),f.checked&&t.forEach(C=>a.add(C.id)),y()})}e.querySelectorAll(".js-name-edit").forEach(k=>{k.addEventListener("click",()=>{let C=t.find(B=>String(B.id)===k.dataset.id);C&&es(C,()=>{s(),y()})})}),Fe(e,(k,C)=>{let[B,T]=[k.slice(0,k.indexOf(":")),k.slice(k.indexOf(":")+1)],q=t.find(A=>String(A.id)===T);!q||(B==="type"?(q.type=C,q.subtype=rt(C)[0]?.value||null,s(),y()):B==="subtype"&&(q.subtype=C||null,s()))})}y()}function Pt(e,{maxWidth:t="max-w-md",scroll:r=!0}={}){let i=document.createElement("div");i.className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4";let s=r?"max-h-[90vh] overflow-y-auto":"";i.innerHTML=`<div class="bg-white rounded-xl shadow-xl w-full ${t} p-5 sm:p-6 ${s}">${e}</div>`,document.body.appendChild(i),requestAnimationFrame(()=>i.classList.add("opacity-100"));let a=document.body.style.overflow;document.body.style.overflow="hidden";function o(){document.body.style.overflow=a,i.classList.remove("opacity-100"),i.classList.add("opacity-0"),setTimeout(()=>i.remove(),200)}return i.addEventListener("click",p=>{p.target===i&&o()}),i.addEventListener("keydown",p=>{p.key==="Escape"&&o()}),{overlay:i,box:i.firstElementChild,close:o}}function es(e,t){let{overlay:r,close:i}=Pt(`
    <h2 class="font-bold mb-3 text-lg">Edit account name</h2>
    <input type="text" aria-label="Account name input"
           class="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    <div class="flex justify-end gap-2">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-save ui-button" data-type="primary">Save</button>
    </div>
  `),s=r.querySelector("input");s.value=e.modifiedName||e.name||"";function a(){let o=s.value.trim();o&&(e.modifiedName=o),i(),t()}r.querySelector(".js-cancel").addEventListener("click",i),r.querySelector(".js-save").addEventListener("click",a),r.addEventListener("keydown",o=>{o.key==="Enter"&&a()}),ce(),s.focus(),s.select()}function Yn(e,t,r){let i=new Date().toISOString().split("T")[0],s=t.originalYnabName?.trim()||t.name||"Account";return e.replace(/{{YNAB}}/g,s).replace(/{{Index}}/g,r).replace(/{{Upper}}/g,s.toUpperCase()).replace(/{{Date}}/g,i)}function ts(e,t){let{overlay:r,close:i}=Pt(`
    <h2 class="text-lg sm:text-xl font-bold mb-1">Rename ${e.length} account${e.length!==1?"s":""}</h2>
    <p class="text-sm text-gray-500 mb-4">Build a name pattern using the tokens below.</p>

    <label for="renamePattern" class="font-medium text-sm">Pattern</label>
    <input id="renamePattern" type="text"
           class="border border-gray-300 rounded-lg w-full px-3 py-2 mt-1 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           placeholder="e.g. {{YNAB}} - {{Index}}">

    <div class="grid grid-cols-2 gap-2 mb-4">
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{YNAB}}">YNAB Name</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Index}}">Index</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Upper}}">Uppercase YNAB</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Date}}">Today (YYYY-MM-DD)</button>
    </div>

    <div class="flex items-center gap-3 mb-4">
      <label for="indexStart" class="text-sm">Index start</label>
      <input id="indexStart" type="number" value="1"
             class="border border-gray-300 rounded-lg px-3 py-2 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    </div>

    <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-4">
      <div class="font-medium text-sm mb-2">Preview</div>
      <div id="renamePreview" class="text-xs sm:text-sm text-gray-700 space-y-1 max-h-32 overflow-y-auto" aria-live="polite"></div>
    </div>

    <div class="flex justify-end gap-2">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-apply ui-button" data-type="primary">Apply</button>
    </div>
  `,{maxWidth:"max-w-lg"}),s=r.querySelector("#renamePattern"),a=r.querySelector("#indexStart"),o=r.querySelector("#renamePreview");function p(){o.innerHTML="";let v=s.value,x=parseInt(a.value,10)||1;if(e.slice(0,3).forEach((y,u)=>{let w=document.createElement("div");w.textContent=Yn(v,y,u+x),o.appendChild(w)}),e.length>3){let y=document.createElement("div");y.className="text-gray-400",y.textContent=`+ ${e.length-3} more\u2026`,o.appendChild(y)}}r.querySelectorAll(".token-btn").forEach(v=>{v.addEventListener("click",()=>{s.value+=v.dataset.token,p()})}),s.addEventListener("input",p),a.addEventListener("input",p),p(),r.querySelector(".js-cancel").addEventListener("click",i),r.querySelector(".js-apply").addEventListener("click",()=>{let v=s.value,x=parseInt(a.value,10)||1;e.forEach((y,u)=>{y.modifiedName=Yn(v,y,u+x)}),i(),t()}),ce(),s.focus()}function ns(e,t){let r=e[0]?.type||Ft()[0]?.value||null,i=rt(r)[0]?.value||null,{overlay:s,box:a,close:o}=Pt(`
    <h2 class="text-lg sm:text-xl font-bold mb-1">Set type for ${e.length} account${e.length!==1?"s":""}</h2>
    <p class="text-sm text-gray-500 mb-4">Applies the same Monarch type and subtype to every selected account.</p>
    <div class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <div id="bulkTypeSlot"></div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Subtype</label>
        <div id="bulkSubtypeSlot"></div>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-6">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-apply ui-button" data-type="primary">Apply</button>
    </div>
  `,{scroll:!1}),p=a.querySelector("#bulkTypeSlot"),v=a.querySelector("#bulkSubtypeSlot");function x(){p.innerHTML=Oe({key:"type",value:r,placeholder:"Type",groups:[{options:Ft()}]}),v.innerHTML=Oe({key:"subtype",value:i||"",placeholder:"Subtype",groups:[{options:rt(r)}]}),Fe(a,(y,u)=>{y==="type"?(r=u,i=rt(u)[0]?.value||null,x()):i=u||null})}x(),s.querySelector(".js-cancel").addEventListener("click",o),s.querySelector(".js-apply").addEventListener("click",()=>{e.forEach(y=>{y.type=r,y.subtype=i}),o(),t()}),ce()}function $t(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"Name your accounts",subtitle:"These names become your CSV file names. Rename any account before you download, one by one or all at once with a pattern.",backText:"Back to Method"}));let e=Object.values(V.accounts).filter(i=>i.included),t=document.getElementById("customizeContent"),r=document.getElementById("customizeNav");e.length===0?t.innerHTML=`
      <div class="text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg py-12 px-4">
        No accounts are selected to migrate. Go back and include at least one.
      </div>
    `:ft(t,{accounts:e,allowTypeSubtype:!1,onChange:ve}),r.innerHTML=qe({showBack:!1,showNext:!0,nextText:"Continue to download"}),ce(),document.getElementById("continueBtn").addEventListener("click",()=>ae("/manual")),document.getElementById("backBtn").addEventListener("click",()=>Ee())}var Wn=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div class="w-full">

    <!-- Editor (rendered by JS) -->
    <div id="customizeContent"></div>

    <!-- Navigation bar (Continue), injected by JS -->
    <div id="customizeNav"></div>

  </div>
</div>
`;var xe=[];for(let e=0;e<256;++e)xe.push((e+256).toString(16).slice(1));function Vn(e,t=0){return(xe[e[t+0]]+xe[e[t+1]]+xe[e[t+2]]+xe[e[t+3]]+"-"+xe[e[t+4]]+xe[e[t+5]]+"-"+xe[e[t+6]]+xe[e[t+7]]+"-"+xe[e[t+8]]+xe[e[t+9]]+"-"+xe[e[t+10]]+xe[e[t+11]]+xe[e[t+12]]+xe[e[t+13]]+xe[e[t+14]]+xe[e[t+15]]).toLowerCase()}var Ut,ss=new Uint8Array(16);function qt(){if(!Ut){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Ut=crypto.getRandomValues.bind(crypto)}return Ut(ss)}var as=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ht={randomUUID:as};function is(e,t,r){if(Ht.randomUUID&&!t&&!e)return Ht.randomUUID();e=e||{};let i=e.random??e.rng?.()??qt();if(i.length<16)throw new Error("Random bytes length must be >= 16");if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){if(r=r||0,r<0||r+16>t.length)throw new RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let s=0;s<16;++s)t[r+s]=i[s];return t}return Vn(i)}var ht=is;var os=["localhost","127.0.0.1","[::1]","::1"],Ze=os.includes(location.hostname)?"http://localhost:3000/dev/":"/.netlify/functions/",$e={login:Ze+"monarchLogin",fetchAccounts:Ze+"fetchMonarchAccounts",mappingOptions:Ze+"fetchMonarchMappingOptions",createAccounts:Ze+"createMonarchAccounts",generateStatements:Ze+"generateStatements",getUploadStatus:Ze+"getUploadStatus"};async function Ge(e,t){let r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),i=await r.json();if(!r.ok)throw new Error(i.error||i.message||"API error");return i}var Te={login:(e,t,r,i)=>Ge($e.login,{email:e,encryptedPassword:t,deviceUuid:r,otp:i}),fetchMonarchAccounts:e=>Ge($e.fetchAccounts,{token:e}),fetchMappingOptions:e=>Ge($e.mappingOptions,{token:e}),createAccounts:(e,t,r={})=>Ge($e.createAccounts,{token:e,accounts:t,accountMapping:r.accountMapping,columnMapping:r.columnMapping,categoryMapping:r.categoryMapping,tagMapping:r.tagMapping,priorityMapping:r.priorityMapping}),generateAccounts:e=>fetch($e.generateStatements,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accounts:e})}),queryUploadStatus:(e,t)=>Ge($e.getUploadStatus,{token:e,sessionKey:t})};var Be={EMAIL:"monarchEmail",ENCRYPTED_PASSWORD:"monarchPasswordBase64",TOKEN:"monarchApiToken",UUID:"monarchDeviceUuid",REMEMBER:"monarchRememberMe",TEMP_FOR_OTP:"monarchTempForOtp"};function Pe(){return{email:Ke(Be.EMAIL),encryptedPassword:Ke(Be.ENCRYPTED_PASSWORD),token:Ke(Be.TOKEN),uuid:Ke(Be.UUID),remember:Ke(Be.REMEMBER)==="true",tempForOtp:Ke(Be.TEMP_FOR_OTP)==="true"}}function Ue({email:e,encryptedPassword:t,token:r,uuid:i,remember:s,tempForOtp:a}){e&&Je(Be.EMAIL,e),t&&Je(Be.ENCRYPTED_PASSWORD,t),r&&Je(Be.TOKEN,r),i&&Je(Be.UUID,i),typeof s=="boolean"&&Je(Be.REMEMBER,s?"true":"false"),typeof a=="boolean"&&Je(Be.TEMP_FOR_OTP,a?"true":"false")}function st(){Object.values(Be).forEach(ls)}function Ke(e){return localStorage.getItem(e)}function Je(e,t){localStorage.setItem(e,t)}function ls(e){localStorage.removeItem(e)}var Zn="monarch-app-salt";var Yt="AES-GCM";var Gn="SHA-256";function us(...e){let t=e.reduce((s,a)=>s+a.length,0),r=new Uint8Array(t),i=0;for(let s of e)r.set(s,i),i+=s.length;return r}async function Jn(e,t){console.group("encryptPassword");try{let r=new TextEncoder,i=crypto.getRandomValues(new Uint8Array(12)),s=await crypto.subtle.importKey("raw",r.encode(e),{name:"PBKDF2"},!1,["deriveKey"]),a=await crypto.subtle.deriveKey({name:"PBKDF2",salt:r.encode(Zn),iterations:1e5,hash:Gn},s,{name:Yt,length:256},!0,["encrypt"]),o=r.encode(t),p=await crypto.subtle.encrypt({name:Yt,iv:i},a,o),v=new Uint8Array(p),x=v.slice(-16),y=v.slice(0,-16),u=us(i,y,x);return btoa(String.fromCharCode(...u))}catch(r){throw console.error("\u274C Error encrypting password:",r),console.groupEnd("encryptPassword"),new Error("Failed to encrypt password. Please try again.")}}function Xe(e,t){if(!e||typeof e!="object")throw new Error("Target must be an object");Object.entries(t).forEach(([r,i])=>{e[r]=i})}function Xn(e){if(!e||typeof e!="object")throw new Error("Target must be an object");Object.keys(e).forEach(t=>{let r=e[t];Array.isArray(r)?e[t]=[]:typeof r=="object"&&r!==null?e[t]={}:typeof r=="boolean"?e[t]=!1:e[t]=""})}async function Wt(){document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"Connect your Monarch account",subtitle:"Sign in to authorize the import. We bring your accounts and transactions across for you.",backText:"Back to Method"}));let e=B=>document.getElementById(B),t={emailInput:e("email"),passwordInput:e("password"),connectBtn:e("connectBtn"),backBtn:e("backBtn"),form:e("credentialsForm"),errorBox:e("errorBox"),errorContainer:e("credentialsError"),rememberCheckbox:e("rememberCredentials"),rememberMeContainer:e("rememberMe"),notYouContainer:e("notYouContainer"),rememberedEmail:e("rememberedEmail"),clearCredentialsBtn:e("clearCredentialsBtn"),toggleBtn:e("togglePassword"),eyeShow:e("eyeShow"),eyeHide:e("eyeHide"),securityNoteMsg:e("securityNote"),securityNoteIcon:e("securityNoteIcon")};ce();let{credentials:r}=V,{token:i,email:s,encryptedPassword:a,uuid:o,remember:p}=Pe();Xe(r,{email:s,encryptedPassword:a,apiToken:r.apiToken||i,deviceUuid:r.deviceUuid||o,remember:p}),(!r.deviceUuid||r.deviceUuid==="")&&(r.deviceUuid=ht(),Ue({uuid:r.deviceUuid})),s&&a?(t.emailInput.value=s,t.passwordInput.value="",t.rememberedEmail.textContent=`Signed in as ${s}`,t.rememberCheckbox.checked=r.remember,ke(t.emailInput,!0),ke(t.passwordInput,!0),we(t.rememberMeContainer,!1),we(t.notYouContainer,!0),we(t.toggleBtn,!1),x("signed-in")):(we(t.notYouContainer,!1),x());function v(){let B=t.emailInput.value.trim(),T=t.passwordInput.value.trim()||r.encryptedPassword;ke(t.connectBtn,!(B&&T)),we(t.errorContainer,!1),ce()}function x(B){let T={GREEN:"#006400",BLUE:"#1993e5",ORANGE:"#ff8c00"};switch(B){case"remembered":t.securityNoteMsg.textContent="Your credentials will be stored securely on this device.",t.securityNoteIcon.setAttribute("fill",T.ORANGE);break;case"signed-in":t.securityNoteMsg.textContent='You are signed in. To use different credentials, click "Not you?".',t.securityNoteIcon.setAttribute("fill",T.BLUE);break;default:t.securityNoteMsg.textContent="Your credentials will not be stored.",t.securityNoteIcon.setAttribute("fill",T.GREEN)}}function y(B){B.preventDefault(),t.connectBtn.click()}async function u(){let B=Pe(),T=t.emailInput.value.trim()||B.email,q=t.passwordInput.value.trim(),A=r.encryptedPassword||B.encryptedPassword,g=r.deviceUuid||B.uuid;if(!A&&q)try{A=await Jn(T,q)}catch{C("Failed to encrypt password.");return}ke(t.connectBtn,!0),t.connectBtn.textContent="Connecting\u2026",we(t.errorContainer,!1);try{let m=await Te.login(T,A,g);if(m?.otpRequired)return Ue({email:T,encryptedPassword:A,uuid:g,remember:r.remember,tempForOtp:!r.remember}),r.awaitingOtp=!0,ae("/otp");if(m?.token)return Xe(r,{email:T,encryptedPassword:A,otp:"",remember:t.rememberCheckbox.checked,apiToken:m.token,awaitingOtp:!1}),r.remember&&Ue({email:T,encryptedPassword:A,token:m.token,remember:!0}),ae("/mapping");let S=m?.detail||m?.error||"Unexpected login response.";throw new Error(S)}catch(m){C(m.message)}finally{ke(t.connectBtn,!1),t.connectBtn.textContent="Connect to Monarch"}}async function w(B){B.preventDefault(),await u()}function d(B){B.preventDefault(),st(),Xn(r),r.deviceUuid=ht(),Ue({uuid:r.deviceUuid}),t.emailInput.value="",t.passwordInput.value="",t.rememberCheckbox.checked=!1,ke(t.emailInput,!1),ke(t.passwordInput,!1),ke(t.connectBtn,!0),we(t.toggleBtn,!0),we(t.notYouContainer,!1),we(t.rememberMeContainer,!0),x(),ce(),t.emailInput.focus()}function b(){r.remember=t.rememberCheckbox.checked,x(r.remember?"remembered":"not-remembered"),(t.emailInput.value.trim()===""?t.emailInput:t.passwordInput.value.trim()===""?t.passwordInput:t.connectBtn).focus()}function f(){let B=t.passwordInput.type==="password";t.passwordInput.type=B?"text":"password",t.toggleBtn.setAttribute("aria-label",B?"Hide password":"Show password"),we(t.eyeShow,!B),we(t.eyeHide,B)}function k(){Ee()}function C(B){t.errorBox.textContent=B,we(t.errorContainer,!0)}t.form.addEventListener("submit",y),t.connectBtn.addEventListener("click",w),t.clearCredentialsBtn.addEventListener("click",d),t.rememberCheckbox.addEventListener("change",b),t.toggleBtn.addEventListener("click",f),t.backBtn.addEventListener("click",k),[t.emailInput,t.passwordInput].forEach(B=>{B.addEventListener("input",v),B.addEventListener("focus",()=>B.classList.add("ring-2","ring-blue-500","outline-none")),B.addEventListener("blur",()=>B.classList.remove("ring-2","ring-blue-500","outline-none"))}),v()}var Qn=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div class="w-full">

    <!-- Form card -->
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">

      <form id="credentialsForm" class="space-y-5">

        <!-- Email Field -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700 cursor-pointer" for="email">Email address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg aria-hidden="true" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input id="email" type="email"
                   class="block w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base
                          border border-gray-300 rounded-lg placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-colors duration-200"
                   placeholder="you@email.com" autocomplete="username" required>
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700 cursor-pointer" for="password">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg aria-hidden="true" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input id="password" type="password"
                   class="block w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base
                          border border-gray-300 rounded-lg placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-colors duration-200"
                   placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="current-password" required>

            <button type="button" id="togglePassword" aria-label="Show password"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer
                           text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <svg id="eyeShow" aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg id="eyeHide" aria-hidden="true" class="h-5 w-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.945-9.543-7a9.966 9.966 0 012.398-4.442M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1L17.9 17.9" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember Me Checkbox -->
        <div id="rememberMe" class="flex items-start gap-3">
          <div class="flex items-center h-5">
            <input id="rememberCredentials" type="checkbox"
                   class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2">
          </div>
          <label for="rememberCredentials" class="text-sm text-gray-700 cursor-pointer leading-relaxed">
            Remember me for this session
            <span class="block text-xs text-gray-500 mt-0.5">We securely store your credentials locally for convenience.</span>
          </label>
        </div>

        <!-- Not You? -->
        <div id="notYouContainer" class="text-sm text-gray-500 hidden">
          <span id="rememberedEmail">"some@thing.com"</span>
          <button type="button" id="clearCredentialsBtn" class="ml-2 text-blue-600 cursor-pointer hover:underline">Not you?</button>
        </div>

        <!-- Error Message -->
        <div id="credentialsError" role="alert" class="hidden bg-red-50 border border-red-200 rounded-lg p-3">
          <div class="flex items-start gap-2">
            <svg aria-hidden="true" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <p id="errorBox" class="text-sm text-red-800">Error message will appear here</p>
          </div>
        </div>

        <!-- Submit Button -->
        <button id="connectBtn" type="submit" class="ui-button w-full btn-responsive" data-type="primary" data-size="large">
          <span id="loginBtnText">Connect to Monarch</span>
        </button>
      </form>

      <!-- Security Note -->
      <div class="flex items-start gap-3 mt-5 sm:mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">
          <svg id="securityNoteIcon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" />
          </svg>
        </div>
        <p id="securityNote" class="text-xs sm:text-sm text-green-800 leading-relaxed">
          <strong>Secure connection:</strong> your credentials are sent with bank-level encryption and are never
          stored on our servers.
        </p>
      </div>

    </div>

  </div>
</div>

<style>
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear,
  input[type="password"]::-webkit-credentials-auto-fill-button,
  input[type="password"]::-webkit-inner-spin-button,
  input[type="password"]::-webkit-clear-button {
    display: none !important;
    appearance: none;
  }

  input[type="password"]::-webkit-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden;
  }
</style>
`;function Vt(){document.querySelector(".container-responsive").insertAdjacentHTML("afterbegin",_e({title:"Enter your verification code",subtitle:"Monarch emailed you a 6-digit code. Enter it below to finish connecting.",backText:"Back to Login"}));let e=d=>document.getElementById(d),t={otpInput:e("otpInput"),submitOtpBtn:e("submitOtpBtn"),otpError:e("otpError"),backBtn:e("backBtn")};ce();let{credentials:r}=V,i=Pe(),{email:s,encryptedPassword:a,uuid:o,remember:p,tempForOtp:v}=i;if(Xe(r,{email:r.email||s,encryptedPassword:r.encryptedPassword||a,deviceUuid:r.deviceUuid||o,remember:p}),!r.email||!r.encryptedPassword)return console.warn("Missing credentials for OTP flow, redirecting to login"),ae("/credentials");async function x(d){console.group("MonarchOtpView"),d.preventDefault(),we(t.otpError,!1),r.otp=t.otpInput.value;try{let b=await Te.login(r.email,r.encryptedPassword,r.deviceUuid,r.otp);if(b?.token)return Xe(r,{apiToken:b.token,awaitingOtp:!1}),r.remember?Ue({email:r.email,encryptedPassword:r.encryptedPassword,uuid:r.deviceUuid,token:b.token,remember:!0}):st(),console.groupEnd("MonarchOtpView"),ae("/mapping");throw new Error("Unknown login response.")}catch(b){we(t.otpError,!0),t.otpError.textContent="Invalid OTP. Please try again.",console.error("\u274C OTP verification error",b),console.groupEnd("MonarchOtpView")}}function y(){let d=Pe();d.tempForOtp&&!d.remember&&st(),Ee()}function u(){t.otpInput.value=t.otpInput.value.replace(/\D/g,"").slice(0,6),ke(t.submitOtpBtn,t.otpInput.value.length!==6),ce()}function w(d){d.key==="Enter"&&t.otpInput.value.length===6&&t.submitOtpBtn.click()}t.otpInput.addEventListener("input",u),t.otpInput.addEventListener("keydown",w),t.submitOtpBtn.addEventListener("click",x),t.backBtn.addEventListener("click",y),ke(t.submitOtpBtn,!0)}var er=`<div class="container-responsive py-4 sm:py-6 md:py-8">

  <!-- Full-width step header injected here by JS (createStepHeader) -->

  <div class="w-full">

    <!-- Verification card -->
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-5">

      <!-- OTP Input -->
      <div>
        <label for="otpInput" class="block text-sm font-medium text-gray-700 mb-1.5">6-digit code</label>
        <input id="otpInput" type="text" maxlength="6" pattern="[0-9]*" inputmode="numeric"
               class="w-full px-4 py-3.5 sm:py-4 text-center text-2xl sm:text-3xl tracking-[0.4em] font-mono
                      border border-gray-300 rounded-xl bg-gray-50
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white
                      transition-colors duration-200"
               placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="one-time-code">
        <p class="mt-1.5 text-xs text-gray-500">Enter the code Monarch emailed you.</p>
      </div>

      <!-- Error Message -->
      <div id="otpError" role="alert" class="hidden text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3"></div>

      <!-- Attempt warning -->
      <div class="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <svg aria-hidden="true" class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p class="text-xs sm:text-sm text-amber-800 leading-relaxed">
          <strong>Enter it carefully.</strong> Too many failed attempts can trigger Monarch's security system and
          lock your account for up to 24 hours.
        </p>
      </div>

      <!-- Submit Button -->
      <button id="submitOtpBtn" type="button" class="ui-button w-full btn-responsive" data-type="primary" data-size="large" disabled>
        <span id="submitOtpBtnText">Verify and start import</span>
      </button>
    </div>

    <!-- Security note -->
    <p class="mt-4 text-center text-xs text-gray-500">
      This code expires in 10 minutes and keeps your account secure.
    </p>

  </div>
</div>
`;function Le(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function hs(e){return e.icon?`<span class="w-5 flex-shrink-0 text-center">${Le(e.icon)}</span>`:e.swatch?`<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${Le(e.swatch)}"></span>`:""}function Zt({title:e,subtitle:t="",groups:r=[],actions:i=[],searchPlaceholder:s="Search\u2026",onSelect:a=()=>{}}){let o=document.createElement("div");o.className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4";let p=i.length?`
    <div class="border-t border-gray-100 p-2 flex-shrink-0">
      ${i.map(d=>`
        <button type="button" class="js-pick-action w-full text-left px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                data-value="${Le(d.value)}">${Le(d.label)}</button>
      `).join("")}
    </div>
  `:"";o.innerHTML=`
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col max-h-[80vh]">
      <div class="p-5 sm:p-6 pb-3 flex-shrink-0">
        <h2 class="text-lg sm:text-xl font-bold mb-1">${Le(e)}</h2>
        ${t?`<p class="text-sm text-gray-500 mb-3">${Le(t)}</p>`:""}
        <input type="text" id="pickerSearch" autocomplete="off"
               class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="${Le(s)}">
      </div>
      <div id="pickerList" class="px-2 pb-2 overflow-y-auto flex-1"></div>
      ${p}
    </div>
  `,document.body.appendChild(o),requestAnimationFrame(()=>o.classList.add("opacity-100"));let v=document.body.style.overflow;document.body.style.overflow="hidden";let x=o.querySelector("#pickerSearch"),y=o.querySelector("#pickerList");function u(){document.body.style.overflow=v,o.classList.remove("opacity-100"),o.classList.add("opacity-0"),setTimeout(()=>o.remove(),200)}o.querySelectorAll(".js-pick-action").forEach(d=>{d.addEventListener("click",()=>{u(),a(d.dataset.value)})});function w(d){let b=d.trim().toLowerCase(),f=r.map(k=>({label:k.label,options:k.options.filter(C=>!b||String(C.label).toLowerCase().includes(b))})).filter(k=>k.options.length>0);if(f.length===0){y.innerHTML='<div class="text-center text-sm text-gray-400 py-8">No matches</div>';return}y.innerHTML=f.map(k=>`
      ${k.label?`<div class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">${Le(k.label)}</div>`:""}
      ${k.options.map(C=>`
        <button type="button"
                class="js-pick w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg hover:bg-gray-50 text-gray-800"
                data-value="${Le(C.value)}">
          ${hs(C)}<span class="truncate">${Le(C.label)}</span>
        </button>
      `).join("")}
    `).join(""),y.querySelectorAll(".js-pick").forEach(k=>{k.addEventListener("click",()=>{u(),a(k.dataset.value)})})}x.addEventListener("input",()=>w(x.value)),o.addEventListener("click",d=>{d.target===o&&u()}),o.addEventListener("keydown",d=>{d.key==="Escape"&&u()}),w(""),x.focus()}function mt(e){return String(e??"").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu," ").replace(/\s+/g," ").trim()}function tr(e){let t=new Map;for(let r=0;r<e.length-1;r++){let i=e.slice(r,r+2);t.set(i,(t.get(i)||0)+1)}return t}function ms(e,t){if(e===t)return e.length?1:0;if(e.length<2||t.length<2)return 0;let r=tr(e),i=tr(t),s=0,a=0;return r.forEach(o=>{s+=o}),i.forEach(o=>{s+=o}),r.forEach((o,p)=>{a+=Math.min(o,i.get(p)||0)}),2*a/s}function Gt(e,t){let r=mt(e),i=mt(t);if(!r||!i)return 0;let s=ms(r,i);return r===i?s=1:(i.includes(r)||r.includes(i))&&(s=Math.max(s,.9)),s}function nr(e,t,{threshold:r=.6}={}){if(!mt(e))return null;let i=null;for(let s of t||[]){if(!mt(s.name))continue;let a=Gt(e,s.name);(!i||a>i.score)&&(i={...s,score:a})}return i&&i.score>=r?i:null}var Kt="add_expense_category",rr="add_income_category",gt="add_tag",Jt="ignore",bt="Uncategorized",Ne="__create_new__",Xt="statement_transactions",yt=[{value:"statement_transactions",title:"Prioritize CSV transactions",description:"Replace existing Monarch transactions that overlap the CSV's date range with the CSV data."},{value:"existing_transactions",title:"Prioritize Monarch transactions",description:"Only import CSV transactions older than your oldest existing Monarch transaction; ignore the rest."},{value:"all_transactions",title:"Import all transactions",description:"Import everything from the CSV without removing existing Monarch transactions (may create duplicates)."}];function Qt(e,t){let r=new Map;for(let i of e||[])for(let s of i.transactions||[]){let a=(s[t]??"").toString().trim();!a||r.set(a,(r.get(a)||0)+1)}return[...r.entries()].map(([i,s])=>({value:i,count:s})).sort((i,s)=>s.count-i.count||i.value.localeCompare(s.value))}function sr(e,t){return(e||[]).some(r=>(r.transactions||[]).some(i=>!(i[t]??"").toString().trim()))}function en(e){return new Map((e||[]).map(t=>[t.name.trim().toLowerCase(),t.name]))}function ar(e,t,r=bt){let i=e.trim().toLowerCase();return i==="uncategorized"?r:t.get(i)||Kt}function ir(e,t){return t.get(e.trim().toLowerCase())||gt}var gs=.45,xt=[{key:"accounts",label:"Accounts"},{key:"customize",label:"New accounts"},{key:"priority",label:"Priority"},{key:"categories",label:"Categories"},{key:"tags",label:"Tags"}],bs={Date:"Date",Merchant:"Merchant",Category:"Category",Notes:"Notes",Amount:"Amount",Tags:"Tags"};function ze(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function tn(){let e=V.credentials?.apiToken;if(!e)return ae("/login",!0);let t=Object.entries(V.accounts||{}).filter(([,c])=>c.included),r=t.map(([,c])=>c),i=new Map,s=new Map,a=new Map,o=new Map,p=new Map,v=0;Fn.forEach(c=>{let _=Dn[c.key];i.set(c.key,typeof _=="number"?_:"")});let x=[],y=[],u=[],w=[],d=new Map,b=new Map,f=bt,k=null,C=null,B=document.getElementById("mappingContent"),T=document.getElementById("mappingHeader"),q=document.getElementById("mappingStepper"),A=document.getElementById("mappingNav"),g=document.getElementById("mappingBulkBar");N();let[m,S]=await Promise.allSettled([Te.fetchMappingOptions(e),Te.fetchMonarchAccounts(e)]);m.status==="fulfilled"?(x=m.value.categoryGroups||[],y=m.value.tags||[]):(console.warn("Could not load Monarch categories/tags:",m.reason?.message),k=m.reason?.message||"Failed to load categories/tags"),S.status==="fulfilled"?u=S.value.accounts||[]:(console.warn("Could not load Monarch accounts:",S.reason?.message),C=S.reason?.message||"Failed to load accounts"),w=x.flatMap(c=>c.categories.map(_=>({..._,groupType:c.type}))),d=en(w),b=en(y),f=d.get("uncategorized")||bt,h();function R(c){let _=i.get(c);return typeof _!="number"?null:bs[Rt[_]]||null}function h(){l(),G();let c=xt[v].key;c==="accounts"?W():c==="customize"?le():c==="priority"?me():c==="categories"?de():he(),ce()}function N(){q.innerHTML="",F("Preparing your import","Loading your Monarch categories and tags\u2026"),B.innerHTML=`
      <div class="flex justify-center py-16">
        <div class="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    `,A.innerHTML=""}function l(){q.innerHTML=xt.map((c,_)=>{let O=_===v,U=_<v,L=U?"bg-green-500 text-white":O?"bg-blue-600 text-white":"bg-gray-200 text-gray-500",P=O?"text-gray-900 font-semibold":"text-gray-500";return`
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${L}">
            ${U?"\u2713":_+1}
          </span>
          <span class="text-xs sm:text-sm ${P} hidden sm:inline">${c.label}</span>
        </div>
        ${_<xt.length-1?'<div class="w-5 sm:w-10 h-px bg-gray-300"></div>':""}
      `}).join("")}function F(c,_){T.innerHTML=_e({title:c,subtitle:_,backText:"Back",titleId:"mappingTitle",subtitleId:"mappingSubtitle"}),k&&document.getElementById("mappingSubtitle")?.insertAdjacentHTML("afterend",`<p class="text-amber-600 text-xs sm:text-sm mt-1">Couldn't load your existing Monarch categories/tags, so items default to \u201Ccreate new\u201D. You can still adjust them below.</p>`),document.getElementById("backBtn").addEventListener("click",D)}function ne(c){return`<div class="text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg py-12 px-4">${ze(c)}</div>`}function $(c,_,O){return`<input type="checkbox" class="js-row-select h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer flex-shrink-0"
                   data-key="${ze(c)}" ${O?"checked":""} aria-label="Select ${ze(_)}">`}function Q({count:c,total:_,noun:O,nounPlural:U}){let L=_>0&&c===_,P=`${_} ${_===1?O:U||O+"s"}`;return`
      <div class="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 mb-4">
        <input type="checkbox" id="masterSelect" class="h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer" ${L?"checked":""}>
        <label for="masterSelect" class="text-sm font-medium text-gray-700 cursor-pointer select-none">Select all</label>
        <span class="text-xs font-medium ${c?"text-blue-500":"text-gray-400"}">
          ${c?`${c} selected`:P}
        </span>
      </div>
    `}function j(c,_,O,U){c.querySelectorAll(".js-row-select").forEach(P=>{P.addEventListener("change",()=>{P.checked?O.add(P.dataset.key):O.delete(P.dataset.key),U()})});let L=c.querySelector("#masterSelect");L&&(L.indeterminate=O.size>0&&O.size<_.length,L.addEventListener("change",()=>{O.clear(),L.checked&&_.forEach(P=>O.add(P)),U()}))}function G(){g.classList.add("opacity-0","translate-y-3","pointer-events-none"),g.classList.remove("opacity-100","translate-y-0"),g.innerHTML=""}function I({count:c,actions:_,onApply:O,onClear:U,showSetTo:L=!0}){if(!c){G();return}let P=_.map((K,Y)=>`<button type="button" data-bulk-idx="${Y}" class="ui-button" data-type="${K.type||"secondary"}" data-size="small">${ze(K.label)}</button>`).join("");g.innerHTML=`
      <div class="bg-white shadow-2xl rounded-xl border border-gray-200 px-3 py-3 sm:px-5 flex items-center gap-3 sm:gap-4 overflow-x-auto">
        <button type="button" id="bulkClearBtn"
                class="text-sm font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          ${c} selected
        </button>
        <div class="h-6 border-l border-gray-300 flex-shrink-0"></div>
        ${L?'<span class="text-sm text-gray-600 whitespace-nowrap flex-shrink-0 hidden sm:inline">Set to</span>':""}
        <div class="flex items-center gap-2 flex-nowrap justify-end flex-shrink-0">${P}</div>
      </div>
    `,ce(),g.querySelector("#bulkClearBtn").addEventListener("click",U),g.querySelectorAll("[data-bulk-idx]").forEach(K=>{K.addEventListener("click",()=>{let Y=_[Number(K.dataset.bulkIdx)];Y.onClick?Y.onClick():O(Y.value)})}),g.classList.remove("opacity-0","translate-y-3","pointer-events-none"),g.classList.add("opacity-100","translate-y-0")}function M(c,_,O,U){return`
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          ${$(c,c,U)}
          <div class="min-w-0">
            <div class="font-medium text-gray-900 truncate">${ze(c)}</div>
            <div class="text-xs text-gray-500">${_} transaction${_!==1?"s":""}</div>
          </div>
        </div>
        <div class="sm:w-80 flex-shrink-0">
          ${Oe(O)}
        </div>
      </div>
    `}function W(){F("Map your accounts","Import each account into an existing Monarch account, or create a new one.");let c=u.map(H=>({id:H.id,name:H.displayName}));if(t.forEach(([H,ee])=>{if(!s.has(H)){let J=nr(ee.name||H,c);s.set(H,J?J.id:Ne)}}),t.length===0){B.innerHTML=ne("No accounts selected to migrate."),n("Continue");return}let _=[{value:Ne,label:"Create as a new account"}],O=[{value:Ne,label:"Create as new",type:"secondary"}],U=new Set,L=[...t].sort(([H,ee],[J,ue])=>(ee.modifiedName||H).localeCompare(ue.modifiedName||J)),P=L.map(([H])=>H);Y(),n("Continue"),Z();function K(H,ee){if(!u.length)return[];let J=new Set;t.forEach(([Se])=>{if(Se===H)return;let ye=s.get(Se);ye&&ye!==Ne&&J.add(ye)});let ue=ee.name||H,be=[],pe=[],ge=[];u.forEach(Se=>{let ye={value:Se.id,label:Se.displayName};J.has(Se.id)?ge.push(ye):Gt(ue,Se.displayName)>=gs?be.push(ye):pe.push(ye)});let fe=(Se,ye)=>Se.label.localeCompare(ye.label);be.sort(fe),pe.sort(fe),ge.sort(fe);let Ae=[];return be.length&&Ae.push({label:"Suggested matches",options:be}),pe.length&&Ae.push({label:be.length?"Other accounts":"Your Monarch accounts",options:pe}),ge.length&&Ae.push({label:"Already mapped",options:ge}),Ae}function Y(){let H=X();B.innerHTML=`
        ${C?`<div class="rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm text-amber-800 mb-4">Couldn't load your existing Monarch accounts, so new accounts will be created. You can retry by going back and re-entering the mapping.</div>`:""}
        ${H.size?`<div class="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 mb-4 flex items-start gap-2">
          <span class="leading-none">\u26A0\uFE0F</span>
          <span>Each Monarch account should be used once. Resolve the highlighted duplicate${H.size!==1?"s":""} below to continue.</span>
        </div>`:""}
        ${Q({count:U.size,total:L.length,noun:"account"})}
        <div class="space-y-2">
          ${L.map(([ee,J])=>{let ue=(J.transactions||[]).length,be=J.modifiedName||ee,pe=s.get(ee),ge=pe&&pe!==Ne&&H.has(pe);return`
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${ge?"bg-amber-50 border border-amber-300 ring-1 ring-amber-200":"bg-white border border-gray-200"} rounded-lg p-3">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  ${$(ee,be,U.has(ee))}
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 truncate">${ze(be)}</div>
                    <div class="text-xs ${ge?"text-amber-700 font-medium":"text-gray-500"}">
                      ${ue} transaction${ue!==1?"s":""}
                    </div>
                  </div>
                </div>
                <div class="sm:w-80 flex-shrink-0">
                  ${Oe({key:ee,value:pe,groups:K(ee,J),actions:_})}
                </div>
              </div>
            `}).join("")}
        </div>
      `,j(B,P,U,Y),Fe(B,(ee,J)=>{s.set(ee,J),Y(),Z()}),I({count:U.size,actions:O,onApply:ee=>{U.forEach(J=>s.set(J,ee)),Y(),Z()},onClear:()=>{U.clear(),Y()}})}}function X(){let c=new Map;return t.forEach(([_])=>{let O=s.get(_);O&&O!==Ne&&c.set(O,(c.get(O)||0)+1)}),new Set([...c.entries()].filter(([,_])=>_>1).map(([_])=>_))}function Z(){let c=document.getElementById("continueBtn");c&&(c.disabled=X().size>0,ce())}function le(){let c=t.filter(([_])=>{let O=s.get(_);return!O||O===Ne});if(c.length===0){F("New account details","Nothing to set up here."),B.innerHTML=`
        <div class="rounded-lg bg-green-50 border border-green-100 p-4 flex items-start gap-3">
          <span class="text-2xl leading-none">\u2705</span>
          <div>
            <div class="font-semibold text-green-800">No new accounts to set up</div>
            <div class="text-sm text-green-700">Every selected account is importing into an existing Monarch account, so there's nothing to name or type here.</div>
          </div>
        </div>
      `,n("Continue");return}F("Set up your new accounts","Name each account being created in Monarch and choose its type and subtype."),ft(B,{accounts:c.map(([,_])=>_),allowTypeSubtype:!0,cardHover:!1,onChange:ve}),n("Continue")}function me(){let c=t.filter(([J])=>{let ue=s.get(J);return ue&&ue!==Ne});if(c.length===0){F("Import priority","Nothing to reconcile for this import."),B.innerHTML=`
        <div class="rounded-lg bg-green-50 border border-green-100 p-4 flex items-start gap-3">
          <span class="text-2xl leading-none">\u2705</span>
          <div>
            <div class="font-semibold text-green-800">No action required</div>
            <div class="text-sm text-green-700">All selected accounts are being created new and start empty, so there are no overlapping transactions to prioritize.</div>
          </div>
        </div>
      `,n("Continue");return}c.forEach(([J])=>{p.has(J)||p.set(J,Xt)});let _=new Map(u.map(J=>[J.id,J.displayName])),O=yt.map(J=>({value:J.value,label:J.title})),U=yt.map(J=>({value:J.value,label:J.title,type:"secondary"})),L=c.map(([J])=>J),P=new Set;F("Choose import priority","For each account importing into an existing Monarch account, choose how overlapping transactions are handled.");let K=document.createElement("button");K.type="button",K.className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:underline mt-2",K.innerHTML=`
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      How does import priority work?
    `,K.addEventListener("click",H),document.getElementById("mappingSubtitle")?.parentElement?.appendChild(K),B.innerHTML='<div id="priorityBody"></div>';let Y=B.querySelector("#priorityBody");ee(),n("Continue");function H(){let J=document.createElement("div");J.className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4",J.innerHTML=`
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100">
            <div class="min-w-0">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">How import priority works</h2>
              <p class="text-sm text-gray-500 mt-1">When your CSV overlaps transactions already in a Monarch account, this decides which version wins.</p>
            </div>
            <button class="js-close flex-shrink-0 text-gray-400 hover:text-gray-600 rounded-lg p-1 -mr-1 -mt-1" aria-label="Close">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-5 sm:p-6 space-y-3">
            ${yt.map((pe,ge)=>`
              <div class="flex items-start gap-3.5 rounded-xl border border-gray-200 p-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm font-bold">${ge+1}</span>
                <div class="min-w-0">
                  <div class="font-semibold text-gray-900">${ze(pe.title)}</div>
                  <div class="text-sm text-gray-600 mt-1 leading-relaxed">${ze(pe.description)}</div>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="flex justify-end p-5 sm:p-6 border-t border-gray-100">
            <button class="js-got-it ui-button" data-type="primary">Got it</button>
          </div>
        </div>
      `,document.body.appendChild(J),requestAnimationFrame(()=>J.classList.add("opacity-100"));function ue(){J.classList.remove("opacity-100"),J.classList.add("opacity-0"),setTimeout(()=>J.remove(),200)}let be=J.querySelector(".js-got-it");J.querySelector(".js-close").addEventListener("click",ue),be.addEventListener("click",ue),J.addEventListener("click",pe=>{pe.target===J&&ue()}),J.addEventListener("keydown",pe=>{pe.key==="Escape"&&ue()}),ce(),be.focus()}function ee(){Y.innerHTML=`
        ${Q({count:P.size,total:c.length,noun:"account"})}
        <div class="space-y-2.5">
          ${c.map(([J,ue])=>{let be=_.get(s.get(J))||"existing account",pe=ue.modifiedName||J,ge=P.has(J);return`
              <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${ge?"border-blue-500/40 bg-blue-500/5 ring-1 ring-blue-500/15":"border-gray-200 bg-white"}">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  ${$(J,pe,ge)}
                  <div class="min-w-0">
                    <div class="font-semibold text-gray-900 truncate">${ze(pe)}</div>
                    <div class="text-xs text-gray-500 truncate">\u2192 ${ze(be)}</div>
                  </div>
                </div>
                <div class="w-full sm:w-72 flex-shrink-0">
                  ${Oe({key:J,value:p.get(J),groups:[{options:O}]})}
                </div>
              </div>
            `}).join("")}
        </div>
      `,j(Y,L,P,ee),Fe(Y,(J,ue)=>{p.set(J,ue)}),I({count:P.size,actions:U,onApply:J=>{P.forEach(ue=>p.set(ue,J)),ee()},onClear:()=>{P.clear(),ee()}})}}function te(){return x.filter(c=>c.categories.length>0).map(c=>({label:c.name,options:c.categories.map(_=>({value:_.name,label:_.name,icon:_.icon}))}))}function re(){return[{value:Kt,label:"Add as a new expense category"},{value:rr,label:"Add as a new income category"}]}function oe(){return[{options:y.map(c=>({value:c.name,label:c.name,swatch:c.color}))}]}function se(){return[{value:gt,label:"Add as a new tag"},{value:Jt,label:"Ignore this tag"}]}function de(){F("Map your categories","Choose how each YNAB category should appear in Monarch. We\u2019ve pre-selected the closest match.");let c=R("category"),_=c?Qt(r,c):[];if(_.forEach(({value:H})=>{a.has(H)||a.set(H,ar(H,d,f))}),_.length===0){B.innerHTML=ne(c?"No categories found in that column. Nothing to map here.":"No category column selected, so category mapping is skipped."),n("Continue");return}let O=te(),U=re(),L=_.map(({value:H})=>H),P=new Set,K=[{label:"Set category",type:"secondary",onClick:()=>Zt({title:"Choose a category",subtitle:`Apply to ${P.size} selected ${P.size===1?"category":"categories"}`,groups:O,actions:U,searchPlaceholder:"Search categories\u2026",onSelect:H=>{P.forEach(ee=>a.set(ee,H)),Y()}})}];Y(),n("Continue");function Y(){B.innerHTML=`
        ${Q({count:P.size,total:_.length,noun:"category",nounPlural:"categories"})}
        <div class="space-y-2">
          ${_.map(({value:H,count:ee})=>M(H,ee,{key:H,value:a.get(H),groups:O,actions:U},P.has(H))).join("")}
        </div>
      `,j(B,L,P,Y),Fe(B,(H,ee)=>a.set(H,ee)),I({count:P.size,actions:K,showSetTo:!1,onApply:H=>{P.forEach(ee=>a.set(ee,H)),Y()},onClear:()=>{P.clear(),Y()}})}}function he(){F("Map your tags","YNAB flags become Monarch tags. Choose how each should be handled.");let c=R("tags"),_=c?Qt(r,c):[];if(_.forEach(({value:H})=>{o.has(H)||o.set(H,ir(H,b))}),_.length===0){B.innerHTML=ne(c?"No tags found in that column. Nothing to map here.":"No tags column selected, so tag mapping is skipped."),n("Start import");return}let O=oe(),U=se(),L=_.map(({value:H})=>H),P=new Set,K=[{label:"Set tag",type:"secondary",onClick:()=>Zt({title:"Choose a tag",subtitle:`Apply to ${P.size} selected ${P.size===1?"tag":"tags"}`,groups:O,searchPlaceholder:"Search tags\u2026",onSelect:H=>{P.forEach(ee=>o.set(ee,H)),Y()}})},{value:gt,label:"New tag",type:"secondary"},{value:Jt,label:"Ignore this tag",type:"secondary"}];Y(),n("Start import");function Y(){B.innerHTML=`
        ${Q({count:P.size,total:_.length,noun:"tag"})}
        <div class="space-y-2">
          ${_.map(({value:H,count:ee})=>M(H,ee,{key:H,value:o.get(H),groups:O,actions:U},P.has(H))).join("")}
        </div>
      `,j(B,L,P,Y),Fe(B,(H,ee)=>o.set(H,ee)),I({count:P.size,actions:K,onApply:H=>{P.forEach(ee=>o.set(ee,H)),Y()},onClear:()=>{P.clear(),Y()}})}}function n(c){A.innerHTML=qe({showBack:!1,showNext:!0,nextText:c}),ce(),document.getElementById("continueBtn").addEventListener("click",z)}function D(){v>0?(v--,h()):Ee()}function z(){v<xt.length-1?(v++,h(),window.scrollTo(0,0)):E()}function E(){let c={};i.forEach((L,P)=>{typeof L=="number"&&(c[P]=L)});let _=Object.fromEntries(a),O=R("category");O&&sr(r,O)&&_.uncategorized===void 0&&(_.uncategorized=f);let U={};t.forEach(([L])=>{let P=s.get(L);P&&P!==Ne&&(U[L]=p.get(L)||Xt)}),V.mappings={accountMapping:Object.fromEntries(s),columnMapping:c,categoryMapping:_,tagMapping:Object.fromEntries(o),priorityMapping:U},ve(),ae("/complete")}}var or=`<div class="container-responsive py-4 sm:py-6 md:py-8">
  <div class="w-full">

    <!-- Step indicator (sits above the reusable step header) -->
    <div id="mappingStepper" class="flex items-center justify-center gap-2 sm:gap-3 mb-6"></div>

    <!-- Reusable step header (back + title + subtitle), injected per step by JS -->
    <div id="mappingHeader"></div>

    <!-- Step content (rendered per step by JS) -->
    <div id="mappingContent"></div>

  </div>

  <!-- Navigation bar (Back / Continue), injected per step -->
  <div id="mappingNav"></div>

  <!-- Floating bulk action bar; shown when rows are selected on a step. -->
  <div id="mappingBulkBar"
       class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 translate-y-3 opacity-0 pointer-events-none transition-all duration-300 w-[calc(100vw-1.5rem)] sm:w-auto sm:max-w-2xl"></div>
</div>
`;var lr={failed:0,uploading:1,processing:1,pending:2,completed:3},nn=5;function rn(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xs(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}let e=document.getElementById("completeTitle"),t=document.getElementById("completeSubtitle"),r=document.getElementById("progressBar"),i=document.getElementById("progressLabel"),s=document.getElementById("progressPct"),a=document.getElementById("completeActions"),o=document.getElementById("accountList"),p=!1;Object.values(V.accounts).forEach(A=>{A.included&&A.status!=="completed"&&A.status!=="failed"&&(A.status="pending")}),y(),f(v().filter(([,A])=>A.status!=="completed").map(([A])=>A));function v(){return Object.entries(V.accounts).filter(([,A])=>A.included)}function x(){let A=v().map(([,g])=>g);return{total:A.length,completed:A.filter(g=>g.status==="completed").length,failed:A.filter(g=>g.status==="failed").length}}function y(){let A=x(),g=!p&&A.completed+A.failed===A.total;g&&A.failed>0?(e.textContent="Almost there",t.textContent=`${A.completed} of ${A.total} account${A.total!==1?"s":""} imported. ${A.failed} need${A.failed===1?"s":""} another try. Retry below.`):(e.textContent="Importing your accounts",t.textContent="Bringing your transactions and balances into Monarch. This can take a moment.");let m=A.total?Math.round(A.completed/A.total*100):0;r.style.width=`${m}%`,i.textContent=`${A.completed} of ${A.total} imported`,s.textContent=`${m}%`,a.innerHTML=g&&A.failed>0?`<button id="retryAll" class="ui-button" data-type="primary" data-size="large">Retry ${A.failed} failed account${A.failed!==1?"s":""}</button>`:"";let S=v().sort((h,N)=>(lr[h[1].status]??9)-(lr[N[1].status]??9));o.innerHTML=S.map(([h,N])=>u(h,N)).join("");let R=document.getElementById("retryAll");R&&R.addEventListener("click",C),o.querySelectorAll(".js-retry-one").forEach(h=>{h.addEventListener("click",()=>B(h.dataset.name))}),ce()}function u(A,g){let m=g.modifiedName||g.name||A,S=g.transactionCount??(g.transactions?.length||0),R=g.status==="failed",h,N,l=`<div class="text-xs text-gray-500 mt-0.5">${S.toLocaleString()} transaction${S!==1?"s":""}</div>`;switch(g.status){case"completed":h=w("bg-green-100",'<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>'),N=b("Imported","text-green-700 bg-green-50");break;case"failed":h=w("bg-red-100",'<svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>'),N=`<button class="js-retry-one ui-button" data-type="secondary" data-size="small" data-name="${rn(A)}" ${p?"disabled":""}>Retry</button>`,l=`<div class="text-xs text-red-600 mt-0.5 truncate">${rn(g.errorMessage||"Import failed")}</div>`;break;case"uploading":h=d(),N=b("Uploading\u2026","text-[#005B96] bg-[#005B96]/5");break;case"processing":h=d(),N=b("Creating\u2026","text-[#005B96] bg-[#005B96]/5");break;default:h=w("bg-gray-100",'<span class="w-2 h-2 rounded-full bg-gray-400"></span>'),N=b("Queued","text-gray-500 bg-gray-100")}return`
      <div class="flex items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${R?"border-red-200 bg-red-50/60":"border-gray-200 bg-white"}">
        <div class="flex-shrink-0">${h}</div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-gray-900 truncate">${rn(m)}</div>
          ${l}
        </div>
        <div class="flex-shrink-0">${N}</div>
      </div>
    `}function w(A,g){return`<span class="flex items-center justify-center w-7 h-7 rounded-full ${A}">${g}</span>`}function d(){return'<span class="block w-6 h-6 border-2 border-[#005B96]/30 border-t-[#005B96] rounded-full animate-spin"></span>'}function b(A,g){return`<span class="inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${g}">${A}</span>`}async function f(A){if(!A.length){k();return}let g=V.credentials.apiToken;if(!g){A.forEach(S=>{V.accounts[S]&&(V.accounts[S].status="failed",V.accounts[S].errorMessage="Authentication required. Please log in again.")}),y(),k();return}p=!0,y();let m=A.map(S=>({accountName:S,...V.accounts[S]})).filter(S=>S&&S.included);for(let S=0;S<m.length;S+=nn){let R=m.slice(S,S+nn);R.forEach(h=>{V.accounts[h.accountName]&&(V.accounts[h.accountName].status="processing")}),y(),await T(g,R),S+nn<m.length&&await new Promise(h=>setTimeout(h,1e3))}p=!1,y(),k()}function k(){if(p)return;let A=x();A.total>0&&A.completed===A.total&&setTimeout(()=>ae("/thank-you"),800)}function C(){if(p)return;let A=v().filter(([,g])=>g.status==="failed").map(([g])=>g);A.forEach(g=>{V.accounts[g].status="pending",delete V.accounts[g].errorMessage}),y(),f(A)}function B(A){p||!V.accounts[A]||(V.accounts[A].status="pending",delete V.accounts[A].errorMessage,y(),f([A]))}async function T(A,g){try{let m=await Te.createAccounts(A,g,V.mappings);if(m.success||m.failed){(m.failed||[]).forEach(R=>{let h=g.find(N=>N.name===R.name||N.modifiedName===R.name);h&&V.accounts[h.accountName]&&(V.accounts[h.accountName].status="failed",V.accounts[h.accountName].errorMessage=R.error||"Account creation failed")});let S=m.success||[];S.forEach(R=>{let h=g.find(N=>N.name===R.name||N.modifiedName===R.name);h&&V.accounts[h.accountName]&&(V.accounts[h.accountName].status="uploading",V.accounts[h.accountName].sessionKeys=R.sessionKeys||[])}),y(),await Promise.all(S.map(async R=>{let h=g.find(N=>N.name===R.name||N.modifiedName===R.name);if(h&&V.accounts[h.accountName]&&R.sessionKeys){try{await q(A,h.accountName,R.sessionKeys),V.accounts[h.accountName].status="completed"}catch(N){V.accounts[h.accountName].status="failed",V.accounts[h.accountName].errorMessage=N.message||"Transaction upload failed"}y()}})),g.forEach(R=>{V.accounts[R.accountName]&&V.accounts[R.accountName].status==="processing"&&(V.accounts[R.accountName].status="failed",V.accounts[R.accountName].errorMessage="Account not processed by server")})}else{let S=m.error||"Failed to create accounts in Monarch Money";g.forEach(R=>{V.accounts[R.accountName]&&(V.accounts[R.accountName].status="failed",V.accounts[R.accountName].errorMessage=S)})}}catch{g.forEach(S=>{V.accounts[S.accountName]&&(V.accounts[S.accountName].status="failed",V.accounts[S.accountName].errorMessage="Network error. Please check your connection and try again.")})}y()}async function q(A,g,m){await Promise.all(m.map(async S=>{let R=0,h=0,N=60,l=3;for(;R<N;){let F;try{F=await Te.queryUploadStatus(A,S)}catch(Q){if(h++,h>=l)throw new Error(`Couldn't verify upload status: ${Q.message}`);await new Promise(j=>setTimeout(j,5e3)),R++;continue}if(F?.errors?.length)throw new Error(F.errors.map(Q=>Q.message).join("; "));let ne=F?.data?.uploadStatementSession;if(!ne){if(h++,h>=l)throw new Error("Upload status unavailable from Monarch.");await new Promise(Q=>setTimeout(Q,5e3)),R++;continue}h=0;let $=ne.status;if($==="completed")return;if(["failed","error","errored"].includes($)){let Q=ne.errorMessage,j=Q&&Q!=="None"?Q:"Monarch could not process the uploaded transactions.";throw new Error(j)}await new Promise(Q=>setTimeout(Q,5e3)),R++}throw new Error(`Upload status check timed out for account ${g}`)}))}}var cr=xs;var dr=`<div class="container-responsive py-4 sm:py-6 md:py-8">
  <div class="w-full">

    <!-- Header -->
    <div class="text-center mb-6 sm:mb-8">
      <h2 id="completeTitle" class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight"></h2>
      <p id="completeSubtitle" class="text-gray-500 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-snug"></p>
    </div>

    <!-- Progress -->
    <div class="mb-6">
      <div class="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
        <span id="progressLabel"></span>
        <span id="progressPct"></span>
      </div>
      <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div id="progressBar" class="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" style="width:0%"></div>
      </div>
    </div>

    <!-- Retry actions (only when finished with failures) -->
    <div id="completeActions" class="mb-5 flex justify-center"></div>

    <!-- Account status list -->
    <div id="accountList" class="space-y-2.5"></div>

  </div>
</div>
`;function sn(){if(!V.accounts||Object.keys(V.accounts).length===0){ae("/upload",!0);return}let e=Object.values(V.accounts).filter(y=>y.included&&y.status==="completed"),t=e.length,r=e.reduce((y,u)=>y+(u.transactions?.length??u.transactionCount??0),0),i=null;e.forEach(y=>(y.transactions||[]).forEach(u=>{u.Date&&(!i||u.Date<i)&&(i=u.Date)}));let s=null;if(i){let y=Date.now()-new Date(i).getTime();s=Math.max(1,Math.round(y/(365.25*24*60*60*1e3)))}let a=V.mappings?.categoryMapping?Object.keys(V.mappings.categoryMapping).length:0,o=V.mappings?.tagMapping?Object.keys(V.mappings.tagMapping).length:0,p=[{value:t.toLocaleString(),label:`Account${t!==1?"s":""} migrated`},{value:r.toLocaleString(),label:`Transaction${r!==1?"s":""} imported`}];s&&p.push({value:`${s}`,label:`Year${s!==1?"s":""} of history`}),document.getElementById("statsGrid").innerHTML=p.map(y=>`
    <div class="w-36 sm:w-44 rounded-2xl border border-gray-200 bg-white shadow-sm p-5 text-center">
      <div class="text-3xl sm:text-4xl font-black text-[#005B96]">${y.value}</div>
      <div class="text-xs sm:text-sm text-gray-500 mt-1">${y.label}</div>
    </div>
  `).join("");let v=[];a&&v.push(`${a} categor${a!==1?"ies":"y"}`),o&&v.push(`${o} tag${o!==1?"s":""}`);let x=document.getElementById("statsExtra");x.textContent=v.length?`Plus ${v.join(" and ")} mapped, with transactions and balance history brought over in one pass.`:"Transactions and balance history, all brought over in one pass.",ce(),document.getElementById("startOverBtn").addEventListener("click",()=>{ur(),ae("/upload",!0)})}var pr=`<div class="w-full text-gray-900 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12">

  <!-- ===================== HERO + STATS ===================== -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#005B96]/5 via-white to-white pointer-events-none"></div>
    <div class="relative max-w-4xl mx-auto px-6 pt-16 pb-14 sm:pt-20 sm:pb-16 text-center">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Migration complete</p>
      <h1 class="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
        You're all set in Monarch
      </h1>
      <p class="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Your YNAB history is now living in Monarch Money. Here's everything this tool just moved over for you.
      </p>

      <div id="statsGrid" class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10"></div>
      <p id="statsExtra" class="text-sm text-gray-500 mt-5 max-w-xl mx-auto"></p>
    </div>
  </section>

  <!-- ===================== DONATE ===================== -->
  <section class="max-w-4xl mx-auto px-6 pb-4">
    <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 sm:p-10 text-center">
      <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mx-auto mb-4">\u2615</div>
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Found this useful?</h2>
      <p class="mt-3 text-gray-600 max-w-xl mx-auto">
        This tool is free and open source. If it saved you time, a small tip helps keep it running and improving.
        It's never required.
      </p>
      <div class="mt-6 flex justify-center">
        <!-- Same Buy Me a Coffee button as the header: BMC's server-rendered
             <img> (their button.prod.min.js is document.writeln-based and gets
             ad-blocked, so the static image is the reliable embed). -->
        <a href="https://buymeacoffee.com/fazekasdevh" target="_blank" rel="noopener noreferrer"
           class="block">
          <img src="https://img.buymeacoffee.com/button-api/?text=Support%20this%20tool&emoji=%E2%9D%A4%EF%B8%8F&slug=fazekasdevh&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
               alt="Support this tool on Buy Me a Coffee"
               width="253" height="50"
               class="h-8 sm:h-10 w-auto">
        </a>
      </div>
    </div>
  </section>

  <!-- ===================== CONTRIBUTE ===================== -->
  <section class="max-w-4xl mx-auto px-6 py-12 sm:py-16">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Get involved</p>
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Help shape what's next</h2>
      <p class="mt-3 text-gray-600">
        This tool is built in the open. Browse the code, open a pull request, or tell us what to build next.
      </p>
    </div>
    <div class="grid sm:grid-cols-2 gap-4">
      <a href="https://github.com/DFazekas/YnabToMonarch" target="_blank" rel="noopener noreferrer"
         class="block rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#005B96]/40 transition-colors">
        <div class="text-2xl mb-3">\u2605</div>
        <div class="font-semibold">View the source on GitHub</div>
        <p class="mt-1 text-sm text-gray-600">Browse every line, open issues, or send a pull request.</p>
      </a>
      <a href="https://github.com/Fazekas-Solutions/YnabToMonarch/issues" target="_blank" rel="noopener noreferrer"
         class="block w-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#005B96]/40 transition-colors">
        <div class="text-2xl mb-3">\u{1F4A1}</div>
        <div class="font-semibold">Request a feature</div>
        <p class="mt-1 text-sm text-gray-600">Have an idea that would make this better? Open an issue on GitHub.</p>
      </a>
    </div>
  </section>

  <!-- ===================== RESTART ===================== -->
  <section class="bg-[#005B96]">
    <div class="max-w-4xl mx-auto px-6 py-14 sm:py-16 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">Have more accounts to migrate?</h2>
      <p class="mt-3 text-white/80">Bring over another YNAB export in just a few minutes.</p>
      <div class="mt-7 flex justify-center">
        <button id="startOverBtn" class="ui-button" data-type="secondary" data-size="large">Migrate more accounts</button>
      </div>
    </div>
  </section>

</div>
`;var fr="ynab_oauth_expected_state";function hr(){try{return window.sessionStorage}catch(e){return console.warn("Session storage unavailable:",e),null}}function ks(){let e=hr();return e?e.getItem(fr):null}function _s(){let e=hr();!e||e.removeItem(fr)}function mr(){return ks()}function gr(){return _s()}async function an(){ce();let e=document.querySelector("[data-ynab-oauth-message]"),t=document.querySelector("[data-ynab-oauth-subtext]"),r=document.querySelector("[data-ynab-oauth-badge]"),i=document.querySelector("[data-ynab-oauth-callout]"),s=document.querySelector("[data-ynab-oauth-hero-icon]"),a=document.querySelector("[data-ynab-oauth-continue]"),o=document.querySelector("[data-ynab-oauth-code]"),p=document.querySelector("[data-ynab-oauth-copy]"),v=document.querySelector("[data-ynab-oauth-copy-status]"),x={request:document.querySelector('[data-ynab-oauth-step="request"]'),approval:document.querySelector('[data-ynab-oauth-step="approval"]'),storage:document.querySelector('[data-ynab-oauth-step="storage"]')},y=new URLSearchParams(window.location.search),u=y.get("code"),w=y.get("state"),d=y.get("error"),b=y.get("error_description"),f=mr(),k=f&&w&&f!==w;gr();let C=null,B={pending:{heroText:"Receiving the authorization code\u2026",subtext:"Hang tight while we confirm the details sent back from YNAB.",callout:"We are securely capturing the authorization code so you can continue without retyping credentials.",badgeText:"Pending",badgeType:"progress",icon:"pending"},success:{heroText:"Authorization captured",subtext:"Return to the app and keep migrating without entering credentials again.",callout:"The code was stored in sessionStorage and the SPA will pick it up automatically.",badgeText:"Complete",badgeType:"success",icon:"success"},cached:{heroText:"Authorization ready",subtext:"Looks like we already have a valid code from a previous attempt.",callout:"SessionStorage still contains your authorization code so you can continue where you left off.",badgeText:"Ready",badgeType:"success",icon:"success"}},T={neutral:["bg-gray-100","text-gray-600"],progress:["bg-blue-100","text-blue-700"],success:["bg-green-100","text-green-600"],error:["bg-red-50","text-red-600"]},q={pending:["bg-blue-50","text-blue-600"],success:["bg-green-50","text-green-600"],error:["bg-red-50","text-red-600"]},A={pending:'<svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-width="3" stroke-opacity="0.25"></circle><path stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M22 12a10 10 0 00-10-10"></path></svg>',success:'<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>',error:'<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" /><circle cx="12" cy="12" r="9" /></svg>'};function g(G,I){if(!r)return;r.textContent=I,r.className="rounded-full px-3 py-1 text-xs font-semibold";let M=T[G]||T.neutral;r.classList.add(...M)}function m(G){!s||(s.className="flex items-center justify-center w-12 h-12 rounded-2xl",s.classList.add(...q[G]||q.pending),s.innerHTML=A[G]||A.pending)}function S(G){e&&(e.textContent=G.heroText),t&&(t.textContent=G.subtext),i&&(i.textContent=G.callout),g(G.badgeType,G.badgeText),m(G.icon)}let R=["border-blue-300","ring-2","ring-blue-100","border-green-200","bg-green-50","text-green-600","border-red-200","bg-red-50","text-red-600"];function h(G,I){let M=x[G];if(!M)return;let W=M.querySelector("[data-ynab-oauth-step-indicator]");switch(M.classList.remove(...R),W&&(W.textContent=W.dataset.stepIndex||W.textContent),I){case"done":M.classList.add("border-green-200","bg-green-50","text-green-600"),W&&(W.textContent="\u2714");break;case"active":M.classList.add("border-blue-300","ring-2","ring-blue-100");break;case"error":M.classList.add("border-red-200","bg-red-50","text-red-600"),W&&(W.textContent="\u26A0");break;default:break}}function N(G,I=""){let M=I||"";sessionStorage.setItem("ynab_oauth_code",G),sessionStorage.setItem("ynab_oauth_state",M),V.ynabOauth={code:G,state:M,error:null}}function l(G){o&&(o.value=G||""),p&&(p.disabled=!G,ce()),v&&v.classList.add("hidden")}function F(G){!v||(v.textContent=G,v.classList.remove("hidden"),C&&clearTimeout(C),C=window.setTimeout(()=>{v.classList.add("hidden")},2500))}function ne(G,I=""){N(G,I),S(B.success),h("approval","done"),h("storage","done"),l(G)}function $(G,I=""){N(G,I),S(B.cached),h("approval","done"),h("storage","done"),l(G)}function Q(G,I){let M=G||"code_missing",W=`Redirect error: ${M}`,X=I?`YNAB response: ${I}`:"We did not receive an authorization code. Please try again from YNAB.",Z={heroText:W,subtext:"Close this tab, start the authorization again, or open YNAB to retry.",callout:X,badgeText:"Error",badgeType:"error",icon:"error"};e&&(e.textContent=Z.heroText),t&&(t.textContent=Z.subtext),i&&(i.textContent=Z.callout),g(Z.badgeType,Z.badgeText),m(Z.icon),l(""),V.ynabOauth={code:null,state:null,error:I||M},h("approval","error"),h("storage","idle")}function j(G){if(G.preventDefault(),!o||!o.value)return;let I=navigator.clipboard;I?.writeText?I.writeText(o.value).then(()=>{F("Copied!")}).catch(()=>{o.select(),F("Select + copy manually")}):(o.select(),F("Select + copy manually"))}if(S(B.pending),h("request","done"),h("approval","active"),h("storage","active"),k){Q("state_mismatch","The authorization state returned from YNAB did not match the request. Please try again.");return}if(u)ne(u,w);else if(d)Q(d,b);else{let G=sessionStorage.getItem("ynab_oauth_code"),I=sessionStorage.getItem("ynab_oauth_state");G?$(G,I):V.ynabOauth={code:null,state:null,error:null}}a&&a.addEventListener("click",G=>{G.preventDefault(),ae("/upload",!0)}),p&&p.addEventListener("click",j)}var br=`<div class="container-responsive flex flex-col items-center justify-center space-y-6 py-8 sm:py-10 lg:py-14 min-h-[calc(100vh-220px)]">
  <section class="w-full max-w-4xl space-y-6">
    <header class="bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-transparent rounded-3xl shadow-2xl p-6 sm:p-8">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 text-blue-600" data-ynab-oauth-icon>
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
          </svg>
        </div>
        <div class="flex-1 space-y-2">
          <p class="text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold">Authorization flow</p>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Finish connecting YNAB</h1>
          <p class="text-sm sm:text-base text-gray-600 leading-relaxed">We returned here immediately after you granted access inside YNAB. This page safely captures the authorization code so the app can continue.</p>
        </div>
        <span class="text-xs font-semibold px-3 py-1 rounded-full bg-white/70 text-blue-700 border border-blue-100">Secure</span>
      </div>
    </header>

    <article class="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600" data-ynab-oauth-hero-icon>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-3.866 0-7 1.79-7 4v1h14v-1c0-2.21-3.134-4-7-4z" />
            </svg>
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Callback status</p>
            <p class="text-lg font-bold text-gray-900 leading-tight" data-ynab-oauth-message>Receiving the authorization code\u2026</p>
            <p class="text-sm text-gray-500 leading-relaxed" data-ynab-oauth-subtext aria-live="polite">Hang tight while we confirm the details sent back from YNAB.</p>
          </div>
        </div>
        <span class="rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600" data-ynab-oauth-badge>Pending</span>
      </div>

      <div class="rounded-2xl border border-dashed border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-800" data-ynab-oauth-callout>
        We are securely capturing the authorization code so you can continue the import without typing credentials again.
      </div>

      <div class="flex flex-wrap gap-3" aria-live="polite">
        <button class="ui-button btn-responsive" data-type="primary" data-size="large" data-ynab-oauth-continue>
          Return to the app
        </button>
        <a class="ui-button" data-type="text" data-size="medium" data-ynab-oauth-open href="https://app.youneedabudget.com" target="_blank" rel="noopener noreferrer">
          Open YNAB in a new tab
        </a>
      </div>

      <div class="space-y-2" aria-live="polite">
        <label for="ynabOauthCode" class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Authorization code</label>
        <div class="flex gap-3">
          <input id="ynabOauthCode" class="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700" type="text" value="" readonly placeholder="Awaiting code" data-ynab-oauth-code>
          <button class="ui-button" data-type="secondary" data-size="small" data-ynab-oauth-copy disabled>
            Copy code
          </button>
          <span class="text-xs font-semibold text-green-600 hidden" data-ynab-oauth-copy-status>Copied!</span>
        </div>
      </div>
    </article>

    <div class="grid gap-4 sm:grid-cols-3">
      <article class="border border-gray-200 rounded-3xl bg-white p-4 space-y-2" data-ynab-oauth-step="request">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600" data-ynab-oauth-step-indicator data-step-index="1">1</span>
          <h3 class="text-sm font-semibold text-gray-900">Request issued</h3>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed">You clicked continue inside YNAB to begin the OAuth handshake.</p>
      </article>
      <article class="border border-gray-200 rounded-3xl bg-white p-4 space-y-2" data-ynab-oauth-step="approval">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600" data-ynab-oauth-step-indicator data-step-index="2">2</span>
          <h3 class="text-sm font-semibold text-gray-900">Authorization granted</h3>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed">YNAB verified your identity and confirmed we can access your budget.</p>
      </article>
      <article class="border border-gray-200 rounded-3xl bg-white p-4 space-y-2" data-ynab-oauth-step="storage">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600" data-ynab-oauth-step-indicator data-step-index="3">3</span>
          <h3 class="text-sm font-semibold text-gray-900">Code captured</h3>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed">We store the code in sessionStorage so the SPA can finalize the login flow.</p>
      </article>
    </div>
  </section>
</div>
`;function on(){document.querySelectorAll(".js-start").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),ae("/upload")})}),document.querySelectorAll(".js-back-home").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),ae("/")})}),ce()}var yr=`<div class="w-full text-gray-900 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12">

  <!-- ============================ HERO ============================ -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#005B96]/5 via-white to-white pointer-events-none"></div>
    <div class="relative max-w-3xl mx-auto px-6 pt-44 pb-12 sm:pt-40 text-center">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#005B96] mb-3">Guide</p>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
        Turn a manual account into a synced one
      </h1>
      <p class="mt-5 text-base sm:text-lg text-gray-600">
        Keep your full YNAB history <span class="font-semibold">and</span> get a live bank connection, by
        combining this tool with Monarch's built-in Transfer feature.
      </p>
    </div>
  </section>

  <!-- ===================== WHY ===================== -->
  <section class="max-w-3xl mx-auto px-6 pb-4">
    <div class="rounded-2xl bg-[#005B96]/5 ring-1 ring-[#005B96]/15 p-5 sm:p-6 text-sm sm:text-base text-gray-700">
      <p>
        <span class="font-semibold text-gray-900">First, the why.</span> In Monarch, a
        <span class="font-semibold">synced account</span> is connected to your bank and updates automatically. A
        <span class="font-semibold">manual account</span> is one you maintain yourself. Bank connections can only be
        created from inside Monarch, so this tool imports your YNAB history into a <span class="font-semibold">manual</span>
        account. The good news: Monarch lets you move that history into a synced account afterwards.
      </p>
    </div>
  </section>

  <!-- ===================== STEPS ===================== -->
  <section class="max-w-3xl mx-auto px-6 py-12 sm:py-16">
    <div class="space-y-5">

      <!-- Step 1 -->
      <div class="flex gap-4 sm:gap-5 rounded-2xl bg-white border border-gray-200 p-5 sm:p-6">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center">
          1</div>
        <div>
          <h2 class="text-lg sm:text-xl font-semibold tracking-tight">Import your YNAB history with this tool</h2>
          <p class="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
            Run the migration as usual. Every account, transaction, and balance from YNAB lands in Monarch as a
            <span class="font-semibold">manual</span> account, your complete history, all at once.
          </p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex gap-4 sm:gap-5 rounded-2xl bg-white border border-gray-200 p-5 sm:p-6">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center">
          2</div>
        <div>
          <h2 class="text-lg sm:text-xl font-semibold tracking-tight">Connect your bank in Monarch</h2>
          <p class="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
            In Monarch, add the same account as a bank connection. This creates a <span class="font-semibold">synced</span>
            account that updates on its own, but it usually only pulls in recent transactions, not your full history.
          </p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="flex gap-4 sm:gap-5 rounded-2xl bg-white border border-gray-200 p-5 sm:p-6">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[#005B96] text-white font-bold flex items-center justify-center">
          3</div>
        <div>
          <h2 class="text-lg sm:text-xl font-semibold tracking-tight">Transfer the history into the synced account</h2>
          <p class="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
            Use Monarch's <span class="font-semibold">Transfer</span> tool to move the balance and transaction history
            from the manual account this tool created into your new synced account. You end up with one connected account
            that holds everything: your full YNAB past and live updates going forward.
          </p>
          <a href="https://help.monarch.com/hc/en-us/articles/14329385694484-Transfer-Balance-and-or-Transaction-History-to-Another-Account"
            target="_blank" rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#005B96] hover:underline">
            Monarch's Transfer guide
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

    </div>

    <div class="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-5 text-sm text-gray-500">
      Once the transfer is complete and you've confirmed everything looks right, you can delete the leftover manual
      account in Monarch.
    </div>

    <!-- ===================== CTA / BACK ===================== -->
    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
      <button class="js-start ui-button" data-type="primary" data-size="large">Start migrating, it's free</button>
      <button class="js-back-home ui-button" data-type="secondary" data-size="large">Back to home</button>
    </div>
  </section>

</div>
`;var wt={"/":{template:fn,init:Et,scroll:!1,title:"Home - YNAB to Monarch",requiresAuth:!1},"/upload":{template:wn,init:Mt,scroll:!1,title:"Upload - YNAB to Monarch",requiresAuth:!1},"/review":{template:Rn,init:Tt,scroll:!0,title:"Review Accounts - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/method":{template:jn,init:Ot,scroll:!1,title:"Select Method - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/customize":{template:Wn,init:$t,scroll:!0,title:"Name Your Accounts - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/manual":{template:$n,init:jt,scroll:!0,title:"Manual Import - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/login":{template:Qn,init:Wt,scroll:!1,title:"Login to Monarch - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/otp":{template:er,init:Vt,scroll:!1,title:"Enter OTP - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/mapping":{template:or,init:tn,scroll:!0,title:"Map Categories & Tags - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/complete":{template:dr,init:cr,scroll:!0,title:"Migration Complete - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/thank-you":{template:pr,init:sn,scroll:!0,title:"Thank You - YNAB to Monarch",requiresAuth:!1,requiresAccounts:!0},"/oauth/ynab/callback":{template:br,init:an,scroll:!1,title:"Authorize YNAB - YNAB to Monarch",requiresAuth:!1},"/synced-accounts":{template:yr,init:on,scroll:!0,title:"Creating Synced Accounts - YNAB to Monarch",requiresAuth:!1}},vt=!1,kt=!1;async function ae(e,t=!1,r=!1){if(!vt){vt=!0;try{e.startsWith("/")||(e="/"+e);let i=wt[e];if(!i)return console.error(`Route not found: ${e}`),e="/upload",ae(e,t);if(kt||(await xr(),kt=!0),!r&&i.requiresAccounts&&!(V.accounts&&Object.keys(V.accounts).length>0))return console.warn(`Route ${e} requires accounts but none found. Redirecting to upload.`),ae("/upload",!0);t?history.replaceState({path:e},"",e):history.pushState({path:e},"",e),await ln(e)}catch(i){if(console.error("Navigation error:",i),e!=="/upload")return ae("/upload",!0)}finally{vt=!1}}}async function ln(e){let t=document.getElementById("app"),r=wt[e]||wt["/upload"];document.title=r.title,kt||(await xr(),kt=!0),r.scroll?document.body.classList.add("always-scroll"):document.body.classList.remove("always-scroll"),t.innerHTML="",t.innerHTML=r.template,window.scrollTo(0,0);try{await r.init()}catch(i){console.error(`Error initializing route ${e}:`,i),e!=="/upload"&&ae("/upload",!0)}}function ve(){try{Object.keys(V.accounts).length>0&&sessionStorage.setItem("ynab_accounts",JSON.stringify(V.accounts)),V.monarchAccounts&&sessionStorage.setItem("monarch_accounts",JSON.stringify(V.monarchAccounts));let e={lastPath:vr(),timestamp:Date.now()};localStorage.setItem("app_state",JSON.stringify(e))}catch(e){console.error("Error persisting state:",e)}}async function xr(){try{V.accounts||(V.accounts={});let e=Pe();(e.email||e.token)&&(V.credentials.email=e.email||V.credentials.email,V.credentials.encryptedPassword=e.encryptedPassword||V.credentials.encryptedPassword,V.credentials.apiToken=e.token||V.credentials.apiToken,V.credentials.deviceUuid=e.uuid||V.credentials.deviceUuid,V.credentials.remember=e.remember||V.credentials.remember);let t=sessionStorage.getItem("ynab_accounts");if(t)try{let s=JSON.parse(t);s&&typeof s=="object"&&(V.accounts=s)}catch(s){console.warn("Failed to parse accounts from sessionStorage:",s),sessionStorage.removeItem("ynab_accounts"),V.accounts={}}let r=sessionStorage.getItem("monarch_accounts");if(r)try{let s=JSON.parse(r);s&&typeof s=="object"&&(V.monarchAccounts=s)}catch(s){console.warn("Failed to parse monarch accounts from sessionStorage:",s),sessionStorage.removeItem("monarch_accounts"),V.monarchAccounts=null}let i=localStorage.getItem("app_state");if(i)try{let s=JSON.parse(i);s.timestamp&&Date.now()-s.timestamp<24*60*60*1e3?console.log("Loaded recent app state from localStorage"):localStorage.removeItem("app_state")}catch(s){console.warn("Failed to parse app state from localStorage:",s),localStorage.removeItem("app_state")}}catch(e){console.error("Error loading persisted state:",e),V.accounts={},V.monarchAccounts=null}}function vr(){return window.location.pathname}function ur(){try{sessionStorage.removeItem("ynab_accounts"),sessionStorage.removeItem("monarch_accounts"),localStorage.removeItem("app_state"),V.accounts={},V.monarchAccounts=null,console.log("Application state cleared")}catch(e){console.error("Error clearing app state:",e)}}function Ee(){let e=vr(),r={"/review":"/upload","/method":"/review","/customize":"/method","/manual":"/customize","/login":"/method","/otp":"/login","/mapping":"/login","/complete":"/mapping"}[e]||"/upload";ae(r)}"scrollRestoration"in history&&(history.scrollRestoration="manual");window.addEventListener("popstate",async e=>{if(!vt){let t=e.state?.path||window.location.pathname;try{await ln(t)}catch(r){console.error("Error handling popstate:",r),ae("/upload",!0)}}});window.addEventListener("DOMContentLoaded",async()=>{let e=window.location.pathname,t=wt[e];try{t?await ln(e):ae("/upload",!0)}catch(r){console.error("Error on initial load:",r),ae("/upload",!0)}});document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("header-home-link");!e||e.addEventListener("click",t=>{t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.button!==0||(t.preventDefault(),ae("/"))})});})();
/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
