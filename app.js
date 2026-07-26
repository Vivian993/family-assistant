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
  {id:'note',lbl:'語音筆記',color:'var(--mint)'},
  {id:'fest',lbl:'重要節日',color:'var(--purple)'},
  {id:'fortune',lbl:'求籤',color:'var(--ruby)'},
  {id:'weather',lbl:'天氣',color:'var(--blue)'},
  {id:'map',lbl:'地圖',color:'var(--peach)'},
  {id:'news',lbl:'新聞',color:'var(--milktea)'},
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
  else if(currentView==='fortune')m.innerHTML=fortuneHTML();
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
    ${hintBox('home','點兩下月曆日期可以新增待辦事項；完成的項目打勾會變淡色；手指向左滑動出現紅色「刪除」，再點一下才會真的刪除。')}
    ${renderReminderNote()}
    <div class="quick-add">
      <input id="quickTodoInput" placeholder="輸入新的待辦事項...">
      <button class="btn btn-primary" onclick="quickAddTodo()">新增</button>
    </div>
    ${todoHTML}
  </div>`;
}
function getUpcomingTodos(){
  const today=new Date();today.setHours(0,0,0,0);
  const limit=new Date(today);limit.setDate(today.getDate()+3);
  return todos.filter(t=>{
    if(t.done||!t.date)return false;
    const parts=t.date.split('-').map(Number);
    const dt=new Date(parts[0],parts[1]-1,parts[2]);
    return dt>=today&&dt<=limit;
  }).sort((a,b)=>a.date.localeCompare(b.date));
}
function renderReminderNote(){
  const upcoming=getUpcomingTodos();
  if(!upcoming.length)return'';
  return `<div class="reminder-note reminder-blink">⏰ 即將到期：${upcoming.map(t=>`${escapeHtml(t.text)}（${t.date}）`).join('；')}</div>`;
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
/* one-time cleanup: this app used to auto-insert 農曆初一/十五 worship reminders as todos — that's retired now */
(function purgeOldLunarReminders(){
  const before=todos.length;
  todos=todos.filter(t=>t.type!=='reminder');
  if(todos.length!==before)store.set('todos',todos);
})();

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
/* small collapsible tip button — keeps auxiliary help text from eating up space at large font sizes */
function hintBox(id,text){
  return `<div class="hint-toggle-wrap">
    <button class="hint-btn" data-hint="${id}" title="使用小提示">💡</button>
    <div class="hint-panel hidden" id="hint-${id}">${text}</div>
  </div>`;
}
document.addEventListener('click',(e)=>{
  const hb=e.target.closest('.hint-btn');
  if(hb){
    const panel=document.getElementById('hint-'+hb.dataset.hint);
    if(panel)panel.classList.toggle('hidden');
  }
},true);

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
      ${hintBox('calc','按數字和符號後按「＝」計算，「加入小計」可以累加金額；紀錄旁的🗑可以刪掉單一筆，「清除全部紀錄」一次清空。')}
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

/* ============ FESTIVALS (click a card to open detail) ============ */
function festHTML(){
  return `${hintBox('fest','點一下節日卡片可以查看和修改供品內容；也可以自己新增節日。')}
  <div class="fest-grid">
    ${festivals.map(f=>`
      <div class="card fest-preview" data-id="${f.id}">
        <div class="fp-emoji">${f.emoji}</div>
        <div class="fp-name">${escapeHtml(f.name)}</div>
      </div>`).join('')}
    <div class="card fest-preview fest-preview-add" id="festAddCard">
      <div class="fp-emoji">➕</div>
      <div class="fp-name">新增節日</div>
    </div>
  </div>`;
}
function bindFestivals(){
  document.querySelectorAll('.fest-preview[data-id]').forEach(card=>{
    card.addEventListener('click',()=>openFestivalModal(card.dataset.id));
  });
  const addCard=document.getElementById('festAddCard');
  if(addCard)addCard.addEventListener('click',openAddFestivalModal);
}
function openAddFestivalModal(){
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`
    <div class="modal-box">
      <h3>新增節日</h3>
      <input id="newFestEmoji" placeholder="一個 emoji 圖示，例如 🎊">
      <input id="newFestName" placeholder="節日名稱，例如：媽祖生">
      <input id="newFestTime" placeholder="拜拜時間（可留空）">
      <div class="modal-actions">
        <button class="btn btn-ghost" id="newFestCancel">取消</button>
        <button class="btn btn-primary" id="newFestSave">新增</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const close=()=>overlay.remove();
  overlay.querySelector('#newFestCancel').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  overlay.querySelector('#newFestSave').onclick=()=>{
    const emoji=overlay.querySelector('#newFestEmoji').value.trim()||'🎊';
    const name=overlay.querySelector('#newFestName').value.trim();
    const time=overlay.querySelector('#newFestTime').value.trim();
    if(!name){alert('請輸入節日名稱');return;}
    festivals.push({id:crypto.randomUUID(),emoji,name,time,guanyin:[],ancestor:[]});
    store.set('festivals',festivals);
    close();
    renderMain();
  };
}
function festivalDetailInner(f){
  return `
    <div class="fhead"><div class="emoji">${f.emoji}</div><h3>${escapeHtml(f.name)}</h3></div>
    ${f.time?`<div class="ftime">🌗🌗 ${escapeHtml(f.time)}</div>`:''}
    <div class="fest-sec sec-guanyin">
      <div class="sec-label">觀世音菩薩</div>
      <div class="fest-pill-row">
        ${f.guanyin.map((it,i)=>`<span class="fest-pill"><span contenteditable="true" class="fe-edit" data-id="${f.id}" data-section="guanyin" data-i="${i}">${escapeHtml(it)}</span><span class="rm fe-rm" data-id="${f.id}" data-section="guanyin" data-i="${i}">✕</span></span>`).join('')}
        <span class="fest-add fe-add" data-id="${f.id}" data-section="guanyin">＋新增</span>
      </div>
    </div>
    <div class="fest-sec sec-ancestor">
      <div class="sec-label">祖先</div>
      <div class="fest-pill-row">
        ${f.ancestor.map((it,i)=>`<span class="fest-pill"><span contenteditable="true" class="fe-edit" data-id="${f.id}" data-section="ancestor" data-i="${i}">${escapeHtml(it)}</span><span class="rm fe-rm" data-id="${f.id}" data-section="ancestor" data-i="${i}">✕</span></span>`).join('')}
        <span class="fest-add fe-add" data-id="${f.id}" data-section="ancestor">＋新增</span>
      </div>
    </div>`;
}
function openFestivalModal(id){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`<div class="modal-box fest-modal-box">
      <div id="festDetailInner">${festivalDetailInner(f)}</div>
      <div class="modal-actions"><button class="btn btn-primary" id="festCloseBtn">關閉</button></div>
    </div>`;
  document.body.appendChild(overlay);
  const inner=overlay.querySelector('#festDetailInner');
  function refresh(){inner.innerHTML=festivalDetailInner(f);bindInner();}
  function bindInner(){
    inner.querySelectorAll('.fe-edit').forEach(el=>{
      el.addEventListener('blur',()=>{updateFestItem(el.dataset.id,el.dataset.section,+el.dataset.i,el.textContent);});
    });
    inner.querySelectorAll('.fe-rm').forEach(el=>{
      el.addEventListener('click',()=>{removeFestItem(el.dataset.id,el.dataset.section,+el.dataset.i);refresh();});
    });
    inner.querySelectorAll('.fe-add').forEach(el=>{
      el.addEventListener('click',()=>{
        const v=prompt('新增供品項目：');
        if(v&&v.trim()){addFestItem(el.dataset.id,el.dataset.section,v.trim());refresh();}
      });
    });
  }
  bindInner();
  overlay.querySelector('#festCloseBtn').onclick=()=>overlay.remove();
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});
}
function updateFestItem(id,section,i,val){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  f[section][i]=val.trim();store.set('festivals',festivals);
}
function removeFestItem(id,section,i){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  f[section].splice(i,1);store.set('festivals',festivals);
}
function addFestItem(id,section,val){
  const f=festivals.find(x=>x.id===id);if(!f)return;
  f[section].push(val);store.set('festivals',festivals);
}

/* ============ WEATHER (illustrative / mock) ============ */
/* ============ 六十甲子籤 (求籤) — for-fun, entertainment only ============ */
const QIAN_DATA=[
{n:1,gz:"甲子",wx:"屬金利秋　宜其西方",verse:["日出便見風雲散","光明清淨照世間","一向前途通大道","萬事清吉保平安"],level:"上上",summary:"雲散日出，光明在前，是六十籤中少見的極吉之籤。",advice:"此時放手去做，事業感情皆宜正面推進，不必疑慮。"},
{n:2,gz:"甲寅",wx:"屬水利冬　宜其北方",verse:["於今此景正當時","看看欲吐百花魁","若能遇得春色到","一洒清吉脫塵埃"],level:"中上",summary:"花將盛未盛，時機正在醞釀，只差臨門一腳。",advice:"耐心等候關鍵時刻到來，別急著在半途收手。"},
{n:3,gz:"甲辰",wx:"屬火利夏　宜其南方",verse:["勸君把定心莫虛","天註衣祿自有餘","和合重重常吉慶","時來終遇得明珠"],level:"上上",summary:"衣食自有安排，人和事順，終能得到珍貴的成果。",advice:"守住信心、不要自亂陣腳，好事會如期而至。"},
{n:4,gz:"甲午",wx:"屬金利秋　宜其西方",verse:["風恬浪靜可行舟","恰是中秋月一輪","凡事不須多憂慮","福祿自有慶家門"],level:"上上",summary:"風平浪靜，正是啟航的好時機，家運亨通。",advice:"可以安心推進計畫，不必為小事過度煩惱。"},
{n:5,gz:"甲申",wx:"屬水利冬　宜其北方",verse:["只恐前途命有變","勸君作急可宜先","且守長江無大事","命逢太白守身邊"],level:"中",summary:"前路可能有變數，宜提早準備、不宜拖延。",advice:"該辦的事盡早處理，靜守本分可避開風險。"},
{n:6,gz:"甲戌",wx:"屬火利夏　宜其南方",verse:["風雲致雨落洋洋","天災時氣必有傷","命內此事難和合","更逢一足出外鄉"],level:"中下",summary:"風雨將至，事情難以順利和合，恐有波折。",advice:"近期宜低調保守，避免與人硬碰硬起衝突。"},
{n:7,gz:"乙丑",wx:"屬金利秋　宜其西方",verse:["雲開月出正分明","不須進退問前程","婚姻皆由天註定","和合清吉萬事成"],level:"中上",summary:"雲開月出，情勢漸漸明朗，姻緣及合作皆有好結果。",advice:"順其自然發展即可，不必反覆猶豫進退。"},
{n:8,gz:"乙卯",wx:"屬水利冬　宜其北方",verse:["禾稻看看結成完","此事必定兩相全","回到家中寬心坐","妻兒鼓舞樂團圓"],level:"上",summary:"禾稻結實，象徵努力終於開花結果，家庭圓滿。",advice:"是收成的時刻，好好享受成果、與家人分享喜悅。"},
{n:9,gz:"乙巳",wx:"屬火利夏　宜其南方",verse:["龍虎相隨在深山","君爾何須背後看","不知此去相愛愉","他日與我卻無干"],level:"中下",summary:"表面同行，實則各懷心思，需留意人際間的猜忌。",advice:"與人合作時把話說清楚，避免日後生出誤會。"},
{n:10,gz:"乙未",wx:"屬金利秋　宜其西方",verse:["花開結子一半枯","可惜今年汝虛度","漸漸日落西山去","勸君不用向前途"],level:"中下",summary:"花開了一半就凋零，事情容易做到一半就中斷。",advice:"此籤提醒別勉強硬推，不如先蓄力、等下一個時機。"},
{n:11,gz:"乙酉",wx:"屬水利冬　宜其北方",verse:["靈雞漸漸見分明","凡事且看子丑寅","雲開月出照天下","郎君即便見太平"],level:"中上",summary:"事情正逐漸明朗，只要再等一段時間，答案自現。",advice:"按部就班觀察局勢發展，太平自然可期。"},
{n:12,gz:"乙亥",wx:"屬火利夏　宜其南方",verse:["長江風浪漸漸靜","于今得進可安寧","必有貴人相扶助","凶事脫出見太平"],level:"中上",summary:"風浪漸平，局勢轉安，且有貴人相助脫離困境。",advice:"多與能幫助你的人保持聯繫，危機正在過去。"},
{n:13,gz:"丙子",wx:"屬水利冬　宜其北方",verse:["命中正逢羅孛關","用盡心機總未休","作福問神難得過","恰是行舟上高灘"],level:"中下",summary:"正逢阻滯難關，即便費盡心思也難順利推進。",advice:"此時宜緩不宜進，硬闖恐如船擱淺，先蓄力待轉機。"},
{n:14,gz:"丙寅",wx:"屬火利夏　宜其南方",verse:["財中漸漸見分明","花開花謝結子成","寬心且看月中桂","郎君即便見太平"],level:"中上",summary:"財運與成果正逐漸清晰浮現，寬心等待即可。",advice:"不必急躁，放寬心讓事情自然開花結果。"},
{n:15,gz:"丙辰",wx:"屬土利年　四方皆宜",verse:["八十原來是太公","看看晚景遇文王","目下緊事休相問","勸君且守待運通"],level:"中",summary:"如姜太公八十歲方遇文王，屬大器晚成之象。",advice:"眼前若有急事，不妨先放一放，時候到了自然通達。"},
{n:16,gz:"丙午",wx:"屬水利冬　宜其北方",verse:["不須作福不須求","用盡心機總未休","陽世不知陰世事","官法如爐不自由"],level:"下",summary:"此籤偏凶，提醒事情有其定數，強求也未必如願。",advice:"凡事依循正道而行，切莫投機取巧或以身試法。"},
{n:17,gz:"丙申",wx:"屬火利夏　宜其南方",verse:["舊恨重重未改為","家中禍患不臨身","須當謹防宜作福","龍蛇交會得和合"],level:"中",summary:"舊有的心結尚未化解，宜多加防範、廣結善緣。",advice:"主動修補關係、多做善事，能讓紛爭化為和合。"},
{n:18,gz:"丙戌",wx:"屬土利年　四方皆宜",verse:["君問中間此言因","看看祿馬拱前程","若得貴人多得利","和合自有兩分明"],level:"中上",summary:"前程漸有貴人拱照，只要有人扶持便能得利。",advice:"主動尋求或珍惜貴人的協助，事情會更順利。"},
{n:19,gz:"丁丑",wx:"屬水利冬　宜其北方",verse:["富貴由命天註定","心高必然誤君期","不然且回依舊路","雲開月出自分明"],level:"中",summary:"富貴自有定數，太過心高氣傲反而容易誤事。",advice:"腳踏實地走原本熟悉的路，答案終會清楚浮現。"},
{n:20,gz:"丁卯",wx:"屬火利夏　宜其南方",verse:["前途功名未得意","只恐命內有交加","兩家必定防損失","勸君且退莫咨嗟"],level:"中下",summary:"功名之事尚未如意，且雙方都需提防損失。",advice:"此時宜先退一步觀望，不必為眼前不順而嘆息。"},
{n:21,gz:"丁巳",wx:"屬土利年　四方皆宜",verse:["十方佛法有靈通","大難禍患不相同","紅日當空常照耀","還有貴人到家堂"],level:"上",summary:"如紅日當空，禍患遠離，並有貴人主動上門相助。",advice:"心懷善念、坦然面對，貴人與好運自會降臨。"},
{n:22,gz:"丁未",wx:"屬水利冬　宜其北方",verse:["太公家業八十成","月出光輝四海明","命內自然逢大吉","茅屋中間百事亨"],level:"上上",summary:"厚積薄發、大器晚成，如月出照亮四方，百事亨通。",advice:"過去的累積正要開花結果，可安心迎接豐收。"},
{n:23,gz:"丁酉",wx:"屬火利夏　宜其南方",verse:["欲去長江水闊茫","前途未遂運未通","如今絲綸常在手","只恐魚水不相逢"],level:"中下",summary:"目標尚遠、時運未到，即使準備齊全也難巧遇良機。",advice:"持續準備、耐心守候，時機未到不必勉強出擊。"},
{n:24,gz:"丁亥",wx:"屬土利年　四方皆宜",verse:["月出光輝四海明","前途祿位見太平","浮雲掃退終無事","可保禍患不臨身"],level:"上",summary:"烏雲終將散去，前途祿位安穩，可保平安無事。",advice:"眼前的陰霾只是暫時，撐過去便是坦途。"},
{n:25,gz:"戊子",wx:"屬火利夏　宜其南方",verse:["總是前途莫心勞","求神問聖枉是多","但看雞犬日過後","不須作福事如何"],level:"中",summary:"與其反覆求問焦慮，不如放寬心讓時間給出答案。",advice:"減少不必要的煩憂與奔波，順其自然就好。"},
{n:26,gz:"戊寅",wx:"屬土利年　四方皆宜",verse:["選出牡丹第一枝","勸君折取莫遲疑","世間若問相知處","萬事逢春正及時"],level:"上",summary:"如選中最好的一枝牡丹，機會就在眼前，正是良機。",advice:"看準的事就果斷把握，此時猶豫恐失良機。"},
{n:27,gz:"戊辰",wx:"屬木利春　宜其東方",verse:["君爾寬心且自由","門庭清吉家無憂","財寶自然終吉利","凡事無傷不用求"],level:"上",summary:"家門清吉平安，財運自然到來，無需刻意強求。",advice:"放寬心過生活，好運自會隨順而至。"},
{n:28,gz:"戊午",wx:"屬火利夏　宜其南方",verse:["於今莫作此當時","虎落平陽被犬欺","世間凡事何難定","千山萬水也遲疑"],level:"中下",summary:"如猛虎暫時受制於平地，處境較為被動受限。",advice:"此時宜韜光養晦、忍耐蓄力，不宜與人正面衝突。"},
{n:29,gz:"戊申",wx:"屬土利年　四方皆宜",verse:["枯木可惜未逢春","如今反在暗中藏","寬心且守風霜退","還君依舊作乾坤"],level:"中",summary:"如枯木尚未逢春，暫時韜光養晦、蟄伏待機。",advice:"耐心撐過寒冬，風霜退去後仍能東山再起。"},
{n:30,gz:"戊戌",wx:"屬木利春　宜其東方",verse:["漸漸看此月中和","過後須防未得高","改變顏色前途去","凡事必定見重勞"],level:"中下",summary:"眼前尚屬平和，但盛極之後須提防走下坡。",advice:"順境中仍要居安思危，避免因鬆懈而多費周折。"},
{n:31,gz:"己丑",wx:"屬火利夏　宜其南方",verse:["綠柳蒼蒼正當時","任君此去作乾坤","花果結實無殘謝","福祿自有慶家門"],level:"上",summary:"正逢生機蓬勃之時，可放手一搏、大展身手。",advice:"時機正好，勇敢去做自己想做的規劃與嘗試。"},
{n:32,gz:"己卯",wx:"屬土利年　四方皆宜",verse:["龍虎相交在門前","此事必定兩相連","黃金忽然變成鐵","何用作福問神仙"],level:"中下",summary:"局勢牽連複雜，原本看好的事可能生變質。",advice:"重要決定前多留一手，別把雞蛋放在同一個籃子。"},
{n:33,gz:"己巳",wx:"屬木利春　宜其東方",verse:["欲去長江水闊茫","行舟把定未遭風","戶內用心再作福","看看魚水得相逢"],level:"中上",summary:"江水雖闊，但只要把穩方向就不致遭遇風浪。",advice:"在家中多用心經營、多積福德，機緣自會到來。"},
{n:34,gz:"己未",wx:"屬火利夏　宜其南方",verse:["危險高山行過盡","莫嫌此路有重重","若見蘭桂漸漸發","長蛇反轉變成龍"],level:"中",summary:"艱難險阻已走過大半，苦盡甘來、蛻變在即。",advice:"再撐一段路，眼前的重重考驗會是蛻變的契機。"},
{n:35,gz:"己酉",wx:"屬土利年　四方皆宜",verse:["此事何須用心機","前途變怪自然知","看看此去得和合","漸漸脫出見太平"],level:"中上",summary:"不必費心算計，順其自然事情反而會逐漸和合。",advice:"少一點算計、多一點順勢而為，結果會更平順。"},
{n:36,gz:"己亥",wx:"屬木利春　宜其東方",verse:["福如東海壽如山","君爾何須嘆苦難","命內自然逢大吉","祈保分明自平安"],level:"上上",summary:"福壽雙全之象，眼前的苦難終將過去，迎來大吉。",advice:"不必為一時困難唉聲嘆氣，福報正在路上。"},
{n:37,gz:"庚子",wx:"屬土利年　四方皆宜",verse:["運逢得意身顯變","君爾身中皆有益","一向前途無難事","決意之中保清吉"],level:"上",summary:"時運正旺，身分處境明顯轉好，前途沒有難事。",advice:"下定決心去做，這段時間做的決定多半對你有利。"},
{n:38,gz:"庚寅",wx:"屬木利春　宜其東方",verse:["名顯有意在中央","不須祈禱心自安","看看早晚日過後","即時得意在其間"],level:"中上",summary:"名聲與心意正在被看見，不必刻意求神安心。",advice:"只要持續累積表現，得意的一天不會太遠。"},
{n:39,gz:"庚辰",wx:"屬金利秋　宜其西方",verse:["意中若問神仙路","勸爾且退望高樓","寬心且守寬心坐","必然遇得貴人扶"],level:"中",summary:"若追求的目標過於遙遠，不妨先退一步靜觀。",advice:"暫緩躁進的腳步，耐心等候會有貴人扶持。"},
{n:40,gz:"庚午",wx:"屬土利年　四方皆宜",verse:["平生富貴成祿位","君家門戶定光輝","此中必定無損失","夫妻百歲喜相隨"],level:"上上",summary:"富貴祿位穩固，家門光輝，感情關係也長久美滿。",advice:"目前的努力方向正確，可以放心長期投入經營。"},
{n:41,gz:"庚申",wx:"屬木利春　宜其東方",verse:["今行到此實難推","歌歌暢飲自徘徊","雞犬相聞消息近","婚姻夙世結成雙"],level:"中上",summary:"事情走到這一步已難回頭，感情、姻緣的消息正在靠近。",advice:"放輕鬆看待眼前局勢，好消息其實已經不遠。"},
{n:42,gz:"庚戌",wx:"屬金利秋　宜其西方",verse:["一重江水一重山","誰知此去路又難","任他改求終不過","是非終久未得安"],level:"中下",summary:"前路重重阻礙，即便另尋他法也難以真正突破。",advice:"是非糾纏一時難平，宜暫時退讓、避免正面硬拚。"},
{n:43,gz:"辛丑",wx:"屬土利年　四方皆宜",verse:["一年作事急如飛","君爾寬心莫遲疑","貴人還在千里外","音信月中漸漸知"],level:"中",summary:"事情進展飛快，貴人雖在遠方，但消息會逐漸傳來。",advice:"別因等待而焦躁，保持行動、消息自會漸漸明朗。"},
{n:44,gz:"辛卯",wx:"屬木利春　宜其東方",verse:["客到前途多得利","君爾何故兩相疑","雖是中間逢進退","月出光輝得運時"],level:"中上",summary:"貴客將至、利多將到，過程雖有進退反覆但終將得運。",advice:"不必對眼前的猶豫不決過度懷疑，堅持下去會見光明。"},
{n:45,gz:"辛巳",wx:"屬金利秋　宜其西方",verse:["花開今已結成果","富貴榮華終到老","君子小人相會合","萬事清吉莫煩惱"],level:"上上",summary:"花已結果，富貴榮華可維持長久，萬事皆能清吉。",advice:"這是收穫的階段，安心享受成果，不必多慮。"},
{n:46,gz:"辛未",wx:"屬土利年　四方皆宜",verse:["功名得意與君顯","前途富貴喜安然","若遇一輪明月照","十五團圓光滿天"],level:"上",summary:"功名得意、家庭富貴，如十五明月一般團圓美滿。",advice:"是分享喜悅、與家人團聚的好時機。"},
{n:47,gz:"辛酉",wx:"屬木利春　宜其東方",verse:["君爾何須問聖跡","自己心中皆有益","於今且看月中旬","凶事脫出化成吉"],level:"中上",summary:"答案其實在自己心中，原本的凶事會逐漸轉化為吉。",advice:"相信自己的判斷，月中之後情況會明顯好轉。"},
{n:48,gz:"辛亥",wx:"屬金利秋　宜其西方",verse:["陽世作事未和同","雲遮月色正朦朧","心中意欲前途去","只恐命內運未通"],level:"中下",summary:"人事尚未和合，局勢如雲遮月般朦朧不明。",advice:"心裡雖想往前衝，但時運未通，宜再耐心等待。"},
{n:49,gz:"壬子",wx:"屬木利春　宜其東方",verse:["言語雖多不可從","風雲靜處未行龍","暗中終得明消息","君爾何須問重重"],level:"中",summary:"眾說紛紜不必盡信，看似平靜其實暗中正在醞釀轉機。",advice:"別被雜訊干擾，安靜等待，消息終會明朗。"},
{n:50,gz:"壬寅",wx:"屬金利秋　宜其西方",verse:["佛前發誓無異心","且看前途得好音","此物原來本是鐵","也能變化得成金"],level:"上",summary:"只要一心誠懇、始終如一，鐵也能煉成金，終有好消息。",advice:"保持初心與誠意去堅持，會有意想不到的轉化。"},
{n:51,gz:"壬辰",wx:"屬水利冬　宜其北方",verse:["東西南北不堪行","前途此事正可當","勸君把定莫煩惱","家門自有保安康"],level:"中",summary:"四處奔走皆不順，但只要守住本分，家中仍能平安。",advice:"與其到處奔波求解，不如先安頓好自己與家人。"},
{n:52,gz:"壬午",wx:"屬木利春　宜其東方",verse:["功名事業本由天","不須掛念意懸懸","若問中間遲與速","風雲際會在眼前"],level:"中上",summary:"功名事業自有天時，時機成熟的際會已經在眼前。",advice:"不必為進度快慢懸心，該來的機會很快就會出現。"},
{n:53,gz:"壬申",wx:"屬金利秋　宜其西方",verse:["看君來問心中事","積善之家慶有餘","運亨財子雙雙至","指日喜氣溢門閭"],level:"上",summary:"平日積善之人，福澤有餘，財運與喜事將接連而來。",advice:"持續行善、待人以誠，喜氣很快就會降臨家門。"},
{n:54,gz:"壬戌",wx:"屬土利年　四方皆宜",verse:["孤燈寂寂夜沉沉","萬事清吉萬事成","若逢陰中有善果","燒得好香達神明"],level:"中上",summary:"雖處於安靜低調的階段，但只要心存善念，終能清吉有成。",advice:"低潮期不妨多做善事、沉澱自己，會為將來鋪路。"},
{n:55,gz:"癸丑",wx:"屬木利春　宜其東方",verse:["須知進退總言虛","看看發暗未必全","珠玉深藏還未變","心中但得枉徒然"],level:"中下",summary:"進退的說法都還不確定，好比珠玉尚深藏未現。",advice:"此時強求答案徒勞無益，不如靜待時機成熟。"},
{n:56,gz:"癸卯",wx:"屬金利秋　宜其西方",verse:["病中若得苦心勞","到底完全總未遭","去後不須回頭問","心中事務盡消磨"],level:"中下",summary:"歷經一番辛苦煎熬，但終究能撐過難關。",advice:"放下過去反覆糾結的事，讓時間慢慢把心結消磨掉。"},
{n:57,gz:"癸巳",wx:"屬水利冬　宜其北方",verse:["勸君把定心莫虛","前途清吉得運時","到底中間無大事","又遇神仙守安居"],level:"上",summary:"守住信心，前途清吉，過程中也沒有太大波折。",advice:"安心依照計畫前進，冥冥中自有貴人守護。"},
{n:58,gz:"癸未",wx:"屬木利春　宜其東方",verse:["蛇身意欲變成龍","只恐命內運未通","久病且作寬心坐","言語雖多不可從"],level:"中",summary:"有蛻變成長的心志，但時運尚未完全成熟，需再等等。",advice:"耐心調養、不必被眾說紛紜的意見左右方向。"},
{n:59,gz:"癸酉",wx:"屬金利秋　宜其西方",verse:["有心作福莫遲疑","求名清吉正當時","此事必能成會合","財寶自然喜相隨"],level:"上",summary:"有心行善、追求正道正是好時機，事情能圓滿成就。",advice:"想做的好事、正當的計畫，此時可以放心去做。"},
{n:60,gz:"癸亥",wx:"屬水利冬　宜其北方",verse:["月出光輝本清吉","浮雲總是蔽陰色","戶內用心再作福","當官分理便有益"],level:"中上",summary:"本質清吉光明，只是偶有浮雲遮蔽，需多加用心。",advice:"多在自己能掌握的事上用心努力，會比一味外求更有益。"}
];
let lastFortune=store.get('lastFortune',null);
function fortuneHTML(){
  const has=!!lastFortune;
  return `${hintBox('fortune','點一下籤筒就能求一支籤，看看今天的運勢。抽過的結果會留在這裡，家人想玩可以隨時再抽一次。內容僅供參考娛樂，別太當真喔！')}
  <div class="card fortune-card">
    <div class="fortune-stage">
      <div class="f-eyebrow">誠　心　則　靈</div>
      <div class="f-title">六十甲子籤</div>
      <div class="f-subtitle">默念心中所問之事，再行抽籤</div>
      <div class="f-smokewrap" aria-hidden="true"><div class="f-smoke"></div><div class="f-smoke"></div><div class="f-smoke"></div></div>

      <div class="f-qiantong-wrap ${has?'hidden':''}" id="qiantongWrap">
        <div class="f-qiantong" id="qiantong">
          <div class="f-sticks" id="sticksLayer"></div>
          <div class="f-tuberim"></div>
          <div class="f-tubebody"></div>
        </div>
        <div class="f-hint">點擊籤筒，搖出一支籤</div>
        <button class="f-drawbtn" id="drawBtn">🙏　誠　心　抽　籤</button>
      </div>

      <div class="f-flyingstick" id="flyingStick"></div>

      <div class="f-resultcard ${has?'':'hidden'}" id="resultCard">
        <div class="f-cardinner" id="cardInner">
          <div class="f-cardseal">籤</div>
          <div class="f-cardnum">第 <span id="rNum">${has?lastFortune.n:''}</span> 籤</div>
          <div class="f-cardgz" id="rGz">${has?lastFortune.gz:''}</div>
          <div class="f-cardlevel" id="rLevel">${has?lastFortune.level+'籤':''}</div>
          <div class="f-cardverse" id="rVerse">${has?lastFortune.verse.join('　<br>'):''}</div>
          <div class="f-cardwx" id="rWx">${has?lastFortune.wx:''}</div>
          <div class="f-cardsummary" id="rSummaryWrap"><b>籤意　</b><span id="rSummary">${has?lastFortune.summary:''}</span></div>
          <div class="f-cardadvice" id="rAdvice">${has?'建議　'+lastFortune.advice:''}</div>
        </div>
        <button class="f-againbtn" id="againBtn">再　求　一　籤</button>
      </div>

      <div class="f-footer">籤詩原文為民間流傳之六十甲子籤傳統版本；吉凶評註僅供參考娛樂，<br>人生方向仍須靠自己的判斷與努力，如遇重大抉擇建議諮詢專業人士。</div>
    </div>
  </div>`;
}
function bindFortuneView(){
  const qiantongWrap=document.getElementById('qiantongWrap');
  const qiantong=document.getElementById('qiantong');
  const drawBtn=document.getElementById('drawBtn');
  const sticksLayer=document.getElementById('sticksLayer');
  const flyingStick=document.getElementById('flyingStick');
  const resultCard=document.getElementById('resultCard');
  const cardInner=document.getElementById('cardInner');
  const againBtn=document.getElementById('againBtn');
  if(!qiantong)return;

  const STICK_COUNT=12;
  sticksLayer.innerHTML='';
  for(let i=0;i<STICK_COUNT;i++){
    const s=document.createElement('div');
    s.className='f-stick';
    const angle=(Math.random()*26-13).toFixed(1);
    const leftOffset=(Math.random()*60-30).toFixed(1);
    s.style.left=`calc(50% + ${leftOffset}px)`;
    s.style.transform=`rotate(${angle}deg)`;
    const tip=document.createElement('div');
    tip.className='f-tip';
    s.appendChild(tip);
    sticksLayer.appendChild(s);
  }

  let drawing=false;
  function drawQian(){
    if(drawing)return;
    drawing=true;
    if(drawBtn)drawBtn.disabled=true;
    qiantong.classList.add('shaking');
    playShakeNoise();

    setTimeout(()=>{
      qiantong.classList.remove('shaking');
      const item=QIAN_DATA[Math.floor(Math.random()*QIAN_DATA.length)];

      flyingStick.classList.remove('fly');
      void flyingStick.offsetWidth;
      flyingStick.classList.add('fly');

      setTimeout(()=>{
        qiantongWrap.classList.add('hidden');
        renderFortuneResult(item);
        lastFortune=item;
        store.set('lastFortune',lastFortune);
        resultCard.classList.remove('hidden');
        cardInner.style.animation='none';
        void cardInner.offsetWidth;
        cardInner.style.animation='';
        playGong();
        drawing=false;
        if(drawBtn)drawBtn.disabled=false;
      },950);
    },900);
  }
  function renderFortuneResult(item){
    document.getElementById('rNum').textContent=item.n;
    document.getElementById('rGz').textContent=item.gz;
    document.getElementById('rLevel').textContent=item.level+'籤';
    document.getElementById('rVerse').innerHTML=item.verse.join('　<br>');
    document.getElementById('rWx').textContent=item.wx;
    document.getElementById('rSummary').textContent=item.summary;
    document.getElementById('rAdvice').textContent='建議　'+item.advice;
  }
  drawBtn.addEventListener('click',drawQian);
  qiantong.addEventListener('click',drawQian);
  againBtn.addEventListener('click',()=>{
    resultCard.classList.add('hidden');
    qiantongWrap.classList.remove('hidden');
  });
}
function playShakeNoise(){
  if(settings.buttonSound===false)return;
  const ctx=ensureAudioCtx();if(!ctx)return;if(ctx.state==='suspended')ctx.resume();
  const dur=0.85;
  const bufferSize=Math.floor(ctx.sampleRate*dur);
  const buffer=ctx.createBuffer(1,bufferSize,ctx.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<bufferSize;i++){
    const env=(Math.sin(i/ctx.sampleRate*38)+1)/2;
    data[i]=(Math.random()*2-1)*0.3*env;
  }
  const src=ctx.createBufferSource();
  src.buffer=buffer;
  const gain=ctx.createGain();gain.gain.value=0.5;
  src.connect(gain);gain.connect(ctx.destination);
  src.start();
}
function playGong(){
  if(settings.buttonSound===false)return;
  const ctx=ensureAudioCtx();if(!ctx)return;if(ctx.state==='suspended')ctx.resume();
  const t=ctx.currentTime;
  const osc=ctx.createOscillator(),osc2=ctx.createOscillator();
  const gain=ctx.createGain();
  osc.type='sine';osc.frequency.setValueAtTime(110,t);
  osc2.type='sine';osc2.frequency.setValueAtTime(164,t);
  gain.gain.setValueAtTime(0.0001,t);
  gain.gain.exponentialRampToValueAtTime(0.32,t+0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001,t+1.7);
  osc.connect(gain);osc2.connect(gain);gain.connect(ctx.destination);
  osc.start(t);osc2.start(t);osc.stop(t+1.8);osc2.stop(t+1.8);
}

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
  ${hintBox('weather','這裡會自動抓取你目前位置的即時天氣（需要允許定位權限與網路連線），沒有網路或定位時會改顯示示意資料。')}
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

/* ============ NEWS (curated always-on links — the live RSS feed kept failing on real devices) ============ */
const defaultLinks=[
  {id:'google',img:'data:image/png;base64,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',name:'Google 搜尋',url:'https://www.google.com/'},
  {id:'youtube',img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACgUlEQVR4nO3d3VEcMRCFUdnlPOwYIP8QIAY7EvuBku0CZkaj1fyo+5wAYGvvtz3LE6UAAAAAAAAAAAAAEXw585f9fHr6febvm9mP19dTtjn8lxj9cUfGcMgPNvpxRscw9IcZ/jyjQvg64oeUYvyzjXq/hwRg/GuMeN8fOiOGv4/eR0L3BTD+vfTu0RWA8e+pZ5fdARj/3vbuM+yvAOa0KwCf/jns2ak5AOPPpXWvpgCMP6eW3XwHSG4zAJ/+uW3t5wIkJ4DkVgNw/mNY29EFSE4AyS0G4PzHsrSnC5BcyAC+v7xc/RKmETKAUt4iEMK2sAFUIlgXPoBSXIM1KQKoRPBRqgBKcQ3eSxdAJYQ3aQOoskeQPoBScl8DAfwnYwgC+ESmCASwIMs1EMCG6BEIoEHkayCAHSKGIIAOkSIQQKco10AAD5o9BAEMMmsEAhhoxmsggAPMFIEADjLLNfh29QuI6tfz89UvoYkLcIBZxi/FBRhqpuErAQww4/CVAB4w8/CV7wCdIoxfiguwW5ThKwE0ijZ85RHQIOr4pbgAqyIPXwngExmGrzwC3sk0fikuwF/Zhq/SB5B1+CptANmHr1J+BzD+P6kugOE/ShGA4ZeFfwQYf13YC2D4NiEvgPHbhQyAdgJIbjGA3v9GzT0t7ekCJCeA5FYD8BiIYW1HFyA5ASS3GYDHwNy29nMBkmsKwBWYU8tuzRdABHNp3WvXI0AEc9izk+8Aye0OwBW4t737dF0AEdxTzy7djwAR3EvvHkNG9J/Gr/PoB3HIl0DX4Boj3vdhfwWI4Fyj3u9DRvNIOM7oD9rhn1oxPO7I63rq2RZDO49UAAAAAAAAAAAAdvoDmHHT5FU7oIAAAAAASUVORK5CYII=',name:'YouTube',url:'https://www.youtube.com/'},
  {id:'yahoo-news',img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADJklEQVR4nO2c3VHjQBAGlysKUjoCgSAhEC6l4wUeKBdyYUn7OzO7X3cAtne6NZL94JQAAAAAAECLO883f3h//vR8/0h8PL25uDB9U4TnYxWEyZsgvp7RIQx7caT3Z0QMf3q/YErIH8WIuXYtCvF29NoG3TYA8m3pNe8uASDfhx5zbw4A+b60zr8pAOTHoMVDdQDIj0Wtj6oAkB+TGi/FASA/NqV+igJA/hyUeBrySyDMQ3YAXP1zkesrKwDkz0mON24B4hCAOKcBsP7n5swfG0CcwwC4+tfgyCMbQBwCEIcAxNkNgPv/Wuz5vLf+IKX8//vq/RGaefz34v0RdgkZwArSt2zPEy2GUAGsJv4WlzNGCSHMQ6CC/C1RzhsigCjDsCbCud0DiDAET7zP7xqA9+Gj4DkHtwCQf43XPFwCQP5tPOZiHgDyj7Gej/tDIPhiGgBXfx6Wc2IDiEMA4pgFwPovw2pebABxCEAcAhCHAMQhAHEIQBwCEIcAxCEAcQhAHAIQhwDEIQBxCEAcAhCHAMQhAHEIQBwCEIcAxCEAcQhAHLMAovwlyixYzYsNIA4BiGMaALeBPCznxAYQxzwAtsAx1vNx2QBEcBuPubjdAojgGq95uD4DEME3nnNwfwhUj8D7/O4BpOQ/BC8inDtEACnFGIYlUc4b6u/iL0NZ+e9kooi/ECqAC9shrRBDNOlbQgawZW94vcKILMeCMM8AHqjLT0k4AOR/E/4W0BvEXyO1AZD/G5kAkH8biQCQv8/yASD/mKUDQP45ywaA/DyWDAD5+Sz1OwDiy1lmAyC/jiUCQH490weA/DZ2A/h4eruz/CA1ID+fPZ/TbgDk92HaAKAPBCDOYQAzPAfAOUce2QDinAbAFpibM39sAHEIQJysALgNzEmOt+wNQARzkeuLW4A4RQGwBeagxFPxBiCC2JT6qboFEEFMarxUPwMQQSxqfTQ9BBJBDFo8NH8LIAJfWuff5WsgEfjQY+7dfgcgAlt6zXuItIf3588Rrwv9L7QhvwSyDcYwYq4motgI9Yy+mEyvVELIx2qLuq5qgviB2yYAAAAAmPEFLVD2ZzDCEkAAAAAASUVORK5CYII=',name:'Yahoo奇摩新聞',url:'https://tw.news.yahoo.com/'},
  {id:'yahoo',img:'data:image/png;base64,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',name:'Yahoo奇摩',url:'https://tw.yahoo.com/'},
  {id:'weather-gov',ic:'🌦️',name:'中央氣象署',url:'https://www.cwa.gov.tw/'},
  {id:'transport',ic:'🚌',name:'公路客運動態',url:'https://www.taiwanbus.tw/ebuspage/Default.aspx?lan=C'}
];
let quickLinks=store.get('quickLinks',defaultLinks);
(function migrateLineLink(){
  let changed=false;
  quickLinks.forEach(l=>{
    if(l.id==='line'&&l.url==='https://line.me/zh-hant/'){
      l.id='yahoo-news';l.name='Yahoo奇摩新聞';l.url='https://tw.news.yahoo.com/';changed=true;
    }
  });
  if(changed)store.set('quickLinks',quickLinks);
})();
/* fix a previously-wrong default link for people who already saved an older version */
(function migrateQuickLinks(){
  let changed=false;
  quickLinks.forEach(l=>{
    if(l.url==='https://www.taiwan.gov.tw/'&&l.name==='台灣公共運輸'){
      l.name='公路客運動態';l.url='https://www.taiwanbus.tw/ebuspage/Default.aspx?lan=C';l.ic='🚌';changed=true;
    }
  });
  if(changed)store.set('quickLinks',quickLinks);
})();
function newsHTML(){
  return `${hintBox('news','即時新聞在這個環境一直讀取失敗，所以換成大家最常用、不用登入就能用的網站捷徑。點圖示就直接開啟，也可以自己新增、修改或刪除，還能上傳照片當圖示。')}
  <div class="card">
    <h2 style="margin-top:0;">🔗 常用網站</h2>
    ${renderShortcutGrid(quickLinks,'linkGrid')}
  </div>`;
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
let savedPlaces=store.get('savedPlaces',[]);
function placesGridHTML(){
  return `<div class="place-grid">
    ${savedPlaces.map(p=>`
      <div class="card place-card">
        <div class="place-name">📍 ${escapeHtml(p.name)}</div>
        <div class="place-addr">${escapeHtml(p.address)}</div>
        <div class="place-actions">
          <button class="btn btn-soft place-nav" data-id="${p.id}">🧭 導航</button>
          <button class="btn btn-ghost place-rm" data-id="${p.id}">刪除</button>
        </div>
      </div>`).join('')}
    <div class="card place-card place-add" id="placeAddCard">
      <div style="font-size:32px;">➕</div>
      <div class="place-name">新增常去地點</div>
    </div>
  </div>`;
}
function openAddPlaceModal(){
  const overlay=document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML=`<div class="modal-box">
    <h3>新增常去地點</h3>
    <input id="placeName" placeholder="地點名稱，例如：家裡、○○醫院">
    <input id="placeAddr" placeholder="完整地址">
    <div class="modal-actions">
      <button class="btn btn-ghost" id="placeCancel">取消</button>
      <button class="btn btn-primary" id="placeSave">儲存</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  const close=()=>overlay.remove();
  overlay.querySelector('#placeCancel').onclick=close;
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  overlay.querySelector('#placeSave').onclick=()=>{
    const name=overlay.querySelector('#placeName').value.trim();
    const addr=overlay.querySelector('#placeAddr').value.trim();
    if(!name||!addr){alert('請輸入名稱和地址');return;}
    savedPlaces.push({id:crypto.randomUUID(),name,address:addr});
    store.set('savedPlaces',savedPlaces);
    close();
    renderMain();
  };
}
function mapHTML(){
  return `${hintBox('map','輸入想去的地方按「開始導航」會用 Google 地圖規劃路線，Android、iPhone 都能用。地圖本身一定要有網路才能查詢和導航；但下面「常去地點」存的名稱和地址，沒有網路也看得到，有網路時按「導航」就能直接開路線。')}
  <div class="card">
    <h2 style="margin-top:0;">🗺 Google 地圖導航</h2>
    <div class="quick-add">
      <input id="mapDestInput" placeholder="輸入目的地，例如：台北車站">
      <button class="btn btn-primary" id="mapGoBtn">🧭 開始導航</button>
    </div>
    <iframe id="mapEmbed" src="https://maps.google.com/maps?q=Taiwan&z=8&output=embed" style="width:100%;height:320px;border:0;border-radius:16px;margin-top:8px;" loading="lazy"></iframe>
  </div>
  <div class="card" style="margin-top:16px;">
    <h2 style="margin-top:0;">📍 我的常去地點</h2>
    ${placesGridHTML()}
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
  if(inp&&go){
    const doNav=()=>{
      const v=inp.value.trim();
      if(!v)return;
      window.open('https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(v),'_blank');
      if(embed)embed.src='https://maps.google.com/maps?q='+encodeURIComponent(v)+'&z=14&output=embed';
    };
    go.addEventListener('click',doNav);
    inp.addEventListener('keypress',e=>{if(e.key==='Enter')doNav();});
  }
  document.querySelectorAll('.place-nav').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=savedPlaces.find(x=>x.id===btn.dataset.id);
      if(p)window.open('https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(p.address),'_blank');
    });
  });
  document.querySelectorAll('.place-rm').forEach(btn=>{
    btn.addEventListener('click',()=>{
      savedPlaces=savedPlaces.filter(p=>p.id!==btn.dataset.id);
      store.set('savedPlaces',savedPlaces);
      renderMain();
    });
  });
  const placeAddCard=document.getElementById('placeAddCard');
  if(placeAddCard)placeAddCard.addEventListener('click',openAddPlaceModal);
}

/* ============ 語音筆記 ============ */
let recognition=null;
let recTimerInterval=null;
let recSecondsLeft=0;
const MAX_REC_SECONDS=60;
let voiceNotes=store.get('voiceNotes',[]);
function noteHTML(){
  return `${hintBox('note',`手指按住麥克風按鈕開始說話，最長可以錄 ${MAX_REC_SECONDS} 秒，時間到會自動停止。放開後內容會存到下面的「筆記記錄」，如果想加入待辦事項要自己按「加入待辦」。⚠️ iPhone 的 Safari 瀏覽器目前不支援語音辨識（蘋果的限制），請改用 Android 手機或電腦的 Chrome 瀏覽器。`)}
  <div class="card" style="text-align:center;">
    <h2>🎙 語音筆記</h2>
    <p style="color:var(--ink-soft);">按住下方按鈕開始說話，內容會存在下面「筆記記錄」，不會自動加入待辦事項。</p>
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
          <button onclick="addNoteToTodo('${n.id}')" title="加入待辦事項">➕待辦</button>
          <button onclick="deleteVoiceNote('${n.id}')">🗑</button>
        </div>
      </div>
      <div class="ntxt" contenteditable="true" onblur="editVoiceNote('${n.id}',this.textContent)">${escapeHtml(n.text)}</div>
    </div>`).join('');
}
function addNoteToTodo(id){
  const n=voiceNotes.find(x=>x.id===id);if(!n)return;
  const parts=n.text.split(/[，。,\\.]|然後|還有/).map(s=>s.trim()).filter(Boolean);
  parts.forEach(p=>todos.push({id:crypto.randomUUID(),text:p,done:false,date:null}));
  store.set('todos',todos);
  alert('已加入 '+parts.length+' 筆到待辦事項！');
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
  res.innerHTML=`<div style="color:var(--ink-soft);">辨識內容：${escapeHtml(text)}</div><div style="margin-top:6px;">已存到下面的筆記記錄，如果要加入待辦事項可以按「➕待辦」。</div>`;
  const hl=document.getElementById('noteHistoryList');
  if(hl)hl.innerHTML=renderNoteHistory();
}

/* ============ SETTINGS ============ */
function settingsHTML(){
  const themes=[['pink','粉紅','var(--pink)'],['blue','粉藍','var(--blue)'],['milktea','奶茶','var(--milktea)'],['purple','淡紫','var(--purple)'],['mint','薄荷','var(--mint)']];
  return `${hintBox('settings','點選按鈕或色塊會馬上套用，不用另外按儲存。畫面右上角也有「❓」按鈕，可以隨時打開完整使用說明。')}
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
      <p>快速點兩下月曆上的日期，會跳出視窗，日期已經幫你填好，輸入內容按「儲存」即可。完成的事項點左邊方框打勾，會自動變成淡色。手指在項目上向左滑，會出現紅色「刪除」，再點一下才會刪除，避免不小心點錯。上方按「🔊 播報」會用語音唸出今天的日期和時間。如果有 3 天內快到期的待辦事項，會在上面用黃色小提醒閃一下。</p>
      <h4>🧮 計算機</h4>
      <p>跟一般計算機一樣，按數字和加減乘除，按「＝」得到結果。可以切換粉紅／粉藍配色。右邊「本次購物小計」可以把任一筆計算結果加進去累計總金額。紀錄旁的🗑可以刪掉單一筆紀錄，「清除全部紀錄」可以一次清空。</p>
      <h4>🙏 重要節日</h4>
      <p>點一下節日卡片就能查看和修改拜拜供品，藍色底是「觀世音菩薩」、黃色底是「祖先」。點供品文字可以直接修改，點「✕」刪除，點「＋新增」可以加入新的項目，內容都會自動存起來。</p>
      <h4>🎋 求籤</h4>
      <p>點一下籤卡或按鈕就能求一支六十甲子籤，看看今天的運勢，會有搖籤和開籤的音效。抽過的結果會留著，家人想玩可以隨時進來按「再求一籤」。內容純屬民俗趣味，僅供參考。</p>
      <h4>☁️ 天氣</h4>
      <p>會自動抓取你目前所在位置的即時天氣（需要允許瀏覽器定位、並連上網路），顯示溫度、紫外線、風力、濕度、穿衣建議和一週預報。如果沒有網路或不給定位，會改顯示示意資料並註明。</p>
      <h4>🗺 地圖</h4>
      <p>輸入想去的地方按「開始導航」，會用 Google 地圖規劃路線，Android、iPhone 都能使用——但地圖查詢和導航一定要有網路才能用。「常去地點」可以先存好名稱和地址，沒有網路也看得到地址，有網路時按「導航」直接開路線。下方「最常用的查詢」可以一鍵找附近醫院、藥局、超市等，也可以自己新增、刪除，或上傳照片當圖示。</p>
      <h4>📰 新聞</h4>
      <p>即時新聞在這個環境一直讀取失敗，所以這裡改成大家最常用、不用登入的網站捷徑（Google、YouTube、Yahoo奇摩新聞等），點圖示就直接開啟。也可以自己新增、修改或刪除，並上傳照片當圖示。</p>
      <h4>🎙 語音筆記</h4>
      <p>按住麥克風按鈕開始說話，最長可以錄 60 秒，時間到會自動停止，內容會存到「筆記記錄」，<b>不會</b>自動加入待辦事項——想加入的話要自己按「➕待辦」。可以點文字直接修改，也可以按🗑刪除。⚠️ iPhone 的 Safari 瀏覽器不支援這個功能，請改用 Android 手機或電腦的 Chrome 瀏覽器。</p>
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
  if(currentView==='news')bindShortcutGrid('linkGrid',quickLinks,'quickLinks',renderMain);
  if(currentView==='map')bindMapView();
  if(currentView==='fortune')bindFortuneView();
  if(currentView==='fest')bindFestivals();
}

/* ============ INIT ============ */
applySettings();
renderNav();
renderMain();
