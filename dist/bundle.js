(()=>{var e={371:(e,t,r)=>{r(738).config(Object.assign({},r(547),r(962)(process.argv)))},962:e=>{const t=/^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;e.exports=function(e){return e.reduce((function(e,r){const n=r.match(t);return n&&(e[n[1]]=n[2]),e}),{})}},547:e=>{const t={};null!=process.env.DOTENV_CONFIG_ENCODING&&(t.encoding=process.env.DOTENV_CONFIG_ENCODING),null!=process.env.DOTENV_CONFIG_PATH&&(t.path=process.env.DOTENV_CONFIG_PATH),null!=process.env.DOTENV_CONFIG_DEBUG&&(t.debug=process.env.DOTENV_CONFIG_DEBUG),null!=process.env.DOTENV_CONFIG_OVERRIDE&&(t.override=process.env.DOTENV_CONFIG_OVERRIDE),null!=process.env.DOTENV_CONFIG_DOTENV_KEY&&(t.DOTENV_KEY=process.env.DOTENV_CONFIG_DOTENV_KEY),e.exports=t},738:(e,t,r)=>{const n=r(147),o=r(17),s=r(37),i=r(113),a=r(968).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function u(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function d(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function l(e,t){let r;try{r=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code)throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");throw e}const n=r.password;if(!n)throw new Error("INVALID_DOTENV_KEY: Missing key part");const o=r.searchParams.get("environment");if(!o)throw new Error("INVALID_DOTENV_KEY: Missing environment part");const s=`DOTENV_VAULT_${o.toUpperCase()}`,i=e.parsed[s];if(!i)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:i,key:n}}function p(e){let t=o.resolve(process.cwd(),".env");return e&&e.path&&e.path.length>0&&(t=e.path),t.endsWith(".vault")?t:`${t}.vault`}const f={configDotenv:function(e){let t=o.resolve(process.cwd(),".env"),r="utf8";const i=Boolean(e&&e.debug);var a;e&&(null!=e.path&&(t="~"===(a=e.path)[0]?o.join(s.homedir(),a.slice(1)):a),null!=e.encoding&&(r=e.encoding));try{const o=f.parse(n.readFileSync(t,{encoding:r}));let s=process.env;return e&&null!=e.processEnv&&(s=e.processEnv),f.populate(s,o,e),{parsed:o}}catch(e){return i&&u(`Failed to load ${t} ${e.message}`),{error:e}}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const t=f._parseVault(e);let r=process.env;return e&&null!=e.processEnv&&(r=e.processEnv),f.populate(r,t,e),{parsed:t}},_parseVault:function(e){const t=p(e),r=f.configDotenv({path:t});if(!r.parsed)throw new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);const n=d(e).split(","),o=n.length;let s;for(let e=0;e<o;e++)try{const t=l(r,n[e].trim());s=f.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=o)throw t}return f.parse(s)},config:function(e){const t=p(e);return 0===d(e).length?f.configDotenv(e):n.existsSync(t)?f._configVault(e):(r=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${r}`),f.configDotenv(e));var r},decrypt:function(e,t){const r=Buffer.from(t.slice(-64),"hex");let n=Buffer.from(e,"base64");const o=n.slice(0,12),s=n.slice(-16);n=n.slice(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",r,o);return e.setAuthTag(s),`${e.update(n)}${e.final()}`}catch(e){const t=e instanceof RangeError,r="Invalid key length"===e.message,n="Unsupported state or unable to authenticate data"===e.message;if(t||r)throw new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");if(n)throw new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw console.error("Error: ",e.code),console.error("Error: ",e.message),e}},parse:function(e){const t={};let r,n=e.toString();for(n=n.replace(/\r\n?/gm,"\n");null!=(r=c.exec(n));){const e=r[1];let n=r[2]||"";n=n.trim();const o=n[0];n=n.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===o&&(n=n.replace(/\\n/g,"\n"),n=n.replace(/\\r/g,"\r")),t[e]=n}return t},populate:function(e,t,r={}){const n=Boolean(r&&r.debug),o=Boolean(r&&r.override);if("object"!=typeof t)throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(const r of Object.keys(t))Object.prototype.hasOwnProperty.call(e,r)?(!0===o&&(e[r]=t[r]),n&&u(!0===o?`"${r}" is already defined and WAS overwritten`:`"${r}" is already defined and was NOT overwritten`)):e[r]=t[r]}};e.exports.configDotenv=f.configDotenv,e.exports._configVault=f._configVault,e.exports._parseVault=f._parseVault,e.exports.config=f.config,e.exports.decrypt=f.decrypt,e.exports.parse=f.parse,e.exports.populate=f.populate,e.exports=f},347:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InternalError=t.NotFoundError=t.BadRequestError=void 0;class r extends Error{constructor(e){super(),this.message=e,this.name="BadRequestError",this.code=400}}t.BadRequestError=r;class n extends Error{constructor(e){super(),this.message=e,this.name="NotFoundError",this.code=404}}t.NotFoundError=n;class o extends Error{constructor(e){super(),this.message=e,this.name="InternalError",this.code=500}}t.InternalError=o},601:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.API_URL_WITH_ID=t.API_URL=void 0,t.API_URL=/^\/api\/users\/?$/,t.API_URL_WITH_ID=/^\/api\/users\/[^\/]+$/},120:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createUserController=void 0;const n=r(593);t.createUserController=function(e){return{getAll:async function(t,r){const o=await e.getAll();(0,n.sendResponse)(r,o)},getOne:async function(t,r){const o=(0,n.getId)(t.url),s=await e.getOne(o);(0,n.sendResponse)(r,s)},create:async function(t,r){const o=await(0,n.getBody)(t),s=await e.create(o);(0,n.sendResponse)(r,s,201)},delete:async function(t,r){const o=(0,n.getId)(t.url),s=await e.delete(o);(0,n.sendResponse)(r,s,204)},update:async function(t,r){const o=(0,n.getId)(t.url),s=await(0,n.getBody)(t),i=await e.update(o,s);(0,n.sendResponse)(r,i)}}}},607:(e,t,r)=>{"use strict";t.f=void 0,r(371);const n=r(685),o=r(873),s=Number(process.env.PORT||4e3);t.f=(0,n.createServer)((0,o.router)(s)),t.f.listen(s,(()=>{console.log(`Server #${process.pid} is running on port ${s}`)}))},172:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createUserRepository=void 0;const n=r(600),o=r(347);t.createUserRepository=function(e){return{getAll:async()=>e,getOne:async t=>{const r=e.find((e=>e.id===t));if(r)return r;throw new o.NotFoundError(`User with id ${t} not found`)},create:async t=>{const r={...t,id:(0,n.v4)()};return e.push(r),r},delete:async t=>{const r=e.find((e=>e.id===t));if(r)return e.splice(e.indexOf(r),1),"deleted";throw new o.NotFoundError(`User with id ${t} not found`)},update:async(t,r)=>{const n=e.find((e=>e.id===t));if(!n)throw new o.NotFoundError(`User with id ${t} not found`);const s={...r,id:t};return e.splice(e.indexOf(n),1,s),s}}}},873:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.router=void 0;const n=r(347),o=r(601),s=r(120),i=r(172),a=r(419),c=r(593);t.router=e=>{const t=(0,i.createUserRepository)([]),r=(0,a.createUserService)(t),u=(0,s.createUserController)(r);return async(t,r)=>{r.setHeader("Content-Type","application/json");try{const{url:s,method:i}=t;if(console.log(`Executing request: ${i} ${s} --- Server #${process.pid} on port ${e}`),!s.match(o.API_URL)&&!s.match(o.API_URL_WITH_ID))throw new n.NotFoundError(`Cannot ${i} ${s}`);switch(i){case"GET":s.match(o.API_URL_WITH_ID)?await u.getOne(t,r):await u.getAll(t,r);break;case"POST":if(!s.match(o.API_URL))throw new n.NotFoundError(`Cannot ${i} ${s}`);await u.create(t,r);break;case"PUT":await u.update(t,r);break;case"DELETE":await u.delete(t,r);break;default:throw new n.BadRequestError("Method is not supported")}}catch(e){const{code:t,message:o}=e;let s=500;e instanceof n.BadRequestError?s=400:e instanceof n.NotFoundError&&(s=404),(0,c.sendResponse)(r,{message:o},s)}}}},419:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createUserService=void 0;const n=r(600),o=r(593),s=r(347);t.createUserService=function(e){return{getAll:async()=>e.getAll(),async getOne(t){if(!(0,n.validate)(t))throw new s.BadRequestError("Invalid user id");return e.getOne(t)},async create(t){if(!(0,o.isUser)(t))throw new s.BadRequestError("Invalid user data");return e.create(t)},async delete(t){if(!(0,n.validate)(t))throw new s.BadRequestError("Invalid user id");return e.delete(t)},async update(t,r){if(!(0,n.validate)(t))throw new s.BadRequestError("Invalid user id");if(!(0,o.isUser)(r))throw new s.BadRequestError("Invalid user data");return e.update(t,r)}}}},593:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sendResponse=t.getBody=t.getId=t.isUser=void 0;const n=r(347);t.isUser=e=>"string"==typeof e.username&&"number"==typeof e.age&&Array.isArray(e.hobbies)&&e.hobbies.every((e=>"string"==typeof e)),t.getId=e=>{const t=e.match(/\/api\/users\/([\w-]+)/);return t?t[1]:null},t.getBody=async e=>new Promise(((t,r)=>{const o=[];e.on("data",(e=>{o.push(e)})).on("end",(()=>{const e=Buffer.concat(o).toString().trim();try{t(e?JSON.parse(e):{})}catch{r(new n.BadRequestError("Invalid user data"))}})).on("error",(()=>{r()}))})),t.sendResponse=function(e,t,r=200){e.statusCode=r,e.end(JSON.stringify(t))}},600:(e,t,r)=>{"use strict";r.r(t),r.d(t,{NIL:()=>N,parse:()=>y,stringify:()=>p,v1:()=>h,v3:()=>m,v4:()=>I,v5:()=>O,validate:()=>u,version:()=>D});var n=r(113),o=r.n(n);const s=new Uint8Array(256);let i=s.length;function a(){return i>s.length-16&&(o().randomFillSync(s),i=0),s.slice(i,i+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,u=function(e){return"string"==typeof e&&c.test(e)},d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function l(e,t=0){return(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase()}const p=function(e,t=0){const r=l(e,t);if(!u(r))throw TypeError("Stringified UUID is invalid");return r};let f,v,g=0,E=0;const h=function(e,t,r){let n=t&&r||0;const o=t||new Array(16);let s=(e=e||{}).node||f,i=void 0!==e.clockseq?e.clockseq:v;if(null==s||null==i){const t=e.random||(e.rng||a)();null==s&&(s=f=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==i&&(i=v=16383&(t[6]<<8|t[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),u=void 0!==e.nsecs?e.nsecs:E+1;const d=c-g+(u-E)/1e4;if(d<0&&void 0===e.clockseq&&(i=i+1&16383),(d<0||c>g)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=c,E=u,v=i,c+=122192928e5;const p=(1e4*(268435455&c)+u)%4294967296;o[n++]=p>>>24&255,o[n++]=p>>>16&255,o[n++]=p>>>8&255,o[n++]=255&p;const h=c/4294967296*1e4&268435455;o[n++]=h>>>8&255,o[n++]=255&h,o[n++]=h>>>24&15|16,o[n++]=h>>>16&255,o[n++]=i>>>8|128,o[n++]=255&i;for(let e=0;e<6;++e)o[n+e]=s[e];return t||l(o)},y=function(e){if(!u(e))throw TypeError("Invalid UUID");let t;const r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=255&t,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=255&t,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=255&t,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=255&t,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=255&t,r};function _(e,t,r){function n(e,n,o,s){var i;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}(e)),"string"==typeof n&&(n=y(n)),16!==(null===(i=n)||void 0===i?void 0:i.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(n),a.set(e,n.length),a=r(a),a[6]=15&a[6]|t,a[8]=63&a[8]|128,o){s=s||0;for(let e=0;e<16;++e)o[s+e]=a[e];return o}return l(a)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}const m=_("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("md5").update(e).digest()})),w={randomUUID:o().randomUUID},I=function(e,t,r){if(w.randomUUID&&!t&&!e)return w.randomUUID();const n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=n[e];return t}return l(n)},O=_("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("sha1").update(e).digest()})),N="00000000-0000-0000-0000-000000000000",D=function(e){if(!u(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(607)})();