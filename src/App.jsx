import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Menu, X, ChevronRight, CalendarDays, MapPin, Trophy, Users, Star,
  ShieldCheck, Target, ClipboardCheck, Heart, Megaphone, Dumbbell,
  UserCheck, Handshake, Mail, ArrowRight
} from 'lucide-react'

const values = [
  [Users, 'Team First', 'Be a great teammate on the field and away from it.'],
  [Target, 'Development', 'Build fundamentals, confidence, and baseball IQ.'],
  [Trophy, 'Compete', 'Bring energy, effort, and sportsmanship every inning.'],
  [ShieldCheck, 'Respect', 'Respect teammates, coaches, opponents, and umpires.'],
]

const pathway = [
  ['8U–9U', 'Foundation', 'Throwing, catching, hitting fundamentals, movement, baserunning, and love of the game.'],
  ['10U–12U', 'Development', 'Situational defense, approach hitting, pitching development, communication, and baseball IQ.'],
  ['13U+', 'Competitive', 'Advanced approach, strength and mobility, position development, pitching plans, and preparation.'],
]

const practice = [
  ['0–10', 'Athletic Warm-Up'], ['10–25', 'Throwing Development'], ['25–50', 'Skill Stations'],
  ['50–70', 'Team Defense'], ['70–85', 'Competitive Segment'], ['85–90', 'Team Close']
]

const launch = [
  ['Days 1–30', 'Build', ['Mission and program structure', 'Coaching philosophy', 'Budget and safety policies', 'Brand and website']],
  ['Days 31–60', 'Recruit', ['Open workout', 'Tryout promotion', 'Coach recruitment', 'Sponsor outreach']],
  ['Days 61–90', 'Launch', ['Select the roster', 'Parent meeting', 'Uniforms and schedule', 'Begin team training']],
]

const nav = [['mission','Mission'],['pathway','Player Pathway'],['practice','Development'],['uniforms','Uniforms'],['tryout-flyer','Tryouts'],['contact','Join']]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return <div className="site">
    <nav className="nav"><div className="nav-inner">
      <button className="brand" onClick={() => scrollTo('home')}><span className="brand-mark">KFP</span><span><small>Kentucky</small><b>Foul Poles</b></span></button>
      <div className="nav-links">{nav.map(([id,label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
      <button className="button yellow desktop" onClick={() => scrollTo('contact')}>JOIN THE FOUL POLES</button>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </div>{menuOpen && <div className="mobile-links">{nav.map(([id,label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>}</nav>

    <main>
      <section id="home" className="hero"><div className="hero-ring"/><div className="container hero-grid">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
          <div className="eyebrow light"><Star size={14} fill="currentColor"/> Kentucky Youth Baseball</div>
          <h1>Develop.<br/><span>Compete.</span><br/>Belong.</h1>
          <p>The Kentucky Foul Poles are building confident young ballplayers through excellent coaching, purposeful practices, strong character, and a genuine love of baseball.</p>
          <div className="actions"><button className="button yellow" onClick={() => scrollTo('contact')}>TRYOUT INTEREST <ChevronRight size={18}/></button><button className="button outline" onClick={() => scrollTo('mission')}>OUR PROGRAM</button></div>
        </motion.div>
        <motion.div className="logo-disc" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:.15,duration:.6}}><div><strong>KFP</strong><b>BASEBALL</b><i/></div></motion.div>
      </div></section>

      <section id="mission" className="section"><div className="container mission-grid"><div><div className="eyebrow">The Foul Poles Standard</div><h2>Players and people first.</h2><p className="lead">Winning matters. Getting better matters more. Our program creates a competitive environment where players learn fundamentals, accountability, sportsmanship, and how to be a great teammate.</p></div><div className="card-grid">{values.map(([Icon,title,text]) => <article className="card" key={title}><span className="icon-box"><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section id="pathway" className="section dark"><div className="container"><div className="eyebrow yellow-text">Built to Grow</div><h2>The Foul Poles Player Pathway</h2><p className="lead light-text">One standard. Age-appropriate instruction. A clear progression from first foundations to advanced competition.</p><div className="three-grid">{pathway.map(([age,label,text],i) => <motion.article whileHover={{y:-6}} className="path-card" key={age}><span className="ghost">0{i+1}</span><b className="pill">{age}</b><h3>{label}</h3><p>{text}</p></motion.article>)}</div></div></section>

      <section id="practice" className="section"><div className="container split"><div><div className="eyebrow">Purposeful Practice</div><h2>Every minute has a job.</h2><p className="lead">Our 90-minute practice model combines movement, throwing development, skill work, team defense, and competition. Players leave knowing what they learned and what comes next.</p><div className="mini-grid">{[[Dumbbell,'Athletic Movement'],[ClipboardCheck,'Baseball IQ'],[UserCheck,'Player Goals'],[Heart,'Love the Game']].map(([Icon,label]) => <div key={label}><Icon/>{label}</div>)}</div></div><div className="practice-card"><header><b>90-Minute Practice</b><CalendarDays/></header>{practice.map(([time,label],i) => <div className="practice-row" key={time}><b>{time}</b><span>{i+1}</span><strong>{label}</strong></div>)}</div></div></section>

      <section className="promise"><div className="container promise-grid"><div><div className="eyebrow navy">Our Coaching Promise</div><h2>Teach. Challenge. Encourage. Never embarrass.</h2><p>Foul Poles coaches come prepared, communicate clearly, teach fundamentals, create competitive practices, and model sportsmanship.</p></div><ShieldCheck size={92}/></div></section>

      <section id="launch" className="section"><div className="container center"><div className="eyebrow">The First 90 Days</div><h2>Build the program the right way.</h2><p className="lead narrow">Start with one excellent team. Create a repeatable system. Grow only when the coaching and family experience are ready.</p><div className="three-grid left">{launch.map(([phase,title,items]) => <article className="launch-card" key={phase}><header><small>{phase}</small><h3>{title}</h3></header><div>{items.map(item => <p key={item}><ClipboardCheck size={20}/>{item}</p>)}</div></article>)}</div></div></section>

      <section className="section dark"><div className="container split"><div><div className="eyebrow yellow-text">Families Know the Standard</div><h2>Clear expectations. Better experience.</h2><p className="lead light-text">Before the season, every family receives clear guidance on playing time, positions, attendance, communication, sideline behavior, umpire respect, and social media.</p></div><div className="family-grid">{['24-hour communication rule','Parents cheer. Coaches coach.','No promised positions','Zero umpire abuse','Attendance expectations','Development updates'].map(x => <div key={x}><Handshake/>{x}</div>)}</div></div></section>

      <section id="uniforms" className="section"><div className="container center"><div className="eyebrow">Foul Poles Look</div><h2>Our Uniforms</h2><p className="lead narrow">Royal blue, Kentucky yellow, and white give the Foul Poles a bold, recognizable identity from the dugout to the field.</p><div className="uniform-grid"><figure><img src="/blueuni.jpg" alt="Kentucky Foul Poles royal blue uniform concept"/><figcaption>Royal Blue Uniform</figcaption></figure><figure><img src="/yellowuni.jpg" alt="Kentucky Foul Poles yellow uniform concept"/><figcaption className="yellow-cap">Kentucky Yellow Uniform</figcaption></figure></div></div></section>

      <section id="tryout-flyer" className="section dark"><div className="container flyer-grid"><div><div className="eyebrow yellow-text">Private Tryouts</div><h2>Compete. Develop. Grow.</h2><p className="lead light-text">Interested players and families can use our private-tryout flyer for program information and scheduling details.</p><button className="button yellow" onClick={() => scrollTo('contact')}>REQUEST A TRYOUT <ChevronRight size={18}/></button></div><figure className="flyer"><img src="/tryoutflyer.jpg" alt="Kentucky Foul Poles private tryouts flyer"/></figure></div></section>

      <section id="contact" className="contact"><div className="container contact-card"><div><span className="icon-box"><Megaphone/></span><h2>Ready to join?</h2><p className="lead">Share your interest in tryouts, coaching, volunteering, or sponsoring the Kentucky Foul Poles.</p><p className="contact-line"><MapPin/> Kentucky Youth Baseball</p><p className="contact-line"><Mail/> Program interest form</p></div><div>{formSent ? <div className="success"><Star/><h3>Interest received!</h3><p>This demo confirms in the browser only. Connect a form service before launch.</p><button className="button blue" onClick={() => setFormSent(false)}>SUBMIT ANOTHER</button></div> : <form onSubmit={e => {e.preventDefault(); setFormSent(true)}}><input required placeholder="Parent/guardian name" className="wide"/><input required type="email" placeholder="Email"/><input placeholder="Player age"/><select className="wide" defaultValue="tryouts"><option value="tryouts">Interested in tryouts</option><option value="coaching">Interested in coaching</option><option value="volunteering">Interested in volunteering</option><option value="sponsoring">Interested in sponsoring</option></select><textarea className="wide" placeholder="Tell us a little more" rows="4"/><button className="button yellow wide" type="submit">SEND INTEREST <ArrowRight size={18}/></button></form>}</div></div></section>
    </main>

    <footer><div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark small">KFP</span><span><b>Kentucky Foul Poles</b><small>Develop. Compete. Belong.</small></span></div><small>© 2026 Kentucky Foul Poles Baseball</small></div></footer>
  </div>
}
