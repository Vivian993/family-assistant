/* ============ LUNAR CALENDAR (1900-2100, classic algorithm) ============ */
const lunarInfo=[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
0x0d520];
const cDay=['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
function lYearDays(y){let sum=348;for(let i=0x8000;i>0x8;i>>=1)sum+=(lunarInfo[y-1900]&i)?1:0;return sum+leapDays(y);}
function leapMonth(y){return lunarInfo[y-1900]&0xf;}
function leapDays(y){if(leapMonth(y))return (lunarInfo[y-1900]&0x10000)?30:29;return 0;}
function monthDays(y,m){return (lunarInfo[y-1900]&(0x10000>>m))?30:29;}
function solar2lunar(y,m,d){
  const base=new Date(1900,0,31);
  const obj=new Date(y,m-1,d);
  let offset=Math.round((obj-base)/86400000);
  let temp=0,lYear=1900;
  for(;lYear<2101&&offset>0;lYear++){temp=lYearDays(lYear);offset-=temp;}
  if(offset<0){offset+=temp;lYear--;}
  const leap=leapMonth(lYear);
  let isLeap=false,lMonth=1;
  for(;lMonth<13&&offset>0;lMonth++){
    if(leap>0&&lMonth===(leap+1)&&!isLeap){--lMonth;isLeap=true;temp=leapDays(lYear);}
    else{temp=monthDays(lYear,lMonth);}
    if(isLeap&&lMonth===(leap+1))isLeap=false;
    offset-=temp;
  }
  if(offset===0&&leap>0&&lMonth===leap+1){if(isLeap){isLeap=false;}else{isLeap=true;--lMonth;}}
  if(offset<0){offset+=temp;--lMonth;}
  return {year:lYear,month:lMonth,day:offset+1,isLeap:isLeap};
}
function lunarLabel(y,m,d){
  const l=solar2lunar(y,m,d);
  if(l.day===1)return (l.isLeap?'閏':'')+l.month+'月';
  return cDay[l.day-1];
}
const solarFestivals={'1-1':'元旦','2-28':'和平紀念日','4-4':'兒童節','5-1':'勞動節','10-10':'國慶日'};
const lunarFestivals={'1-1':'春節','1-15':'元宵節','5-5':'端午節','7-15':'中元節','8-15':'中秋節','9-9':'重陽節','12-30':'除夕','12-29':'除夕'};

/* ============ STORE ============ */
const store={
  get(k,d){try{const v=localStorage.getItem('fla_'+k);return v?JSON.parse(v):d;}catch(e){return d;}},
  set(k,v){try{localStorage.setItem('fla_'+k,JSON.stringify(v));}catch(e){}}
};
let settings=store.get('settings',{fontScale:1,theme:'pink',dark:false,voiceRate:1,voiceGender:'female',buttonSound:true});
let todos=store.get('todos',[]);
let calcHistory=store.get('calcHistory',[]);
let calcTheme=store.get('calcTheme','pink');
let subtotal=0;
let currentView='home';
let calMonth=new Date().getMonth(), calYear=new Date().getFullYear();

/* festival data — per user's original list, kept concise (deity + ancestor offerings) */
const defaultFestivals=[
  {id:'cny',emoji:'🧨',name:'除夕',time:'早上10點拜拜',guanyin:['三牲','酒禮'],ancestor:['三牲','酒禮','一對鮮花💐']},
  {id:'lantern',emoji:'🏮',name:'元宵節',time:'',guanyin:['水果🍎'],ancestor:['三牲','酒禮']},
  {id:'dragonboat',emoji:'🍙',name:'端午節',time:'',guanyin:['清粽','粽子'],ancestor:['清粽','粽子','三牲','酒禮']},
  {id:'ghost',emoji:'🏯',name:'中元節',time:'',guanyin:['水果🍎'],ancestor:['三牲','酒禮']},
  {id:'midautumn',emoji:'🥮',name:'中秋節',time:'',guanyin:['月餅🥮','水果🍎'],ancestor:['月餅🥮','水果🍎']},
  {id:'chongyang',emoji:'🌼',name:'重陽節',time:'',guanyin:[],ancestor:['三牲','酒禮']},
  {id:'dongzhi',emoji:'🍡',name:'冬至',time:'',guanyin:['清湯圓'],ancestor:['清湯圓']}
];
let festivals=store.get('festivals',defaultFestivals);

/* ============ NAV (colorful stacked tabs) ============ */
const navItems=[
  {id:'home',lbl:'待辦事項',color:'var(--cream)'},
  {id:'calc',lbl:'計算機',color:'var(--pink)'},
  {id:'fest',lbl:'重要節日',color:'var(--purple)'},
  {id:'weather',lbl:'天氣',color:'var(--blue)'},
  {id:'map',lbl:'地圖',color:'var(--peach)'},
  {id:'news',lbl:'新聞',color:'var(--milktea)'},
  {id:'note',lbl:'語音筆記',color:'var(--mint)'},
  {id:'settings',lbl:'設定',color:'var(--grey)'}
];
function renderNav(){
  document.getElementById('nav').innerHTML=navItems.map(n=>
    `<button class="nav-btn ${currentView===n.id?'active':''}" style="background:${n.color}" onclick="switchView('${n.id}')">
      <span class="lbl">${n.lbl}</span>
    </button>`).join('');
}
function switchView(v){currentView=v;renderNav();renderMain();}

function renderMain(){
  const m=document.getElementById('main');
  if(currentView==='home')m.innerHTML=homeHTML();
  else if(currentView==='calc')m.innerHTML=calcHTML();
  else if(currentView==='fest')m.innerHTML=festHTML();
  else if(currentView==='weather')m.innerHTML=weatherHTML();
  else if(currentView==='map')m.innerHTML=mapHTML();
  else if(currentView==='news')m.innerHTML=newsHTML();
  else if(currentView==='note')m.innerHTML=noteHTML();
  else if(currentView==='settings')m.innerHTML=settingsHTML();
  afterRender();
}

/* ============ HOME ============ */
function isRedDay(y,m,d){
  const l=solar2lunar(y,m,d);
  return l.day===1||l.day===15;
}
function homeHTML(){
  ensureLunarReminders();
  const now=new Date();
  const wd=['日','一','二','三','四','五','六'][now.getDay()];
  const l=solar2lunar(now.getFullYear(),now.getMonth()+1,now.getDate());
  const dow=['日','一','二','三','四','五','六'];
  const first=new Date(calYear,calMonth,1);
  const startDow=first.getDay();
  const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
  let cells='';
  for(let i=0;i<startDow;i++)cells+='<div class="cal-cell empty"></div>';
  for(let d=1;d<=daysInMonth;d++){
    const lab=lunarLabel(calYear,calMonth+1,d);
    const key=(calMonth+1)+'-'+d;
    const lk=solar2lunar(calYear,calMonth+1,d);
    const lkeyStr=lk.month+'-'+lk.day;
    const isFest=solarFestivals[key]||lunarFestivals[lkeyStr];
    const red=isRedDay(calYear,calMonth+1,d);
    const isToday=(calYear===now.getFullYear()&&calMonth===now.getMonth()&&d===now.getDate());
    const has=todos.some(t=>t.date===`${calYear}-${calMonth+1}-${d}`);
    cells+=`<div class="cal-cell ${isFest?'festival':(red?'redday':'')} ${isToday?'today':''}" data-y="${calYear}" data-m="${calMonth+1}" data-d="${d}">
      <div class="d">${d}</div><div class="l">${isFest||lab}</div>${has?'<div class="dot"></div>':''}
    </div>`;
  }
  const todoHTML=todos.length?todos.slice().sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999')).map(t=>`
    <div class="todo-item ${t.done?'done':''}" data-id="${t.id}">
      <div class="swipe-inner">
        <button class="chk" onclick="toggleTodo('${t.id}')"></button>
        <div class="txt">${escapeHtml(t.text)}${t.date?`<span class="dt">${t.date}</span>`:''}</div>
        <div class="act"><button onclick="editTodo('${t.id}')">✏️</button></div>
      </div>
      <div class="del-reveal" onclick="deleteTodo('${t.id}')">刪除</div>
    </div>`).join(''):'<div class="empty-hint">目前沒有待辦事項，點兩下日曆日期即可新增！</div>';

  return `
  <div class="home-top">
    <div class="card date-card">
      <div class="date-block">
        <p class="date-big">${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}（${wd}）</p>
        <p class="date-sub">農曆${l.month}月<span class="${(l.day===1||l.day===15)?'redday redday-txt':''}" style="${(l.day===1||l.day===15)?'color:#D65C5C;font-weight:700;':''}">${cDay[l.day-1]}</span></p>
      </div>
      <button class="btn btn-primary announce-btn" onclick="speakAnnounce()">🔊 播報</button>
    </div>
    <div class="card clock-card">
      <div class="clock-face" id="clockFace">
        <div class="clock-hand hand-h" id="handH"></div>
        <div class="clock-hand hand-m" id="handM"></div>
        <div class="clock-hand hand-s" id="handS"></div>
        <div class="clock-center"></div>
      </div>
      <div id="digitalTime"></div>
    </div>
  </div>
  <div id="announceText" style="display:none;">今天是${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日，星期${wd}，現在${formatTimeZh(now)}。</div>

  <div class="card cal-card">
    <div class="cal-head">
      <button class="btn btn-ghost" onclick="changeMonth(-1)">◀</button>
      <h2>${calYear}年 ${calMonth+1}月</h2>
      <button class="btn btn-ghost" onclick="changeMonth(1)">▶</button>
    </div>
    <div class="cal-grid">
      ${dow.map(w=>`<div class="cal-dow">${w}</div>`).join('')}
      ${cells}
    </div>
  </div>

  <div class="card todo-list">
    <h2>📝 待辦事項</h2>
    <div class="hint-banner"><span class="ic">💡</span><span>小提示：在上面月曆的日期上快速點兩下，就可以新增待辦事項；完成的項目點左邊方框打勾會變淡色；手指向左滑動會出現紅色「刪除」，再點一下才會真的刪除。</span></div>
    ${renderReminderNote()}
    <div class="quick-add">
      <input id="quickTodoInput" placeholder="輸入新的待辦事項...">
      <button class="btn btn-primary" onclick="quickAddTodo()">新增</button>
    </div>
    ${todoHTML}
  </div>`;
}
function renderReminderNote(){
  const upcoming=todos.filter(t=>t.type==='reminder'&&!t.done);
  if(!upcoming.length)return'';
  return `<div class="reminder-note">🔔 提醒：${upcoming.map(t=>escapeHtml(t.text)).join('；')}</div>`;
}
function formatTimeZh(d){
  let h=d.getHours(),m=d.getMinutes();
  const ampm=h<12?'上午':'下午';
  let h12=h%12;if(h12===0)h12=12;
  return `${ampm}${h12}點${m===0?'整':m+'分'}`;
}
function changeMonth(delta){
  calMonth+=delta;
  if(calMonth<0){calMonth=11;calYear--;}
  if(calMonth>11){calMonth=0;calYear++;}
  renderMain();
}
/* auto reminder 2 days before lunar 初一/十五, scanning the next 30 days */
function ensureLunarReminders(){
  const today=new Date();today.setHours(0,0,0,0);
  for(let i=0;i<30;i++){
    const check=new Date(today);check.setDate(today.getDate()+i);
    const l=solar2lunar(check.getFullYear(),check.getMonth()+1,check.getDate());
    if(l.day===1||l.day===15){
      const remindDate=new Date(check);remindDate.setDate(check.getDate()-2);
      if(remindDate>=today){
        const key=`${remindDate.getFullYear()}-${remindDate.getMonth()+1}-${remindDate.getDate()}`;
        const text=`農曆${l.day===1?'初一':'十五'}將至，記得準備供品`;
        const exists=todos.some(t=>t.date===key&&t.text===text);
        if(!exists){
          todos.push({id:crypto.randomUUID(),text,done:false,date:key,type:'reminder'});
        }
      }
    }
  }
  store.set('todos',todos);
}

/* ---- add-todo modal (double-tap a calendar cell) ---- */
let lastTapInfo=null;
function bindCalTaps(){
  document.querySelectorAll('.cal-cell:not(.empty)').forEach(cell=>{
    cell.addEventListener('dblclick',()=>openAddTodoModal(+cell.dataset.y,+cell.dataset.m,+cell.dataset.d));
    cell.addEventListener('click',()=>{
      const now=Date.now();
      const key=cell.dataset.y+'-'+cell.dataset.m+'-'+cell.dataset.d;
      if(lastTapInfo&&lastTapInfo.key===key&&now-lastTapInfo.time<400){
        openAddTodoModal(+cell.dataset.y,+cell.dataset.m,+cell.dataset.d);
        lastTapInfo=null;
      }else{
        lastTapInfo={key,time:now};
      }
    });
  });
}
function openAddTodoModal(y,m,d){
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`
    <div class="modal-box">
      <h3>新增待辦事項</h3>
      <div class="mdate">📅 ${y}年${m}月${d}日</div>
      <input id="modalTodoInput" placeholder="請輸入待辦內容...">
      <div class="modal-actions">
        <button class="btn btn-ghost" id="modalCancel">取消</button>
        <button class="btn btn-primary" id="modalSave">儲存</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const input=overlay.querySelector('#modalTodoInput');
  input.focus();
  const close=()=>overlay.remove();
  overlay.querySelector('#modalCancel').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  const save=()=>{
    const v=input.value.trim();
    if(v){
      todos.push({id:crypto.randomUUID(),text:v,done:false,date:`${y}-${m}-${d}`});
      store.set('todos',todos);
      renderMain();
    }
    close();
  };
  overlay.querySelector('#modalSave').onclick=save;
  input.addEventListener('keypress',e=>{if(e.key==='Enter')save();});
}
function quickAddTodo(){
  const inp=document.getElementById('quickTodoInput');
  const v=inp.value.trim();if(!v)return;
  todos.push({id:crypto.randomUUID(),text:v,done:false,date:null});
  store.set('todos',todos);renderMain();
}
function toggleTodo(id){const t=todos.find(x=>x.id===id);if(t){t.done=!t.done;store.set('todos',todos);renderMain();}}
function editTodo(id){
  const t=todos.find(x=>x.id===id);if(!t)return;
  const v=prompt('修改待辦事項：',t.text);
  if(v&&v.trim()){t.text=v.trim();store.set('todos',todos);renderMain();}
}
function deleteTodo(id){todos=todos.filter(x=>x.id!==id);store.set('todos',todos);renderMain();}
function speakAnnounce(){speak(document.getElementById('announceText').textContent);}
function escapeHtml(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}

let clockInterval=null;
function tickClock(){
  const now=new Date();
  const h=document.getElementById('handH'),mm=document.getElementById('handM'),s=document.getElementById('handS'),dg=document.getElementById('digitalTime');
  if(!h)return;
  const hr=now.getHours()%12,min=now.getMinutes(),sec=now.getSeconds();
  h.style.transform=`rotate(${hr*30+min*0.5}deg)`;
  mm.style.transform=`rotate(${min*6}deg)`;
  s.style.transform=`rotate(${sec*6}deg)`;
  dg.textContent=now.toLocaleTimeString('zh-TW',{hour12:false});
}

/* swipe-to-reveal delete, swipe left */
function enableSwipe(){
  document.querySelectorAll('.todo-item').forEach(el=>{
    let startX=0,dx=0,inner=el.querySelector('.swipe-inner');
    el.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;},{passive:true});
    el.addEventListener('touchmove',e=>{
      dx=e.touches[0].clientX-startX;
      if(dx<0)inner.style.transform=`translateX(${Math.max(dx,-76)}px)`;
    },{passive:true});
    el.addEventListener('touchend',()=>{
      if(dx<-40){el.classList.add('swipe-left');inner.style.transform='';}
      else{el.classList.remove('swipe-left');inner.style.transform='';}
      dx=0;
    });
  });
}

/* ============ CALCULATOR ============ */
let calcExpr='';
function calcHTML(){
  const dispBg=calcTheme==='pink'?'#F3DEDF':'#DCE9F0';
  return `
  <div class="calc-wrap">
    <div class="card calc-box">
      <div class="calc-theme-toggle">
        <button class="btn ${calcTheme==='pink'?'btn-primary':'btn-ghost'}" onclick="setCalcTheme('pink')">🌸 粉紅</button>
        <button class="btn ${calcTheme==='blue'?'btn-primary':'btn-ghost'}" onclick="setCalcTheme('blue')">💙 粉藍</button>
      </div>
      <div class="calc-display" id="calcDisplay" style="background:${dispBg};">${calcExpr||'0'}</div>
      <div class="calc-keys">
        ${['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','C','+','='].map(k=>{
          let cls='';if(['÷','×','−','+'].includes(k))cls='op';if(k==='=')cls='eq';
          return `<button class="${cls}" onclick="calcPress('${k}')">${k}</button>`;
        }).join('')}
      </div>
    </div>
    <div class="calc-side">
      <div class="hint-banner"><span class="ic">💡</span><span>小提示：按數字和符號後按「＝」計算，「加入小計」可以把這筆結果累加起來；紀錄旁的🗑可以刪掉單一筆紀錄，「清除全部紀錄」可以一次清空。</span></div>
      <div class="card subtotal-box">
        <div style="font-weight:700;">🧾 本次購物小計</div>
        <div class="amt" id="subtotalAmt">${subtotal}</div>
        <button class="btn btn-ghost" onclick="clearSubtotal()">清空小計</button>
      </div>
      <div class="card">
        <div class="hist-head">
          <h3 style="margin:0;">🕒 最近計算紀錄</h3>
          <button class="btn btn-ghost" style="min-height:36px;padding:6px 12px;" onclick="clearAllHistory()">清除全部紀錄</button>
        </div>
        <div id="histList">${renderHistList()}</div>
      </div>
    </div>
  </div>`;
}
function renderHistList(){
  return calcHistory.length?calcHistory.map((h,i)=>`<div class="hist-item"><span>${h}</span><div class="hactions"><button onclick="addToSubtotal(${i})">加入小計</button><button class="del" onclick="deleteHistItem(${i})">🗑</button></div></div>`).join(''):'<div class="empty-hint">尚無紀錄</div>';
}
function deleteHistItem(i){calcHistory.splice(i,1);store.set('calcHistory',calcHistory);const hl=document.getElementById('histList');if(hl)hl.innerHTML=renderHistList();}
function clearAllHistory(){calcHistory=[];store.set('calcHistory',calcHistory);const hl=document.getElementById('histList');if(hl)hl.innerHTML=renderHistList();}
function setCalcTheme(t){
  calcTheme=t;store.set('calcTheme',t);
  document.documentElement.style.setProperty('--accent',t==='pink'?'var(--pink-deep)':'var(--blue-deep)');
  renderMain();
}
function calcPress(k){
  if(k==='C'){calcExpr='';}
  else if(k==='='){
    try{
      const evalExpr=calcExpr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
      const result=Function('"use strict";return ('+evalExpr+')')();
      calcHistory.unshift(`${calcExpr}=${result}`);
      calcHistory=calcHistory.slice(0,10);
      store.set('calcHistory',calcHistory);
      calcExpr=String(result);
    }catch(e){calcExpr='錯誤';}
  }else{calcExpr+=k;}
  document.getElementById('calcDisplay').textContent=calcExpr||'0';
  const hl=document.getElementById('histList');
  if(hl)hl.innerHTML=renderHistList();
}
function addToSubtotal(i){
  const line=calcHistory[i];
  const val=parseFloat(line.split('=')[1]);
  if(!isNaN(val)){subtotal=Math.round((subtotal+val)*100)/100;document.getElementById('subtotalAmt').textContent=subtotal;}
}
function clearSubtotal(){subtotal=0;const el=document.getElementById('subtotalAmt');if(el)el.textContent='0';}

/* ============ FESTIVALS ============ */
function festHTML(){
  return `<div class="hint-banner"><span class="ic">💡</span><span>小提示：點一下供品文字就能直接修改，點「✕」可以刪除項目，點「＋新增」可以加入新的供品。</span></div>
  <div class="fest-grid">
    ${festivals.map(f=>`
    <div class="card fest-card">
      <div class="fhead"><div class="emoji">${f.emoji}</div><h3>${escapeHtml(f.name)}</h3></div>
      ${f.time?`<div class="ftime">🌗🌗 ${escapeHtml(f.time)}</div>`:''}
      <div class="fest-sec sec-guanyin">
        <div class="sec-label">觀世音菩薩</div>
        <div class="fest-pill-row">
          ${f.guanyin.map((it,i)=>`<span class="fest-pill"><span contenteditable="true" onblur="updateFestItem('${f.id}','guanyin',${i},this.textContent)">${escapeHtml(it)}</span><span class="rm" onclick="removeFestItem('${f.id}','guanyin',${i})">✕</span></span>`).join('')}
          <span class="fest-add" onclick="addFestItem('${f.id}','guanyin')">＋新增</span>
        </div>
      </div>
      <div class="fest-sec sec-ancestor">
        <div class="sec-label">祖先</div>
        <div class="fest-pill-row">
          ${f.ancestor.map((it,i)=>`<span class="fest-pill"><span contenteditable="true" onblur="updateFestItem('${f.id}','ancestor',${i},this.textContent)">${escapeHtml(it)}</span><span class="rm" onclick="removeFestItem('${f.id}','ancestor',${i})">✕</span></span>`).join('')}
          <span class="fest-add" onclick="addFestItem('${f.id}','ancestor')">＋新增</span>
        </div>
      </div>
    </div>`).join('')}
  </div>`;
}
function updateFestItem(id,section,i,val){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  f[section][i]=val.trim();store.set('festivals',festivals);
}
function removeFestItem(id,section,i){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  f[section].splice(i,1);store.set('festivals',festivals);renderMain();
}
function addFestItem(id,section){
  const v=prompt('新增供品項目：');
  if(v&&v.trim()){
    const f=festivals.find(x=>x.id===id);
    f[section].push(v.trim());store.set('festivals',festivals);renderMain();
  }
}

/* ============ WEATHER (illustrative / mock) ============ */
/* ============ WEATHER (real data via Open-Meteo, no API key needed) ============ */
function wmoInfo(code){
  const map={
    0:['☀️','晴天'],1:['🌤️','大致晴朗'],2:['⛅','多雲'],3:['☁️','陰天'],
    45:['🌫️','有霧'],48:['🌫️','霧凇'],
    51:['🌦️','毛毛雨'],53:['🌦️','毛毛雨'],55:['🌦️','毛毛雨'],
    61:['🌧️','小雨'],63:['🌧️','中雨'],65:['🌧️','大雨'],
    71:['🌨️','小雪'],73:['🌨️','中雪'],75:['🌨️','大雪'],
    80:['🌦️','短暫陣雨'],81:['🌦️','陣雨'],82:['⛈️','強陣雨'],
    95:['⛈️','雷雨']
  };
  return map[code]||['🌡️','天氣'];
}
function uvLevel(uv){
  if(uv==null||isNaN(uv))return'—';
  if(uv<3)return'低量級';
  if(uv<6)return'中量級';
  if(uv<8)return'高量級';
  if(uv<11)return'過量級';
  return'危險級';
}
function windLevel(kmh){
  if(kmh==null||isNaN(kmh))return'—';
  if(kmh<6)return'1級 無風';
  if(kmh<20)return'2-3級 微風';
  if(kmh<39)return'4-5級 和風';
  if(kmh<62)return'6-7級 強風';
  return'8級以上 強烈大風';
}
function clothingSuggest(t){
  if(t==null||isNaN(t))return'—';
  if(t>=30)return'短袖、防曬';
  if(t>=25)return'短袖或薄長袖';
  if(t>=20)return'薄長袖外套';
  if(t>=15)return'長袖＋外套';
  return'保暖厚外套';
}
function getPosition(){
  return new Promise(resolve=>{
    if(!navigator.geolocation){resolve(null);return;}
    navigator.geolocation.getCurrentPosition(p=>resolve(p),()=>resolve(null),{timeout:5000});
  });
}
function weatherHTML(){
  return `
  <div class="hint-banner"><span class="ic">💡</span><span>小提示：這裡會自動抓取你目前位置的即時天氣（需要允許定位權限與網路連線），如果沒有網路或定位，會改顯示示意資料。</span></div>
  <div class="card">
    <h2 style="margin-top:0;">☁️ 今天天氣</h2>
    <div id="weatherBody"><div class="empty-hint">讀取天氣資料中...</div></div>
  </div>`;
}
async function loadWeather(){
  const box=document.getElementById('weatherBody');
  if(!box)return;
  try{
    const pos=await getPosition();
    const lat=pos?pos.coords.latitude:25.0330;
    const lon=pos?pos.coords.longitude:121.5654;
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&timezone=auto`;
    const res=await fetch(url);
    if(!res.ok)throw new Error('fetch failed');
    const data=await res.json();
    box.innerHTML=renderWeatherBody(data,!pos);
  }catch(e){
    box.innerHTML=`<div class="empty-hint">目前無法取得即時天氣（可能沒有網路連線），暫時顯示示意資料。</div>`+renderWeatherBody(null,false);
  }
}
function renderWeatherBody(data,usedDefaultLoc){
  let cur,today,week;
  if(data&&data.current&&data.daily){
    const c=data.current,d=data.daily;
    const [emoji,desc]=wmoInfo(c.weather_code);
    cur={temp:c.temperature_2m,desc,emoji,wind:windLevel(c.wind_speed_10m),humidity:Math.round(c.relative_humidity_2m)};
    today={max:Math.round(d.temperature_2m_max[0]),min:Math.round(d.temperature_2m_min[0]),uv:d.uv_index_max?d.uv_index_max[0]:null,rain:d.precipitation_probability_max?d.precipitation_probability_max[0]:null};
    week=d.time.slice(0,7).map((t,i)=>{
      const [e]=wmoInfo(d.weather_code[i]);
      const wd=['日','一','二','三','四','五','六'][new Date(t+'T00:00').getDay()];
      return [i===0?'今日':'週'+wd,e,Math.round(d.temperature_2m_max[i]),Math.round(d.temperature_2m_min[i])];
    });
  }else{
    cur={temp:27,desc:'多雲時晴（示意）',emoji:'⛅',wind:'3級 微風',humidity:72};
    today={max:30,min:24,uv:6,rain:40};
    week=[['今日','⛅',30,24],['週日','🌧️',27,23],['週一','🌦️',28,23],['週二','☀️',31,25],['週三','☀️',32,25],['週四','⛅',29,24],['週五','🌧️',26,22]];
  }
  return `
    <div class="weather-today">
      <div class="emoji">${cur.emoji}</div>
      <div>
        <div style="font-size:calc(24px*var(--font-scale));font-weight:800;">${today.min}° ~ ${today.max}°C　${cur.desc}</div>
        <div class="reminder-note" style="margin-top:8px;">${today.rain!=null?`今天降雨機率 ${today.rain}%，`:''}建議穿著：${clothingSuggest(cur.temp)}。${usedDefaultLoc?'（未取得定位，顯示台北地區天氣）':''}</div>
      </div>
    </div>
    <div class="weather-stats">
      <div class="wstat"><div class="e">🌞</div><div class="lab">紫外線</div><div class="val">${uvLevel(today.uv)}</div></div>
      <div class="wstat"><div class="e">🌬️</div><div class="lab">風力</div><div class="val">${cur.wind}</div></div>
      <div class="wstat"><div class="e">💧</div><div class="lab">濕度</div><div class="val">${cur.humidity}%</div></div>
      <div class="wstat"><div class="e">👕</div><div class="lab">穿衣建議</div><div class="val">${clothingSuggest(cur.temp)}</div></div>
    </div>
    <div style="margin-top:16px;">
      <h2 style="margin:0 0 8px;">📆 一週預報</h2>
      <div class="weather-week">
        ${week.map(w=>`<div class="w-day"><div>${w[0]}</div><div class="e">${w[1]}</div><div>${w[2]}°/${w[3]}°</div></div>`).join('')}
      </div>
    </div>`;
}

/* ============ SHARED "SHORTCUT GRID" COMPONENT (used by 新聞常用連結 + 地圖常用查詢) ============ */
function renderShortcutGrid(list,containerId){
  return `<div class="link-grid" id="${containerId}">
    ${list.map((l,i)=>`
      <div class="link-card" data-idx="${i}">
        <span class="lrm" data-idx="${i}" data-action="remove">✕</span>
        ${l.img?`<img class="le-img" src="${l.img}">`:`<div class="le">${l.ic||'🔗'}</div>`}
        <div class="ln">${escapeHtml(l.name)}</div>
      </div>`).join('')}
    <div class="link-add" data-action="add">＋ 新增</div>
  </div>`;
}
function bindShortcutGrid(containerId,list,storeKey,rerenderFn){
  const el=document.getElementById(containerId);
  if(!el)return;
  el.querySelectorAll('.link-card').forEach(card=>{
    const idx=+card.dataset.idx;
    card.addEventListener('click',(e)=>{
      if(e.target.dataset.action==='remove'){
        list.splice(idx,1);
        store.set(storeKey,list);
        rerenderFn();
        return;
      }
      const url=list[idx]&&list[idx].url;
      if(url)window.open(url,'_blank');
    });
  });
  const addBtn=el.querySelector('[data-action="add"]');
  if(addBtn)addBtn.addEventListener('click',()=>openAddShortcutModal(list,storeKey,rerenderFn));
}
function compressImageFile(file,maxDim=160,quality=0.7){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        let w=img.width,h=img.height;
        if(w>h){if(w>maxDim){h=Math.round(h*maxDim/w);w=maxDim;}}
        else{if(h>maxDim){w=Math.round(w*maxDim/h);h=maxDim;}}
        const canvas=document.createElement('canvas');
        canvas.width=w;canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL('image/jpeg',quality));
      };
      img.onerror=()=>reject(new Error('圖片讀取失敗'));
      img.src=reader.result;
    };
    reader.onerror=()=>reject(new Error('檔案讀取失敗'));
    reader.readAsDataURL(file);
  });
}
function openAddShortcutModal(list,storeKey,rerenderFn){
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`
    <div class="modal-box">
      <h3>新增常用項目</h3>
      <input id="scName" placeholder="名稱（例如：農民曆、附近醫院）">
      <input id="scUrl" placeholder="網址（例如：https://...）">
      <div style="margin:2px 0 8px;font-size:calc(14px*var(--font-scale));color:var(--ink-soft);">圖示（擇一即可）：</div>
      <input id="scEmoji" placeholder="輸入一個 emoji，例如 🏥" style="margin-bottom:8px;">
      <label class="btn btn-ghost" style="display:inline-block;margin-bottom:14px;">
        或上傳照片<input type="file" accept="image/*" id="scPhoto" style="display:none;">
      </label>
      <div class="sc-preview" id="scPreview" style="margin-bottom:10px;"></div>
      <div class="modal-actions">
        <button class="btn btn-ghost" id="scCancel">取消</button>
        <button class="btn btn-primary" id="scSave">儲存</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  let photoData=null;
  overlay.querySelector('#scPhoto').addEventListener('change',async(e)=>{
    const f=e.target.files[0];if(!f)return;
    try{
      photoData=await compressImageFile(f);
      overlay.querySelector('#scPreview').innerHTML=`<img src="${photoData}" style="width:60px;height:60px;">`;
    }catch(err){alert('照片處理失敗，請換一張試試。');}
  });
  const close=()=>overlay.remove();
  overlay.querySelector('#scCancel').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  overlay.querySelector('#scSave').onclick=()=>{
    const name=overlay.querySelector('#scName').value.trim();
    let url=overlay.querySelector('#scUrl').value.trim();
    const emoji=overlay.querySelector('#scEmoji').value.trim();
    if(!name||!url){alert('請輸入名稱和網址');return;}
    if(!/^https?:\/\//i.test(url))url='https://'+url;
    const item={id:crypto.randomUUID(),name,url};
    if(photoData)item.img=photoData;else item.ic=emoji||'🔗';
    list.push(item);
    store.set(storeKey,list);
    close();
    rerenderFn();
  };
}

/* ============ NEWS (real RSS via free rss2json proxy) + QUICK LINKS ============ */
const defaultLinks=[
  {id:'weather-gov',ic:'🌦️',name:'中央氣象署',url:'https://www.cwa.gov.tw/'},
  {id:'gov-service',ic:'🏛️',name:'台灣政府服務網',url:'https://www.gov.tw/'},
  {id:'health',ic:'💊',name:'健保署',url:'https://www.nhi.gov.tw/'},
  {id:'transport',ic:'🚌',name:'公路客運動態',url:'https://www.taiwanbus.tw/ebuspage/Default.aspx?lan=C'}
];
let quickLinks=store.get('quickLinks',defaultLinks);
/* fix a previously-wrong default link for people who already saved the old version */
(function migrateQuickLinks(){
  let changed=false;
  quickLinks.forEach(l=>{
    if(l.url==='https://www.taiwan.gov.tw/'&&l.name==='台灣公共運輸'){
      l.name='公路客運動態';l.url='https://www.taiwanbus.tw/ebuspage/Default.aspx?lan=C';l.ic='🚌';changed=true;
    }
  });
  if(changed)store.set('quickLinks',quickLinks);
})();
const NEWS_FEED_URL='https://about.pts.org.tw/rss/XML/newsfeed.xml';
let newsItemsCache=[];
function newsHTML(){
  return `<div class="hint-banner"><span class="ic">💡</span><span>小提示：以下是公視新聞網的即時新聞（需要網路連線）。點「閱讀全文」會另開新分頁看完整新聞。下方「常用連結」可以自己新增常去的網站，也可以上傳照片當作圖示。</span></div>
  <div class="card">
    <h2 style="margin-top:0;">📰 最新新聞</h2>
    <div id="newsBody"><div class="empty-hint">讀取新聞中...</div></div>
  </div>
  <div class="card" style="margin-top:16px;">
    <h2 style="margin-top:0;">🔗 常用連結</h2>
    ${renderShortcutGrid(quickLinks,'linkGrid')}
  </div>`;
}
async function loadNews(){
  const box=document.getElementById('newsBody');
  if(!box)return;
  try{
    const url='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(NEWS_FEED_URL)+'&count=6';
    const res=await fetch(url);
    if(!res.ok)throw new Error('fetch failed');
    const data=await res.json();
    if(data.status!=='ok'||!data.items||!data.items.length)throw new Error('no items');
    newsItemsCache=data.items;
    box.innerHTML=data.items.map((it,i)=>{
      const img=it.thumbnail||(it.enclosure&&it.enclosure.link)||'';
      const date=it.pubDate?it.pubDate.split(' ')[0]:'';
      const desc=(it.description||'').replace(/<[^>]+>/g,'').trim().slice(0,60);
      return `<div class="news-item">
        <div class="thumb" data-idx="${i}">${img?'':'📰'}</div>
        <div style="flex:1;">
          <h4>${escapeHtml(it.title||'')}</h4>
          <p>${date?date+'．':''}${escapeHtml(desc)}${desc.length>=60?'…':''}</p>
          <button class="btn btn-soft" data-idx="${i}">閱讀全文</button>
        </div>
      </div>`;
    }).join('')+`<div style="text-align:right;color:var(--ink-soft);font-size:calc(12px*var(--font-scale));margin-top:4px;">資料來源：公視新聞網</div>`;
    box.querySelectorAll('.thumb[data-idx]').forEach(div=>{
      const it=newsItemsCache[+div.dataset.idx];
      const img=it&&(it.thumbnail||(it.enclosure&&it.enclosure.link));
      if(img){div.style.backgroundImage=`url(${JSON.stringify(img)})`;div.style.backgroundSize='cover';div.style.backgroundPosition='center';}
    });
    box.querySelectorAll('button[data-idx]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const link=newsItemsCache[+btn.dataset.idx]&&newsItemsCache[+btn.dataset.idx].link;
        if(link)window.open(link,'_blank');
      });
    });
  }catch(e){
    box.innerHTML=`<div class="empty-hint">目前無法取得即時新聞（可能沒有網路連線，或這個預覽環境擋住了外部連線；正式上傳到 GitHub Pages 後應可正常讀取），暫時顯示示意內容。</div>`+mockNewsHTML();
  }
}
function mockNewsHTML(){
  const items=[
    {ic:'📰',t:'社區里民活動中心本週六舉辦健康講座',s:'邀請專業醫師講解長者保健知識，歡迎攜伴參加。'},
    {ic:'🌾',t:'颱風季將至 農委會呼籲農友及早防範',s:'氣象局提醒本週後半天氣不穩定，農友應加強作物防護。'},
    {ic:'🚌',t:'公車路線調整公告 明日起試辦新路線',s:'部分路線將延駛至捷運站，方便長輩轉乘。'}
  ];
  return items.map(n=>`
      <div class="news-item">
        <div class="thumb">${n.ic}</div>
        <div style="flex:1;"><h4>${n.t}</h4><p>${n.s}</p></div>
      </div>`).join('');
}

/* ============ MAP (Google Maps navigation, no API key needed) ============ */
const defaultMapShortcuts=[
  {id:'almanac',ic:'📆',name:'農民曆查詢',url:'https://ecal.click108.com.tw/'},
  {id:'hospital',ic:'🏥',name:'附近醫院',url:'https://www.google.com/maps/search/?api=1&query=%E9%86%AB%E9%99%A2'},
  {id:'pharmacy',ic:'💊',name:'附近藥局',url:'https://www.google.com/maps/search/?api=1&query=%E8%97%A5%E5%B1%80'},
  {id:'market',ic:'🛒',name:'附近超市',url:'https://www.google.com/maps/search/?api=1&query=%E8%B6%85%E5%B8%82'},
  {id:'temple',ic:'⛩️',name:'附近廟宇',url:'https://www.google.com/maps/search/?api=1&query=%E5%BB%9F'},
  {id:'post',ic:'📮',name:'附近郵局',url:'https://www.google.com/maps/search/?api=1&query=%E9%83%B5%E5%B1%80'}
];
let mapShortcuts=store.get('mapShortcuts',defaultMapShortcuts);
function mapHTML(){
  return `<div class="hint-banner"><span class="ic">💡</span><span>小提示：在框框輸入想去的地方，按「開始導航」會直接開啟 Google 地圖幫你規劃路線（手機上如果有安裝 Google 地圖 App 會直接開 App），Android 和 iPhone 都能使用。下面也有幾個最常用的查詢，點下去就能直接找附近的地點。</span></div>
  <div class="card">
    <h2 style="margin-top:0;">🗺 Google 地圖導航</h2>
    <div class="quick-add">
      <input id="mapDestInput" placeholder="輸入目的地，例如：台北車站">
      <button class="btn btn-primary" id="mapGoBtn">🧭 開始導航</button>
    </div>
    <iframe id="mapEmbed" src="https://maps.google.com/maps?q=Taiwan&z=8&output=embed" style="width:100%;height:320px;border:0;border-radius:16px;margin-top:8px;" loading="lazy"></iframe>
  </div>
  <div class="card" style="margin-top:16px;">
    <h2 style="margin-top:0;">🔎 最常用的查詢</h2>
    ${renderShortcutGrid(mapShortcuts,'mapGrid')}
  </div>`;
}
function bindMapView(){
  bindShortcutGrid('mapGrid',mapShortcuts,'mapShortcuts',renderMain);
  const inp=document.getElementById('mapDestInput');
  const go=document.getElementById('mapGoBtn');
  const embed=document.getElementById('mapEmbed');
  if(!inp||!go)return;
  const doNav=()=>{
    const v=inp.value.trim();
    if(!v)return;
    window.open('https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(v),'_blank');
    if(embed)embed.src='https://maps.google.com/maps?q='+encodeURIComponent(v)+'&z=14&output=embed';
  };
  go.addEventListener('click',doNav);
  inp.addEventListener('keypress',e=>{if(e.key==='Enter')doNav();});
}

/* ============ 語音筆記 ============ */
let recognition=null;
let recTimerInterval=null;
let recSecondsLeft=0;
const MAX_REC_SECONDS=60;
let voiceNotes=store.get('voiceNotes',[]);
function noteHTML(){
  return `<div class="hint-banner" style="text-align:left;"><span class="ic">💡</span><span>小提示：手指按住麥克風按鈕不放開始說話，最長可以錄 ${MAX_REC_SECONDS} 秒，時間到會自動停止。說完放開手指，AI 會自動整理成待辦事項。下面的筆記記錄可以點文字修改，也可以刪除。⚠️ iPhone 的 Safari 瀏覽器目前不支援語音辨識功能（蘋果的限制），這個功能在 Android 手機或電腦的 Chrome 瀏覽器上才能使用。</span></div>
  <div class="card" style="text-align:center;">
    <h2>🎙 語音筆記</h2>
    <p style="color:var(--ink-soft);">按住下方按鈕開始說話，放開即自動整理成待辦事項。</p>
    <button class="note-mic" id="micBtn">🎤</button>
    <div class="note-timer" id="recTimer"></div>
    <div class="note-result" id="noteResult">尚未錄音</div>
    <div class="note-history">
      <h4>📋 筆記記錄</h4>
      <div id="noteHistoryList">${renderNoteHistory()}</div>
    </div>
  </div>`;
}
function renderNoteHistory(){
  if(!voiceNotes.length)return'<div class="empty-hint">尚無筆記記錄</div>';
  return voiceNotes.slice().reverse().map(n=>`
    <div class="note-entry" data-id="${n.id}">
      <div class="ntop">
        <span class="ntime">${n.time}</span>
        <div class="nact">
          <button onclick="deleteVoiceNote('${n.id}')">🗑</button>
        </div>
      </div>
      <div class="ntxt" contenteditable="true" onblur="editVoiceNote('${n.id}',this.textContent)">${escapeHtml(n.text)}</div>
    </div>`).join('');
}
function deleteVoiceNote(id){
  voiceNotes=voiceNotes.filter(n=>n.id!==id);
  store.set('voiceNotes',voiceNotes);
  const el=document.getElementById('noteHistoryList');
  if(el)el.innerHTML=renderNoteHistory();
}
function editVoiceNote(id,val){
  const n=voiceNotes.find(x=>x.id===id);if(!n)return;
  n.text=val.trim();store.set('voiceNotes',voiceNotes);
}
function setupMic(){
  const btn=document.getElementById('micBtn');if(!btn)return;
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition){
    btn.classList.add('disabled');
    btn.addEventListener('click',()=>{
      document.getElementById('noteResult').textContent='這個瀏覽器不支援語音辨識功能——iPhone 的 Safari 目前還不支援這個功能（這是蘋果瀏覽器的限制，無法用網頁解決）。建議改用 Android 手機的 Chrome 瀏覽器，或直接在「待辦事項」頁面用文字輸入。';
    });
    return;
  }
  recognition=new SpeechRecognition();
  recognition.lang='zh-TW';recognition.continuous=true;recognition.interimResults=true;
  let finalText='';
  let active=false;
  recognition.onresult=(e)=>{
    let interim='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      if(e.results[i].isFinal)finalText+=e.results[i][0].transcript;
      else interim+=e.results[i][0].transcript;
    }
    document.getElementById('noteResult').textContent=finalText+interim;
  };
  recognition.onerror=(e)=>{
    const res=document.getElementById('noteResult');
    if(res){
      if(e.error==='not-allowed'||e.error==='service-not-allowed')res.textContent='沒有取得麥克風權限，請到瀏覽器設定允許這個網站使用麥克風後再試一次。';
      else if(e.error==='no-speech')res.textContent='沒有聽到聲音，請靠近麥克風再說一次。';
      else res.textContent='錄音發生問題（'+e.error+'），請再試一次。';
    }
    resetMicUI();
  };
  function resetMicUI(){
    active=false;
    btn.classList.remove('rec');btn.textContent='🎤';
    if(recTimerInterval){clearInterval(recTimerInterval);recTimerInterval=null;}
    const rt=document.getElementById('recTimer');if(rt)rt.textContent='';
  }
  const start=(ev)=>{
    if(active)return;
    ev.preventDefault();
    active=true;finalText='';
    try{recognition.start();}catch(e){}
    btn.classList.add('rec');btn.textContent='●';
    recSecondsLeft=MAX_REC_SECONDS;
    updateRecTimer();
    recTimerInterval=setInterval(()=>{
      recSecondsLeft--;updateRecTimer();
      if(recSecondsLeft<=0)stop();
    },1000);
  };
  const stop=()=>{
    if(!active)return;
    try{recognition.stop();}catch(e){}
    resetMicUI();
    setTimeout(()=>processNote(finalText),400);
  };
  btn.addEventListener('pointerdown',start);
  btn.addEventListener('pointerup',stop);
  btn.addEventListener('pointerleave',stop);
  btn.addEventListener('pointercancel',stop);
}
function updateRecTimer(){
  const rt=document.getElementById('recTimer');
  if(rt)rt.textContent=`🔴 錄音中… 還可錄 ${recSecondsLeft} 秒`;
}
function processNote(text){
  const res=document.getElementById('noteResult');
  if(!text||!text.trim()){res.textContent='沒有聽到內容，請再試一次。';return;}
  const now=new Date();
  voiceNotes.push({id:crypto.randomUUID(),text:text.trim(),time:now.toLocaleString('zh-TW',{hour12:false})});
  store.set('voiceNotes',voiceNotes);
  const parts=text.split(/[，。,\.]|然後|還有/).map(s=>s.trim()).filter(Boolean);
  let html=`<div style="margin-bottom:8px;color:var(--ink-soft);">辨識內容：${escapeHtml(text)}</div><b>已整理成待辦事項：</b>`;
  parts.forEach(p=>{
    const id=crypto.randomUUID();
    todos.push({id,text:p,done:false,date:null});
    html+=`<div class="todo-item" style="margin-top:8px;"><div class="swipe-inner"><button class="chk"></button><div class="txt">${escapeHtml(p)}</div></div></div>`;
  });
  store.set('todos',todos);
  res.innerHTML=html;
  const hl=document.getElementById('noteHistoryList');
  if(hl)hl.innerHTML=renderNoteHistory();
}

/* ============ SETTINGS ============ */
function settingsHTML(){
  const themes=[['pink','粉紅','var(--pink)'],['blue','粉藍','var(--blue)'],['milktea','奶茶','var(--milktea)'],['purple','淡紫','var(--purple)'],['mint','薄荷','var(--mint)']];
  return `<div class="hint-banner"><span class="ic">💡</span><span>小提示：點選按鈕或色塊會馬上套用，不用另外按儲存。畫面右上角也有「❓」按鈕，可以隨時打開完整使用說明。</span></div>
  <div class="settings-grid">
    <div class="set-row">
      <div class="label">🔤 字體大小</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${[['小',0.85],['中',1],['大',1.25],['超大',1.5]].map(([l,v])=>`<button class="btn ${settings.fontScale===v?'btn-primary':'btn-ghost'}" onclick="setFontScale(${v})">${l}</button>`).join('')}
      </div>
    </div>
    <div class="set-row">
      <div class="label">🎨 主題色（點選旁邊色塊）</div>
      <div class="theme-tabs">
        ${themes.map(([id,name,bg])=>`<button class="theme-tab ${settings.theme===id?'sel':''}" style="background:${bg}" onclick="setTheme('${id}')">${name}</button>`).join('')}
      </div>
    </div>
    <div class="set-row">
      <div class="label">🌗 深色 / 淺色模式</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ${!settings.dark?'btn-primary':'btn-ghost'}" onclick="setDark(false)">☀️ 淺色</button>
        <button class="btn ${settings.dark?'btn-primary':'btn-ghost'}" onclick="setDark(true)">🌙 深色</button>
      </div>
    </div>
    <div class="set-row">
      <div class="label">🔊 播報語速</div>
      <input type="range" min="0.5" max="1.6" step="0.1" value="${settings.voiceRate}" oninput="setVoiceRate(this.value)">
    </div>
    <div class="set-row">
      <div class="label">🗣 播報聲音</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ${settings.voiceGender==='female'?'btn-primary':'btn-ghost'}" onclick="setVoiceGender('female')">女聲</button>
        <button class="btn ${settings.voiceGender==='male'?'btn-primary':'btn-ghost'}" onclick="setVoiceGender('male')">男聲</button>
      </div>
      <div style="font-size:calc(12px*var(--font-scale));color:var(--ink-soft);margin-top:6px;">部分手機只有一種中文語音，這時候男女聲會用音調高低來區分，不一定聽起來像真的男聲女聲。</div>
    </div>
    <div class="set-row">
      <div class="label">🔔 按鍵音效</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ${settings.buttonSound!==false?'btn-primary':'btn-ghost'}" onclick="setButtonSound(true)">🔊 開啟</button>
        <button class="btn ${settings.buttonSound===false?'btn-primary':'btn-ghost'}" onclick="setButtonSound(false)">🔇 關閉</button>
      </div>
    </div>
    <div class="set-row">
      <div class="label">💾 資料備份</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-soft" onclick="exportData()">匯出 JSON</button>
        <label class="btn btn-ghost" style="display:inline-block;">匯入 JSON<input type="file" accept="application/json" style="display:none;" onchange="importData(event)"></label>
      </div>
    </div>
  </div>`;
}
function setFontScale(v){settings.fontScale=v;applySettings();store.set('settings',settings);renderMain();}
function setTheme(t){settings.theme=t;applySettings();store.set('settings',settings);renderMain();}
function setDark(v){settings.dark=v;applySettings();store.set('settings',settings);renderMain();}
function setVoiceRate(v){settings.voiceRate=parseFloat(v);store.set('settings',settings);}
function setVoiceGender(g){settings.voiceGender=g;store.set('settings',settings);renderMain();}
function setButtonSound(v){settings.buttonSound=v;store.set('settings',settings);renderMain();if(v)playClickSound();}
function applySettings(){
  document.documentElement.style.setProperty('--font-scale',settings.fontScale);
  document.body.classList.toggle('dark',settings.dark);
  const map={pink:['#F6D9D9','#EBBFC4'],blue:['#D9E8F0','#BFDCEB'],milktea:['#E3CBA8','#D2AE80'],purple:['#E5DBF2','#D3C2EB'],mint:['#D9EAE0','#BEDCC9']};
  const [base,deep]=map[settings.theme]||map.pink;
  document.documentElement.style.setProperty('--pink',base);
  document.documentElement.style.setProperty('--accent',deep);
}
function exportData(){
  const data={todos,calcHistory,festivals,settings};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='family-assistant-backup.json';a.click();
}
function importData(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(data.todos)todos=data.todos;
      if(data.calcHistory)calcHistory=data.calcHistory;
      if(data.festivals)festivals=data.festivals;
      if(data.settings)settings=data.settings;
      store.set('todos',todos);store.set('calcHistory',calcHistory);
      store.set('festivals',festivals);store.set('settings',settings);
      applySettings();alert('資料匯入成功！');renderMain();
    }catch(err){alert('匯入失敗，檔案格式不正確。');}
  };
  reader.readAsText(file);
}

/* ============ BUTTON CLICK SOUND ============ */
let audioCtx=null;
function ensureAudioCtx(){
  if(!audioCtx){
    try{audioCtx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}
  }
  return audioCtx;
}
function playClickSound(){
  if(settings.buttonSound===false)return;
  const ctx=ensureAudioCtx();
  if(!ctx)return;
  if(ctx.state==='suspended')ctx.resume();
  const t=ctx.currentTime;
  const osc=ctx.createOscillator();
  const gain=ctx.createGain();
  osc.type='sine';
  osc.frequency.setValueAtTime(880,t);
  osc.frequency.exponentialRampToValueAtTime(660,t+0.07);
  gain.gain.setValueAtTime(0.0001,t);
  gain.gain.exponentialRampToValueAtTime(0.18,t+0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001,t+0.1);
  osc.connect(gain);gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t+0.11);
}
document.addEventListener('click',(e)=>{
  const el=e.target.closest('button, .nav-btn, .cal-cell, .link-card, .theme-tab, .chk, .fest-add');
  if(el)playClickSound();
},true);

/* ============ SPEECH ============ */
function speak(text){
  if(!('speechSynthesis' in window))return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='zh-TW';u.rate=settings.voiceRate||1;
  const voices=window.speechSynthesis.getVoices();
  const zhVoices=voices.filter(v=>v.lang.startsWith('zh'));
  const maleHints=/male|男|zhiwei|yunjian|yunyang|kangkang|wang(?!g)/i;
  const femaleHints=/female|女|yating|xiaoxiao|meijia|huihui|tingting|mei-?jia/i;
  if(zhVoices.length){
    let picked=zhVoices.find(v=>settings.voiceGender==='male'?maleHints.test(v.name):femaleHints.test(v.name));
    if(!picked&&zhVoices.length>1){
      /* no name hint available — fall back to picking a different voice per gender so it's at least audibly different */
      picked=settings.voiceGender==='male'?zhVoices[zhVoices.length-1]:zhVoices[0];
    }
    u.voice=picked||zhVoices[0];
  }
  /* many phones only ship ONE Chinese voice, so also shift pitch — this guarantees male/female sound different even then */
  u.pitch=settings.voiceGender==='male'?0.75:1.15;
  window.speechSynthesis.speak(u);
}

/* ============ HELP GUIDE MODAL ============ */
function openHelp(){
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`
    <div class="modal-box help-box">
      <h3>❓ 使用說明</h3>
      <h4>📅 待辦事項</h4>
      <p>快速點兩下月曆上的日期，會跳出視窗，日期已經幫你填好，輸入內容按「儲存」即可。完成的事項點左邊方框打勾，會自動變成淡色。手指在項目上向左滑，會出現紅色「刪除」，再點一下才會刪除，避免不小心點錯。上方按「🔊 播報」會用語音唸出今天的日期和時間。</p>
      <h4>🧮 計算機</h4>
      <p>跟一般計算機一樣，按數字和加減乘除，按「＝」得到結果。可以切換粉紅／粉藍配色。右邊「本次購物小計」可以把任一筆計算結果加進去累計總金額。紀錄旁的🗑可以刪掉單一筆紀錄，「清除全部紀錄」可以一次清空。</p>
      <h4>🙏 重要節日</h4>
      <p>顯示除夕、元宵、端午、中元、中秋、重陽、冬至要拜拜準備的東西，藍色底是「觀世音菩薩」、黃色底是「祖先」。點供品文字可以直接修改，點「✕」刪除，點「＋新增」可以加入新的項目，內容都會自動存起來。</p>
      <h4>☁️ 天氣</h4>
      <p>會自動抓取你目前所在位置的即時天氣（需要允許瀏覽器定位、並連上網路），顯示溫度、紫外線、風力、濕度、穿衣建議和一週預報。如果沒有網路或不給定位，會改顯示示意資料並註明。</p>
      <h4>🗺 地圖</h4>
      <p>輸入想去的地方按「開始導航」，會用 Google 地圖規劃路線，Android、iPhone 都能使用。下方「最常用的查詢」可以一鍵找附近醫院、藥局、超市等，也可以自己新增、刪除，或上傳照片當圖示。</p>
      <h4>📰 新聞</h4>
      <p>會自動抓取「公視新聞網」的即時新聞（需要網路連線），點「閱讀全文」會開新分頁看完整內容。下方「常用連結」可以自己新增常去的網站，也可以上傳照片當圖示，右上角「✕」可以刪除。</p>
      <h4>🎙 語音筆記</h4>
      <p>按住麥克風按鈕開始說話，最長可以錄 60 秒，時間到會自動停止，放開後 AI 會自動整理成待辦事項加入清單。下方「筆記記錄」會保留每一次的錄音文字，可以點文字直接修改，也可以按🗑刪除。⚠️ iPhone 的 Safari 瀏覽器不支援這個功能，請改用 Android 手機或電腦的 Chrome 瀏覽器。</p>
      <h4>⚙️ 設定</h4>
      <p>可以調整字體大小、主題色、深色／淺色模式、按鍵音效開關、語音播報速度和男女聲，還可以匯出或匯入資料備份。</p>
      <div class="help-close-wrap"><button class="btn btn-primary" id="helpClose">我知道了</button></div>
    </div>`;
  document.body.appendChild(overlay);
  const close=()=>overlay.remove();
  overlay.querySelector('#helpClose').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
}

/* ============ AFTER RENDER HOOK ============ */
function afterRender(){
  if(currentView==='home'){
    tickClock();
    if(clockInterval)clearInterval(clockInterval);
    clockInterval=setInterval(tickClock,1000);
    enableSwipe();
    bindCalTaps();
    const qi=document.getElementById('quickTodoInput');
    if(qi)qi.addEventListener('keypress',e=>{if(e.key==='Enter')quickAddTodo();});
  }else if(clockInterval){clearInterval(clockInterval);clockInterval=null;}
  if(currentView==='note')setupMic();
  if(currentView==='weather')loadWeather();
  if(currentView==='news'){loadNews();bindShortcutGrid('linkGrid',quickLinks,'quickLinks',renderMain);}
  if(currentView==='map')bindMapView();
}

/* ============ INIT ============ */
applySettings();
renderNav();
renderMain();
