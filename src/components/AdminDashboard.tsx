import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type Section = 'overview' | 'restaurant' | 'menu' | 'rooms' | 'room-bookings' | 'orders';
type RestaurantTab = 'information' | 'hours' | 'zones' | 'landmarks';
type MenuTab = 'categories' | 'items';
type RoomTab = 'rooms' | 'images';

const inputClass = 'w-full rounded-xl border border-[#dec0b5] bg-white px-3 py-2.5 text-sm text-[#181d1a] outline-none focus:border-[#9f3e07]';
const cardClass = 'rounded-2xl border border-[#dec0b5]/70 bg-white p-5 shadow-sm';

function Field({label, value, onChange, type='text', placeholder='' }: {label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string}) {
  return <label className="block space-y-1.5"><span className="text-xs font-bold text-[#57423a]">{label}</span><input className={inputClass} type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} /></label>;
}

function TextAreaField({label, value, onChange}: {label:string; value:string; onChange:(v:string)=>void}) {
  return <label className="block space-y-1.5"><span className="text-xs font-bold text-[#57423a]">{label}</span><textarea className={inputClass+' min-h-24 resize-y'} value={value} onChange={e=>onChange(e.target.value)} /></label>;
}

function Button({children, onClick, tone='primary', type='button'}: {children:React.ReactNode; onClick?:()=>void; tone?:'primary'|'soft'|'danger'|'dark'; type?:'button'|'submit'}) {
  const tones = {primary:'bg-[#9f3e07] text-white hover:bg-[#7d2d00]',soft:'bg-[#f0f5f0] text-[#36684c] hover:bg-[#e5e9e4]',danger:'bg-[#ba1a1a] text-white hover:bg-[#93000a]',dark:'bg-[#1e2420] text-white hover:bg-[#2c322e]'};
  return <button type={type} onClick={onClick} className={'rounded-xl px-4 py-2.5 text-sm font-bold transition '+tones[tone]}>{children}</button>;
}

function Toggle({checked,onChange}:{checked:boolean;onChange:(v:boolean)=>void}) {
  return <button type="button" onClick={()=>onChange(!checked)} className={'relative h-7 w-12 rounded-full transition '+(checked?'bg-[#36684c]':'bg-[#c9cfca]')}><span className={'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition '+(checked?'left-6':'left-1')}/></button>;
}

export const AdminDashboard: React.FC<{onExit:()=>void}> = ({onExit}) => {
  const [section,setSection] = useState<Section>('overview');
  const [restaurantTab,setRestaurantTab] = useState<RestaurantTab>('information');
  const [menuTab,setMenuTab] = useState<MenuTab>('items');
  const [roomTab,setRoomTab] = useState<RoomTab>('rooms');
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(true);

  const [settings,setSettings] = useState<any>(null);
  const [hours,setHours] = useState<any[]>([]);
  const [zones,setZones] = useState<any[]>([]);
  const [landmarks,setLandmarks] = useState<any[]>([]);
  const [categories,setCategories] = useState<any[]>([]);
  const [items,setItems] = useState<any[]>([]);
  const [rooms,setRooms] = useState<any[]>([]);
  const [roomImages,setRoomImages] = useState<any[]>([]);
  const [orders,setOrders] = useState<any[]>([]);
  const [reservations,setReservations] = useState<any[]>([]);
  const [roomBookings,setRoomBookings] = useState<any[]>([]);

  const [editingItem,setEditingItem] = useState<any>(null);
  const [editingCategory,setEditingCategory] = useState<any>(null);
  const [editingRoom,setEditingRoom] = useState<any>(null);
  const [editingHour,setEditingHour] = useState<any>(null);
  const [editingZone,setEditingZone] = useState<any>(null);
  const [editingLandmark,setEditingLandmark] = useState<any>(null);
  const [newImage,setNewImage] = useState({roomId:'',url:''});

  const flash = (text:string) => { setMessage(text); window.setTimeout(()=>setMessage(''),2500); };

  const loadAll = async () => {
    setLoading(true);
    const results = await Promise.all([
      supabase.from('restaurant_settings').select('*').limit(1).maybeSingle(),
      supabase.from('restaurant_hours').select('*').order('sort_order'),
      supabase.from('delivery_zones').select('*').order('sort_order'),
      supabase.from('landmarks').select('*').order('sort_order'),
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
      supabase.from('rooms').select('*').order('sort_order'),
      supabase.from('room_images').select('*').order('sort_order'),
      supabase.from('orders').select('*').order('created_at',{ascending:false}).limit(100),
      supabase.from('restaurant_reservations').select('*').order('created_at',{ascending:false}).limit(100),
      supabase.from('room_bookings').select('*').order('created_at',{ascending:false}).limit(100)
    ]);
    const [s,h,z,l,c,i,r,ri,o,res,rb] = results;
    if (s.error) flash(s.error.message);
    setSettings(s.data);
    setHours(h.data||[]); setZones(z.data||[]); setLandmarks(l.data||[]);
    setCategories(c.data||[]); setItems(i.data||[]); setRooms(r.data||[]);
    setRoomImages(ri.data||[]); setOrders(o.data||[]); setReservations(res.data||[]); setRoomBookings(rb.data||[]);
    setLoading(false);
  };

  useEffect(()=>{loadAll();},[]);

  const stats = useMemo(()=>({
    todayOrders: orders.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString()).length,
    reservations: reservations.filter(r=>['pending','confirmed'].includes(r.status)).length,
    roomBookings: roomBookings.filter(r=>['pending','confirmed'].includes(r.status)).length,
    revenue: orders.filter(o=>o.status!=='cancelled').reduce((n,o)=>n+Number(o.total||0),0)
  }),[orders,reservations,roomBookings]);

  const saveSettings = async () => {
    if (!settings) return;
    const {error}=await supabase.from('restaurant_settings').update({
      name:settings.name,full_name:settings.full_name,city:settings.city,region:settings.region,address:settings.address,
      phone:settings.phone,phone_raw:settings.phone_raw,whatsapp:settings.whatsapp,email:settings.email,
      facebook_url:settings.facebook_url,tiktok_url:settings.tiktok_url,instagram_url:settings.instagram_url,
      hours_today:settings.hours_today,bbq_ignite_time:settings.bbq_ignite_time,kitchen_close_time:settings.kitchen_close_time,
      google_maps_url:settings.google_maps_url,cash_notice:settings.cash_notice,images:settings.images
    }).eq('id',settings.id);
    if(error) flash(error.message); else flash('Restaurant information saved.');
  };

  const save = async (table:string,id:string,payload:any,success:string) => {
    const {error}=await supabase.from(table).update(payload).eq('id',id);
    if(error) flash(error.message); else {flash(success); await loadAll();}
  };

  const remove = async (table:string,id:string,success:string) => {
    if(!window.confirm('Delete this record?')) return;
    const {error}=await supabase.from(table).delete().eq('id',id);
    if(error) flash(error.message); else {flash(success); await loadAll();}
  };

  const saveItem = async (e:React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title:editingItem.title, subtitle:editingItem.subtitle||null, category_id:editingItem.category_id||null,
      price:Number(editingItem.price)||0, unit:editingItem.unit||null, description:editingItem.description||null,
      image_url:editingItem.image_url||null, badge:editingItem.badge||null, badge_type:editingItem.badge_type||null,
      tag:editingItem.tag||null, tags:Array.isArray(editingItem.tags)?editingItem.tags:String(editingItem.tags||'').split(',').map((x:string)=>x.trim()).filter(Boolean),
      spice_level:editingItem.spice_level||null, featured:Boolean(editingItem.featured), is_available:Boolean(editingItem.is_available)
    };
    let result;
    if(editingItem.id) result=await supabase.from('menu_items').update(payload).eq('id',editingItem.id);
    else result=await supabase.from('menu_items').insert({...payload,id:'menu-'+crypto.randomUUID()});
    if(result.error) flash(result.error.message); else {setEditingItem(null);flash('Menu item saved.');await loadAll();}
  };

  const addCategory = async () => {
    const name=window.prompt('Category name');
    if(!name?.trim()) return;
    const slug=name.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const {error}=await supabase.from('menu_categories').insert({name:name.trim(),slug,sort_order:categories.length});
    if(error) flash(error.message); else {flash('Category added.');await loadAll();}
  };

  const saveCategory = async () => {
    if(!editingCategory) return;
    await save('menu_categories',editingCategory.id,{name:editingCategory.name,slug:editingCategory.slug,sort_order:Number(editingCategory.sort_order)||0},'Category saved.');
    setEditingCategory(null);
  };

  const saveRoom = async () => {
    if(!editingRoom) return;
    await save('rooms',editingRoom.id,{
      name:editingRoom.name,tagline:editingRoom.tagline,badge:editingRoom.badge,price_per_night:Number(editingRoom.price_per_night)||0,
      capacity:editingRoom.capacity,bed_type:editingRoom.bed_type,size_sq_ft:Number(editingRoom.size_sq_ft)||0,image_url:editingRoom.image_url,
      description:editingRoom.description,amenities:Array.isArray(editingRoom.amenities)?editingRoom.amenities:String(editingRoom.amenities||'').split(',').map((x:string)=>x.trim()).filter(Boolean),
      is_available:Boolean(editingRoom.is_available)
    },'Room saved.');
    setEditingRoom(null);
  };

  const addRoom = async () => {
    const name=window.prompt('Room name');
    if(!name?.trim()) return;
    const {error}=await supabase.from('rooms').insert({id:'room-'+crypto.randomUUID(),name:name.trim(),price_per_night:0,amenities:[],is_available:true,sort_order:rooms.length});
    if(error) flash(error.message); else {flash('Room added.');await loadAll();}
  };

  const addImage = async () => {
    if(!newImage.roomId || !newImage.url.trim()) return;
    const {error}=await supabase.from('room_images').insert({room_id:newImage.roomId,image_url:newImage.url.trim(),sort_order:roomImages.filter(x=>x.room_id===newImage.roomId).length});
    if(error) flash(error.message); else {setNewImage({roomId:'',url:''});flash('Room image added.');await loadAll();}
  };

  const saveHour = async () => {
    if(!editingHour) return;
    await save('restaurant_hours',editingHour.id,{day:editingHour.day,hours:editingHour.hours,is_current:Boolean(editingHour.is_current),sort_order:Number(editingHour.sort_order)||0},'Opening hours saved.');
    setEditingHour(null);
  };
  const saveZone = async () => {
    if(!editingZone) return;
    await save('delivery_zones',editingZone.id,{name:editingZone.name,estimated_time:editingZone.estimated_time,fee:Number(editingZone.fee)||0,is_active:Boolean(editingZone.is_active),sort_order:Number(editingZone.sort_order)||0},'Delivery zone saved.');
    setEditingZone(null);
  };
  const saveLandmark = async () => {
    if(!editingLandmark) return;
    await save('landmarks',editingLandmark.id,{name:editingLandmark.name,description:editingLandmark.description,distance:editingLandmark.distance,icon:editingLandmark.icon,sort_order:Number(editingLandmark.sort_order)||0},'Landmark saved.');
    setEditingLandmark(null);
  };

  const changeOrderStatus = async (id:string,status:string) => {
    await save('orders',id,{status},'Order status updated.');
  };

  const changeRoomBookingStatus = async (id:string,status:'confirmed'|'cancelled') => {
    const {error}=await supabase.from('room_bookings').update({status,updated_at:new Date().toISOString()}).eq('id',id);
    if(error) flash(error.message);
    else {
      flash(status==='confirmed'?'Room booking accepted.':'Room booking cancelled.');
      await loadAll();
    }
  };

  const nav = [
    ['overview','Overview','dashboard'],
    ['restaurant','Restaurant','restaurant'],
    ['menu','Menu','menu_book'],
    ['rooms','Rooms','hotel'],
    ['room-bookings','Room Bookings','event_available'],
    ['orders','Orders','receipt_long']
  ] as const;

  if(loading) return <div className="min-h-screen bg-[#f6fbf5] flex items-center justify-center"><div className="text-center"><div className="text-3xl text-[#9f3e07] mb-3">✦</div><p className="text-sm font-semibold text-[#57423a]">Loading admin dashboard...</p></div></div>;

  return <div className="min-h-screen bg-[#f6fbf5] text-[#181d1a]">
    <header className="sticky top-0 z-30 border-b border-[#dec0b5]/70 bg-[#f6fbf5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9f3e07]">Paradise Hotel & Restaurant</p><h1 className="font-headline-sm">Admin Dashboard</h1></div>
        <div className="flex items-center gap-2"><Button tone="soft" onClick={onExit}>View Website</Button><Button tone="dark" onClick={()=>supabase.auth.signOut().then(onExit)}>Logout</Button></div>
      </div>
    </header>
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
      <aside className="lg:w-56 shrink-0"><nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {nav.map(([id,label,icon])=><button key={id} onClick={()=>setSection(id)} className={'flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold '+(section===id?'bg-[#9f3e07] text-white':'bg-white text-[#57423a] border border-[#dec0b5]/70 hover:bg-[#f0f5f0]')}><span className="material-symbols-outlined text-[19px]">{icon}</span>{label}</button>)}
      </nav></aside>
      <main className="min-w-0 flex-1">
        {message && <div className="mb-4 rounded-xl border border-[#b8efcc] bg-[#e8f8ed] px-4 py-3 text-sm font-semibold text-[#1d5036]">{message}</div>}

        {section==='overview' && <section className="space-y-6">
          <div><h2 className="font-headline-md">Overview</h2><p className="mt-1 text-sm text-[#57423a]">A quick view of restaurant activity. No spreadsheet archaeology required.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[['Today\'s orders',stats.todayOrders,'receipt_long'],['Reservations',stats.reservations,'event_seat'],['Room bookings',stats.roomBookings,'hotel'],['Order value',`PKR ${stats.revenue.toLocaleString()}`,'payments']].map(([label,value,icon])=><div className={cardClass} key={String(label)}><span className="material-symbols-outlined text-[#9f3e07]">{icon}</span><p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#8a7268]">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>)}
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className={cardClass}><div className="flex justify-between"><h3 className="font-title-lg">Recent orders</h3><Button tone="soft" onClick={()=>setSection('orders')}>View all</Button></div><div className="mt-4 space-y-3">{orders.slice(0,5).map(o=><div key={o.id} className="flex items-center justify-between border-b border-[#dec0b5]/50 pb-3 text-sm"><div><p className="font-bold">{o.guest_name||'Guest'}</p><p className="text-xs text-[#8a7268]">{o.mode} · {new Date(o.created_at).toLocaleString()}</p></div><span className="font-bold text-[#9f3e07]">PKR {Number(o.total).toLocaleString()}</span></div>)}{!orders.length&&<p className="text-sm text-[#8a7268]">No orders yet.</p>}</div></div>
            <div className={cardClass}><h3 className="font-title-lg">Pending activity</h3><div className="mt-4 space-y-3">{reservations.filter(x=>x.status==='pending').slice(0,4).map(x=><div key={x.id} className="rounded-xl bg-[#f0f5f0] p-3 text-sm"><b>Reservation</b> · {x.guest_name||'Guest'} · {x.time_slot||'No time'}</div>)}{roomBookings.filter(x=>x.status==='pending').slice(0,4).map(x=><div key={x.id} className="rounded-xl bg-[#fff4ef] p-3 text-sm"><b>Room booking</b> · {x.customer_name||'Guest'} · {x.check_in_date}</div>)}{!reservations.some(x=>x.status==='pending')&&!roomBookings.some(x=>x.status==='pending')&&<p className="text-sm text-[#8a7268]">Nothing pending.</p>}</div></div>
          </div>
        </section>}

        {section==='restaurant' && <section className="space-y-5">
          <div><h2 className="font-headline-md">Restaurant</h2><div className="mt-4 flex flex-wrap gap-2">{(['information','hours','zones','landmarks'] as RestaurantTab[]).map(t=><button key={t} onClick={()=>setRestaurantTab(t)} className={'rounded-full px-4 py-2 text-xs font-bold '+(restaurantTab===t?'bg-[#9f3e07] text-white':'bg-white border border-[#dec0b5] text-[#57423a]')}>{t[0].toUpperCase()+t.slice(1)}</button>)}</div></div>
          {restaurantTab==='information'&&settings&&<div className={cardClass}><div className="grid gap-4 md:grid-cols-2">{['name','full_name','city','region','address','phone','phone_raw','whatsapp','email','facebook_url','tiktok_url','instagram_url','hours_today','bbq_ignite_time','kitchen_close_time','google_maps_url','cash_notice'].map(k=><Field key={k} label={k.replaceAll('_',' ')} value={settings[k]||''} onChange={v=>setSettings({...settings,[k]:v})}/>)}</div><div className="mt-5 flex justify-end"><Button onClick={saveSettings}>Save Restaurant Information</Button></div></div>}
          {restaurantTab==='hours'&&<div className="space-y-3">{hours.map(h=>editingHour?.id===h.id?<div className={cardClass} key={h.id}><div className="grid gap-3 md:grid-cols-4"><Field label="Day" value={editingHour.day} onChange={v=>setEditingHour({...editingHour,day:v})}/><Field label="Hours" value={editingHour.hours} onChange={v=>setEditingHour({...editingHour,hours:v})}/><Field label="Sort order" value={String(editingHour.sort_order)} onChange={v=>setEditingHour({...editingHour,sort_order:v})} type="number"/><div className="flex items-end gap-2"><Button onClick={saveHour}>Save</Button><Button tone="soft" onClick={()=>setEditingHour(null)}>Cancel</Button></div></div></div>:<div className={cardClass} key={h.id}><div className="flex items-center justify-between gap-3"><div><p className="font-bold">{h.day}</p><p className="text-sm text-[#8a7268]">{h.hours}</p></div><div className="flex gap-2"><Button tone="soft" onClick={()=>setEditingHour({...h})}>Edit</Button></div></div></div>)}</div>}
          {restaurantTab==='zones'&&<div className="space-y-3">{zones.map(z=>editingZone?.id===z.id?<div className={cardClass} key={z.id}><div className="grid gap-3 md:grid-cols-5"><Field label="Name" value={editingZone.name} onChange={v=>setEditingZone({...editingZone,name:v})}/><Field label="Time" value={editingZone.estimated_time||''} onChange={v=>setEditingZone({...editingZone,estimated_time:v})}/><Field label="Fee" value={String(editingZone.fee)} onChange={v=>setEditingZone({...editingZone,fee:v})} type="number"/><div className="flex items-center gap-2 pt-6"><Toggle checked={editingZone.is_active} onChange={v=>setEditingZone({...editingZone,is_active:v})}/><span className="text-xs font-bold">Active</span></div><div className="flex items-end gap-2"><Button onClick={saveZone}>Save</Button><Button tone="soft" onClick={()=>setEditingZone(null)}>Cancel</Button></div></div></div>:<div className={cardClass} key={z.id}><div className="flex justify-between"><div><p className="font-bold">{z.name}</p><p className="text-sm text-[#8a7268]">{z.estimated_time} · PKR {Number(z.fee).toLocaleString()} · {z.is_active?'Active':'Off'}</p></div><Button tone="soft" onClick={()=>setEditingZone({...z})}>Edit</Button></div></div>)}</div>}
          {restaurantTab==='landmarks'&&<div className="space-y-3">{landmarks.map(l=>editingLandmark?.id===l.id?<div className={cardClass} key={l.id}><div className="grid gap-3 md:grid-cols-4"><Field label="Name" value={editingLandmark.name} onChange={v=>setEditingLandmark({...editingLandmark,name:v})}/><Field label="Distance" value={editingLandmark.distance||''} onChange={v=>setEditingLandmark({...editingLandmark,distance:v})}/><Field label="Icon" value={editingLandmark.icon||''} onChange={v=>setEditingLandmark({...editingLandmark,icon:v})}/><TextAreaField label="Description" value={editingLandmark.description||''} onChange={v=>setEditingLandmark({...editingLandmark,description:v})}/></div><div className="mt-3 flex justify-end gap-2"><Button onClick={saveLandmark}>Save</Button><Button tone="soft" onClick={()=>setEditingLandmark(null)}>Cancel</Button></div></div>:<div className={cardClass} key={l.id}><div className="flex justify-between"><div><p className="font-bold">{l.name}</p><p className="text-sm text-[#8a7268]">{l.distance} · {l.description}</p></div><Button tone="soft" onClick={()=>setEditingLandmark({...l})}>Edit</Button></div></div>)}</div>}
        </section>}

        {section==='menu'&&<section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-headline-md">Menu</h2><div className="mt-4 flex gap-2">{(['categories','items'] as MenuTab[]).map(t=><button key={t} onClick={()=>setMenuTab(t)} className={'rounded-full px-4 py-2 text-xs font-bold '+(menuTab===t?'bg-[#9f3e07] text-white':'bg-white border border-[#dec0b5] text-[#57423a]')}>{t==='items'?'Menu items':'Categories'}</button>)}</div></div>{menuTab==='categories'?<Button onClick={addCategory}>Add category</Button>:<Button onClick={()=>setEditingItem({title:'',subtitle:'',category_id:categories[0]?.id||'',price:0,unit:'',description:'',image_url:'',badge:'',badge_type:'',tag:'',tags:[],spice_level:'',featured:false,is_available:true})}>Add item</Button>}</div>
          {menuTab==='categories'&&<div className="space-y-3">{categories.map(c=>editingCategory?.id===c.id?<div className={cardClass} key={c.id}><div className="grid gap-3 md:grid-cols-3"><Field label="Name" value={editingCategory.name} onChange={v=>setEditingCategory({...editingCategory,name:v})}/><Field label="Slug" value={editingCategory.slug} onChange={v=>setEditingCategory({...editingCategory,slug:v})}/><Field label="Sort order" value={String(editingCategory.sort_order)} onChange={v=>setEditingCategory({...editingCategory,sort_order:v})} type="number"/></div><div className="mt-3 flex justify-end gap-2"><Button onClick={saveCategory}>Save</Button><Button tone="soft" onClick={()=>setEditingCategory(null)}>Cancel</Button></div></div>:<div className={cardClass} key={c.id}><div className="flex justify-between"><div><p className="font-bold">{c.name}</p><p className="text-xs text-[#8a7268]">{c.slug}</p></div><div className="flex gap-2"><Button tone="soft" onClick={()=>setEditingCategory({...c})}>Edit</Button><Button tone="danger" onClick={()=>remove('menu_categories',c.id,'Category deleted.')}>Delete</Button></div></div></div>)}</div>}
          {menuTab==='items'&&<div className="space-y-3">{items.map(item=><div className={cardClass} key={item.id}><div className="flex flex-col gap-4 md:flex-row md:items-center"><div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f0f5f0]">{item.image_url&&<img src={item.image_url} className="h-full w-full object-cover" alt="" />}</div><div className="min-w-0 flex-1"><p className="font-bold">{item.title}</p><p className="text-sm text-[#8a7268]">PKR {Number(item.price).toLocaleString()} · {categories.find(c=>c.id===item.category_id)?.name||'Uncategorized'}</p></div><div className="flex items-center gap-2"><Toggle checked={item.is_available} onChange={v=>save('menu_items',item.id,{is_available:v},v?'Item available.':'Item turned off.')}/><span className="text-xs font-bold">{item.is_available?'Available':'Off'}</span><Button tone="soft" onClick={()=>setEditingItem({...item,tags:item.tags||[]})}>Edit</Button><Button tone="danger" onClick={()=>remove('menu_items',item.id,'Item deleted.')}>Delete</Button></div></div></div>)}</div>}
          {editingItem&&<div className="fixed inset-0 z-50 overflow-y-auto bg-[#181d1a]/50 p-4"><form onSubmit={saveItem} className="mx-auto my-8 max-w-3xl rounded-3xl bg-[#f6fbf5] p-6 shadow-2xl"><div className="flex justify-between"><h3 className="font-headline-md">{editingItem.id?'Edit item':'Add item'}</h3><button type="button" onClick={()=>setEditingItem(null)} className="text-2xl">×</button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Title" value={editingItem.title} onChange={v=>setEditingItem({...editingItem,title:v})}/><Field label="Subtitle" value={editingItem.subtitle||''} onChange={v=>setEditingItem({...editingItem,subtitle:v})}/><label className="block space-y-1.5"><span className="text-xs font-bold text-[#57423a]">Category</span><select className={inputClass} value={editingItem.category_id||''} onChange={e=>setEditingItem({...editingItem,category_id:e.target.value})}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><Field label="Price" value={String(editingItem.price)} onChange={v=>setEditingItem({...editingItem,price:v})} type="number"/><Field label="Unit" value={editingItem.unit||''} onChange={v=>setEditingItem({...editingItem,unit:v})}/><Field label="Image URL" value={editingItem.image_url||''} onChange={v=>setEditingItem({...editingItem,image_url:v})}/><Field label="Badge" value={editingItem.badge||''} onChange={v=>setEditingItem({...editingItem,badge:v})}/><Field label="Tag" value={editingItem.tag||''} onChange={v=>setEditingItem({...editingItem,tag:v})}/><Field label="Spice level" value={editingItem.spice_level||''} onChange={v=>setEditingItem({...editingItem,spice_level:v})}/><Field label="Tags (comma separated)" value={Array.isArray(editingItem.tags)?editingItem.tags.join(', '):editingItem.tags||''} onChange={v=>setEditingItem({...editingItem,tags:v})}/><TextAreaField label="Description" value={editingItem.description||''} onChange={v=>setEditingItem({...editingItem,description:v})}/><div className="flex items-center gap-5 pt-5"><label className="flex items-center gap-2 text-sm font-bold">Featured <Toggle checked={Boolean(editingItem.featured)} onChange={v=>setEditingItem({...editingItem,featured:v})}/></label><label className="flex items-center gap-2 text-sm font-bold">Available <Toggle checked={Boolean(editingItem.is_available)} onChange={v=>setEditingItem({...editingItem,is_available:v})}/></label></div></div><div className="mt-6 flex justify-end gap-2"><Button tone="soft" onClick={()=>setEditingItem(null)}>Cancel</Button><Button type="submit">Save item</Button></div></form></div>}
        </section>}

        {section==='rooms'&&<section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-headline-md">Rooms</h2><div className="mt-4 flex gap-2">{(['rooms','images'] as RoomTab[]).map(t=><button key={t} onClick={()=>setRoomTab(t)} className={'rounded-full px-4 py-2 text-xs font-bold '+(roomTab===t?'bg-[#9f3e07] text-white':'bg-white border border-[#dec0b5] text-[#57423a]')}>{t==='rooms'?'Rooms':'Images'}</button>)}</div></div>{roomTab==='rooms'&&<Button onClick={addRoom}>Add room</Button>}</div>
          {roomTab==='rooms'&&<div className="space-y-3">{rooms.map(room=><div className={cardClass} key={room.id}><div className="flex flex-col gap-4 md:flex-row"><img src={room.image_url||''} alt="" className="h-28 w-full rounded-xl object-cover md:w-40 bg-[#f0f5f0]"/><div className="flex-1"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-title-lg">{room.name}</p><p className="text-sm text-[#8a7268]">PKR {Number(room.price_per_night).toLocaleString()} / night · {room.capacity}</p></div><div className="flex items-center gap-2"><Toggle checked={room.is_available} onChange={v=>save('rooms',room.id,{is_available:v},v?'Room available.':'Room turned off.')}/><span className="text-xs font-bold">{room.is_available?'Available':'Off'}</span><Button tone="soft" onClick={()=>setEditingRoom({...room,amenities:room.amenities||[]})}>Edit</Button><Button tone="danger" onClick={()=>remove('rooms',room.id,'Room deleted.')}>Delete</Button></div></div><p className="mt-2 text-sm text-[#57423a]">{room.amenities?.join(' · ')}</p></div></div></div>)}</div>}
          {roomTab==='images'&&<div className="space-y-4"><div className={cardClass}><h3 className="font-title-lg">Add room image</h3><div className="mt-4 grid gap-3 md:grid-cols-3"><label className="block space-y-1.5"><span className="text-xs font-bold">Room</span><select className={inputClass} value={newImage.roomId} onChange={e=>setNewImage({...newImage,roomId:e.target.value})}><option value="">Select room</option>{rooms.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label><Field label="Image URL" value={newImage.url} onChange={v=>setNewImage({...newImage,url:v})}/><div className="flex items-end"><Button onClick={addImage}>Add image</Button></div></div></div><div className="grid gap-4 md:grid-cols-2">{roomImages.map(img=><div className={cardClass} key={img.id}><img src={img.image_url} alt="" className="h-44 w-full rounded-xl object-cover"/><div className="mt-3 flex items-center justify-between"><span className="text-xs font-bold text-[#57423a]">{rooms.find(r=>r.id===img.room_id)?.name||img.room_id}</span><Button tone="danger" onClick={()=>remove('room_images',img.id,'Image deleted.')}>Delete</Button></div></div>)}</div></div>}
          {editingRoom&&<div className="fixed inset-0 z-50 overflow-y-auto bg-[#181d1a]/50 p-4"><div className="mx-auto my-8 max-w-3xl rounded-3xl bg-[#f6fbf5] p-6 shadow-2xl"><div className="flex justify-between"><h3 className="font-headline-md">Edit room</h3><button onClick={()=>setEditingRoom(null)} className="text-2xl">×</button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Name" value={editingRoom.name} onChange={v=>setEditingRoom({...editingRoom,name:v})}/><Field label="Tagline" value={editingRoom.tagline||''} onChange={v=>setEditingRoom({...editingRoom,tagline:v})}/><Field label="Badge" value={editingRoom.badge||''} onChange={v=>setEditingRoom({...editingRoom,badge:v})}/><Field label="Price per night" value={String(editingRoom.price_per_night)} onChange={v=>setEditingRoom({...editingRoom,price_per_night:v})} type="number"/><Field label="Capacity" value={editingRoom.capacity||''} onChange={v=>setEditingRoom({...editingRoom,capacity:v})}/><Field label="Bed type" value={editingRoom.bed_type||''} onChange={v=>setEditingRoom({...editingRoom,bed_type:v})}/><Field label="Size sq ft" value={String(editingRoom.size_sq_ft||0)} onChange={v=>setEditingRoom({...editingRoom,size_sq_ft:v})} type="number"/><Field label="Main image URL" value={editingRoom.image_url||''} onChange={v=>setEditingRoom({...editingRoom,image_url:v})}/><TextAreaField label="Amenities (comma separated)" value={Array.isArray(editingRoom.amenities)?editingRoom.amenities.join(', '):editingRoom.amenities||''} onChange={v=>setEditingRoom({...editingRoom,amenities:v})}/><TextAreaField label="Description" value={editingRoom.description||''} onChange={v=>setEditingRoom({...editingRoom,description:v})}/></div><div className="mt-4 flex items-center gap-2"><Toggle checked={Boolean(editingRoom.is_available)} onChange={v=>setEditingRoom({...editingRoom,is_available:v})}/><span className="text-sm font-bold">Room available</span></div><div className="mt-6 flex justify-end gap-2"><Button tone="soft" onClick={()=>setEditingRoom(null)}>Cancel</Button><Button onClick={saveRoom}>Save room</Button></div></div></div>}
        </section>}

        {section==='room-bookings'&&<section className="space-y-5">
          <div><h2 className="font-headline-md">Room Bookings</h2><p className="mt-1 text-sm text-[#57423a]">Review guest requests and accept or cancel bookings.</p></div>
          <div className="space-y-4">
            {roomBookings.map(booking=>{
              const room=rooms.find(r=>r.id===booking.room_id);
              const status=booking.status||'pending';
              return <div className={cardClass} key={booking.id}>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-title-lg">{room?.name||booking.room_id||'Room'}</h3>
                      <span className={'rounded-full px-3 py-1 text-[11px] font-bold uppercase '+(status==='confirmed'?'bg-[#e8f8ed] text-[#1d5036]':status==='cancelled'?'bg-[#ffe9e7] text-[#93000a]':'bg-[#fff4ef] text-[#9f3e07]')}>{status}</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 text-sm">
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Guest</p><p className="font-semibold">{booking.customer_name||'Guest'}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Contact</p><p className="font-semibold">{booking.contact_number||'Not provided'}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Check-in</p><p className="font-semibold">{booking.check_in_date}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Check-out</p><p className="font-semibold">{booking.check_out_date}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Rooms</p><p className="font-semibold">{booking.room_quantity||1}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Guests</p><p className="font-semibold">{booking.guest_quantity||1}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Price / night</p><p className="font-semibold">PKR {Number(booking.price_per_night||0).toLocaleString()}</p></div>
                      <div><p className="text-[11px] font-bold uppercase tracking-wide text-[#8a7268]">Requested</p><p className="font-semibold">{booking.created_at?new Date(booking.created_at).toLocaleString():'-'}</p></div>
                    </div>
                    {booking.custom_message&&<div className="mt-4 rounded-xl bg-[#f0f5f0] p-3 text-sm"><b>Guest message:</b> {booking.custom_message}</div>}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 lg:w-44 lg:justify-end">
                    {status==='pending'&&<><Button onClick={()=>changeRoomBookingStatus(booking.id,'confirmed')}>Accept</Button><Button tone="danger" onClick={()=>changeRoomBookingStatus(booking.id,'cancelled')}>Cancel</Button></>}
                    {status==='confirmed'&&<Button tone="danger" onClick={()=>changeRoomBookingStatus(booking.id,'cancelled')}>Cancel</Button>}
                    {status==='cancelled'&&<span className="rounded-xl bg-[#f0f5f0] px-4 py-2.5 text-xs font-bold text-[#8a7268]">Cancelled</span>}
                  </div>
                </div>
              </div>;
            })}
            {!roomBookings.length&&<div className={cardClass}><p className="text-sm text-[#8a7268]">No room bookings found.</p></div>}
          </div>
        </section>}

        {section==='orders'&&<section className="space-y-5"><div><h2 className="font-headline-md">Orders</h2><p className="mt-1 text-sm text-[#57423a]">View orders, inspect details, and change status.</p></div><div className="space-y-4">{orders.map(o=><div className={cardClass} key={o.id}><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><p className="font-title-lg">{o.guest_name||'Guest'} <span className="text-xs font-normal text-[#8a7268]">· {o.mode}</span></p><p className="mt-1 text-xs text-[#8a7268]">{new Date(o.created_at).toLocaleString()} · {o.guest_phone||'No phone'}</p><p className="mt-3 text-sm"><b>Total:</b> PKR {Number(o.total).toLocaleString()} · <b>Subtotal:</b> PKR {Number(o.subtotal).toLocaleString()}</p>{o.delivery_address&&<p className="mt-1 text-sm text-[#57423a]"><b>Delivery:</b> {o.delivery_address}</p>}{o.special_request&&<p className="mt-1 text-sm text-[#57423a]"><b>Request:</b> {o.special_request}</p>}</div><div className="flex flex-wrap items-center gap-2"><select className={inputClass+' w-auto min-w-36'} value={o.status} onChange={e=>changeOrderStatus(o.id,e.target.value)}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="preparing">Preparing</option><option value="ready">Ready</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div></div></div>)}{!orders.length&&<div className={cardClass}><p className="text-sm text-[#8a7268]">No orders found.</p></div>}</div></section>}
      </main>
    </div>
  </div>;
};
