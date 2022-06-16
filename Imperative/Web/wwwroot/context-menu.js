/*! For license information please see context-menu.js.LICENSE.txt */
var t={d:(e,i)=>{for(var o in i)t.o(i,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:i[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{xV:()=>Ui,h2:()=>zi,DY:()=>ii,sN:()=>Oi,aW:()=>oi});const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${n}`);class a{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],n=document.createTreeWalker(e.content,133,null,!1);let a=0,c=-1,p=0;const{strings:u,values:{length:g}}=t;for(;p<g;){const t=n.nextNode();if(null!==t){if(c++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let o=0;for(let t=0;t<i;t++)l(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=u[p],i=d.exec(e)[2],o=i.toLowerCase()+"$lit$",s=t.getAttribute(o);t.removeAttribute(o);const n=s.split(r);this.parts.push({type:"attribute",index:c,name:i,strings:n}),p+=n.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const o=t.parentNode,s=e.split(r),n=s.length-1;for(let e=0;e<n;e++){let i,n=s[e];if(""===n)i=h();else{const t=d.exec(n);null!==t&&l(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(n)}o.insertBefore(i,t),this.parts.push({type:"node",index:++c})}""===s[n]?(o.insertBefore(h(),t),i.push(t)):t.data=s[n],p+=n}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&c!==a||(c++,e.insertBefore(h(),t)),a=c,this.parts.push({type:"node",index:c}),null===t.nextSibling?t.data="":(i.push(t),c--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),p++}}else n.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const l=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,h=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:i},parts:o}=t,s=document.createTreeWalker(i,133,null,!1);let n=g(o),r=o[n],a=-1,l=0;const c=[];let h=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,n=g(o,n),r=o[n]}c.forEach((t=>t.parentNode.removeChild(t)))}const u=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},g=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1},m=new WeakMap,b=t=>(...e)=>{const i=t(...e);return m.set(i,!0),i},y=t=>"function"==typeof t&&m.has(t),f={},v={};class _{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],o=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let n,r=0,a=0,l=s.nextNode();for(;r<o.length;)if(n=o[r],c(n)){for(;a<n.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=e.pop(),l=s.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),x=` ${s} `;class k{constructor(t,e,i,o){this.strings=t,this.values=e,this.type=i,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const a=d.exec(t);e+=null===a?t+(i?x:n):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}class S extends k{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,i=e.firstChild;return e.removeChild(i),((t,e,i=null,o=null)=>{for(;e!==i;){const i=e.nextSibling;t.insertBefore(e,o),e=i}})(e,i.firstChild),t}}const C=t=>null===t||!("object"==typeof t||"function"==typeof t),E=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class A{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new T(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!E(t))return t}let o="";for(let s=0;s<e;s++){o+=t[s];const e=i[s];if(void 0!==e){const t=e.value;if(C(t)||!E(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class T{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||C(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class z{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}const t=this.__pendingValue;t!==f&&(C(t)?t!==this.value&&this.__commitText(t):t instanceof k?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):E(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),o=i._clone();i.update(t.values),this.__commitNode(o),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,o=0;for(const s of t)i=e[o],void 0===i&&(i=new z(this.options),e.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(e[o-1])),i.setValue(s),i.commit(),o++;o<e.length&&(e.length=o,this.clear(i&&i.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class I{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=f}}class L extends A{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new O(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class O extends T{}let N=!1;(()=>{try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class R{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=H(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const H=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function B(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(s);return i=e.keyString.get(o),void 0===i&&(i=new a(t,t.getTemplateElement()),e.keyString.set(o,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,P=new WeakMap,D=new class{handleAttributeExpressions(t,e,i,o){const s=e[0];return"."===s?new L(t,e.slice(1),i).parts:"@"===s?[new R(t,e.slice(1),o.eventContext)]:"?"===s?[new I(t,e.slice(1),i)]:new A(t,e,i).parts}handleTextExpression(t){return new z(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const V=(t,...e)=>new k(t,e,"html",D),F=(t,...e)=>new S(t,e,"svg",D),U=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const $=t=>e=>{const i=U(e.type,t);let o=M.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},M.set(i,o));let n=o.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(s);if(n=o.keyString.get(r),void 0===n){const i=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,t),n=new a(e,i),o.keyString.set(r,n)}return o.stringsArray.set(e.strings,n),n},K=["html","svg"],X=new Set;window.JSCompiler_renameProperty=(t,e)=>t;const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},j=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:j};class Z extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,i)=>{const o=this._attributeNameForProperty(i,e);void 0!==o&&(this._attributeToPropertyMap.set(o,i),t.push(o))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const s=this[t];this[e]=o,this.requestUpdateInternal(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Y}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=j){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,o=e.converter||W,s="function"==typeof o?o:o.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,o=e.converter;return(o&&o.toAttribute||W.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Y){const o=this.constructor,s=o._attributeNameForProperty(t,i);if(void 0!==s){const t=o._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(t);if(void 0!==o){const t=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let o=!0;if(void 0!==t){const s=this.constructor;i=i||s.getPropertyOptions(t),s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Z.finalized=!0;const G=Element.prototype;G.msMatchesSelector||G.webkitMatchesSelector;const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol();class tt{constructor(t,e){if(e!==J)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const et=(t,...e)=>{const i=e.reduce(((e,i,o)=>e+(t=>{if(t instanceof tt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1]),t[0]);return new tt(i,J)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const it={};class ot extends Z{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight(((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t)),i),i=e(t,new Set),o=[];i.forEach((t=>o.unshift(t))),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new tt(String(e),J)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==it&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return it}}ot.finalized=!0,ot.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,n=P.has(e),r=q&&11===e.nodeType&&!!e.host,a=r&&!X.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=P.get(e);void 0===s&&(o(e,e.firstChild),P.set(e,s=new z(Object.assign({templateFactory:B},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:$(s)},i)),a){const t=P.get(l);P.delete(l);((t,e,i)=>{X.add(t);const o=i?i.element:document.createElement("template"),s=e.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(o,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=s[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{K.forEach((e=>{const i=M.get(U(e,t));void 0!==i&&i.keyString.forEach((t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{i.add(t)})),p(t,i)}))}))})(t);const a=o.content;i?function(t,e,i=null){const{element:{content:o},parts:s}=t;if(null==i)return void o.appendChild(e);const n=document.createTreeWalker(o,133,null,!1);let r=g(s),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===i&&(a=u(e),i.parentNode.insertBefore(e,i));-1!==r&&s[r].index===l;){if(a>0){for(;-1!==r;)s[r].index+=a,r=g(s,r);return}r=g(s,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),p(i,t)}})(s,l,t.value instanceof _?t.value.template:void 0),o(e,e.firstChild),e.appendChild(l),P.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)},ot.shadowRootOptions={mode:"open"};class st{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const nt=new WeakMap,rt=b((t=>e=>{if(!(e instanceof T)||e instanceof O||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=e,{element:o}=i;let s=nt.get(e);void 0===s&&(o.setAttribute("class",i.strings.join(" ")),nt.set(e,s=new Set));const n=o.classList||new st(o);s.forEach((e=>{e in t||(n.remove(e),s.delete(e))}));for(const e in t){const i=t[e];i!=s.has(e)&&(i?(n.add(e),s.add(e)):(n.remove(e),s.delete(e)))}"function"==typeof n.commit&&n.commit()})),at=new WeakMap,lt=b((t=>e=>{const i=at.get(e);if(void 0===t&&e instanceof T){if(void 0!==i||!at.has(e)){const t=e.committer.name;e.committer.element.removeAttribute(t)}}else t!==i&&e.setValue(t);at.set(e,t)})),ct=new WeakMap;function ht(t){return e=>{if(function(t,e){let i=e;for(;i;){if(ct.get(i)===t)return!0;i=Object.getPrototypeOf(i)}return!1}(t,e))return e;const i=t(e);return ct.set(i,t),i}}const dt=ht((t=>class extends t{static get properties(){return{_hovered:{type:Boolean,reflect:!0,attribute:"hovered"}}}get hovered(){return this._hovered}get _hovered(){return this.__hovered||!1}set _hovered(t){const e=this.__hovered;t!==e&&(this.__hovered=t,this._notifyHovered(t),this.requestUpdate&&this.requestUpdate("_hovered",e))}constructor(){super(),this._hoverCallback=this._hoverCallback.bind(this),this._leaveCallback=this._leaveCallback.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("mouseover",this._hoverCallback),this.addEventListener("mouseleave",this._leaveCallback)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("mouseover",this._hoverCallback),this.removeEventListener("mouseleave",this._leaveCallback)}_hoverCallback(){this._hovered=!0}_leaveCallback(){this._hovered=!1}_notifyHovered(t){this.dispatchEvent(new CustomEvent("hoverchange",{detail:{value:t}}))}})),pt=ht((t=>class extends t{static get properties(){return{toggles:{type:Boolean,reflect:!0},active:{type:Boolean,reflect:!0},ariaActiveAttribute:{type:String,reflect:!0},_pointerDown:{type:Boolean},_receivedFocusFromKeyboard:{type:Boolean},_pressed:{type:Boolean,reflect:!0,attribute:"pressed"}}}get pressed(){return this._pressed}get _pressed(){return this.__pressed||!1}set _pressed(t){const e=this._pressed;e!==t&&(this.__pressed=t,this.dispatchEvent(new Event("pressedchange")),this._pressedChanged(),this.requestUpdate&&this.requestUpdate("_pressed",e))}get active(){return this._active||!1}set active(t){const e=this._active;e!==t&&(this._active=t,this.dispatchEvent(new Event("activechange")),this._activeChanged(),this.requestUpdate&&this.requestUpdate("active",e))}get pointerDown(){return this._pointerDown}get receivedFocusFromKeyboard(){return this._receivedFocusFromKeyboard||!1}get ariaActiveAttribute(){return this._ariaActiveAttribute}set ariaActiveAttribute(t){const e=this._ariaActiveAttribute;e!==t&&(this._ariaActiveAttribute=t,e&&this.hasAttribute(e)&&this.removeAttribute(e),this._activeChanged())}_setChanged(t,e){const i=`_${t}`,o=this[i];return e!==o&&(this[i]=e,this.requestUpdate&&this.requestUpdate(t,o),!0)}constructor(){super(),this.ariaActiveAttribute="aria-pressed",this._downHandler=this._downHandler.bind(this),this._upHandler=this._upHandler.bind(this),this._clickHandler=this._clickHandler.bind(this),this._keyDownHandler=this._keyDownHandler.bind(this),this._keyUpHandler=this._keyUpHandler.bind(this),this._blurHandler=this._blurHandler.bind(this),this._focusHandler=this._focusHandler.bind(this),this.toggles=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("mousedown",this._downHandler),this.addEventListener("mouseup",this._upHandler),this.addEventListener("click",this._clickHandler),this.addEventListener("keydown",this._keyDownHandler),this.addEventListener("keyup",this._keyUpHandler),this.addEventListener("blur",this._blurHandler),this.addEventListener("focus",this._focusHandler),this.hasAttribute("role")||this.setAttribute("role","button")}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("mousedown",this._downHandler),this.removeEventListener("mouseup",this._upHandler),this.removeEventListener("click",this._clickHandler),this.removeEventListener("keydown",this._keyDownHandler),this.removeEventListener("keyup",this._keyUpHandler),this.removeEventListener("blur",this._blurHandler),this.removeEventListener("focus",this._focusHandler)}_downHandler(){this._pointerDown=!0,this._pressed=!0,this._receivedFocusFromKeyboard=!1}_upHandler(){this._pointerDown=!1,this._pressed=!1}_clickHandler(){this.toggles?this.active=!this.active:this.active=!1}_keyDownHandler(t){["Enter","NumpadEnter"].includes(t.code)?this._asyncClick():"Space"!==t.code&&" "!==t.key||this._spaceKeyDownHandler(t)}_keyUpHandler(t){"Space"===t.code&&this._spaceKeyUpHandler(t)}_blurHandler(){this._detectKeyboardFocus(!1),this._pressed=!1}_focusHandler(){this._detectKeyboardFocus(!0)}_detectKeyboardFocus(t){this._receivedFocusFromKeyboard=!this.pointerDown&&t}_isLightDescendant(t){return t!==this&&this.contains(t)}_spaceKeyDownHandler(t){const{target:e}=t;e&&!this._isLightDescendant(e)&&(t.preventDefault(),t.stopImmediatePropagation(),this._pressed=!0)}_spaceKeyUpHandler(t){const{target:e}=t;e&&!this._isLightDescendant(e)&&(this.pressed&&this._asyncClick(),this._pressed=!1)}_asyncClick(){setTimeout((()=>this.click()),1)}_pressedChanged(){this._changedButtonState()}_buttonStateChanged(){}_changedButtonState(){this._buttonStateChanged()}_activeChanged(){const{active:t,ariaActiveAttribute:e}=this;this.toggles?this.setAttribute(e,t?"true":"false"):this.removeAttribute(e),this._changedButtonState()}_controlStateChanged(){this.disabled?this._pressed=!1:this._changedButtonState()}})),ut=ht((t=>class extends t{static get properties(){return{disabled:{type:Boolean,reflect:!0},focused:{type:Boolean,reflect:!0}}}get focused(){return this._focused}set focused(t){const e=this._focused;e!==t&&(this._focused=t,this._notifyFocus(t),this._changedControlState(),this.requestUpdate&&this.requestUpdate("focused",e))}get disabled(){return this._disabled}set disabled(t){const e=this._disabled;e!==t&&(this._disabled=t,this._notifyDisabled(t),this._disabledChanged(t),this._changedControlState(),this.requestUpdate&&this.requestUpdate("disabled",e))}constructor(){super(),this._focusBlurHandler=this._focusBlurHandler.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("focus",this._focusBlurHandler),this.addEventListener("blur",this._focusBlurHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("focus",this._focusBlurHandler),this.removeEventListener("blur",this._focusBlurHandler)}_focusBlurHandler(t){this.disabled?this.focused&&(this.focused=!1,this.blur()):this.focused="focus"===t.type}_disabledChanged(t){this.setAttribute("aria-disabled",t?"true":"false"),this.style.pointerEvents=t?"none":"",t?(this._oldTabIndex=this.getAttribute("tabindex"),this.focused=!1,this.setAttribute("tabindex","-1"),this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))}_changedControlState(){this._controlStateChanged&&this._controlStateChanged()}_notifyFocus(t){this.dispatchEvent(new CustomEvent("focusedchange",{detail:{value:t}}))}_notifyDisabled(t){this.dispatchEvent(new CustomEvent("disabledchange",{detail:{value:t}}))}})),gt=et`
  html {
    --context-menu-background-color: white;
    --context-menu-shadow: 0 4px 5px 0 rgba(0,0,0,0.14);
    --anypoint-item-before-background: none;
    --anypoint-item-focused-background-color: inherit;
    
    --anypoint-color-primary: #00a2df;
    --anypoint-color-secondary: #506773;
    --anypoint-color-danger: #d1344e;
    --anypoint-color-success: #17bc65;
    --anypoint-color-tertiary: #ffffff;

    --anypoint-color-coreBlue1: #abe2f5;
    --anypoint-color-coreBlue2: #48c1ed;
    --anypoint-color-coreBlue3: #00a2df;
    --anypoint-color-coreBlue4: #087299;
    --anypoint-color-coreBlue5: #114459;

    --anypoint-color-robustBlue1: #a1b1b8;
    --anypoint-color-robustBlue2: #6b8a99;
    --anypoint-color-robustBlue3: #506773;
    --anypoint-color-robustBlue4: #32444d;
    --anypoint-color-robustBlue5: #272f33;

    --anypoint-color-futureGreen1: #aaf2cb;
    --anypoint-color-futureGreen2: #33cc7a;
    --anypoint-color-futureGreen3: #17bc65;
    --anypoint-color-futureGreen4: #0e8c48;
    --anypoint-color-futureGreen5: #174d30;

    --anypoint-color-aluminum1: #f9fafb;
    --anypoint-color-aluminum2: #f4f5f6;
    --anypoint-color-aluminum3: #e8e9ea;
    --anypoint-color-aluminum4: #cacbcc;
    --anypoint-color-aluminum5: #989a9b;

    --anypoint-color-steel1: #6b6c6d;
    --anypoint-color-steel2: #58595a;
    --anypoint-color-steel3: #3a3b3c;
    --anypoint-color-steel4: #262728;
    --anypoint-color-steel5: #121314;

    --anypoint-color-yellow3: #f2be24;
    --anypoint-color-viridian3: #00b49d;
    --anypoint-color-teal3: #00b5d1;
    --anypoint-color-navy3: #178bea;
    --anypoint-color-indigo3: #5e66f9;
    --anypoint-color-violet3: #9a63f9;
    --anypoint-color-red3: #d1344e;
    
    
  }
`;try{document.adoptedStyleSheets=document.adoptedStyleSheets.concat(gt.styleSheet)}catch(t){const e=document.createElement("style");e.type="text/css",e.innerHTML=gt.cssText,document.getElementsByTagName("head")[0].appendChild(e)}const mt=et`
  :host,
  .anypoint-item {
    display: block;
    position: relative;
    min-height: var(--anypoint-item-min-height, 48px);
    padding: var(--anypoint-item-padding, 0px 12px);
    cursor: pointer;

    -webkit-transition: background-color 0.16s ease-in-out 0s;
    transition: background-color 0.16s ease-in-out 0s;
  }

  :host([anypoint]),
  .anypoint-item[anypoint] {
    padding: var(--anypoint-item-padding, 0px 10px);
    min-height: var(--anypoint-item-min-height, 40px);

    border-left-width: 2px;
    border-right-width: 2px;
    border-left-color: var(--anypoint-item-border-left-color, var(--anypoint-color-aluminum4));
    border-right-color: var(--anypoint-item-border-right-color, var(--anypoint-color-aluminum4));
    border-left-style: solid;
    border-right-style: solid;
  }

  :host([anypoint]:hover),
  .anypoint-item[anypoint]:hover {
    color: var(--anypoint-item-focus-color, var(--anypoint-color-coreBlue3));
    border-left-color: var(
      --anypoint-item-border-left-hover-color,
      var(--anypoint-color-coreBlue3)
    );
    border-right-color: var(
      --anypoint-item-border-right-hover-color,
      var(--anypoint-color-coreBlue3)
    );
    background-color: var(--anypoint-item-hover-background-color, initial);
  }

  :host(:hover),
  .anypoint-item:hover {
    background-color: var(--anypoint-item-hover-background-color, #F5F5F5);
  }

  :host(:focus),
  .anypoint-item:focus {
    position: relative;
    outline: 0;
    // background-color: var(--anypoint-item-focused-background-color, initial);
    font-weight: var(--anypoint-item-focused-font-weight, initial);
  }

  :host([anypoint]:focus),
  .anypoint-item[anypoint]:focus {
    color: var(--anypoint-item-focused-color, var(--anypoint-color-coreBlue3));
  }

  :host(:focus):before,
  .anypoint-item:focus:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background: var(--anypoint-item-before-background, currentColor);
    content: '';
    opacity: var(--anypoint-item-before-opacity, var(--dark-divider-opacity));
    pointer-events: none;
  }

  :host([anypoint]:focus):before,
  .anypoint-item[anypoint]:focus:before {
    background: var(--anypoint-item-before-background);
    opacity: var(--anypoint-item-before-opacity);
  }

  .anypoint-item {
    outline: none;
    width: 100%;
    text-align: left;
  }

  :host([hidden]),
  .anypoint-item[hidden] {
    display: none !important;
  }

  :host(.selected),
  .anypoint-item.selected {
    font-weight: var(--anypoint-item-selected-weight, bold);
  }

  :host([disabled]),
  .anypoint-item[disabled] {
    color: var(--anypoint-item-disabled-color, var(--disabled-text-color));
  }

  :host([pressed]),
  .anypoint-item[pressed],
  .anypoint-item.pressed {
    position: relative;
    outline: 0;
    background-color: var(--anypoint-item-pressed-background-color, #BDBDBD);
  }

  :host([anypoint][pressed]),
  .anypoint-item[anypoint][pressed],
  .anypoint-item[anypoint].pressed {
    background-color: var(--anypoint-item-pressed-background-color, initial);
  }
`;class bt extends(dt(ut(pt(ot)))){get styles(){return[mt,et`
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .content-icon {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: var(--anypoint-item-icon-width, 40px);
        }
      `]}static get properties(){return{anypoint:{type:Boolean,reflect:!0}}}render(){return V`<style>${this.styles}</style>
      <div class="content-icon">
        <slot name="item-icon"></slot>
      </div>
      <slot></slot>
    `}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","option"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),super.connectedCallback&&super.connectedCallback()}}class yt extends(dt(ut(pt(ot)))){get styles(){return[mt,et`
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      `]}static get properties(){return{anypoint:{type:Boolean,reflect:!0}}}render(){return V`<style>${this.styles}</style>
      <slot></slot>
    `}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","option"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),super.connectedCallback&&super.connectedCallback()}}function ft(t,e,i,o){const s=t-i,n=e-o;return Math.sqrt(s*s+n*n)}const vt=window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now;class _t{get boundingRect(){return this.element.getBoundingClientRect()}constructor(t){this.element=t,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}furthestCornerDistanceFrom(t,e){const i=ft(t,e,0,0),o=ft(t,e,this.width,0),s=ft(t,e,0,this.height),n=ft(t,e,this.width,this.height);return Math.max(i,o,s,n)}}class wt{static get MAX_RADIUS(){return 300}get recenters(){return this.element.recenters}get center(){return this.element.center}get mouseDownElapsed(){if(!this.mouseDownStart)return 0;let t=vt()-this.mouseDownStart;return this.mouseUpStart&&(t-=this.mouseUpElapsed),t}get mouseUpElapsed(){return this.mouseUpStart?vt()-this.mouseUpStart:0}get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3}get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3}get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds}get initialOpacity(){return this.element.initialOpacity}get opacityDecayVelocity(){return this.element.opacityDecayVelocity}get radius(){const t=this.containerMetrics.width*this.containerMetrics.width,e=this.containerMetrics.height*this.containerMetrics.height,i=1.1*Math.min(Math.sqrt(t+e),wt.MAX_RADIUS)+5,o=1.1-i/wt.MAX_RADIUS*.2,s=i*(1-80**(-this.mouseInteractionSeconds/o));return Math.abs(s)}get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity}get outerOpacity(){const t=.3*this.mouseUpElapsedSeconds,e=this.opacity;return Math.max(0,Math.min(t,e))}get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,wt.MAX_RADIUS)}get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,wt.MAX_RADIUS)}get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius}get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))}get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart}get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart}get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart}constructor(t){this.element=t,this.color=window.getComputedStyle(t).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),this.waveContainer.appendChild(this.wave),this.resetInteractionState()}resetInteractionState(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new _t(this.element)}draw(){this.wave.style.opacity=String(this.opacity);const t=this.radius/(this.containerMetrics.size/2),e=this.xNow-this.containerMetrics.width/2,i=this.yNow-this.containerMetrics.height/2;this.waveContainer.style.webkitTransform=`translate(${e}px, ${i}px)`,this.waveContainer.style.transform=`translate3d(${e}px, ${i}px, 0)`,this.wave.style.webkitTransform=`scale(${t},${t})`,this.wave.style.transform=`scale3d(${t},${t},1)`}downAction(t){const e=this.containerMetrics.width/2,i=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=vt(),this.center?(this.xStart=e,this.yStart=i,this.slideDistance=ft(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=t?t.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=t?t.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=e,this.yEnd=i,this.slideDistance=ft(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=`${this.containerMetrics.size}px`,this.waveContainer.style.height=`${this.containerMetrics.size}px`}upAction(){this.isMouseDown&&(this.mouseUpStart=vt())}remove(){this.waveContainer.parentNode.removeChild(this.waveContainer)}}const xt=et`
:host {
  display: block;
  position: absolute;
  border-radius: inherit;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
  * creating a node (with a position:absolute) in the middle of an event
  * handler "interrupts" that event handler (which happens when the
  * ripple is created on demand) */
  pointer-events: none;
}

:host([animating]) {
  /* This resolves a rendering issue in Chrome (as of 40) where the
    ripple is not properly clipped by its parent (which may have
    rounded corners). See: http://jsbin.com/temexa/4
    Note: We only apply this style conditionally. Otherwise, the browser
    will create a new compositing layer for every ripple element on the
    page, and that would be bad. */
  -webkit-transform: translate(0, 0);
  transform: translate3d(0, 0, 0);
}

#background,
#waves,
.wave-container,
.wave {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#background,
.wave {
  opacity: 0;
}

#waves,
.wave {
  overflow: hidden;
}

.wave-container,
.wave {
  border-radius: 50%;
}

:host(.circle) #background,
:host(.circle) #waves {
  border-radius: 50%;
}

:host(.circle) .wave-container {
  overflow: hidden;
}
`,kt=Symbol("animating"),St=Symbol("animatingValue"),Ct=Symbol("keyEventTarget"),Et=Symbol("keyDownHandler"),At=Symbol("keyUpHandler"),Tt=Symbol("uiUpAction"),zt=Symbol("uiDownAction"),It=Symbol("animateRipple"),Lt=Symbol("onAnimationComplete"),Ot=Symbol("addRipple"),Nt=Symbol("removeRipple");window.customElements.define("material-ripple",class extends ot{get styles(){return xt}static get properties(){return{initialOpacity:{type:Number},opacityDecayVelocity:{type:Number},recenters:{type:Boolean},center:{type:Boolean},noink:{type:Boolean,reflect:!0}}}get animating(){return this[St]}set[kt](t){this[St]!==t&&(this[St]=t,t&&!this.hasAttribute("animating")?this.setAttribute("animating",""):!t&&this.hasAttribute("animating")&&this.removeAttribute("animating"))}get target(){return this[Ct]}get shouldKeepAnimating(){return this.ripples.some((t=>!t.isAnimationComplete))}constructor(){super(),this.initialOpacity=.25,this.opacityDecayVelocity=.8,this.recenters=!1,this.center=!1,this.ripples=[],this.noink=!1,this[St]=!1,this[It]=this[It].bind(this),this[Et]=this[Et].bind(this),this[At]=this[At].bind(this),this[Tt]=this[Tt].bind(this),this[zt]=this[zt].bind(this)}connectedCallback(){if(super.connectedCallback(),this.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE){const t=this.getRootNode();this[Ct]=t.host||t}else this[Ct]=this.parentNode;const{target:t}=this,e={passive:!0};t.addEventListener("mouseup",this[Tt],e),t.addEventListener("touchend",this[Tt],e),t.addEventListener("mousedown",this[zt],e),t.addEventListener("touchstart",this[zt],e),t.addEventListener("keydown",this[Et],e),t.addEventListener("keyup",this[At],e)}disconnectedCallback(){super.disconnectedCallback();const t={passive:!0},{target:e}=this;this[Ct]=null,e.removeEventListener("mouseup",this[Tt],t),e.removeEventListener("touchend",this[Tt],t),e.removeEventListener("mousedown",this[zt],t),e.removeEventListener("touchstart",this[zt],t),e.removeEventListener("keydown",this[Et],t),e.removeEventListener("keyup",this[At],t)}simulatedRipple(){this.down(null),setTimeout((()=>{this.up()}),1)}[zt](t){this.noink||this.down(t)}down(t){const e=this[Ot]();e&&(e.downAction(t),this[St]||(this[kt]=!0,this[It]()))}up(){this.ripples.forEach((t=>t.upAction())),this[kt]=!0,this[It]()}[Tt](){this.noink||this.up()}[Lt](){this[kt]=!1;const t=this.shadowRoot.querySelector("#background");t&&(t.style.backgroundColor=""),this.dispatchEvent(new Event("transitionend"))}[Ot](){const t=this.shadowRoot.querySelector("#background"),e=this.shadowRoot.querySelector("#waves");if(!t||!e)return null;const i=new wt(this);return e.appendChild(i.waveContainer),t.style.backgroundColor=i.color,this.ripples.push(i),i}[Nt](t){const e=this.ripples.indexOf(t);e<0||(this.ripples.splice(e,1),t.remove(),this.ripples.length||(this[kt]=!1))}[It](){if(!this[St])return;const t=this.shadowRoot.querySelector("#background");this.ripples.forEach((e=>{e.draw(),t.style.opacity=String(e.outerOpacity),e.isOpacityFullyDecayed&&!e.isRestingAtMaxRadius&&this[Nt](e)})),this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this[It]):this[Lt]()}[Et](t){["Enter","NumpadEnter"].includes(t.code)?(this[zt](),setTimeout(this[Tt],1)):["Space"].includes(t.code)&&(this[zt](),t.preventDefault())}[At](t){["Space"].includes(t.code)&&this[Tt]()}render(){return V`<style>${this.styles}</style><div id="background"></div><div id="waves"></div>`}});class Rt extends(ut(pt(ot))){static get properties(){return{elevation:{type:Number,reflect:!0},emphasis:{type:String,reflect:!0},noink:{type:Boolean,reflect:!0},anypoint:{type:Boolean,reflect:!0},autofocus:{type:Boolean,reflect:!0}}}get emphasis(){return this._emphasis}set emphasis(t){const e=this._emphasis;e!==t&&(this._emphasis=t,this._calculateElevation(),this.requestUpdate("emphasis",e))}get toggles(){return this._toggles}set toggles(t){const e=this._toggles;e!==t&&(this._toggles=t,this._calculateElevation(),this.requestUpdate("toggles",e))}get anypoint(){return this._anypoint}set anypoint(t){const e=this._anypoint;e!==t&&(this._anypoint=t,this._calculateElevation(),this.requestUpdate("anypoint",e))}constructor(){super(),this.emphasis="low"}async _calculateElevation(){let t=0;"high"!==this.emphasis||this.anypoint||(t=this.toggles&&this.active?2:this.pressed?3:1),await this.updateComplete,this.elevation=t}_controlStateChanged(){super._controlStateChanged(),this._calculateElevation()}_buttonStateChanged(){this._calculateElevation()}_transitionEndHandler(t){const{propertyName:e}=t;void 0===e&&this.dispatchEvent(new Event("transitionend"))}}et`
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  min-width: 5.14em;
  margin: 0 0.29em;
  outline-width: 0;
  user-select: none;
  cursor: pointer;
  z-index: 0;
  padding: 0.7em 0.57em;
  font-size: var(--anypoint-button-font-size, 15px);
  background-color: var(--anypoint-button-background-color, inherit);
  color: var(--anypoint-button-color, var(--anypoint-color-primary));
  border-width: 1px;
  border-color: var(--anypoint-button-border-color, transparent);
  border-style: solid;
  border-radius: var(--anypoint-button-border-radius, 3px);
  text-transform: var(--anypoint-button-text-transform, uppercase);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

:host([hidden]) {
  display: none !important;
}

:host(:focus) {
  outline: none;
}

:host([disabled]) {
  cursor: auto;
  pointer-events: none;
}

:host([emphasis="low"]:not([anypoint])) {
  box-shadow: none !important;
}

:host([emphasis="low"][disabled]) {
  color: var(--anypoint-button-disabled-color, #a8a8a8);
}

:host(:not([pressed])[emphasis="low"]:hover) {
  background-color: var(--anypoint-button-emphasis-low-hover-background-color, rgba(0, 162, 223, .08));
}

:host(:not([pressed]):not([anypoint])[emphasis="low"][focused]) {
  background-color: var(--anypoint-button-emphasis-low-focus-background-color, rgba(0, 162, 223, .12));
  color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
}

:host(:not([pressed])[emphasis="low"][active]) {
  background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(0, 162, 223, .16));
}

:host([emphasis="medium"]:not([anypoint])) {
  box-shadow: none !important;
}

:host([emphasis="medium"]) {
  border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue1));
}

:host([emphasis="medium"][disabled]) {
  color: var(--anypoint-button-disabled-color, #a8a8a8);
  border-color: var(--anypoint-button-disabled-color, var(--anypoint-color-aluminum4));
}

:host(:not([pressed])[emphasis="medium"]:hover) {
  background-color: var(--anypoint-button-emphasis-medium-hover-background-color, rgba(0, 162, 223, .06));
}

:host(:not([pressed])[emphasis="medium"][focused]) {
  background-color: var(--anypoint-button-emphasis-medium-focus-background-color, rgba(0, 162, 223, .08));
  color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
  border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue2));
}

:host(:not([pressed])[emphasis="medium"][active]) {
  background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(94, 102, 249, 0.16));
}

:host([emphasis="high"]:not([anypoint])) {
  will-change: box-shadow;
  background-color: var(--anypoint-button-emphasis-high-background-color, var(--anypoint-color-primary));
  color: var(--anypoint-button-emphasis-high-color, var(--anypoint-color-tertiary));
}

:host([emphasis="high"][disabled]:not([anypoint])) {
  background: var(--anypoint-button-disabled-background-color, #eaeaea);
  color: var(--anypoint-button-disabled-color, #a8a8a8);
  box-shadow: none;
}

:host(:not([pressed]):not([anypoint])[emphasis="high"]:hover) {
  background-color: var(--anypoint-button-emphasis-high-hover-background-color, rgba(0, 162, 223, 0.87));
}

:host(:not([pressed]):not([anypoint])[emphasis="high"]:focus) {
  background-color: var(--anypoint-button-emphasis-high-focus-background-color, rgba(0, 162, 223, 0.87));
}

:host(:not([pressed]):not([anypoint])[emphasis="high"][active]) {
  background-color: var(--anypoint-button-emphasis-high-active-background-color, var(--anypoint-color-indigo3));
}

:host([elevation="1"]) {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

:host([elevation="2"]) {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
}

:host([elevation="3"]) {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12),
              0 3px 5px -1px rgba(0, 0, 0, 0.4);
}

:host([emphasis="high"][anypoint]) {
  background-color: var(--anypoint-button-background-color, var(--anypoint-color-primary));
  color: var(--anypoint-button-color, var(--anypoint-color-tertiary));
  border-radius: var(--anypoint-button-border-radius, 2px);
  height: 40px;
}

:host([emphasis="high"][anypoint]:hover) {
  background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue4));
}

:host([anypoint][focused]) {
  box-shadow: var(--anypoint-button-focus-box-shadow-color, 0 0 0 3px #abe2f5);
}

:host([emphasis="high"][anypoint][pressed]) {
  background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue5));
}

:host([emphasis="high"][anypoint][active]) {
  background-color: var(--anypoint-button-active-background-color, var(--anypoint-color-coreBlue5));
}

:host([anypoint]) {
  text-transform: var(--anypoint-button-text-transform, initial);
}

:host([anypoint]) material-ripple {
  display: none;
}

:host([anypoint][disabled]) {
  background: var(--anypoint-button-disabled-background-color, #eaeaea);
  color: var(--anypoint-button-disabled-color, #a8a8a8);
}

:host ::slotted(*) {
  margin: 0 4px;
}`;const Ht=et`:host {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  outline: none;
}

material-ripple {
  opacity: 0.6;
  color: currentColor;
}

:host ::slotted(*) {
  margin: 0;
  padding: 0;
  color: var(--anypoint-icon-button-color, var(--anypoint-color-primary));
}

.icon {
  cursor: pointer;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;

  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

:host([disabled]) {
  pointer-events: none;
  cursor: auto;
}

:host([disabled]) ::slotted(*) {
  color: var(--anypoint-icon-button-disabled-color, #a8a8a8) !important;
}

/* Low emhasis styles */
:host([emphasis="low"]:not(:disabled)) .icon {
  background-color: none;
  border-color: none;
  box-shadow: none !important;
}

:host([emphasis="low"]:not(:disabled)) ::slotted(*) {
  color: var(--anypoint-icon-button-emphasis-low-color, var(--anypoint-color-primary));
}

:host([emphasis="low"]:hover) .icon {
  background-color: var(--anypoint-icon-button-emphasis-low-hover-background-color, rgba(0, 162, 223, .08));
}

:host([emphasis="low"][focused]) .icon {
  background-color: var(--anypoint-icon-button-emphasis-low-focus-background-color, rgba(0, 162, 223, .12));
}

:host([emphasis="low"][active]) .icon {
  background-color: var(--anypoint-icon-button-emphasis-low-active-background-color, rgba(0, 162, 223, .16));
}

:host([emphasis="low"][active]) ::slotted(*) {
  color: var(--anypoint-icon-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
}

/* Medium emphasis styles */
:host([emphasis="medium"]) .icon {
  border-color: var(--anypoint-icon-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue1));
  box-shadow: none !important;
}

:host([emphasis="medium"][disabled]) .icon {
  border-color: var(--anypoint-icon-button-disabled-color, var(--anypoint-color-aluminum4));
}

:host([emphasis="medium"][disabled]) ::slotted(*) {
  color: var(--anypoint-icon-button-disabled-color, #a8a8a8);
}

:host([emphasis="medium"]:hover) .icon {
  background-color: var(--anypoint-icon-button-emphasis-medium-hover-background-color, rgba(0, 162, 223, .06));
}

:host([emphasis="medium"][focused]) .icon {
  background-color: var(--anypoint-icon-button-emphasis-medium-focus-background-color, rgba(0, 162, 223, .08));
  border-color: var(--anypoint-icon-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue2));
}

:host([emphasis="medium"][focused]) ::slotted(*) {
  color: var(--anypoint-icon-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
}

:host([emphasis="medium"][active]) .icon {
  background-color: var(--anypoint-icon-button-emphasis-low-active-background-color, rgba(94, 102, 249, 0.16));
}
/* High emphasis styles */

:host([emphasis="high"]) .icon {
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
  background-color: var(--anypoint-icon-button-emphasis-high-background-color, var(--anypoint-color-primary));
}

:host([emphasis="high"]) ::slotted(*) {
  color: var(--anypoint-icon-button-emphasis-high-color, var(--anypoint-color-tertiary));
}

:host([emphasis="high"][disabled]) .icon {
  background: var(--anypoint-icon-button-disabled-background-color, #eaeaea);
  box-shadow: none;
}

:host([emphasis="high"][disabled]) ::slotted(*) {
  color: var(--anypoint-icon-button-disabled-color, #a8a8a8);
}

:host([emphasis="high"]:hover) .icon {
  background-color: var(--anypoint-icon-button-emphasis-high-hover-background-color, rgba(0, 162, 223, 0.87));
}

:host(:not([pressed])[emphasis="high"][active]) .icon {
  background-color:
    var(--anypoint-icon-button-emphasis-high-active-background-color, var(--anypoint-color-indigo3));
}

:host([elevation="1"]) .icon {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

:host([elevation="2"]) .icon,
:host([elevation][emphasis="high"][focused]) > .icon {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
}

:host([elevation="3"]) .icon {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12),
              0 3px 5px -1px rgba(0, 0, 0, 0.4);
}`,Bt=t=>"Enter"===t.code||"NumpadEnter"===t.code||13===t.keyCode,Mt=et`
:host {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  line-height: 0;
  -webkit-tap-highlight-color: transparent;
}

:host([hidden]) {
  display: none !important;
}

:host([disabled]),
:host([formdisabled]) {
  cursor: auto;
  pointer-events: none;
  user-select: none;
}

:host(:focus) {
  outline: none;
}

.hidden {
  display: none !important;
}

.checkboxContainer {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  padding: 12px;
}

.checkboxContainer:hover:before,
  :host([focused]) .checkboxContainer:before {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  opacity: .04;
  background-color: var(--anypoint-checkbox-checked-color, var(--anypoint-color-primary));
  pointer-events: none;
  content: "";
  border-radius: 50%;
  position: absolute;
}

:host([disabled]) .checkboxContainer:before,
:host([formdisabled]) .checkboxContainer:before {
  display: none;
}

:host([focused]) .checkboxContainer:before {
  opacity: .12;
}

.checkbox {
  position: relative;
  box-sizing: border-box;
  pointer-events: none;
  border-width: 1px;
  border-style: solid;
  border-color: var(--anypoint-checkbox-input-border-color, var(--anypoint-color-aluminum4));
  border-radius: 2px;
  -webkit-transition: box-shadow .3s linear;
  transition: box-shadow .3s linear;
  display: inline-block;
  vertical-align: text-top;
  width: 20px;
  height: 20px;
  -webkit-transition: background-color .17s ease-out;
  transition: background-color .17s ease-out;
}

.checkmark {
  transition: top .15s ease-in-out, height .2s ease-in-out, width .3s ease-in-out;
  will-change: top, width, height;
  position: absolute;
  display: block;
  left: 4px;
}

:host([checked]) .checkmark {
  border-color: var(--anypoint-checkbox-checkmark-color, var(--anypoint-color-tertiary));
  border-style: none none solid solid;
  border-width: 3px;
  height: 5px;
  top: 3px;
  transform: rotate(-45deg);
  width: 8px;
  background: transparent;
}

.checkboxLabel {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  line-height: normal;
  color: var(--anypoint-checkbox-label-color, var(--anypoint-color-steel1));
}

:host-context([dir="rtl"]) .checkboxLabel {
  padding-right: var(--anypoint-checkbox-label-spacing, 5px);
  padding-left: 0;
}

:host([checked]) .checkbox,
:host(:not([checked])[indeterminate]) .checkbox {
  background-color: var(--anypoint-checkbox-checked-color, var(--anypoint-color-primary));
  border-color: var(--anypoint-checkbox-checked-input-border-color, var(--anypoint-color-primary));
}

:host(:not([checked])[indeterminate]) .checkmark {
  background-color: var(--anypoint-checkbox-checkmark-color, var(--anypoint-color-tertiary));
  height: 3px;
  width: 10px;
  top: calc(50% - 1px);
  border: none;
}


:host([checked]) .checkboxLabel {
  color: var(--anypoint-checkbox-label-checked-color,
    var(--anypoint-checkbox-label-color, var(--anypoint-color-steel1)));
}

.checkboxLabel[hidden] {
  display: none;
}

:host([disabled]) .checkbox,
:host([formdisabled]) .checkbox {
  opacity: 0.5;
  border-color: var(--anypoint-checkbox-unchecked-color,
    var(--anypoint-checkbox-label-color, var(--anypoint-color-steel1)));
}

:host([disabled][checked]) .checkbox,
:host([formdisabled][checked]) .checkbox {
  background-color: var(--anypoint-checkbox-unchecked-color,
    var(--anypoint-checkbox-label-color, var(--anypoint-color-steel1)));
  opacity: 0.5;
}

:host([disabled]) .checkboxLabel,
:host([formdisabled]) .checkboxLabel {
  opacity: 0.65;
}

/* invalid state */
.checkbox.invalid:not(.checked),
:host(:invalid) .checkbox {
  border-color: var(--anypoint-checkbox-error-color, var(--anypoint-color-danger));
}
`,Pt=new Map,Dt=ht((t=>class extends t{static get properties(){return{validator:{type:String},validationStates:{type:Array},invalid:{reflect:!0,type:Boolean}}}get _validator(){const{validator:t}=this;if(!t)return null;const e=t.split(" ");if(0===e.length)return null;const i=[];return e.forEach((t=>{const e=function(t){return Pt.get(t)}(t);e&&i.push(e)})),i}get invalid(){return this._invalid}set invalid(t){const e=this._invalid;e!==t&&(this._invalid=t,this._invalidChanged(t),this.dispatchEvent(new Event("invalidchange")),this.requestUpdate&&this.requestUpdate("invalid",e))}get validationStates(){return this._validationStates}set validationStates(t){const e=this._validationStates;e!==t&&(this._validationStates=t,this.dispatchEvent(new CustomEvent("validationstateschange",{composed:!0,detail:{value:t}})),this.requestUpdate&&this.requestUpdate("validationStates",e))}get oninvalid(){return this._oninvalid}set oninvalid(t){this._oninvalid&&this.removeEventListener("invalidchange",this._oninvalid),"function"==typeof t?(this._oninvalid=t,this.addEventListener("invalidchange",t)):this._oninvalid=null}constructor(){super(),this.invalid=!1,this.validator=void 0}_invalidChanged(t){t?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")}validate(t){const e=this._getValidity(t);return this.invalid=!e,e}_getValidity(t){const{_validator:e}=this;if(e&&e.length){let i=!0;const o=[];return e.forEach((e=>{const s=function(t,e){const i=e,{message:o}=e,{nodeName:s}=i,n=s&&s.toLowerCase()||i.constructor.is;let r;return r=!!e.validate(t),{validator:n,message:o,valid:r}}(t,e);s.valid||(i=!1),o.push(s)})),this.validationStates=o,i}return!0}})),Vt=ht((t=>{class e extends(Dt(t)){static get properties(){return{checked:{type:Boolean,reflect:!0},toggles:{type:Boolean},name:{type:String},value:{type:String},required:{type:Boolean},disabled:{type:Boolean,reflect:!0}}}get required(){return this._required||!1}set required(t){const e=this._required;e!==t&&(this._required=t,this.requestUpdate&&this.requestUpdate("required",e),this._requiredChanged(t))}get value(){return this._value||!1}set value(t){const e=this._value;e!==t&&(this._value=t,this.requestUpdate&&this.requestUpdate("value",e),this._valueChanged(t))}get checked(){return this._checked||!1}set checked(t){const e=this._checked;e!==t&&(this._checked=t,this.requestUpdate&&this.requestUpdate("checked",e),this._checkedChanged(t))}get oncheckedchange(){return this._oncheckedchange||null}set oncheckedchange(t){const e=this._oncheckedchange;e!==t&&(e&&this.removeEventListener("checkedchange",e),"function"!=typeof t?this._oncheckedchange=null:(this._oncheckedchange=t,this.addEventListener("checkedchange",t)))}constructor(){super(),this.value="on",this.disabled=!1}_getValidity(){return this.disabled||!this.required||this.checked}_requiredChanged(t){t?this.setAttribute("aria-required","true"):this.removeAttribute("aria-required")}_checkedChanged(t){this.active=t,this.dispatchEvent(new CustomEvent("checkedchange"))}_valueChanged(t){null==t&&(this.value="on")}}return e}));class Ft extends(pt(ut(Vt(ot)))){get styles(){return Mt}render(){const{checked:t,invalid:e,indeterminate:i}=this;return V`<style>${this.styles}</style>
      <div class="checkboxContainer">
        <div class="checkbox ${this._computeCheckboxClass(t,e)}">
          <div class="checkmark ${this._computeCheckmarkClass(t,i)}"></div>
        </div>
      </div>
      <label class="checkboxLabel"><slot></slot></label>`}static get formAssociated(){return!0}get form(){return this._internals&&this._internals.form}get onchange(){return this._onchange||null}set onchange(t){const e=this._onchange;e!==t&&(e&&this.removeEventListener("change",e),"function"!=typeof t?this._onchange=null:(this._onchange=t,this.addEventListener("change",t)))}static get properties(){return{ariaActiveAttribute:{type:String},indeterminate:{type:Boolean,reflect:!0},formDisabled:{type:Boolean,reflect:!0}}}constructor(){super(),this.ariaActiveAttribute="aria-checked",this.checked=!1,this._hasIronCheckedElementBehavior=!0,this.attachInternals&&(this._internals=this.attachInternals())}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","checkbox"),super.connectedCallback&&super.connectedCallback(),this.hasAttribute("aria-checked")||this.setAttribute("aria-checked","false"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}_computeCheckboxClass(t,e){let i="";return t&&(i+="checked "),e&&(i+="invalid"),i.trim()}_computeCheckmarkClass(t,e){return!t&&e||t?"":"hidden"}_buttonStateChanged(){this.disabled||this.indeterminate||(this.checked=this.active)}_clickHandler(){this.disabled||(this.indeterminate&&(this.indeterminate=!1),this.active=!this.active,this.dispatchEvent(new Event("change")))}_checkedChanged(t){super._checkedChanged(t),this.indeterminate&&(this.indeterminate=!1),this.setAttribute("aria-checked",t?"true":"false"),this._internals?(this._internals.setFormValue(t?this.value:""),this.matches(":disabled")||!this.hasAttribute("required")||t?this._internals.setValidity({}):this._internals.setValidity({customError:!0},"This field is required.")):this.validate(this.checked)}_spaceKeyDownHandler(t){this.indeterminate&&(this.indeterminate=!1),super._spaceKeyDownHandler(t)}checkValidity(){return this._internals?this._internals.checkValidity():!this.required||this.checked}formDisabledCallback(t){this.formDisabled=t}formResetCallback(){this.checked=!1,this._internals.setFormValue("")}formStateRestoreCallback(t){this._internals.setFormValue(t),this.checked=!!t}}let Ut=0;const qt=ht((t=>{class e extends(Dt(ut(t))){static get formAssociated(){return!0}get form(){return this._internals&&this._internals.form||null}get value(){return this._value}set value(t){const e=this._value;e!==t&&(this._value=t,this.requestUpdate&&this.requestUpdate("value",e),this._internals&&this._internals.setFormValue(t),this.dispatchEvent(new CustomEvent("valuechange",{detail:{value:t}})))}get hasValidationMessage(){return this._hasValidationMessage}get _hasValidationMessage(){return this.__hasValidationMessage}set _hasValidationMessage(t){const e=this.__hasValidationMessage;e!==t&&(this.__hasValidationMessage=t,this.requestUpdate&&this.requestUpdate("hasValidationMessage",e),this.__hasValidationMessage=t,this.dispatchEvent(new CustomEvent("hasvalidationmessagechange",{detail:{value:t}})))}get autofocus(){return this._autofocus}set autofocus(t){const e=this._autofocus;e!==t&&(this._autofocus=t,this.requestUpdate&&this.requestUpdate("autofocus",e),this._autofocusChanged(t))}get autoValidate(){return this._autoValidate}set autoValidate(t){this._autoValidate!==t&&(this._autoValidate=t,this._autoValidateChanged(t))}get invalidMessage(){return this._invalidMessage}set invalidMessage(t){const e=this._invalidMessage;e!==t&&(this._invalidMessage=t,this.requestUpdate&&this.requestUpdate("invalidMessage",e),this._hasValidationMessage=this.invalid&&!!t)}get _patternRegExp(){let t;return t=this.allowedPattern?new RegExp(this.allowedPattern):"number"===this.type?/[0-9.,e-]/:void 0,t}get inputElement(){return this.shadowRoot.querySelector("input,textarea")}static get properties(){return{value:{notify:!0},preventInvalidInput:{type:Boolean},allowedPattern:{type:String},type:{type:String},list:{type:String},pattern:{type:String},required:{type:Boolean},invalidMessage:{type:String},infoMessage:{type:String},_hasValidationMessage:{type:Boolean},autoValidate:{type:Boolean},validator:{type:String},autocomplete:{type:String},autofocus:{type:Boolean},inputMode:{type:String},minLength:{type:Number},maxLength:{type:Number},min:{type:String},max:{type:String},step:{type:String},name:{type:String},placeholder:{type:String},readOnly:{type:Boolean},size:{type:Number},spellcheck:{type:String},autocorrect:{type:String},results:{type:Number},accept:{type:String},multiple:{type:Boolean},_ariaLabelledBy:{type:String},outlined:{type:Boolean,reflect:!0},anypoint:{type:Boolean,reflect:!0},noLabelFloat:{type:Boolean,reflect:!0}}}constructor(){super(),this.autoValidate=!1,this.autocomplete="off",this.autocorrect="off",this.type=void 0,this.required=void 0,this.minLength=void 0,this.maxLength=void 0,this.allowedPattern=void 0,this._ariaLabelledBy="",this._previousValidInput="",this._patternAlreadyChecked=!1,this.preventInvalidInput=!1,this._onKeydown=this._onKeydown.bind(this),this._validationStatesHandler=this._validationStatesHandler.bind(this),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.attachInternals&&(this._internals=this.attachInternals())}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addEventListener("keydown",this._onKeydown),this.addEventListener("validationstateschange",this._validationStatesHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("keydown",this._onKeydown),this.removeEventListener("validationstateschange",this._validationStatesHandler)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.value=""}formStateRestoreCallback(t){this.value=t}firstUpdated(){this._updateAriaLabelledBy()}checkValidity(){return this._getValidity(this.value)&&(this._internals&&this._internals.checkValidity()||!0)}_invalidChanged(t){super._invalidChanged(t),this._hasValidationMessage=t&&!!this.invalidMessage,this._ensureInvalidAlertSate(t)}_ensureInvalidAlertSate(t){if(!this.invalidMessage)return;const e=this.shadowRoot.querySelector("p.invalid");e&&(t?e.setAttribute("role","alert"):e.removeAttribute("role"),setTimeout((()=>{e.removeAttribute("role")}),1e3))}_focusBlurHandler(t){if(super._focusBlurHandler(t),this.focused&&!this._shiftTabPressed){const{type:t,inputElement:e}=this;if(!e)return;e.focus();const{value:i}=e;if(i&&("text"===t||void 0===t)){const t=i.length;e.selectionStart=t,e.selectionEnd=t}}"blur"===t.type&&this.autoValidate&&this.validate()}_onKeydown(t){if(t.isComposing||229===t.keyCode)return;if("Tab"===t.key&&t.shiftKey)return void this._onShiftTabDown(t);const{type:e,preventInvalidInput:i}=this;if(!i||-1!==["number","file"].indexOf(e))return;const o=this._patternRegExp;if(!o)return;if(t.metaKey||t.ctrlKey||"Backspace"===t.key)return;this._patternAlreadyChecked=!0;const s=t.key;(function(t){const e=8===t.keyCode||9===t.keyCode||13===t.keyCode||27===t.keyCode,i=19===t.keyCode||20===t.keyCode||45===t.keyCode||46===t.keyCode||144===t.keyCode||145===t.keyCode||t.keyCode>32&&t.keyCode<41||t.keyCode>111&&t.keyCode<124;return!(e||0===t.charCode&&i)})(t)&&!o.test(s)&&(t.preventDefault(),this._announceInvalidCharacter(`Invalid character ${s} not entered.`))}_onShiftTabDown(t){if(t.target!==this)return;const e=this.getAttribute("tabindex");this._shiftTabPressed=!0,this.setAttribute("tabindex","-1"),setTimeout((()=>{this.setAttribute("tabindex",e),this._shiftTabPressed=!1}),1)}_autoValidateChanged(t){t&&this.validate()}updateValueAndPreserveCaret(t){const e=this.inputElement;try{const i=e.selectionStart;this.value=t,e.value=t,e.selectionStart=i,e.selectionEnd=i}catch(e){this.value=t}}_updateAriaLabelledBy(){const t=this.shadowRoot.querySelector('slot[name="label"]').assignedNodes();if(!t.length)return;let e,i;for(let i=0;i<t.length;i++)if(t[i].nodeType===Node.ELEMENT_NODE){e=t[i];break}e?(e.id?i=e.id:(i="anypoint-input-label-"+Ut++,e.id=i),this._ariaLabelledBy=i):this._ariaLabelledBy=""}_onChange(t){this.shadowRoot&&this.dispatchEvent(new CustomEvent(t.type,{detail:{sourceEvent:t},bubbles:t.bubbles,cancelable:t.cancelable}))}_onInput(t){let{value:e}=t.target,i=!0;!this.preventInvalidInput&&!this.allowedPattern||this._patternAlreadyChecked||(i=this._checkPatternValidity(e),i||(this._announceInvalidCharacter("Invalid string of characters entered."),e=this._previousValidInput)),this._patternAlreadyChecked=!1,this._previousValidInput=e;const o="file"!==t.target.type;o&&t.target.value!==e&&(t.target.value=e),o&&(this.value=e),this.autoValidate&&this.validate()}_checkPatternValidity(t){if(!t)return!0;const e=this._patternRegExp;if(!e)return!0;const i=String(t);for(let t=0;t<i.length;t++)if(!e.test(i[t]))return!1;return!0}_announceInvalidCharacter(t){this.dispatchEvent(new CustomEvent("iron-announce",{detail:{text:t},bubbles:!0,composed:!0}))}_autofocusChanged(t){if(t&&this.inputElement){const{activeElement:t}=document;t instanceof HTMLElement&&t!==document.body&&t!==document.documentElement||this.inputElement.focus()}}validate(){if(!this.inputElement)return this.invalid=!1,!0;let t=this._checkInputValidity();return t&&(this.required&&""===this.value?t=!1:this.validator&&(t=super.validate(this.value))),this.invalid=!t,t}_checkInputValidity(){const{type:t,required:e,value:i}=this;let o=!e||!!e&&!(null==i||""===i);if(!o)return o;if("file"===t)return!0;if(o=this.inputElement.checkValidity(),!o)return o;if(o=this._checkPatternValidity(i),!o)return o;const s=String(i),{minLength:n,maxLength:r}=this;return!(n&&s.length<n||r&&s.length>r)}_validationStatesHandler(t){const{value:e}=t.detail,i=!(!e||!e.length);if(this._hasValidationMessage=i,!i)return;const o=[];for(let t=0,i=e.length;t<i;t++)e[t].valid||(o[o.length]=e[t].message);this.invalidMessage=o.join(". ")}}return e}));et`
  :host {
    /* Default size of an <input> */
    width: 200px;
    display: block;
    text-align: left;
    cursor: default;
    outline: none;
    height: var(--anypoint-input-height, 56px);
    box-sizing: border-box;
    font-size: var(--anypoint-input-size, 1rem);
    position: relative;
    /* Anypoint UI controls margin in forms */
    margin: 20px 8px;
  }

  .hidden {
    display: none !important;
  }

  :host([disabled]) .input-container {
    opacity: var(--anypoint-input-disabled-opacity, 0.43);
    border-bottom: 1px dashed
      var(--anypoint-input-border-color, var(--secondary-text-color));
  }

  .input-container {
    display: inline-flex;
    flex-direction: row;
    align-items: center;

    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--anypoint-input-background-color, #f5f5f5);

    border: 1px var(--anypoint-input-border-color, transparent) solid;
    border-radius: 4px 4px 0 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--anypoint-input-border-bottom-color, #8e8e8e);
    transition: border-bottom-color 0.22s linear;
    transform-origin: center center;

    cursor: text;
  }

  :host([focused]) .input-container {
    border-bottom-color: var(
      --anypoint-input-focused-border-bottom-color,
      var(--accent-color)
    );
  }

  :host([invalid]) .input-container {
    border-bottom-color: var(
      --anypoint-input-error-color,
      var(--error-color)
    ) !important;
  }

  .input-label {
    position: relative;
    height: 100%;
    flex: 1;

    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }

  .label {
    position: absolute;
    transition: transform 0.12s ease-in-out, max-width 0.12s ease-in-out;
    will-change: top;
    border-radius: 3px;
    margin: 0;
    padding: 0;
    left: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 1;
    will-change: transform;
    max-width: calc(100% - 16px);
    text-overflow: clip;
    color: var(--anypoint-input-label-color, #616161);
    transform-origin: left top;
  }

  :host([invalid]) .label {
    color: var(--anypoint-input-error-color, var(--error-color)) !important;
  }

  .input-element {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 7px 8px 0 8px;
    box-sizing: border-box;
    color: var(--anypoint-input-input-color, inherit);
    font-size: 1rem;
    box-shadow: none;
  }

  .label.resting {
    top: calc(100% / 2 - 8px);
  }

  .label.floating {
    transform: translateY(-80%) scale(0.75);
    max-width: calc(100% + 20%);
  }

  .assistive-info {
    overflow: hidden;
    height: var(--anypoint-input-assistive-height, 20px);
  }

  .invalid,
  .info {
    padding: 0;
    margin: 0 0 0 8px;
    font-size: 0.875rem;
    transition: transform 0.12s ease-in-out;
  }

  .info {
    color: var(--anypoint-input-info-message-color, #616161);
  }

  .info.label-hidden {
    transform: translateY(-200%);
  }

  .invalid {
    color: var(--anypoint-input-error-color, var(--error-color));
  }

  .invalid.label-hidden,
  .invalid.info-offset.label-hidden {
    transform: translateY(-200%);
  }

  .invalid.info-offset {
    transform: translateY(-1.2rem);
  }

  .prefixes,
  .suffixes {
    display: flex;
    align-items: center;
  }

  /* Outlined theme */
  :host([outlined]) .input-container {
    border: 1px var(--anypoint-input-border-color, #8e8e8e) solid;
    background-color: var(--anypoint-input-background-color, #fff);
    border-radius: 4px;
    transition: border-bottom-color 0.22s linear;
  }

  :host([outlined]) .input-element {
    padding-top: 0px;
  }

  :host([outlined]) .label.resting {
    margin-top: 0;
    top: calc(100% / 2 - 8px);
  }

  :host([outlined]) .label.floating {
    // background-color: var(--anypoint-input-label-background-color, white);
    transform: translateY(-125%) scale(0.75);
    max-width: 120%;
    padding: 0 2px;
    left: 6px;
  }

  :host([outlined]) .label.floating.with-prefix {
    left: -22px;
  }

  /* Anypoint theme */

  :host([anypoint]) {
    height: 40px;
    margin-top: 25px;
  }

  :host([anypoint]) .input-container {
    border: none;
    border-left: 2px var(--anypoint-input-border-color, #8e8e8e) solid;
    border-right: 2px var(--anypoint-input-border-color, #8e8e8e) solid;
    border-radius: 0;
    box-sizing: border-box;
  }

  :host([anypoint]) .label.anypoint {
    top: -22px;
  }

  :host([anypoint][focused]) .input-container,
  :host([anypoint]:hover) .input-container {
    border-left-color: var(--anypoint-input-anypoint-focus-border-color, var(--anypoint-input-compatibility-focus-border-color, #58595a));
    border-right-color: var(--anypoint-input-anypoint-focus-border-color, var(--anypoint-input-compatibility-focus-border-color, #58595a));
    background-color: var(--anypoint-input-anypoint-focus-background-color, var(--anypoint-input-compatibility-focus-background-color, #f9fafb));
  }

  :host([anypoint][invalid]) .input-container {
    border-left-color: var(--anypoint-input-error-color, var(--error-color));
    border-right-color: var(--anypoint-input-error-color, var(--error-color));
  }

  :host([anypoint]) .input-element {
    padding: 0 10px;
  }

  :host([anypoint]) .label {
    font-size: 0.935rem;
    left: -2px;
    top: -18px;
    transform: none;
    font-weight: 500;
    color: var(--anypoint-input-anypoint-label-color, #616161);
  }

  :host([anypoint]) .label.with-prefix {
    left: -34px;
  }

  :host([anypoint]) .invalid,
  :host([anypoint]) .info {
    margin-left: 0px;
  }

  :host([nolabelfloat][anypoint]) {
    margin-top: 0px;
  }

  :host([nolabelfloat][anypoint]) .label.resting {
    top: calc(100% / 2 - 8px);
    left: 10px;
  }

  /* No label float */
  :host([nolabelfloat]) .input-element {
    padding-top: 0px;
  }
`,qt(ot);const $t=t=>F`<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">${t}</svg>`,Kt=($t(F`<path d="M8.002 11.352L3.501 4.924l1.027-.276 3.473 4.96 3.471-4.959 1.027.275-4.497 6.428z"></path>`),$t(F`<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>`));$t(F`<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>`),$t(F`<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>`),window.customElements.define("anypoint-icon-button",class extends Rt{get styles(){return Ht}get _ripple(){return this.shadowRoot.querySelector("material-ripple")}render(){return V`<style>${this.styles}</style>
    <div class="icon">
      <slot></slot>
      <material-ripple class="circle" center .noink="${this.noink}" @transitionend="${this._transitionEndHandler}"></material-ripple>
    </div> `}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),super.connectedCallback&&super.connectedCallback()}_spaceKeyDownHandler(t){super._spaceKeyDownHandler(t),this._enterDownHandler()}_spaceKeyUpHandler(t){super._spaceKeyUpHandler(t),this._enterUpHandler()}_buttonStateChanged(){this._calculateElevation()}_keyDownHandler(t){super._keyDownHandler(t),Bt(t)&&this._enterDownHandler()}_keyUpHandler(t){super._keyUpHandler(t),Bt(t)&&this._enterUpHandler()}_enterDownHandler(){this._calculateElevation();const{_ripple:t}=this;t.animating||t.down()}_enterUpHandler(){this._calculateElevation(),this._ripple.up()}}),qt(ot),V`<svg viewBox="0 0 16 16">
  <path d="M11.605 3.086L6.898 9.803 4.311 7.991 3.164 9.629l4.225 2.959 5.657-8.073c-.396-.554-.884-1.037-1.441-1.429z"></path>
</svg>`,V`<svg viewBox="0 0 16 16">
  <path d="M13.289 3.418c-.218-.252-.455-.489-.707-.707L8 7.293 3.418 2.711c-.252.218-.489.455-.707.707L7.293 8l-4.582 4.582c.218.252.455.489.707.707L8 8.707l4.582 4.582c.252-.218.489-.455.707-.707L8.707 8l4.582-4.582z"></path>
</svg>`,et`
:host {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 48px;
  margin: 0 12px;
}

:host([disabled]) {
  pointer-events: none;
  opacity: 0.54;
}

:host(:focus) {
  outline:none;
}

.toggle-container {
  position: relative;
}

.track {
  background-color: var(--anypoint-switch-color, #000);
  border: 1px var(--anypoint-switch-color, #000) solid;
  opacity: .38;

  box-sizing: border-box;
  width: 32px;
  height: 14px;
  border-radius: 7px;
  transition: opacity 90ms cubic-bezier(.4,0,.2,1),
    background-color 90ms cubic-bezier(.4,0,.2,1),
    border-color 90ms cubic-bezier(.4,0,.2,1);
}

.button {
  background-color: var(--anypoint-switch-button-color, #fff);
  border: 10px var(--anypoint-switch-button-color, #fff) solid;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
    0 2px 2px 0 rgba(0,0,0,.14),
    0 1px 5px 0 rgba(0,0,0,.12);
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;

  transition: background-color 90ms cubic-bezier(.4,0,.2,1),
    border-color 90ms cubic-bezier(.4,0,.2,1);
}

.button:before {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 0;
  background-color: var(--anypoint-switch-color, #000);
}

.toggle-container {
  position: absolute;
  left: -18px;
  right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  transform: translateX(0);
  cursor: pointer;
  transition: transform 90ms cubic-bezier(.4,0,.2,1);
}

.label {
  margin-left: 10px;
  cursor: default;
}

.toggle-container:hover .button:before {
  opacity: .04;
}

:host(:focus) .button:before {
  opacity: .12;
}

:host([checked]) .button:before {
  background-color: var(--anypoint-switch-active-color, var(--primary-color));
}

:host([checked]) .track {
  opacity: .54;
  background-color: var(--anypoint-switch-active-color, var(--primary-color));
  border: 1px var(--anypoint-switch-active-color, var(--primary-color)) solid;
}

:host([checked]) .button {
  background-color: var(--anypoint-switch-active-color, var(--primary-color));
  border: 10px var(--anypoint-switch-active-color, var(--primary-color)) solid;
}

:host([checked]) .toggle-container {
  transform: translateX(20px);
}

:host([anypoint]) {
  height: 36px;
}

.anypoint.container {
  width: 64px;
  height: 36px;
  overflow: hidden;
  border-radius: 28px;
}

.anypoint .tracker {
  background: var(--anypoint-switch-background-color, var(--anypoint-color-aluminum2));
  height: 100%;
  width: inherit;
  position: relative;
}

:host(:focus) .tracker {
  background: var(--anypoint-switch-focus-background-color, var(--anypoint-color-aluminum3));
}

.anypoint .tracker:before {
  position: absolute;
  content: "";
  background-color: var(--anypoint-switch-tracker-background-color, var(--anypoint-color-steel2));
  height: 2px;
  top: calc(50% - 2px);
  left: 15%;
  right: 15%;
}

.anypoint .toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10%;
  left: 5%;
  width: 28px;
  height: 28px;
  background: var(--anypoint-switch-toggle-background-color, var(--anypoint-color-aluminum3));
  border-radius: 100%;
  cursor: pointer;
  transition: background-color .15s, transform .15s ease-out;
}

:host(:focus) .anypoint .toggle {
  background: var(--anypoint-switch-toggle-focus-background-color, var(--anypoint-color-aluminum4));
}

.anypoint .icon {
  display: block;
  height: 16px;
  width: 16px;
  fill: var(--anypoint-switch-toggle-icon-color, currentColor);
}

:host([checked]) .anypoint .toggle {
  background-color: var(--anypoint-switch-toggle-checked-background-color, var(--anypoint-color-robustBlue2));
  color: #fff;
  transform: translateX(28px);
}`,pt(ut(Vt(ot)));class Xt{constructor(t){this.multi=!1,this.selection=[],this.selectCallback=t}get(){return this.multi?this.selection.slice():this.selection[0]}clear(t){this.selection.slice().forEach((e=>{t&&-1!==t.indexOf(e)||this.setItemSelected(e,!1)}))}isSelected(t){return this.selection.indexOf(t)>=0}setItemSelected(t,e){if(null!==t&&e!==this.isSelected(t)){if(e)this.selection.push(t);else{const e=this.selection.indexOf(t);e>=0&&this.selection.splice(e,1)}this.selectCallback&&this.selectCallback(t,e)}}select(t){this.multi?this.toggle(t):this.get()!==t&&(this.setItemSelected(this.get(),!1),this.setItemSelected(t,!0))}toggle(t){this.setItemSelected(t,!this.isSelected(t))}}const Wt={template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1},jt=Element.prototype,Yt=jt.matches||jt.matchesSelector||jt.mozMatchesSelector||jt.msMatchesSelector||jt.oMatchesSelector||jt.webkitMatchesSelector,Zt=(t,e)=>Yt.call(t,e),Gt=t=>!Wt[t.localName],Qt=ht((t=>class extends t{static get properties(){return{attrForSelected:{type:String},selected:{},_selectedItem:{type:Object},activateEvent:{type:String},selectable:{type:String},selectedClass:{type:String},selectedAttribute:{type:String},fallbackSelection:{},items:{type:Array}}}get attrForSelected(){return this._attrForSelected}set attrForSelected(t){this._attrForSelected!==t&&(this._attrForSelected=t,this._updateAttrForSelected())}get selected(){return this._selected}set selected(t){this._selected!==t&&(this._selected=t,this.requestUpdate&&this.requestUpdate("selected",t),this._updateSelected(),this.dispatchEvent(new Event("selectedchange")))}get items(){return this._items}get _items(){return this.__items}set _items(t){this.__items!==t&&(this.__items=t,this.requestUpdate&&this.requestUpdate("_items",t),this.dispatchEvent(new Event("itemschange")))}get selectedItem(){return this._selectedItem}get _selectedItem(){return this.__selectedItem}set _selectedItem(t){this.__selectedItem!==t&&(this.__selectedItem=t,this.requestUpdate&&this.requestUpdate("_selectedItem",t),this.dispatchEvent(new Event("selecteditemchange")))}get activateEvent(){return this._activateEvent}set activateEvent(t){const e=this._activateEvent;e!==t&&(this._activateEvent=t,this._activateEventChanged(t,e))}get fallbackSelection(){return this._fallbackSelection}set fallbackSelection(t){this._fallbackSelection!==t&&(this._fallbackSelection=t,this._checkFallback())}get onselectedchange(){return this._onselectedchange}set onselectedchange(t){this._registerCallback("selectedchange",t)}get onselected(){return this._onselected}set onselected(t){this._registerCallback("selected",t)}get onselecteditemchange(){return this._onselecteditemchange}set onselecteditemchange(t){this._registerCallback("selecteditemchange",t)}get onitemschange(){return this._onitemschange}set onitemschange(t){this._registerCallback("itemschange",t)}get onselect(){return this._onselect}set onselect(t){this._registerCallback("select",t)}get ondeselect(){return this._ondeselect}set ondeselect(t){this._registerCallback("deselect",t)}get onactivate(){return this._onactivate}set onactivate(t){this._registerCallback("activate",t)}constructor(){super(),this.attrForSelected=null,this.fallbackSelection=null,this.selectedAttribute=null,this.selectable=null,this.selectedClass="selected",this.activateEvent="click",this._items=[],this._activateHandler=this._activateHandler.bind(this),this._selection=new Xt(this._applySelection.bind(this)),this._mutationHandler=this._mutationHandler.bind(this),this._slotchangeHandler=this._slotchangeHandler.bind(this),this._onselectedchange=null,this._onselecteditemchange=null,this._onitemschange=null,this._onselected=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._observer=this._observeItems(),this._observeSlotItems(),this._updateItems(),this._updateSelected()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._observer&&(this._observer.disconnect(),this._observer=null),this._removeListener(this.activateEvent),this._unobserveSlotItems()}_registerCallback(t,e){const i=`_on${t}`;this[i]&&this.removeEventListener(t,this[i]),"function"==typeof e?(this[i]=e,this.addEventListener(t,e)):this[i]=null}_addListener(t){this.addEventListener(t,this._activateHandler)}_removeListener(t){this.removeEventListener(t,this._activateHandler)}_observeItems(){const t=new MutationObserver(this._mutationHandler);return t.observe(this,{attributes:!0,childList:!0,subtree:!1}),t}_observeSlotItems(){const t=this.querySelectorAll("slot");for(let e=0,i=t.length;e<i;e++)t[e].addEventListener("slotchange",this._slotchangeHandler)}_unobserveSlotItems(){const t=this.querySelectorAll("slot");for(let e=0,i=t.length;e<i;e++)t[e].removeEventListener("slotchange",this._slotchangeHandler)}_checkRemovedSlot(t){for(let e=0,i=t.length;e<i;e++)"slot"===t[e].localName&&t[e].removeEventListener("slotchange",this._slotchangeHandler)}_slotchangeHandler(){this._updateItems(),this._updateSelected()}_mutationHandler(t){this._updateItems(),this._updateSelected();for(const e of t)"childList"===e.type&&this._checkRemovedSlot(e.removedNodes);const e={bubbles:!0,composed:!0,detail:t};this.dispatchEvent(new CustomEvent("childrenchange",e))}indexOf(t){return this.items?this.items.indexOf(t):-1}select(t){this.selected=t}selectPrevious(){const{length:t}=this.items;let e=t-1;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))-1+t)%t),this.selected=this._indexToValue(e)}selectNext(){let t=0;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(t)}selectIndex(t){this.select(this._indexToValue(t))}_checkFallback(){this._updateSelected()}_activateEventChanged(t,e){this._removeListener(e),this._addListener(t)}_updateItems(){let t=this._queryDistributedElements(this.selectable||"*");t=t.filter(Gt),this._items=t}_queryDistributedElements(t){const e=Array.from(this.children);for(let t=0;t<e.length;t++){const i=e[t];if("slot"===i.localName){const o=i.assignedElements({flatten:!0});e.splice(t,1,...o)}}for(let i=e.length-1;i>=0;i--){const o=e[i];o.nodeType===Node.ELEMENT_NODE&&Zt(o,t)||e.splice(i,1)}return e}_updateAttrForSelected(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))}_updateSelected(){this._selectSelected(this.selected)}_selectSelected(t){if(!this.items)return;const e=this._valueToItem(t);e?this._selection.select(e):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}_valueToItem(t){return null===t?null:this.items[this._valueToIndex(t)]}_valueToIndex(t){if(this.attrForSelected)for(let e=0,i=this.items.length;e<i;e++){const i=this.items[e];if(this._valueForItem(i)===t)return e}return Number(t)}_indexToValue(t){if(this.attrForSelected){const e=this.items[t];if(e)return this._valueForItem(e)}return t}_valueForItem(t){if(!t)return null;if(!this.attrForSelected){const e=this.indexOf(t);return-1===e?null:e}const e=this.attrForSelected,i=t[e.indexOf("-")<0?e:e.replace(/-[a-z]/g,(t=>t[1].toUpperCase()))];return void 0!==i?i:t.getAttribute(this.attrForSelected)}_applySelection(t,e){const{selectedClass:i,selectedAttribute:o}=this;var s,n;i&&(s=i,n=t,e?n.classList.add(s):n.classList.remove(s)),o&&(e?t.setAttribute(o,""):t.removeAttribute(o)),this._selectionChange();const r={bubbles:!0,composed:!0,detail:{item:t}},a=e?"select":"deselect";this.dispatchEvent(new CustomEvent(a,r))}_selectionChange(){this._selectedItem=this._selection.get()}_activateHandler(t){let e=t.target;const{items:i}=this;for(;e&&e!==this;){const t=i.indexOf(e);if(t>=0){const i=this._indexToValue(t);return void this._itemActivate(i,e)}e=e.parentNode}}_itemActivate(t,e){const i=new CustomEvent("activate",{cancelable:!0,bubbles:!0,composed:!0,detail:{selected:t,item:e}});this.dispatchEvent(i),i.defaultPrevented||(this.select(t),this.dispatchEvent(new Event("selected",{bubbles:!0,composed:!0})))}})),Jt=ht((t=>{class e extends(Qt(t)){static get properties(){return{multi:{type:Boolean},selectedValues:{type:Array},_selectedItems:{type:Array}}}get multi(){return this._multi}set multi(t){this._multi!==t&&(this._multi=t,this._multiChanged(t))}get selectedValues(){return this._selectedValues}set selectedValues(t){this._selectedValues!==t&&(this._selectedValues=t,this._updateSelected(),this.dispatchEvent(new Event("selectedvalueschange")))}get selectedItems(){return this._selectedItems}get _selectedItems(){return this.__selectedItems}set _selectedItems(t){this.__selectedItems!==t&&(this.__selectedItems=t,this.dispatchEvent(new Event("selecteditemschange")))}get onselectedvalueschange(){return this._onselectedvalueschange}set onselectedvalueschange(t){const e="selectedvalueschange";this._onselectedvalueschange&&this.removeEventListener(e,this._onselectedvalueschange),"function"==typeof t?(this._onselectedvalueschange=t,this.addEventListener(e,t)):this._onselectedvalueschange=null}get onselecteditemschange(){return this._onselecteditemschange}set onselecteditemschange(t){const e="selecteditemschange";this._onselecteditemschange&&this.removeEventListener(e,this._onselecteditemschange),"function"==typeof t?(this._onselecteditemschange=t,this.addEventListener(e,t)):this._onselecteditemschange=null}constructor(){super(),this.multi=!1,this._selectedValues=[],this._selectedItems=[],this._onselectedvalueschange=null,this._onselecteditemschange=null}select(t){this.multi?this._toggleSelected(t):this.selected=t}multiChanged(t){this._multiChanged(t)}_multiChanged(t){this._selection.multi=t,this._updateSelected()}_updateAttrForSelected(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map((t=>this._indexToValue(this.indexOf(t)))).filter((t=>null!==t))):super._updateAttrForSelected()}_updateSelected(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)}_selectMulti(t=[]){const e=(this._valuesToItems(t)||[]).filter((t=>null!=t));this._selection.clear(e);for(let t=0;t<e.length;t++)this._selection.setItemSelected(e[t],!0);const{fallbackSelection:i}=this;i&&!this._selection.get().length&&this._valueToItem(i)&&this.select(i)}_selectionChange(){const t=this._selection.get();this.multi?(this._selectedItems=t,this._selectedItem=t.length?t[0]:null):null!=t?(this._selectedItems=[t],this._selectedItem=t):(this._selectedItems=[],this._selectedItem=null)}_toggleSelected(t){const e=this.selectedValues.indexOf(t),i=e<0,o=this.selectedValues;i?o.push(t):o.splice(e,1),this.selectedValues=[...o]}_valuesToItems(t){return null===t?null:t.map((t=>this._valueToItem(t)))}}return e})),te=["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],ee=ht((t=>{class e extends(Jt(t)){static get properties(){return{_focusedItem:{type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean},_previousTabIndex:{type:Number},useAriaSelected:{type:Boolean},highlightAriaSelected:{type:Boolean}}}get focusedItem(){return this._focusedItem}get _focusedItem(){return this.__focusedItem}set _focusedItem(t){const e=this.__focusedItem;e!==t&&(this.__focusedItem=t,this._focusedItemChanged(t,e))}get disabled(){return this._disabled}set disabled(t){this._disabled!==t&&(this._disabled=t,this.requestUpdate&&this.requestUpdate("disabled",t),this._disabledChanged(t))}get highlightedItem(){return this.__highlighteditem}get __highlighteditem(){return this.__highlighteditemvalue||null}set __highlighteditem(t){const e=this.__highlighteditemvalue;if(e===t)return;this.__highlighteditemvalue=t;const i=this.highlightAriaSelected;e&&(e.classList.remove("highlight"),i&&e.setAttribute("aria-selected","false")),t&&(t.classList.add("highlight"),i&&t.setAttribute("aria-selected","true"))}constructor(){super(),this._previousTabIndex=0,this.useAriaSelected=!1,this.highlightAriaSelected=!1,this.attrForItemTitle=void 0,this._onFocus=this._onFocus.bind(this),this._onKeydown=this._onKeydown.bind(this),this._onItemsChanged=this._onItemsChanged.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","menu"),this.addEventListener("focus",this._onFocus),this.addEventListener("keydown",this._onKeydown),this.addEventListener("childrenchange",this._onItemsChanged),void 0===this._disabled&&(this.disabled=!1),this._resetTabindices()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("focus",this._onFocus),this.removeEventListener("keydown",this._onKeydown),this.removeEventListener("childrenchange",this._onItemsChanged)}_multiChanged(t){super._multiChanged(t),t?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")}_onItemsChanged(t){const e=t.detail;for(const t of e)"childList"===t.type&&t.addedNodes.length&&this._resetTabindices()}_onKeydown(t){"ArrowDown"===t.code?this._onDownKey(t):"ArrowUp"===t.code?this._onUpKey(t):"Tab"===t.code&&t.shiftKey?this._onShiftTabDown():"Escape"===t.code?this._onEscKey():this._focusWithKeyboardEvent(t),t.stopPropagation()}_onUpKey(t){this.focusPrevious(),t.preventDefault()}_onDownKey(t){t.preventDefault(),t.stopPropagation(),this.focusNext()}_onEscKey(){const{focusedItem:t}=this;t&&t.blur()}_focusWithKeyboardEvent(t){if(te.includes(t.code))return;this._clearSearchTextDebouncer&&(clearTimeout(this._clearSearchTextDebouncer),this._clearSearchTextDebouncer=void 0);let e=this._searchText||"";e+=(t.key&&1===t.key.length?t.key:String.fromCharCode(t.keyCode)).toLocaleLowerCase();const i=e.length;for(let t=0,o=this.items.length;t<o;t++){const o=this.items[t];if(o.hasAttribute("disabled"))continue;const s=this.attrForItemTitle||"textContent",n=(o[s]||o.getAttribute(s)||"").trim();if(!(n.length<i)&&n.slice(0,i).toLocaleLowerCase()===e){this._focusedItem=o;break}}this._searchText=e,this._clearSearchTextDebouncer=setTimeout((()=>this._clearSearchText()),1e3)}_clearSearchText(){this._searchText=""}_resetTabindices(){const t=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem,e=this.useAriaSelected;this.items.forEach((i=>{if(i.setAttribute("tabindex",i===t?"0":"-1"),e){const t=this._selection.isSelected(i);i.setAttribute("aria-selected",String(t))}}))}select(t){const e=this._valueToItem(t);e&&e.hasAttribute("disabled")||(this._focusedItem=e,super.select(t))}focusPrevious(){const{length:t}=this.items,e=Number(this.indexOf(this.focusedItem));for(let i=1;i<t+1;i++){const o=this.items[(e-i+t)%t];if(!o.hasAttribute("disabled")){const t=o.getRootNode&&o.getRootNode()||document;if(this._focusedItem=o,t.activeElement===o)return}}}_focusPrevious(){this.focusPrevious()}focusNext(){const{length:t}=this.items,e=Number(this.indexOf(this.focusedItem));for(let i=1;i<t+1;i++){const o=this.items[(e+i)%t];if(!o.hasAttribute("disabled")){const t=o.getRootNode&&o.getRootNode()||document;if(this._focusedItem=o,t.activeElement===o)return}}}_focusNext(){this.focusNext()}highlightNext(){const{items:t}=this,{length:e}=t;if(!e)return;let i=Number(this.indexOf(this.highlightedItem));-1===i&&(i=Number(this.indexOf(this.focusedItem)));for(let o=1;o<e+1;o++){const s=t[(i+o)%e];if(!s.hasAttribute("disabled")){this.__highlighteditem=s;break}}}highlightPrevious(){const{items:t}=this,{length:e}=t;if(!e)return;let i=Number(this.indexOf(this.highlightedItem));-1===i&&(i=Number(this.indexOf(this.focusedItem))),-1===i&&(i=0);for(let t=1;t<e+1;t++){const o=this.items[(i-t+e)%e];if(!o.hasAttribute("disabled")){this.__highlighteditem=o;break}}}_applySelection(t,e){this.useAriaSelected&&(e?t.setAttribute("aria-selected","true"):t.setAttribute("aria-selected","false")),super._applySelection(t,e)}_focusedItemChanged(t,e){e&&e.setAttribute("tabindex","-1"),!t||t.hasAttribute("disabled")||this.disabled||(t.setAttribute("tabindex","0"),t.focus())}_onShiftTabDown(){const t=this.getAttribute("tabindex");this._shiftTabPressed=!0,this._focusedItem=null,this.setAttribute("tabindex","-1"),setTimeout((()=>{this.setAttribute("tabindex",t),this._shiftTabPressed=!1}),1)}_onFocus(t){if(this._shiftTabPressed)return;let e=t.composedPath&&t.composedPath();e||(e=t.path);const i=e[0];if(i!==this&&void 0!==i.tabIndex&&!this.contains(i))return;const o=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._focusedItem=null,o?this._focusedItem=o:this.items.length&&this._focusNext()}_activateHandler(t){super._activateHandler(t),t.stopPropagation()}_disabledChanged(t){t?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",String(this._previousTabIndex))}}return e}));let ie=1;class oe extends(ee(ot)){get styles(){return et`
      :host {
        display: block;
        padding: var(--anypoint-listbox-padding, 0);
        background-color: var(
          --anypoint-listbox-background-color,
          var(--primary-background-color)
        );
        color: var(--anypoint-listbox-color, var(--primary-text-color));
      }

      :host ::slotted(.selected) {
        font-weight: 700;
      }
    `}render(){return V`<style>${this.styles}</style><slot></slot>`}static get properties(){return{anypoint:{type:Boolean,reflect:!0}}}get anypoint(){return this._anypoint}set anypoint(t){this._anypoint!==t&&(this._anypoint=t,this._updateChildrenAnypoint(t))}constructor(){super(),this._selectHandler=this._selectHandler.bind(this),this._deselectHandler=this._deselectHandler.bind(this)}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","listbox"),this.setAttribute("aria-activedescendant",""),super.connectedCallback&&super.connectedCallback(),this.addEventListener("select",this._selectHandler),this.addEventListener("deselect",this._deselectHandler),this._initSelection()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("select",this._selectHandler),this.removeEventListener("deselect",this._deselectHandler)}firstUpdated(){const{anypoint:t}=this;t&&this._updateChildrenAnypoint(t)}_initSelection(){this.selectedItem&&this._setActiveDescendant(this.selectedItem)}_selectHandler(t){const{item:e}=t.detail;this._setActiveDescendant(e)}_setActiveDescendant(t){(t=>{t.id||(t.id=`anypointlistbox-${ie}`,ie++)})(t),this.setAttribute("aria-activedescendant",t.id)}_deselectHandler(){this.setAttribute("aria-activedescendant","")}_updateChildrenAnypoint(t){const e=this.shadowRoot.querySelector("slot");if(!e)return;const i=e.assignedNodes();for(let e=0,o=i.length;e<o;e++){const o=i[e];o.nodeType===Node.ELEMENT_NODE&&(t?o.setAttribute("anypoint",""):o.removeAttribute("anypoint"))}}}Jt(ot);const se=ht((t=>class extends t{static get properties(){return{sizingTarget:{type:Object},fitInto:{type:Object},noOverlap:{type:Boolean},positionTarget:{type:Object},horizontalAlign:{type:String},verticalAlign:{type:String},dynamicAlign:{type:Boolean},horizontalOffset:{type:Number,reflect:!0},verticalOffset:{type:Number,reflect:!0},autoFitOnAttach:{type:Boolean,reflect:!0},_fitInfo:{type:Object},fitPositionTarget:{type:Boolean}}}get _fitWidth(){let t;return t=this.fitInto===window?this.fitInto.innerWidth:this.fitInto.getBoundingClientRect().width,t}get _fitHeight(){let t;return t=this.fitInto===window?this.fitInto.innerHeight:this.fitInto.getBoundingClientRect().height,t}get _fitLeft(){let t;return t=this.fitInto===window?0:this.fitInto.getBoundingClientRect().left,t}get _fitTop(){let t;return t=this.fitInto===window?0:this.fitInto.getBoundingClientRect().top,t}get _defaultPositionTarget(){let t=this.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(t=t.host),t}get _localeHorizontalAlign(){if(this._isRTL){if("right"===this.horizontalAlign)return"left";if("left"===this.horizontalAlign)return"right"}return this.horizontalAlign}get __shouldPosition(){return(this.horizontalAlign||this.verticalAlign)&&this.positionTarget}constructor(){super(),this.horizontalAlign=void 0,this.verticalAlign=void 0,this.noOverlap=void 0,this.dynamicAlign=void 0,this.sizingTarget=this,this.fitInto=window,this.horizontalOffset=0,this.verticalOffset=0,this.autoFitOnAttach=!1,this.fitPositionTarget=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),void 0===this._isRTL&&(this._isRTL="rtl"===window.getComputedStyle(this).direction),this.positionTarget=this.positionTarget||this._defaultPositionTarget,this.autoFitOnAttach&&setTimeout((()=>this.fit()))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.__deferredFit&&(clearTimeout(this.__deferredFit),this.__deferredFit=null)}fit(){this.position(),this.constrain(),this.center()}_discoverInfo(){if(this._fitInfo)return;const t=window.getComputedStyle(this),e=window.getComputedStyle(this.sizingTarget);let i,o;i="auto"!==t.top?"top":"auto"!==t.bottom?"bottom":null,o="auto"!==t.left?"left":"auto"!==t.right?"right":null,this._fitInfo={inlineStyle:{top:this.style.top||"",left:this.style.left||"",position:this.style.position||""},sizerInlineStyle:{maxWidth:this.sizingTarget.style.maxWidth||"",maxHeight:this.sizingTarget.style.maxHeight||"",boxSizing:this.sizingTarget.style.boxSizing||""},positionedBy:{vertically:i,horizontally:o},sizedBy:{height:"none"!==e.maxHeight,width:"none"!==e.maxWidth,minWidth:parseInt(e.minWidth,10)||0,minHeight:parseInt(e.minHeight,10)||0},margin:{top:parseInt(t.marginTop,10)||0,right:parseInt(t.marginRight,10)||0,bottom:parseInt(t.marginBottom,10)||0,left:parseInt(t.marginLeft,10)||0}}}resetFit(){const{_fitInfo:t}=this;t&&t.sizerInlineStyle&&Object.keys(t.sizerInlineStyle).forEach((e=>{this.sizingTarget.style[e]=t.sizerInlineStyle[e]})),t&&t.inlineStyle&&Object.keys(t.inlineStyle).forEach((e=>{this.style[e]=t.inlineStyle[e]})),this._fitInfo=null}refit(){const{scrollLeft:t}=this.sizingTarget,{scrollTop:e}=this.sizingTarget;this.resetFit(),this.fit(),this.sizingTarget.scrollLeft=t,this.sizingTarget.scrollTop=e}position(){if(!this.__shouldPosition)return;this._discoverInfo(),this.style.position="fixed",this.sizingTarget.style.boxSizing="border-box",this.style.left="0px",this.style.top="0px";const t=this.getBoundingClientRect(),e=this.__getNormalizedRect(this.positionTarget),i=this.__getNormalizedRect(this.fitInto),{margin:o}=this._fitInfo,s={width:t.width+o.left+o.right,height:t.height+o.top+o.bottom},n=this.__getPosition(this._localeHorizontalAlign,this.verticalAlign,s,t,e,i);let r=n.left+o.left,a=n.top+o.top;const l=Math.min(i.right-o.right,r+t.width),c=Math.min(i.bottom-o.bottom,a+t.height);r=Math.max(i.left+o.left,Math.min(r,l-this._fitInfo.sizedBy.minWidth)),a=Math.max(i.top+o.top,Math.min(a,c-this._fitInfo.sizedBy.minHeight)),this.fitPositionTarget?(this.sizingTarget.style.maxWidth=`${Math.max(l-r,this._fitInfo.sizedBy.minWidth,e.width)}px`,this.style.width=this.sizingTarget.style.maxWidth):this.sizingTarget.style.maxWidth=`${Math.max(l-r,this._fitInfo.sizedBy.minWidth)}px`,this.sizingTarget.style.maxHeight=`${Math.max(c-a,this._fitInfo.sizedBy.minHeight)}px`,this.style.left=r-t.left+"px",this.style.top=a-t.top+"px"}constrain(){if(this.__shouldPosition)return;this._discoverInfo();const t=this._fitInfo;t.positionedBy.vertically||(this.style.position="fixed",this.style.top="0px"),t.positionedBy.horizontally||(this.style.position="fixed",this.style.left="0px"),this.sizingTarget.style.boxSizing="border-box";const e=this.getBoundingClientRect();t.sizedBy.height||this.__sizeDimension(e,t.positionedBy.vertically,"top","bottom","Height"),t.sizedBy.width||this.__sizeDimension(e,t.positionedBy.horizontally,"left","right","Width")}__sizeDimension(t,e,i,o,s){const n=this._fitInfo,r=this.__getNormalizedRect(this.fitInto),a="Width"===s?r.width:r.height,l=e===o,c=l?a-t[o]:t[i],h=n.margin[l?i:o],d=`offset${s}`,p=this[d]-this.sizingTarget[d];this.sizingTarget.style[`max${s}`]=a-h-c-p+"px"}center(){if(this.__shouldPosition)return;this._discoverInfo();const{positionedBy:t}=this._fitInfo;if(t.vertically&&t.horizontally)return;this.style.position="fixed",t.vertically||(this.style.top="0px"),t.horizontally||(this.style.left="0px");const e=this.getBoundingClientRect(),i=this.__getNormalizedRect(this.fitInto);if(!t.vertically){const t=i.top-e.top+(i.height-e.height)/2;this.style.top=`${t}px`}if(!t.horizontally){const t=i.left-e.left+(i.width-e.width)/2;this.style.left=`${t}px`}}__getNormalizedRect(t){return t===document.documentElement||t===window?{top:0,left:0,width:window.innerWidth,height:window.innerHeight,right:window.innerWidth,bottom:window.innerHeight}:t.getBoundingClientRect()}__getOffscreenArea(t,e,i){const o=Math.min(0,t.top)+Math.min(0,i.bottom-(t.top+e.height)),s=Math.min(0,t.left)+Math.min(0,i.right-(t.left+e.width));return Math.abs(o)*e.width+Math.abs(s)*e.height}__getPosition(t,e,i,o,s,n){const r=[{verticalAlign:"top",horizontalAlign:"left",top:s.top+this.verticalOffset,left:s.left+this.horizontalOffset},{verticalAlign:"top",horizontalAlign:"right",top:s.top+this.verticalOffset,left:s.right-i.width-this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"left",top:s.bottom-i.height-this.verticalOffset,left:s.left+this.horizontalOffset},{verticalAlign:"bottom",horizontalAlign:"right",top:s.bottom-i.height-this.verticalOffset,left:s.right-i.width-this.horizontalOffset}];if(this.noOverlap){for(let t=0,e=r.length;t<e;t++){const e={},i=Object.keys(r[t]);for(let o=0,s=i.length;o<s;o++){const s=i[o];e[s]=r[t][s]}r.push(e)}r[0].top=r[1].top+=s.height,r[2].top=r[3].top-=s.height,r[4].left=r[6].left+=s.width,r[5].left=r[7].left-=s.width}let a;e="auto"===e?null:e,(t="auto"===t?null:t)&&"center"!==t||(r.push({verticalAlign:"top",horizontalAlign:"center",top:s.top+this.verticalOffset+(this.noOverlap?s.height:0),left:s.left-o.width/2+s.width/2+this.horizontalOffset}),r.push({verticalAlign:"bottom",horizontalAlign:"center",top:s.bottom-i.height-this.verticalOffset-(this.noOverlap?s.height:0),left:s.left-o.width/2+s.width/2+this.horizontalOffset})),e&&"middle"!==e||(r.push({verticalAlign:"middle",horizontalAlign:"left",top:s.top-o.height/2+s.height/2+this.verticalOffset,left:s.left+this.horizontalOffset+(this.noOverlap?s.width:0)}),r.push({verticalAlign:"middle",horizontalAlign:"right",top:s.top-o.height/2+s.height/2+this.verticalOffset,left:s.right-i.width-this.horizontalOffset-(this.noOverlap?s.width:0)})),"middle"===e&&"center"===t&&r.push({verticalAlign:"middle",horizontalAlign:"center",top:s.top-o.height/2+s.height/2+this.verticalOffset,left:s.left-o.width/2+s.width/2+this.horizontalOffset});for(let o=0;o<r.length;o++){const s=r[o],l=s.verticalAlign===e,c=s.horizontalAlign===t;if(!this.dynamicAlign&&!this.noOverlap&&l&&c){a=s;break}const h=(!e||l)&&(!t||c);if(!this.dynamicAlign&&!h)continue;if(s.offscreenArea=this.__getOffscreenArea(s,i,n),0===s.offscreenArea&&h){a=s;break}a=a||s;const d=s.offscreenArea-a.offscreenArea;(d<0||0===d&&(l||c))&&(a=s)}return a}})),ne=new Set,re=ht((t=>class extends t{get _parentResizable(){return this.__parentResizable}set _parentResizable(t){const e=this.__parentResizable;this.__parentResizable=t,e!==t&&this._parentResizableChanged(t)}get _notifyingDescendant(){return this.__notifyingDescendant}set _notifyingDescendant(t){this.__notifyingDescendant=t}constructor(){super(),this._interestedResizables=[],this._notifyingDescendant=!1,this._onIronRequestResizeNotifications=this._onIronRequestResizeNotifications.bind(this),this.notifyResize=this.notifyResize.bind(this),this._onDescendantIronResize=this._onDescendantIronResize.bind(this),this.addEventListener("requestresizenotifications",this._onIronRequestResizeNotifications,!0)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.isAttached=!0,setTimeout((()=>{this._requestResizeNotifications()}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.isAttached=!1,this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(ne.delete(this),window.removeEventListener("resize",this.notifyResize)),this._parentResizable=null}notifyResize(){this.isAttached&&(this._interestedResizables.forEach((t=>{this.resizerShouldNotify(t)&&this._notifyDescendant(t)})),this._fireResize())}assignParentResizable(t){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=t,t&&-1===t._interestedResizables.indexOf(this)&&(t._interestedResizables.push(this),t._subscribeIronResize(this))}stopResizeNotificationsFor(t){const e=this._interestedResizables.indexOf(t);e>-1&&(this._interestedResizables.splice(e,1),this._unsubscribeIronResize(t))}_subscribeIronResize(t){t.addEventListener("resize",this._onDescendantIronResize)}_unsubscribeIronResize(t){t.removeEventListener("resize",this._onDescendantIronResize)}resizerShouldNotify(t){return!0}_onDescendantIronResize(t){this._notifyingDescendant?t.stopPropagation():this._fireResize()}_fireResize(){this.dispatchEvent(new CustomEvent("resize"))}_onIronRequestResizeNotifications(t){let e;e=t.composedPath&&t.composedPath()||t.path||[];const i=e[0];i!==this&&(i.assignParentResizable(this),this._notifyDescendant(i),t.stopPropagation())}_parentResizableChanged(t){t&&window.removeEventListener("resize",this.notifyResize)}_notifyDescendant(t){this.isAttached&&(this._notifyingDescendant=!0,t.notifyResize(),this._notifyingDescendant=!1)}_requestResizeNotifications(){if(this.isAttached)if("loading"===document.readyState){const t=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function e(){document.removeEventListener("readystatechange",e),t()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((t=>{t!==this&&t._findParent()})):(ne.forEach((t=>{t!==this&&t._findParent()})),window.addEventListener("resize",this.notifyResize),this.notifyResize())}_findParent(){this.assignParentResizable(null),this.dispatchEvent(new CustomEvent("requestresizenotifications",{bubbles:!0,cancelable:!0,composed:!0})),this._parentResizable?ne.delete(this):ne.add(this)}})),ae=Element.prototype,le=ae.matches||ae.matchesSelector||ae.mozMatchesSelector||ae.msMatchesSelector||ae.oMatchesSelector||ae.webkitMatchesSelector,ce=new class{getTabbableNodes(t){const e=[];return this._collectTabbableNodes(t,e)?this._sortByTabIndex(e):e}isFocusable(t){return le.call(t,"input, select, textarea, button, object")?le.call(t,":not([disabled])"):le.call(t,"a[href], area[href], iframe, [tabindex], [contentEditable]")}isTabbable(t){return this.isFocusable(t)&&le.call(t,':not([tabindex="-1"])')&&this._isVisible(t)}_normalizedTabIndex(t){if(this.isFocusable(t)){const e=t.getAttribute("tabindex")||0;return Number(e)}return-1}_collectTabbableNodes(t,e){if(t.nodeType!==Node.ELEMENT_NODE)return!1;const i=t;if(-1!==e.indexOf(i))return!1;if(!this._isVisible(i))return!1;const o=this._normalizedTabIndex(i);let s,n=o>0;o>=0&&e.push(i),s="slot"===i.localName?i.assignedNodes().filter((t=>t.nodeType===Node.ELEMENT_NODE)):i.shadowRoot&&i.shadowRoot.querySelectorAll?i.shadowRoot.querySelectorAll("*"):i.children;for(let t=0;t<s.length;t++)n=this._collectTabbableNodes(s[t],e)||n;return n}_isVisible(t){let{style:e}=t;return"hidden"!==e.visibility&&"none"!==e.display&&(e=window.getComputedStyle(t),"hidden"!==e.visibility&&"none"!==e.display)}_sortByTabIndex(t){const e=t.length;if(e<2)return t;const i=Math.ceil(e/2),o=this._sortByTabIndex(t.slice(0,i)),s=this._sortByTabIndex(t.slice(i));return this._mergeSortByTabIndex(o,s)}_mergeSortByTabIndex(t,e){const i=[];for(;t.length>0&&e.length>0;)this._hasLowerTabOrder(t[0],e[0])?i.push(e.shift()):i.push(t.shift());return i.concat(t,e)}_hasLowerTabOrder(t,e){const i=Math.max(t.tabIndex,0),o=Math.max(e.tabIndex,0);return 0===i||0===o?o>i:i>o}};window.customElements.define("arc-overlay-backdrop",class extends ot{get styles(){return et`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--arc-overlay-backdrop-background-color,
        var(--iron-overlay-backdrop-background-color, #000));
      opacity: 0;
      transition: var(--arc-overlay-backdrop-transition, opacity 0.2s);
      pointer-events: none;
    }

    :host(.opened) {
      opacity: var(--arc-overlay-backdrop-opacity, var(--iron-overlay-backdrop-opacity, 0.6));
      pointer-events: auto;
    }`}static get properties(){return{opened:{type:Boolean,reflect:!0}}}get opened(){return this.__opened}set opened(t){this.__opened!==t&&(this.__opened=t,this._openedChanged(t))}constructor(){super(),this.opened=!1,this.__openedRaf=null,this._onTransitionend=this._onTransitionend.bind(this)}connectedCallback(){this.isAttached=!0,super.connectedCallback(),this.addEventListener("transitionend",this._onTransitionend,!0),this.opened&&this._openedChanged(this.opened)}disconnectedCallback(){this.isAttached=!1,super.disconnectedCallback(),this.removeEventListener("transitionend",this._onTransitionend)}prepare(){this.opened&&!this.parentNode&&document.body.appendChild(this)}open(){this.opened=!0}close(){this.opened=!1}complete(){this.opened||this.parentNode!==document.body||this.parentNode.removeChild(this)}_onTransitionend(t){t&&t.target===this&&this.complete()}_openedChanged(t){if(t)this.prepare();else{const t=window.getComputedStyle(this);"0s"!==t.transitionDuration&&"0"!==t.opacity||this.complete()}if(!this.isAttached)return;this.__openedRaf&&(window.cancelAnimationFrame(this.__openedRaf),this.__openedRaf=null);const{scrollTop:e}=this;this.scrollTop=void 0,this.scrollTop=e,this.__openedRaf=window.requestAnimationFrame((()=>{this.__openedRaf=null,this.toggleClass("opened",this.opened)}))}toggleClass(t,e){e?this.classList.contains(t)||this.classList.add(t):this.classList.contains(t)&&this.classList.remove(t)}render(){return V`<style>${this.styles}</style><slot></slot>`}});const he=new class{constructor(){this._overlays=[],this._minimumZ=101,this._backdropElement=null,document.documentElement.addEventListener("click",(()=>{})),document.addEventListener("click",this._onCaptureClick.bind(this),!0),document.addEventListener("focus",this._onCaptureFocus.bind(this),!0),document.addEventListener("keydown",this._onCaptureKeyDown.bind(this),!0)}get backdropElement(){return this._backdropElement||(this._backdropElement=document.createElement("arc-overlay-backdrop")),this._backdropElement}get deepActiveElement(){let t=document.activeElement;for(t&&t instanceof Element!=0||(t=document.body);t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}_bringOverlayAtIndexToFront(t){const e=this._overlays[t];if(!e)return;let i=this._overlays.length-1;const o=this._overlays[i];if(o&&this._shouldBeBehindOverlay(e,o)&&i--,t>=i)return;const s=Math.max(this.currentOverlayZ(),this._minimumZ);for(this._getZ(e)<=s&&this._applyOverlayZ(e,s);t<i;)this._overlays[t]=this._overlays[t+1],t++;this._overlays[i]=e}addOrRemoveOverlay(t){t.opened?this.addOverlay(t):this.removeOverlay(t)}addOverlay(t){const e=this._overlays.indexOf(t);if(e>=0)return this._bringOverlayAtIndexToFront(e),void this.trackBackdrop();let i=this._overlays.length;const o=this._overlays[i-1];let s=Math.max(this._getZ(o),this._minimumZ);const n=this._getZ(t);if(o&&this._shouldBeBehindOverlay(t,o)){this._applyOverlayZ(o,s),i--;const t=this._overlays[i-1];s=Math.max(this._getZ(t),this._minimumZ)}n<=s&&this._applyOverlayZ(t,s),this._overlays.splice(i,0,t),this.trackBackdrop()}removeOverlay(t){const e=this._overlays.indexOf(t);-1!==e&&(this._overlays.splice(e,1),this.trackBackdrop())}currentOverlay(){const t=this._overlays.length-1;return this._overlays[t]}currentOverlayZ(){return this._getZ(this.currentOverlay())}ensureMinimumZ(t){this._minimumZ=Math.max(this._minimumZ,t)}focusOverlay(){const t=this.currentOverlay();t&&t._applyFocus()}trackBackdrop(){const t=this._overlayWithBackdrop();(t||this._backdropElement)&&(this.backdropElement.style.zIndex=String(this._getZ(t)-1),this.backdropElement.opened=!!t,this.backdropElement.prepare())}getBackdrops(){const t=[];for(let e=0;e<this._overlays.length;e++)this._overlays[e].withBackdrop&&t.push(this._overlays[e]);return t}backdropZ(){return this._getZ(this._overlayWithBackdrop())-1}_overlayWithBackdrop(){for(let t=this._overlays.length-1;t>=0;t--)if(this._overlays[t].withBackdrop)return this._overlays[t]}_getZ(t){let e=this._minimumZ;if(t){const i=Number(t.style.zIndex||window.getComputedStyle(t).zIndex);Number.isNaN(i)||(e=i)}return e}_setZ(t,e){t.style.zIndex=String(e)}_applyOverlayZ(t,e){this._setZ(t,e+2)}_overlayInPath(t){t=t||[];for(let e=0;e<t.length;e++)if(t[e]._manager===this)return t[e]}_onCaptureClick(t){let e=this._overlays.length-1;if(-1===e)return;const i=t.composedPath&&t.composedPath()||t.path;let o;for(;(o=this._overlays[e])&&this._overlayInPath(i)!==o;)if(this._clickIsInsideOverlay(t,o))e--;else{if(o._onCaptureClick(t),!o.allowClickThrough)break;e--}}_clickIsInsideOverlay(t,e){const{clientX:i,clientY:o}=t,{top:s,left:n,right:r,bottom:a}=e.getBoundingClientRect();return!(i<n||i>r||o<s||o>a)}_onCaptureFocus(t){const e=this.currentOverlay();e&&e._onCaptureFocus(t)}_onCaptureKeyDown(t){const e=this.currentOverlay();e&&(this._keyboardEventMatchesKeys(t,"Escape")?e._onCaptureEsc(t):this._keyboardEventMatchesKeys(t,"Tab")&&e._onCaptureTab(t))}_keyboardEventMatchesKeys(t,e){return!(!t.key||t.key!==e)||!(!t.detail||t.detail.key!==e)}_shouldBeBehindOverlay(t,e){return!t.alwaysOnTop&&e.alwaysOnTop}},de={pageX:0,pageY:0};let pe=null,ue=[];const ge=["wheel","mousewheel","DOMMouseScroll","touchstart","touchmove"];let me,be;const ye=[];let fe=null,ve=null;function _e(t){if(t.cancelable&&function(t){const e=t.composedPath&&t.composedPath()||t.path,i=e[0];if("touchmove"!==t.type&&pe!==i&&(pe=i,ue=function(t){const e=[],i=t.indexOf(be);for(let o=0;o<=i;o++){if(t[o].nodeType!==Node.ELEMENT_NODE)continue;const i=t[o];let{style:s}=i;s.overflow.includes("scroll")||s.overflow.includes("auto")||(s=window.getComputedStyle(i)),(s.overflow.includes("scroll")||s.overflow.includes("auto"))&&e.push(i)}return e}(e)),!ue.length)return!0;if("touchstart"===t.type)return!1;const o=function(t){const e={deltaX:t.deltaX,deltaY:t.deltaY};if("deltaX"in t);else if("wheelDeltaX"in t&&"wheelDeltaY"in t)e.deltaX=-t.wheelDeltaX,e.deltaY=-t.wheelDeltaY;else if("wheelDelta"in t)e.deltaX=0,e.deltaY=-t.wheelDelta;else if("axis"in t)e.deltaX=1===t.axis?t.detail:0,e.deltaY=2===t.axis?t.detail:0;else if(t.targetTouches){const i=t.targetTouches[0];e.deltaX=de.pageX-i.pageX,e.deltaY=de.pageY-i.pageY}return e}(t);return!function(t,e,i){if(!e&&!i)return;const o=Math.abs(i)>=Math.abs(e);for(let s=0;s<t.length;s++){const n=t[s];let r=!1;if(r=o?i<0?n.scrollTop>0:n.scrollTop<n.scrollHeight-n.clientHeight:e<0?n.scrollLeft>0:n.scrollLeft<n.scrollWidth-n.clientWidth,r)return n}}(ue,o.deltaX,o.deltaY)}(t)&&t.preventDefault(),t.targetTouches){const e=t.targetTouches[0];de.pageX=e.pageX,de.pageY=e.pageY}}const we=ht((t=>{class e extends(se(re(t))){static get properties(){return{opened:{type:Boolean,reflect:!0},__canceled:{type:Boolean,reflect:!0,attribute:"canceled"},withBackdrop:{type:Boolean,reflect:!0},noAutoFocus:{type:Boolean,reflect:!0},noCancelOnEscKey:{type:Boolean,reflect:!0},noCancelOnOutsideClick:{type:Boolean,reflect:!0},closingReason:{type:Object},restoreFocusOnClose:{type:Boolean,reflect:!0},allowClickThrough:{type:Boolean,reflect:!0},alwaysOnTop:{type:Boolean,reflect:!0},scrollAction:{type:String,reflect:!0},_manager:{type:Object},_focusedChild:{type:Object}}}get opened(){return this._opened}set opened(t){const e=this._opened;t!==e&&(this._opened=t,this.requestUpdate&&this.requestUpdate("opened",e),this._openedChanged(t),this.__updateScrollObservers(this._isAttached,t,this.scrollAction),this.dispatchEvent(new CustomEvent("openedchange")),this.dispatchEvent(new CustomEvent("opened-changed",{detail:{value:t}})))}get canceled(){return this.__canceled}get _canceled(){return this.__canceled}set _canceled(t){t!==this.__canceled&&(this.__canceled=t,this._canceledChanged())}get withBackdrop(){return this._withBackdrop}set withBackdrop(t){const e=this._withBackdrop;t!==e&&(this._withBackdrop=t,this.requestUpdate&&this.requestUpdate("withBackdrop",e),this._withBackdropChanged())}get isAttached(){return this._isAttached}set isAttached(t){this._isAttached=t,this.__updateScrollObservers(t,this._opened,this.scrollAction)}get scrollAction(){return this._scrollAction}set scrollAction(t){this._scrollAction=t,this.__updateScrollObservers(this._isAttached,this._opened,t)}get backdropElement(){return this._manager.backdropElement}get _focusNode(){return this._focusedChild||this.querySelector("[autofocus]")||this}get _focusableNodes(){return ce.getTabbableNodes(this)}get onopenedchanged(){return this["_onopened-changed"]}set onopenedchanged(t){this._registerCallback("opened-changed",t)}get onoverlaycanceled(){return this["_onoverlay-canceled"]}set onoverlaycanceled(t){this._registerCallback("overlay-canceled",t)}get onoverlayopened(){return this["_onoverlay-opened"]}set onoverlayopened(t){this._registerCallback("overlay-opened",t)}get onoverlayclosed(){return this["_onoverlay-closed"]}set onoverlayclosed(t){this._registerCallback("overlay-closed",t)}get onopened(){return this._onopened}set onopened(t){this._registerCallback("opened",t)}get onclosed(){return this._onclosed}set onclosed(t){this._registerCallback("closed",t)}constructor(){super(),this._opened=!1,this._canceled=!1,this.noAutoFocus=!1,this.noCancelOnEscKey=!1,this.noCancelOnOutsideClick=!1,this.restoreFocusOnClose=!1,this._manager=he,this.__isAnimating=!1,this.__shouldRemoveTabIndex=!1,this.__firstFocusableNode=this.__lastFocusableNode=null,this.__rafs={},this.__restoreFocusNode=null,this.__scrollTop=this.__scrollLeft=null,this.__rootNodes=null,this._onIronResize=this._onIronResize.bind(this),this.__onCaptureScroll=this.__onCaptureScroll.bind(this),this._boundSchedule=this._boundSchedule.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("iron-resize",this._onIronResize),this._elementReady||(this._elementReady=!0,this.updateComplete?this.updateComplete.then((()=>{this._ensureSetup()})):this._ensureSetup()),this.opened&&this._openedChanged(this.opened),this._setupSlotListeners(),this._ensureAria()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("iron-resize",this._onIronResize),this._removeSlotListeners(),Object.keys(this.__rafs).forEach((t=>{null!==this.__rafs[t]&&cancelAnimationFrame(this.__rafs[t])})),this.__rafs={},this._manager.removeOverlay(this),this.__isAnimating&&(this.opened?this._finishRenderOpened():(this._applyFocus(),this._finishRenderClosed()))}_registerCallback(t,e){const i=`_on${t}`;this[i]&&this.removeEventListener(t,this[i]),"function"==typeof e?(this[i]=e,this.addEventListener(t,e)):this[i]=null}_setupSlotListeners(){const t=new MutationObserver((t=>{this._processMutations(t)}));this._childrenObserver=t,this._childrenObserver.observe(this,{childList:!0})}_removeSlotListeners(){this._unlistenSlots(this.children),this._childrenObserver.disconnect(),this._childrenObserver=null}_processMutations(t){if(t){for(let e=0;e<t.length;e++){const i=t[e];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}this._onNodesChange()}}_listenSlots(t){for(let e=0;e<t.length;e++){const i=t[e];"slot"===i.localName&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(t){for(let e=0;e<t.length;e++){const i=t[e];"slot"===i.localName&&i.removeEventListener("slotchange",this._boundSchedule)}}_boundSchedule(){setTimeout((()=>{this._onNodesChange()}))}toggle(){this._canceled=!1,this.opened=!this.opened}open(){this._canceled=!1,this.opened=!0}close(){this._canceled=!1,this.opened=!1}cancel(t){const e={cancelable:!0,bubbles:!0,composed:!0,detail:t};let i=new Event("cancel",{cancelable:!0,bubbles:!0});this.dispatchEvent(i),i.defaultPrevented||(i=new CustomEvent("overlay-canceled",e),this.dispatchEvent(i),i.defaultPrevented||(i=new CustomEvent("iron-overlay-canceled",e),this.dispatchEvent(i),i.defaultPrevented||(this._canceled=!0,this.opened=!1)))}invalidateTabbables(){this.__firstFocusableNode=this.__lastFocusableNode=null}_ensureSetup(){this._overlaySetup||(this._overlaySetup=!0,this.style.outline="none",this.style.display="none")}_openedChanged(t){this._ensureAria(t),this.isAttached&&(this.__isAnimating=!0,this.__deraf("__openedChanged",this.__openedChanged))}_ensureAria(t){void 0===t&&(t=this.opened),t?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")}_canceledChanged(){this.closingReason=this.closingReason||{},this.closingReason.canceled=this.canceled}_withBackdropChanged(){this.withBackdrop&&!this.hasAttribute("tabindex")?(this.setAttribute("tabindex","-1"),this.__shouldRemoveTabIndex=!0):this.__shouldRemoveTabIndex&&(this.removeAttribute("tabindex"),this.__shouldRemoveTabIndex=!1),this.opened&&this.isAttached&&this._manager.trackBackdrop()}_prepareRenderOpened(){this.__restoreFocusNode=this._manager.deepActiveElement,this._preparePositioning(),this.refit(),this._finishPositioning(),this.noAutoFocus&&document.activeElement===this._focusNode&&(this._focusNode.blur(),this.__restoreFocusNode.focus())}_renderOpened(){this._finishRenderOpened()}_renderClosed(){this._finishRenderClosed()}_finishRenderOpened(){this.notifyResize(),this.__isAnimating=!1;const t={bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("opened",t)),this.dispatchEvent(new CustomEvent("overlay-opened",t)),this.dispatchEvent(new CustomEvent("iron-overlay-opened",t))}_finishRenderClosed(){this.style.display="none",this.style.zIndex="",this.notifyResize(),this.__isAnimating=!1;const t={bubbles:!0,composed:!0,detail:this.closingReason};this.dispatchEvent(new CustomEvent("closed",t)),this.dispatchEvent(new CustomEvent("overlay-closed",t)),this.dispatchEvent(new CustomEvent("iron-overlay-closed",t))}_preparePositioning(){this.style.transition=this.style.webkitTransition="none",this.style.transform=this.style.webkitTransform="none",this.style.display=""}_finishPositioning(){this.style.display="none";let{scrollTop:t}=this;this.scrollTop=void 0,this.scrollTop=t,this.style.transition=this.style.webkitTransition="",this.style.transform=this.style.webkitTransform="",this.style.display="",t=this.scrollTop,this.scrollTop=void 0,this.scrollTop=t}_applyFocus(){if(this.opened)this.noAutoFocus||this._focusNode.focus();else{if(this.restoreFocusOnClose&&this.__restoreFocusNode){const t=this._manager.deepActiveElement;(t===document.body||this.shadowRoot.contains(t)||this.contains(t))&&this.__restoreFocusNode.focus()}this.__restoreFocusNode=null,this._focusNode.blur(),this._focusedChild=null}}_onCaptureClick(t){this.noCancelOnOutsideClick||this.cancel(t)}_onCaptureFocus(t){if(!this.withBackdrop)return;const e=t.composedPath&&t.composedPath()||t.path;-1===e.indexOf(this)?(t.stopPropagation(),this._applyFocus()):this._focusedChild=e[0]}_onCaptureEsc(t){this.noCancelOnEscKey||this.cancel(t)}_onCaptureTab(t){if(!this.withBackdrop)return;this.__ensureFirstLastFocusables();const e=t.shiftKey,i=e?this.__firstFocusableNode:this.__lastFocusableNode,o=e?this.__lastFocusableNode:this.__firstFocusableNode;let s=!1;if(i===o)s=!0;else{const t=this._manager.deepActiveElement;s=t===i||t===this}s&&(t.preventDefault(),this._focusedChild=o,this._applyFocus())}_onIronResize(){this.opened&&!this.__isAnimating&&this.__deraf("refit",this.refit)}_onNodesChange(){this.opened&&!this.__isAnimating&&(this.invalidateTabbables(),this.notifyResize())}__ensureFirstLastFocusables(){const t=this._focusableNodes;this.__firstFocusableNode=t[0],this.__lastFocusableNode=t[t.length-1]}__openedChanged(){this.opened?(this._prepareRenderOpened(),this._manager.addOverlay(this),this._applyFocus(),this._renderOpened()):(this._manager.removeOverlay(this),this._applyFocus(),this._renderClosed())}__deraf(t,e){const i=this.__rafs;null!==i[t]&&cancelAnimationFrame(i[t]),i[t]=requestAnimationFrame((()=>{i[t]=null,e.call(this)}))}__updateScrollObservers(t,e,i){t&&e&&this.__isValidScrollAction(i)?("lock"===i&&(this.__saveScrollPosition(),this,ye.indexOf(this)>=0||(0===ye.length&&function(){me=me||_e.bind(void 0);for(let t=0,e=ge.length;t<e;t++)document.addEventListener(ge[t],me,{capture:!0,passive:!1})}(),ye.push(this),be=ye[ye.length-1],fe=[],ve=[])),this.__addScrollListeners()):(function(t){const e=ye.indexOf(t);-1!==e&&(ye.splice(e,1),be=ye[ye.length-1],fe=[],ve=[],0===ye.length&&function(){for(let t=0,e=ge.length;t<e;t++)document.removeEventListener(ge[t],me,{capture:!0,passive:!1})}())}(this),this.__removeScrollListeners())}__addScrollListeners(){if(!this.__rootNodes){this.__rootNodes=[];let t=this;for(;t;)t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host&&this.__rootNodes.push(t),t=t.host||t.assignedSlot||t.parentNode;this.__rootNodes.push(document)}this.__rootNodes.forEach((t=>{t.addEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})}))}__removeScrollListeners(){this.__rootNodes&&this.__rootNodes.forEach((t=>{t.removeEventListener("scroll",this.__onCaptureScroll,{capture:!0,passive:!0})})),this.isAttached||(this.__rootNodes=null)}__isValidScrollAction(t){return"lock"===t||"refit"===t||"cancel"===t}__onCaptureScroll(t){if(!(this.__isAnimating||(t.composedPath&&t.composedPath()||t.path).indexOf(this)>=0))switch(this.scrollAction){case"lock":this.__restoreScrollPosition();break;case"refit":this.__deraf("refit",this.refit);break;case"cancel":this.cancel(t)}}__saveScrollPosition(){document.scrollingElement?(this.__scrollTop=document.scrollingElement.scrollTop,this.__scrollLeft=document.scrollingElement.scrollLeft):(this.__scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop),this.__scrollLeft=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft))}__restoreScrollPosition(){document.scrollingElement?(document.scrollingElement.scrollTop=this.__scrollTop,document.scrollingElement.scrollLeft=this.__scrollLeft):(document.documentElement.scrollTop=document.body.scrollTop=this.__scrollTop,document.documentElement.scrollLeft=document.body.scrollLeft=this.__scrollLeft)}}return e}));class xe extends(we(ut(ot))){get styles(){return et`
    :host {
      position: fixed;
    }

    .contentWrapper ::slotted(*) {
      overflow: auto;
    }

    .contentWrapper.animating ::slotted(*) {
      overflow: hidden;
      pointer-events: none;
    }
    `}static get properties(){return{openAnimationConfig:{type:Object},closeAnimationConfig:{type:Object},focusTarget:{type:Object},noAnimations:{type:Boolean},allowOutsideScroll:{type:Boolean},fitPositionTarget:{type:Boolean}}}get allowOutsideScroll(){return this._allowOutsideScroll}set allowOutsideScroll(t){this._allowOutsideScroll!==t&&(this._allowOutsideScroll=t,this._allowOutsideScrollChanged(t))}get positionTarget(){return this._positionTarget}set positionTarget(t){this._positionTarget!==t&&(this._positionTarget=t,this._updateOverlayPosition())}get verticalAlign(){return this._verticalAlign}set verticalAlign(t){this._verticalAlign!==t&&(this._verticalAlign=t,this._updateOverlayPosition())}get horizontalAlign(){return this._horizontalAlign}set horizontalAlign(t){this._horizontalAlign!==t&&(this._horizontalAlign=t,this._updateOverlayPosition())}get verticalOffset(){return this._verticalOffset}set verticalOffset(t){this._verticalOffset!==t&&(this._verticalOffset=t,this._updateOverlayPosition())}get horizontalOffset(){return this._horizontalOffset}set horizontalOffset(t){this._horizontalOffset!==t&&(this._horizontalOffset=t,this._updateOverlayPosition())}get containedElement(){const t=this.shadowRoot.querySelector("slot");if(!t)return null;const e=t.assignedNodes({flatten:!0});for(let t=0,i=e.length;t<i;t++)if(e[t].nodeType===Node.ELEMENT_NODE)return e[t];return null}get contentWrapper(){return this.shadowRoot.querySelector(".contentWrapper")}constructor(){super(),this.horizontalAlign="left",this.verticalAlign="top",this.noAnimations=!1,this.allowOutsideScroll=!1,this.openAnimationConfig=null,this.closeAnimationConfig=null}connectedCallback(){super.connectedCallback(),this.scrollAction||(this.scrollAction=this.allowOutsideScroll?"refit":"lock"),this._readied=!0}firstUpdated(){this.sizingTarget&&this.sizingTarget!==this||(this.sizingTarget=this.containedElement||this)}disconnectedCallback(){super.disconnectedCallback(),this.cancelAnimation()}_updateOverlayPosition(){this.isAttached&&this.notifyResize()}_openedChanged(t){t&&this.disabled?this.cancel():(this.cancelAnimation(),super._openedChanged(t))}_renderOpened(){this.noAnimations?super._renderOpened():(this.contentWrapper.classList.add("animating"),this.playAnimation("open"))}_renderClosed(){this.noAnimations?super._renderClosed():(this.contentWrapper.classList.add("animating"),this.playAnimation("close"))}_onAnimationFinish(){this._activeAnimations=void 0,this.contentWrapper.classList.remove("animating"),this.opened?this._finishRenderOpened():this._finishRenderClosed()}_allowOutsideScrollChanged(t){this._readied&&(t?this.scrollAction&&"lock"!==this.scrollAction||(this.scrollAction="refit"):this.scrollAction="lock")}_applyFocus(){const t=this.focusTarget||this.containedElement;t&&this.opened&&!this.noAutoFocus?t.focus():super._applyFocus()}playAnimation(t){if(void 0===window.KeyframeEffect)return void this._onAnimationFinish();const e=this.containedElement;let i,o;switch(this.verticalAlign){case"bottom":i="100%";break;case"middle":i="50%";break;default:i="0%"}this._setPrefixedProperty(e,"transformOrigin",`0% ${i}`),o="open"===t?this._configureStartAnimation(e,this.openAnimationConfig):this._configureEndAnimation(e,this.closeAnimationConfig),o&&o.length?this._activeAnimations=o:this._onAnimationFinish()}cancelAnimation(){this._activeAnimations&&(this._activeAnimations.forEach((t=>{t&&t.cancel&&t.cancel()})),this._activeAnimations=[])}_runEffects(t,e){const i=[];for(let o=0;o<e.length;o++){const s=e[o];try{this.__runAnimation(t,s,i)}catch(t){continue}}return i}__runAnimation(t,e,i){const o=t.animate(e.keyframes,e.timing);i[i.length]=o,o.onfinish=()=>{o.onfinish=null;const t=i.findIndex((t=>t===o));i.splice(t,1),i.length||this._onAnimationFinish()}}_configureStartAnimation(t,e){return void 0===window.KeyframeEffect?null:(e||(e=[{keyframes:[{transform:"scale(1, 0)"},{transform:"scale(1, 1)"}],timing:{delay:0,duration:200,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"both"}}]),this._runEffects(t,e))}_configureEndAnimation(t,e){return void 0===window.KeyframeEffect?null:(e||(e=[{keyframes:[{transform:"scale(1, 1)"},{transform:"scale(1, 0)"}],timing:{delay:0,duration:200,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"both"}}]),this._runEffects(t,e))}_setPrefixedProperty(t,e,i){const o={transform:["webkitTransform"],transformOrigin:["mozTransformOrigin","webkitTransformOrigin"]}[e];for(let e=0,s=o.length;e<s;e++){const s=o[e];t.style[s]=i}t.style[e]=i}render(){return V`<style>${this.styles}</style>
    <div class="contentWrapper">
      <slot name="dropdown-content"></slot>
    </div>
    `}}const ke=ht((t=>{class e extends(ee(t)){get _isRTL(){return"rtl"===window.getComputedStyle(this).direction}connectedCallback(){super.connectedCallback&&super.connectedCallback(),"menu"===this.getAttribute("role")&&this.setAttribute("role","menubar")}_onUpKey(t){this.focusedItem.click(),t.preventDefault()}_onDownKey(t){this.focusedItem.click(),t.preventDefault()}_onLeftKey(t){this._isRTL?this.focusNext():this.focusPrevious(),t.preventDefault()}_onRightKey(t){this._isRTL?this.focusPrevious():this.focusNext(),t.preventDefault()}_onKeydown(t){"ArrowLeft"===t.code?this._onLeftKey(t):"ArrowRight"===t.code?this._onRightKey(t):super._onKeydown(t)}}return e}));function Se(t){if(t.id)return;const e=Math.floor(1e5*Math.random()+1);t.id=`anypointAutocompleteInput${e}`}et`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    font-size: 1rem;
    font-weight: 500;
    overflow: hidden;
    user-select: none;
    /* NOTE: Both values are needed, since some phones require the value to be "transparent". */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  :host(:dir(rtl)) {
    flex-direction: row-reverse;
  }

  #tabsContainer {
    position: relative;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    flex: 1 1 auto;
  }
  
  #tabsContent {
    height: 100%;
    flex-basis: auto;
  }

  #tabsContent.scrollable {
    white-space: nowrap;
  }

  #tabsContent:not(.scrollable),
  #tabsContent.fit-container {
    display: flex;
    flex-direction: row;
  }

  #tabsContent.fit-container {
    min-width: 100%;
  }

  #tabsContent.fit-container > ::slotted(*) {
    /* IE - prevent tabs from compressing when they should scroll. */
    flex: 1 0 auto;
  }

  .hidden {
    display: none;
  }

  anypoint-icon-button {
    width: 40px;
    height: 40px;
    margin: 0 4px;
  }

  .icon {
    width: 24px;
    height: 24px;
    display: block;
    fill: currentColor;
  }

  #selectionBar {
    position: absolute;
    height: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 2px solid
      var(--anypoint-tabs-selection-bar-color, var(--accent-color));
    -webkit-transform: scale(0);
    transform: scale(0);
    transform-origin: left center;
    transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
    z-index: var(--anypoint-tabs-selection-bar-zindex);
  }

  :host([noslide]) #selectionBar {
    transition: none;
  }

  #selectionBar.align-bottom {
    top: 0;
    bottom: auto;
  }

  #selectionBar.expand {
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }

  #selectionBar.contract {
    transition-duration: 0.18s;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  #tabsContent > ::slotted(*) {
    height: 100%;
  }

  #tabsContent:not(.fit-container) > ::slotted(*) {
    flex: none;
  }

  :host([anypoint]) ::slotted(anypoint-tab) {
    text-transform: none;
  }
`,ke(re(ot)),window.customElements.define("anypoint-dropdown",xe),et`
:host {
  display: inline-block;
  position: relative;
  padding: 8px;
  outline: none;
}

:host([disabled]) {
  cursor: auto;
  color: var(--disabled-text-color);
}

.dropdown-content {
  box-shadow: var(--anypoint-menu-button-context-shadow, var(--anypoint-dropdown-shadow));
  position: relative;
  border-radius: var(--anypoint-menu-button-border-radius, 2px);
  background-color: var(--anypoint-menu-button-dropdown-background, var(--primary-background-color));
}

:host([verticalalign="top"]) .dropdown-content {
  margin-bottom: 20px;
  margin-top: -10px;
  top: 10px;
}

:host([verticalalign="bottom"]) .dropdown-content {
  bottom: 10px;
  margin-bottom: -10px;
  margin-top: 20px;
}

#trigger {
  cursor: pointer;
}

:host([anypoint]) .dropdown-content {
  box-shadow: none;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-top-color: var(--anypoint-menu-button-border-top-color, var(--anypoint-color-aluminum4));
  border-bottom-color: var(--anypoint-menu-button-border-bottom-color, var(--anypoint-color-aluminum4));
  border-top-style: solid;
  border-bottom-style: solid;
}
`,ut(ot),et`
  :host {
    /* Default size of an <input> */
    width: 200px;
    display: inline-block;
    position: relative;
    text-align: left;
    outline: none;
    height: 56px;
    box-sizing: border-box;
    font-size: 1rem;
    /* Anypoint UI controls margin in forms */
    margin: 16px 8px;
  }

  .hidden {
    display: none !important;
  }

  .trigger-button.form-disabled {
    pointer-events: none;
    opacity: var(--anypoint-dropdown-menu-disabled-opacity, 0.43);
  }

  .label.resting.form-disabled {
    opacity: var(--anypoint-dropdown-menu-disabled-opacity, 0.43);
  }

  :host([nolabelfloat]) {
    height: 40px;
  }

  .input-container {
    position: relative;
    height: 100%;
    /* width: inherit; */
    background-color: var(--anypoint-dropdown-menu-background-color, #f5f5f5);

    border: 1px var(--anypoint-dropdown-menu-border-color, transparent) solid;
    border-radius: 4px 4px 0 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(
      --anypoint-dropdown-menu-border-bottom-color,
      #8e8e8e
    );
    transition: border-bottom-color 0.22s linear;
    transform-origin: center center;

    cursor: default;
  }

  :host([invalid]) .input-container,
  :host(:invalid) .input-container {
    border-bottom: 1px solid
      var(--anypoint-dropdown-error-color, var(--error-color)) !important;
  }

  .input-container.form-disabled {
    opacity: var(--anypoint-dropdown-menu-disabled-opacity, 0.43);
    border-bottom: 1px dashed
      var(--anypoint-dropdown-menu-color, var(--secondary-text-color));
  }

  :host([opened]) .input-container,
  :host([focused]) .input-container,
  :host(:focus) .input-container {
    border-bottom-color: var(
      --anypoint-dropdown-menu-hover-border-color,
      var(--anypoint-color-coreBlue3)
    );
  }

  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    position: relative;
  }

  .input {
    flex: 1;
    margin: 12px 0px 0px 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: calc(100% - 40px);
  }

  :host(:dir(rtl)) .input {
    text-align: right;
    margin: 0px 8px 0px 0px;
  }

  :host([dir='rtl']) .input {
    text-align: right;
    margin: 12px 8px 0px 0px;
  }

  :host([nolabelfloat]) .input {
    margin-top: 0 !important;
  }

  .input-spacer {
    visibility: hidden;
    margin-left: -12px;
  }

  .label {
    position: absolute;
    transition: transform 0.12s ease-in-out, max-width 0.12s ease-in-out;
    will-change: transform;
    border-radius: 3px;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 1;
    max-width: calc(100% - 16px);
    text-overflow: clip;
    color: var(--anypoint-dropdown-menu-label-color, #616161);
    transform-origin: left top;
    left: 8px;
    top: calc(100% / 2 - 8px);
    font-size: 1rem;
  }

  :host(:dir(rtl)) .label {
    text-align: right;
    right: 8px;
    left: auto;
  }
  /* Not every browser support syntax above and for those who doesn't
  this style has to be repeated or it won't be applied. */
  :host([dir='rtl']) .label {
    text-align: right;
    right: 8px;
    left: auto;
    transform-origin: right top;
  }

  .label.resting {
    transform: translateY(0) scale(1);
  }

  .label.floating {
    transform: translateY(-80%) scale(0.75);
    max-width: calc(100% + 20%);
  }

  :host([nolabelfloat]:not([anypoint])) .label.floating {
    display: none !important;
  }

  :host([invalid]) .label,
  :host(:invalid) .label {
    color: var(--anypoint-dropdown-error-color, var(--error-color)) !important;
  }

  .trigger-icon {
    transform: rotate(0);
    transition: transform 0.12s ease-in-out;
    will-change: transform;
    color: var(--anypoint-dropdown-menu-label-color, #616161);
    fill: currentColor;
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  .trigger-icon.opened {
    transform: rotate(-180deg);
  }

  :host([opened]) .trigger-icon,
  :host([focused]) .trigger-icon,
  :host(:focus) .trigger-icon {
    color: var(
      --anypoint-dropdown-menu-trigger-icon-active-color,
      var(--primary-color)
    );
  }

  anypoint-dropdown {
    margin-top: 58px;
    width: auto;
  }

  .dropdown-content {
    box-shadow: var(--anypoint-dropdown-shadow, var(--anypoint-dropdown-shadow));
    border-radius: var(--anypoint-dropdown-border-radius);
  }

  :host([verticalalign='bottom']) anypoint-dropdown {
    margin-bottom: 56px;
    margin-top: auto;
  }

  :host([nolabelfloat]) anypoint-dropdown {
    margin-top: 40px;
  }

  .assistive-info {
    overflow: hidden;
    margin-top: -2px;
    height: 20px;
    position: absolute;
  }

  .invalid,
  .info {
    padding: 0;
    margin: 0 0 0 8px;
    font-size: 0.875rem;
    transition: transform 0.12s ease-in-out;
  }

  .info {
    color: var(--anypoint-dropdown-menu-info-message-color, #616161);
  }

  .info.label-hidden {
    transform: translateY(-200%);
  }

  .invalid {
    color: var(--anypoint-dropdown-menu-error-color, var(--error-color));
  }

  .invalid.label-hidden,
  .invalid.info-offset.label-hidden {
    transform: translateY(-200%);
  }

  .invalid.info-offset {
    transform: translateY(-100%);
  }

  /* Outlined theme */
  :host([outlined]) .input-container {
    border: 1px var(--anypoint-dropdown-menu-border-color, #8e8e8e) solid;
    background-color: var(--anypoint-dropdown-menu-background-color, #fff);
    border-radius: 4px;
    transition: border-bottom-color 0.22s linear;
  }

  :host([outlined]) .input {
    margin-top: 0;
  }

  :host([outlined]) .label.resting {
    margin-top: 0;
    top: calc(100% / 2 - 8px);
  }

  :host([outlined]) .label.floating {
    background-color: var(
      --anypoint-dropdown-menu-label-background-color,
      white
    );
    transform: translateY(-130%) scale(0.75);
    max-width: 120%;
    padding: 0 2px;
    left: 6px;
  }

  :host([outlined][invalid]) .input-container,
  :host([outlined]:invalid) .input-container {
    border: 1px solid var(--anypoint-dropdown-error-color, var(--error-color)) !important;
  }

  /* Anypoint theme */

  :host([anypoint]) {
    height: 40px;
    margin-top: 25px;
  }

  :host([anypoint]) .label.anypoint {
    top: -22px;
  }

  :host([anypoint]) .input-container {
    border: none;
    border-left: 2px var(--anypoint-dropdown-menu-border-color, #8e8e8e) solid;
    border-right: 2px var(--anypoint-dropdown-menu-border-color, #8e8e8e) solid;
    border-radius: 0;
    box-sizing: border-box;
  }

  :host([anypoint][focused]) .input-container,
  :host([anypoint]:hover) .input-container {
    border-left-color: var(--anypoint-dropdown-menu-anypoint-focus-border-color, var(--anypoint-dropdown-menu-compatibility-focus-border-color, #58595a));
    border-right-color: var(--anypoint-dropdown-menu-anypoint-focus-border-color, var(--anypoint-dropdown-menu-compatibility-focus-border-color, #58595a));
    background-color: var(--anypoint-dropdown-menu-anypoint-focus-background-color, var(--anypoint-dropdown-menu-compatibility-focus-background-color, #f9fafb));
  }

  :host([anypoint][invalid]) .input-container {
    border-left-color: var(
      --anypoint-dropdown-menu-error-color,
      var(--error-color)
    );
    border-right-color: var(
      --anypoint-dropdown-menu-error-color,
      var(--error-color)
    );
    border-bottom: none !important;
  }

  :host([anypoint]) .label {
    font-size: 0.875rem;
    left: -2px;
    top: -18px;
    transform: none;
    font-weight: 500;
    color: var(--anypoint-dropdown-menu-anypoint-label-color, var(--anypoint-dropdown-menu-compatibility-label-color, #616161));
  }

  :host([anypoint]) anypoint-dropdown {
    margin-top: 40px;
  }

  :host([anypoint]) .input {
    margin-top: 0;
  }

  :host([anypoint]) .invalid,
  :host([anypoint]) .info {
    margin-left: 0px;
  }

  :host([nolabelfloat][anypoint]) {
    margin-top: 0px;
  }

  :host([anypoint]) anypoint-dropdown {
    border-bottom: 2px var(--anypoint-dropdown-menu-border-color, #e0e0e0) solid;
    border-top: 2px var(--anypoint-dropdown-menu-border-color, #e0e0e0) solid;
  }

  :host([anypoint]) .dropdown-content {
    box-shadow: none;
  }

  :host([nolabelfloat][anypoint]) .label.resting {
    top: calc(100% / 2 - 8px);
    left: 10px;
    font-size: 1rem;
  }
`,Dt(ut(ot)),window.customElements.define("anypoint-item",yt),window.customElements.define("anypoint-item-body",class extends ot{get styles(){return et`
      :host {
        overflow: hidden; /* needed for text-overflow: ellipsis to work on ff */
        flex-direction: column;
        display: flex;
        justify-content: center;
        flex: 1;
        flex-basis: 0.000000001px;
      }

      :host([twoline]) {
        min-height: var(--anypoint-item-body-two-line-min-height, 72px);
      }

      :host([threeline]) {
        min-height: var(--anypoint-item-body-three-line-min-height, 88px);
      }

      :host > ::slotted(*) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host > ::slotted([secondary]),
      :host > ::slotted([data-secondary]) {
        font-size: var(--font-body-font-size);
        letter-spacing: var(--font-body-letter-spacing);
        font-weight: var(--font-body-font-weight);
        color: var(--anypoint-item-body-secondary-color, var(--secondary-text-color));
        margin-top: 4px;
      }

      :host([anypoint]:hover) > ::slotted([secondary]),
      :host([anypoint]:hover) > ::slotted([data-secondary]),
      .anypoint-item[anypoint]:hover > [secondary],
      .anypoint-item[anypoint]:hover > [data-secondary] {
        color: var(
          --anypoint-item-secondary-focus-color,
          var(--anypoint-item-focus-color,
            var(--anypoint-color-coreBlue3)
          )
        );

        border-left-color: var(
          --anypoint-item-border-left-hover-color,
          var(--anypoint-color-coreBlue3)
        );
        border-right-color: var(
          --anypoint-item-border-right-hover-color,
          var(--anypoint-color-coreBlue3)
        );
      }
    `}static get properties(){return{anypoint:{type:Boolean,reflect:!0},twoLine:{type:Boolean,reflect:!0},threeLine:{type:Boolean,reflect:!0}}}render(){return V`<style>${this.styles}</style><slot></slot>`}}),window.customElements.define("anypoint-listbox",oe);const Ce=Symbol("suggestionsValue"),Ee=Symbol("processSource"),Ae=Symbol("normalizeSource"),Te=Symbol("itemTemplate"),ze=Symbol("readLabelValue"),Ie=Symbol("openedValue"),Le=Symbol("openedValuePrivate"),Oe=Symbol("autocompleteFocus"),Ne=Symbol("ignoreNextFocus");window.customElements.define("anypoint-autocomplete",class extends ot{get styles(){return et`.highlight {
      font-weight: bold;
    }`}createRenderRoot(){return this}static get properties(){return{target:{},source:{type:Array},_suggestions:{type:Array},_loading:{type:Boolean},loader:{type:Boolean,reflect:!0},openOnFocus:{type:Boolean,reflect:!0},verticalAlign:{type:String,reflect:!0},verticalOffset:{type:Number,reflect:!0},horizontalAlign:{type:String,reflect:!0},horizontalOffset:{type:Number,reflect:!0},scrollAction:{type:String,reflect:!0},noAnimations:{type:Boolean,reflect:!0},anypoint:{type:Boolean,reflect:!0},noTargetControls:{type:Boolean,reflect:!0},noTargetValueUpdate:{type:Boolean,reflect:!0},fitPositionTarget:{type:Boolean},positionTarget:{type:Object},ignoreDropdownStyling:{type:Boolean},disabled:{type:Boolean}}}get target(){return this._target}set target(t){this._target!==t&&(this._target=t,this._targetChanged())}get suggestions(){return this._suggestions}get loading(){return this._loading}get _loading(){return this.__loading}set _loading(t){this.__loading!==t&&(this.__loading=t,this.requestUpdate("_loading",t),this.dispatchEvent(new CustomEvent("loadingchange",{detail:{value:t}})))}get source(){return this._source}set source(t){this._source!==t&&(this._source=t,this[Ce]=this[Ee](t),this[Ie]&&this._filterSuggestions(),this._loading&&(this._loading=!1))}get opened(){return this[Ie]}get[Ie](){return this[Le]||!1}set[Ie](t){this[Le]!==t&&(this[Le]=t,this.requestUpdate(),this._openedChanged(t),this.dispatchEvent(new CustomEvent("openedchange")))}get disabled(){return this._disabled}set disabled(t){const e=this._disabled;e!==t&&(this._disabled=t,this.requestUpdate("disabled",e),t&&this.opened&&(this[Ie]=!1))}get isAttached(){return this._isAttached}set isAttached(t){this._isAttached!==t&&(this._isAttached=t,this._targetChanged())}get _listbox(){return this.__listbox||(this.__listbox=this.querySelector("anypoint-listbox")),this.__listbox}get onquery(){return this._onquery}set onquery(t){this._onquery&&this.removeEventListener("query",this._onquery),"function"==typeof t?(this._onquery=t,this.addEventListener("query",t)):this._onquery=null}get onselected(){return this._onselected}set onselected(t){this._onselected&&this.removeEventListener("selected",this._onselected),"function"==typeof t?(this._onselected=t,this.addEventListener("selected",t)):this._onselected=null}constructor(){super(),this._targetInputHandler=this._targetInputHandler.bind(this),this._targetFocusHandler=this._targetFocusHandler.bind(this),this._targetKeydown=this._targetKeydown.bind(this),this._onCaptureClick=this._onCaptureClick.bind(this),this._suggestions=[],this._loading=!1,this.loader=!1,this.openOnFocus=!1,this[Ie]=!1,this.horizontalAlign="center",this.verticalAlign="top",this.scrollAction="refit",this.horizontalOffset=0,this.verticalOffset=2,this.noTargetControls=!1,this.noAnimations=!1,this.noTargetValueUpdate=!1,this.fitPositionTarget=!1,this.positionTarget=void 0,this.ignoreDropdownStyling=!1,this.disabled=!1,this.anypoint=void 0}connectedCallback(){super.connectedCallback&&super.connectedCallback(),Se(this),this.style.position="absolute",this.isAttached=!0,document.addEventListener("click",this._onCaptureClick)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.isAttached=!1,document.removeEventListener("click",this._onCaptureClick)}_onCaptureClick(t){let e=!0;const i=t.composedPath&&t.composedPath()||t.path;for(const t of i)if(t===this.target){e=!1;break}e&&this._closeHandler()}firstUpdated(){const t=this._listbox;Se(t),this.ignoreDropdownStyling||(t.style.backgroundColor="var(--anypoint-autocomplete-background-color, #fff)",t.style.boxShadow="var(--anypoint-autocomplete-dropdown-shadow)");const{id:e}=t;this.setAttribute("aria-owns",e),this.setAttribute("aria-controls",e);const i=this._oldTarget;i&&!this.noTargetControls&&i.setAttribute("aria-controls",e)}[Ee](t){if(!Array.isArray(t))return null;const e=[];return t.forEach(((t,i)=>{const o=this[Ae](t,i);o&&e.push(o)})),e}[Ae](t,e){return"string"==typeof t?{value:t,index:e}:t.value?{...t,index:e}:null}_targetChanged(){const{target:t,isAttached:e,_oldTarget:i}=this;if(i&&(i.removeEventListener("input",this._targetInputHandler),i.removeEventListener("focus",this._targetFocusHandler),i.removeEventListener("keydown",this._targetKeydown),this._oldTarget=null),t&&e)if(this.notifyResize(),"string"==typeof t){const e=this.parentElement;if(!e||!e.querySelector)return;const i=e.querySelector(`#${t}`);i&&(this.target=i)}else t&&(t.addEventListener("input",this._targetInputHandler),t.addEventListener("focus",this._targetFocusHandler),t.addEventListener("keydown",this._targetKeydown),this._setupTargetAria(t),this._oldTarget=t,t===document.activeElement&&this._targetFocusHandler())}_setComboboxWidth(){const{positionTarget:t,_oldTarget:e}=this,i=t||e,o=this._listbox;if(!i||!o||!i.nodeType||i.nodeType!==Node.ELEMENT_NODE)return;const s=i.getBoundingClientRect(),{width:n}=s;n&&(o.style.width=`${n}px`)}_setupTargetAria(t){Se(this),t.setAttribute("aria-autocomplete","list"),t.setAttribute("autocomplete","off"),t.setAttribute("aria-haspopup","true");const e=t.parentElement;e&&(e.setAttribute("role","combobox"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-owns",this.id),e.setAttribute("aria-haspopup","listbox"),e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")||e.setAttribute("aria-label","Text input with list suggestions"))}_openedChanged(t){const e=this._oldTarget,i=e&&e.parentElement;i&&i.setAttribute("aria-expanded",String(t))}_targetInputHandler(t){t.detail||this.disabled||this.renderSuggestions()}_targetFocusHandler(){!this.openOnFocus||this.opened||this[Oe]||this[Ne]||this.disabled||(this[Oe]=!0,setTimeout((()=>{this[Oe]=!1,this.renderSuggestions()})))}renderSuggestions(){if(!this.isAttached||this.disabled)return;let{value:t}=this._oldTarget;if(null==t&&(t=""),"string"!=typeof t&&(t=String(t)),this._previousQuery&&0===t.indexOf(this._previousQuery))return this._previousQuery=t,void this._filterSuggestions();this._listbox.selected=-1,this._dispatchQuery(t),this._previousQuery=t,this._filterSuggestions(),this.loader&&(this._loading=!0,this[Ie]||(this._setComboboxWidth(),this.notifyResize(),this[Ie]=!0))}_dispatchQuery(t){const e=new CustomEvent("query",{detail:{value:t}});return this.dispatchEvent(e),e}async _filterSuggestions(){if(!this._oldTarget||void 0===this._previousQuery)return;const t=(this._suggestions||[]).length;this._suggestions=[];const e=this[Ce];if(!e||!e.length)return void(this[Ie]=!1);const i=this._previousQuery?this._previousQuery.toLowerCase():"",o=this._listSuggestions(e,i);if(0===o.length)return void(this[Ie]=!1);o.sort(((t,e)=>{const o=String(t.value),s=String(e.value),n=o.toLowerCase(),r=s.toLowerCase(),a=n.indexOf(i),l=r.indexOf(i);return a===l?o.localeCompare(s):0===a&&0!==l?-1:0===l&&0!==a||o>s?1:o<s?-1:o.localeCompare(s)})),this._suggestions=o;const s=o.length;await this.requestUpdate(),s!==t&&(this._setComboboxWidth(),this.notifyResize()),this.opened||(this[Ie]=!0)}_listSuggestions(t,e){return!e&&this.openOnFocus?t:t.filter((t=>{const{value:i="",filter:o}=t;return(o||String(i)).toLowerCase().includes(e)}))}_closeHandler(){this[Ie]&&(this[Ie]=!1)}notifyResize(){const t=this.querySelector("anypoint-dropdown");t&&(t.notifyResize(),t.refit())}_selectionHandler(t){const{selected:e}=t.target;-1!==e&&null!=e&&this._selectSuggestion(e)}_selectSuggestion(t){const e=this._suggestions[t];if(!e)return;const{target:i}=this,o=this.source[e.index];if(!o)return;const s=String(e.value);this.noTargetValueUpdate||(i.value=s,i.dispatchEvent(new CustomEvent("input",{detail:{autocomplete:this}}))),this[Ie]=!1,this._inform(o),this.__ignoreCloseRefocus||this._refocusTarget()}_refocusTarget(){this[Ne]=!0,this.target.blur(),this.target.focus(),setTimeout((()=>{this[Ne]=!1}))}_targetKeydown(t){this.disabled||("ArrowDown"===t.code?(this._onDownKey(),t.preventDefault(),t.stopPropagation()):"ArrowUp"===t.code?(this._onUpKey(),t.preventDefault(),t.stopPropagation()):"Enter"===t.code||"NumEnter"===t.code?this._onEnterKey():"Tab"===t.code?this._onTabDown():"Escape"===t.code&&this._onEscKey())}_onDownKey(){this[Ie]?this._listbox.highlightNext():(this.renderSuggestions(),setTimeout((()=>{this._listbox.highlightNext()})))}_onUpKey(){this[Ie]?this._listbox.highlightPrevious():(this.renderSuggestions(),setTimeout((()=>{this[Ie]&&this._listbox.highlightPrevious()})))}_onEscKey(){this[Ie]=!1}_onEnterKey(){if(!this[Ie])return;const{_listbox:t}=this,{highlightedItem:e}=t;if(e){const i=Number(t.indexOf(e));if(!Number.isNaN(i)&&i>-1)return void this._selectSuggestion(i)}this._selectSuggestion(0)}_onTabDown(){this[Ie]&&(this._listbox.tabIndex=-1,this[Ne]=!0,this.__ignoreCloseRefocus=!0,this[Ie]=!1,setTimeout((()=>{this._listbox.tabIndex=0,this[Ne]=!1,this.__ignoreCloseRefocus=!1}),300))}_inform(t){const e=new CustomEvent("selected",{detail:{value:t},cancelable:!0});this.dispatchEvent(e)}async _dropdownResizedHandler(){this.opened&&(await this.updateComplete,setTimeout((()=>this.dispatchEvent(new CustomEvent("resize")))))}render(){const{_oldTarget:t,verticalAlign:e,horizontalAlign:i,scrollAction:o,horizontalOffset:s,verticalOffset:n,noAnimations:r,styles:a,anypoint:l,fitPositionTarget:c,positionTarget:h}=this;return V`
    <style>${a}</style>
    <anypoint-dropdown
      .positionTarget="${h||t}"
      .verticalAlign="${e}"
      .verticalOffset="${n+(l?-2:0)}"
      .horizontalAlign="${i}"
      .horizontalOffset="${s}"
      .scrollAction="${o}"
      .opened="${this[Ie]}"
      .noAnimations="${r}"
      ?fitPositionTarget="${c}"
      noautofocus
      @closed="${this._closeHandler}"
      @resize="${this._dropdownResizedHandler}"
      noCancelOnOutsideClick
    >
      ${this._listboxTemplate()}
    </anypoint-dropdown>
    `}_listboxTemplate(){return V`
      <anypoint-listbox
        aria-label="Use arrows and enter to select list item. Escape to close the list."
        slot="dropdown-content"
        selectable="anypoint-item,anypoint-item-body"
        useariaselected
        @select="${this._selectionHandler}"
        ?anypoint="${this.anypoint}"
      >
        ${this._loaderTemplate()}
        ${this._listTemplate()}
      </anypoint-listbox>
    `}_loaderTemplate(){const{loader:t,_loading:e}=this;return t&&e?V`<progress style="width: 100%"></progress>`:""}_listTemplate(){const{_suggestions:t=[]}=this;return t.map((t=>this[Te](t)))}[ze](t){return t.label&&t.label.constructor?t.label:String(t.label||t.value)}[Te](t){const e=this[ze](t),{description:i}=t,{anypoint:o}=this;return i?V`
      <anypoint-item ?anypoint="${o}">
        <anypoint-item-body ?anypoint="${o}" twoline>
          <div>${e}</div>
          <div data-secondary>${i}</div>
        </anypoint-item-body>
      </anypoint-item>`:V`<anypoint-item ?anypoint="${o}">
      <div>${e}</div>
    </anypoint-item>`}}),ee(ot),et`
:host {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: middle;
}

:host(:focus) {
  outline: none;
}

:host([disabled]) {
  cursor: auto;
  pointer-events: none;
  color: var(--anypoint-radio-button-disabled-color, #a8a8a8);
}

.radio-container {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  position: relative;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  padding: 8px;
}

.radio-container:before {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-primary));
  pointer-events: none;
  content: "";
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  transition: transform ease 0.18s;
  will-change: transform;
}

.radio-container:hover:before,
:host(:focus) .radio-container:before {
  transform: scale(1);
}

:host(:focus) .radio-container:before {
  opacity: 0.08;
}

.state-container {
  width: 16px;
  height: 16px;
  position: relative;
}

#offRadio, #onRadio {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  border-width: 1px;
  border-color: transparent;
  border-style: solid;
  position: absolute;
}

#offRadio {
  border-color: var(--anypoint-radio-button-unchecked-color, var(--anypoint-color-aluminum5));
  background-color: var(--anypoint-radio-button-unchecked-background-color, transparent);
  transition: background-color 0.28s, border-color 0.28s;
}

:host(:hover) #offRadio {
  border-color: var(--anypoint-radio-button-hover-unchecked-color, var(--anypoint-color-coreBlue2));
}

:host(:active) #offRadio,
:host(:focus) #offRadio {
  border-color: var(--anypoint-radio-button-active-unchecked-color, var(--anypoint-color-coreBlue3));
}

:host([checked]) #offRadio {
  border-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-coreBlue3));
  background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-coreBlue3));
}

:host([disabled]) #offRadio {
  border-color: var(--anypoint-radio-button-unchecked-color, var(--anypoint-color-steel1));
  opacity: 0.65;
}

:host([disabled][checked]) #offRadio {
  background-color: var(--anypoint-radio-button-checked-color, var(--anypoint-color-steel1));
}

#onRadio {
  background-color: var(--anypoint-radio-button-checked-inner-background-color, #fff);
  -webkit-transform: scale(0);
  transform: scale(0);
  transition: -webkit-transform ease 0.28s;
  transition: transform ease 0.28s;
  will-change: transform;
}

:host([checked]) #onRadio {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}

.radioLabel {
  line-height: normal;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  color: var(--anypoint-radio-button-label-color, var(--primary-text-color));
}

:host-context([dir="rtl"]) .radioLabel {
  margin-left: 8px;
}

:host([disabled]) .radioLabel {
  pointer-events: none;
  color: var(--anypoint-radio-button-disabled-color, #a8a8a8);
}
`,Vt(ot),Symbol("transitionEndHandler"),Symbol("updateSize"),Symbol("isAttached"),Symbol("updateTransition"),Symbol("calcSize"),Symbol("dimension"),Symbol("dimensionMax"),Symbol("dimensionMaxCss"),Symbol("transitionEnd"),Symbol("desiredSize"),Symbol("transitioning"),Symbol("transitioningValue"),Symbol("openedChanged"),Symbol("horizontalChanged"),Symbol("toggleAttribute"),re(ot),et`
:host {
  position: relative;
}

.trigger-icon {
  transform: rotate(0);
  transition: transform 0.12s ease-in-out;
  will-change: transform;
  color: var(--anypoint-dropdown-menu-label-color, #616161);
  fill: currentColor;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 4px;
  cursor: pointer;
}

.trigger-icon.opened {
  transform: rotate(-180deg);
}

:host([opened]) .trigger-icon,
:host([focused]) .trigger-icon,
:host(:focus) .trigger-icon {
  color: var(--anypoint-dropdown-menu-trigger-icon-active-color, var(--primary-color));
}

.dropdown-content {
  box-shadow: var(--anypoint-dropdown-shadow);
}
`,Symbol("dropdownTemplate"),Symbol("openedChanged"),Symbol("openedValue"),Symbol("dropdownClosed"),Symbol("dropdownOpened"),Symbol("selectHandler"),Symbol("deselectHandler"),Symbol("keydownHandler"),Symbol("onArrowUp"),Symbol("onArrowDown"),Symbol("onEsc");const Re=ht((t=>{class e extends(we(t)){static get properties(){return{modal:{type:Boolean}}}get modal(){return this._modal}set modal(t){const e=this._modal;e!==t&&(this._modal=t,this.requestUpdate&&this.requestUpdate("modal",e),this._modalChanged(t))}constructor(){super(),this._clickHandler=this._clickHandler.bind(this),this._resizeHandler=this._resizeHandler.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("tabindex","-1"),this.addEventListener("click",this._clickHandler),this.addEventListener("resize",this._resizeHandler),this.__ready=!0,this.modal&&this._modalChanged(this.modal)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("click",this._clickHandler),this.removeEventListener("resize",this._resizeHandler)}_updateClosingReasonConfirmed(t){this.closingReason||(this.closingReason={}),this.closingReason.confirmed=t}_isTargetClosingReason(t){return!!t.hasAttribute&&["dialog-dismiss","dialog-confirm","data-dialog-dismiss","data-dialog-confirm"].some((e=>t.hasAttribute(e)))}_clickHandler(t){const e=t.path||t.composedPath();for(let i=0,o=e.indexOf(this);i<o;i++){const o=e[i];if(this._isTargetClosingReason(o)){this._updateClosingReasonConfirmed(o.hasAttribute("dialog-confirm")||o.hasAttribute("data-dialog-confirm")),this.close(),t.stopPropagation();break}}}_resizeHandler(){this.refit()}_modalChanged(t){this.__ready&&(t?(this.__mncooc=this.noCancelOnOutsideClick,this.__mncoek=this.noCancelOnEscKey,this.__mwb=this.withBackdrop,this.noCancelOnOutsideClick=!0,this.noCancelOnEscKey=!0,this.withBackdrop=!0):(this.noCancelOnOutsideClick=this.noCancelOnOutsideClick&&this.__mncooc,this.noCancelOnEscKey=this.noCancelOnEscKey&&this.__mncoek,this.withBackdrop=this.withBackdrop&&this.__mwb))}}return e}));et`
:host {
  display: block;
  margin: 24px 40px;
  background: var(--anypoint-dialog-background-color, var(--primary-background-color));
  color: var(--anypoint-dialog-color, var(--primary-text-color));
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
              0px 24px 38px 3px rgba(0, 0, 0, 0.14),
              0px 9px 46px 8px rgba(0,0,0,.12);
}

:host > ::slotted(*) {
  margin-top: 20px;
  padding: 0 24px;
  color: var(--anypoint-dialog-content-color, rgba(0,0,0,.6));
}

:host > ::slotted(.no-padding) {
  padding: 0;
}

:host > ::slotted(*:first-child) {
  margin-top: 24px;
}

:host > ::slotted(*:last-child) {
  margin-bottom: 24px;
}

:host > ::slotted(h2),
:host > ::slotted(.title) {
  position: relative;
  margin: 0;
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  color: var(--anypoint-dialog-title-color, rgba(0,0,0,1));
}

:host > ::slotted(.dialog-buttons),
:host > ::slotted(.buttons) {
  position: relative;
  padding: 8px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

:host([anypoint]) > ::slotted(h2),
:host([anypoint]) > ::slotted(.title) {
  font-size: 2rem;
  padding: 20px 40px;
  margin: 0;
  background-color: #f9fafb;
  border-bottom: 1px solid #e8e9ea;
  font-family:"DIN Pro", "Open Sans", sans-serif;
}


:host([anypoint]) > ::slotted(*) {
  padding: 20px 40px;
  color: var(--anypoint-dialog-content-color, rgba(0,0,0,1));
}
`,Re(ot);const He=et`
:host {
  display: inline-block;
  outline: none;
  cursor: default;
  margin: 4px;
  box-sizing: border-box;
}

.container {
  border-radius: 16px;
  background-color: var(--anypoint-chip-background-color, rgba(35, 47, 52, 0.12));
  border: var(--anypoint-chip-border, none);
  height: inherit;
  min-height: 32px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);

  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
}

:host([anypoint]) .container {
  border-radius: 0;
}

:host([focused]:not([anypoint])) .container {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  background-color: var(--anypoint-chip-focused-background-color, #D6D6D6);
}

:host([focused][anypoint]) .container {
  background-color: var(--anypoint-chip-focused-background-color, #D6D6D6);
}

:host([active]) .container {
  background-color: var(--anypoint-chip-active-background-color, #cdcdcd);
}

:host([toggles]) {
  cursor: pointer;
}

:host([disabled]) {
  opacity: 0.54;
  pointer-events: none;
}

.icon ::slotted([slot=icon]) {
  border-radius: 50%;
  margin: 4px 0 4px 6px;
  color: var(--anypoint-chip-icon-color, #666666);
}

.label {
  display: inline-block;
  padding: 0px 8px;
  margin-left: 12px;
  margin-right: 12px;
  font-size: var(--arc-font-body2-font-size);
  font-weight: var(--arc-font-body2-font-weight);
  line-height: var(--arc-font-body2-line-height);
  color: var(--anypoint-chip-label-color, #232F34);
}

.label ::slotted([slot]) {
  font-size: var(--arc-font-body2-font-size);
  font-weight: var(--arc-font-body2-font-weight);
  line-height: var(--arc-font-body2-line-height);
  color: var(--anypoint-chip-label-color, #232F34);
}

:host([focused]) ::slotted([slot]),
:host([focused]) .label {
  color: var(--anypoint-chip-label-focused-color);
}

:host([active]) ::slotted([slot]),
:host([active]) .label {
  color: var(--anypoint-chip-label-active-color);
}

.with-icon .label {
  margin-left: 0;
}

.with-remove .label {
  margin-right: 0;
}

.close {
  width: 16px;
  height: 16px;
  background-color: var(--anypoint-chip-icon-close-background-color, #666666);
  color: var(--anypoint-chip-icon-close-color, #dfdfdf);
  border-radius: 50%;
  margin-right: 6px;
  cursor: pointer;
  fill: currentColor;
  display: inline-block;
}
`,Be=Symbol("hasIconNodeValue");window.customElements.define("anypoint-chip",class extends ot{static get styles(){return He}static get properties(){return{removable:{type:Boolean},disabled:{type:Boolean,reflect:!0},toggles:{type:Boolean,reflect:!0},anypoint:{type:Boolean,reflect:!0}}}set disabled(t){this.__disabled=t,this._disabledChanged(t)}get disabled(){return this.__disabled}get active(){return this.__active}get _active(){return this.__active}set _active(t){this.__active=t,this.__activeChanged(t)}get focused(){return this.__focused||!1}get _focused(){return this.__focused}set _focused(t){this.__focused=t,t&&!this.hasAttribute("focused")?this.setAttribute("focused",""):!t&&this.hasAttribute("focused")&&this.removeAttribute("focused")}get removeIcon(){return this._removeIcon||Kt}set removeIcon(t){if(t&&(!t.constructor||"SVGTemplateResult"!==t.constructor.name))return;const e=this._removeIcon;this._removeIcon=t,this.requestUpdate("removeIcon",e)}get _iconSlot(){return this.shadowRoot.querySelector('slot[name="icon"]')}constructor(){super(),this._keyDownHandler=this._keyDownHandler.bind(this),this._focusBlurHandler=this._focusBlurHandler.bind(this),this._clickHandler=this._clickHandler.bind(this),this.toggles=!1,this.removable=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.hasAttribute("role")||this.setAttribute("role","button"),void 0===this.__active&&(this._active=!1),this._addSlotEvent(),this.addEventListener("keydown",this._keyDownHandler,!0),this.addEventListener("focus",this._focusBlurHandler,!0),this.addEventListener("blur",this._focusBlurHandler,!0),this.addEventListener("click",this._clickHandler,!0)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("keydown",this._keyDownHandler),this.removeEventListener("focus",this._focusBlurHandler),this.removeEventListener("blur",this._focusBlurHandler),this.removeEventListener("click",this._clickHandler)}firstUpdated(t){super.firstUpdated(t),this.__firstUpdated=!0,this._addSlotEvent()}_addSlotEvent(){this.__firstUpdated&&this._iconSlot.addEventListener("slotchange",(()=>this._detectHasIcon()))}_removeHandler(t){t.preventDefault(),t.stopPropagation(),this.remove()}remove(){this._active=!1,this.dispatchEvent(new CustomEvent("chipremoved"))}_detectHasIcon(){const t=this._iconSlot.assignedNodes().filter((t=>t.nodeType===Node.ELEMENT_NODE));this[Be]=!!t.length,this.requestUpdate()}_keyDownHandler(t){this.removable&&["Backspace","Delete"].includes(t.code)?this.remove():["Enter","Space"].includes(t.code)&&(this._clickHandler(),this._asyncClick())}_focusBlurHandler(t){this._focused="focus"===t.type}_disabledChanged(t){this.setAttribute("aria-disabled",t?"true":"false"),this.style.pointerEvents=t?"none":"",t?(this._oldTabIndex=this.getAttribute("tabindex"),this._focused=!1,this.setAttribute("tabindex","-1"),this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))}_clickHandler(){this.toggles?this._userActivate(!this._active):this._active&&(this._active=!1)}_userActivate(t){this._active!==t&&(this._active=t)}_asyncClick(){setTimeout((()=>{this.click()}),1)}__activeChanged(t){t?this.hasAttribute("active")||this.setAttribute("active",""):this.hasAttribute("active")&&this.removeAttribute("active"),this.toggles?this.setAttribute("aria-pressed",t?"true":"false"):this.hasAttribute("aria-pressed")&&this.removeAttribute("aria-pressed")}_iconSlotTemplate(){return V`<span part="anypoint-chip-icon" class="icon"><slot name="icon"></slot></span>`}_removeTemplate(){if(!this.removable)return"";const{removeIcon:t}=this;return V`<span
      part="anypoint-chip-remove"
      class="close"
      @click="${this._removeHandler}"
    >${t}</span>`}render(){const t={container:!0,"with-icon":this[Be],"with-remove":this.removable};return V`<div part="anypoint-chip-container" class="${rt(t)}">
      ${this._iconSlotTemplate()}
      <span part="anypoint-chip-label" class="label"><slot></slot></span>
      ${this._removeTemplate()}
    </div>`}}),et`
:host {
  position: relative;
  width: auto;
  min-width: 170px;
  min-height: 56px;
  height: auto;
}

.chips {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.prefixes {
  max-width: 60%;
}

.input-container {
  min-height: inherit;
}

:host([anypoint]) {
  min-height: 40px;
  height: 40px;
}

.icon {
  fill: currentColor;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 0 0 8px;
  vertical-align: middle;
}
`,HTMLElement,et`
:host {
  display: block;
  position: fixed;
  background-color: var(--bottom-sheet-background-color, #fff);
  color: var(--bottom-sheet-color, #323232);
  min-height: 48px;
  min-width: 288px;
  bottom: 0px;
  left: 0px;
  box-sizing: border-box;
  box-shadow: var(--bottom-sheet-box-shadow, 0 2px 5px 0 rgba(0, 0, 0, 0.26));
  border-radius: 2px;
  margin: 0 12px;
  font-size: 14px;
  cursor: default;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
  -webkit-transform: translateY(100px);
  transform: translateY(100px);
  max-width: var(--bottom-sheet-max-width);
  max-height: var(--bottom-sheet-max-height);
}

:host(.fit-bottom) {
  width: 100%;
  min-width: 0;
  border-radius: 0;
  margin: 0;
}

:host(.center-bottom) {
  left: initial;
}

:host(.bottom-sheet-open) {
  opacity: 1;
  -webkit-transform: translateY(0px);
  transform: translateY(0px);
}

label {
  white-space: var(--arc-font-nowrap-white-space);
  overflow: var(--arc-font-nowrap-overflow);
  text-overflow: var(--arc-font-nowrap-text-overflow);
  font-size: var(--arc-font-caption-font-size);
  font-weight: var(--arc-font-caption-font-weight);
  line-height: var(--arc-font-caption-line-height);
  letter-spacing: var(--arc-font-caption-letter-spacing);

  height: 48px;
  color: var(--bottom-sheet-label-color, rgba(0, 0, 0, 0.54));
  display: block;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
}

[hidden] {
  display: none !important;
}

.scrollable {
  padding: 24px;
  max-height: calc(100vh - 52px);
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

:host([no-padding]) .scrollable {
  padding: 0;
}
`,we(ot),HTMLElement;const Me=new WeakMap,Pe=b((t=>e=>{if(!(e instanceof T)||e instanceof O||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:o}=i.element;let s=Me.get(e);void 0===s&&(o.cssText=i.strings.join(" "),Me.set(e,s=new Set)),s.forEach((e=>{e in t||(s.delete(e),-1===e.indexOf("-")?o[e]=null:o.removeProperty(e))}));for(const e in t)s.add(e),-1===e.indexOf("-")?o[e]=t[e]:o.setProperty(e,t[e])})),De=et`
:host {
  display: inline-block;
  cursor: pointer;
  position: relative;
}

.picker,
.box {
  width: var(--color-selector-width, 34px);
  height: var(--color-selector-height, 24px);
}

.picker {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.box {
  border: 1px solid var(--color-selector-border-color, #E5E5E5);
}
`,Ve=Symbol("colorValue"),Fe=Symbol("colorTriggerHandler"),Ue=Symbol("inputHandler");et`
:host {
  display: inline-flex;
  align-items: center;
}

.type-trigger {
  cursor: pointer;
}

.color-box {
  margin-right: 8px;
}

.checkbox-label {
  cursor: pointer;
}
`,window.customElements.define("anypoint-checkbox",Ft),window.customElements.define("color-selector",class extends ot{static get styles(){return De}get[Ve](){return this.value||"#ffffff"}static get properties(){return{value:{type:String,reflect:!0}}}constructor(){super(),this.value=void 0,this[Fe]=this[Fe].bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this[Fe])}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this[Fe])}[Fe](){this.shadowRoot.querySelector("input").click()}[Ue](t){this.value=t.target.value,this.dispatchEvent(new CustomEvent("change"))}render(){const t=this[Ve],e={backgroundColor:t};return V`
    <input type="color" class="picker" .value="${t}" @change="${this[Ue]}" aria-label="Select a color" />
    <div class="box" style="${Pe(e)}"></div>
    `}}),Symbol("checkedHandler"),Symbol("colorHandler"),Symbol("toggleHandler"),Symbol("keydownHandler"),Symbol("notify"),Symbol("checkboxTemplate"),Symbol("selectorTemplate"),Symbol("labelTemplate");const qe=Symbol("rationValue"),$e=Symbol("rangeChanged"),Ke=Symbol("computeStep"),Xe=Symbol("clampValue"),We=Symbol("computeRatio"),je=Symbol("validateValue"),Ye=Symbol("valueValue"),Ze=Symbol("minValue"),Ge=Symbol("maxValue"),Qe=Symbol("stepValue"),Je=Symbol("computeDebounce"),ti=Symbol("debounceValue"),ei=ht((t=>class extends t{static get properties(){return{value:{type:Number,reflect:!0},min:{type:Number,reflect:!0},max:{type:Number,reflect:!0},step:{type:Number,reflect:!0}}}get ratio(){return this[qe]}get value(){return this[Ye]}set value(t){let e=t;"string"==typeof e&&(e=parseFloat(e)),this[Ye]!==e&&(this[Ye]=e,this[Je]())}get min(){return this[Ze]}set min(t){let e=t;"string"==typeof e&&(e=parseFloat(e)),this[Ze]!==e&&(this[Ze]=e,this[Je]())}get max(){return this[Ge]}set max(t){let e=t;"string"==typeof e&&(e=parseFloat(e)),this[Ge]!==e&&(this[Ge]=e,this[Je]())}get step(){return this[Qe]}set step(t){let e=t;"string"==typeof e&&(e=parseFloat(e)),this[Qe]!==e&&(this[Qe]=e,this[Je]())}constructor(){super(),this[qe]=0,this[Ye]=0,this[Ze]=0,this[Ge]=100,this[Qe]=1,this[$e]()}[$e](){this[je]();const t=100*this[We](this.value);this[qe]!==t&&(this[qe]=t,this.dispatchEvent(new Event("ratiochange")),"function"==typeof this.requestUpdate&&this.requestUpdate())}[Ke](t){const e=t;if(!this.step)return e;const i=Math.round((e-this.min)/this.step);return this.step<1?i/(1/this.step)+this.min:i*this.step+this.min}[Xe](t){return Math.min(this.max,Math.max(this.min,this[Ke](t)))}[Je](){this[ti]||(this[ti]=requestAnimationFrame((()=>{this[ti]=void 0,this[$e]()})))}[We](t){return 0==this.max-this.min?0:(this[Xe](t)-this.min)/(this.max-this.min)}[je](){const t=this[Xe](this.value);return this.oldValue=Number.isNaN(t)?this.oldValue:t,this.value=this.oldValue,this.value!==t}}));et`
:host {
  display: block;
  width: 200px;
  position: relative;
  overflow: hidden;
  height: var(--anypoint-progress-height, 4px);
}

:host([hidden]), [hidden] {
  display: none !important;
}

#progressContainer {
  position: relative;
}

#progressContainer,
.indeterminate::after {
  height: inherit
}

#primaryProgress,
#secondaryProgress,
.indeterminate::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

#progressContainer,
.indeterminate::after {
  background: var(--anypoint-progress-container-color, #e0e0e0);
}

:host(.transiting) #primaryProgress,
:host(.transiting) #secondaryProgress {
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  /* Duration */
  -webkit-transition-duration: var(--anypoint-progress-transition-duration, 0.08s);
  transition-duration: var(--anypoint-progress-transition-duration, 0.08s);
  /* Timing function */
  -webkit-transition-timing-function: var(--anypoint-progress-transition-timing-function, ease);
  transition-timing-function: var(--anypoint-progress-transition-timing-function, ease);
  /* Delay */
  -webkit-transition-delay: var(--anypoint-progress-transition-delay, 0s);
  transition-delay: var(--anypoint-progress-transition-delay, 0s);
}

#primaryProgress,
#secondaryProgress {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform-origin: left center;
  transform-origin: left center;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  will-change: transform;
}

#primaryProgress {
  background: var(--anypoint-progress-active-color, #0f9d58);
}

#secondaryProgress {
  background: var(--anypoint-progress-secondary-color, #b7e1cd);
}

:host([disabled]) #primaryProgress {
  background: var(--anypoint-progress-disabled-active-color, #9e9e9e);
}

:host([disabled]) #secondaryProgress {
  background: var(--anypoint-progress-disabled-secondary-color, #e0e0e0);
}

:host(:not([disabled])) #primaryProgress.indeterminate {
  -webkit-transform-origin: right center;
  transform-origin: right center;
  -webkit-animation: indeterminate-bar var(--anypoint-progress-indeterminate-cycle-duration, 2s) linear infinite;
  animation: indeterminate-bar var(--anypoint-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

:host(:not([disabled])) #primaryProgress.indeterminate::after {
  content: "";
  -webkit-transform-origin: center center;
  transform-origin: center center;
  -webkit-animation: indeterminate-splitter var(--anypoint-progress-indeterminate-cycle-duration, 2s) linear infinite;
  animation: indeterminate-splitter var(--anypoint-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

@-webkit-keyframes indeterminate-bar {
  0% {
    -webkit-transform: scaleX(1) translateX(-100%);
  }
  50% {
    -webkit-transform: scaleX(1) translateX(0%);
  }
  75% {
    -webkit-transform: scaleX(1) translateX(0%);
    -webkit-animation-timing-function: cubic-bezier(.28,.62,.37,.91);
  }
  100% {
    -webkit-transform: scaleX(0) translateX(0%);
  }
}

@-webkit-keyframes indeterminate-splitter {
  0% {
    -webkit-transform: scaleX(.75) translateX(-125%);
  }
  30% {
    -webkit-transform: scaleX(.75) translateX(-125%);
    -webkit-animation-timing-function: cubic-bezier(.42,0,.6,.8);
  }
  90% {
    -webkit-transform: scaleX(.75) translateX(125%);
  }
  100% {
    -webkit-transform: scaleX(.75) translateX(125%);
  }
}

@keyframes indeterminate-bar {
  0% {
    transform: scaleX(1) translateX(-100%);
  }
  50% {
    transform: scaleX(1) translateX(0%);
  }
  75% {
    transform: scaleX(1) translateX(0%);
    animation-timing-function: cubic-bezier(.28,.62,.37,.91);
  }
  100% {
    transform: scaleX(0) translateX(0%);
  }
}

@keyframes indeterminate-splitter {
  0% {
    transform: scaleX(.75) translateX(-125%);
  }
  30% {
    transform: scaleX(.75) translateX(-125%);
    animation-timing-function: cubic-bezier(.42,0,.6,.8);
  }
  90% {
    transform: scaleX(.75) translateX(125%);
  }
  100% {
    transform: scaleX(.75) translateX(125%);
  }
}
`,Symbol("secondaryProgressValue"),Symbol("indeterminateValue"),Symbol("secondaryRatioValue"),ei(ot),et`
:host {
  display: block;
  margin: 24px 40px;
  background: var(--anypoint-dialog-background-color, var(--primary-background-color));
  color: var(--anypoint-dialog-color, var(--primary-text-color));
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
              0px 24px 38px 3px rgba(0, 0, 0, 0.14),
              0px 9px 46px 8px rgba(0,0,0,.12);
}

:host > * {
  margin-top: 20px;
  padding: 0 24px;
  color: var(--anypoint-dialog-content-color, rgba(0,0,0,.6));
}

:host > *:first-child {
  margin-top: 24px;
}

:host > *:last-child {
  margin-bottom: 24px;
}

:host > h2,
:host > .title {
  position: relative;
  margin: 0;
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  color: var(--anypoint-dialog-title-color, rgba(0,0,0,1));
}

:host > .dialog-buttons,
:host > .buttons {
  position: relative;
  padding: 8px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

:host([anypoint]) > h2,
:host([anypoint]) > .title {
  font-size: 2rem;
  padding: 20px 40px;
  margin: 0;
  background-color: #f9fafb;
  border-bottom: 1px solid #e8e9ea;
  font-family: "DIN Pro", "Open Sans", sans-serif;
}


:host([anypoint]) > * {
  padding: 20px 40px;
  color: var(--anypoint-dialog-content-color, rgba(0,0,0,1));
}
`,ht((t=>class extends t{static get properties(){return{message:{type:String}}}get message(){return this._message}set message(t){const e=this._message;e!==t&&(this._message=t,this.requestUpdate&&this.requestUpdate("message",e))}constructor(){super();let t=this.nodeName;var e;t&&(t=t.toLowerCase()),t||(t=this.constructor.is),e=t,Pt.set(e,this)}unregister(){!function(t){for(const[e,i]of Pt)if(i===t)return void Pt.delete(e)}(this)}validate(){return!0}})),ht((t=>class extends t{get eventsTarget(){return this._eventsTarget}set eventsTarget(t){const e=this._eventsTarget;e!==t&&(this._eventsTarget=t,this._eventsTargetChanged(t),this.requestUpdate&&this.requestUpdate("eventsTarget",e))}constructor(...t){super(...t),this._eventsTarget=null,this._oldEventsTarget=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._eventsTargetChanged(this.eventsTarget)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._oldEventsTarget&&this._detachListeners(this._oldEventsTarget)}_eventsTargetChanged(t){this._oldEventsTarget&&this._detachListeners(this._oldEventsTarget),this._oldEventsTarget=t||window,this._attachListeners(this._oldEventsTarget)}_attachListeners(t){}_detachListeners(t){}})),ht((t=>class extends t{static get properties(){return{scrollTarget:{},_legacyTarget:{attribute:"scroll-target"}}}get scrollTarget(){return this._scrollTarget}set scrollTarget(t){t!==this._scrollTarget&&(this._scrollTarget=t,this._scrollTargetChanged(t))}get _legacyTarget(){return this._scrollTarget}set _legacyTarget(t){this.scrollTarget=t}get isAttached(){return this._isAttached}set isAttached(t){this._isAttached=t,this._scrollTargetChanged(this._scrollTarget)}get _defaultScrollTarget(){return this._doc}get _doc(){return this.ownerDocument.documentElement}get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0}get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0}set _scrollTop(t){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,t):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=t)}set _scrollLeft(t){this.scrollTarget===this._doc?window.scrollTo(t,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=t)}constructor(){super(),this.scrollTarget=this._defaultScrollTarget,this._shouldHaveListener=!0}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.isAttached=!0,setTimeout((()=>{!this._oldScrollTarget&&this.scrollTarget&&this._scrollTargetChanged(this._scrollTarget)}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.isAttached=!1}_scrollHandler(){}_scrollTargetChanged(t){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),this.isAttached)if("document"===t)this.scrollTarget=this._doc;else if("string"==typeof t){if(!this.shadowRoot)return;const e=this.getRootNode&&this.getRootNode();let i;e&&(i=e.querySelector(`#${t}`)),i||this.ownerDocument.querySelector(`#${t}`),this.scrollTarget=i}else this._isValidScrollTarget()&&(this._oldScrollTarget=t,this._toggleScrollListener(this._shouldHaveListener,t))}scroll(t,e){let i,o;"object"==typeof t?(i=t.left,e=t.top,o=t.behavior):i=t,i=i||0,e=e||0,this.scrollTarget===this._doc?o?window.scroll({left:i,top:e,behavior:o}):window.scrollTo(i,e):this._isValidScrollTarget()&&(o?this.scrollTarget.scroll({left:i,top:e,behavior:o}):(this.scrollTarget.scrollLeft=i,this.scrollTarget.scrollTop=e))}get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0}get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0}_isValidScrollTarget(){return this.scrollTarget instanceof HTMLElement}_toggleScrollListener(t,e){if(!e)return;const i=e===this._doc?window:e;t?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),i.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(i.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)}toggleScrollListener(t){this._shouldHaveListener=t,this._toggleScrollListener(t,this.scrollTarget)}})),window.customElements.define("anypoint-icon-item",bt);const ii=et`
:host {
  display: block;
  position: fixed;
  font-size: 1rem;
  color: var(--context-menu-color, #000);
  user-select: none;
  z-index: 100;
  --anypoint-item-icon-width: 32px;
  --anypoint-item-min-height: 32px;
}

.listbox {
  padding: 2px 0;
  min-width: 160px;
  border-radius: 4px;
  box-shadow: var(--context-menu-shadow, var(--anypoint-dropdown-shadow));
  background-color: var(--context-menu-background-color, var(--primary-background-color));
}

.item {
  margin: 8px 0;
}

.item.disabled {
  color: var(--context-menu-disabled-color, var(--disabled-text-color, #9E9E9E));
  pointer-events: none;
}

.hidden,
[hidden] {
  display: none;
}

.menu-divider {
  height: 1px;
  background-color: var(--context-menu-divider-color, rgba(0, 0, 0, 0.12));
  margin: 8px 0 8px 40px;
}

.menu-section-label {
  font-size: var(--context-menu-section-label-font-size, 0.9rem);
  font-weight: var(--context-menu-section-label-font-weight, 500);
  margin: 16px 8px 8px 44px;
  text-transform:  var(--context-menu-section-label-text-transform, uppercase);
}

.menu-icon {
  width: 20px;
  height: 20px;
  fill: var(--context-menu-icon-color, currentColor);
}

.sub-menu-icon {
  margin-left: auto;
  padding-left: 12px;
  width: 24px;
  height: 24px;
}

.svg-wrapper {
  pointer-events: none; 
  display: block; 
  width: 100%; 
  height: 100%; 
  fill: currentColor;
}
`,oi=(t,e=24,i=24)=>F`<svg viewBox="0 0 ${e} ${i}" preserveAspectRatio="xMidYMid meet" focusable="false" class="svg-wrapper">${t}</svg>`,si=oi(F`<path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 17l5-5-5-5v10z"/>`),ni=oi(F`<path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>`),ri=Symbol("menuItemTemplate"),ai=Symbol("separatorTemplate"),li=Symbol("menuEntryTemplate"),ci=Symbol("menuEntryIconTemplate"),hi=Symbol("childrenIconTemplate"),di=Symbol("selectedHandler"),pi=Symbol("mouseoverHandler"),ui=Symbol("findEventListItemTarget"),gi=Symbol("buildNested"),mi=Symbol("createNested"),bi=Symbol("nestedIdValue"),yi=Symbol("nestedTimeout"),fi=Symbol("removeNested"),vi=Symbol("clearNested"),_i=Symbol("removingTimeout"),wi=Symbol("keydownHandler"),xi=Symbol("moveRight"),ki=Symbol("moveLeft"),Si=Symbol("subClosedHandler"),Ci=Symbol("subTriggerHandler"),Ei=Symbol("labelTemplate"),Ai=Symbol("radioEntryTemplate"),Ti=Symbol("menuEntryCheckMarkTemplate");class zi extends(we(ot)){static get styles(){return ii}static get properties(){return{commands:{type:Array},store:{type:Object},target:{type:Object},workspace:{type:Object},customData:{},subMenuTimeout:{type:Number},parentCommand:{type:String}}}constructor(){super(),this.commands=void 0,this.store=void 0,this.target=void 0,this.workspace=void 0,this.customData=void 0,this[bi]=void 0,this.parentCommand=void 0,this.subMenuTimeout=300,this[Si]=this[Si].bind(this),this[Ci]=this[Ci].bind(this)}[di](t){const e=t.target,{selectedItem:i}=e;if(!i)return;const o=i.dataset.cmd,s=this.commands.findIndex((t=>t.id===o)),n=this.commands[s];if(n.hasChildren)this[gi](o);else{const t={command:n,item:s};this.dispatchEvent(new CustomEvent("trigger",{detail:t}))}}[pi](t){const e=this[ui](t);if(!e)return;const{nested:i,cmd:o}=e.dataset;"true"===i?this[gi](o):this[bi]&&this[fi]()}[ui](t){const e=t.composedPath();let i,o=e.shift();for(;!i&&o&&("anypoint-icon-item"===o.localName?i=o:o=e.shift(),o!==this););return i}[gi](t){t&&t!==this[bi]&&(this[bi]&&this[vi](),this.commands.find((e=>e.id===t)).hasChildren&&(this[bi]=t,this[yi]&&clearTimeout(this[yi]),this[yi]=setTimeout((()=>{this[yi]=void 0,this[mi]()}),this.subMenuTimeout)))}[mi](){const t=this[bi];if(!t)return;const e=this.shadowRoot.querySelector(`[data-cmd="${t}"]`),i=e.getBoundingClientRect(),o=this.commands.find((e=>e.id===t)),{children:s}=o,n=new zi;n.commands=s,n.store=this.store,n.target=this.target,n.workspace=this.workspace,n.customData=this.customData,n.positionTarget=e,n.horizontalAlign="left",n.verticalAlign="top",n.dynamicAlign=!0,n.horizontalOffset=i.width-4,n.opened=!0,n.noCancelOnOutsideClick=!0,n.parentCommand=t,n.addEventListener("closed",this[Si]),n.addEventListener("trigger",this[Ci]),this.shadowRoot.append(n)}[fi](){this[_i]||(this[_i]=setTimeout((()=>{this[_i]=void 0,this[vi]()}),this.subMenuTimeout))}[vi](){this[bi]=void 0;const t=this.shadowRoot.querySelector("context-menu");t&&this.shadowRoot.removeChild(t)}[wi](t){switch(t.code){case"ArrowRight":this[xi]();break;case"ArrowLeft":this[ki]()}}[xi](){const t=this.shadowRoot.querySelector("anypoint-listbox"),{focusedItem:e}=t;if(!e)return;const{nested:i,cmd:o}=e.dataset;"true"===i&&(this[bi]=o,this[mi]())}[ki](){this.parentCommand&&(this.opened=!1)}[Si](t){t.stopPropagation(),this[vi](),this.focus()}[Ci](t){if(!t.detail.parent){const e=this[bi],i=this.commands.find((t=>t.id===e));"function"==typeof i.execute&&(t.detail.parent=i)}this.dispatchEvent(new CustomEvent("trigger",{detail:t.detail}))}focus(){const t=this.shadowRoot.querySelector("anypoint-listbox");t&&t.focus()}render(){const{commands:t}=this;return Array.isArray(t)&&t.length?V`
    <anypoint-listbox
      selectable="anypoint-icon-item"
      class="listbox"
      @selected="${this[di]}"
      @mouseover="${this[pi]}"
      @keydown="${this[wi]}"
      aria-label="Context menu"
      role="menu"
    >
      ${t.map((t=>this[ri](t)))}
    </anypoint-listbox>
    `:V``}[ri](t){switch(t.type){case"normal":return this[li](t);case"separator":return this[ai](t);case"label":return this[Ei](t);case"radio":return this[Ai](t);default:return""}}[ai](t){const{store:e,target:i,workspace:o,customData:s}=this,n=t.isVisible(e,i,o,s);return V`
    <div class="${rt({"menu-divider":!0,hidden:!n})}" data-cmd="${t.id}"></div>
    `}[Ei](t){const{store:e,target:i,workspace:o,customData:s}=this,n=t.isVisible(e,i,o,s);return V`
    <div class="${rt({"menu-section-label":!0,hidden:!n})}" data-cmd="${t.id}">${t.label}</div>
    `}[li](t){const{store:e,target:i,workspace:o,customData:s}=this;t.beforeRenderCallback(e,i,o,s);const n=t.isVisible(e,i,o,s),r=t.isEnabled(e,i,o,s),a={item:!0,disabled:!r,hidden:!n},{title:l,icon:c,label:h,id:d,hasChildren:p}=t;return V`
    <anypoint-icon-item 
      class="${rt(a)}" 
      ?disabled="${!n||!r}"
      aria-hidden="${!n}"
      title="${lt(l)}"
      data-cmd="${d}"
      data-nested="${p}"
      aria-haspopup="${p}"
      role="menuitem"
    >
      ${this[ci](c)}
      <span class="menu-label">${h}</span>
      ${p?this[hi]():""}
    </anypoint-icon-item>
    `}[Ai](t){const{store:e,target:i,workspace:o,customData:s}=this;t.beforeRenderCallback(e,i,o,s);const n=t.isVisible(e,i,o,s),r=t.isEnabled(e,i,o,s),a=t.isChecked(e,i,o,s),l={item:!0,disabled:!r,hidden:!n},{title:c,label:h,id:d,hasChildren:p}=t;return V`
    <anypoint-icon-item 
      class="${rt(l)}" 
      ?disabled="${!n||!r}"
      aria-hidden="${!n}"
      title="${lt(c)}"
      data-cmd="${d}"
      data-nested="${p}"
      data-type="radio"
      aria-haspopup="${p}"
      role="menuitem"
    >
      ${this[Ti](a)}
      <span class="menu-label">${h}</span>
      ${p?this[hi]():""}
    </anypoint-icon-item>
    `}[ci](t){return V`
    <div class="menu-icon" slot="item-icon">${t}</div>
    `}[hi](){return V`
    <div class="sub-menu-icon">${si}</div>
    `}[Ti](t){return t?V`
      <div class="menu-icon" data-state="checked" slot="item-icon">${ni}</div>
    `:""}}window.customElements.define("context-menu",zi);let Ii=0;function Li(){return Ii+=1,`${Ii}`}class Oi{constructor(t){const{type:e="normal",target:i,visible:o=!0,id:s=Li()}=t;if(this.type=e,this.target=i,this.visible=o,this.id=s,["normal","radio"].includes(e)){const{label:e,children:i,enabled:o,execute:s,icon:n,title:r,beforeRender:a,checked:l}=t;this.label=e,this.children=i,this.enabled=o,this.checked=l,this.execute=s,this.beforeRender=a,this.icon=n,this.title=r}else if("label"===e){const{label:e,beforeRender:i}=t;this.label=e,this.beforeRender=i}}get hasChildren(){const{children:t}=this;return Array.isArray(t)&&!!t.length}isEnabled(t,e,i,o){let s=!0;const{enabled:n,id:r}=this;if("boolean"==typeof n)s=n;else if("function"==typeof n)try{s=n({id:r,store:t,target:e,root:i,customData:o})}catch(t){console.warn(t)}return s}isVisible(t,e,i,o){let s=!0;const{visible:n,id:r}=this;if("boolean"==typeof n)s=n;else if("function"==typeof n)try{s=n({id:r,store:t,target:e,root:i,customData:o})}catch(t){console.warn(t)}return s}isChecked(t,e,i,o){const{type:s,checked:n,id:r}=this;if("radio"!==s)return!1;if("boolean"==typeof n)return n;let a=!1;if("function"==typeof n)try{a=n({id:r,store:t,target:e,root:i,customData:o})}catch(t){console.warn(t)}return a}beforeRenderCallback(t,e,i,o){const{beforeRender:s,id:n}=this;s&&s({id:n,store:t,target:e,root:i,customData:o,menu:this})}trigger(t,e,i,o,s,n,r){const{execute:a,id:l}=this;"function"==typeof a&&a({id:l,store:e,target:i,root:o,clickPoint:s,customData:n,selectedSubcommand:r,item:t})}}const Ni=Symbol("contextHandler"),Ri=Symbol("clickHandler"),Hi=Symbol("keydownHandler"),Bi=Symbol("menuTriggerHandler"),Mi=Symbol("customMenuHandler"),Pi=Symbol("normalizeMenuItem"),Di=Symbol("prepareCommands"),Vi=Symbol("connectedValue");function Fi(t){t.preventDefault(),t.stopPropagation()}class Ui extends EventTarget{get connected(){return this[Vi]}constructor(t,e={}){super(),this.workspace=t,this.store=new Map,this.commands=[],this.triggerInfo=void 0,this.options={...e},this[Vi]=!1,this[Ni]=this[Ni].bind(this),this[Ri]=this[Ri].bind(this),this[Hi]=this[Hi].bind(this),this[Mi]=this[Mi].bind(this),this[Bi]=this[Bi].bind(this)}connect(){this.workspace.addEventListener("contextmenu",this[Ni]),this.workspace.addEventListener("custommenu",this[Mi]),window.addEventListener("click",this[Ri]),window.addEventListener("keydown",this[Hi]),this[Vi]=!0}disconnect(){this.workspace.removeEventListener("contextmenu",this[Ni]),this.workspace.removeEventListener("custommenu",this[Mi]),window.removeEventListener("click",this[Ri]),window.removeEventListener("keydown",this[Hi]),this[Vi]=!1}readTargetClickPosition(t){return{x:t.clientX,y:t.clientY}}findTarget(t){return t.target}elementToTarget(t){if(t===this.workspace)return"root";if(!t.localName)return;let e=t.localName;const i=Array.from(t.classList).join(".");return i&&(e+=`.${i}`),e}[Ni](t){this.options.cancelNativeWhenHandled||Fi(t),this.destroy();const e=this.findTarget(t);if(!e)return;const i=this.elementToTarget(e);if(!i)return;this.options.cancelNativeWhenHandled&&Fi(t);const o={x:t.clientX,y:t.clientY},s=this.readTargetClickPosition(t);this.build(e,i,o,s)}[Mi](t){Fi(t);const{name:e,x:i=0,y:o=0,actionTarget:s=this.workspace,clickEvent:n,customData:r}=t.detail,a={x:i,y:o},l=n?this.readTargetClickPosition(n):a;this.build(s,e,a,l,r)}[Ri](t){if(!this.currentMenu||t.defaultPrevented)return;const e=t.target;this.currentMenu.contains(e)||this.destroy()}[Hi](t){"Escape"===t.key&&this.currentMenu&&this.destroy()}registerCommands(t){Array.isArray(t)&&t.length&&(this.commands=this[Di](t))}addCommand(t){this.commands||(this.commands=[]);const e=this[Di]([t])[0];this.commands.push(e)}[Di](t){const e=[];return t.forEach((t=>{if(!t)return;const{type:i="normal"}=t;switch(i){case"separator":case"label":e.push(new Oi(t));break;case"normal":case"radio":{const i=this[Pi](t);e.push(new Oi(i))}}})),e}[Pi](t){const e={...t};return e.id||(e.id=Li()),Array.isArray(e.children)&&e.children.length?e.children=this[Di](e.children):e.children&&(e.children=void 0),e}build(t,e,i,o,s){this.triggerInfo=void 0;const n=this.listCommands(e,t);n.length&&(this.triggerInfo={point:o,customData:s,target:t},this.render(i,n),t.setAttribute("active",""))}render(t,e){const{workspace:i}=this,o=document.createElement("context-menu");o.store=this.store,o.target=this.triggerInfo.target,o.customData=this.triggerInfo.customData,o.workspace=i,o.classList.add("context-menu"),o.commands=e,o.dynamicAlign=!0,o.style.top=`${t.y}px`,o.style.left=`${t.x}px`,i.shadowRoot?i.shadowRoot.append(o):this.workspace.append(o),o.opened=!0,this.currentMenu=o,o.focus(),o.addEventListener("trigger",this[Bi])}listCommands(t,e){const{commands:i=[]}=this,o=[],s=["all",t];return i.forEach((t=>{if(Array.isArray(t.target))t.target.some((t=>s.includes(t)))&&o.push(t);else if(s.includes(t.target))o.push(t);else try{e.matches(t.target)&&o.push(t)}catch(t){}})),o}destroy(){if(!this.currentMenu)return;this.triggerInfo.target.removeAttribute("active"),this.triggerInfo=void 0;const{workspace:t}=this;t.shadowRoot?t.shadowRoot.removeChild(this.currentMenu):t.removeChild(this.currentMenu),this.currentMenu.removeEventListener("trigger",this[Bi]),this.currentMenu=void 0}[Bi](t){const{item:e,command:i,parent:o}=t.detail,s=i,n=o,{triggerInfo:r,workspace:a,store:l}=this,{point:c,target:h,customData:d}=r;this.destroy(),n&&n.execute&&!s.execute?n.trigger(s,l,h,a,c,d,e):s.execute?s.trigger(s,l,h,a,c,d):this.dispatchEvent(new CustomEvent("execute",{detail:{id:s.id,store:l,target:h,root:a,clickPoint:c,customData:d,selectedSubcommand:e,item:s}}))}}var qi=e.xV,$i=e.h2,Ki=e.DY,Xi=e.sN,Wi=e.aW;export{qi as ContextMenu,$i as ContextMenuElement,Ki as MenuElementStyles,Xi as MenuItem,Wi as iconWrapper};
