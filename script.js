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
let typingTimeout = null;
let lastMsgTime = 0;
let playerCustomAvatar = null;

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
  loadRoomChat(roomId);listenChatClear(roomId);listenTyping(roomId);addSystemMessage("دخلت غرفة: "+roomData.name);
  incStat("roomEnterCount", v => checkAndUnlockAch("roomEnterCount", v));
}
function goToLobby(){
  stopTyping();
  db.ref("rooms/"+currentRoomId+"/typing").off();
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
    document.getElementById("profileAvatar").src = data.customAvatar || getFullAvatarUrl(fig,data.gender||"male");
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
      // اختيار لون الاسم من البطاقات الموجودة
      const myGranted = data.grantedBadges || {};
      const myBadges = GRANTABLE_BADGES.filter(b => myGranted[b.id]);
      if(myBadges.length > 0) {
        const colorRow = document.createElement("div");
        colorRow.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;";

        // زرار " لون خاص"
        const resetBtn = document.createElement("button");
        resetBtn.className = "profile-admin-btn";
        resetBtn.style.cssText = "border-color:#555;color:#aaa;";
        resetBtn.textContent = "⬜ بدون لون";
        resetBtn.onclick = () => {
          playerNameColor = null;
          db.ref("players/"+playerUID).update({ nameColor: null });
          toast("تم إزالة اللون المخصص", "#636e72");
          // تحديث الأزرار
          colorRow.querySelectorAll("button").forEach(b => b.style.fontWeight = "normal");
          resetBtn.style.fontWeight = "bold";
        };
        if(!playerNameColor) resetBtn.style.fontWeight = "bold";
        colorRow.appendChild(resetBtn);

        // زرار لكل بطاقة
        myBadges.forEach(badge => {
          const btn = document.createElement("button");
          btn.className = "profile-admin-btn";
          btn.style.cssText = `border-color:${badge.chatColor};color:${badge.chatColor};font-weight:${playerNameColor===badge.chatColor?"bold":"normal"};`;
          btn.innerHTML = `<img src="${badge.img}" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;margin-left:4px;" onerror="this.style.display='none'"> ${badge.name}`;
          btn.onclick = () => {
            playerNameColor = badge.chatColor;
            db.ref("players/"+playerUID).update({ nameColor: badge.chatColor });
            toast(`✅ هتكتب بلون ${badge.name}`, "#28a745");
            colorRow.querySelectorAll("button").forEach(b => b.style.fontWeight = "normal");
            btn.style.fontWeight = "bold";
          };
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

// IMGBB key للشات والألبوم
const IMGBB_KEY = "6ed0a5a9d1c53ed850ce30b14b719b65";

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
    if(data.customAvatar!==undefined) playerCustomAvatar=data.customAvatar||null;
    updateUI();updateLobbyUI();
  });
}
function listenChatClear(roomId){db.ref("rooms/"+roomId+"/cleared").on("value",snap=>{if(snap.val()) chat.innerHTML="";});}

function logout(){
  db.ref("players/"+playerUID).update({online:false});
  db.ref("players/"+playerUID).off();db.ref("rooms").off();
  if(currentRoomId){db.ref("rooms/"+currentRoomId+"/chat").off();db.ref("rooms/"+currentRoomId+"/cleared").off();}
  closePanel();closeShop();closeProfile();closeNotifications();closeRoomPlayers();closeAchievements();
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
    if(d&&d.name&&(d.msg||d.imgUrl)) addLine(d.name,d.msg,d.role,d.figure,d.gender,d.uid,d.grantedBadges,d.nameColor,d.customAvatar,d.imgUrl);
  });
}

function addLine(name,msg,role,figure,gender,uid,grantedBadges,nameColor,customAvatar,imgUrl){
  // تجاهل رسائل المبلوكين
  if(uid && blockedPlayers[uid]) return;
  const color=getNameColorFull(role,grantedBadges,nameColor);
  const div=document.createElement("div");div.className="line";
  const fig=figure||(gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
  const img=document.createElement("img");img.className="avatar";
  img.src = customAvatar || getAvatarUrl(fig,gender||"male"); img.alt=name;
  img.onerror=()=>{img.style.display="none";};
  if(uid) img.onclick=()=>openProfile(uid);
  const msgContent=document.createElement("div");msgContent.className="msg-content";
  const nameSpan=document.createElement("span");nameSpan.className="msg-name";
  nameSpan.style.color=color;nameSpan.textContent=name;
  if(uid) nameSpan.onclick=()=>openProfile(uid);
  msgContent.appendChild(nameSpan);
  if(imgUrl) {
    // رسالة صورة - بتفتح lightbox مش موقع خارجي
    const chatImg=document.createElement("img");
    chatImg.className="chat-img";
    chatImg.src=imgUrl;
    chatImg.onclick=()=>openImgLightbox(imgUrl);
    msgContent.appendChild(chatImg);
  } else {
    const msgSpan=document.createElement("span");msgSpan.className="msg-text";msgSpan.textContent=msg;
    msgContent.appendChild(msgSpan);
  }
  div.appendChild(img);div.appendChild(msgContent);
  chat.appendChild(div);chat.scrollTop=chat.scrollHeight;
}

function addSystemMessage(text){
  const div=document.createElement("div");div.className="system-msg";
  div.textContent="⚙️ "+text;chat.appendChild(div);chat.scrollTop=chat.scrollHeight;
}

function openImgLightbox(url) {
  let lb = document.getElementById("imgLightbox");
  if(!lb) {
    lb = document.createElement("div");
    lb.id = "imgLightbox";
    lb.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;";
    lb.onclick = () => lb.remove();
    document.body.appendChild(lb);
  }
  lb.innerHTML = `<img src="${url}" style="max-width:95vw;max-height:90vh;border-radius:10px;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,0.8);">`;
  document.body.appendChild(lb);
}

// ====== CHAT IMAGE ======
function sendChatImage(event) {
  const file = event.target.files[0];
  if(!file) return;
  if(!currentRoomId) { toast("ادخل غرفة أولاً!","#dc3545"); return; }
  if(file.size > 5 * 1024 * 1024) { toast("الصورة كبيرة جداً! الحد الأقصى 5MB","#dc3545"); return; }
  // anti-spam للصور
  const now = Date.now();
  if(now - lastMsgTime < 5000) { toast("⏳ انتظر قبل إرسال صورة أخرى","#e67e00"); return; }
  toast("⏳ جاري رفع الصورة...","#6c5ce7");
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result.split(',')[1];
    const formData = new FormData();
    formData.append('image', base64);
    fetch('https://api.imgbb.com/1/upload?key=' + IMGBB_KEY, { method:'POST', body: formData })
      .then(r => r.json())
      .then(data => {
        if(data.success) {
          lastMsgTime = Date.now();
          db.ref("rooms/"+currentRoomId+"/chat").push({
            name: playerName,
            msg: "",
            imgUrl: data.data.url,
            role: getRole(),
            figure: playerFigure,
            gender: playerGender,
            uid: playerUID,
            grantedBadges: playerGrantedBadges,
            nameColor: playerNameColor||null,
            customAvatar: playerCustomAvatar||null
          });
          toast("✅ تم إرسال الصورة!","#28a745");
        } else toast("فشل رفع الصورة","#dc3545");
      })
      .catch(() => toast("خطأ في الاتصال","#dc3545"));
  };
  reader.readAsDataURL(file);
  // امسح الـ input عشان تقدر ترسل نفس الصورة تاني
  event.target.value = "";
}

// ====== TYPING INDICATOR ======
function startTyping() {
  if(!currentRoomId || !playerUID) return;
  db.ref("rooms/"+currentRoomId+"/typing/"+playerUID).set({name:playerName, time:Date.now()});
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(stopTyping, 3000);
}

function stopTyping() {
  if(!currentRoomId || !playerUID) return;
  db.ref("rooms/"+currentRoomId+"/typing/"+playerUID).remove();
}

function listenTyping(roomId) {
  db.ref("rooms/"+roomId+"/typing").on("value", snap => {
    const el = document.getElementById("typingIndicator");
    if(!el) return;
    if(!snap.exists()) { el.textContent = ""; return; }
    const now = Date.now();
    const typers = Object.values(snap.val())
      .filter(t => t.name !== playerName && (now - t.time) < 5000)
      .map(t => t.name);
    if(typers.length === 0) el.textContent = "";
    else if(typers.length === 1) el.textContent = typers[0] + " يكتب... ✏️";
    else if(typers.length === 2) el.textContent = typers[0] + " و " + typers[1] + " يكتبان... ✏️";
    else el.textContent = "أكثر من شخص يكتب... ✏️";
  });
}

// ====== SEND ======
msgInput.addEventListener("input", () => { if(currentRoomId) startTyping(); });
form.onsubmit=e=>{
  e.preventDefault();const m=msgInput.value.trim();if(!m) return;
  const now = Date.now();
  if(now - lastMsgTime < 500) {
    const remaining = ((500 - (now - lastMsgTime)) / 1000).toFixed(1);
    toast("⏳ انتظر "+remaining+" ثانية","#e67e00");
    return;
  }
  lastMsgTime = now;
  msgInput.value="";stopTyping();
  if(!currentRoomId){toast("ادخل غرفة أولاً!","#dc3545");return;}
  if(ROLE_CODES[m]&&getRole()==="Normal"){
    playerRole=ROLE_CODES[m];db.ref("players/"+playerUID).update({role:playerRole});
    updateRoleButtons();addSystemMessage("تم تفعيل دورك: "+playerRole);return;
  }
  db.ref("players/"+playerUID).once("value").then(snap=>{
    const data=snap.val();
    if(data&&data.muted&&data.muteEnd&&Date.now()<data.muteEnd){addSystemMessage("أنت مكتوم! باقي "+Math.ceil((data.muteEnd-Date.now())/60000)+" دقيقة");return;}
    db.ref("rooms/"+currentRoomId+"/chat").push({name:playerName,msg:m,role:getRole(),figure:playerFigure,gender:playerGender,uid:playerUID,grantedBadges:playerGrantedBadges,nameColor:playerNameColor||null,customAvatar:playerCustomAvatar||null});
    incStat("msgCount", v => checkAndUnlockAch("msgCount", v));
  });
};

// ====== DAILY ======
function claimDaily(){
  if(Date.now()-lastDaily<43200000){
    const diff=43200000-(Date.now()-lastDaily);
    const h=Math.floor(diff/3600000);
    const m=Math.floor((diff%3600000)/60000);
    toast("باقي "+h+" ساعة و "+m+" دقيقة ⏰","#e67e00");return;
  }
  const g=Math.floor(Math.random()*100)+50,j=Math.floor(Math.random()*10)+5;lastDaily=Date.now();
  db.ref("players/"+playerUID).update({gold:gold+g,gems:gems+j,lastDaily});
  // إنجاز أول دخول
  db.ref("players/"+playerUID+"/achievements/first_login").set(true);
  incStat("dailyCount", v => checkAndUnlockAch("dailyCount", v));
  toast("🎁 حصلت على "+g+" Gold و "+j+" Gems!","#28a745");
}

// ====== SPIN ======
function spinWheel(){
  if(Date.now()-lastSpin<43200000){
    const diff=43200000-(Date.now()-lastSpin);
    const h=Math.floor(diff/3600000);
    const m=Math.floor((diff%3600000)/60000);
    toast("باقي "+h+" ساعة و "+m+" دقيقة ⏰","#e67e00");return;
  }
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

// ====== BLOCK ======
function getNameColorFull(role, grantedBadges, nameColor) {
  if(role==="Owner") return ROLE_BADGES.Owner.chatColor;
  if(role==="ادمن") return ROLE_BADGES["ادمن"].chatColor;
  // لو اللاعب اختار لون من بطاقاته، استخدمه
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


// ====== PHONE ======
const WALLPAPERS = [
  { id:"wp1", url:"https://i.ibb.co/placeholder1/wp1.jpg", gradient:"linear-gradient(135deg,#667eea,#764ba2)" },
  { id:"wp2", url:"", gradient:"linear-gradient(135deg,#f093fb,#f5576c)" },
  { id:"wp3", url:"", gradient:"linear-gradient(135deg,#4facfe,#00f2fe)" },
  { id:"wp4", url:"", gradient:"linear-gradient(135deg,#43e97b,#38f9d7)" },
  { id:"wp5", url:"", gradient:"linear-gradient(135deg,#fa709a,#fee140)" },
  { id:"wp6", url:"", gradient:"linear-gradient(135deg,#a18cd1,#fbc2eb)" },
  { id:"wp7", url:"", gradient:"linear-gradient(135deg,#ffecd2,#fcb69f)" },
  { id:"wp8", url:"", gradient:"linear-gradient(135deg,#ff9a9e,#fad0c4)" },
];

// الخلفيات اللي بعتها المستخدم بالصور الفعلية
const WALLPAPER_IMAGES = [
  "https://i.ibb.co/your-img1/bg1.jpg",  // هتتحدث لما ترفع الصور
  "https://i.ibb.co/your-img2/bg2.jpg",
  "https://i.ibb.co/your-img3/bg3.jpg",
  "https://i.ibb.co/your-img4/bg4.jpg",
];

let phoneCurrentWallpaper = "";
let gameCurrentNumber = 0;
let gameScore = 0;
let gamePhase = "show"; // show | input

function openPhone() {
  updatePhoneTime();
  setInterval(updatePhoneTime, 30000);
  db.ref("players/"+playerUID+"/phoneWallpaper").once("value").then(snap => {
    if(snap.exists()) applyWallpaper(snap.val(), false);
  });
  db.ref("players/"+playerUID+"/phoneLang").once("value").then(snap => {
    if(snap.exists()) applyPhoneLang(snap.val(), false);
  });
  document.getElementById("phoneOverlay").classList.add("open");
  goPhoneHome();
  initPhoneDrag();
}

function closePhone() {
  if(musicAudio) { musicAudio.pause(); }
  const old = document.getElementById("ytPlayerFrame");
  if(old) old.remove();
  musicPlaying = false;
  document.getElementById("phoneOverlay").classList.remove("open");
}

function phoneOverlayClick(e) {
  if(e.target === document.getElementById("phoneOverlay")) closePhone();
}

function updatePhoneTime() {
  const el = document.getElementById("phoneTime");
  if(!el) return;
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2,"0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  el.textContent = h + ":" + m + " " + ampm;
}

function goPhoneHome() {
  document.querySelectorAll(".phone-page").forEach(p => p.classList.remove("active"));
  document.getElementById("phoneHome").classList.add("active");
}

function openPhoneApp(app) {
  document.querySelectorAll(".phone-page").forEach(p => p.classList.remove("active"));
  if(app === "settings") {
    document.getElementById("phoneSettings").classList.add("active");
    renderWallpaperGrid();
  } else if(app === "twitter") {
    document.getElementById("phoneTwitter").classList.add("active");
    twInit();
  } else if(app === "album") {
    document.getElementById("phoneAlbum").classList.add("active");
    loadAlbum();
  } else if(app === "game") {
    document.getElementById("phoneGame").classList.add("active");
    startGame();
  } else if(app === "music") {
    document.getElementById("phoneMusic").classList.add("active");
    openMusicApp();
  }
}

function closePhoneApp() { goPhoneHome(); }

// ====== DRAG PHONE ======
function initPhoneDrag() {
  const device = document.getElementById("phoneDevice");
  const overlay = document.getElementById("phoneOverlay");
  if(!device || device._dragInit) return;
  device._dragInit = true;
  let dragging=false, startX=0, startY=0, origX=0, origY=0;
  device.addEventListener("mousedown", e => {
    if(e.target.closest("button,input,textarea,select,label,img,a")) return;
    dragging=true;
    startX=e.clientX; startY=e.clientY;
    const rect=device.getBoundingClientRect();
    origX=rect.left; origY=rect.top;
    device.style.position="fixed";
    device.style.margin="0";
    device.style.left=origX+"px"; device.style.top=origY+"px";
    device.style.transform="none";
    e.preventDefault();
  });
  document.addEventListener("mousemove", e => {
    if(!dragging) return;
    device.style.left=(origX+(e.clientX-startX))+"px";
    device.style.top=(origY+(e.clientY-startY))+"px";
  });
  document.addEventListener("mouseup", ()=>{ dragging=false; });
  // touch
  device.addEventListener("touchstart", e => {
    if(e.target.closest("button,input,textarea,select,label,img,a")) return;
    dragging=true;
    startX=e.touches[0].clientX; startY=e.touches[0].clientY;
    const rect=device.getBoundingClientRect();
    origX=rect.left; origY=rect.top;
    device.style.position="fixed";
    device.style.margin="0";
    device.style.left=origX+"px"; device.style.top=origY+"px";
    device.style.transform="none";
  }, {passive:true});
  document.addEventListener("touchmove", e => {
    if(!dragging) return;
    device.style.left=(origX+(e.touches[0].clientX-startX))+"px";
    device.style.top=(origY+(e.touches[0].clientY-startY))+"px";
  }, {passive:true});
  document.addEventListener("touchend", ()=>{ dragging=false; });
}

// ====== PHONE LANGUAGE ======
let phoneLang = "ar";
const PHONE_STRINGS = {
  ar: {
    settings:"الإعدادات", wallpaper:"🖼️ خلفية الشاشة", lang:"🌐 اللغة",
    twitter:"Silvas X", photos:"الصور", game:"لعبة", music:"أغاني",
    home:"الهوم", upload:"+ رفع", search:"بحث", notifications:"الإشعارات",
    myProfile:"ملفي", editProfile:"تعديل الملف", follow:"متابعة", following:"متابَع",
    posts:"التغريدات", playlist:"قائمة التشغيل", chooseTrack:"اختر أغنية",
    gameTitle:"لعبة الأرقام", gameInstr:"احفظ الرقم التالي ثم اكتبه!", gameCheck:"تحقق ✓", gameNew:"بداية جديدة 🔄",
    tweetsTitle:"التغريدات", noTweets:"لا توجد تغريدات بعد 🐦"
  },
  en: {
    settings:"Settings", wallpaper:"🖼️ Wallpaper", lang:"🌐 Language",
    twitter:"Silvas X", photos:"Photos", game:"Game", music:"Music",
    home:"Home", upload:"+ Upload", search:"Search", notifications:"Notifications",
    myProfile:"My Profile", editProfile:"Edit Profile", follow:"Follow", following:"Following",
    posts:"Posts", playlist:"Playlist", chooseTrack:"Choose a track",
    gameTitle:"Number Game", gameInstr:"Memorize the number then type it!", gameCheck:"Check ✓", gameNew:"New Game 🔄",
    tweetsTitle:"Posts", noTweets:"No tweets yet 🐦"
  }
};

function setPhoneLang(lang) {
  phoneLang = lang;
  db.ref("players/"+playerUID).update({ phoneLang: lang });
  applyPhoneLang(lang, true);
}

function applyPhoneLang(lang, save) {
  phoneLang = lang;
  const s = PHONE_STRINGS[lang] || PHONE_STRINGS.ar;
  // app names
  document.querySelectorAll("[data-lang]").forEach(el => {
    const parts = el.getAttribute("data-lang").split("|");
    el.textContent = lang==="en" ? (parts[1]||parts[0]) : parts[0];
  });
  // أزرار اللغة
  const btnAr = document.getElementById("langBtnAr");
  const btnEn = document.getElementById("langBtnEn");
  if(btnAr) { btnAr.style.background=lang==="ar"?"#6c5ce7":"#2d3748"; btnAr.style.color=lang==="ar"?"#fff":"#aaa"; }
  if(btnEn) { btnEn.style.background=lang==="en"?"#6c5ce7":"#2d3748"; btnEn.style.color=lang==="en"?"#fff":"#aaa"; }
  // عناوين ثابتة
  const ids = { settingsTitle:"settings", stWallpaperTitle:"wallpaper", stLangTitle:"lang",
    musicTitle:"music", musicPlaylistTitle:"playlist", gameAppTitle:"gameTitle",
    gameInstr:"gameInstr", gameCheckBtn:"gameCheck", gameNewBtn:"gameNew" };
  Object.entries(ids).forEach(([id,key]) => {
    const el = document.getElementById(id);
    if(el) el.textContent = s[key]||"";
  });
}

// ====== TWITTER NOTIFICATIONS (منفصلة عن اللعبة) ======
function sendTwNotification(toUID, type, fromName, tweetId) {
  const notifId = "twn_"+Date.now();
  const texts = { like: fromName+" أعجب بتغريدتك ❤️", retweet: fromName+" أعاد نشر تغريدتك 🔁", comment: fromName+" علّق على تغريدتك 💬", follow: fromName+" بدأ متابعتك 👥" };
  const icons = { like:"❤️", retweet:"🔁", comment:"💬", follow:"👥" };
  db.ref("players/"+toUID+"/twNotifs/"+notifId).set({
    id:notifId, type, icon:icons[type]||"🔔",
    text:texts[type]||"إشعار جديد",
    fromUID:playerUID, fromName, tweetId:tweetId||null,
    time:Date.now(), read:false
  });
}

// ====== MUSIC APP ======
let musicCurrentIdx = 0;
let musicPlaying = false;
let musicPlaylistData = []; // كل أغاني اللاعب
let musicCurrentSource = []; // الأغاني اللي بتشتغل دلوقتي
let musicPage = "home";

function openMusicApp() {
  musicGoHome();
}

function musicSetBar(active) {
  document.getElementById("musicBtnHome").classList.toggle("active", active==="home");
  document.getElementById("musicBtnLibrary").classList.toggle("active", active==="library");
}

// ====== HOME ======
function musicGoHome() {
  musicPage = "home";
  musicSetBar("home");
  const c = document.getElementById("musicContent");
  c.innerHTML = `
    <div style="padding:14px 14px 4px;display:flex;justify-content:space-between;align-items:center;">
      <span class="music-section-title" style="padding:0;">My Songs</span>
      <button onclick="musicAddTrack()" style="background:#1db954;border:none;color:#000;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:bold;cursor:pointer;">+ Add</button>
    </div>
    <div id="musicTrackList"></div>`;
  loadAllTracks();
}

function loadAllTracks() {
  db.ref("players/"+playerUID+"/musicPlaylist").once("value").then(snap => {
    musicPlaylistData = snap.exists() ? Object.values(snap.val()).sort((a,b)=>a.addedAt-b.addedAt) : [];
    renderTrackList(musicPlaylistData, "musicTrackList", musicPlaylistData);
  });
}

function renderTrackList(tracks, containerId, sourceList) {
  const list = document.getElementById(containerId);
  if(!list) return;
  list.innerHTML = "";
  if(tracks.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#555;padding:30px;font-size:12px;">لا توجد أغاني</div>';
    return;
  }
  tracks.forEach((t, i) => {
    const isActive = musicCurrentSource===sourceList && i===musicCurrentIdx;
    const liked = t.liked;
    const div = document.createElement("div");
    div.className = "music-track-row";
    div.style.background = isActive ? "#1a1a1a" : "";
    const thumb = t.ytId ? `https://img.youtube.com/vi/${t.ytId}/default.jpg` : "";
    div.innerHTML = `
      <img class="music-track-art" src="${thumb}" onerror="this.style.background='#282828';this.src=''">
      <div class="music-track-info">
        <div class="music-track-title" style="color:${isActive?"#1db954":"#fff"}">${t.title}</div>
        <div class="music-track-artist">${t.artist}</div>
      </div>
      <div class="music-track-actions">
        <button onclick="event.stopPropagation();musicLikeTrack('${t.id}',this)" style="background:none;border:none;font-size:16px;cursor:pointer;">${liked?"❤️":"🤍"}</button>
        <button onclick="event.stopPropagation();musicDeleteTrack('${t.id}')" style="background:none;border:none;color:#555;font-size:14px;cursor:pointer;">⋯</button>
      </div>`;
    div.onclick = () => { musicCurrentSource = sourceList; loadTrack(i, true, sourceList); };
    list.appendChild(div);
  });
}

// ====== LIBRARY ======
function musicGoLibrary() {
  musicPage = "library";
  musicSetBar("library");
  const c = document.getElementById("musicContent");
  c.innerHTML = `
    <div class="music-section-title">Your Library</div>
    <div class="music-playlist-card" onclick="musicOpenLikedSongs()" style="cursor:pointer;">
      <div class="music-playlist-cover" style="background:linear-gradient(135deg,#450af5,#c4efd9);">❤️</div>
      <div>
        <div style="font-size:13px;font-weight:bold;color:#fff;">Liked Songs</div>
        <div style="font-size:11px;color:#b3b3b3;" id="likedCount">Playlist</div>
      </div>
    </div>`;
  // عدد الـ liked
  db.ref("players/"+playerUID+"/musicPlaylist").orderByChild("liked").equalTo(true).once("value").then(snap => {
    const el = document.getElementById("likedCount");
    if(el) el.textContent = (snap.exists()?Object.keys(snap.val()).length:0) + " songs";
  });
}

function musicOpenLikedSongs() {
  const c = document.getElementById("musicContent");
  c.innerHTML = `
    <div style="background:linear-gradient(135deg,#450af5,#c4efd9);padding:20px 14px 14px;">
      <button onclick="musicGoLibrary()" style="background:rgba(0,0,0,0.3);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px;margin-bottom:10px;">❮</button>
      <div style="font-size:24px;font-weight:bold;color:#fff;">❤️ Liked Songs</div>
    </div>
    <div id="likedTrackList"></div>`;
  db.ref("players/"+playerUID+"/musicPlaylist").orderByChild("liked").equalTo(true).once("value").then(snap => {
    const liked = snap.exists() ? Object.values(snap.val()).sort((a,b)=>a.addedAt-b.addedAt) : [];
    renderTrackList(liked, "likedTrackList", liked);
  });
}

// ====== LIKE TRACK ======
function musicLikeTrack(trackId, btn) {
  db.ref("players/"+playerUID+"/musicPlaylist/"+trackId+"/liked").once("value").then(snap => {
    const wasLiked = snap.val()===true;
    db.ref("players/"+playerUID+"/musicPlaylist/"+trackId+"/liked").set(!wasLiked);
    btn.textContent = wasLiked ? "🤍" : "❤️";
    // حدّث mini player
    updateMiniLike(!wasLiked);
    toast(wasLiked?"تم الإزالة من Liked":"❤️ أضيف للـ Liked Songs", wasLiked?"#636e72":"#1db954");
  });
}

function updateMiniLike(liked) {
  const btn = document.getElementById("miniLikeBtn");
  if(btn) btn.textContent = liked ? "❤️" : "🤍";
}

// ====== ADD TRACK ======
function musicAddTrack() {
  const url = prompt("YouTube link:");
  if(!url||!url.trim()) return;
  const ytId = extractYouTubeId(url.trim());
  if(!ytId) { toast("رابط يوتيوب غير صحيح!","#dc3545"); return; }
  const title = prompt("Song name:") || "New Song";
  const artist = prompt("Artist:") || "—";
  const trackId = "tr_"+Date.now();
  db.ref("players/"+playerUID+"/musicPlaylist/"+trackId).set({
    id:trackId, title, artist, ytId, liked:false, addedAt:Date.now()
  });
  toast("✅ Added!","#1db954");
  musicGoHome();
}

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];
  for(const p of patterns) { const m=url.match(p); if(m) return m[1]; }
  return null;
}

function musicDeleteTrack(trackId) {
  if(!confirm("حذف الأغنية؟")) return;
  db.ref("players/"+playerUID+"/musicPlaylist/"+trackId).remove();
  toast("تم الحذف","#636e72");
  loadAllTracks();
}

// ====== PLAYER ======
function loadTrack(idx, autoPlay, sourceList) {
  const list = sourceList || musicPlaylistData;
  if(!list||list.length===0) return;
  musicCurrentIdx = idx;
  musicCurrentSource = list;
  const t = list[idx];

  // Mini player
  const mp = document.getElementById("musicMiniPlayer");
  if(mp) mp.style.display = "flex";
  document.getElementById("miniTitle").textContent = t.title;
  document.getElementById("miniArtist").textContent = t.artist;
  const art = document.getElementById("miniArt");
  if(art) art.src = t.ytId ? `https://img.youtube.com/vi/${t.ytId}/default.jpg` : "";
  updateMiniLike(t.liked);

  // شغّل
  const old = document.getElementById("ytPlayerFrame");
  if(old) old.remove();
  if(autoPlay && t.ytId) {
    playYouTube(t.ytId);
    musicPlaying = true;
    document.getElementById("miniPlayBtn").textContent = "⏸";
  } else {
    musicPlaying = false;
    document.getElementById("miniPlayBtn").textContent = "▶";
  }
  // refresh list
  if(musicPage==="home") renderTrackList(musicPlaylistData,"musicTrackList",musicPlaylistData);
}

function playYouTube(ytId) {
  const old = document.getElementById("ytPlayerFrame");
  if(old) old.remove();
  const iframe = document.createElement("iframe");
  iframe.id = "ytPlayerFrame";
  iframe.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-999px;";
  iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&enablejsapi=0`;
  iframe.allow = "autoplay";
  document.getElementById("phoneMusic").appendChild(iframe);
}

function musicTogglePlay() {
  const list = musicCurrentSource||musicPlaylistData;
  if(!list||list.length===0) return;
  const t = list[musicCurrentIdx];
  if(!t) return;
  const btn = document.getElementById("miniPlayBtn");
  if(musicPlaying) {
    const old = document.getElementById("ytPlayerFrame");
    if(old) old.remove();
    musicPlaying = false;
    if(btn) btn.textContent = "▶";
  } else {
    if(t.ytId) playYouTube(t.ytId);
    musicPlaying = true;
    if(btn) btn.textContent = "⏸";
  }
}

function musicNext() {
  const list = musicCurrentSource||musicPlaylistData;
  if(list&&list.length>0) loadTrack((musicCurrentIdx+1)%list.length, true, list);
}
function musicPrev() {
  const list = musicCurrentSource||musicPlaylistData;
  if(list&&list.length>0) loadTrack((musicCurrentIdx-1+list.length)%list.length, true, list);
}

// ====== WALLPAPER ======
function renderWallpaperGrid() {
  const grid = document.getElementById("wallpaperGrid");
  grid.innerHTML = "";
  const wallpapers = [
    { id:"img1",  bg:"url(https://i.ibb.co/9mg7LnYg/w1.webp) center/cover no-repeat" },
    { id:"img2",  bg:"url(https://i.ibb.co/N2fvwxJ8/w2.webp) center/cover no-repeat" },
    { id:"img3",  bg:"url(https://i.ibb.co/zTrt8p4W/w3.webp) center/cover no-repeat" },
    { id:"img4",  bg:"url(https://i.ibb.co/qMCmRXJD/w4.webp) center/cover no-repeat" },
    { id:"grad1",  bg:"linear-gradient(135deg,#0f0f23 0%,#1a1a3e 100%)" },
    { id:"grad2",  bg:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)" },
    { id:"grad3",  bg:"linear-gradient(135deg,#f093fb 0%,#f5576c 100%)" },
    { id:"grad4",  bg:"linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)" },
    { id:"grad5",  bg:"linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)" },
    { id:"grad6",  bg:"linear-gradient(135deg,#fa709a 0%,#fee140 100%)" },
    { id:"grad7",  bg:"linear-gradient(135deg,#16213e 0%,#0f3460 100%)" },
    { id:"grad8",  bg:"linear-gradient(135deg,#1a1a2e 0%,#e94560 100%)" },
  ];
  wallpapers.forEach(wp => {
    const div = document.createElement("div");
    div.className = "wallpaper-item" + (phoneCurrentWallpaper === wp.bg ? " selected" : "");
    div.style.background = wp.bg;
    div.onclick = () => applyWallpaper(wp.bg, true);
    grid.appendChild(div);
  });
}

function applyWallpaper(bg, save) {
  phoneCurrentWallpaper = bg;
  const wEl = document.getElementById("phoneWallpaper");
  if(wEl) wEl.style.background = bg;
  if(save) {
    db.ref("players/"+playerUID).update({ phoneWallpaper: bg });
    toast("✅ تم تغيير الخلفية!", "#28a745");
    renderWallpaperGrid();
  }
}

// ====== TWITTER / X ======
let twCurrentPage = "home"; // home | profile | search | notif
let twProfileUID = null;
let twComposeImgUrl = null;

function twInit() {
  // حدّث أفاتار الـ bar
  const fig = playerFigure || DEFAULT_FIGURE_MALE;
  const av = playerCustomAvatar || getAvatarUrl(fig, playerGender||"male");
  const el = document.getElementById("twMyAvatar");
  if(el) el.src = av;
  twGoHome();
}

// ====== Navigation ======
function twSetActiveBar(btn) {
  document.querySelectorAll(".tw-bar-btn").forEach(b => b.classList.remove("active"));
  if(btn) btn.classList.add("active");
}

function twSetHeader(title, showBack=false) {
  document.getElementById("twHeaderTitle").textContent = title;
  document.getElementById("twBackBtn").style.display = showBack ? "block" : "none";
}

function twGoHome() {
  twCurrentPage = "home";
  twSetActiveBar(document.getElementById("twBtnHome"));
  twSetHeader("𝕏", false);
  twLoadHome();
}

function twGoSearch() {
  twCurrentPage = "search";
  twSetActiveBar(document.getElementById("twBtnSearch"));
  twSetHeader("بحث", false);
  twLoadSearch();
}

function twGoNotif() {
  twCurrentPage = "notif";
  twSetActiveBar(document.getElementById("twBtnNotif"));
  twSetHeader("الإشعارات", false);
  twLoadNotif();
}

function twGoProfile(uid) {
  twCurrentPage = "profile";
  twProfileUID = uid || playerUID;
  const isMe = (uid||playerUID) === playerUID;
  twSetActiveBar(isMe ? document.getElementById("twBtnProfile") : null);
  twSetHeader(isMe ? "ملفي" : "الملف الشخصي", !isMe);
  twLoadProfile(twProfileUID);
}

// ====== HOME FEED ======
function twLoadHome() {
  const content = document.getElementById("twContent");
  content.innerHTML = '<div style="text-align:center;color:#555;padding:30px;font-size:12px;">جاري التحميل...</div>';
  db.ref("tweets").orderByChild("time").limitToLast(40).once("value").then(snap => {
    content.innerHTML = "";
    if(!snap.exists()) {
      content.innerHTML = '<div style="text-align:center;color:#555;padding:40px;font-size:13px;">لا توجد تغريدات بعد 🐦<br><small style="color:#444;">ابدأ بنشر أول تغريدة!</small></div>';
      return;
    }
    Object.values(snap.val()).sort((a,b)=>b.time-a.time).forEach(tw => twRenderPost(tw, content));
  });
}

// ====== RENDER POST ======
function twRenderPost(tw, container, prepend=false) {
  const fig = tw.figure || DEFAULT_FIGURE_MALE;
  const av  = tw.customAvatar || getAvatarUrl(fig, tw.gender||"male");
  const likes = tw.likes ? Object.keys(tw.likes).length : 0;
  const comments = tw.comments ? Object.keys(tw.comments).length : 0;
  const retweets = tw.retweets ? Object.keys(tw.retweets).length : 0;
  const liked    = tw.likes && tw.likes[playerUID];
  const retweeted= tw.retweets && tw.retweets[playerUID];

  const div = document.createElement("div");
  div.className = "tw-post";
  div.innerHTML = `
    <div class="tw-post-header">
      <img class="tw-avatar" src="${av}" onerror="this.style.display='none'" onclick="twGoProfile('${tw.authorUID}')">
      <div class="tw-post-meta">
        <div class="tw-post-name" onclick="twGoProfile('${tw.authorUID}')">${tw.authorName||"لاعب"}</div>
        <div class="tw-post-handle">· ${timeAgo(tw.time)}</div>
      </div>
      ${tw.authorUID===playerUID ? `<button onclick="twDeletePost('${tw.id}')" style="background:none;border:none;color:#555;cursor:pointer;font-size:14px;margin-right:auto;">🗑️</button>` : ""}
    </div>
    ${tw.text ? `<div class="tw-post-text">${tw.text}</div>` : ""}
    ${tw.imgUrl ? `<img class="tw-post-img" src="${tw.imgUrl}" onclick="openImgLightbox('${tw.imgUrl}')">` : ""}
    <div class="tw-post-actions">
      <button class="tw-action" onclick="twOpenComments('${tw.id}')">💬 ${comments}</button>
      <button class="tw-action ${retweeted?'retweeted':''}" onclick="twToggleRetweet('${tw.id}',this)">🔁 ${retweets}</button>
      <button class="tw-action ${liked?'liked':''}" onclick="twToggleLike('${tw.id}',this)">
        ${liked?'❤️':'🤍'} ${likes}
      </button>
    </div>`;
  if(prepend && container.firstChild) container.insertBefore(div, container.firstChild);
  else container.appendChild(div);
}

// ====== LIKE ======
function twToggleLike(tweetId, btn) {
  const ref = db.ref("tweets/"+tweetId+"/likes/"+playerUID);
  ref.once("value").then(snap => {
    const parts = btn.innerHTML.split(" ");
    const count = parseInt(parts[parts.length-1])||0;
    if(snap.exists()) {
      ref.remove();
      btn.classList.remove("liked");
      btn.innerHTML = "🤍 " + (count-1);
    } else {
      ref.set(true);
      btn.classList.add("liked");
      btn.innerHTML = "❤️ " + (count+1);
      // إشعار تويتر
      db.ref("tweets/"+tweetId+"/authorUID").once("value").then(s => {
        if(s.val() && s.val()!==playerUID) sendTwNotification(s.val(),"like",playerName,tweetId);
      });
    }
  });
}

// ====== RETWEET ======
function twToggleRetweet(tweetId, btn) {
  const ref = db.ref("tweets/"+tweetId+"/retweets/"+playerUID);
  ref.once("value").then(snap => {
    const parts = btn.innerHTML.split(" ");
    const count = parseInt(parts[parts.length-1])||0;
    if(snap.exists()) {
      ref.remove();
      btn.classList.remove("retweeted");
      btn.innerHTML = "🔁 " + (count-1);
    } else {
      ref.set(true);
      btn.classList.add("retweeted");
      btn.innerHTML = "🔁 " + (count+1);
      toast("تم الريتويت ✅","#00ba7c");
    }
  });
}

// ====== DELETE ======
function twDeletePost(tweetId) {
  if(!confirm("حذف التغريدة؟")) return;
  db.ref("tweets/"+tweetId).remove();
  toast("تم الحذف","#636e72");
  twGoHome();
}

// ====== COMMENTS ======
function twOpenComments(tweetId) {
  db.ref("tweets/"+tweetId).once("value").then(snap => {
    if(!snap.exists()) return;
    const tw = snap.val();
    const content = document.getElementById("twContent");
    content.innerHTML = "";
    twSetHeader("التغريدة", true);

    // التغريدة الأصلية
    twRenderPost(tw, content);

    // الكومنتات
    const commDiv = document.createElement("div");
    commDiv.style.cssText = "border-top:1px solid #1a1a1a;";
    const comms = tw.comments ? Object.values(tw.comments).sort((a,b)=>a.time-b.time) : [];
    if(comms.length===0) {
      commDiv.innerHTML = '<div style="text-align:center;color:#555;padding:20px;font-size:12px;">لا توجد ردود بعد</div>';
    } else {
      comms.forEach(c => {
        const fig = c.figure||DEFAULT_FIGURE_MALE;
        const av = c.customAvatar||getAvatarUrl(fig,c.gender||"male");
        const cd = document.createElement("div");
        cd.className = "tw-post";
        cd.innerHTML = `
          <div class="tw-post-header">
            <img class="tw-avatar" src="${av}" onerror="this.style.display='none'" onclick="twGoProfile('${c.uid}')">
            <div class="tw-post-meta">
              <div class="tw-post-name">${c.name}</div>
              <div class="tw-post-handle">· ${timeAgo(c.time)}</div>
            </div>
          </div>
          <div class="tw-post-text">${c.text}</div>`;
        commDiv.appendChild(cd);
      });
    }
    content.appendChild(commDiv);

    // إضافة كومنت
    const form = document.createElement("div");
    form.style.cssText = "padding:10px;border-top:1px solid #1a1a1a;display:flex;gap:8px;align-items:center;position:sticky;bottom:42px;background:#000;";
    form.innerHTML = `
      <input id="twCommentInput" placeholder="ردك..." style="flex:1;background:#1a1a1a;border:1px solid #2d3748;border-radius:20px;padding:8px 12px;color:#fff;font-size:12px;direction:rtl;outline:none;">
      <button onclick="twPostComment('${tweetId}')" style="background:#1da1f2;border:none;color:#fff;padding:8px 14px;border-radius:20px;cursor:pointer;font-size:12px;">رد</button>`;
    content.appendChild(form);
  });
}

function twPostComment(tweetId) {
  const input = document.getElementById("twCommentInput");
  const text = input.value.trim();
  if(!text) return;
  const cId = "c_"+Date.now();
  db.ref("tweets/"+tweetId+"/comments/"+cId).set({
    uid: playerUID, name: playerName,
    figure: playerFigure, gender: playerGender,
    customAvatar: playerCustomAvatar||null,
    text, time: Date.now()
  });
  // إشعار تويتر
  db.ref("tweets/"+tweetId+"/authorUID").once("value").then(s => {
    if(s.val() && s.val()!==playerUID) sendTwNotification(s.val(),"comment",playerName,tweetId);
  });
  input.value = "";
  twOpenComments(tweetId);
}

// ====== PROFILE ======
function twLoadProfile(uid) {
  const content = document.getElementById("twContent");
  content.innerHTML = '<div style="text-align:center;color:#555;padding:30px;font-size:12px;">جاري التحميل...</div>';
  const isMe = uid===playerUID;
  twSetHeader(isMe?"ملفي":"الملف الشخصي", !isMe);

  db.ref("players/"+uid).once("value").then(async snap => {
    const data = snap.val()||{};
    const fig = data.figure||(data.gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
    const av  = data.customAvatar || getAvatarUrl(fig, data.gender||"male");
    const followers = data.twFollowers ? Object.keys(data.twFollowers).length : 0;
    const following = data.twFollowing ? Object.keys(data.twFollowing).length : 0;
    const isMe = uid===playerUID;
    const isFollowing = data.twFollowers && data.twFollowers[playerUID];

    content.innerHTML = "";

    // Cover
    const cover = document.createElement("div");
    cover.className = "tw-profile-cover";
    cover.style.background = data.twCover || "linear-gradient(135deg,#1da1f2,#0d8bd9)";
    content.appendChild(cover);

    // Header
    const ph = document.createElement("div");
    ph.className = "tw-profile-header";
    ph.innerHTML = `
      <div style="display:flex;justify-content:flex-end;padding:6px 0 2px;">
        ${!isMe ? `<button class="tw-follow-btn ${isFollowing?'following':'follow'}" onclick="twToggleFollow('${uid}',this)">${isFollowing?'متابَع':'متابعة'}</button>` : ""}
      </div>
      <div class="tw-profile-avatar-wrap">
        <img class="tw-profile-avatar" src="${av}" onerror="this.style.display='none'">
      </div>
      <div class="tw-profile-name">${data.name||"لاعب"}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
        <span class="tw-profile-handle">@${(data.name||"user").toLowerCase().replace(/\s/g,"")}</span>
        ${isMe ? `<button onclick="twEditBio()" style="background:none;border:1px solid #536471;color:#aaa;padding:2px 8px;border-radius:12px;font-size:11px;cursor:pointer;">✏️ البايو</button>` : ""}
      </div>
      <div class="tw-profile-bio">${data.twBio||""}</div>
      <div class="tw-profile-stats">
        <span class="tw-stat"><b>${following}</b> متابَع</span>
        <span class="tw-stat"><b>${followers}</b> متابِع</span>
      </div>`;
    content.appendChild(ph);

    // بوستاته
    const postsTitle = document.createElement("div");
    postsTitle.style.cssText = "padding:10px 14px;font-size:13px;font-weight:bold;color:#fff;border-bottom:1px solid #1a1a1a;";
    postsTitle.textContent = "التغريدات";
    content.appendChild(postsTitle);

    db.ref("tweets").orderByChild("authorUID").equalTo(uid).once("value").then(snap2 => {
      if(!snap2.exists()) {
        const empty = document.createElement("div");
        empty.style.cssText = "text-align:center;color:#555;padding:30px;font-size:12px;";
        empty.textContent = "لا توجد تغريدات بعد";
        content.appendChild(empty);
        return;
      }
      Object.values(snap2.val()).sort((a,b)=>b.time-a.time).forEach(tw => twRenderPost(tw, content));
    });
  });
}

// ====== FOLLOW ======
function twToggleFollow(uid, btn) {
  const ref = db.ref("players/"+uid+"/twFollowers/"+playerUID);
  ref.once("value").then(snap => {
    if(snap.exists()) {
      ref.remove();
      db.ref("players/"+playerUID+"/twFollowing/"+uid).remove();
      btn.textContent = "متابعة";
      btn.classList.remove("following");
      btn.classList.add("follow");
    } else {
      ref.set(true);
      db.ref("players/"+playerUID+"/twFollowing/"+uid).set(true);
      btn.textContent = "متابَع";
      btn.classList.add("following");
      btn.classList.remove("follow");
      toast("✅ تم المتابعة","#1da1f2");
      sendTwNotification(uid,"follow",playerName,null);
    }
  });
}

// ====== EDIT BIO ======
function twEditBio() {
  const bio = prompt("اكتب Bio للـ X:", "");
  if(bio===null) return;
  db.ref("players/"+playerUID).update({ twBio: bio.trim() });
  twLoadProfile(playerUID);
}

// ====== SEARCH ======
function twLoadSearch() {
  const content = document.getElementById("twContent");
  content.innerHTML = `
    <div style="padding:10px;">
      <input id="twSearchInput" class="tw-search-input" placeholder="🔍 ابحث عن لاعب..." oninput="twDoSearch(this.value)">
    </div>
    <div id="twSearchResults"></div>`;
}

function twDoSearch(q) {
  const res = document.getElementById("twSearchResults");
  if(!q||q.length<2) { res.innerHTML=""; return; }
  db.ref("players").orderByChild("name").startAt(q).endAt(q+"\uf8ff").limitToFirst(10).once("value").then(snap => {
    res.innerHTML = "";
    if(!snap.exists()) { res.innerHTML='<div style="text-align:center;color:#555;padding:20px;font-size:12px;">لا نتائج</div>'; return; }
    Object.values(snap.val()).forEach(p => {
      const fig = p.figure||(p.gender==="female"?DEFAULT_FIGURE_FEMALE:DEFAULT_FIGURE_MALE);
      const av = p.customAvatar || getAvatarUrl(fig, p.gender||"male");
      const uid = Object.keys(snap.val()).find(k=>snap.val()[k].name===p.name);
      const item = document.createElement("div");
      item.style.cssText = "display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #1a1a1a;cursor:pointer;";
      item.innerHTML = `<img src="${av}" style="width:38px;height:38px;border-radius:50%;image-rendering:pixelated;" onerror="this.style.display='none'">
        <div><div style="font-size:13px;font-weight:bold;color:#fff;">${p.name}</div></div>`;
      item.onclick = () => twGoProfile(uid);
      res.appendChild(item);
    });
  });
}

// ====== TWITTER NOTIFICATIONS (tab منفصل) ======
function twLoadNotif() {
  const content = document.getElementById("twContent");
  content.innerHTML = '<div style="text-align:center;color:#555;padding:30px;font-size:12px;">جاري التحميل...</div>';
  db.ref("players/"+playerUID+"/twNotifs").orderByChild("time").limitToLast(30).once("value").then(snap => {
    content.innerHTML = "";
    if(!snap.exists()) {
      content.innerHTML = '<div style="text-align:center;color:#555;padding:40px;font-size:13px;">لا توجد إشعارات</div>';
      return;
    }
    Object.values(snap.val()).sort((a,b)=>b.time-a.time).forEach(n => {
      const item = document.createElement("div");
      item.style.cssText = "padding:12px 14px;border-bottom:1px solid #1a1a1a;display:flex;gap:10px;align-items:flex-start;cursor:pointer;" + (n.read?"":"background:#0a0a12;");
      item.innerHTML = `<span style="font-size:22px;flex-shrink:0;">${n.icon||"🔔"}</span>
        <div style="flex:1;">
          <div style="font-size:12px;color:#e7e9ea;">${n.text||""}</div>
          <div style="font-size:10px;color:#555;margin-top:2px;">${timeAgo(n.time)}</div>
        </div>`;
      if(n.fromUID) item.onclick = () => { twGoProfile(n.fromUID); db.ref("players/"+playerUID+"/twNotifs/"+n.id+"/read").set(true); };
      content.appendChild(item);
    });
    // اجعلهم مقروءين
    db.ref("players/"+playerUID+"/twNotifs").once("value").then(s => {
      if(s.exists()) Object.keys(s.val()).forEach(k => { if(!s.val()[k].read) db.ref("players/"+playerUID+"/twNotifs/"+k+"/read").set(true); });
    });
  });
}

// ====== COMPOSE ======
function twOpenCompose() {
  twComposeImgUrl = null;
  document.getElementById("tweetInput").value = "";
  document.getElementById("tweetCharCount").textContent = "0 / 280";
  document.getElementById("twImgPreview").innerHTML = "";
  // حدّث أفاتار
  const fig = playerFigure||DEFAULT_FIGURE_MALE;
  const av = playerCustomAvatar||getAvatarUrl(fig,playerGender||"male");
  const el = document.getElementById("twComposeAvatar");
  if(el) el.src = av;
  document.getElementById("newTweetOverlay").classList.add("open");
  document.getElementById("tweetInput").oninput = function() {
    document.getElementById("tweetCharCount").textContent = this.value.length + " / 280";
  };
  document.getElementById("tweetInput").focus();
}

function twAttachImage(event) {
  const file = event.target.files[0];
  if(!file) return;
  if(file.size > 5*1024*1024) { toast("الصورة كبيرة جداً!","#dc3545"); return; }
  toast("⏳ جاري رفع الصورة...","#1da1f2");
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result.split(',')[1];
    const fd = new FormData(); fd.append('image', base64);
    fetch('https://api.imgbb.com/1/upload?key='+IMGBB_KEY, {method:'POST',body:fd})
      .then(r=>r.json()).then(data => {
        if(data.success) {
          twComposeImgUrl = data.data.url;
          document.getElementById("twImgPreview").innerHTML =
            `<img src="${twComposeImgUrl}" style="width:100%;border-radius:10px;max-height:120px;object-fit:cover;">`;
          toast("✅ تم رفع الصورة","#28a745");
        }
      }).catch(()=>toast("خطأ في الرفع","#dc3545"));
  };
  reader.readAsDataURL(file);
  event.target.value="";
}

function closeNewTweet() { document.getElementById("newTweetOverlay").classList.remove("open"); }
function newTweetOverlayClick(e) { if(e.target===document.getElementById("newTweetOverlay")) closeNewTweet(); }

function postTweet() {
  const text = document.getElementById("tweetInput").value.trim();
  if(!text && !twComposeImgUrl) { toast("اكتب حاجة أو ارفع صورة!","#e67e00"); return; }
  const tweetId = "tw_"+Date.now();
  db.ref("tweets/"+tweetId).set({
    id: tweetId,
    authorUID: playerUID,
    authorName: playerName,
    figure: playerFigure,
    gender: playerGender,
    customAvatar: playerCustomAvatar||null,
    text: text||"",
    imgUrl: twComposeImgUrl||null,
    time: Date.now(),
    likes:{}, retweets:{}, comments:{}
  });
  toast("🚀 تم النشر!","#1da1f2");
  closeNewTweet();
  if(twCurrentPage==="home") twLoadHome();
  else if(twCurrentPage==="profile") twLoadProfile(playerUID);
}

// ====== ALBUM ======
function loadAlbum() {
  const grid = document.getElementById("albumGrid");
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#555;padding:20px;font-size:12px;">جاري التحميل...</div>';
  db.ref("players/"+playerUID+"/album").once("value").then(snap => {
    grid.innerHTML = "";
    if(!snap.exists()) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#555;padding:20px;font-size:12px;">لا توجد صور بعد 🖼️</div>';
      return;
    }
    Object.values(snap.val()).reverse().forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.url;
      img.style.cssText = "width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer;";
      img.onclick = () => openImgLightbox(photo.url);
      grid.appendChild(img);
    });
  });
}

function uploadAlbumPhoto(event) {
  const file = event.target.files[0];
  if(!file) return;
  if(file.size > 5 * 1024 * 1024) { toast("الصورة كبيرة جداً! الحد الأقصى 5MB","#dc3545"); return; }
  toast("⏳ جاري رفع الصورة...","#6c5ce7");
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result.split(',')[1];
    const formData = new FormData();
    formData.append('image', base64);
    fetch('https://api.imgbb.com/1/upload?key=' + IMGBB_KEY, { method:'POST', body: formData })
      .then(r => r.json())
      .then(data => {
        if(data.success) {
          const photoId = "ph_" + Date.now();
          db.ref("players/"+playerUID+"/album/"+photoId).set({ url: data.data.url, time: Date.now() });
          toast("✅ تم رفع الصورة!", "#28a745");
          loadAlbum();
        } else toast("فشل رفع الصورة","#dc3545");
      })
      .catch(() => toast("خطأ في الاتصال","#dc3545"));
  };
  reader.readAsDataURL(file);
}

// ====== MINI GAME ======
function startGame() {
  gameScore = 0;
  document.getElementById("gameScore").textContent = "نقاط: 0";
  document.getElementById("gameInput").value = "";
  nextGameRound();
}

function nextGameRound() {
  gamePhase = "show";
  const digits = Math.min(2 + Math.floor(gameScore / 3), 6);
  gameCurrentNumber = Math.floor(Math.random() * Math.pow(10, digits));
  const numEl = document.getElementById("gameNumber");
  numEl.textContent = gameCurrentNumber;
  numEl.style.color = "#4facfe";
  document.getElementById("gameInput").value = "";
  document.getElementById("gameInput").disabled = true;
  setTimeout(() => {
    numEl.textContent = "؟";
    numEl.style.color = "#aaa";
    document.getElementById("gameInput").disabled = false;
    document.getElementById("gameInput").focus();
    gamePhase = "input";
  }, 1500 + gameScore * 100);
}

function checkGameAnswer() {
  if(gamePhase !== "input") return;
  const answer = parseInt(document.getElementById("gameInput").value);
  const numEl = document.getElementById("gameNumber");
  if(answer === gameCurrentNumber) {
    gameScore++;
    document.getElementById("gameScore").textContent = "نقاط: " + gameScore;
    numEl.textContent = "✅";
    numEl.style.color = "#43e97b";
    setTimeout(nextGameRound, 800);
  } else {
    numEl.textContent = gameCurrentNumber;
    numEl.style.color = "#f44336";
    setTimeout(() => {
      toast("❌ انتهت اللعبة! نقاطك: " + gameScore, "#dc3545");
      // احفظ أعلى نقاط
      db.ref("players/"+playerUID+"/gameHighScore").once("value").then(snap => {
        const current = snap.val() || 0;
        if(gameScore > current) db.ref("players/"+playerUID).update({ gameHighScore: gameScore });
      });
      startGame();
    }, 1000);
  }
}
