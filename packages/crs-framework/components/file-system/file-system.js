class c extends crs.classes.BindableElement{#t=[];get shadowDom(){return!0}get html(){return import.meta.url.replace(".js",".html")}async connectedCallback(){await super.connectedCallback()}async load(){const t=this.shadowRoot.querySelector("#tplFolder"),e=this.shadowRoot.querySelector("#tplFile");await crs.binding.inflation.manager.register("file-system-folder",t),await crs.binding.inflation.manager.register("file-system-file",e)}async disconnectedCallback(){await crs.binding.inflation.manager.unregister("file-system-folder"),await crs.binding.inflation.manager.unregister("file-system-file"),await super.disconnectedCallback()}#n(t,e){for(const a of t)a.path=e.length==0?a.name:`${e}/${a.name}`}async#s(t){if(this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{kind:"directory",name:t.textContent.split(`
`).join("")}})),t.matches('[aria-expanded="true"]'))return await this.#i(t);t.setAttribute("aria-expanded","true");const e=Number(t.dataset.level),a=t.dataset.path,n=this.#t.findIndex(h=>h.path==a),s=this.#t[n],i=await crs.call("fs","open_folder",{handle:s});await this.#r(i,a);const d=await this.#a(i,e+1);(t.parentElement||t.getRootNode()).insertBefore(d,t.nextElementSibling),this.#t.splice(n+1,0,...i),t.dataset.count=i.length}async#i(t){t.setAttribute("aria-expanded","false");const e=Number(t.dataset.count);t.dataset.count=0;const a=t.parentElement||t.getRootNode();for(let s=0;s<e;s++)a.removeChild(t.nextElementSibling);const n=this.#t.findIndex(s=>s.path==t.dataset.path);this.#t.splice(n+1,e)}async#e(t){const e=t.dataset.path,a=this.#t.find(s=>s.path==e),n=await crs.call("fs","read_file",{handle:a});this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{kind:"file",name:t.textContent.split(`
`).join(""),content:n,path:t.dataset.path}}))}async#r(t,e){for(const a of t)a.path=`${e}/${a.name}`}async#a(t,e=0){const a=[],n=[];for(const i of t)i.kind=="file"?n.push(i):a.push(i);l(a),l(n);const s=document.createDocumentFragment();return await o(a,s,"file-system-folder",e),await o(n,s,"file-system-file",e),s}async selectFolder(){this.#t=await crs.call("fs","open_folder",{}),this.#n(this.#t,"");const t=this.shadowRoot.querySelector("ul");t.innerHTML="";const e=await this.#a(this.#t);await t.appendChild(e)}async dblclick(t){const e=t.composedPath()[0];if(e.nodeName=="UL")return;if((e.parentElement||e.getRootNode()).querySelector("[aria-selected]")?.removeAttribute("aria-selected"),e.setAttribute("aria-selected","true"),e.dataset.type==="directory")return await this.#s(e);await this.#e(e)}async click(t){const e=t.composedPath()[0];(e.parentElement||e.getRootNode()).querySelector("[aria-selected]")?.removeAttribute("aria-selected"),e.setAttribute("aria-selected","true"),e.dataset.type==="file"&&await this.#e(e)}async save(t,e){const a=this.#t?.find(n=>n.path==t);a!=null&&(await crs.call("fs","save_file",{handle:a,content:e}),await crs.call("toast_notification","show",{message:"successfully saved",severity:"info"}))}async saveNew(t,e){const a=await crs.call("fs","write_new_file",{file_types:e,default_name:"undefined",content:t});return a.path=a.name,this.#t.push(a),a.name}}function l(r){r.sort((t,e)=>t.name<e.name?-1:t.name>e.name?1:0)}async function o(r,t,e,a){if(r.length==0)return;const n=await crs.binding.inflation.manager.get(e,r);for(;n?.firstElementChild;){const s=n.firstElementChild.cloneNode(!0);s.dataset.level=a,s.style.marginLeft=`${a*16}px`,t.appendChild(s),n.removeChild(n.firstElementChild)}}customElements.define("file-system",c);export{c as default};