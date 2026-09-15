// Point-cloud generators: the four scroll shapes and the hover dioramas
const rnd = (a = 1, b = 0): number =>Math.random()*(a-b)+b;

/* Shape 0 — a server rack: stacked chassis outlines, drive bays, cable loom */
export function shapeRack(n: number): Float32Array {
  const a = new Float32Array(n*3);
  const W=4.6, D=3.2, units=9, H=0.72, y0=-(units*H)/2;
  for(let i=0;i<n;i++){
    let x,y,z; const r=Math.random();
    if(r<0.42){ // horizontal chassis edges
      const u=Math.floor(rnd(units+1)), edge=Math.floor(rnd(4)), t=rnd(1);
      y=y0+u*H;
      if(edge===0){x=-W/2+t*W;z=D/2}else if(edge===1){x=-W/2+t*W;z=-D/2}else if(edge===2){x=W/2;z=-D/2+t*D}else{x=-W/2;z=-D/2+t*D}
    } else if(r<0.55){ // vertical rails
      const c=Math.floor(rnd(4)); x=(c%2?1:-1)*W/2; z=(c<2?1:-1)*D/2; y=y0+rnd(units*H);
    } else if(r<0.88){ // front face drive bays, dense
      x=rnd(W/2-0.15,-W/2+0.15); const u=Math.floor(rnd(units)); const bay=Math.floor(rnd(3));
      y=y0+u*H+0.12+bay*0.2+rnd(0.06); z=D/2+0.02;
    } else { // rear cable loom drooping
      const t=rnd(1); x=rnd(0.6,-0.6)+Math.sin(t*9+i)*0.25; y=y0+t*units*H; z=-D/2-0.35-Math.sin(t*3.1)*0.3;
    }
    a[i*3]=x;a[i*3+1]=y;a[i*3+2]=z;
  }
  return a;
}
/* Shape 1 — torus knot: the mesh network */
export function shapeKnot(n: number): Float32Array {
  const a=new Float32Array(n*3), p=2,q=3, R=3.0, r=1.35, tube=0.55;
  const P=(t: number)=>{const c=R+r*Math.cos(q*t);return [c*Math.cos(p*t),c*Math.sin(p*t),r*Math.sin(q*t)];};
  for(let i=0;i<n;i++){
    const t=rnd(Math.PI*2), c=P(t), c2=P(t+0.001);
    let tx=c2[0]-c[0],ty=c2[1]-c[1],tz=c2[2]-c[2]; const tl=Math.hypot(tx,ty,tz); tx/=tl;ty/=tl;tz/=tl;
    // normal ~ toward the ring centre, then binormal = T x N
    let nx=-c[0],ny=-c[1],nz=0; const dn=tx*nx+ty*ny; nx-=tx*dn;ny-=ty*dn;nz-=tz*dn; const nl=Math.hypot(nx,ny,nz)||1; nx/=nl;ny/=nl;nz/=nl;
    const bx=ty*nz-tz*ny, by=tz*nx-tx*nz, bz=tx*ny-ty*nx;
    const ang=rnd(Math.PI*2), rad=Math.random()<0.7?tube:tube*Math.sqrt(Math.random());
    const ca=Math.cos(ang)*rad, sa=Math.sin(ang)*rad;
    a[i*3]=c[0]+nx*ca+bx*sa; a[i*3+1]=c[1]+ny*ca+by*sa; a[i*3+2]=c[2]+nz*ca+bz*sa;
  }
  return a;
}
/* Shape 2 — globe with latitude bands + a defensive shell: the zero-trust perimeter */
export function shapeGlobe(n: number): Float32Array {
  const a=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    const r=Math.random();
    let R=4.2, theta, phi;
    if(r<0.6){ // lat/long grid
      const useLat=Math.random()<0.5;
      if(useLat){ phi=Math.acos(1-2*(Math.floor(rnd(13))/12)); theta=rnd(Math.PI*2); }
      else { theta=Math.floor(rnd(24))*(Math.PI/12); phi=Math.acos(1-2*Math.random()); }
    } else if(r<0.85){ phi=Math.acos(1-2*Math.random()); theta=rnd(Math.PI*2); R=4.2+rnd(0.05); }
    else { phi=Math.acos(1-2*Math.random()); theta=rnd(Math.PI*2); R=5.6+rnd(0.15); } // outer shell
    a[i*3]=R*Math.sin(phi)*Math.cos(theta); a[i*3+1]=R*Math.cos(phi); a[i*3+2]=R*Math.sin(phi)*Math.sin(theta);
  }
  return a;
}
/* Canvas sampler: anything drawn white on black becomes particles */
function sampleCanvas(n: number, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, S: number, zSpread: number): Float32Array {
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const ctx=c.getContext('2d')!; ctx.fillStyle='#000'; ctx.fillRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.strokeStyle='#fff';
  draw(ctx);
  const img=ctx.getImageData(0,0,w,h).data, pts: number[]=[];
  for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){ if(img[(y*w+x)*4]>128) pts.push(x,y); }
  const a=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    const k=Math.floor(rnd(pts.length/2))*2;
    a[i*3]=(pts[k]-w/2)*S+rnd(0.04,-0.04); a[i*3+1]=-(pts[k+1]-h/2)*S+rnd(0.04,-0.04);
    a[i*3+2]=rnd(zSpread,-zSpread)*(Math.random()<0.15?1:0.15);
  }
  return a;
}
/* Shape 3 — the initials */
export function shapeText(n: number): Float32Array {
  // scale kept small enough that the full width still fits the camera frustum on
  // narrow/portrait viewports, where it's forced face-on to stay readable
  return sampleCanvas(n,720,360,ctx=>{ ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font='800 300px Syne, "Helvetica Neue", Arial, sans-serif'; ctx.fillText('PQ',360,194); },0.012,0.9);
}
/* Primitive builder for the project dioramas: boxes as edges or solid fill, plus lines */
type Prim = { t: 'edges' | 'fill'; c: number[]; s: number[]; w: number } | { t: 'line'; a: number[]; b: number[]; w: number }
function fromPrims(n: number, prims: Prim[], scale: number): Float32Array {
  const tot=prims.reduce((t,p)=>t+p.w,0), a=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    let r=Math.random()*tot, pr=prims[0]; for(const q of prims){ pr=q; if(r<q.w)break; r-=q.w; }
    let x=0,y=0,z=0;
    if(pr.t==='line'){ const u=rnd(1); x=pr.a[0]+(pr.b[0]-pr.a[0])*u; y=pr.a[1]+(pr.b[1]-pr.a[1])*u; z=pr.a[2]+(pr.b[2]-pr.a[2])*u; }
    else {
      const [cx,cy,cz]=pr.c,[w,h,d]=pr.s;
      if(pr.t==='edges'){ const e=Math.floor(rnd(12)), u=rnd(1)-0.5, s1=(e&1)?0.5:-0.5, s2=(e&2)?0.5:-0.5;
        if(e<4){x=u*w;y=s1*h;z=s2*d} else if(e<8){x=s1*w;y=u*h;z=s2*d} else {x=s1*w;y=s2*h;z=u*d} }
      else { x=(rnd(1)-0.5)*w; y=(rnd(1)-0.5)*h; z=(rnd(1)-0.5)*d; }
      x+=cx;y+=cy;z+=cz;
    }
    a[i*3]=x*scale;a[i*3+1]=y*scale;a[i*3+2]=z*scale;
  }
  return a;
}
export const hoverShapes: Record<string, (n: number) => Float32Array> = {
  homelab(n: number){ // the homelab chassis: nine bays, copper strip, grille top
    const pr: Prim[]=[{t:'edges',c:[0,0,0],s:[2.3,2.4,2.6],w:3},{t:'fill',c:[0,1.16,0],s:[2.15,0.01,2.45],w:0.9},{t:'fill',c:[0,0.25,1.32],s:[2.3,0.22,0.06],w:0.9}];
    const bw=0.17,g=0.02,x0=-(9*bw+8*g)/2+bw/2;
    for(let i=0;i<9;i++){ const x=x0+i*(bw+g); pr.push({t:'edges',c:[x,-0.43,1.3],s:[bw,1.05,0.18],w:0.35}); pr.push({t:'fill',c:[x,-0.43,1.12],s:[bw-0.04,0.9,0.3],w:0.32}); }
    return fromPrims(n,pr,2.1);
  },
  cluster(n: number){ // DEC Energy: two boards, GPU on one, HBA on the other, bridged
    const pr: Prim[]=[];
    for(const bx of [-0.95,0.95]){ pr.push({t:'fill',c:[bx,0,0],s:[1.5,0.08,1.8],w:0.7},{t:'edges',c:[bx,0,0],s:[1.5,0.08,1.8],w:1.6},{t:'fill',c:[bx,0.1,-0.25],s:[0.45,0.12,0.45],w:0.5}); }
    pr.push({t:'fill',c:[-0.45,0.25,0.1],s:[0.12,0.42,1.2],w:1.0},{t:'fill',c:[0.45,0.22,0.1],s:[0.12,0.35,1.0],w:0.8});
    pr.push({t:'line',a:[-0.5,0.12,-0.25],b:[0.5,0.12,-0.25],w:0.5});
    for(const bx of [-0.95,0.95]) for(let k=0;k<3;k++) pr.push({t:'line',a:[bx-0.55,0.05,0.5+k*0.2],b:[bx+0.55,0.05,0.5+k*0.2],w:0.12});
    return fromPrims(n,pr,2.4);
  },
  hosts(n: number){ // four hosts on the floor, one hub, one tunnel out
    const pr: Prim[]=[]; const hosts=[[-1.3,-1.2,-1.0],[1.3,-1.2,-1.0],[-1.3,-1.2,1.0],[1.3,-1.2,1.0]];
    for(const h of hosts){ pr.push({t:'edges',c:h,s:[1.7,0.5,1.4],w:1},{t:'fill',c:[h[0],h[1],h[2]+0.68],s:[1.5,0.32,0.05],w:0.45},{t:'line',a:[h[0],h[1]+0.25,h[2]],b:[0,0.6,0],w:0.35}); }
    pr.push({t:'fill',c:[0,0.6,0],s:[0.45,0.45,0.45],w:0.6},{t:'line',a:[0,0.6,0],b:[0,2.6,0],w:0.5},{t:'edges',c:[0,2.9,0],s:[1.2,0.5,0.9],w:0.5});
    return fromPrims(n,pr,1.55);
  },
  city(n: number){ // the simulated city: a grid of blocks
    const pr: Prim[]=[{t:'edges',c:[0,-0.05,0],s:[9.2,0.02,9.2],w:1.2}]; let seed=7; const rr=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    for(let i=0;i<8;i++)for(let j=0;j<8;j++){ const hgt=0.3+rr()*rr()*3.2, x=-3.85+i*1.1, z=-3.85+j*1.1; pr.push({t:'edges',c:[x,hgt/2,z],s:[0.8,hgt,0.8],w:0.35+hgt*0.15}); if(rr()<0.35)pr.push({t:'fill',c:[x,hgt/2,z],s:[0.78,hgt,0.78],w:0.08}); }
    return fromPrims(n,pr,0.72);
  },
  hid(n: number){ // the libratbag report: header, command, profile, DPI, then upstream
    return sampleCanvas(n,1000,420,ctx=>{
      ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(40,40); ctx.lineTo(960,40); ctx.stroke();
      ctx.setLineDash([8,10]); ctx.beginPath(); ctx.moveTo(110,40); ctx.lineTo(160,130); ctx.moveTo(420,40); ctx.lineTo(380,130); ctx.stroke(); ctx.setLineDash([]);
      const boxes=[[60,120,'0x08'],[180,120,'0x14'],[300,140,'0x01 02'],[440,190,'0x0640'],[630,300,'00 00 …']];
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font='700 42px Syne, Arial, sans-serif';
      for(const [x,w,t] of boxes as [number,number,string][]){ ctx.lineWidth=(t==='0x0640')?10:5; ctx.strokeRect(x,130,w,110); ctx.fillText(t,x+w/2,185); }
      ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(535,240); ctx.lineTo(535,300); ctx.stroke();
      ctx.fillRect(360,300,350,70); ctx.fillStyle='#000'; ctx.font='700 30px Syne, Arial, sans-serif'; ctx.fillText('MERGED UPSTREAM',535,336);
      ctx.fillStyle='#fff'; ctx.font='500 26px Syne, Arial, sans-serif'; ctx.textAlign='left';
      ctx.fillText('REPORT',60,275); ctx.fillText('CMD',180,275); ctx.fillText('PROFILE 2',300,275); ctx.fillText('1600 DPI',440,275);
    },0.0142,0.5);
  }
};
hoverShapes.nas=shapeRack; // the client rack is the same one that opens the page
export const hoverFlat: Record<string, boolean> = { hid: true };
const shapeCache: Record<string, Float32Array> = {};
export function getHoverShape(k: string, count: number): Float32Array { return shapeCache[k] || (shapeCache[k] = hoverShapes[k](count)); }

