// GLSL for the particle sculpture
export const noiseGLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export const vert = noiseGLSL + `
attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute vec3 aPH; attribute vec3 aPH2; attribute float aRand;
uniform float uProgress; uniform float uTime; uniform float uPR; uniform vec3 uMouse; uniform float uMouseOn; uniform float uIntro; uniform float uDim; uniform float uHover; uniform float uSwap;
varying float vA; varying float vHeat;
void main(){
  float p=clamp(uProgress,0.0,3.0);
  float s01=smoothstep(0.0,1.0,p), s12=smoothstep(1.0,2.0,p), s23=smoothstep(2.0,3.0,p);
  vec3 pos = aP0*(1.0-s01) + aP1*(s01-s12) + aP2*(s12-s23) + aP3*s23;
  float f=fract(p); float tr = (p>=3.0)?0.0:f*(1.0-f)*4.0;   // 0 at rest, 1 mid-morph
  // hover: the sculpture becomes the project under the cursor
  vec3 hp = mix(aPH2, aPH, uSwap);
  pos = mix(pos, hp, uHover);
  tr = tr*(1.0-uHover) + max(uHover*(1.0-uHover)*4.0, uSwap*(1.0-uSwap)*4.0)*0.7;
  vec3 nv = vec3(snoise(pos*0.45+uTime*0.12), snoise(pos*0.45+vec3(13.7)+uTime*0.12), snoise(pos*0.45+vec3(71.2)+uTime*0.12));
  pos += nv*(0.07*(1.0-uHover*0.85) + tr*(2.2+aRand*2.0));
  // intro: particles fall in from a scattered cloud
  vec3 spread = (aRand-0.5)*vec3(30.0,20.0,30.0) + nv*6.0;
  pos = mix(spread, pos, uIntro);
  // mouse repulsion
  vec3 d = pos - uMouse; float dist=length(d);
  float rep = smoothstep(3.2,0.0,dist)*uMouseOn;
  pos += (d/max(dist,0.001))*rep*1.6;
  vec4 mv = modelViewMatrix*vec4(pos,1.0);
  gl_Position = projectionMatrix*mv;
  float size = (0.8+aRand*1.4)*uPR*(1.0+tr*1.0+rep*1.4);
  gl_PointSize = min(size*(200.0/-mv.z), 9.0*uPR);
  vA = (0.35+0.55*aRand)*uIntro*uDim*(1.0-tr*0.45);
  vHeat = clamp(tr*0.9+rep+aRand*0.25,0.0,1.0);
}`;
export const frag = `
uniform vec3 uC1; uniform vec3 uC2; varying float vA; varying float vHeat;
void main(){
  vec2 uv=gl_PointCoord-0.5; float d=length(uv); if(d>0.5) discard;
  float a=smoothstep(0.5,0.12,d);
  vec3 c=mix(uC1,uC2,vHeat);
  gl_FragColor=vec4(c, a*vA);
}`;

