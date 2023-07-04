async function r(t,n=!0){let e=await fetch(t.replace(".js",".html")).then(l=>l.text());return n&&(e=`${`<link rel="stylesheet" href="${t.replace(".js",".css")}">`}${e}`),e}export{r as loadHTML};
