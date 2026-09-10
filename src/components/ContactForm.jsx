import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { studio } from '../data/people'
import { ui } from '../data/ui'
import { useLang } from '../lang'

export default function ContactForm() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const T = ui[lang]
  const reduced = useReducedMotion()
  const [form,setForm] = useState({name:'',problem:'',email:''})
  const [phase,setPhase] = useState('editing')
  const status = useRef(null)
  const firstField = useRef(null)
  const update = key => e => setForm(f=>({...f,[key]:e.target.value}))
  const name = form.name.trim()
  const signature = [name ? `— ${name}` : '', form.email.trim()].filter(Boolean).join('\n')
  const body = [form.problem.trim(), signature].filter(Boolean).join('\n\n')
  const subject = name ? `${T.formSubject} ${name}` : (zh ? '给 RabbitShark 的一封信' : 'Hello, RabbitShark')
  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  useEffect(()=>{
    if(phase!=='tearing')return
    const timer=setTimeout(()=>setPhase('packed'),reduced?0:1450)
    return ()=>clearTimeout(timer)
  },[phase,reduced])
  useEffect(()=>{if(phase==='packed')status.current?.focus()},[phase])
  function send(e){
    e.preventDefault()
    // The animation acknowledges composition only; mailto cannot confirm sending.
    window.location.href=mailto
    setPhase('tearing')
  }
  return <div className={`letter-interaction letter-phase-${phase}`}>
    <div className="tear-perforation" aria-hidden="true"><span />✂<span /></div>
    {phase!=='packed' && <form className="letter-form tear-sheet" noValidate onSubmit={send}>
      <fieldset disabled={phase!=='editing'}><input ref={firstField} className="letter-field" value={form.name} onChange={update('name')} placeholder={zh?'怎么称呼你（选填）':'Your name (optional)'} aria-label={zh?'怎么称呼你（选填）':'Your name (optional)'} autoComplete="name" /><textarea className="letter-field letter-message" value={form.problem} onChange={update('problem')} placeholder={zh?'随便写点什么，留白也可以。':'A thought, a hello… or leave this blank.'} aria-label={zh?'信件内容（选填）':'Your note (optional)'} rows={4} /><input className="letter-field" type="text" inputMode="email" value={form.email} onChange={update('email')} placeholder={zh?'回信地址（选填）':'Reply address (optional)'} aria-label={zh?'回信地址（选填）':'Reply address (optional)'} autoComplete="email" /><div className="letter-submit-row"><button type="submit" className="letter-tear-button">{zh?'撕下这封信，打开邮件':'Tear off & compose'}<span aria-hidden="true">↗</span></button><span>{zh?'写完，就出发。':'a thought, on its way.'}</span></div></fieldset>
      <p className="letter-compose-note">{zh?'会打开你的邮件应用，由你确认发送。':'Opens your email app for you to review and send.'}</p>
    </form>}
    {phase!=='editing' && <div className="letter-envelope-scene" aria-hidden="true"><div className="letter-envelope"><span className="envelope-insert" /><span className="envelope-front" /><span className="envelope-flap" /><img src="/ip/logo.png" alt="" /></div><span className="envelope-swoosh">↗</span></div>}
    {phase==='packed' && <div className="letter-packed-message" ref={status} tabIndex={-1} role="status"><h3>{zh?'想法，装好了。':'One thought, wrapped up.'}</h3><p>{zh?'请在邮件应用中确认并发送。这里无法确认邮件是否已发出。':'Review and send it in your email app. We can’t confirm sending from here.'}</p><a href={mailto} className="quiet-link">{zh?'再次打开邮件应用':'Open email app again'} ↗</a><button onClick={()=>{setPhase('editing');setTimeout(()=>firstField.current?.focus(),0)}}>{zh?'展开信纸，继续修改':'Unfold & keep editing'} ↶</button></div>}
    <p className="letter-direct">{T.formDirect} <a href={`mailto:${studio.email}`}>{studio.email}</a></p>
  </div>
}
