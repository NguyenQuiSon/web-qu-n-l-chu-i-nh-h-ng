const $=s=>document.querySelector(s), money=n=>Number(n).toLocaleString('vi-VN')+'đ';
const E={ // Cấu hình theo lược đồ quan hệ trong file Word
 monan:{t:'Món ăn',p:'M',k:'MaMon',f:[['MaMon','Mã món'],['TenMon','Tên món'],['Gia','Giá','n'],['PhanLoai','Phân loại','s',['Khai vị','Món chính','Tráng miệng','Đồ uống']],['ConPhucVu','Còn phục vụ','b']]},
 thucdon:{t:'Thực đơn',p:'TD',k:'MaThucDon',f:[['MaThucDon','Mã thực đơn'],['MaChuoi','Mã chuỗi'],['TenThucDon','Tên thực đơn'],['Mua','Mùa'],['NgayBatDau','Ngày bắt đầu','d'],['NgayKetThuc','Ngày kết thúc','d']]},
 chinhanh:{t:'Chi nhánh',p:'CN',k:'MaChiNhanh',f:[['MaChiNhanh','Mã chi nhánh'],['MaChuoi','Mã chuỗi'],['KyHieuChiNhanh','Ký hiệu'],['DiaChi','Địa chỉ'],['GioMoCua','Giờ mở cửa'],['GioDongCua','Giờ đóng cửa'],['TrangThai','Trạng thái','s',['Hoạt động','Tạm đóng']]]},
 ban:{t:'Bàn',p:'B',k:'MaBan',f:[['MaBan','Mã bàn'],['MaChiNhanh','Chi nhánh'],['SoBan','Số bàn','n0'],['SoGhe','Số ghế','n0'],['KhuVuc','Khu vực'],['TrangThai','Trạng thái','s',['Trống','Đang dùng','Đã đặt']]]},
 phieu:{t:'Phiếu gọi món',p:'PG',k:'MaPhieu',f:[['MaPhieu','Mã phiếu'],['MaNhanVienPhucVu','NV phục vụ'],['MaBan','Mã bàn'],['NgayLap','Ngày lập','d'],['TrangThai','Trạng thái','s',['Đang chế biến','Đã phục vụ','Đã hủy']],['GhiChu','Ghi chú']]},
 hoadon:{t:'Hóa đơn',p:'HD',k:'MaHoaDon',f:[['MaHoaDon','Mã hóa đơn'],['MaPhieu','Mã phiếu'],['MaThuNgan','Thu ngân'],['MaKhachHang','Khách hàng'],['MaKhuyenMai','Khuyến mãi'],['NgayLap','Ngày lập','d'],['TamTinh','Tạm tính','n'],['GiamGia','Giảm giá','n'],['TongTien','Tổng tiền','n'],['TrangThai','Trạng thái','s',['Đã thanh toán','Chưa thanh toán','Đã hủy']]]},
 khuyenmai:{t:'Khuyến mãi',p:'KM',k:'MaKhuyenMai',f:[['MaKhuyenMai','Mã KM'],['PhanTram','Phần trăm (%)','n0'],['DonToiThieu','Đơn tối thiểu','n'],['NgayBatDau','Bắt đầu','d'],['NgayKetThuc','Kết thúc','d']]},
 thanhtoan:{t:'Thanh toán',p:'TT',k:'MaThanhToan',f:[['MaThanhToan','Mã thanh toán'],['MaHoaDon','Mã hóa đơn'],['MaPhuongThuc','Phương thức','s',['Tiền mặt','Thẻ ngân hàng','Ví điện tử']],['SoTien','Số tiền','n']]},
 khachhang:{t:'Khách hàng',p:'KH',k:'MaNguoiDung',f:[['MaNguoiDung','Mã KH'],['HoTen','Họ tên'],['SoDienThoai','Số điện thoại'],['Email','Email'],['DiemTichLuy','Điểm tích lũy','n0'],['HangThanhVien','Hạng','s',['Đồng','Bạc','Vàng','Kim cương']],['NgayThamGia','Ngày tham gia','d']]},
 nhanvien:{t:'Nhân viên',p:'NV',k:'MaNhanVien',f:[['MaNhanVien','Mã NV'],['HoTen','Họ tên'],['VaiTro','Vai trò','s',['Quản lý chi nhánh','Phục vụ','Thu ngân','Đầu bếp']],['SoDienThoai','Số điện thoại'],['NgayVaoLam','Ngày vào làm','d'],['LuongCoBan','Lương cơ bản','n'],['MaChiNhanh','Chi nhánh']]}
};
const GROUPS=[['MAIN',['dashboard']],['THỰC ĐƠN',['monan','thucdon']],['VẬN HÀNH',['chinhanh','ban','phieu']],['TÀI CHÍNH',['hoadon','khuyenmai','thanhtoan']],['CON NGƯỜI',['khachhang','nhanvien']]];
const ICON={dashboard:'📊',monan:'🍴',thucdon:'📋',chinhanh:'🏢',ban:'🪑',phieu:'📝',hoadon:'🧾',khuyenmai:'🏷️',thanhtoan:'💳',khachhang:'👥',nhanvien:'🧑‍🍳'};
const EMO={'Khai vị':'🥗','Món chính':'🍔','Tráng miệng':'🍰','Đồ uống':'🥤'}, BG={'Khai vị':'#dcfce7','Món chính':'#fed7aa','Tráng miệng':'#fbcfe8','Đồ uống':'#bfdbfe'};
function seed(){return{
 monan:[['Bò bít tết','Món chính',165000],['Gà nướng thảo mộc','Món chính',129000],['Burger bò phô mai','Món chính',89000],['Salad rau củ','Khai vị',59000],['Súp bí đỏ','Khai vị',49000],['Bánh chocolate','Tráng miệng',55000],['Kem vani','Tráng miệng',35000],['Cà phê sữa','Đồ uống',29000],['Nước cam ép','Đồ uống',39000],['Trà đào','Đồ uống',42000]].map((m,i)=>({MaMon:'M'+(i+1),TenMon:m[0],PhanLoai:m[1],Gia:m[2],ConPhucVu:i!=6})),
 thucdon:[{MaThucDon:'TD1',MaChuoi:'C1',TenThucDon:'Thực đơn Xuân Hè',Mua:'Hè',NgayBatDau:'2026-04-01',NgayKetThuc:'2026-09-30'},{MaThucDon:'TD2',MaChuoi:'C1',TenThucDon:'Thực đơn Thu Đông',Mua:'Đông',NgayBatDau:'2026-10-01',NgayKetThuc:'2027-03-31'}],
 chinhanh:[{MaChiNhanh:'CN1',MaChuoi:'C1',KyHieuChiNhanh:'Q1-01',DiaChi:'12 Lê Lợi, Quận 1, TP.HCM',GioMoCua:'08:00',GioDongCua:'22:00',TrangThai:'Hoạt động'},{MaChiNhanh:'CN2',MaChuoi:'C1',KyHieuChiNhanh:'Q7-02',DiaChi:'88 Nguyễn Thị Thập, Quận 7, TP.HCM',GioMoCua:'09:00',GioDongCua:'23:00',TrangThai:'Hoạt động'},{MaChiNhanh:'CN3',MaChuoi:'C1',KyHieuChiNhanh:'TD-03',DiaChi:'5 Võ Văn Ngân, TP. Thủ Đức',GioMoCua:'08:00',GioDongCua:'21:30',TrangThai:'Tạm đóng'}],
 ban:[...Array(8)].map((_,i)=>({MaBan:'B'+(i+1),MaChiNhanh:'CN'+(i%2+1),SoBan:i+1,SoGhe:[2,4,4,6][i%4],KhuVuc:['Tầng 1','Tầng 2','Sân vườn'][i%3],TrangThai:['Trống','Đang dùng','Đã đặt'][i%3]})),
 phieu:[...Array(5)].map((_,i)=>({MaPhieu:'PG'+(i+1),MaNhanVienPhucVu:'NV'+(i%2+2),MaBan:'B'+(i+1),NgayLap:'2026-10-1'+(i+3),TrangThai:['Đã phục vụ','Đang chế biến'][i%2],GhiChu:i%2?'Ít cay':''})),
 hoadon:[[ '2026-10-13',314000,10],['2026-10-14',468000,0],['2026-10-15',221000,10],['2026-10-16',587000,15],['2026-10-17',356000,0],['2026-10-18',642000,10]].map((h,i)=>({MaHoaDon:'HD'+(i+1),MaPhieu:'PG'+(i%5+1),MaThuNgan:'NV4',MaKhachHang:'KH'+(i%3+1),MaKhuyenMai:h[2]?'KM'+(h[2]==10?1:2):'',NgayLap:h[0],TamTinh:h[1],GiamGia:h[1]*h[2]/100,TongTien:h[1]*(100-h[2])/100,TrangThai:i==5?'Chưa thanh toán':'Đã thanh toán'})),
 khuyenmai:[{MaKhuyenMai:'KM1',PhanTram:10,DonToiThieu:200000,NgayBatDau:'2026-10-01',NgayKetThuc:'2026-12-31'},{MaKhuyenMai:'KM2',PhanTram:15,DonToiThieu:500000,NgayBatDau:'2026-10-01',NgayKetThuc:'2026-11-30'}],
 thanhtoan:[['Tiền mặt'],['Thẻ ngân hàng'],['Ví điện tử'],['Tiền mặt'],['Ví điện tử']].map((p,i)=>({MaThanhToan:'TT'+(i+1),MaHoaDon:'HD'+(i+1),MaPhuongThuc:p[0],SoTien:[282600,468000,198900,499950,356000][i]})),
 khachhang:[['Trần Minh Anh','Vàng',820],['Lê Hoàng Nam','Bạc',340],['Phạm Thu Hà','Đồng',90]].map((k,i)=>({MaNguoiDung:'KH'+(i+1),HoTen:k[0],SoDienThoai:'09012345'+(i+10),Email:'kh'+(i+1)+'@mail.com',DiemTichLuy:k[2],HangThanhVien:k[1],NgayThamGia:'2025-0'+(i+3)+'-15'})),
 nhanvien:[['Nguyễn Văn Bình','Quản lý chi nhánh',15e6],['Võ Thị Cúc','Phục vụ',8e6],['Đặng Quốc Dũng','Phục vụ',8e6],['Hoàng Mai Lan','Thu ngân',9e6],['Bùi Tuấn Kiệt','Đầu bếp',12e6]].map((n,i)=>({MaNhanVien:'NV'+(i+1),HoTen:n[0],VaiTro:n[1],SoDienThoai:'09876543'+(i+20),NgayVaoLam:'2024-0'+(i+1)+'-01',LuongCoBan:n[2],MaChiNhanh:'CN'+(i%2+1)}))
}}
let DB=JSON.parse(localStorage.getItem('qlnh_db')||'null')||seed(), cat='Tất cả', edit=null;
const save=()=>localStorage.setItem('qlnh_db',JSON.stringify(DB));
const bd=v=>{const c=/^(Hoạt động|Đã thanh toán|Trống|Đã phục vụ|Có|Vàng|Kim cương)$/.test(v)?'ok':/^(Đang|Chưa|Đã đặt|Tạm|Không)/.test(v)?'wr':/hủy/.test(v)?'no':'';return `<span class="bd ${c}">${v}</span>`};
const fmt=(v,t)=>t=='n'?money(v):t=='b'?bd(v?'Có':'Không'):t=='s'?bd(v):(v??'');
function nav(){const pend=DB.hoadon.filter(h=>h.TrangThai=='Chưa thanh toán').length;$('#nav').innerHTML=GROUPS.map(([g,ks])=>`<h4>${g}</h4>`+ks.map(k=>`<a href="#${k}" class="${cur()==k?'on':''}"><i>${ICON[k]}</i> ${k=='dashboard'?'Tổng quan':E[k].t}${k=='phieu'?'<em>LIVE</em>':k=='hoadon'&&pend?`<em class="red">${pend}</em>`:''}</a>`).join('')).join('')}
const cur=()=>(location.hash||'#dashboard').slice(1);
function dash(){
 const hd=DB.hoadon.filter(h=>h.TrangThai=='Đã thanh toán'), dt=hd.reduce((s,h)=>s+h.TongTien,0), byD={};
 hd.forEach(h=>byD[h.NgayLap.slice(5)]=(byD[h.NgayLap.slice(5)]||0)+h.TongTien);
 const mx=Math.max(...Object.values(byD),1);
 const st=[['Doanh thu',money(dt),'💰','#fef3c7'],['Hóa đơn',DB.hoadon.length,'🧾','#dbeafe'],['Bàn đang dùng',DB.ban.filter(b=>b.TrangThai=='Đang dùng').length+'/'+DB.ban.length,'🪑','#dcfce7'],['Món đang phục vụ',DB.monan.filter(m=>m.ConPhucVu).length,'🍴','#fce7f3']];
 const ct=E.hoadon.f.filter(f=>['MaHoaDon','NgayLap','TongTien','TrangThai'].includes(f[0]));
 return `<div class="stats">${st.map(s=>`<div class="stat"><span style="background:${s[3]}">${s[2]}</span><div><small>${s[0]}</small><b>${s[1]}</b></div></div>`).join('')}</div>
 <div class="panel"><h3>Doanh thu theo ngày</h3><div class="bars">${Object.entries(byD).map(([d,v])=>`<div class="bar" style="height:${v/mx*100}%"><span>${Math.round(v/1000)}k</span><i>${d}</i></div>`).join('')}</div><br></div>
 <div class="panel"><h3>Hóa đơn gần đây</h3>${tbl(ct,DB.hoadon.slice(-5).reverse())}</div>`}
const tbl=(f,rows,e)=>`<table><tr>${f.map(c=>`<th>${c[1]}</th>`).join('')}${e?'<th></th>':''}</tr>${rows.map(r=>`<tr>${f.map(c=>`<td>${fmt(r[c[0]],c[2])}</td>`).join('')}${e?`<td><button class="ic" data-e="${r._i}">✏️</button><button class="ic" data-d="${r._i}">🗑️</button></td>`:''}</tr>`).join('')}</table>`;
function render(){
 const k=cur(), s=$('#q').value.toLowerCase(); nav(); $('#tabs').innerHTML='';
 $('#title').textContent=k=='dashboard'?'Tổng quan':E[k].t; $('#add').style.display=k=='dashboard'?'none':'';
 if(k=='dashboard'){$('#view').innerHTML=dash();return}
 const rows=DB[k].map((r,i)=>({...r,_i:i})).filter(r=>JSON.stringify(r).toLowerCase().includes(s));
 if(k=='monan'){
  $('#tabs').innerHTML=['Tất cả',...E.monan.f[3][3]].map(c=>`<button class="tab ${c==cat?'on':''}" data-c="${c}">${c}</button>`).join('');
  $('#view').innerHTML=`<div class="grid">${rows.filter(r=>cat=='Tất cả'||r.PhanLoai==cat).map(r=>`<div class="card"><div class="img">${art(r)}<div class="tg l">${r._i%3==0?'<b class="p1">Nổi bật</b>':''}${r._i%2==0?'<b class="p2">Phổ biến</b>':''}</div><div class="tg r"><b class="${r.ConPhucVu?'gr':'dk'}">${r.ConPhucVu?'Đang bán':'Tạm ngưng'}</b><b class="bl">${r.ConPhucVu?'Còn hàng':'Hết hàng'}</b></div></div><div class="body"><div class="cat">${r.PhanLoai}</div><h3>${r.TenMon}</h3><p>${r.MaMon} · Thực đơn Thu Đông</p><div class="row"><span class="price">${money(r.Gia)}</span><span><button class="ic" data-e="${r._i}">✏️</button><button class="ic" data-d="${r._i}">🗑️</button></span></div></div></div>`).join('')}</div>`;return}
 $('#view').innerHTML=`<div class="panel" style="padding:0">${tbl(E[k].f,rows,1)}</div>`}
function openForm(i){
 const k=cur(),e=E[k];edit=i;const r=i==null?{}:DB[k][i];
 $('#form').innerHTML=`<h3>${i==null?'Thêm':'Sửa'} ${e.t.toLowerCase()}</h3>`+e.f.map(([n,l,t,o])=>{
  const v=r[n]??(n==e.k?e.p+(DB[k].length+1):''); let inp;
  if(t=='s')inp=`<select name="${n}">${o.map(x=>`<option ${x==v?'selected':''}>${x}</option>`).join('')}</select>`;
  else if(t=='b')inp=`<select name="${n}"><option value="1" ${r[n]!==false?'selected':''}>Có</option><option value="0" ${r[n]===false?'selected':''}>Không</option></select>`;
  else inp=`<input name="${n}" value="${v}" type="${t=='d'?'date':t=='n'||t=='n0'?'number':'text'}" required>`;
  return `<label>${l}</label>${inp}`}).join('')+`<div class="acts"><button type="button" class="btn g" id="cx">Hủy</button><button class="btn">Lưu</button></div>`;
 $('#modal').classList.remove('hide');$('#cx').onclick=()=>$('#modal').classList.add('hide')}
$('#form').onsubmit=e=>{e.preventDefault();const k=cur(),o={};
 E[k].f.forEach(([n,,t])=>{const v=e.target[n].value;o[n]=t=='n'||t=='n0'?+v:t=='b'?v=='1':v});
 edit==null?DB[k].push(o):DB[k][edit]=o;save();$('#modal').classList.add('hide');render()};
document.addEventListener('click',e=>{const t=e.target;
 if(t.dataset.e!=null)openForm(+t.dataset.e);
 if(t.dataset.d!=null&&confirm('Xóa mục này?')){DB[cur()].splice(+t.dataset.d,1);save();render()}
 if(t.dataset.c){cat=t.dataset.c;render()}
 if(t.closest('nav'))$('#side').classList.remove('open')});
$('#add').onclick=()=>openForm(null);$('#q').oninput=render;$('#burger').onclick=()=>$('#side').classList.toggle('open');
window.onhashchange=render;render();

function art(r){const n=r.TenMon.toLowerCase(),c=r.PhanLoai,B={'Khai vị':['#86efac','#16a34a'],'Món chính':['#fdba74','#c2410c'],'Tráng miệng':['#f9a8d4','#9d174d'],'Đồ uống':['#93c5fd','#1d4ed8']}[c];
 const pl='<ellipse cx="100" cy="126" rx="64" ry="7" fill="#0003"/><circle cx="100" cy="74" r="58" fill="#fff"/><circle cx="100" cy="74" r="46" fill="#eef2f7"/>';let s='';
 if(c=='Món chính')s=pl+(n.includes('burger')?'<path d="M58 68a42 34 0 0 1 84 0z" fill="#e3a043"/><g fill="#fde68a"><ellipse cx="80" cy="46" rx="4" ry="2"/><ellipse cx="100" cy="40" rx="4" ry="2"/><ellipse cx="120" cy="47" rx="4" ry="2"/></g><path d="M56 68h88l-10 10-12-6-12 8-12-8-12 6-12-6z" fill="#fbbf24"/><path d="M54 72q10 8 20 0t20 0 20 0 20 0 12 2v6H54z" fill="#4ade80"/><rect x="56" y="80" width="88" height="14" rx="7" fill="#7c2d12"/><path d="M58 96h84q0 12-10 14H68q-10-2-10-14z" fill="#d68a2e"/>':'<ellipse cx="100" cy="74" rx="36" ry="25" fill="#92400e" transform="rotate(-12 100 74)"/><g stroke="#451a03" stroke-width="3" stroke-linecap="round"><path d="M80 62l22 20M92 56l22 20M104 52l20 18"/></g><g fill="#22c55e"><circle cx="82" cy="78" r="3"/><circle cx="112" cy="66" r="3"/><circle cx="96" cy="86" r="3"/></g><circle cx="140" cy="94" r="11" fill="#fde047"/><circle cx="140" cy="94" r="6" fill="#fef9c3"/>');
 else if(c=='Khai vị')s=n.includes('súp')?pl+'<circle cx="100" cy="74" r="40" fill="#f97316"/><circle cx="100" cy="74" r="32" fill="#fb923c"/><path d="M76 74q12-14 24 0t24 0" stroke="#fff" stroke-width="5" fill="none"/><g fill="#16a34a"><circle cx="92" cy="86" r="2.5"/><circle cx="112" cy="64" r="2.5"/></g>':pl+'<g fill="#4ade80"><circle cx="80" cy="64" r="16"/><circle cx="108" cy="58" r="17"/><circle cx="122" cy="84" r="16"/><circle cx="90" cy="88" r="16"/></g><g fill="#22c55e"><circle cx="100" cy="74" r="14"/></g><g fill="#ef4444"><circle cx="82" cy="78" r="7"/><circle cx="118" cy="68" r="7"/><circle cx="104" cy="94" r="6"/></g><g fill="#fb923c"><rect x="68" y="58" width="12" height="5" rx="2"/><rect x="124" y="86" width="12" height="5" rx="2"/></g><circle cx="96" cy="60" r="5" fill="#fde047"/>';
 else if(c=='Tráng miệng')s=pl+(n.includes('kem')?'<path d="M78 80h44l-22 40z" fill="#f59e0b"/><circle cx="100" cy="62" r="24" fill="#fef3c7"/><circle cx="88" cy="74" r="14" fill="#fde68a"/><circle cx="112" cy="74" r="14" fill="#fbcfe8"/><circle cx="100" cy="40" r="6" fill="#dc2626"/>':'<path d="M58 96V62l84 0v34z" fill="#5b2a14"/><rect x="58" y="74" width="84" height="6" fill="#fcd9b6"/><rect x="58" y="86" width="84" height="5" fill="#fcd9b6"/><path d="M58 62q10-14 22-4t22-6 22 6 18-2v6H58z" fill="#3b1608"/><circle cx="100" cy="46" r="11" fill="#ef4444"/><path d="M96 36l4-6 4 6z" fill="#16a34a"/>');
 else s=n.includes('cà phê')?'<ellipse cx="100" cy="120" rx="58" ry="8" fill="#0003"/><ellipse cx="100" cy="104" rx="56" ry="16" fill="#fff"/><path d="M62 52h76v26q0 28-38 28t-38-28z" fill="#fff"/><path d="M138 62q22 0 22 14t-22 14" stroke="#fff" stroke-width="8" fill="none"/><ellipse cx="100" cy="52" rx="38" ry="10" fill="#6b3a1e"/><ellipse cx="100" cy="52" rx="28" ry="6" fill="#a0612f"/>':'<ellipse cx="100" cy="124" rx="40" ry="6" fill="#0003"/><path d="M96 14l12 44" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/><path d="M66 34h68l-8 88H74z" fill="#ffffff55" stroke="#fff" stroke-width="3"/><path d="M69 58h62l-5 62H74z" fill="'+(n.includes('cam')?'#fb923c':'#fdba74')+'"/><g fill="#fff8"><rect x="82" y="68" width="14" height="14" rx="3"/><rect x="104" y="84" width="14" height="14" rx="3"/></g><circle cx="134" cy="38" r="15" fill="#fb923c"/><circle cx="134" cy="38" r="10" fill="#fed7aa"/>';
 return `<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g${r._i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${B[0]}"/><stop offset="1" stop-color="${B[1]}"/></linearGradient></defs><rect width="200" height="140" fill="url(#g${r._i})"/><circle cx="170" cy="20" r="40" fill="#fff2"/><circle cx="20" cy="130" r="30" fill="#fff2"/>${s}</svg>`}
