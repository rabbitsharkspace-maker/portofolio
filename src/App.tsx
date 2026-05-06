import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Download, 
  MapPin, 
  Mail, 
  Instagram, 
  Linkedin, 
  ChevronRight, 
  FileText, 
  Palette, 
  Camera, 
  Zap, 
  Menu, 
  X 
} from 'lucide-react';

// --- Data ---

const PROJECTS = [
  {
    id: 'kno',
    title: 'Kno',
    type: 'KNOWLEDGE PLATFORM · LIVE PRODUCT',
    description: 'A knowledge operating system powered by Gemini AI. Users capture content, build a personal knowledge graph, and surface insights through Logic Guard, Memory Lab, and AI synthesis tools.',
    image: '/kno.png',
    tags: ['React', 'TypeScript', 'Gemini AI', 'Firebase'],
    link: '#'
  },
  {
    id: 'fast-resume',
    title: 'FastResume',
    type: 'AI TOOL · LIVE PRODUCT',
    description: 'An AI-powered resume builder that analyses job descriptions, optimises for ATS systems, and runs real-time voice mock interviews. Built and launched independently.',
    image: '/ai-fast-resume.png',
    tags: ['Next.js', 'OpenAI', 'Python', 'Tailwind'],
    link: '#'
  }
];

const ILLUSTRATIONS = [
  {
    title: 'Botanical Linocut Print',
    description: 'A rustic, hand-pulled linocut-style illustration of a rose branch featuring peachy-pink flowers and light blue leaves, accompanied by the text "STILLNESS IN BLOOM" at the bottom.',
    image: '/botanical-linocut.jpg'
  },
  {
    title: 'Grumpy Cat on Books',
    description: 'A charming black-and-white ink illustration of a grumpy-looking tabby cat wearing a bowtie. The cat is sitting proudly atop a tall stack of playfully titled books, such as "Grumpy Tales" and "The Whisker."',
    image: '/grumpy-cat.png'
  },
  {
    title: 'Minimalist Reader',
    description: 'A simple, black-and-white line art drawing of a person sitting cross-legged on a cozy floor cushion, wearing headphones and deeply focused on reading a book.',
    image: '/minimalist-reader.jpg'
  },
  {
    title: 'Vibrant Kawaii Illustration',
    description: 'A highly colorful, anime-style illustration featuring a cute girl floating in a dreamy, surreal landscape. The background is filled with playful elements like rainbows, stars, onigiri (rice balls), and the Tokyo Tower, capturing a "Yume Kawaii" aesthetic.',
    image: '/vibrant-kawaii.jpg'
  },
  {
    title: 'Cozy Watercolor Scene',
    description: 'A soft watercolor painting depicting a relaxing moment of a woman wrapped in a knitted blanket, reading a book by a large window. A tabby cat sleeps peacefully beside her, with a beautiful view of a lush garden outside.',
    image: '/watercolor-scene.jpg'
  },
  {
    title: 'Simplistic Digital Drawing',
    description: 'A charmingly crude, MS-Paint style digital drawing showing a red convertible car parked on a beach near the ocean and a cluster of white houses, with the text "MY RED CAR AN BEACH" written in the sky.',
    image: '/digital-drawing-car.jpg'
  },
  {
    title: 'Seasonal Retreat Illustration',
    description: 'A vibrant, illustrative flyer designed to promote a seasonal outdoor community gathering.',
    image: '/camp-poster.jpg'
  },
  {
    title: 'Holiday Campaign Visuals',
    description: 'A targeted promotional graphic highlighting festive discounts for premium outdoor gear.',
    image: '/camp-sales.jpg'
  },
  {
    title: 'Restaurant Ordering Interface',
    description: 'A clear, step-by-step visual menu guide crafted for a seamless dining experience.',
    image: '/malaysian-hotpot.jpg'
  },
  {
    title: 'Character Concept Art',
    description: 'A stylized, character-driven illustration showcasing vibrant colors and modern digital aesthetics.',
    image: '/character-concept.jpg'
  },
  {
    title: 'Hyper-Realistic Avatar',
    description: 'A highly detailed, photorealistic digital portrait demonstrating advanced rendering techniques.',
    image: '/avatar-realistic.png'
  },
  {
    title: 'Outdoor Equipment Showcase',
    description: 'A lifestyle product photograph emphasizing the durability and sleek design of camping furniture.',
    image: '/outdoor-furniture.jpg'
  }
];

const POSTERS = [
  {
    title: 'Futuristic Concept Car',
    description: 'A dynamic 3D render of a sleek, futuristic sports car speeding through a tunnel. It is highlighted by vibrant pink and blue neon light trails that emphasize a sense of high speed and advanced technology.',
    image: '/futuristic-car.jpg'
  },
  {
    title: 'Streetwear Fashion Poster',
    description: 'A dynamic, magazine-style poster featuring a model in modern urban streetwear (a puffer jacket, full face mask, and patchwork jeans) floating against a bright, cloudy sky. It includes the bold typography "AETHER" and "RISE ABOVE WITH FASHION".',
    image: '/streetwear-poster.jpg'
  },
  {
    title: 'Campsite Configuration',
    description: 'A multi-panel layout displaying functional outdoor seating and shelter setups.',
    image: '/camp-config-1.jpg'
  },
  {
    title: 'Stylized Pet Illustration',
    description: 'A clean, cartoon-style depiction of a Border Collie against a minimalist backdrop.',
    image: '/pet-illustration.jpg'
  },
  {
    title: 'Holiday Event Graphic',
    description: 'A heartwarming, hand-drawn promotional poster celebrating Father\'s Day with a playful layout.',
    image: "/fathers-day.jpg"
  },
  {
    title: 'Mixed Media Urban Photography',
    description: 'An engaging blend of urban street photography enhanced by playful digital illustration overlays.',
    image: '/urban-photography.jpg'
  },
  {
    title: 'Lifestyle Photo Collage',
    description: 'A curated grid of candid moments designed to evoke a strong sense of nostalgia and community.',
    image: '/lifestyle-collage.jpg'
  },
  {
    title: 'Editorial Behind-the-Scenes',
    description: 'A polished documentary-style photograph capturing the dynamic environment of a high-end fashion shoot.',
    image: '/editorial-shoot.jpg'
  }
];

const RESOURCES = [
  { name: 'MeBumi: Branding & Digital Communications Strategy', path: '/strategy-mebumi.pdf' },
  { name: 'Shell: Sustainable Offshore Repurposing Strategy', path: '/strategy-shell.pdf' },
  { name: 'Nibou: Nurturing Sustainability Initiatives Strategy', path: '/strategy-nibou.pdf' },
  { name: 'ACQUABOSS: Summer Accessories Catalogue', path: '/catalogue-acquaboss.pdf' },
  { name: 'Mozzigear: Outdoor Lifestyle Catalogue', path: '/catalogue-mozzigear.pdf' },
  { name: 'Armor Trailer: Heavy Duty Trailer Catalogue', path: '/catalogue-armor-trailer.pdf' },
];

// --- Components ---

const SectionHeader = ({ badge, title, subtitle }: { badge: string, title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="inline-block mb-4 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-bold tracking-widest uppercase rounded-full"
    >
      {badge}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-6xl text-brand-ink mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl italic text-brand-gold font-serif"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePdf, setActivePdf] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white bg-brand-cream/30">
      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {activePdf && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-brand-ink/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-6xl h-full rounded-2xl overflow-hidden flex flex-col relative"
            >
              <div className="p-6 border-b border-brand-ink/10 flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-serif">{RESOURCES.find(r => r.path === activePdf)?.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-brand-ink/40">
                    <button className="px-3 py-1 bg-brand-cream rounded hover:bg-brand-gold/10 transition-colors">← Prev</button>
                    <span>Page 1 of 15</span>
                    <button className="px-3 py-1 bg-brand-cream rounded hover:bg-brand-gold/10 transition-colors">Next →</button>
                  </div>
                </div>
                <button 
                  onClick={() => setActivePdf(null)}
                  className="p-2 hover:bg-brand-cream rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-auto p-8 bg-brand-cream/20 bg-cover bg-center flex items-center justify-center">
                <div className="w-full max-w-5xl aspect-[16/9] bg-white shadow-2xl rounded-lg overflow-hidden border border-brand-ink/5">
                  <iframe src={encodeURI(activePdf)} title="PDF Viewer" className="w-full h-full border-none" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-brand-cream/80 backdrop-blur-xl py-4 border-b border-brand-ink/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/logo.png" alt="RabbitShark Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter font-serif leading-none">RabbitShark</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-brand-gold font-bold">Studio</span>
            </div>
          </motion.div>

          <div className="hidden md:flex gap-10 items-center">
            {['Work', 'Design', 'About', 'Resources', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-brand-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brand-ink z-[90] flex flex-col justify-center items-center gap-8 text-brand-cream"
          >
            {['Work', 'Design', 'About', 'Resources', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif hover:text-brand-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 overflow-hidden border-b border-brand-ink/10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-brand-gold/10 rounded-full">
              <Zap size={14} className="text-brand-gold" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold">Product · Design · Strategy</span>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight mb-12">
              Rabbit<span className="italic font-normal">Shark</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-ink/70 leading-relaxed max-w-2xl mb-12">
              We bridge the gap between creative vision and technical execution. Building next-generation digital products and evocative brand stories.
            </p>
            <div className="flex gap-6 flex-wrap">
              <a href="#work" className="bg-brand-ink text-brand-cream px-10 py-5 rounded transition-transform hover:scale-105">
                View Portoflio
              </a>
              <a href="#contact" className="border border-brand-ink/20 px-10 py-5 rounded transition-colors hover:bg-brand-ink/5">
                Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Aesthetic elements */}
        <div className="absolute -bottom-40 -right-40 w-120 h-120 bg-brand-gold/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader 
            badge="Featured Work" 
            title="Projects" 
            subtitle="Digital products built with intent"
          />
          <div className="grid md:grid-cols-2 gap-16">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-white mb-8 shadow-sm">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={encodeURI(project.image)} 
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl mb-2">{project.title}</h3>
                    <p className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4">{project.type}</p>
                    <p className="text-brand-ink/70 leading-relaxed max-w-md">{project.description}</p>
                  </div>
                  <div className="w-12 h-12 border border-brand-ink/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-brand-ink group-hover:text-brand-cream">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrations & Posters */}
      <section id="design" className="py-32 bg-brand-ink/2">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader 
            badge="Visual Gallery" 
            title="Illustrations" 
            subtitle="Artistic explorations and thematic captures"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {ILLUSTRATIONS.map((img, idx) => (
              <motion.div 
                key={img.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl border border-brand-ink/5"
              >
                <div className="overflow-hidden rounded-lg mb-6 shadow-xs border border-brand-ink/5">
                  <img src={encodeURI(img.image)} alt={img.title} className="w-full aspect-square object-cover transition-transform hover:scale-110 duration-700" />
                </div>
                <h3 className="text-xl mb-2 flex items-center gap-2">
                  <Camera size={16} className="text-brand-gold" />
                  {img.title}
                </h3>
                <p className="text-sm text-brand-ink/60 leading-relaxed italic">{img.description}</p>
              </motion.div>
            ))}
          </div>

          <SectionHeader 
            badge="Print & Branding" 
            title="Posters" 
            subtitle="Graphic identity and editorial design"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {POSTERS.map((poster, idx) => (
              <motion.div 
                key={poster.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-lg mb-6 bg-brand-ink/5 border border-brand-ink/5 aspect-[3/4]">
                  <img src={encodeURI(poster.image)} alt={poster.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" />
                </div>
                <h3 className="text-lg mb-1 flex items-center gap-2">
                  <Palette size={16} className="text-brand-gold" />
                  {poster.title}
                </h3>
                <p className="text-xs text-brand-ink/60 uppercase tracking-widest leading-relaxed mb-1">{poster.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section id="resources" className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader 
            badge="Asset Vault" 
            title="Resources" 
            subtitle="Catalogues, strategy decks and presentations"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((doc, idx) => (
              <motion.div 
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActivePdf(doc.path)}
                className="flex items-center gap-4 p-6 bg-white border border-brand-ink/10 rounded-lg hover:border-brand-gold transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-brand-cream flex items-center justify-center rounded-full group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-grow overflow-hidden">
                  <h4 className="font-bold text-sm truncate uppercase tracking-wider">{doc.name}</h4>
                  <span className="text-[10px] text-brand-ink/40 font-mono tracking-tighter">VIEW DOCUMENT</span>
                </div>
                <Download size={16} className="text-brand-ink/30 group-hover:text-brand-gold" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-brand-gold/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <SectionHeader 
                badge="The Studio" 
                title="RabbitShark" 
                subtitle="Small team, massive leverage"
              />
              <div className="space-y-8 text-xl text-brand-ink/80 leading-[1.7] font-serif">
                <p>
                  RabbitShark is a creative collective founded on the principle that modern software should be both powerful and poetic.
                </p>
                <p>
                  We operate at the intersection of AI, design, and commerce. By leveraging advanced tools and artisanal attention to detail, we help startups and established brands define their future.
                </p>
                <div className="pt-10 flex gap-12">
                  <div>
                    <span className="text-5xl block mb-2 font-serif">08+</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">Years Exp</span>
                  </div>
                  <div>
                    <span className="text-5xl block mb-2 font-serif">12+</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">Live Products</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 h-[600px]">
              <div className="space-y-4 pt-12">
                <img src="/camp-config-1.jpg" alt="About 1" className="w-full h-[300px] object-cover rounded-xl shadow-lg" />
                <img src="/malaysian-hotpot.jpg" alt="About 2" className="w-full h-full object-cover rounded-xl shadow-lg" />
              </div>
              <div className="space-y-4">
                <img src="/camp-poster.jpg" alt="About 3" className="w-full h-full object-cover rounded-xl shadow-lg" />
                <img src="/kno.png" alt="About 4" className="w-full h-[250px] object-cover rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-brand-ink text-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl mb-12"
          >
            Let's build <span className="italic">something</span> extraordinary.
          </motion.h2>
          <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto mb-16 font-serif">
            Currently accepting select projects for Q3/Q4 2026. Reach out if you're ready to redefine your space.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <a href="mailto:rabbitshark.space@gmail.com" className="flex items-center gap-3 text-2xl hover:text-brand-gold transition-colors font-serif">
              <Mail className="text-brand-gold whitespace-nowrap" />
              rabbitshark.space@gmail.com
            </a>
            <div className="flex gap-6">
              <Instagram className="cursor-pointer hover:text-brand-gold transition-colors" />
              <Linkedin className="cursor-pointer hover:text-brand-gold transition-colors" />
            </div>
          </div>
        </div>
        
        {/* Background texture element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(200,169,126,0.3),transparent_70%)]" />
        </div>
      </section>

      <footer className="py-12 border-t border-brand-ink/5 bg-brand-cream">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif font-bold italic">© 2026 RabbitShark Studio</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold opacity-40">
            <span>Privary Policy</span>
            <span>Terms of Service</span>
            <span>Based in SE Asia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
