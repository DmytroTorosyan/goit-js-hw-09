const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};function s(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}function e(t){document.body.style.backgroundColor=t}const n=new class{startChangeBGcolor(){this.isActive||(t.startBtn.disabled=!0,t.stopBtn.disabled=!1,this.isActive=!0,e(s()),this.intervalID=setInterval((()=>e(s())),1e3))}stopChangeBGcolor(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(this.intervalID),this.isActive=!1}constructor(s){this.intervalID=null,this.isActive=!1,this.updateBodyBGcolor=s,t.stopBtn.disabled=!0}};t.startBtn.addEventListener("click",(()=>n.startChangeBGcolor())),t.stopBtn.addEventListener("click",(()=>n.stopChangeBGcolor()));
//# sourceMappingURL=01-color-switcher.34d72193.js.map