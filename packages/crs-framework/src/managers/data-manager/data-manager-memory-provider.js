import{BaseDataManager as o}from"./data-manager-base.js";class h extends o{#e;set records(e){this.setRecords(e)}async setRecords(e){this.#e=e,await super.setRecords(e)}async append(...e){this.#e.push(...e),super.append(this.#e.length)}async getAll(){return this.#e}async getPage(e,t){return this.#e.slice(e,t)}async getByIndex(e){return this.#e[e]}async getById(e){return this.#e.find(t=>t[this.idField]==e)}async getIds(e){const t=[];for(const s of e)t.push(this.#e[s][this.idField]);return t}async removeIndexes(e){e.sort((s,n)=>s>n?-1:1);const t=[];for(const s of e)t.push(this.#e[s][this.idField]),this.#e.splice(s,1);return super.removeIndexes(this.#e.length),{indexes:e,ids:t}}async removeIds(e){const t=[];for(const s of e){const n=this.#e.findIndex(i=>i[this.idField]==s);t.push(n),this.#e.splice(n,1)}return t.sort((s,n)=>s>n?-1:1),super.removeIds(this.#e.length),{indexes:t,ids:e}}async updateIndex(e,t){const s=this.#e[e],n=s[this.idField],i=Object.keys(t);for(const d of i)s[d]=t[d];return{id:n,index:e,changes:t}}async updateId(e,t){const s=this.#e.findIndex(d=>d[this.idField]==e),n=this.#e[s],i=Object.keys(t);for(const d of i)n[d]=t[d];return{id:e,index:s,changes:t}}async setSelectedIndexes(e,t){for(const s of e)this.#e[s]._selected=t;this.selectedCount+=t?e.length:-e.length}async setSelectedIds(e,t){for(const s of e){const n=this.#e.findIndex(i=>i[this.idField]==s);this.#e[n]._selected=t}this.selectedCount+=t?e.length:-e.length}async getSelected(e=!0){return this.#e.filter(t=>t._selected===e)}async toggleSelectedIndexes(e){for(const t of e){const s=!this.#e[t]._selected;this.#e[t]._selected=s,this.selectedCount+=s?1:-1}}async toggleSelectedIds(e){for(const t of e){const s=this.#e.findIndex(i=>i[this.idField]==t),n=!this.#e[s]._selected;this.#e[s]._selected=n,this.selectedCount+=n?1:-1}}async setSelectedAll(e){for(const t of this.#e)t._selected=e;this.selectedCount=e==!0?this.#e.length:0}}export{h as DataManagerMemoryProvider};
