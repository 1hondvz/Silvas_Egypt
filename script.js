const firebaseConfig = {
  apiKey: "AIzaSyB1iKAp4vwm1bzna1YbUDT1KzFR0TOLduk",
  authDomain: "silvas-egypt.firebaseapp.com",
  databaseURL: "https://silvas-egypt-default-rtdb.firebaseio.com",
  projectId: "silvas-egypt"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const ROLE_COLORS = { Owner:"gold","ادمن":"red","مراقب":"gray","مرشد":"orange",Normal:"white" };
const ROLE_CODES  = { "01221849553":"Owner","1111":"ادمن","2222":"مراقب","3333":"مرشد" };
const DEFAULT_FIGURE_MALE   = "hr-100-61.hd-180-1.ch-210-62.lg-270-62.sh-290-62";
const DEFAULT_FIGURE_FEMALE = "hr-540-61.hd-600-1.ch-630-62.lg-695-62.sh-725-62";
const HABBO_IMAGER = "https://www.habbo.com/habbo-imaging/avatarimage";
const BADGES_PATH = "";

const ROLE_BADGES = {
  Owner:   { id:"owner",   img:"https://i.ibb.co/ksG2jM2g/owner.webp",      name:"Owner",  chatColor:"#ff4444" },
  "ادمن":  { id:"admin",   img:"https://i.ibb.co/7xNsYMQY/admin.png",        name:"أدمن",   chatColor:"#ff6b35" },
  "مراقب": { id:"mod",     img:"https://i.ibb.co/Wp079TVz/moderator.png",    name:"مراقب",  chatColor:"#95a5a6" },
  "مرشد":  { id:"guide",   img:"https://i.ibb.co/tT9rz4Gf/guide.png",        name:"مرشد",   chatColor:"#e67e22" },
};

// بطاقات يمنحها الأدمن
const GRANTABLE_BADGES = [
  { id:"diamond",     img:"https://i.ibb.co/xqVLnmgM/diamond.png",     name:"ماسية",            chatColor:"#a8edff" },
  { id:"gold_badge",  img:"https://i.ibb.co/gF43TW28/gold.png",        name:"ذهبية",            chatColor:"#f0a500" },
  { id:"silver",      img:"https://i.ibb.co/39HZvZFp/silver.png",      name:"فضية",             chatColor:"#b2bec3" },
  { id:"silvas_club", img:"https://i.ibb.co/vCXJ8QVh/silvas-club.png", name:"عضو نادي Silvas",  chatColor:"#a29bfe" },
];

const ROOM_SIZES = {
  Normal:[{val:10,label:"صغير (10)"},{val:25,label:"وسط (25)"}],
  VIP:   [{val:10,label:"صغير (10)"},{val:25,label:"وسط (25)"},{val:50,label:"كبير (50)"},{val:100,label:"كبير جداً (100)"}]
};

function getAvatarUrl(figure,gender){const g=gender==="female"?"F":"M";return `${HABBO_IMAGER}?figure=${figure}&size=h&head_direction=2&gesture=sml&gender=${g}`;}
function getFullAvatarUrl(figure,gender){const g=gender==="female"?"F":"M";return `${HABBO_IMAGER}?figure=${figure}&size=b&direction=2&head_direction=2&gesture=sml&gender=${g}`;}

// ====== SHOP DATA ======
const SHOP={male:{"💇 شعر":[{id:"hr-105",name:"شعر قصير",price:50,part:"hr",value:"hr-105-61"},{id:"hr-115",name:"شعر منتصف",price:70,part:"hr",value:"hr-115-61"},{id:"hr-125",name:"شعر ناعم",price:80,part:"hr",value:"hr-125-61"},{id:"hr-135",name:"شعر موجي",price:90,part:"hr",value:"hr-135-61"},{id:"hr-155",name:"شعر مرفوع",price:100,part:"hr",value:"hr-155-61"},{id:"hr-165",name:"شعر أملس",price:120,part:"hr",value:"hr-165-61"},{id:"hr-170",name:"شعر طويل",price:150,part:"hr",value:"hr-170-61"},{id:"hr-676",name:"شعر عصري",price:180,part:"hr",value:"hr-676-61"},{id:"hr-681",name:"شعر أفرو",price:200,part:"hr",value:"hr-681-61"},{id:"hr-889",name:"شعر VIP",price:300,part:"hr",value:"hr-889-61"}],"👕 تيشيرتات":[{id:"ch-210",name:"تيشيرت بسيط",price:50,part:"ch",value:"ch-210-62"},{id:"ch-215",name:"تيشيرت كاجوال",price:70,part:"ch",value:"ch-215-62"},{id:"ch-220",name:"تيشيرت رياضي",price:80,part:"ch",value:"ch-220-62"},{id:"ch-225",name:"تيشيرت أنيق",price:100,part:"ch",value:"ch-225-62"},{id:"ch-230",name:"هوديه",price:120,part:"ch",value:"ch-230-62"},{id:"ch-235",name:"هوديه ملون",price:140,part:"ch",value:"ch-235-62"},{id:"ch-240",name:"جاكيت",price:160,part:"ch",value:"ch-240-62"},{id:"ch-245",name:"جاكيت فاخر",price:180,part:"ch",value:"ch-245-62"},{id:"ch-250",name:"بدلة رياضية",price:220,part:"ch",value:"ch-250-62"},{id:"ch-255",name:"سترة VIP",price:300,part:"ch",value:"ch-255-62"}],"👖 بناطيل":[{id:"lg-270",name:"بنطال بسيط",price:50,part:"lg",value:"lg-270-62"},{id:"lg-275",name:"بنطال كاجوال",price:70,part:"lg",value:"lg-275-62"},{id:"lg-280",name:"جينز",price:90,part:"lg",value:"lg-280-62"},{id:"lg-285",name:"جينز ضيق",price:110,part:"lg",value:"lg-285-62"},{id:"lg-281",name:"بنطال رياضي",price:130,part:"lg",value:"lg-281-62"},{id:"lg-270b",name:"شورت",price:60,part:"lg",value:"lg-270-82"},{id:"lg-285b",name:"بنطال فاخر",price:200,part:"lg",value:"lg-285-82"},{id:"lg-280b",name:"بنطال VIP",price:300,part:"lg",value:"lg-280-110"}],"👟 أحذية":[{id:"sh-290",name:"حذاء بسيط",price:50,part:"sh",value:"sh-290-62"},{id:"sh-295",name:"حذاء رياضي",price:70,part:"sh",value:"sh-295-62"},{id:"sh-300",name:"حذاء كاجوال",price:90,part:"sh",value:"sh-300-62"},{id:"sh-305",name:"حذاء أنيق",price:120,part:"sh",value:"sh-305-62"},{id:"sh-905",name:"حذاء فاخر",price:200,part:"sh",value:"sh-905-62"},{id:"sh-906",name:"حذاء VIP",price:300,part:"sh",value:"sh-906-62"}],"🎩 طواقي":[{id:"ha-1001",name:"قبعة كاب",price:60,part:"ha",value:"ha-1001-62"},{id:"ha-1002",name:"قبعة بيني",price:80,part:"ha",value:"ha-1002-62"},{id:"ha-1003",name:"قبعة صيد",price:100,part:"ha",value:"ha-1003-62"},{id:"ha-1004",name:"قبعة عصرية",price:120,part:"ha",value:"ha-1004-62"},{id:"ha-1005",name:"قبعة رياضية",price:150,part:"ha",value:"ha-1005-62"},{id:"ha-1009",name:"قبعة VIP",price:250,part:"ha",value:"ha-1009-62"},{id:"ha-1010",name:"تاج",price:300,part:"ha",value:"ha-1010-62"}],"👓 إكسسوارات":[{id:"he-1601",name:"نظارة بسيطة",price:60,part:"he",value:"he-1601-62"},{id:"he-1602",name:"نظارة شمس",price:80,part:"he",value:"he-1602-62"},{id:"he-1605",name:"نظارة ملونة",price:100,part:"he",value:"he-1605-62"},{id:"he-1606",name:"نظارة فاخرة",price:150,part:"he",value:"he-1606-62"},{id:"he-1608",name:"ماسك",price:120,part:"he",value:"he-1608-62"},{id:"he-1609",name:"هيدفون",price:200,part:"he",value:"he-1609-62"}]},female:{"💇 شعر":[{id:"hr-500",name:"شعر قصير",price:50,part:"hr",value:"hr-500-61"},{id:"hr-505",name:"شعر متوسط",price:70,part:"hr",value:"hr-505-61"},{id:"hr-510",name:"شعر ناعم",price:80,part:"hr",value:"hr-510-61"},{id:"hr-515",name:"شعر مجعد",price:90,part:"hr",value:"hr-515-61"},{id:"hr-520",name:"شعر مضفر",price:100,part:"hr",value:"hr-520-61"},{id:"hr-530",name:"شعر طويل",price:120,part:"hr",value:"hr-530-61"},{id:"hr-540",name:"شعر مجعد طويل",price:150,part:"hr",value:"hr-540-61"},{id:"hr-550",name:"شعر بوني تيل",price:170,part:"hr",value:"hr-550-61"},{id:"hr-555",name:"شعر ناعم طويل",price:200,part:"hr",value:"hr-555-61"},{id:"hr-890",name:"شعر VIP",price:300,part:"hr",value:"hr-890-61"}],"👕 تيشيرتات":[{id:"ch-630f",name:"تيشيرت بسيط",price:50,part:"ch",value:"ch-630-62"},{id:"ch-635f",name:"تيشيرت كاجوال",price:70,part:"ch",value:"ch-635-62"},{id:"ch-640f",name:"تيشيرت أنيق",price:90,part:"ch",value:"ch-640-62"},{id:"ch-645f",name:"تيشيرت ملون",price:100,part:"ch",value:"ch-645-62"},{id:"ch-650f",name:"بلوزة",price:120,part:"ch",value:"ch-650-62"},{id:"ch-655f",name:"هوديه",price:140,part:"ch",value:"ch-655-62"},{id:"ch-660f",name:"جاكيت",price:160,part:"ch",value:"ch-660-62"},{id:"ch-665f",name:"فستان قصير",price:180,part:"ch",value:"ch-665-62"},{id:"ch-670f",name:"فستان أنيق",price:220,part:"ch",value:"ch-670-62"},{id:"ch-675f",name:"فستان VIP",price:300,part:"ch",value:"ch-675-62"}],"👖 بناطيل":[{id:"lg-695f",name:"بنطال بسيط",price:50,part:"lg",value:"lg-695-62"},{id:"lg-700f",name:"بنطال كاجوال",price:70,part:"lg",value:"lg-700-62"},{id:"lg-705f",name:"جينز",price:90,part:"lg",value:"lg-705-62"},{id:"lg-710f",name:"جينز ضيق",price:110,part:"lg",value:"lg-710-62"},{id:"lg-715f",name:"تنورة قصيرة",price:130,part:"lg",value:"lg-715-62"},{id:"lg-720f",name:"تنورة طويلة",price:160,part:"lg",value:"lg-720-62"},{id:"lg-696f",name:"شورت",price:80,part:"lg",value:"lg-696-62"},{id:"lg-716f",name:"بنطال VIP",price:300,part:"lg",value:"lg-716-62"}],"👟 أحذية":[{id:"sh-725f",name:"حذاء بسيط",price:50,part:"sh",value:"sh-725-62"},{id:"sh-730f",name:"حذاء رياضي",price:70,part:"sh",value:"sh-730-62"},{id:"sh-735f",name:"حذاء كعب",price:100,part:"sh",value:"sh-735-62"},{id:"sh-740f",name:"حذاء أنيق",price:130,part:"sh",value:"sh-740-62"},{id:"sh-907f",name:"حذاء فاخر",price:200,part:"sh",value:"sh-907-62"},{id:"sh-905f",name:"حذاء VIP",price:300,part:"sh",value:"sh-905-62"}],"🎩 طواقي":[{id:"ha-1001f",name:"قبعة كاب",price:60,part:"ha",value:"ha-1001-62"},{id:"ha-1002f",name:"قبعة بيني",price:80,part:"ha",value:"ha-1002-62"},{id:"ha-1003f",name:"قبعة صيف",price:100,part:"ha",value:"ha-1003-62"},{id:"ha-1004f",name:"قبعة عصرية",price:120,part:"ha",value:"ha-1004-62"},{id:"ha-1005f",name:"قبعة رياضية",price:150,part:"ha",value:"ha-1005-62"},{id:"ha-1022f",name:"تاج",price:300,part:"ha",value:"ha-1022-62"}],"👓 إكسسوارات":[{id:"he-1601f",name:"نظارة بسيطة",price:60,part:"he",value:"he-1601-62"},{id:"he-1602f",name:"نظارة شمس",price:80,part:"he",value:"he-1602-62"},{id:"he-1605f",name:"نظارة ملونة",price:100,part:"he",value:"he-1605-62"},{id:"he-1606f",name:"نظارة فاخرة",price:150,part:"he",value:"he-1606-62"},{id:"he-1608f",name:"ماسك",price:120,part:"he",value:"he-1608-62"},{id:"he-1609f",name:"هيدفون",price:200,part:"he",value:"he-1609-62"}]}};

// ====== STATE ======
const chat=document.getElementById("chat");
const goldEl=document.getElementById("gold");
const gemsEl=document.getElementById("gems");
const msgInput=document.getElementById("msg");
const form=document.getElementById("form");
let gold=0,gems=0,lastDaily=0,lastSpin=0;
let playerRole="Normal",playerName="",playerUID="",playerGender="",playerFigure="";
let playerInventory={},playerBio="",playerGrantedBadges={};
let currentShopCat="",previewFigure="";
let currentRoomId="",currentRoomData=null;
let pendingRoomId="",pendingRoomData=null;
let viewingUID=""; // البروفايل اللي بيتشاف دلوقتي

function getRole(){return playerRole||"Normal";}
function canGiveRole(){return["Owner","ادمن"].includes(getRole());}
function canKickOrMute(){return["Owner","ادمن","مراقب"].includes(getRole());}
function canGiveCurrency(){return getRole()==="Owner";}
function isVIP(){return["Owner","ادمن"].includes(getRole());}

// لون الشات حسب أعلى بطاقة
function getNameColor(role, grantedBadges) {
  if(role==="Owner") return ROLE_BADGES.Owner.chatColor;
  if(role==="ادمن") return ROLE_BADGES["ادمن"].chatColor;
  // بطاقات ممنوحة
  if(grantedBadges&&grantedBadges.diamond) return GRANTABLE_BADGES.find(b=>b.id==="diamond").chatColor;
  if(grantedBadges&&grantedBadges.gold_badge) return GRANTABLE_BADGES.find(b=>b.id==="gold_badge").chatColor;
  if(grantedBadges&&grantedBadges.silvas_club) return GRANTABLE_BADGES.find(b=>b.id==="silvas_club").chatColor;
  if(grantedBadges&&grantedBadges.silver) return GRANTABLE_BADGES.find(b=>b.id==="silver").chatColor;
  if(role==="مراقب") return ROLE_BADGES["مراقب"].chatColor;
  if(role==="مرشد") return ROLE_BADGES["مرشد"].chatColor;
  return "white";
}

function toast(msg,color="#6c5ce7"){
  document.querySelectorAll(".toast").forEach(t=>t.remove());
  const t=document.createElement("div");
  t.className="toast";t.style.background=color;t.textContent=msg;
  document.body.appendChild(t);setTimeout(()=>t.remove(),3000);
}

function showRegister(){document.getElementById("loginForm").style.display="none";document.getElementById("registerForm").style.display="block";document.getElementById("regError").textContent="";}
function showLogin(){document.getElementById("registerForm").style.display="none";document.getElementById("loginForm").style.display="block";document.getElementById("loginError").textContent="";}

// ====== LOGIN ======
function handleLogin(e){
  e.preventDefault();
  const name=document.getElementById("loginName").value.trim();
  const pass=document.getElementById("loginPass").value.trim();
  const errEl=document.getElementById("loginError");errEl.textContent="";
  if(!name||!pass){errEl.textContent="ادخل الاسم وكلمة المرور!";return;}
  const btn=document.getElementById("loginBtn");btn.textContent="جارٍ الدخول...";btn.disabled=true;
  db.ref("players").orderByChild("name").equalTo(name).once("value").then(snap=>{
    if(snap.exists()){
      const key=Object.keys(snap.val())[0];const data=snap.val()[key];
      if(data.password!==pass){errEl.textContent="كلمة المرور غلط!";btn.textContent="دخول";btn.disabled=false;return;}
      if(data.kicked&&data.kickEnd&&Date.now()<data.kickEnd){errEl.textContent="أنت مطرود! باقي "+Math.ceil((data.kickEnd-Date.now())/60000)+" دقيقة";btn.textContent="دخول";btn.disabled=false;return;}
      playerUID=key;playerName=data.name;gold=data.gold||0;gems=data.gems||0;
      lastDaily=data.lastDaily||0;lastSpin=data.lastSpin||0;
      playerRole=data.role||"Normal";playerGender=data.gender||"male";
      playerFigure=data.figure||(playerGender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
      playerInventory=data.inventory||{};playerBio=data.bio||"";
      playerGrantedBadges=data.grantedBadges||{};
      // سجّل اللاعب أونلاين
      db.ref("players/"+playerUID).update({online:true});
      db.ref("players/"+playerUID+"/online").onDisconnect().set(false);
      enterLobby();
      // تتبع عدد مرات الدخول
      incStat("loginCount", v => checkAndUnlockAch("loginCount", v));
    }else{errEl.textContent="الاسم غير موجود، سجل حساب جديد!";btn.textContent="دخول";btn.disabled=false;}
  }).catch(()=>{errEl.textContent="خطأ في الاتصال، حاول تاني!";btn.textContent="دخول";btn.disabled=false;});
}

// ====== REGISTER ======
function handleRegister(e){
  e.preventDefault();
  const name=document.getElementById("regName").value.trim();
  const pass=document.getElementById("regPass").value.trim();
  const passConfirm=document.getElementById("regPassConfirm").value.trim();
  const gender=document.getElementById("regGender").value;
  const errEl=document.getElementById("regError");errEl.textContent="";
  if(!name||!pass||!gender){errEl.textContent="ادخل كل البيانات!";return;}
  if(name.length<3){errEl.textContent="الاسم لازم يكون 3 حروف على الأقل!";return;}
  if(pass.length<4){errEl.textContent="كلمة المرور لازم تكون 4 أحرف على الأقل!";return;}
  if(pass!==passConfirm){errEl.textContent="كلمة المرور مش متطابقة!";return;}
  const btn=document.getElementById("regBtn");btn.textContent="جارٍ التسجيل...";btn.disabled=true;
  db.ref("players").orderByChild("name").equalTo(name).once("value").then(snap=>{
    if(snap.exists()){errEl.textContent="الاسم مستخدم بالفعل، اختار اسم تاني!";btn.textContent="تسجيل";btn.disabled=false;return;}
    playerUID="p_"+Date.now();playerName=name;playerGender=gender;
    playerFigure=gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE;
    playerInventory={};playerBio="";playerGrantedBadges={};
    db.ref("players/"+playerUID).set({name,password:pass,gender,figure:playerFigure,gold:100,gems:20,lastDaily:0,lastSpin:0,role:"Normal",inventory:{},bio:"",grantedBadges:{},likes:{},friends:{},online:true});
    db.ref("players/"+playerUID+"/online").onDisconnect().set(false);
    playerRole="Normal";gold=100;gems=20;lastDaily=0;lastSpin=0;
    enterLobby();toast("🎁 مرحباً! حصلت على 100 Gold و 20 Gems هدية ترحيب!","#28a745");
  }).catch(()=>{errEl.textContent="خطأ في الاتصال، حاول تاني!";btn.textContent="تسجيل";btn.disabled=false;});
}

// ====== LOBBY ======
function enterLobby(){
  document.getElementById("authPage").style.display="none";
  document.getElementById("gamePage").style.display="none";
  document.getElementById("lobbyPage").style.display="flex";
  updateLobbyUI();listenToMyData();loadRooms();ensureWelcomeRoom();
  document.getElementById("lobbyAdminBtn").style.display=(canGiveRole()||canKickOrMute())?"inline-block":"none";
  listenNotifications();
  loadBlockedPlayers();
}
function updateLobbyUI(){
  document.getElementById("lobbyGold").textContent="Gold: "+gold;
  document.getElementById("lobbyGems").textContent="Gems: "+gems;
}
function ensureWelcomeRoom(){
  db.ref("rooms/welcome").once("value").then(snap=>{
    if(!snap.exists()) db.ref("rooms/welcome").set({id:"welcome",name:"أهلاً بكم في Silvas Egypt !",owner:"system",ownerName:"Silvas",size:100,password:"",locked:false,createdAt:Date.now()});
  });
}
function loadRooms(){
  db.ref("rooms").on("value",snap=>{
    const grid=document.getElementById("roomsGrid");grid.innerHTML="";
    if(!snap.exists()){grid.innerHTML='<p style="color:#aaa;font-size:13px;">لا توجد غرف متاحة</p>';return;}
    const rooms=snap.val();
    const sorted=Object.values(rooms).sort((a,b)=>{if(a.id==="welcome") return -1;if(b.id==="welcome") return 1;return (b.createdAt||0)-(a.createdAt||0);});
    sorted.forEach(room=>{
      const card=document.createElement("div");
      card.className="room-card"+(room.id==="welcome"?" welcome":"")+(room.locked?" locked":"");
      card.onclick=()=>tryEnterRoom(room);
      const sizeLabel=room.size<=10?"صغير":room.size<=25?"وسط":room.size<=50?"كبير":"كبير جداً";
      card.innerHTML=`${room.locked?'<span class="room-lock">🔒</span>':""}<div class="room-name">${room.name}</div><div class="room-info"><span class="room-size-badge">${sizeLabel} (${room.size})</span></div><div class="room-owner">👤 ${room.ownerName||"Silvas"}</div>`;
      grid.appendChild(card);
    });
  });
}
function tryEnterRoom(room){
  if(room.locked&&room.password){pendingRoomId=room.id;pendingRoomData=room;document.getElementById("roomPassInput").value="";document.getElementById("roomPassOverlay").classList.add("open");}
  else enterRoom(room.id,room);
}
function closeRoomPass(){document.getElementById("roomPassOverlay").classList.remove("open");pendingRoomId="";pendingRoomData=null;}
function confirmRoomPass(){const pass=document.getElementById("roomPassInput").value;if(pass===pendingRoomData.password){document.getElementById("roomPassOverlay").classList.remove("open");enterRoom(pendingRoomId,pendingRoomData);}else toast("كلمة المرور غلط! 🔒","#dc3545");}
function enterRoom(roomId,roomData){
  currentRoomId=roomId;currentRoomData=roomData;
  document.getElementById("lobbyPage").style.display="none";
  document.getElementById("gamePage").style.display="flex";
  document.getElementById("currentRoomName").textContent=roomData.name;
  updateUI();updateRoleButtons();
  document.getElementById("roomSettingsBtn").style.display=(roomData.owner===playerUID||canGiveRole())?"inline-block":"none";
  loadRoomChat(roomId);listenChatClear(roomId);addSystemMessage("دخلت غرفة: "+roomData.name);
  incStat("roomEnterCount", v => checkAndUnlockAch("roomEnterCount", v));
}
function goToLobby(){
  db.ref("rooms/"+currentRoomId+"/chat").off();
  db.ref("rooms/"+currentRoomId+"/cleared").off();
  chat.innerHTML="";currentRoomId="";currentRoomData=null;
  document.getElementById("gamePage").style.display="none";
  document.getElementById("lobbyPage").style.display="flex";
  updateLobbyUI();
}

// ====== CREATE ROOM ======
function openCreateRoom(){
  const select=document.getElementById("roomSizeInput");select.innerHTML="";
  const sizes=isVIP()?ROOM_SIZES.VIP:ROOM_SIZES.Normal;
  sizes.forEach(s=>{const opt=document.createElement("option");opt.value=s.val;opt.textContent=s.label;select.appendChild(opt);});
  document.getElementById("roomNameInput").value="";document.getElementById("roomPassInputCreate").value="";
  document.getElementById("createRoomOverlay").classList.add("open");
}
function closeCreateRoom(){document.getElementById("createRoomOverlay").classList.remove("open");}
function createRoomOverlayClick(e){if(e.target===document.getElementById("createRoomOverlay"))closeCreateRoom();}
function confirmCreateRoom(){
  const name=document.getElementById("roomNameInput").value.trim();
  const size=parseInt(document.getElementById("roomSizeInput").value);
  const pass=document.getElementById("roomPassInputCreate").value;
  if(!name){toast("ادخل اسم للغرفة!","#dc3545");return;}
  const roomId="room_"+Date.now();
  const roomData={id:roomId,name,owner:playerUID,ownerName:playerName,size,password:pass,locked:!!pass,createdAt:Date.now()};
  db.ref("rooms/"+roomId).set(roomData);closeCreateRoom();enterRoom(roomId,roomData);
  incStat("roomCreateCount", v => checkAndUnlockAch("roomCreateCount", v));
  toast("✅ تم إنشاء الغرفة!","#28a745");
}
function openRoomSettings(){
  if(!currentRoomData) return;
  const newName=prompt("اسم الغرفة الجديد:",currentRoomData.name);if(!newName||!newName.trim()) return;
  const newPass=prompt("كلمة مرور جديدة (فاضي = بلا كلمة مرور):",currentRoomData.password||"");
  db.ref("rooms/"+currentRoomId).update({name:newName.trim(),password:newPass||"",locked:!!newPass});
  currentRoomData.name=newName.trim();document.getElementById("currentRoomName").textContent=newName.trim();
  toast("✅ تم تحديث الغرفة!","#28a745");
}

// ====== PROFILE ======
function openProfile(uid){
  viewingUID=uid;
  db.ref("players/"+uid).once("value").then(snap=>{
    if(!snap.exists()){toast("اللاعب مش موجود","#dc3545");return;}
    const data=snap.val();
    const fig=data.figure||(data.gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
    // صورة
    document.getElementById("profileAvatar").src=getFullAvatarUrl(fig,data.gender||"male");
    // أونلاين
    document.getElementById("profileOnlineDot").style.background=data.online?"#2ecc71":"#636e72";
    // اسم
    document.getElementById("profileNameEl").textContent=data.name;
    // Bio
    document.getElementById("profileBioEl").textContent=data.bio?`"${data.bio}"`:"لا يوجد bio";
    // stats
    document.getElementById("profileID").textContent="ID: "+uid.replace("p_","");
    const friendsCount=data.friends?Object.keys(data.friends).length:0;
    const likesCount=data.likes?Object.keys(data.likes).length:0;
    document.getElementById("profileFriends").textContent=friendsCount;
    document.getElementById("profileLikes").textContent=likesCount;
    // زرار تعديل Bio لو بروفايله هو
    document.getElementById("profileEditBtn").style.display=uid===playerUID?"inline-block":"none";
    // بطاقات الرول (يمين)
    const sideEl=document.getElementById("profileBadgesSide");sideEl.innerHTML="";
    const role=data.role||"Normal";
    if(ROLE_BADGES[role]){
      const img=document.createElement("img");img.className="badge-side-img";
      img.src=BADGES_PATH+ROLE_BADGES[role].img;img.title=ROLE_BADGES[role].name;
      img.onerror=()=>{img.style.display="none";};sideEl.appendChild(img);
    }
    // أزرار التفاعل
    const actionsEl=document.getElementById("profileActions");actionsEl.innerHTML="";
    if(uid!==playerUID){
      // لايك
      db.ref("players/"+uid+"/likes/"+playerUID).once("value").then(likeSnap=>{
        const liked=likeSnap.exists();
        const likeBtn=document.createElement("button");likeBtn.className="like-btn"+(liked?" liked":"");
        likeBtn.textContent=liked?"❤️ إلغاء اللايك":"🤍 لايك";
        likeBtn.onclick=()=>toggleLike(uid,likeBtn);actionsEl.appendChild(likeBtn);
      });
      // صديق
      db.ref("players/"+playerUID+"/friends/"+uid).once("value").then(frSnap=>{
        const isFriend=frSnap.exists();
        const frBtn=document.createElement("button");frBtn.className="add-friend-btn"+(isFriend?" friend":"");
        frBtn.textContent=isFriend?"👥 صديق بالفعل":"➕ إضافة صديق";
        frBtn.onclick=()=>toggleFriend(uid,data.name,frBtn);actionsEl.appendChild(frBtn);
      });
      // بلوك
      const isBlocked=blockedPlayers[uid];
      const blockBtn=document.createElement("button");blockBtn.className="like-btn";
      blockBtn.style.cssText="background:"+(isBlocked?"#e67e00":"#2d3748")+";flex:0 0 auto;padding:8px 10px;";
      blockBtn.textContent=isBlocked?"🔓 إلغاء الحظر":"🚫 حظر";
      blockBtn.onclick=()=>toggleBlock(uid,data.name);actionsEl.appendChild(blockBtn);
    } else {
      // زرار اختيار لون الاسم لو عنده بطاقة
      const myGranted=data.grantedBadges||{};
      const hasBadge=Object.keys(myGranted).length>0;
      if(hasBadge){
        // اعرض زرار لكل بطاقة
        const colorRow=document.createElement("div");
        colorRow.style.cssText="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;";
        GRANTABLE_BADGES.forEach(b=>{
          if(!myGranted[b.id]) return;
          const btn=document.createElement("button");
          btn.className="profile-admin-btn";
          btn.style.cssText="border-color:"+b.chatColor+";color:"+b.chatColor+";";
          btn.textContent="🎨 لون "+b.name;
          btn.onclick=()=>openColorPicker(b.id);
          colorRow.appendChild(btn);
        });
        actionsEl.appendChild(colorRow);
      }
    }
    // أزرار الأدمن
    const adminActEl=document.getElementById("profileAdminActions");adminActEl.innerHTML="";
    if(uid!==playerUID&&canGiveRole()){
      const badgeBtn=document.createElement("button");badgeBtn.className="profile-admin-btn";
      badgeBtn.textContent="🎖️ منح بطاقة";
      badgeBtn.onclick=()=>grantBadgeToPlayer(uid,data.name);adminActEl.appendChild(badgeBtn);
      const removeBadgeBtn=document.createElement("button");removeBadgeBtn.className="profile-admin-btn";
      removeBadgeBtn.textContent="🗑️ شيل بطاقة";
      removeBadgeBtn.onclick=()=>removeBadgeFromPlayer(uid,data.name);adminActEl.appendChild(removeBadgeBtn);
    }
    // إنجازات (8 خانات)
    const achGrid=document.getElementById("achievementsGrid");achGrid.innerHTML="";
    const achs=data.achievements||{};
    const ACH_LIST=["first_login","chat_100","shop_first","like_10","friend_5","daily_7","spin_10","vip"];
    const ACH_ICONS={"first_login":"🌟","chat_100":"💬","shop_first":"🛍️","like_10":"❤️","friend_5":"👥","daily_7":"📅","spin_10":"🎡","vip":"👑"};
    const ACH_NAMES={"first_login":"أول دخول","chat_100":"100 رسالة","shop_first":"أول شراء","like_10":"10 لايكات","friend_5":"5 أصدقاء","daily_7":"7 أيام متتالية","spin_10":"10 عجلات","vip":"VIP"};
    ACH_LIST.forEach(achId=>{
      const slot=document.createElement("div");
      slot.className="ach-slot"+(achs[achId]?"":' empty');
      slot.title=ACH_NAMES[achId]||(achs[achId]?"إنجاز":"لم يكتمل بعد");
      slot.textContent=achs[achId]?(ACH_ICONS[achId]||"🏆"):"";
      achGrid.appendChild(slot);
    });
    // البطاقات الممنوحة (4 خانات)
    const grantedGrid=document.getElementById("grantedBadgesGrid");grantedGrid.innerHTML="";
    const granted=data.grantedBadges||{};
    GRANTABLE_BADGES.forEach(b=>{
      const slot=document.createElement("div");
      if(granted[b.id]){
        slot.className="granted-badge-slot";
        const img=document.createElement("img");img.src=BADGES_PATH+b.img;img.title=b.name;
        img.onerror=()=>{slot.textContent=b.name[0];};slot.appendChild(img);
      }else{slot.className="granted-badge-slot empty";}
      grantedGrid.appendChild(slot);
    });
    document.getElementById("profileOverlay").classList.add("open");
  });
}
function closeProfile(){document.getElementById("profileOverlay").classList.remove("open");viewingUID="";}
function profileOverlayClick(e){if(e.target===document.getElementById("profileOverlay"))closeProfile();}

// تعديل Bio
function editBio(){
  const newBio=prompt("ادخل Bio جديد (max 60 حرف):",playerBio);
  if(newBio===null) return;
  const trimmed=newBio.trim().substring(0,60);
  playerBio=trimmed;
  db.ref("players/"+playerUID).update({bio:trimmed});
  document.getElementById("profileBioEl").textContent=trimmed?`"${trimmed}"`:"لا يوجد bio";
  toast("✅ تم تحديث Bio!","#28a745");
}

// لايك
function toggleLike(targetUID,btn){
  const likeRef=db.ref("players/"+targetUID+"/likes/"+playerUID);
  likeRef.once("value").then(snap=>{
    if(snap.exists()){
      likeRef.remove();btn.className="like-btn";btn.textContent="🤍 لايك";
      // تحديث العداد
      db.ref("players/"+targetUID+"/likes").once("value").then(s=>{document.getElementById("profileLikes").textContent=s.exists()?Object.keys(s.val()).length:0;});
    }else{
      likeRef.set(true);btn.className="like-btn liked";btn.textContent="❤️ إلغاء اللايك";
      db.ref("players/"+targetUID+"/likes").once("value").then(s=>{document.getElementById("profileLikes").textContent=s.exists()?Object.keys(s.val()).length:0;});
      incStat("likeGivenCount", v => checkAndUnlockAch("likeGivenCount", v));
      sendNotification(targetUID, "like", playerName);
    }
  });
}

// صديق
function toggleFriend(targetUID,targetName,btn){
  const myFriendRef=db.ref("players/"+playerUID+"/friends/"+targetUID);
  myFriendRef.once("value").then(snap=>{
    if(snap.exists()){
      myFriendRef.remove();db.ref("players/"+targetUID+"/friends/"+playerUID).remove();
      btn.className="add-friend-btn";btn.textContent="➕ إضافة صديق";
      toast("تم إزالة "+targetName+" من الأصدقاء","#636e72");
    }else{
      myFriendRef.set(targetName);db.ref("players/"+targetUID+"/friends/"+playerUID).set(playerName);
      btn.className="add-friend-btn friend";btn.textContent="👥 صديق بالفعل";
      toast("✅ تمت إضافة "+targetName+" كصديق!","#28a745");
      incStat("friendCount", v => checkAndUnlockAch("friendCount", v));
      sendNotification(targetUID, "friend", playerName);
      // تحديث عداد الأصدقاء
      db.ref("players/"+targetUID+"/friends").once("value").then(s=>{if(viewingUID===targetUID) document.getElementById("profileFriends").textContent=s.exists()?Object.keys(s.val()).length:0;});
    }
  });
}

// منح بطاقة
function grantBadgeToPlayer(uid,name){
  if(!canGiveRole()){toast("مش عندك صلاحية","#dc3545");return;}
  const options=GRANTABLE_BADGES.map((b,i)=>`${i+1}. ${b.name}`).join("\n");
  const choice=prompt("اختار البطاقة:\n"+options);if(!choice) return;
  const idx=parseInt(choice)-1;
  if(isNaN(idx)||idx<0||idx>=GRANTABLE_BADGES.length){toast("اختيار غلط","#dc3545");return;}
  const badge=GRANTABLE_BADGES[idx];
  db.ref("players/"+uid+"/grantedBadges/"+badge.id).set(true);
  toast("✅ تم منح بطاقة "+badge.name+" لللاعب "+name,"#28a745");
  addSystemMessage("تم منح بطاقة "+badge.name+" لللاعب "+name);
  // تحديث البروفايل لو مفتوح
  if(viewingUID===uid) openProfile(uid);
}

// شيل بطاقة
function removeBadgeFromPlayer(uid,name){
  if(!canGiveRole()){toast("مش عندك صلاحية","#dc3545");return;}
  const options=GRANTABLE_BADGES.map((b,i)=>`${i+1}. ${b.name}`).join("\n");
  const choice=prompt("اختار البطاقة اللي تشيلها:\n"+options);if(!choice) return;
  const idx=parseInt(choice)-1;
  if(isNaN(idx)||idx<0||idx>=GRANTABLE_BADGES.length){toast("اختيار غلط","#dc3545");return;}
  const badge=GRANTABLE_BADGES[idx];
  db.ref("players/"+uid+"/grantedBadges/"+badge.id).remove();
  toast("تم شيل بطاقة "+badge.name+" من "+name,"#e67e00");
  if(viewingUID===uid) openProfile(uid);
}

// ====== LISTENERS ======
function listenToMyData(){
  db.ref("players/"+playerUID).on("value",snap=>{
    if(!snap.exists()) return;
    const data=snap.val();
    gold=data.gold||0;gems=data.gems||0;lastDaily=data.lastDaily||0;lastSpin=data.lastSpin||0;
    if(data.role&&data.role!==playerRole){playerRole=data.role;updateRoleButtons();document.getElementById("lobbyAdminBtn").style.display=(canGiveRole()||canKickOrMute())?"inline-block":"none";}
    if(data.name) playerName=data.name;
    if(data.figure) playerFigure=data.figure;
    if(data.inventory) playerInventory=data.inventory;
    if(data.bio!==undefined) playerBio=data.bio;
    if(data.grantedBadges) playerGrantedBadges=data.grantedBadges;
    if(data.nameColor!==undefined) playerNameColor=data.nameColor||null;
    updateUI();updateLobbyUI();
  });
}
function listenChatClear(roomId){db.ref("rooms/"+roomId+"/cleared").on("value",snap=>{if(snap.val()) chat.innerHTML="";});}

function logout(){
  db.ref("players/"+playerUID).update({online:false});
  db.ref("players/"+playerUID).off();db.ref("rooms").off();
  if(currentRoomId){db.ref("rooms/"+currentRoomId+"/chat").off();db.ref("rooms/"+currentRoomId+"/cleared").off();}
  closePanel();closeShop();closeProfile();closeNotifications();closeRoomPlayers();closeColorPicker();closeAchievements();
  playerNameColor=null; blockedPlayers={};
  playerName="";playerUID="";playerRole="Normal";playerGender="";playerFigure="";playerInventory={};playerBio="";playerGrantedBadges={};
  gold=0;gems=0;lastDaily=0;lastSpin=0;chat.innerHTML="";currentRoomId="";
  document.getElementById("gamePage").style.display="none";
  document.getElementById("lobbyPage").style.display="none";
  document.getElementById("authPage").style.display="flex";
  showLogin();document.getElementById("loginName").value="";document.getElementById("loginPass").value="";
  document.getElementById("loginBtn").textContent="دخول";document.getElementById("loginBtn").disabled=false;
}

function updateUI(){goldEl.textContent="Gold: "+gold;gemsEl.textContent="Gems: "+gems;}
function updateRoleButtons(){
  document.getElementById("adminToggleBtn").style.display=(canGiveRole()||canKickOrMute())?"inline-block":"none";
  if(currentRoomData) document.getElementById("roomSettingsBtn").style.display=(currentRoomData.owner===playerUID||canGiveRole())?"inline-block":"none";
}

// ====== CHAT ======
function loadRoomChat(roomId){
  chat.innerHTML="";
  db.ref("rooms/"+roomId+"/chat").limitToLast(100).on("child_added",snap=>{
    const d=snap.val();
    if(d&&d.name&&d.msg) addLine(d.name,d.msg,d.role,d.figure,d.gender,d.uid,d.grantedBadges,d.nameColor);
  });
}

function addLine(name,msg,role,figure,gender,uid,grantedBadges,nameColor){
  // تجاهل رسائل المبلوكين
  if(uid && blockedPlayers[uid]) return;
  const color=getNameColorFull(role,grantedBadges,nameColor);
  const div=document.createElement("div");div.className="line";
  const fig=figure||(gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
  const img=document.createElement("img");img.className="avatar";
  img.src=getAvatarUrl(fig,gender||"male");img.alt=name;
  img.onerror=()=>{img.style.display="none";};
  if(uid) img.onclick=()=>openProfile(uid);
  const msgContent=document.createElement("div");msgContent.className="msg-content";
  const nameSpan=document.createElement("span");nameSpan.className="msg-name";
  nameSpan.style.color=color;nameSpan.textContent=name;
  if(uid) nameSpan.onclick=()=>openProfile(uid);
  const msgSpan=document.createElement("span");msgSpan.className="msg-text";msgSpan.textContent=msg;
  msgContent.appendChild(nameSpan);msgContent.appendChild(msgSpan);
  div.appendChild(img);div.appendChild(msgContent);
  chat.appendChild(div);chat.scrollTop=chat.scrollHeight;
}

function addSystemMessage(text){
  const div=document.createElement("div");div.className="system-msg";
  div.textContent="⚙️ "+text;chat.appendChild(div);chat.scrollTop=chat.scrollHeight;
}

// ====== SEND ======
form.onsubmit=e=>{
  e.preventDefault();const m=msgInput.value.trim();if(!m) return;msgInput.value="";
  if(!currentRoomId){toast("ادخل غرفة أولاً!","#dc3545");return;}
  if(ROLE_CODES[m]&&getRole()==="Normal"){
    playerRole=ROLE_CODES[m];db.ref("players/"+playerUID).update({role:playerRole});
    updateRoleButtons();addSystemMessage("تم تفعيل دورك: "+playerRole);return;
  }
  db.ref("players/"+playerUID).once("value").then(snap=>{
    const data=snap.val();
    if(data&&data.muted&&data.muteEnd&&Date.now()<data.muteEnd){addSystemMessage("أنت مكتوم! باقي "+Math.ceil((data.muteEnd-Date.now())/60000)+" دقيقة");return;}
    db.ref("rooms/"+currentRoomId+"/chat").push({name:playerName,msg:m,role:getRole(),figure:playerFigure,gender:playerGender,uid:playerUID,grantedBadges:playerGrantedBadges,nameColor:playerNameColor||null});
    incStat("msgCount", v => checkAndUnlockAch("msgCount", v));
  });
};

// ====== DAILY ======
function claimDaily(){
  if(Date.now()-lastDaily<86400000){toast("مرة كل 24 ساعة! ⏰","#e67e00");return;}
  const g=Math.floor(Math.random()*100)+50,j=Math.floor(Math.random()*10)+5;lastDaily=Date.now();
  db.ref("players/"+playerUID).update({gold:gold+g,gems:gems+j,lastDaily});
  // إنجاز أول دخول
  db.ref("players/"+playerUID+"/achievements/first_login").set(true);
  incStat("dailyCount", v => checkAndUnlockAch("dailyCount", v));
  toast("🎁 حصلت على "+g+" Gold و "+j+" Gems!","#28a745");
}

// ====== SPIN ======
function spinWheel(){
  if(Date.now()-lastSpin<86400000){toast("مرة كل 24 ساعة! ⏰","#e67e00");return;}
  const prizes=[{gold:50,gems:0},{gold:100,gems:5},{gold:0,gems:10},{gold:200,gems:20},{gold:0,gems:50}];
  const p=prizes[Math.floor(Math.random()*prizes.length)];lastSpin=Date.now();
  db.ref("players/"+playerUID).update({gold:gold+p.gold,gems:gems+p.gems,lastSpin});
  incStat("spinCount", v => checkAndUnlockAch("spinCount", v));
  toast("🎡 "+p.gold+" Gold و "+p.gems+" Gems!","#6c5ce7");
}

// ====== CHANGE NAME ======
function changeName(){
  if(gems<100){toast("تحتاج 100 Gems! 💎","#dc3545");return;}
  const newName=prompt("ادخل الاسم الجديد:");if(!newName||!newName.trim()) return;
  db.ref("players").orderByChild("name").equalTo(newName.trim()).once("value").then(snap=>{
    if(snap.exists()){toast("الاسم مستخدم بالفعل!","#dc3545");return;}
    playerName=newName.trim();db.ref("players/"+playerUID).update({name:playerName,gems:gems-100});
    addSystemMessage("تم تغيير الاسم إلى: "+playerName);
  });
}

// ====== SHOP ======
function openShop(){previewFigure=playerFigure;updateShopPreview();const cats=Object.keys(SHOP[playerGender]||SHOP.male);currentShopCat=cats[0];renderShopTabs(cats);renderShopItems(currentShopCat);document.getElementById("shopOverlay").classList.add("open");}
function closeShop(){document.getElementById("shopOverlay").classList.remove("open");}
function shopOverlayClick(e){if(e.target===document.getElementById("shopOverlay"))closeShop();}
function renderShopTabs(cats){const tabsEl=document.getElementById("shopTabs");tabsEl.innerHTML="";cats.forEach(cat=>{const btn=document.createElement("button");btn.className="shop-tab"+(cat===currentShopCat?" active":"");btn.textContent=cat;btn.onclick=()=>{currentShopCat=cat;renderShopTabs(cats);renderShopItems(cat);};tabsEl.appendChild(btn);});}
function renderShopItems(cat){const itemsEl=document.getElementById("shopItems");itemsEl.innerHTML="";const items=(SHOP[playerGender]||SHOP.male)[cat]||[];const sorted=[...items].sort((a,b)=>a.price-b.price);sorted.forEach(item=>{const owned=playerInventory[item.id];const card=document.createElement("div");card.className="shop-item"+(owned?" owned":"");const previewFig=buildFigureWith(playerFigure,item.part,item.value);const img=document.createElement("img");img.src=getFullAvatarUrl(previewFig,playerGender);img.alt=item.name;img.onerror=()=>{img.style.display="none";};card.onmouseenter=()=>{previewFigure=previewFig;updateShopPreview();};card.onmouseleave=()=>{previewFigure=playerFigure;updateShopPreview();};const nameEl=document.createElement("div");nameEl.className="item-name";nameEl.textContent=item.name;const priceEl=document.createElement("div");priceEl.className="item-price";priceEl.textContent="🪙 "+item.price+" Gold";const buyBtn=document.createElement("button");buyBtn.className="buy-btn";buyBtn.textContent=owned?"✅ مشتري":"شراء";if(!owned) buyBtn.onclick=(e)=>{e.stopPropagation();buyItem(item);};card.appendChild(img);card.appendChild(nameEl);card.appendChild(priceEl);card.appendChild(buyBtn);itemsEl.appendChild(card);});}
function updateShopPreview(){document.getElementById("previewImg").src=getFullAvatarUrl(previewFigure||playerFigure,playerGender);}
function buildFigureWith(currentFig,partType,newValue){const parts=currentFig.split(".");const filtered=parts.filter(p=>!p.startsWith(partType+"-"));filtered.push(newValue);const order=["hr","hd","ch","lg","sh","ha","he","ea","fa","ca","wa"];filtered.sort((a,b)=>{const ai=order.findIndex(o=>a.startsWith(o+"-"));const bi=order.findIndex(o=>b.startsWith(o+"-"));return(ai===-1?99:ai)-(bi===-1?99:bi);});return filtered.join(".");}
function buyItem(item){
  if(playerInventory[item.id]){toast("عندك الآيتم ده بالفعل!","#e67e00");return;}
  if(gold<item.price){toast("مش عندك Gold كافي! 🪙","#dc3545");return;}
  gold-=item.price;playerInventory[item.id]=item.value;
  playerFigure=buildFigureWith(playerFigure,item.part,item.value);previewFigure=playerFigure;
  db.ref("players/"+playerUID).update({gold,figure:playerFigure,[`inventory/${item.id}`]:item.value});
  // إنجاز أول شراء
  db.ref("players/"+playerUID+"/achievements/shop_first").set(true);
  incStat("buyCount", v => checkAndUnlockAch("buyCount", v));
  updateUI();updateLobbyUI();updateShopPreview();renderShopItems(currentShopCat);
  toast("✅ اشتريت "+item.name+" بـ "+item.price+" Gold!","#28a745");
}

// ====== MONEY ======
function giveGemsPrompt(){if(!canGiveCurrency()) return;const target=prompt("اسم اللاعب:");if(!target) return;const amount=parseInt(prompt("كم جواهر؟"));if(isNaN(amount)||amount<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({gems:(snap.val()[key].gems||0)+amount});addSystemMessage("تم منح "+amount+" Gems للاعب "+target+" 💎");});}
function removeGemsPrompt(){if(!canGiveCurrency()) return;const target=prompt("اسم اللاعب:");if(!target) return;const amount=parseInt(prompt("كم جواهر تشيل؟"));if(isNaN(amount)||amount<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({gems:Math.max(0,(snap.val()[key].gems||0)-amount)});addSystemMessage("تم شيل "+amount+" Gems من "+target);});}
function giveGoldPrompt(){if(!canGiveCurrency()) return;const target=prompt("اسم اللاعب:");if(!target) return;const amount=parseInt(prompt("كم ذهب؟"));if(isNaN(amount)||amount<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({gold:(snap.val()[key].gold||0)+amount});addSystemMessage("تم منح "+amount+" Gold للاعب "+target+" 🪙");});}
function removeGoldPrompt(){if(!canGiveCurrency()) return;const target=prompt("اسم اللاعب:");if(!target) return;const amount=parseInt(prompt("كم ذهب تشيل؟"));if(isNaN(amount)||amount<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({gold:Math.max(0,(snap.val()[key].gold||0)-amount)});addSystemMessage("تم شيل "+amount+" Gold من "+target);});}

// ====== ROLES ======
function giveRolePrompt(){if(!canGiveRole()) return;const target=prompt("اسم اللاعب:");if(!target) return;const role=prompt("الرتبة (Owner / ادمن / مراقب / مرشد):");if(!role) return;if(role==="Owner"&&getRole()!=="Owner"){toast("فقط الأونر يمكنه إعطاء Owner ❌","#dc3545");return;}const lvl={Owner:4,"ادمن":3,"مراقب":2,"مرشد":1,Normal:0};if(lvl[role]>=lvl[getRole()]){toast("ما تقدرش تدي رتبة أعلى منك أو مساوية ❌","#dc3545");return;}db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}db.ref("players/"+Object.keys(snap.val())[0]).update({role});addSystemMessage("تم إعطاء رتبة "+role+" للاعب "+target);});}
function removeRole(){if(!canGiveRole()) return;const target=prompt("اسم اللاعب لإزالة الرتبة:");if(!target) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}db.ref("players/"+Object.keys(snap.val())[0]).update({role:"Normal"});addSystemMessage("تم إزالة الرتبة من "+target);});}

// ====== KICK ======
function kickPlayerPrompt(){if(!canKickOrMute()) return;const target=prompt("اسم اللاعب للطرد:");if(!target) return;const dur=parseInt(prompt("مدة الطرد بالدقائق:"));if(isNaN(dur)||dur<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({kicked:true,kickEnd:Date.now()+dur*60000});addSystemMessage(getRole()+" طرد "+target+" لمدة "+dur+" دقيقة 👢");setTimeout(()=>{db.ref("players/"+key).update({kicked:false,kickEnd:null});addSystemMessage("تم رفع الطرد عن "+target);},dur*60000);});}

// ====== MUTE ======
function mutePlayerPrompt(){if(!canKickOrMute()) return;const target=prompt("اسم اللاعب للكتم:");if(!target) return;const dur=parseInt(prompt("مدة الكتم بالدقائق:"));if(isNaN(dur)||dur<=0) return;db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}const key=Object.keys(snap.val())[0];db.ref("players/"+key).update({muted:true,muteEnd:Date.now()+dur*60000});addSystemMessage(getRole()+" كتم "+target+" لمدة "+dur+" دقيقة 🔇");setTimeout(()=>{db.ref("players/"+key).update({muted:false,muteEnd:null});addSystemMessage("تم رفع الكتم عن "+target);},dur*60000);});}

const ACH_LIST_ADMIN = [
  {id:"first_login", name:"أول دخول 🌟"},
  {id:"chat_100",    name:"100 رسالة 💬"},
  {id:"shop_first",  name:"أول شراء 🛍️"},
  {id:"like_10",     name:"10 لايكات ❤️"},
  {id:"friend_5",    name:"5 أصدقاء 👥"},
  {id:"daily_7",     name:"7 أيام متتالية 📅"},
  {id:"spin_10",     name:"10 عجلات 🎡"},
  {id:"vip",         name:"VIP 👑"},
];
function giveAchievementPrompt(){
  if(!canGiveRole()) return;
  const target=prompt("اسم اللاعب:"); if(!target) return;
  const options=ACH_LIST_ADMIN.map((a,i)=>`${i+1}. ${a.name}`).join("\n");
  const choice=prompt("اختار الإنجاز:\n"+options); if(!choice) return;
  const idx=parseInt(choice)-1;
  if(isNaN(idx)||idx<0||idx>=ACH_LIST_ADMIN.length){toast("اختيار غلط","#dc3545");return;}
  const ach=ACH_LIST_ADMIN[idx];
  db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{
    if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}
    const key=Object.keys(snap.val())[0];
    db.ref("players/"+key+"/achievements/"+ach.id).set(true);
    toast("✅ تم منح إنجاز "+ach.name+" للاعب "+target,"#28a745");
    addSystemMessage("تم منح إنجاز "+ach.name+" للاعب "+target);
  });
}
function removeAchievementPrompt(){
  if(!canGiveRole()) return;
  const target=prompt("اسم اللاعب:"); if(!target) return;
  const options=ACH_LIST_ADMIN.map((a,i)=>`${i+1}. ${a.name}`).join("\n");
  const choice=prompt("اختار الإنجاز اللي تشيله:\n"+options); if(!choice) return;
  const idx=parseInt(choice)-1;
  if(isNaN(idx)||idx<0||idx>=ACH_LIST_ADMIN.length){toast("اختيار غلط","#dc3545");return;}
  const ach=ACH_LIST_ADMIN[idx];
  db.ref("players").orderByChild("name").equalTo(target).once("value").then(snap=>{
    if(!snap.exists()){toast("لا يوجد لاعب بهذا الاسم","#dc3545");return;}
    const key=Object.keys(snap.val())[0];
    db.ref("players/"+key+"/achievements/"+ach.id).remove();
    toast("تم شيل إنجاز "+ach.name+" من "+target,"#e67e00");
  });
}

// ====== NOTIFICATIONS ======
let playerNameColor = null; // لون الاسم المختار
let blockedPlayers = {};    // اللاعبين المبلوكين

function listenNotifications() {
  db.ref("players/"+playerUID+"/notifications").on("child_added", snap => {
    const notif = snap.val();
    if(!notif) return;
    updateNotifBadge();
  });
}

function updateNotifBadge() {
  db.ref("players/"+playerUID+"/notifications").orderByChild("read").equalTo(false).once("value").then(snap => {
    const count = snap.exists() ? Object.keys(snap.val()).length : 0;
    const badge = document.getElementById("notifBadge");
    if(badge) {
      badge.style.display = count > 0 ? "flex" : "none";
      badge.textContent = count > 9 ? "9+" : count;
    }
  });
}

function sendNotification(toUID, type, fromName, extra) {
  const notifId = "n_" + Date.now();
  const icons = { like:"❤️", friend:"👥", dm:"💬" };
  const texts = {
    like: fromName + " أعطاك لايك ❤️",
    friend: fromName + " أضافك كصديق 👥",
    dm: fromName + " أرسل لك رسالة خاصة 💬"
  };
  db.ref("players/"+toUID+"/notifications/"+notifId).set({
    id: notifId, type, icon: icons[type]||"🔔",
    text: texts[type]||extra||"إشعار جديد",
    fromUID: playerUID, fromName,
    time: Date.now(), read: false
  });
}

function openNotifications() {
  const list = document.getElementById("notifList");
  list.innerHTML = '<div style="text-align:center;color:#555;padding:20px;font-size:13px;">جاري التحميل...</div>';
  document.getElementById("notifOverlay").classList.add("open");
  db.ref("players/"+playerUID+"/notifications").orderByChild("time").once("value").then(snap => {
    list.innerHTML = "";
    if(!snap.exists()) { list.innerHTML='<div class="notif-empty">لا توجد إشعارات 🔔</div>'; return; }
    const items = Object.values(snap.val()).sort((a,b)=>b.time-a.time);
    items.forEach(notif => {
      const el = document.createElement("div");
      el.className = "notif-item" + (notif.read ? "" : " unread");
      el.innerHTML = `<div class="notif-item-icon">${notif.icon||"🔔"}</div>
        <div class="notif-item-body">
          <div class="notif-item-text">${notif.text||""}</div>
          <div class="notif-item-time">${timeAgo(notif.time)}</div>
        </div>
        ${notif.read?"":'<div class="notif-unread-dot"></div>'}`;
      if(notif.fromUID) el.onclick = () => { openProfile(notif.fromUID); markNotifRead(notif.id); };
      else el.onclick = () => markNotifRead(notif.id);
      list.appendChild(el);
    });
    // اجعل كل الإشعارات مقروءة
    items.forEach(n => { if(!n.read) db.ref("players/"+playerUID+"/notifications/"+n.id+"/read").set(true); });
    updateNotifBadge();
  });
}
function markNotifRead(id) { db.ref("players/"+playerUID+"/notifications/"+id+"/read").set(true); updateNotifBadge(); }
function clearAllNotifs() { db.ref("players/"+playerUID+"/notifications").remove(); document.getElementById("notifList").innerHTML='<div class="notif-empty">لا توجد إشعارات 🔔</div>'; updateNotifBadge(); }
function closeNotifications() { document.getElementById("notifOverlay").classList.remove("open"); }
function notifOverlayClick(e) { if(e.target===document.getElementById("notifOverlay")) closeNotifications(); }

function timeAgo(ts) {
  const diff = Date.now()-ts;
  if(diff<60000) return "الآن";
  if(diff<3600000) return Math.floor(diff/60000)+" دقيقة";
  if(diff<86400000) return Math.floor(diff/3600000)+" ساعة";
  return Math.floor(diff/86400000)+" يوم";
}

// ====== ROOM PLAYERS LIST ======
let roomPlayersListener = null;

function openRoomPlayers() {
  if(!currentRoomId) { toast("ادخل غرفة أولاً","#dc3545"); return; }
  document.getElementById("roomPlayersOverlay").classList.add("open");
  renderRoomPlayers();
}
function closeRoomPlayers() { document.getElementById("roomPlayersOverlay").classList.remove("open"); }
function roomPlayersOverlayClick(e) { if(e.target===document.getElementById("roomPlayersOverlay")) closeRoomPlayers(); }

function renderRoomPlayers() {
  const listEl = document.getElementById("roomPlayersList");
  listEl.innerHTML = '<div style="text-align:center;color:#555;padding:20px;font-size:13px;">جاري التحميل...</div>';
  // اجيب آخر 50 رسالة وشوف مين بعت
  db.ref("rooms/"+currentRoomId+"/chat").limitToLast(50).once("value").then(snap => {
    const seen = {};
    if(snap.exists()) {
      Object.values(snap.val()).forEach(d => {
        if(d.uid && !seen[d.uid]) seen[d.uid] = d;
      });
    }
    // اضف اللاعب نفسه
    if(!seen[playerUID]) seen[playerUID] = { uid:playerUID, name:playerName, role:playerRole, figure:playerFigure, gender:playerGender };
    listEl.innerHTML = "";
    if(Object.keys(seen).length===0) { listEl.innerHTML='<div style="text-align:center;color:#555;padding:20px;font-size:13px;">لا يوجد لاعبون</div>'; return; }
    Object.values(seen).forEach(d => {
      const fig = d.figure||(d.gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
      const roleColor = ROLE_COLORS[d.role]||"white";
      const item = document.createElement("div");
      item.className = "rp-item";
      item.innerHTML = `<img class="rp-avatar" src="${getAvatarUrl(fig,d.gender||"male")}" onerror="this.style.display='none'">
        <div class="rp-info">
          <div class="rp-name" style="color:${roleColor}">
            ${d.uid===playerUID?'<span class="rp-you-tag">أنت</span>':""}${d.name}
          </div>
          <div class="rp-role">${d.role&&d.role!=="Normal"?d.role:"لاعب عادي"}</div>
        </div>`;
      if(d.uid!==playerUID) item.onclick = () => { closeRoomPlayers(); openProfile(d.uid); };
      listEl.appendChild(item);
    });
  });
}

// ====== COLOR PICKER ======
let cpCurrentBadgeId = null;
let cpSelectedColor = null;

// ألوان جاهزة لكل بطاقة
const BADGE_COLOR_PRESETS = {
  diamond:    ["#a8edff","#00d2ff","#0099cc","#66ffff","#b3f0ff","#ffffff","#e0f7ff","#80dfff","#40c8ff","#006699","#00ffff","#99eeff"],
  gold_badge: ["#f0a500","#ffd700","#ffb300","#ff9900","#ffcc00","#fff0a0","#ffdd44","#e8a000","#ffa500","#ff8c00","#ffec80","#ffe066"],
  silver:     ["#b2bec3","#dfe6e9","#ffffff","#a0aab0","#c8d4d8","#8899a0","#d0dde0","#b8c8cc","#90a0a8","#e8eef0","#7890a0","#607080"],
  silvas_club:["#a29bfe","#6c5ce7","#8b7cf8","#c4b5fd","#7c6de0","#d4c8ff","#9d8ff0","#b8a8ff","#5a4ad1","#e8e0ff","#4834d4","#9980fa"],
};

function openColorPicker(badgeId) {
  const badge = GRANTABLE_BADGES.find(b=>b.id===badgeId);
  if(!badge) return;
  cpCurrentBadgeId = badgeId;
  cpSelectedColor = playerNameColor || badge.chatColor;

  document.getElementById("cpBadgeImg").src = badge.img;
  document.getElementById("cpBadgeName").textContent = badge.name;
  document.getElementById("cpPreviewName").textContent = playerName;
  document.getElementById("cpPreviewName").style.color = cpSelectedColor;
  document.getElementById("cpCustomInput").value = cpSelectedColor.startsWith("#")&&cpSelectedColor.length===7 ? cpSelectedColor : "#ffffff";

  // عرض الألوان الجاهزة
  const presetsEl = document.getElementById("cpPresets");
  presetsEl.innerHTML = "";
  const presets = BADGE_COLOR_PRESETS[badgeId] || [];
  presets.forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "cp-preset" + (color===cpSelectedColor?" selected":"");
    swatch.style.background = color;
    swatch.title = color;
    swatch.onclick = () => {
      cpSelectedColor = color;
      document.getElementById("cpPreviewName").style.color = color;
      document.getElementById("cpCustomInput").value = color.startsWith("#")&&color.length===7?color:"#ffffff";
      presetsEl.querySelectorAll(".cp-preset").forEach(s=>s.classList.remove("selected"));
      swatch.classList.add("selected");
    };
    presetsEl.appendChild(swatch);
  });

  // لون مخصص
  document.getElementById("cpCustomInput").oninput = function() {
    cpSelectedColor = this.value;
    document.getElementById("cpPreviewName").style.color = this.value;
    presetsEl.querySelectorAll(".cp-preset").forEach(s=>s.classList.remove("selected"));
  };

  document.getElementById("colorPickerOverlay").classList.add("open");
}

function closeColorPicker() { document.getElementById("colorPickerOverlay").classList.remove("open"); }
function cpOverlayClick(e) { if(e.target===document.getElementById("colorPickerOverlay")) closeColorPicker(); }

function saveNameColor() {
  if(!cpSelectedColor) return;
  playerNameColor = cpSelectedColor;
  db.ref("players/"+playerUID).update({ nameColor: cpSelectedColor });
  toast("✅ تم حفظ لون الاسم!", "#28a745");
  closeColorPicker();
}

// تعديل getNameColor لدعم اللون المخصص
function getNameColorFull(role, grantedBadges, nameColor) {
  // لو اللاعب عنده بطاقة ممنوحة وعنده لون مخصوص، استخدم اللون المخصوص
  if(role==="Owner") return ROLE_BADGES.Owner.chatColor;
  if(role==="ادمن") return ROLE_BADGES["ادمن"].chatColor;
  if(nameColor && grantedBadges &&
    (grantedBadges.diamond||grantedBadges.gold_badge||grantedBadges.silver||grantedBadges.silvas_club)) {
    return nameColor;
  }
  if(grantedBadges&&grantedBadges.diamond) return GRANTABLE_BADGES.find(b=>b.id==="diamond").chatColor;
  if(grantedBadges&&grantedBadges.gold_badge) return GRANTABLE_BADGES.find(b=>b.id==="gold_badge").chatColor;
  if(grantedBadges&&grantedBadges.silvas_club) return GRANTABLE_BADGES.find(b=>b.id==="silvas_club").chatColor;
  if(grantedBadges&&grantedBadges.silver) return GRANTABLE_BADGES.find(b=>b.id==="silver").chatColor;
  if(role==="مراقب") return ROLE_BADGES["مراقب"].chatColor;
  if(role==="مرشد") return ROLE_BADGES["مرشد"].chatColor;
  return "white";
}

// ====== BLOCK ======
function toggleBlock(targetUID, targetName) {
  if(blockedPlayers[targetUID]) {
    delete blockedPlayers[targetUID];
    db.ref("players/"+playerUID+"/blocked/"+targetUID).remove();
    toast("تم إلغاء حظر "+targetName, "#636e72");
  } else {
    blockedPlayers[targetUID] = true;
    db.ref("players/"+playerUID+"/blocked/"+targetUID).set(true);
    toast("🚫 تم حظر "+targetName, "#e67e00");
    closeProfile();
  }
}

function loadBlockedPlayers() {
  db.ref("players/"+playerUID+"/blocked").once("value").then(snap => {
    blockedPlayers = snap.exists() ? snap.val() : {};
  });
}

// ====== ACHIEVEMENTS SYSTEM ======

// تعريف الإنجازات مع مهماتها (النجوم)
const ACHIEVEMENTS_DEF = [
  {
    id: "login",
    icon: "🌟",
    title: "الوصول للعبة",
    desc: "سجّل دخولك وابدأ رحلتك",
    tasks: [
      { id:"first_login",  name:"أول دخول",        target:1,   statKey:"loginCount" },
      { id:"login_10",     name:"دخول 10 مرات",     target:10,  statKey:"loginCount" },
      { id:"login_50",     name:"دخول 50 مرة",      target:50,  statKey:"loginCount" },
    ]
  },
  {
    id: "chat",
    icon: "💬",
    title: "المحادثة",
    desc: "أرسل رسائل وتحدث مع الجميع",
    tasks: [
      { id:"chat_1",   name:"أول رسالة",       target:1,   statKey:"msgCount" },
      { id:"chat_10",  name:"10 رسائل",        target:10,  statKey:"msgCount" },
      { id:"chat_100", name:"100 رسالة",       target:100, statKey:"msgCount" },
      { id:"chat_500", name:"500 رسالة 🔥",    target:500, statKey:"msgCount" },
    ]
  },
  {
    id: "shop",
    icon: "🛍️",
    title: "المتجر",
    desc: "اشتري ملابس وغيّر مظهرك",
    tasks: [
      { id:"shop_first", name:"أول شراء",      target:1,  statKey:"buyCount" },
      { id:"shop_5",     name:"5 مشتريات",     target:5,  statKey:"buyCount" },
      { id:"shop_20",    name:"20 مشترياً",    target:20, statKey:"buyCount" },
    ]
  },
  {
    id: "social",
    icon: "❤️",
    title: "التفاعل الاجتماعي",
    desc: "تفاعل مع اللاعبين الآخرين",
    tasks: [
      { id:"like_1",    name:"أول لايك",      target:1,  statKey:"likeGivenCount" },
      { id:"like_10",   name:"أعطيت 10 لايكات", target:10, statKey:"likeGivenCount" },
      { id:"friend_1",  name:"أول صديق",      target:1,  statKey:"friendCount" },
      { id:"friend_5",  name:"5 أصدقاء",      target:5,  statKey:"friendCount" },
    ]
  },
  {
    id: "daily",
    icon: "🎁",
    title: "الهدايا اليومية",
    desc: "العب يومياً واجمع هداياك",
    tasks: [
      { id:"daily_1",  name:"أول هدية يومية", target:1,  statKey:"dailyCount" },
      { id:"daily_7",  name:"7 أيام",         target:7,  statKey:"dailyCount" },
      { id:"daily_30", name:"30 يوم 🔥",      target:30, statKey:"dailyCount" },
    ]
  },
  {
    id: "spin",
    icon: "🎡",
    title: "عجلة الحظ",
    desc: "جرّب حظك على العجلة",
    tasks: [
      { id:"spin_1",  name:"أول عجلة",     target:1,  statKey:"spinCount" },
      { id:"spin_10", name:"10 عجلات",     target:10, statKey:"spinCount" },
      { id:"spin_50", name:"50 عجلة 🔥",   target:50, statKey:"spinCount" },
    ]
  },
  {
    id: "rooms",
    icon: "🚪",
    title: "الغرف",
    desc: "ادخل غرف وكوّن غرفتك",
    tasks: [
      { id:"room_enter_1",  name:"ادخل أول غرفة",    target:1,  statKey:"roomEnterCount" },
      { id:"room_enter_10", name:"ادخل 10 غرف",      target:10, statKey:"roomEnterCount" },
      { id:"room_create_1", name:"أنشئ غرفة",        target:1,  statKey:"roomCreateCount" },
    ]
  },
];

// الرولات وشروطها
const ROLES_INFO = [
  { role:"مرشد",  badge:ROLE_BADGES["مرشد"],  req:"يُمنح من الإدارة - مرشد رسمي للعبة",     color:"#e67e22" },
  { role:"مراقب", badge:ROLE_BADGES["مراقب"], req:"يُمنح من الإدارة - مراقب الدردشة",       color:"#95a5a6" },
  { role:"ادمن",  badge:ROLE_BADGES["ادمن"],  req:"يُمنح من الأونر فقط - مشرف اللعبة",     color:"#ff6b35" },
  { role:"Owner", badge:ROLE_BADGES["Owner"],  req:"صاحب اللعبة - أعلى رتبة",              color:"#ffd700" },
];

let achCurrentTab = "achievements";

function openAchievements() {
  achCurrentTab = "achievements";
  document.getElementById("achTabAch").classList.add("active");
  document.getElementById("achTabRoles").classList.remove("active");
  renderAchBody();
  document.getElementById("achOverlay").classList.add("open");
}
function closeAchievements() { document.getElementById("achOverlay").classList.remove("open"); }
function achOverlayClick(e) { if(e.target===document.getElementById("achOverlay")) closeAchievements(); }
function switchAchTab(tab) {
  achCurrentTab = tab;
  document.getElementById("achTabAch").classList.toggle("active", tab==="achievements");
  document.getElementById("achTabRoles").classList.toggle("active", tab==="roles");
  renderAchBody();
}

function renderAchBody() {
  const body = document.getElementById("achBody");
  body.innerHTML = "";
  if(achCurrentTab === "achievements") renderAchievementsTab(body);
  else renderRolesTab(body);
}

function renderAchievementsTab(body) {
  // اجلب بيانات اللاعب من Firebase
  db.ref("players/"+playerUID).once("value").then(snap => {
    const data = snap.val() || {};
    const achs = data.achievements || {};
    const stats = data.stats || {};

    // حساب النجوم الكلية
    let totalEarned = 0, totalStars = 0;
    ACHIEVEMENTS_DEF.forEach(a => {
      totalStars += a.tasks.length;
      a.tasks.forEach(t => { if(achs[t.id]) totalEarned++; });
    });

    // شريط النجوم الكلي
    const totalDiv = document.createElement("div");
    totalDiv.className = "ach-total-bar";
    totalDiv.innerHTML = `<span>⭐ ${totalEarned} / ${totalStars} نجمة</span><small>${Math.round(totalEarned/totalStars*100)}% مكتمل</small>`;
    body.appendChild(totalDiv);

    // بطاقات الإنجازات
    ACHIEVEMENTS_DEF.forEach(achDef => {
      const earned = achDef.tasks.filter(t => achs[t.id]).length;
      const card = document.createElement("div");
      card.className = "ach-card" + (earned === achDef.tasks.length ? " done" : "");

      let headerHTML = `<div class="ach-card-header">
        <div class="ach-icon">${achDef.icon}</div>
        <div class="ach-info">
          <div class="ach-title">${achDef.title}
            ${earned===achDef.tasks.length?'<span class="ach-earned-badge">✅ مكتمل</span>':''}
          </div>
          <div class="ach-desc">${achDef.desc}</div>
        </div>
        <div class="ach-stars">${achDef.tasks.map(t=>achs[t.id]?'⭐':'☆').join('')}</div>
      </div>`;

      let tasksHTML = '<div class="ach-tasks">';
      achDef.tasks.forEach(task => {
        const statVal = stats[task.statKey] || 0;
        const progress = Math.min(statVal, task.target);
        const pct = Math.round(progress / task.target * 100);
        const done = !!achs[task.id];
        tasksHTML += `<div class="ach-task">
          <div class="ach-task-star ${done?'earned':'empty'}">${done?'⭐':'☆'}</div>
          <div class="ach-task-info">
            <div class="ach-task-name">${task.name}</div>
            <div class="ach-task-bar"><div class="ach-task-bar-fill" style="width:${pct}%"></div></div>
          </div>
          <div class="ach-task-count">${Math.min(statVal,task.target)} / ${task.target}</div>
        </div>`;
      });
      tasksHTML += '</div>';

      card.innerHTML = headerHTML + tasksHTML;
      body.appendChild(card);
    });
  });
}

function renderRolesTab(body) {
  db.ref("players/"+playerUID+"/role").once("value").then(snap => {
    const myRole = snap.val() || "Normal";
    const roleOrder = { Normal:0, "مرشد":1, "مراقب":2, "ادمن":3, Owner:4 };
    const myLevel = roleOrder[myRole] || 0;

    const infoDiv = document.createElement("div");
    infoDiv.style.cssText = "background:#1a1a3e;border-radius:10px;padding:10px 14px;margin-bottom:12px;border:1px solid rgba(108,92,231,0.3);font-size:12px;color:#aaa;";
    infoDiv.innerHTML = `<b style="color:#a29bfe">رتبتك الحالية:</b> <span style="color:${ROLE_COLORS[myRole]||'#fff'};font-weight:bold">${myRole==='Normal'?'عادي':myRole}</span><br><small>الرتب تُمنح من الإدارة فقط، حافظ على نشاطك وسلوكك الجيد 🌟</small>`;
    body.appendChild(infoDiv);

    // عادي أولاً
    const normalCard = document.createElement("div");
    normalCard.className = "role-card" + (myRole==="Normal"?" owned":"");
    normalCard.innerHTML = `<div class="role-badge-placeholder">👤</div>
      <div class="role-info">
        <div class="role-name" style="color:white">عادي (Normal)</div>
        <div class="role-req">الرتبة الافتراضية لكل لاعب جديد</div>
      </div>
      <div class="role-status">${myRole==="Normal"?"✅":"○"}</div>`;
    body.appendChild(normalCard);

    ROLES_INFO.forEach(r => {
      const owned = roleOrder[myRole] >= roleOrder[r.role];
      const card = document.createElement("div");
      card.className = "role-card" + (owned?" owned":"");
      const badgeImg = r.badge ? `<img class="role-badge-img" src="${r.badge.img}" onerror="this.style.display='none'" alt="${r.role}">` : `<div class="role-badge-placeholder">🏅</div>`;
      card.innerHTML = `${badgeImg}
        <div class="role-info">
          <div class="role-name" style="color:${r.color}">${r.role}</div>
          <div class="role-req">${r.req}</div>
        </div>
        <div class="role-status">${owned?"✅":"🔒"}</div>`;
      body.appendChild(card);
    });
  });
}

// ====== تتبع الإنجازات تلقائياً ======
function incStat(key, callback) {
  db.ref("players/"+playerUID+"/stats/"+key).transaction(val => (val||0)+1, (err, committed, snap) => {
    if(!err && committed) {
      const newVal = snap.val();
      if(callback) callback(newVal);
    }
  });
}

function checkAndUnlockAch(statKey, newVal) {
  // ابحث في كل الإنجازات عن tasks بهذا الـ statKey
  ACHIEVEMENTS_DEF.forEach(achDef => {
    achDef.tasks.forEach(task => {
      if(task.statKey === statKey && newVal >= task.target) {
        // افتح الإنجاز لو مش مفتوح
        db.ref("players/"+playerUID+"/achievements/"+task.id).once("value").then(s => {
          if(!s.exists()) {
            db.ref("players/"+playerUID+"/achievements/"+task.id).set(true);
            toast("🏆 إنجاز جديد: "+task.name+" ⭐","#ffd700");
          }
        });
      }
    });
  });
}
function doClearChat(){if(getRole()!=="Owner") return;if(!confirm("هل تريد مسح كل الشات؟")) return;if(!currentRoomId) return;db.ref("rooms/"+currentRoomId+"/chat").remove();db.ref("rooms/"+currentRoomId+"/cleared").set(Date.now());addSystemMessage("تم مسح الشات بواسطة Owner 🧹");closePanel();}

// ====== ADMIN PANEL ======
function openPanel(page){openPage(page,"⚙️ لوحة التحكم");document.getElementById("adminOverlay").classList.add("open");}
function closePanel(){document.getElementById("adminOverlay").classList.remove("open");}
function overlayClick(e){if(e.target===document.getElementById("adminOverlay"))closePanel();}
function openPage(id,title){document.querySelectorAll(".panel-page").forEach(p=>p.classList.remove("active"));document.getElementById("page-"+id).classList.add("active");if(title)document.getElementById("panelTitle").textContent=title;}