const t=await crs.call("system","is_mobile",{}),e=t?"./context-menu-full.js":"./context-menu.js";await import(new URL(e,import.meta.url));
