const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Leads | Sell My RV Online</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#F6F1EA;--bg2:#EDE5D8;--ink:#1c1915;--mut:#6b6358;--acc:#9c6a34;--card:#fffdf9;--line:rgba(28,25,21,.14);--hero:#14110e;--heroink:#f2ebe0;--heroacc:#d09a5a}
@media (prefers-color-scheme:dark){:root{--bg:#14110e;--bg2:#1c1814;--ink:#f2ebe0;--mut:#a89d8e;--acc:#d09a5a;--card:#1f1b16;--line:rgba(242,235,224,.16)}}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.5 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:400;margin:0;letter-spacing:-.02em}
em{font-style:italic;color:var(--acc)}
a{color:inherit}
.wrap{max-width:960px;margin:0 auto;padding:0 20px}
header{background:var(--hero);color:var(--heroink)}
header .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:12px}
.logo{font-family:Fraunces,Georgia,serif;font-size:19px;font-weight:600}.logo em{color:var(--heroacc);font-weight:400}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 18px;border-radius:99px;font:600 14px Inter,sans-serif;border:1px solid var(--ink);background:var(--ink);color:var(--bg);cursor:pointer}
.btn.ghost{background:transparent;color:inherit;border-color:var(--line)}
header .btn.ghost{color:var(--heroink);border-color:rgba(242,235,224,.3)}
.btn:disabled{opacity:.6;cursor:wait}
#login{max-width:420px;margin:12vh auto;padding:0 20px}
#login h1{font-size:38px;margin-bottom:8px}
#login p{color:var(--mut);margin:0 0 20px}
input,select{width:100%;padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-size:16px}
input:focus,select:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 3px color-mix(in srgb,var(--acc) 22%,transparent)}
#login .btn{width:100%;margin-top:12px;padding:14px}
.rem{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:14px;color:var(--mut);cursor:pointer}
.rem input{width:auto;margin:0;accent-color:var(--acc)}
.err{color:#c0392b;font-size:14px;margin-top:10px;min-height:20px}
#app{display:none}
.bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:28px 0 18px}
.bar h2{font-size:32px}
.tabs{display:flex;flex-wrap:wrap;gap:8px}
.tab{padding:8px 16px;border-radius:99px;border:1px solid var(--line);background:transparent;color:var(--ink);font:500 14px Inter,sans-serif;cursor:pointer}
.tab.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.lead{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px 22px;margin-bottom:12px}
.top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:flex-start}
.lead h3{font-size:24px}
.when{color:var(--mut);font-size:13px}
.rv{font-size:17px;font-weight:600;margin:10px 0 2px}
.meta{color:var(--mut);font-size:14px}
.contact{display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:12px;font-size:15px}
.contact a{color:var(--acc);font-weight:600;text-decoration:none}
.contact a:hover{text-decoration:underline}
.note{margin:12px 0 0;padding:10px 12px;background:var(--bg2);border-radius:10px;font-size:14px;white-space:pre-wrap}
.actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
.actions select{width:auto;padding:9px 12px;font-size:14px}
.photo img{display:block;max-width:100%;max-height:420px;border-radius:12px;margin-top:12px}
.empty{text-align:center;color:var(--mut);padding:60px 0}
.more{text-align:center;padding:12px 0 48px}
.apibox{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:0 22px;margin-bottom:18px}
.apibox summary{cursor:pointer;padding:16px 0;font:600 15px Inter,sans-serif;list-style:none}
.apibox summary::-webkit-details-marker{display:none}
.apibox summary::after{content:"+";float:right;color:var(--acc);font-size:20px;line-height:1}
.apibox[open] summary::after{content:"\\2212"}
.apibox .kv{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:0 0 12px}
.apibox .kv>span{flex:0 0 80px;font-size:13px;color:var(--mut)}
.apibox code{flex:1 1 220px;min-width:0;padding:9px 12px;border-radius:10px;background:var(--bg2);font:500 13px ui-monospace,Menlo,monospace;overflow-wrap:anywhere}
.apibox .btn{padding:8px 14px;font-size:13px}
.apibox p,.apibox li{font-size:13px;color:var(--mut);margin:0 0 8px}
.apibox ul{margin:0 0 16px;padding-left:18px}
.apibox li code,.apibox p code{display:inline;padding:1px 6px;font-size:12px}
.badge{display:inline-block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding:3px 10px;border-radius:99px;border:1px solid var(--line);color:var(--mut)}
.badge.new{background:var(--acc);border-color:var(--acc);color:#fff}
</style>
</head>
<body>
<header><div class="wrap"><span class="logo">Sell My <em>RV</em> Online</span><button class="btn ghost" id="out" style="display:none">Sign out</button></div></header>

<div id="login">
  <h1>Leads <em>admin</em></h1>
  <p>Enter your access token to view the leads. Tick the box below to stay signed in on this device.</p>
  <form id="lf"><input id="tok" type="password" placeholder="Access token" autocomplete="current-password" required>
  <label class="rem"><input type="checkbox" id="rem"> Remember me on this device</label>
  <button class="btn" type="submit" id="lb">Sign in</button>
  <div class="err" id="le" role="alert"></div></form>
</div>

<div id="app"><div class="wrap">
  <div class="bar"><h2>Leads <em id="count"></em></h2><button class="btn ghost" id="rf">Refresh</button></div>
  <details class="apibox" id="apibox"><summary>API access</summary>
    <div class="kv"><span>Base URL</span><code id="apiurl"></code><button class="btn ghost" id="cpurl" type="button">Copy</button></div>
    <div class="kv"><span>API key</span><code id="apikey"></code><button class="btn ghost" id="keyshow" type="button">Show</button><button class="btn ghost" id="cpkey" type="button">Copy</button></div>
    <p>Send the key with every request as the header <code>Authorization: Bearer YOUR_KEY</code>. Anyone with this key can read, edit and delete every lead, so keep it on a server and never in public page code.</p>
    <ul>
      <li><code>GET /api/leads</code> list (<code>?status=new&amp;limit=50&amp;before=DATE</code>)</li>
      <li><code>GET /api/leads/ID</code> one lead</li>
      <li><code>PATCH /api/leads/ID</code> edit (JSON: status, year, make, model, mileage, comments, name, phone, email, zip)</li>
      <li><code>DELETE /api/leads/ID</code> delete a lead and its photo</li>
      <li><code>GET /api/photos/PHOTO_KEY</code> photo (needs the key)</li>
    </ul>
    <p>To call the API from another website's browser code, add that site's address to the <code>ALLOWED_ORIGINS</code> variable in Cloudflare Pages. To get each new lead pushed to another site, set <code>WEBHOOK_URL</code> (and optionally <code>WEBHOOK_SECRET</code>).</p>
  </details>
  <div class="tabs" id="tabs"></div>
  <div style="height:16px"></div>
  <div id="list"></div>
  <div class="more"><button class="btn ghost" id="more" style="display:none">Load more</button></div>
</div></div>

<script>
var STATUSES=['new','contacted','offer','closed'];
var LABEL={all:'All','new':'New',contacted:'Contacted',offer:'Offer',closed:'Closed'};
var token='',filter='all',leads=[],lastBefore=null;
try{token=localStorage.getItem('rvtoken')||sessionStorage.getItem('rvtoken')||''}catch(e){}
var $=function(id){return document.getElementById(id)};
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
function api(path,opts){opts=opts||{};opts.headers=Object.assign({authorization:'Bearer '+token},opts.headers||{});return fetch(path,opts)}
function masked(){return token?'\u2022'.repeat(Math.min(token.length,24)):''}
var keyShown=false;
function paintKey(){$('apikey').textContent=keyShown?token:masked();$('keyshow').textContent=keyShown?'Hide':'Show'}
function copyText(t,btn){var done=function(){var o=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=o},1200)};
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){})}else{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done()}catch(e){}document.body.removeChild(ta)}}
$('apiurl').textContent=location.origin;
$('cpurl').onclick=function(){copyText(location.origin,this)};
$('keyshow').onclick=function(){keyShown=!keyShown;paintKey()};
$('cpkey').onclick=function(){copyText(token,this)};
function showApp(on){if(on){keyShown=false;paintKey()}$('login').style.display=on?'none':'block';$('app').style.display=on?'block':'none';$('out').style.display=on?'inline-flex':'none'}
function signOut(){token='';try{sessionStorage.removeItem('rvtoken');localStorage.removeItem('rvtoken')}catch(e){}leads=[];showApp(false);$('tok').value=''}

function buildTabs(){var t=$('tabs');t.innerHTML='';['all'].concat(STATUSES).forEach(function(s){var b=el('button','tab'+(s===filter?' on':''),LABEL[s]);b.onclick=function(){filter=s;buildTabs();load(true)};t.appendChild(b)})}

function load(reset){
  if(reset){leads=[];lastBefore=null}
  var q='?limit=50';if(filter!=='all')q+='&status='+filter;if(lastBefore)q+='&before='+encodeURIComponent(lastBefore);
  return api('/api/leads'+q).then(function(r){
    if(r.status===401){signOut();$('le').textContent='Invalid token.';throw new Error('401')}
    if(!r.ok)throw new Error('Request failed');
    return r.json();
  }).then(function(j){
    leads=leads.concat(j.leads);
    lastBefore=j.leads.length?j.leads[j.leads.length-1].created_at:lastBefore;
    $('more').style.display=j.leads.length===50?'inline-flex':'none';
    render();
  });
}

function render(){
  var list=$('list');list.innerHTML='';
  $('count').textContent=leads.length?'('+leads.length+(leads.length%50===0?'+':'')+')':'';
  if(!leads.length){list.appendChild(el('div','empty','No leads here yet.'));return}
  leads.forEach(function(l){list.appendChild(card(l))});
}

function card(l){
  var c=el('div','lead');
  var top=el('div','top');
  var left=el('div');left.appendChild(el('h3','',l.name));
  left.appendChild(el('div','when',new Date(l.created_at).toLocaleString()));
  top.appendChild(left);
  top.appendChild(el('span','badge '+l.status,LABEL[l.status]||l.status));
  c.appendChild(top);
  c.appendChild(el('div','rv',[l.year,l.make,l.model].join(' ')));
  c.appendChild(el('div','meta',(l.mileage?l.mileage+' miles · ':'')+'ZIP '+l.zip));
  var ct=el('div','contact');
  var tel=el('a','',l.phone);tel.href='tel:'+l.phone.replace(/[^0-9+]/g,'');ct.appendChild(tel);
  var ml=el('a','',l.email);ml.href='mailto:'+encodeURI(l.email);ct.appendChild(ml);
  c.appendChild(ct);
  if(l.comments)c.appendChild(el('div','note',l.comments));
  var ac=el('div','actions');
  var sel=document.createElement('select');
  STATUSES.forEach(function(s){var o=el('option','',LABEL[s]);o.value=s;if(s===l.status)o.selected=true;sel.appendChild(o)});
  sel.onchange=function(){setStatus(l,sel.value,sel)};
  ac.appendChild(sel);
  var ph=el('div','photo');
  if(l.photo_keys&&l.photo_keys.length){
    var pb=el('button','btn ghost','View photo');
    pb.onclick=function(){pb.disabled=true;pb.textContent='Loading...';
      api('/api/photos/'+l.photo_keys[0]).then(function(r){if(!r.ok)throw new Error();return r.blob()}).then(function(b){
        var im=document.createElement('img');im.alt='Photo submitted for '+l.name;im.src=URL.createObjectURL(b);ph.appendChild(im);pb.remove();
      }).catch(function(){pb.disabled=false;pb.textContent='Photo failed, retry'})};
    ac.appendChild(pb);
  }
  c.appendChild(ac);c.appendChild(ph);
  return c;
}

function setStatus(l,s,sel){
  var prev=l.status;
  api('/api/leads/'+l.id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status:s})}).then(function(r){
    if(!r.ok)throw new Error();l.status=s;
    if(filter!=='all'&&s!==filter){leads=leads.filter(function(x){return x.id!==l.id})}
    render();
  }).catch(function(){sel.value=prev;alert('Could not update the status. Try again.')});
}

$('lf').onsubmit=function(e){
  e.preventDefault();token=$('tok').value.trim();$('le').textContent='';$('lb').disabled=true;
  load(true).then(function(){try{var keep=$('rem').checked;sessionStorage.removeItem('rvtoken');localStorage.removeItem('rvtoken');(keep?localStorage:sessionStorage).setItem('rvtoken',token)}catch(x){}showApp(true)}).catch(function(x){if(x.message!=='401')$('le').textContent='Something went wrong. Try again.'}).then(function(){$('lb').disabled=false});
};
$('out').onclick=signOut;
$('rf').onclick=function(){load(true)};
$('more').onclick=function(){load(false)};
buildTabs();
if(token){load(true).then(function(){showApp(true)}).catch(function(){})}
</script>
</body>
</html>
`;

const MAX_PHOTO = 8 * 1024 * 1024;
const STATUSES = ['new', 'contacted', 'offer', 'closed'];
// Fields an API client may edit (column name -> max length); same limits as the form.
const EDITABLE = { year: 10, make: 60, model: 80, mileage: 20, comments: 2000, name: 100, phone: 30, email: 120, zip: 12 };
const REQUIRED = ['year', 'make', 'model', 'name', 'phone', 'email', 'zip'];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

const clean = (v, max) => String(v ?? '').trim().slice(0, max);

async function authorized(request, env) {
  if (!env.API_TOKEN) return false;
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(given)),
    crypto.subtle.digest('SHA-256', enc.encode(env.API_TOKEN)),
  ]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function createLead(request, env, ctx) {
  let form;
  try { form = await request.formData(); } catch { return json({ error: 'Invalid form data' }, 400); }

  // Honeypot: bots fill the hidden field; pretend success.
  if (clean(form.get('website'), 100)) return json({ ok: true });

  const lead = {
    year: clean(form.get('year'), 10),
    make: clean(form.get('make'), 60),
    model: clean(form.get('model'), 80),
    mileage: clean(form.get('mi'), 20),
    comments: clean(form.get('c'), 2000),
    name: clean(form.get('name'), 100),
    phone: clean(form.get('tel'), 30),
    email: clean(form.get('email'), 120),
    zip: clean(form.get('zip'), 12),
  };
  const missing = ['year', 'make', 'model', 'name', 'phone', 'email', 'zip'].filter((k) => !lead[k]);
  if (missing.length) return json({ error: 'Missing required fields' }, 400);
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) return json({ error: 'Invalid email' }, 400);

  const id = crypto.randomUUID();
  let photoKeys = [];
  const photo = form.get('photo');
  if (photo && typeof photo === 'object' && photo.size > 0) {
    if (!photo.type.startsWith('image/')) return json({ error: 'Photo must be an image' }, 400);
    if (photo.size > MAX_PHOTO) return json({ error: 'Photo is too large (max 8 MB)' }, 400);
    const key = `leads/${id}/photo-1`;
    await env.PHOTOS.put(key, photo.stream(), { httpMetadata: { contentType: photo.type } });
    photoKeys = [key];
  }

  const createdAt = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO leads (id, created_at, status, year, make, model, mileage, comments, name, phone, email, zip, photo_keys)
     VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, createdAt, lead.year, lead.make, lead.model, lead.mileage, lead.comments,
         lead.name, lead.phone, lead.email, lead.zip, JSON.stringify(photoKeys)).run();

  // Optional push to another service (e.g. the other Cloudflare site). The lead is already saved.
  if (env.WEBHOOK_URL) {
    const payload = { id, created_at: createdAt, status: 'new', ...lead, photo_keys: photoKeys };
    ctx.waitUntil(
      fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${env.WEBHOOK_SECRET || ''}` },
        body: JSON.stringify(payload),
      }).catch(() => {})
    );
  }
  return json({ ok: true, id }, 201);
}

// ---------- myCROI contact form ----------
const CONTACT_FIELDS = { name: 100, business: 120, email: 120, phone: 30, trade: 60, plan: 30, message: 2000 };
const CONTACTS_TABLE = `CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT, business TEXT, email TEXT, phone TEXT,
  trade TEXT, plan TEXT, message TEXT, sms INTEGER DEFAULT 0)`;

async function createContact(request, env, ctx) {
  let body;
  try {
    const type = request.headers.get('content-type') || '';
    body = type.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch { return json({ error: 'Invalid request' }, 400); }

  // Honeypot: bots fill the hidden field; pretend success.
  if (clean(body.website, 100)) return json({ ok: true });

  const c = {};
  for (const [k, max] of Object.entries(CONTACT_FIELDS)) c[k] = clean(body[k], max);
  if (!c.name || !c.business || !c.email) return json({ error: 'Missing required fields' }, 400);
  if (!/^\S+@\S+\.\S+$/.test(c.email)) return json({ error: 'Invalid email' }, 400);
  const sms = body.sms === true || body.sms === 'on' || body.sms === '1' ? 1 : 0;

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await env.DB.prepare(CONTACTS_TABLE).run();
  await env.DB.prepare(
    `INSERT INTO contacts (id, created_at, name, business, email, phone, trade, plan, message, sms)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, createdAt, c.name, c.business, c.email, c.phone, c.trade, c.plan, c.message, sms).run();

  if (env.WEBHOOK_URL) {
    ctx.waitUntil(
      fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${env.WEBHOOK_SECRET || ''}` },
        body: JSON.stringify({ type: 'contact', id, created_at: createdAt, ...c, sms }),
      }).catch(() => {})
    );
  }
  return json({ ok: true, id }, 201);
}

async function listContacts(url, env) {
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 200);
  await env.DB.prepare(CONTACTS_TABLE).run();
  const { results } = await env.DB.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT ?').bind(limit).all();
  return json({ contacts: results });
}

async function listLeads(url, env) {
  const status = url.searchParams.get('status');
  const before = url.searchParams.get('before');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 200);
  const where = [], args = [];
  if (status && STATUSES.includes(status)) { where.push('status = ?'); args.push(status); }
  if (before) { where.push('created_at < ?'); args.push(before); }
  const sql = `SELECT * FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT ?`;
  const { results } = await env.DB.prepare(sql).bind(...args, limit).all();
  return json({ leads: results.map((r) => ({ ...r, photo_keys: JSON.parse(r.photo_keys || '[]') })) });
}

async function api(request, env, ctx, url) {
  const { pathname } = url;
  if (pathname === '/api/lead' && request.method === 'POST') return createLead(request, env, ctx);
  if (pathname === '/api/contact' && request.method === 'POST') return createContact(request, env, ctx);

  if (!(await authorized(request, env))) return json({ error: 'Unauthorized' }, 401);

  if (pathname === '/api/leads' && request.method === 'GET') return listLeads(url, env);
  if (pathname === '/api/contacts' && request.method === 'GET') return listContacts(url, env);

  const lead = pathname.match(/^\/api\/leads\/([\w-]+)$/);
  if (lead && request.method === 'GET') {
    const r = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(lead[1]).first();
    return r ? json({ ...r, photo_keys: JSON.parse(r.photo_keys || '[]') }) : json({ error: 'Not found' }, 404);
  }
  if (lead && request.method === 'PATCH') {
    const body = await request.json().catch(() => ({}));
    const set = [], args = [];
    if ('status' in body) {
      if (!STATUSES.includes(body.status)) return json({ error: 'Invalid status' }, 400);
      set.push('status = ?'); args.push(body.status);
    }
    for (const [key, max] of Object.entries(EDITABLE)) {
      if (!(key in body)) continue;
      const v = clean(body[key], max);
      if (REQUIRED.includes(key) && !v) return json({ error: `${key} cannot be empty` }, 400);
      if (key === 'email' && !/^\S+@\S+\.\S+$/.test(v)) return json({ error: 'Invalid email' }, 400);
      set.push(`${key} = ?`); args.push(v);
    }
    if (!set.length) return json({ error: 'Nothing to update' }, 400);
    const r = await env.DB.prepare(`UPDATE leads SET ${set.join(', ')} WHERE id = ?`).bind(...args, lead[1]).run();
    return r.meta.changes ? json({ ok: true }) : json({ error: 'Not found' }, 404);
  }
  if (lead && request.method === 'DELETE') {
    const r = await env.DB.prepare('SELECT photo_keys FROM leads WHERE id = ?').bind(lead[1]).first();
    if (!r) return json({ error: 'Not found' }, 404);
    const keys = JSON.parse(r.photo_keys || '[]');
    if (keys.length) await env.PHOTOS.delete(keys);
    await env.DB.prepare('DELETE FROM leads WHERE id = ?').bind(lead[1]).run();
    return json({ ok: true });
  }

  const photo = pathname.match(/^\/api\/photos\/(leads\/[\w-]+\/photo-\d+)$/);
  if (photo && request.method === 'GET') {
    const obj = await env.PHOTOS.get(photo[1]);
    if (!obj) return json({ error: 'Not found' }, 404);
    return new Response(obj.body, { headers: { 'content-type': obj.httpMetadata?.contentType || 'application/octet-stream' } });
  }
  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // Browsers on other sites may call the API only from origins listed in ALLOWED_ORIGINS (comma-separated).
      const origin = request.headers.get('origin');
      const allowed = origin && (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean).includes(origin);
      const withCors = (res) => {
        if (!allowed) return res;
        const h = new Headers(res.headers);
        h.set('access-control-allow-origin', origin);
        h.set('access-control-allow-methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        h.set('access-control-allow-headers', 'authorization, content-type');
        h.set('access-control-max-age', '86400');
        h.append('vary', 'Origin');
        return new Response(res.body, { status: res.status, headers: h });
      };
      if (request.method === 'OPTIONS') return withCors(new Response(null, { status: allowed ? 204 : 403 }));
      try { return withCors(await api(request, env, ctx, url)); }
      catch (e) { console.error(e); return withCors(json({ error: 'Server error' }, 500)); }
    }
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      return new Response(adminHtml, {
        headers: { 'content-type': 'text/html;charset=UTF-8', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' },
      });
    }
    // Everything else (the myCROI site in /public) is served as static assets.
    return env.ASSETS.fetch(request);
  },
};
