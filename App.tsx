import { useState, useEffect } from 'react'

const NAV_LINKS = ['Login']

const FEATURES = [
  {
    icon: '🎨',
    title: 'Props & Kostum Lengkap',
    desc: 'Ratusan pilihan props lucu dan unik untuk menambah keseruan foto.',
  },
  {
    icon: '✨',
    title: 'Filter & Efek Digital',
    desc: 'Puluhan filter kekinian. Soft glow, vintage, glam — tinggal pilih.',
  },
  {
    icon: '📱',
    title: 'Share Digital Instan',
    desc: 'Kirim langsung ke HP via QR code. Siap upload ke Instagram!',
  },
]

const GALLERY = [
  {
    url: 'https://images.unsplash.com/photo-1746587224861-521244472226?w=600&h=750&fit=crop&auto=format',
    alt: 'Friends posing happily in a photo booth with props',
    span: 'row-span-2',
  },
  {
    url: 'https://images.unsplash.com/photo-1623344106769-2c464a579b15?w=600&h=400&fit=crop&auto=format',
    alt: 'A group of women standing next to each other in a photobooth',
    span: '',
  },
  {
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop&auto=format',
    alt: 'People raising wine glasses celebrating at a party',
    span: '',
  },
  {
    url: 'https://images.unsplash.com/photo-1582510870942-6b1b57c94992?w=600&h=500&fit=crop&auto=format',
    alt: 'Group of women posing for a fun photo',
    span: '',
  },
  {
    url: 'https://images.unsplash.com/photo-1777670879437-1b94aeb0e1f5?w=600&h=750&fit=crop&auto=format',
    alt: 'Four friends laughing together',
    span: 'row-span-2',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&h=400&fit=crop&auto=format',
    alt: 'People dancing at a wedding celebration',
    span: '',
  },
]

const PACKAGES = [
  {
    name: 'Starter',
    price: '1.500.000',
    hours: '2 Jam',
    badge: null,
    color: 'border-white/20 bg-white/5',
    btnColor: 'bg-white text-[#0D0117] hover:bg-[#FFE500]',
    features: ['1 Booth', 'Unlimited foto', 'Cetak 2R (50 lembar)', 'Props basic', 'Operator', 'Setup & breakdown'],
  },
  {
    name: 'Party',
    price: '2.800.000',
    hours: '4 Jam',
    badge: 'TERPOPULER',
    color: 'border-[#FF2D78] bg-gradient-to-b from-[#FF2D78]/20 to-[#1E0535]',
    btnColor: 'bg-[#FF2D78] text-white hover:bg-[#FF2D78]/80',
    features: ['1 Booth', 'Unlimited foto', 'Cetak 2R (100 lembar)', 'Props premium lengkap', 'Operator & asisten', 'Backdrop custom', 'Digital album', 'Share via QR'],
  },
  {
    name: 'Wedding',
    price: '4.500.000',
    hours: '6 Jam',
    badge: null,
    color: 'border-[#FFE500]/40 bg-white/5',
    btnColor: 'bg-[#FFE500] text-[#0D0117] hover:bg-[#FFE500]/80',
    features: ['2 Booth', 'Unlimited foto', 'Cetak 2R (200 lembar)', 'Props mewah & elegan', '2 Operator', 'Backdrop & dekorasi full', 'Digital album HD', 'Buku tamu foto', 'Share via QR & link'],
  },
]

const TESTIMONIALS = [
  {
    name: 'Sari Dewi',
    event: 'Wedding Reception',
    photo: 'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?w=80&h=80&fit=crop&auto=format',
    text: 'Luar biasa! Semua tamu antri foto terus. Hasilnya bagus banget, cetak instan dan ada QR share ke HP. Wedding kami jadi lebih berkesan!',
    stars: 5,
  },
  {
    name: 'Budi Santoso',
    event: 'Ulang Tahun ke-30',
    photo: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=80&h=80&fit=crop&auto=format',
    text: 'Props-nya banyak banget dan lucu-lucu! Tim operatornya ramah dan profesional. Semua foto hasilnya kece. Recommended banget!',
    stars: 5,
  },
  {
    name: 'Rina & Kevin',
    event: 'Company Event',
    photo: 'https://images.unsplash.com/photo-1714972383570-44ddc9738355?w=80&h=80&fit=crop&auto=format',
    text: 'Pesan untuk acara kantor 300 orang. Setup tepat waktu, booth tidak pernah sepi. Foto digitalnya langsung bisa upload ke LinkedIn haha.',
    stars: 5,
  },
]

const MARQUEE_ITEMS = [
  '',
  '',
  '',
  '',
]

export default function App() {
  const [activePackage, setActivePackage] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', event: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showPhotobooth, setShowPhotobooth] = useState(() => {
    const saved = localStorage.getItem('showPhotobooth')
    return saved ? JSON.parse(saved) : false
  })
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const photoboothUrl = typeof window !== 'undefined'
    ? (window.location.protocol === 'app:'
      ? 'app://./Photobooth_bARU.HTML'
      : (window.location.protocol === 'file:'
        ? new URL('Photobooth_bARU.HTML', window.location.href).toString()
        : `${window.location.origin}/Photobooth_bARU.HTML`))
    : './Photobooth_bARU.HTML'

  const openLocalPhotobooth = () => {
    try {
      const w = window.open(photoboothUrl, '_blank')
      // If popup was blocked or window couldn't be opened, fallback to iframe
      if (!w) setShowPhotobooth(true)
    } catch (e) {
      setShowPhotobooth(true)
    }
  }

  useEffect(() => {
    localStorage.setItem('showPhotobooth', JSON.stringify(showPhotobooth))
  }, [showPhotobooth])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#0D0117', color: 'white' }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-transform duration-300" style={{ transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); setShowPhotobooth(false); }} className="flex items-center gap-3">
          <img src="https://www.bmkg.go.id/asset/img/logo/logo-bmkg.png" alt="Logo BMKG" style={{ height: '60px' }} />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {showPhotobooth ? (
            <button onClick={() => setShowPhotobooth(false)}
              className="text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
              Kembali
            </button>
          ) : (
            NAV_LINKS.map(link => (
              <button key={link} onClick={openLocalPhotobooth}
                className="text-sm font-semibold uppercase tracking-widest text-[#FFE500] hover:text-white transition-colors">
                {link}
              </button>
            ))
          )}
        </div>
        <button className="md:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-4 h-0.5 bg-white" />
        </button>
      </nav>

      {menuOpen && !showPhotobooth && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: '#0D0117' }}>
          <button className="absolute top-5 right-6 text-white text-3xl" onClick={() => setMenuOpen(false)}>×</button>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => { setMenuOpen(false); openLocalPhotobooth(); }}
              className="font-display text-4xl"
              style={{ color: '#FF2D78' }}>{link}</button>
          ))}
        </div>
      )}

      {showPhotobooth ? (
        <div className="fixed inset-0 z-50" style={{ backgroundColor: '#0D0117' }}>
          <iframe
            src={photoboothUrl}
            className="absolute inset-0 w-full h-full border-0"
            style={{ backgroundColor: '#0D0117' }}
            title="Photobooth Baru"
            allow="camera; microphone; clipboard-write"
          />
          <button
            onClick={() => setShowPhotobooth(false)}
            className="absolute top-5 right-6 z-50 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF2D78 0%, #FFE500 100%)',
              color: '#0D0117',
              boxShadow: '0 8px 30px rgba(255,45,120,0.35)',
            }}
          >
            Kembali
          </button>
        </div>
      ) : (
        <>
          {/* HERO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6">
            {/* Gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #FF2D78 0%, transparent 70%)', filter: 'blur(80px)' }} />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #C084FC 0%, transparent 70%)', filter: 'blur(80px)' }} />
              <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #FFE500 0%, transparent 70%)', filter: 'blur(60px)' }} />
            </div>

            {/* Decorative floating shapes */}
            <div className="animate-float absolute top-20 left-8 md:left-32 w-16 h-16 rounded-2xl rotate-12 opacity-60"
              style={{ background: '#FF2D78' }} />
            <div className="animate-float-delay absolute top-40 right-8 md:right-40 w-10 h-10 rounded-full opacity-50"
              style={{ background: '#FFE500' }} />
            <div className="animate-float-delay2 absolute bottom-32 left-16 md:left-48 w-8 h-8 rotate-45 opacity-40"
              style={{ background: '#C084FC' }} />




            {/* Headline */}
        <h1 className="relative z-10 text-center leading-none mb-6"
          style={{ 
            fontSize: 'clamp(2rem, 7vw, 5rem)', 
            fontFamily: "'Pacifico', cursive",
            background: 'linear-gradient(135deg, #FF2D78 0%, #FFE500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
          HumaSnap
        </h1>

            <p className="relative z-10 text-center max-w-xl text-lg md:text-xl font-medium mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)' }}>
              corporate event, dan semua perayaan spesial kamu.
            </p>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setShowPhotobooth(true)}
                className="px-12 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FF2D78 0%, #FFE500 100%)',
                  color: '#0D0117',
                  boxShadow: '0 10px 40px rgba(255,45,120,0.4)'
                }}
                aria-label="Buka Mode Photobooth"
              >
                
              </button>
            </div>



            {/* Hero photos floating */}
            <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-5">
              {[
                { url: 'https://images.unsplash.com/photo-1746587224861-521244472226?w=400&h=500&fit=crop&auto=format', alt: 'Friends posing in photo booth', cls: 'animate-float col-span-1 h-48 md:h-72', rotate: '-rotate-3' },
                { url: 'https://images.unsplash.com/photo-1623344106769-2c464a579b15?w=400&h=600&fit=crop&auto=format', alt: 'Group of women in photobooth', cls: 'animate-float-delay col-span-1 h-56 md:h-80', rotate: '' },
                { url: 'https://images.unsplash.com/photo-1738156684532-b79bfb589344?w=400&h=500&fit=crop&auto=format', alt: 'People in costumes posing', cls: 'animate-float-delay2 col-span-1 h-48 md:h-72', rotate: 'rotate-3' },
              ].map((img, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl md:rounded-3xl ${img.cls} ${img.rotate} bg-purple-900`}
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,1,23,0.4) 0%, transparent 60%)' }} />
                </div>
              ))}
            </div>


          </section>

          {/* MARQUEE */}
          <div className="overflow-hidden py-4 border-y" style={{ borderColor: 'rgba(255,45,120,0.3)', background: 'rgba(255,45,120,0.05)' }}>
            <div className="flex animate-marquee whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={`${item}-${i}`} className="mx-8 text-sm font-bold uppercase tracking-widest" style={{ color: '#FF2D78' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>




          {/* GALLERY */}
          <section id="galeri" className="py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#FF2D78' }}>Galeri Foto</p>
                  <h2 className="font-display text-5xl md:text-7xl leading-none" style={{ color: 'white' }}>
                    <br /><span style={{ color: '#C084FC' }}></span>
                  </h2>
                </div>
                <p className="max-w-xs text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                {GALLERY.map((img, i) => (
                  <div key={i}
                    className={`group relative overflow-hidden rounded-2xl bg-purple-900 ${img.span}`}>
                    <img src={img.url} alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(255,45,120,0.6) 0%, transparent 60%)' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>






          {/* FOOTER */}
          <footer className="border-t py-10 px-6 md:px-12" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <img src="https://www.bmkg.go.id/asset/img/logo/logo-bmkg.png" alt="Logo BMKG" style={{ height: '60px' }} />
              <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 HUMAS BMKG.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
