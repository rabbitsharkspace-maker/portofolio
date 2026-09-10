import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, RoundedBox, useTexture } from '@react-three/drei'
import { MathUtils, SRGBColorSpace } from 'three'
import { useReducedMotion } from 'motion/react'
import { useLang } from '../lang'

class SceneBoundary extends Component {
  state = { failed:false }
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed ? this.props.fallback : this.props.children}
}
function Block({position=[0,0,0],size=[1,1,1],color='#eee6d3',radius=.08,...props}){
  return <RoundedBox args={size} radius={radius} smoothness={3} position={position} castShadow receiveShadow {...props}><meshStandardMaterial color={color} roughness={.8}/></RoundedBox>
}
function Ball({position=[0,0,0],scale=1,color='#eee6d3',...props}){
  return <mesh position={position} scale={scale} castShadow {...props}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color={color} roughness={.75}/></mesh>
}
function Screenshot({src,width=2.1,height=1.2}){
  const texture=useTexture(src)
  texture.colorSpace=SRGBColorSpace
  return <mesh position={[0,0,.061]}><planeGeometry args={[width,height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
}
function Mascot({kind,position,onHello,active,animated}){
  const body=useRef(null)
  const pupils=useRef(null)
  const bunny=kind==='jane'
  const hue=bunny?'#edc7a1':'#91b9c5'
  useFrame((state,delta)=>{
    const t=state.clock.elapsedTime
    if(body.current){body.current.position.y=animated ? MathUtils.damp(body.current.position.y,active ? .35 : 0,7,delta) : 0;body.current.rotation.z=animated?Math.sin(t*1.5+(bunny?0:2))*.035:0}
    if(pupils.current){pupils.current.position.x=MathUtils.damp(pupils.current.position.x,state.pointer.x*.075,6,delta);pupils.current.position.y=MathUtils.damp(pupils.current.position.y,state.pointer.y*.055,6,delta)}
  })
  return <group position={position} rotation={[0,.15,0]} onClick={e=>{e.stopPropagation();if(e.delta<6)onHello(kind)}}>
    <group ref={body}>
      <Ball position={[0,.55,0]} scale={[.5,.62,.4]} color={hue}/>
      <Ball position={[0,1.12,0]} scale={[.56,.48,.44]} color={hue}/>
      {bunny ? <>{[-.24,.24].map(x=><group key={x} position={[x,1.64,0]} rotation={[0,0,x*.6]}><Ball scale={[.15,.58,.13]} color={hue}/><Ball position={[0,0,.085]} scale={[.072,.4,.06]} color="#dd9fa4"/></group>)}</> : <><mesh position={[0,1.67,-.12]} rotation={[0,0,-.1]} castShadow><coneGeometry args={[.25,.63,3]}/><meshStandardMaterial color={hue}/></mesh><Ball position={[0,.57,.31]} scale={[.33,.41,.14]} color="#e9eee3"/></>}
      <Ball position={[-.2,.07,.16]} scale={[.23,.12,.3]} color={hue}/><Ball position={[.2,.07,.16]} scale={[.23,.12,.3]} color={hue}/>
      {[-1,1].map(side=><Ball key={side} position={[side*.47,.6,0]} scale={[.13,.3,.15]} rotation={[0,0,side*-.7]} color={hue}/>)}
      {[-.19,.19].map(x=><Ball key={x} position={[x,1.17,.395]} scale={[.15,.17,.085]} color="#fffaf0"/>)}
      <group ref={pupils}>{[-.19,.19].map(x=><Ball key={x} position={[x,1.17,.475]} scale={[.06,.085,.023]} color="#34303d"/>)}</group>
      <Ball position={[0,1.03,.45]} scale={[.055,.037,.04]} color="#635062"/>
      <mesh position={[0,.94,.419]} rotation={[0,0,Math.PI]}><torusGeometry args={[.095,.018,8,16,Math.PI]}/><meshStandardMaterial color="#635062"/></mesh>
    </group>
  </group>
}
function Exhibit({item,index,position,onOpen,animated}){
  const hover=useRef(false)
  const object=useRef(null)
  const color=item.id==='mkr'?'#dab3ac':item.id==='serene'?'#b4cabb':'#c1b4dc'
  useFrame((_,delta)=>{if(object.current)object.current.position.y=MathUtils.damp(object.current.position.y,(hover.current && animated) ? .15 : 0,7,delta)})
  return <group position={position} rotation={[0,index===0?.17:-.12,0]}>
    <group ref={object} onPointerOver={e=>{e.stopPropagation();hover.current=true}} onPointerOut={()=>{hover.current=false}} onClick={e=>{e.stopPropagation();if(e.delta<6)onOpen(index)}}>
      <Block position={[0,.12,0]} size={[3.1,.25,1.6]} color={color}/>
      {item.id==='mkr' ? <>
        <Block position={[0,.75,-.15]} size={[2.65,1.25,.65]} color="#f4e8cd"/>
        <Block position={[0,2.03,-.3]} size={[2.8,.2,1.15]} color="#f3e4cd"/>
        {[-1.15,1.15].map(x=><Block key={x} position={[x,1.42,-.5]} size={[.12,1.1,.12]} color="#ceb792"/>)}
        {Array.from({length:7},(_,i)=><Block key={i} position={[-1.2+i*.4,1.9,.21]} size={[.4,.3,.2]} radius={.03} color={i%2?'#f7efde':'#c78280'}/>)}
        <group position={[0,1.06,.2]}><Block size={[2.24,1.24,.09]} color="#4a4550"/><Suspense fallback={null}><Screenshot src={item.image} width={2.12} height={1.12}/></Suspense></group>
        <Block position={[0,.48,.52]} size={[2.8,.16,.45]} color="#d3b996"/>
      </> : item.id==='serene' ? <>
        <Block position={[0,.3,-.12]} size={[2.65,.25,1]} color="#e2e7d6"/>
        <group position={[0,1.3,0]} rotation={[-.12,0,-.04]}><Block size={[2.55,1.85,.18]} color="#f7edd6"/><Suspense fallback={null}><Screenshot src={item.image} width={2.32} height={1.45}/></Suspense><Block position={[.95,.69,.12]} size={[.23,.22,.03]} color="#bbadc9" radius={.01}/></group>
      </> : <>
        <group position={[0,1.22,0]} rotation={[0,.1,-.1]}><Block size={[2.38,2.12,.35]} color={color}/><Block position={[-1.13,0,.02]} size={[.14,2.1,.38]} color="#9583b6"/><Block position={[.09,0,.19]} size={[2.03,1.87,.05]} color="#f3ede5"/><group position={[.08,0,.22]}><Suspense fallback={null}><Screenshot src={item.image} width={1.95} height={1.22}/></Suspense></group></group>
      </>}
    </group>
  </group>
}
function Plant({position,color='#a4bca6'}){
  return <group position={position}><mesh castShadow position={[0,.2,0]}><cylinderGeometry args={[.25,.18,.4,12]}/><meshStandardMaterial color="#d4b093"/></mesh><Block position={[0,.61,0]} size={[.07,.65,.07]} color="#849a74"/>{[-1,1].map((side,i)=><Ball key={side} position={[side*.14,.63+i*.22,0]} scale={[.2,.3,.09]} rotation={[0,0,side*-.7]} color={color}/>)}</group>
}
function Balloon({animated}){
  const ref=useRef(null)
  useFrame(({clock})=>{if(ref.current)ref.current.position.y=animated?Math.sin(clock.elapsedTime*.7)*.15:0})
  return <group position={[3.8,2.7,-2.1]}><group ref={ref}><Ball scale={[.43,.57,.43]} color="#d7c2dc"/><Block position={[0,-.79,0]} size={[.012,.49,.012]} color="#a08e99"/><Block position={[0,-1.13,0]} size={[.28,.22,.28]} color="#d6bfa2"/></group></group>
}
function Diorama({items,onOpen,onHello,hello,animated,revision}){
  const controls=useRef(null)
  const {camera,size}=useThree()
  useEffect(()=>{
    camera.position.set(7,8,12)
    camera.zoom=Math.min(size.width/12.5,size.height/8.5)
    camera.updateProjectionMatrix()
    controls.current?.target.set(0,.4,0)
    controls.current?.update()
  },[camera,size,revision])
  const positions=items.length===2?[[-1.9,0,-.55],[1.65,0,.45]]:[[-2.5,0,-.65],[.6,0,-1.6],[2.5,0,1]]
  return <>
    <ambientLight intensity={1.6}/><directionalLight castShadow position={[-4,9,6]} intensity={3} shadow-mapSize={[1024,1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} shadow-bias={-.001}/>
    <group position={[0,-.4,0]}>
      <Block position={[0,-.32,0]} size={[10.5,.65,6.8]} radius={.3} color="#bdccbc"/>
      <Block position={[0,.005,0]} size={[10.35,.08,6.65]} radius={.2} color="#e5e6d2"/>
      <Block position={[-.8,.065,1.6]} size={[5.5,.055,.65]} color="#d1d5c1"/>
      {items.map((item,i)=><Exhibit key={item.id} item={item} index={i} position={positions[i]} onOpen={onOpen} animated={animated}/>)}
      <Mascot kind="jane" position={[-2.6,.06,1.6]} animated={animated} active={hello==='jane'} onHello={onHello}/>
      <Mascot kind="jenny" position={[.2,.06,2.15]} animated={animated} active={hello==='jenny'} onHello={onHello}/>
      <Plant position={[-4.3,.05,-2.3]}/><Plant position={[4.5,.05,2.25]} color="#bdc38c"/><Plant position={[-4.3,.05,2.45]} color="#b8a7c9"/>
      <Block position={[3.8,.34,-2]} size={[.85,.65,.65]} color="#e5c59d"/>
      <Balloon animated={animated}/>
      {Array.from({length:6},(_,i)=><mesh key={i} position={[-4.5+i*.55,.059,-.15]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.1,16]}/><meshStandardMaterial color="#c8bca9"/></mesh>)}
    </group>
    <OrbitControls ref={controls} makeDefault enableZoom={false} enablePan={false} minPolarAngle={Math.PI/5} maxPolarAngle={Math.PI/2.4} minAzimuthAngle={-.85} maxAzimuthAngle={.85} target={[0,.4,0]} />
  </>
}
export default function StudioWorld({items,onOpen}){
  const {lang}=useLang()
  const zh=lang==='zh'
  const reduced=useReducedMotion()
  const box=useRef(null)
  const [near,setNear]=useState(false)
  const [visible,setVisible]=useState(false)
  const [pageVisible,setPageVisible]=useState(true)
  const [play,setPlay]=useState(true)
  const [hello,setHello]=useState(null)
  const [revision,setRevision]=useState(0)
  const [expanded,setExpanded]=useState(false)
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting);if(entry.isIntersecting)setNear(true)},{rootMargin:'150px'})
    observer.observe(box.current)
    const visibility=()=>setPageVisible(!document.hidden)
    visibility();document.addEventListener('visibilitychange',visibility)
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}
  },[])
  const fallback=<div className="world-loading"><span>✳</span><p>{zh?'从下方选择一件作品，开始逛逛。':'Pick a project below to explore.'}</p></div>
  const animated=play&&!reduced&&visible&&pageVisible
  return <div ref={box} tabIndex={-1} className={`studio-world ${expanded?'world-expanded':''}`}>
    <div className="world-heading"><div><p>RABBITSHARK / LITTLE WORLD</p><h3>{zh?'欢迎，随便逛。':'A small world of our own.'}</h3></div><span>{zh?'每个点子，都有自己的住处。':'every idea has a place here.'}</span></div>
    <div className="world-canvas" aria-label={zh?'可拖动旋转的双人工作室展岛':'A rotatable miniature studio island'}>
      {near ? <SceneBoundary fallback={fallback}><Canvas orthographic shadows dpr={[1,1.5]} camera={{position:[7,8,12],zoom:60,near:.1,far:100}} gl={{antialias:true,alpha:true}} frameloop={animated?'always':'demand'} fallback={fallback}><Diorama items={items} onOpen={index=>{box.current?.focus({preventScroll:true});onOpen(index,{currentTarget:box.current})}} hello={hello} onHello={who=>setHello(h=>h===who?null:who)} animated={animated} revision={revision}/></Canvas></SceneBoundary> : fallback}
      {hello && <div className="world-speech" role="status">{hello==='jane'?(zh?'Jane：欢迎来到兔子的设计角。':'Jane: welcome to my design corner.'):(zh?'Jenny：每个小机关，都有它的道理。':'Jenny: a little method behind the magic.')}<button onClick={()=>setHello(null)} aria-label={zh?'关闭问候':'Close greeting'}>×</button></div>}
      <div className="world-instructions">{zh?'拖动转一转 · 点作品进去看 · 和兔子鲨鱼打个招呼':'Drag to orbit · Tap a project · Say hello to the rabbit & shark'}</div>
    </div>
    <div className="world-controls"><div>{items.map((item,i)=><button key={item.id} id={`case-${item.id}`} onClick={e=>onOpen(i,e)}><span>0{i+1}</span>{item[lang].name} ↗</button>)}</div><div><button onClick={()=>{setRevision(r=>r+1);setHello(null)}}>{zh?'回正':'Recenter'} ⟲</button><button aria-pressed={play} onClick={()=>setPlay(p=>!p)}>{play?(zh?'暂停动态':'Pause motion'):(zh?'恢复动态':'Play motion')}</button><button aria-pressed={expanded} onClick={()=>setExpanded(e=>!e)}>{expanded?(zh?'收起':'Smaller'):(zh?'放大逛':'Expand')} ⤢</button></div></div>
  </div>
}
