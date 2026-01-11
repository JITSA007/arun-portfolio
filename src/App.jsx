import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Sparkles, 
  Brush, 
  Award, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Play,
  Palette,
  Users,
  Menu,
  X
} from 'lucide-react';

/* --- 3D TILT CARD COMPONENT --- 
  Updated to handle touch devices gracefully and auto-animate if needed.
*/
const TiltCard = ({ children, className }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`transition-transform duration-200 ease-out transform preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      {children}
    </div>
  );
};

/* --- PARALLAX SECTION COMPONENT --- */
const ParallaxSection = ({ image, children, overlayOpacity = 0.7 }) => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover" 
         style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

/* --- MAIN APP COMPONENT --- */
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('editorial');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = "919958696838"; 
  const whatsappMessage = "Hi Arun, I saw your portfolio and would like to discuss a booking for an upcoming shoot/event.";

  const portfolioData = {
    editorial: [
      { id: 1, title: "Vogue India Concept", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop", desc: "High Fashion / Studio" },
      { id: 2, title: "Neon Noir", img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop", desc: "Creative Lighting" },
      { id: 3, title: "The Golden Hour", img: "https://images.unsplash.com/photo-1512257962803-05953531b46a?q=80&w=1974&auto=format&fit=crop", desc: "Outdoor Editorial" },
    ],
    bridal: [
      { id: 4, title: "Royal Rajasthan", img: "https://images.unsplash.com/photo-1583971277682-998845c47936?q=80&w=1974&auto=format&fit=crop", desc: "Traditional Bridal" },
      { id: 5, title: "Modern Muse", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2070&auto=format&fit=crop", desc: "Reception Glam" },
      { id: 6, title: "Sangeet Night", img: "https://images.unsplash.com/photo-1546193430-c2d207739ed7?q=80&w=1966&auto=format&fit=crop", desc: "Subtle Glow" },
    ],
    redcarpet: [
      { id: 7, title: "Cannes Concept", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", desc: "Celebrity Look" },
      { id: 8, title: "FilmFare Ready", img: "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?q=80&w=2070&auto=format&fit=crop", desc: "HD Makeup" },
      { id: 9, title: "Met Gala Tribute", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop", desc: "Avant Garde" },
    ]
  };

  // Reusable gradient classes
  const rainbowText = "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500";
  const coolGradientText = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600";
  const warmGradientText = "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500";
  const rainbowBorder = "bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500";

  return (
    <div className="bg-zinc-950 text-white font-sans min-h-screen selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter uppercase font-serif z-50 relative">
            Arun <span className={rainbowText}>Chaudhary</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
            <a href="#about" className="hover:text-cyan-400 transition-colors">The Artist</a>
            <a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-pink-400 transition-colors">Services</a>
            <a href="#masterclass" className="hover:text-yellow-400 transition-colors">Masterclass</a>
          </div>

          <div className="hidden md:block">
            <a 
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-2 text-xs font-bold uppercase tracking-widest group overflow-hidden inline-block"
            >
               <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></span>
               <span className="relative text-white group-hover:tracking-widest transition-all duration-300">Book Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          <div className="flex flex-col space-y-8 text-center text-xl uppercase tracking-widest font-bold">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors">The Artist</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors">Portfolio</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-pink-400 transition-colors">Services</a>
            <a href="#masterclass" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Masterclass</a>
            <a 
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${rainbowText} mt-4 block`}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-pulse-slow opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
          
          {/* Ambient Rainbow Glows - Mobile Optimized */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-purple-600/20 rounded-full blur-[50px] md:blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-cyan-600/20 rounded-full blur-[50px] md:blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className={`${warmGradientText} tracking-[0.3em] uppercase text-xs md:text-sm mb-4 animate-fade-in-up font-bold`}>Visage Architect</p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight animate-fade-in-up delay-100">
            SCULPTING <br/>
            <span className={rainbowText}>CONFIDENCE</span>
          </h1>
          <p className="text-zinc-300 text-base md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up delay-200 px-4">
            For the 8K lens and the naked eye. Bringing Bollywood drama and editorial precision to every face.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300 px-8">
            <a href="#portfolio" className="px-8 py-3 border border-white/30 hover:border-purple-500 hover:text-purple-400 transition-all duration-300 uppercase tracking-widest text-sm w-full md:w-auto rounded-none">
              View My Work
            </a>
            <a href="#about" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 uppercase tracking-widest text-sm w-full md:w-auto flex items-center justify-center gap-2 text-white shadow-lg shadow-purple-900/40 rounded-none">
              My Story <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* --- AUTHORITY / ACHIEVEMENTS SECTION --- */}
      <section id="about" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              {/* Added animate-float for mobile 3D feel */}
              <div className="animate-float">
                <TiltCard className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" 
                    alt="Arun Working" 
                    className="w-full h-[400px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl shadow-purple-900/20"
                  />
                  <div className="absolute bottom-5 right-5 md:bottom-10 md:-right-10 bg-zinc-900 border border-white/10 p-1 backdrop-blur-xl shadow-xl max-w-[200px] md:max-w-xs transform translate-y-4 md:translate-y-0">
                    <div className="bg-zinc-950 p-4 md:p-6 border border-zinc-800 relative overflow-hidden group">
                       <div className={`absolute top-0 left-0 w-full h-1 ${rainbowBorder}`}></div>
                       <p className={`${rainbowText} text-2xl md:text-4xl font-serif font-bold mb-1`}>Top 1%</p>
                       <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-wider">Ranked Artist Nationwide</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-1 w-12 ${rainbowBorder}`}></div>
                <span className="text-zinc-400 uppercase tracking-widest text-sm">The Artist</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8">From Bobbi Brown to <span className={`italic ${coolGradientText}`}>Bollywood</span></h2>
              
              <div className="space-y-6 text-zinc-300 leading-relaxed font-light text-sm md:text-base">
                <p>
                  Makeup isn't just about color; it's about lighting, bone structure, and the story the face needs to tell. 
                  With over two years of rigorous experience at <strong className="text-white">Bobbi Brown</strong>, I mastered the art of skin-like finishes and high-impact glamour.
                </p>
                <p>
                  My tenure wasn't just about participation—it was about domination. I was recognized as the <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 font-bold">Certified Pan-India Sales Topper (2023-24)</strong>, outperforming artists across the country. This accolade proves not just my artistry, but my consistency.
                </p>
                <p>
                  Now, I bring that discipline and perfectionism to the independent sector, specializing in editorial, cinematic, and bridal makeup that withstands the scrutiny of HD cameras.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div className="group">
                  <Award className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h4 className="text-lg md:text-xl font-bold mb-2">Pan-India Topper</h4>
                  <p className="text-xs md:text-sm text-zinc-500">Rank #1 Performer at Bobbi Brown India (2023-24)</p>
                </div>
                <div className="group">
                  <Camera className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h4 className="text-lg md:text-xl font-bold mb-2">Editorial Ready</h4>
                  <p className="text-xs md:text-sm text-zinc-500">Specialized in lighting-focused makeup for photography.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">The Work</h2>
            <div className="flex justify-center gap-4 md:gap-8 mt-8 flex-wrap">
              {['editorial', 'bridal', 'redcarpet'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`uppercase tracking-widest text-xs md:text-sm pb-2 border-b-2 transition-all duration-300 ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-zinc-500 hover:text-white hover:border-zinc-700'}`}
                >
                  <span className={activeTab === tab ? rainbowText : ''}>
                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData[activeTab].map((item, index) => (
              // Added animation delay based on index for cascade effect
              <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <TiltCard className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4] p-[1px] bg-gradient-to-tr from-transparent via-transparent to-transparent group-hover:from-pink-500 group-hover:via-yellow-500 group-hover:to-cyan-500 transition-all duration-500">
                    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                      {/* Mobile: Text always visible with gradient. Desktop: Reveal on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                        <h3 className={`text-xl md:text-2xl font-serif font-bold italic ${index % 2 === 0 ? 'text-pink-400' : 'text-cyan-400'}`}>{item.title}</h3>
                        <p className="text-white text-xs md:text-sm tracking-widest uppercase mt-2">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href={`https://wa.me/${phoneNumber}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-xs border-b border-zinc-700 hover:border-white pb-1 group">
              View Full Gallery on Instagram <Instagram size={14} className="group-hover:text-pink-500 transition-colors"/>
            </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES (PARALLAX) --- */}
      <ParallaxSection image="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop">
        <section id="services" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Signature Services</h2>
              <p className="text-zinc-300 px-4">
                Tailored experiences for brides, models, and production houses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Sparkles size={40} />, 
                  title: "Bridal Couture", 
                  color: "text-red-500",
                  desc: "Waterproof, tear-proof, 16-hour wear bridal makeup designed for Indian weddings. Includes skin prep and jewelry setting." 
                },
                { 
                  icon: <Camera size={40} />, 
                  title: "Editorial & Campaign", 
                  color: "text-cyan-500",
                  desc: "High-concept looks for fashion magazines, brand campaigns, and e-commerce shoots. Focused on lighting and texture." 
                },
                { 
                  icon: <Palette size={40} />, 
                  title: "Film & SFX", 
                  color: "text-purple-500",
                  desc: "Character design, aging, wounds, and period-specific makeup for film and television productions." 
                }
              ].map((service, index) => (
                <div key={index} className="bg-zinc-950/80 backdrop-blur-md p-8 md:p-10 border border-white/5 hover:border-transparent relative group transition-all duration-300 overflow-hidden rounded-lg md:rounded-none">
                   {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300`}></div>
                  
                  <div className={`${service.color} group-hover:scale-110 transition-transform duration-300 mb-6`}>{service.icon}</div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* --- THE PROCESS --- */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 w-full">
               <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">The Process</h2>
               <div className="space-y-8">
                 {[
                   { step: "01", title: "The Vision", gradient: "from-pink-500 to-red-500", desc: "A detailed consultation to understand your skin type, outfit, and lighting conditions." },
                   { step: "02", title: "The Canvas", gradient: "from-yellow-400 to-green-500", desc: "Luxury skin prep using techniques honed at Bobbi Brown to ensure flawless application." },
                   { step: "03", title: "The Execution", gradient: "from-blue-500 to-purple-500", desc: "Layer-by-layer application focused on longevity and photographic perfection." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 group">
                     <span className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${item.gradient}`}>{item.step}</span>
                     <div>
                       <h4 className="text-lg md:text-xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                       <p className="text-zinc-400 text-sm">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="md:w-1/2 w-full relative">
               <div className="relative z-10 grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop" className="rounded-sm mt-12 hover:scale-105 transition-transform duration-500 shadow-2xl" alt="Makeup Kit" />
                 <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=2070&auto=format&fit=crop" className="rounded-sm hover:scale-105 transition-transform duration-500 shadow-2xl" alt="Brushes" />
               </div>
               {/* Decorative Circle with Rainbow Border */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-zinc-800 rounded-full -z-0 animate-spin-slow opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MASTERCLASS SECTION --- */}
      <section id="masterclass" className="py-16 md:py-24 bg-zinc-900 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <span className={`uppercase tracking-widest text-sm mb-4 block ${rainbowText} font-bold`}>Education</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">The Masterclass</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-12 px-4">
            Leveraging my background as a lead trainer, I offer intimate workshops for aspiring artists. 
            Learn the industry secrets of "The Bobbi Brown Look" and how to break into the Bollywood scene.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border border-zinc-800 hover:border-green-500/50 transition-all cursor-pointer group bg-zinc-950/50">
              <Users className="mx-auto mb-4 text-zinc-500 group-hover:text-green-500 transition-colors" />
              <h3 className="text-lg font-bold mb-2">Self-Grooming</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">2 Days • Personal</p>
            </div>
            
            {/* Featured Card */}
            <div className="p-1 rounded-sm bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 cursor-pointer relative overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
               <div className="bg-zinc-900 h-full w-full p-8 relative">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-pink-500 to-purple-500 text-white text-[10px] font-bold px-2 py-1 uppercase shadow-lg">Most Popular</div>
                <Brush className="mx-auto mb-4 text-pink-500 group-hover:animate-pulse" />
                <h3 className="text-lg font-bold mb-2">Pro Bridal Course</h3>
                <p className="text-xs text-zinc-400 uppercase tracking-wide">1 Week • Certification</p>
               </div>
            </div>
            
            <div className="p-8 border border-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer group bg-zinc-950/50">
              <Play className="mx-auto mb-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <h3 className="text-lg font-bold mb-2">Online Look & Learn</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">3 Hours • Virtual</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <footer className="bg-black text-white py-12 md:py-16 border-t border-zinc-900 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Let's Create Magic.</h2>
              <div className="space-y-4">
                <a href={`mailto:jazzi.chaudhary10@gmail.com`} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <Mail size={20} className="group-hover:text-pink-500 transition-colors" /> <span className="text-sm md:text-base">jazzi.chaudhary10@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-zinc-400 group">
                  <Phone size={20} className="group-hover:text-green-500 transition-colors" /> +91 99586 96838
                </div>
                <div className="flex items-center gap-4 text-zinc-400 group">
                  <MapPin size={20} className="group-hover:text-blue-500 transition-colors" /> Delhi NCR / Mumbai / Global
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
               <div className="flex gap-4 mb-6">
                 <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:border-pink-500 hover:text-pink-500 transition-all">
                   <Instagram size={18} />
                 </a>
                 <a href={`https://wa.me/${phoneNumber}`} className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-all">
                   <Phone size={18} />
                 </a>
               </div>
               <p className="text-zinc-600 text-xs uppercase tracking-widest">
                 © 2024 Arun Chaudhary. All Rights Reserved.
               </p>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a 
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-green-900/20 transition-all hover:scale-110 flex items-center gap-2 group"
      >
        <Phone className="fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">Chat on WhatsApp</span>
      </a>

      {/* CSS For Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite alternate linear;
        }

        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;