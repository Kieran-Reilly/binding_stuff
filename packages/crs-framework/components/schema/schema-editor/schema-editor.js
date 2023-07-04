import"./../../text-editor/text-editor.js";import"./../../schema/schema-viewer/schema-viewer.js";import{loadHTML as i}from"./../../src/load-resources.js";const a=`{
  "variables": {
    "translations": {
      "button": "My Button"
    }
  },
  "body": {
    "elements": [
      {
        "element": "button",
        "caption": "@translations.button"
      }
    ]
  }
}
`;class n extends HTMLElement{#t;#s=this.#i.bind(this);#e;get parser(){return this.dataset.parser||"html"}get editor(){return this.#t==null&&(this.#t=this.querySelector("text-editor")),this.#t}async connectedCallback(){this.innerHTML=await i(import.meta.url),requestAnimationFrame(async()=>{this.editor.value=a,await this.update(),this.editor.addEventListener("change",this.#s),await crs.call("cssgrid","enable_resize",{element:this,options:{columns:[0]}})})}async disconnectedCallback(){this.editor.removeEventListener("change",this.#s),this.#s=null,await crs.call("cssgrid","disable_resize",{element:this}),this.#t=null,this.#e=null}async#i(e){if(this.#e!=!0){this.#e=!0;const t=setTimeout(()=>{clearTimeout(t),this.update(),this.#e=!1},32)}}async update(){const e=this.querySelector("schema-viewer");try{const t=this.editor.value,s=JSON.parse(t);await e.set_schema(this.parser,s)}catch{return}}}customElements.define("schema-editor",n);export{n as SchemaEditor};
