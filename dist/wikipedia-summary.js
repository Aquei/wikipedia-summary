!function(t){"use strict";function e(){return this.baseTemplates=[],this.endpoint,this.jsonpCallbacks=[],this.queryParams={},this.wpData={},this}function n(t){var e,n,i,r;return t=t||"template",r=this,e=q.doc,n=e.querySelectorAll(t),i=this.nodeListToArray(n),i&&i.forEach(function(t,e,n){var i;i="content"in t?document.importNode(t.content,!0):t.cloneNode(!0),this.baseTemplates.push(i)},r),this}function i(t){return null===t?(console.warn("nodeListがnullでした。空のarrayを返します。"),[]):"length"in t?Array.prototype.slice.call(t):(console.warn("引数が不正です"),!1)}function r(){var t,e;return e=this,this.root.innerHTML&&console.warn("innerHTMLが空ではありません。既存のdomにベーステンプレートが追加されようとしています"),t=this.baseTemplates,Array.isArray(t)&&t.length?(t.forEach(function(t,n,i){var r;"nodeType"in t?r=t.ownerDocument===document?t.cloneNode(!0):document.importNode(t,!0):(console.log("テンプレートがnodeではありません。"),"string"==typeof t?(console.log("テンプレートをHTML stringとして読み込みます"),r=document.createElement("template"),r.innerHTML=t,r=r.content):console.warn("このテンプレートを無視します")),r&&e.root.appendChild(r)}),this):(console.warn("ベースとなるテンプレートdomのarrayが空です。何もせずにthisを返します。"),this)}function o(t,e){var n;return n=t?e?this.createShadowRoot():this.shadowRoot?this.shadowRoot:this.createShadowRoot():this,this.root=n,this}function s(t){return this.shadowRoot?t?this.setRoot(!0,!0):this.root.innerHTML="":this.innerHTML="",this}function a(t){var e=[];return Object.keys(t).forEach(function(t,n,i){e.push(encodeURIComponent(n)+"="+encodeURIComponent(t))}),e.join("&")}function u(t,e){var t=(t||"ja").toLowerCase(),e=(e||location.protocol).toLowerCase(),n="w/api.php";return e.indexOf(":")!==e.length-1&&(e+=":"),this.endpoint=e+"//"+t+".wikipedia.org/"+n,this}function h(t,e,n,i){var r=this;JSONP({url:e,data:n,success:function(n){var i,o;i=new CustomEvent("requestSuccess",{detail:{data:n,url:e}}),r.dispatchEvent(i),t(n),n.query&&n.query.pages&&n.query.pages[-1]&&(o=new CustomEvent("resultError",{detail:{data:n,url:e}}),r.dispatchEvent(o))},error:function(){var t=new CustomEvent("requestError",{detail:{data:null,url:e}});r.dispatchEvent(t),i&&i(),cosole.warn("JSONPリクエストに失敗しました")}})}function c(){var t,e=this;return void 0===this.queryParams&&(this.queryParams={}),t={action:"query",prop:"revisions",rvprop:"content",rvparse:"",redirects:"",format:"json"},Object.keys(t).forEach(function(e,n,i){this.queryParams[e]=t[e]},e),this}function l(t){var e,n,i=this;return e={title:"titles"},void 0===this.queryParams&&(this.queryParams={}),t?n=Array.isArray(t)?t:[t]:(n=[],Object.keys(e).forEach(function(t,e,i){n.push(t)})),n.forEach(function(t,n,i){e[t]&&this.getAttribute(t)&&(this.queryParams[e[t]]=this.getAttribute(t))},i),this}function d(){return this.endpoint&&"queryParams"in this&&this.queryParams.titles}function p(t){var e,n;return n=this.getOriginFromURL(this.endpoint),e=this.nodeListToArray(t.querySelectorAll('a[href^="/wiki/"]')),e.forEach(function(t,e,i){var r=t.getAttribute("href");t.setAttribute("href",n+r)}),t}function m(t){var e,n=[],t=t||this.wpData.node;for(e=t.querySelector("fake-body>p");null!==e&&"tagName"in e&&"p"===e.tagName.toLowerCase()&&(n.push(e.cloneNode(!0)),e.nextSibling);)e=e.nextSibling;return n}function f(t){var e,n,i,r=t.query.pages;return e=Object.keys(r)[0],this.wpData.title=r[e].title,this.wpData.pageId=e,this.wpData.html=r[e].revisions[0]["*"],n=document.createElement("template"),n.innerHTML="<fake-body>"+this.wpData.html+"</fake-body>",this.wpData.node=n.content,i=new CustomEvent("gotData",{detail:{title:r[e].title,pageId:e,html:r[e].revisions[0]["*"]}}),this.dispatchEvent(i),this}function y(t,e){var n=this.nodeListToArray(this.root.querySelectorAll(e));return n.forEach("string"==typeof t?function(e){e.textContent=e.textContent+t}:function(e){e.appendChild(t)}),this}function g(t){var e,n,i,r;return t&&"string"==typeof t?(r=t.split("/"),e=r[0],n=r[2],i=e+"//"+n):null}function v(t){var e,n,i=this.themeList,r=t.toLowerCase();return t&&-1!==i.indexOf(r)?(e=this.root.querySelector(".wikipedia-summary"),e&&(n=e.classList,i.forEach(function(t){n.remove(t)}),n.add(r)),this):(console.warn("unknown theme"),this)}function w(){return this.init(),this.setRoot(!0,!0),this.setDefaultQueryParams(),this.setWikipediaAPIEndpoint(this.getAttribute("lang")),this.readOptions(),this.loadDefaultTemplates("template"),this.updateBase(),this.getAttribute("theme")&&this.changeTheme(this.getAttribute("theme")),this.checkAndRun(),this}function b(t,e,n){switch(t){case"theme":return this.changeTheme(n),this;case"title":this.readOptions("title");break;case"lang":this.setWikipediaAPIEndpoint(n);break;default:return console.log("unknown attribute, "+t),this}return this.resetRoot(!1),this.updateBase(),this.checkAndRun(),this}function E(){var t,e=this;return this.isRequestReady()&&(t=new CustomEvent("beforeRequest"),e.dispatchEvent(t),this.requestWithJsonP(function(t){e.onGetDataCallbacks.forEach(function(n,i,r){"function"==typeof n&&n.call(e,t)},e)},this.endpoint,this.queryParams)),this}var k,C=Object.create(HTMLElement.prototype),q={};Object.defineProperty(C,"version",{enumerable:!0,value:"1.0.0"}),q.doc=(document._currentScript||document.currentScript).ownerDocument,C.onGetDataCallbacks=[],C.themeList=["dark","light"],C.init=e,C.loadDefaultTemplates=n,C.nodeListToArray=i,C.updateBase=r,C.setRoot=o,C.resetRoot=s,C.getQueryString=a,C.setWikipediaAPIEndpoint=u,C.requestWithJsonP=h,C.readOptions=l,C.setDefaultQueryParams=c,C.isRequestReady=d,C.absUrl=p,C.setDataFromJSON=f,C.insertContent=y,C.getOriginFromURL=g,C.checkAndRun=E,C.createdCallback=w,C.attributeChangedCallback=b,C.getSummary=m,C.changeTheme=v,C.onGetDataCallbacks.push(function(t){this.setDataFromJSON(t)},function(){var t,e=this;t=this.getSummary(),t.length||console.warn("no summary found"),t.forEach(function(t){this.insertContent(e.absUrl(t.cloneNode(!0)),".summary")},e)},function(){this.insertContent(this.wpData.title,"h1")},function(){var t,e,n=document.createElement("a"),i=document.createElement("a"),r=document.createElement("span"),o=document.createElement("span"),s="http://creativecommons.org/licenses/by-sa/3.0/",a=this.wpData.title,u=this.getOriginFromURL(this.endpoint);t=u+"/wiki/"+encodeURIComponent(a),n.setAttribute("href",t),n.textContent="続きを読む",this.insertContent(n,"p.attr"),i.setAttribute("href",s),i.textContent=s,r.innerHTML=" (",o.innerHTML=") ",r.appendChild(i),r.appendChild(o),this.insertContent(r,"p.attr"),e=this.root.querySelector("blockquote"),e&&e.setAttribute("cite",t)});try{k=document.registerElement("wikipedia-summary",{prototype:C})}catch(A){return void console.warn("<wikipedia-summary>は既に登録されています。")}"undefined"!=typeof module&&null!==module&&module.exports?module.exports=k:"undefined"==typeof t.WikipediaSummary&&(t.WikipediaSummary=k)}((this||0).self||global);