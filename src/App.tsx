import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'

const ASSET = '/assets/'

const pages = [
  { label: 'Garment Manufacturing', path: '/garment-manufacturing/' },
  { label: 'Sustainability', path: '/sustainability/' },
  { label: 'Products Gallery', path: '/products-services-copy/' },
  { label: 'Design Studio', path: '/design-studio-copy/' },
  { label: 'Clients', path: '/customers-copy/' },
  { label: 'Contact Us', path: '/contact-us-new/' },
]

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Esstee Exports | Global Apparel Manufacturing', description: 'A trusted, vertically integrated apparel manufacturer based in Tirupur, India.' },
  '/home/': { title: 'Esstee Exports | Global Apparel Manufacturing', description: 'A trusted, vertically integrated apparel manufacturer based in Tirupur, India.' },
  '/garment-manufacturing/': { title: 'Garment Manufacturing | Esstee Exports', description: 'Explore Esstee Exports’ end-to-end garment manufacturing capabilities.' },
  '/products-services-copy/': { title: 'Products Gallery | Esstee Exports', description: 'Discover fabrics, finishes and garment collections developed by Esstee Exports.' },
  '/design-studio-copy/': { title: 'Design Studio | Esstee Exports', description: 'Meet the design and product development team at Esstee Exports.' },
  '/sustainability/': { title: 'Sustainability | Esstee Exports', description: 'Explore Esstee Exports’ people-first and planet-conscious commitments.' },
  '/customers-copy/': { title: 'Our Customers | Esstee Exports', description: 'See some of the international brands that partner with Esstee Exports.' },
  '/contact-us-new/': { title: 'Contact Us | Esstee Exports', description: 'Contact Esstee Exports in India or the United Kingdom.' },
  '/pefc/': { title: 'PEFC | Esstee Exports', description: 'Esstee Exports’ PEFC chain-of-custody commitment statement.' },
}

function currentPath() {
  const path = window.location.pathname
  return path.endsWith('/') ? path : `${path}/`
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal-pending ${className}`}>{children}</div>
}

function Header({ path }: { path: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [path])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="Esstee Exports home">
            <img src={`${ASSET}2024/01/ESSTEE-logo-300x147.png`} alt="Esstee Exports" />
          </a>
          <p className="brand-line">Every Thread, a Promise of Perfection</p>
          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`main-nav${menuOpen ? ' menu-open' : ''}`} aria-label="Primary">
            {pages.map((item) => (
              <a
                href={item.path}
                key={item.path}
                aria-current={path === item.path ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-column">
          <h2>Contact Info</h2>
          <a className="footer-contact" href="mailto:hello@essteeexports.com">
            <span className="footer-icon" aria-hidden="true">@</span>
            <span>hello@essteeexports.com</span>
          </a>
          <a className="footer-contact" href="tel:+914216613600">
            <span className="footer-icon" aria-hidden="true">⌕</span>
            <span>Tel: (91) 421 6613600 / 2487111</span>
          </a>
          <p className="footer-contact">
            <span className="footer-icon" aria-hidden="true">⌖</span>
            <span>Esstee Exports India Private Limited,<br />8/131, P.G.V Garden, Pooluvapatti post, P.N Road, Tirupur - 641602 Tamil Nadu, India</span>
          </p>
        </div>
        <div className="footer-column footer-links">
          <h2>Quick Links</h2>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <a href="/contact-us-new/">Contact Us</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-links" aria-label="Social media">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter">𝕏</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        </div>
        <p>Esstee Exports India Private Limited. Copyright © 2024 All Rights Reserved.</p>
      </div>
    </footer>
  )
}

function PageHero({ eyebrow, title, image, children, className = '' }: {
  eyebrow?: string
  title: string
  image: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={`page-hero ${className}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.54), rgba(0,0,0,.16)), url("${ASSET}${image}")` }}>
      <div className="page-hero-copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, centered = false }: { eyebrow?: string; title: string; centered?: boolean }) {
  return (
    <div className={`section-heading${centered ? ' centered' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
    </div>
  )
}

function ContactCta({ title = 'Your Gateway to Exceptional Quality, Innovative Designs, and Unmatched Customer Service.' }: { title?: string }) {
  return (
    <section className="contact-cta">
      <div className="cta-inner">
        <h2>{title}</h2>
        <a className="button button-light" href="/contact-us-new/">Contact Us <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

function HomeHero() {
  const slides = [
    { image: '2024/01/DJI_0056-2.jpg', title: 'ESSTEE EXPORTS', subtitle: 'Your Global Partner For Apparel Manufacturing' },
    { image: '2024/01/DJI_0017-2-scaled.jpg', title: 'ESSTEE EXPORTS', subtitle: 'From fibre to fashion, with care in every detail' },
    { image: '2024/02/WhatsApp-Image-2024-02-02-at-10.11.24-AM.jpeg', title: 'ESSTEE EXPORTS', subtitle: 'Craftsmanship, innovation and dependable quality' },
    { image: '2024/02/banner.jpg', title: 'ESSTEE EXPORTS', subtitle: 'A trusted partner for a more thoughtful future' },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <section className="home-hero" aria-roledescription="carousel" aria-label="Esstee Exports highlights">
      {slides.map((slide, index) => (
        <div
          className={`home-slide${active === index ? ' active' : ''}`}
          key={slide.image}
          style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.67), rgba(0,0,0,.2)), url("${ASSET}${slide.image}")` }}
          aria-hidden={active !== index}
        >
          <div className="hero-frame">
            <div className="hero-copy">
              <p className="hero-kicker">{slide.title}</p>
              {active === index
                ? <h1>{slide.subtitle}</h1>
                : <h2>{slide.subtitle}</h2>}
              <p>As a premier apparel manufacturer with a global reach, we’re honoured to be the go-to partner for some of the world’s most prestigious brands. Our relentless pursuit of excellence in craftsmanship, meticulous attention to detail, and exceptional customer service sets us apart in the competitive apparel landscape.</p>
              <a className="button button-outline" href="/garment-manufacturing/">Discover our capabilities <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      ))}
      <div className="hero-controls">
        <button type="button" aria-label="Previous slide" onClick={() => setActive((active + slides.length - 1) % slides.length)}>‹</button>
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button type="button" key={slide.image} aria-label={`Show slide ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)} />
          ))}
        </div>
        <button type="button" aria-label="Next slide" onClick={() => setActive((active + 1) % slides.length)}>›</button>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return <div className="stat"><strong>{value}<span>{suffix}</span></strong><span>{label}</span></div>
}

function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="stats-band" aria-label="Esstee at a glance">
        <div className="stats-inner">
          <Stat value={6} suffix="M" label="Garments per year" />
          <Stat value={30} suffix="+" label="Years of experience" />
          <Stat value={1500} suffix="+" label="Employees" />
        </div>
      </section>
      <section className="content-section trusted-section">
        <div className="content-grid">
          <Reveal className="content-copy">
            <span className="eyebrow">YOUR TRUSTED PARTNER</span>
            <h2>Thoughtfully made. Globally trusted.</h2>
            <p>ESSTEE has been a trusted partner to global fashion labels for over 30 years. Based in Tirupur, India, we provide innovative solutions for product development and offer a wide range of ready-to-market fashion merchandise. Our integrated approach ensures seamless production in one facility, eliminating the need for external agencies.</p>
            <p>At our core, we’re dedicated to custom manufacturing knitted garments for men, women, and kids. We specialize in sustainable fabrics, whether yarn-dyed or fabric-dyed, with expertise across garment processes and a diverse range of embellishments.</p>
            <a className="text-link" href="/garment-manufacturing/">Explore our manufacturing <span aria-hidden="true">→</span></a>
          </Reveal>
          <Reveal className="trusted-visual">
            <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-03-at-4.17.55-PM-1024x576.jpeg`} alt="Esstee Exports' garment production facility" loading="lazy" />
            <div className="visual-tag"><strong>30+</strong><span>years of making<br />with purpose</span></div>
          </Reveal>
        </div>
      </section>
      <section className="vision-section">
        <div className="vision-photo" style={{ backgroundImage: `url("${ASSET}2024/02/top-view-woman-creating-vision-board-min.jpg")` }} />
        <div className="vision-copy">
          <span className="eyebrow">OUR PURPOSE</span>
          <h2>A better future, stitched together.</h2>
          <div className="purpose-card">
            <img src={`${ASSET}2024/02/shared-vision.png`} alt="" loading="lazy" />
            <div><h3>Our Vision</h3><p>To be a global leader in the textile and apparel industry, prioritizing social and environmental responsibility. We aim to set the standard for sustainable innovation and ethical practices.</p></div>
          </div>
          <div className="purpose-card">
            <img src={`${ASSET}2024/01/icons8-mission-64.png`} alt="" loading="lazy" />
            <div><h3>Our Mission</h3><p>We enrich lives through skill development and a secure, dignified work environment. We focus on employee wellbeing, supporting growth and leading in eco-friendly innovation.</p></div>
          </div>
        </div>
      </section>
      <section className="content-section operations-section">
        <SectionHeading eyebrow="ABOUT OUR OPERATIONS" title="Connected from the first thread to the finished garment." centered />
        <div className="operations-grid">
          <Reveal className="operations-image">
            <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-20-at-11.05.59-AM.jpeg`} alt="Apparel production operations in Tirupur" loading="lazy" />
          </Reveal>
          <Reveal className="operations-copy">
            <h3>Made in Tirupur. Connected to the world.</h3>
            <p>Headquartered in the Knit city of Tirupur, India, with marketing presence in Europe and the UK, ESSTEE is strategically placed to track emerging fashion trends and product developments. We take pride in consistently delivering top-notch products, on-time delivery, and unique designs that support our partners’ success.</p>
            <a className="text-link" href="/contact-us-new/">Talk to our team <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
      </section>
      <section className="quality-section">
        <div className="quality-photo" style={{ backgroundImage: `url("${ASSET}2024/02/WhatsApp-Image-2024-02-02-at-1.15.07-PM.jpeg")` }} />
        <div className="quality-copy">
          <span className="eyebrow">OUR QUALITY PROMISE</span>
          <h2>Quality is woven into everything we create.</h2>
          <p>With advanced facilities and state-of-the-art techniques, we consistently deliver cutting-edge work on time and within budget. Customer satisfaction is our utmost priority as we partner with major fashion brands worldwide.</p>
        </div>
      </section>
      <section className="feature-cards content-section">
        <Reveal className="feature-card">
          <span className="feature-number">01</span><h3>Vertically integrated</h3>
          <p>Seamless production from materials to finished garments means connected quality control, innovation and dependable results.</p>
        </Reveal>
        <Reveal className="feature-card">
          <span className="feature-number">02</span><h3>Investing in our people</h3>
          <p>We champion development and workplace diversity, with a team of more than 1,500 employees and a majority of women.</p>
        </Reveal>
        <Reveal className="feature-card">
          <span className="feature-number">03</span><h3>Driving sustainability</h3>
          <p>From responsible sourcing to eco-friendly production, our goal is to achieve 100% renewable electrical energy by 2030.</p>
        </Reveal>
      </section>
      <section className="home-impact" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,35,27,.82), rgba(5,35,27,.24)), url("${ASSET}2024/01/DJI_0017-2-scaled.jpg")` }}>
        <Reveal className="home-impact-copy">
          <span className="eyebrow">OUR COMMITMENT</span>
          <h2>Our vision of sustainability is expansive, encompassing far more than just environmental stewardship.</h2>
          <a className="button button-light" href="/sustainability/">Explore our commitments <span aria-hidden="true">↗</span></a>
        </Reveal>
      </section>
      <ContactCta title="Creating Positive Change" />
    </>
  )
}

type GalleryImage = { src: string; alt: string }

function ImageGallery({ images, columns = 3 }: { images: GalleryImage[]; columns?: number }) {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    if (selected !== null) document.querySelector<HTMLButtonElement>('.lightbox-close')?.focus()
  }, [selected])

  return (
    <>
      <div className={`image-gallery columns-${columns}`}>
        {images.map((image, index) => (
          <button className="gallery-item" type="button" key={image.src} onClick={(event) => { event.currentTarget.blur(); setSelected(index) }} aria-label={`View image: ${image.alt}`}>
            <img src={`${ASSET}${image.src}`} alt={image.alt} loading="lazy" />
            <span aria-hidden="true">+</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSelected(null)
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              setSelected((selected + 1) % images.length)
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              setSelected((selected + images.length - 1) % images.length)
            }
          }}
          onClick={() => setSelected(null)}
        >
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setSelected(null)}>×</button>
          <button className="lightbox-arrow previous" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setSelected((selected + images.length - 1) % images.length) }}>‹</button>
          <img src={`${ASSET}${images[selected].src}`} alt={images[selected].alt} onClick={(event) => event.stopPropagation()} />
          <button className="lightbox-arrow next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % images.length) }}>›</button>
        </div>
      )}
    </>
  )
}

function SplitSection({ title, text, image, reverse = false, number }: { title: string; text: string; image: string; reverse?: boolean; number?: string }) {
  return (
    <section className={`split-section${reverse ? ' reverse' : ''}`}>
      <Reveal className="split-image">
        <img src={`${ASSET}${image}`} alt={title} loading="lazy" />
        {number && <span className="split-number">{number}</span>}
      </Reveal>
      <Reveal className="split-copy">
        <span className="eyebrow">ESSTEE CAPABILITIES</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </Reveal>
    </section>
  )
}

const garmentSections = [
  {
    title: 'Fabric Knitting',
    image: '2024/02/WhatsApp-Image-2024-02-01-at-3.07.38-PM-1536x1023.jpeg',
    text: 'We at ESSTEE are very much passionate about perfecting the art of knitting, using advanced techniques to create a wide range of exceptional fabrics. From cozy jerseys to intricately patterned fabrics, each piece showcases our innovation in knitting. Our creations meet the evolving demands of contemporary fashion, blending durability, elegance and style.',
  },
  {
    title: 'Embroidery',
    image: '2024/02/WhatsApp-Image-2024-02-01-at-3.03.43-PM.jpeg',
    text: 'Our embroidery unit is renowned for extensive capabilities, offering both standard and special embroidery. We work with patches, sequins, chenille and tuft embroidery. Our handwork portfolio adds exquisite beadwork and rhinestone details, meticulously applied by skilled artisans.',
  },
  {
    title: 'Printing & Embellishments',
    image: '2024/02/WhatsApp-Image-2024-02-23-at-1.00.02-PM.jpeg',
    text: 'Our garment printing facility spans over 3,000 square meters, with capacity for around 50,000 impressions daily. We specialize in multi-colour chest prints and sublimation, as well as glitter, foil, rhinestones, high-density, UV reactive and embossing techniques.',
  },
  {
    title: 'CAD & 3D Modelling',
    image: '2024/02/back-view-successful-female-dressmaker-measuring-materials-mannequin-atelier-office-talented-fashion-shop-owner-designer-working-with-sketches-new-collection-clothes-min.jpg',
    text: 'Advanced CAD and 3D modelling enable precise garment design. Our CAD system ensures accurate pattern-making and reduces fabric waste. 3D modelling brings designs to life, helping us visualize products, make rapid adjustments and reduce physical samples.',
  },
  {
    title: 'Garmenting',
    image: '2024/02/WhatsApp-Image-2024-02-01-at-5.03.24-PM.jpeg',
    text: 'ESSTEE is a leader in “Fibre to Fashion,” covering everything from sourcing sustainable materials to delivering stylish apparel. With modern facilities and a dedicated team, we handle every step, from knitting to stitching, with sustainability woven into every fabric.',
  },
  {
    title: 'Garment washes & Finishes',
    image: '2024/02/Washes.jpg',
    text: 'We offer a diverse range of garment washes and work closely with our wash house to ensure colour and consistency in every piece. From classic Tie Dye to modern Potassium and Oil Wash techniques, we transform garments into fashion statements.',
  },
]

function GarmentPage() {
  return (
    <>
      <PageHero eyebrow="GARMENT MANUFACTURING" title="World-Class Garment Production Capabilities" image="2024/02/WhatsApp-Image-2024-02-01-at-5.03.24-PM.jpeg" className="garment-hero">
        <p>From carefully sourced cotton and yarn to the finished fashion piece, we bring every step together under one roof.</p>
      </PageHero>
      <section className="intro-band">
        <p>At ESSTEE, we specialize in crafting innovative knitted apparel for all age groups. Our in-house design and production teams work hand in hand to create a smooth journey from concept to finished product. With our vertically integrated approach, we uphold transparency and quality from raw materials to the final fashion piece.</p>
      </section>
      {garmentSections.map((section, index) => <SplitSection key={section.title} {...section} reverse={index % 2 === 1} number={`0${index + 1}`} />)}
      <section className="lab-section">
        <div className="lab-copy">
          <span className="eyebrow">QUALITY, VERIFIED</span>
          <h2>Laboratory</h2>
          <p>Our in-house laboratory meticulously tests product performance and colour across raw materials, fabrics, garments and trims. Testing strictly follows global standards at every stage of development, including AATCC, ASTM, ISO and British Standard methods, alongside client-specific in-house methodologies.</p>
        </div>
        <div className="lab-images">
          {['1-1.jpg', '2-1.jpg', '3-1.jpg', '4-1.jpg'].map((name) => <img key={name} src={`${ASSET}2024/02/${name}`} alt="Esstee quality testing laboratory" loading="lazy" />)}
        </div>
      </section>
      <ContactCta />
    </>
  )
}

const productPhotos: GalleryImage[] = [
  { src: '2024/02/3.jpg', alt: 'Textile colour and print detail' },
  { src: '2024/02/5.jpg', alt: 'Knitted garment fabric detail' },
  { src: '2024/02/7.jpg', alt: 'Printed fabric sample' },
  { src: '2024/01/d8.jpg', alt: 'Apparel craftsmanship detail' },
  { src: '2024/01/WomensKnitRiderJacket-CPDWash-768x1013.jpg', alt: 'Washed knit rider jacket' },
  { src: '2024/02/13.jpg', alt: 'Garment wash finish' },
  { src: '2024/02/21.jpg', alt: 'Fabric development sample' },
  { src: '2024/02/28.jpg', alt: 'Apparel design detail' },
  { src: '2024/02/29.jpg', alt: 'Textile surface and embellishment' },
  { src: '2024/02/30.jpg', alt: 'Knitted garment detail' },
  { src: '2024/02/40.jpg', alt: 'Apparel product finish' },
  { src: '2024/02/42.jpg', alt: 'Textile sample from Esstee Exports' },
  { src: '2024/02/48.jpg', alt: 'Garment collection detail' },
  { src: '2024/02/WhatsApp-Image-2024-02-02-at-10.55.30-AM.jpeg', alt: 'Apparel sample in development' },
  { src: '2024/02/WhatsApp-Image-2024-02-02-at-10.55.31-AM.jpeg', alt: 'Finished apparel piece' },
]

function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="PRODUCTS GALLERY" title="Knitting Mastery" image="2024/02/WhatsApp-Image-2024-02-01-at-3.30.02-PM-min.jpeg" className="products-hero">
        <p>Thoughtful fabrics, considered finishes and apparel made to bring ideas to life.</p>
      </PageHero>
      <section className="content-section products-intro">
        <SectionHeading eyebrow="RESEARCH & DEVELOPMENT" title="Ideas made tangible." />
        <div className="intro-columns">
          <p>At Esstee, we know that great ideas need an experienced development team to bring them to life. Our R&D department is staffed with experts who excel in fabric research, print and wash techniques, and more. We welcome challenges that help us refine our ideas and fulfil your vision.</p>
          <p>In the dynamic world of retail, developing new fabrics is essential. We stay ahead by constantly monitoring the market to offer innovative offerings to our clients. Our commitment to innovation extends to washes from Cold Pigment Dye to Tie Dye, with careful attention to colour fastness and consistency.</p>
        </div>
      </section>
      <section className="gallery-section">
        <SectionHeading eyebrow="FABRIC, PRINT & WASH" title="A closer look at our work" centered />
        <ImageGallery images={productPhotos} columns={3} />
      </section>
      <section className="product-note">
        <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-21-at-3.48.42-PM.jpeg`} alt="Textile research and development" loading="lazy" />
        <div>
          <span className="eyebrow">OUR APPROACH</span>
          <h2>Built on experience. Ready for what’s next.</h2>
          <p>With over 30 years of experience, our design team collaborates closely with production to deliver creative designs tailored to our brand partners’ needs. Forward-thinking, responsible development helps inspire consumers and drive our partners’ success.</p>
          <a className="text-link" href="/design-studio-copy/">Meet our design studio <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <ContactCta title="Our vision of sustainability is expansive, encompassing far more than just environmental stewardship." />
    </>
  )
}

function DesignPage() {
  return (
    <>
      <PageHero eyebrow="DESIGN STUDIO" title="Our Design Capabilities" image="2024/02/WhatsApp-Image-2024-02-01-at-10.19.12-PM-1.jpeg" className="design-hero">
        <p>From a first sketch to a production-ready garment, our teams bring every idea closer to reality.</p>
      </PageHero>
      <section className="content-section design-intro">
        <div>
          <SectionHeading eyebrow="DESIGN & PRODUCT DEVELOPMENT" title="Creative thinking. Technical precision." />
          <p>Our design and product development infrastructure is anchored by a team of expert designers, proficient in Computer-Aided Design (CAD), 3D Draping, 3D Sampling, textile innovation and apparel design. We offer comprehensive, one-stop-shop services, managing every phase from concept development to final production. Our teams focus on seamless, high-quality outcomes that align with our clients’ visions.</p>
        </div>
        <img src={`${ASSET}2024/02/CLO-f-1024x822.png`} alt="Garment visualized using 3D design software" loading="lazy" />
      </section>
      <section className="design-tools">
        <div className="design-tool-copy">
          <span className="eyebrow">DIGITAL PRODUCT CREATION</span>
          <h2>See the idea before it becomes a sample.</h2>
          <p>Our 3D draping and sampling workflows help teams evaluate fit, form and fabric digitally. By making considered changes earlier, we can shorten development cycles and reduce unnecessary physical samples.</p>
        </div>
        <div className="tool-logos">
          <img src={`${ASSET}2024/02/CLO-f-1024x822.png`} alt="CLO 3D apparel design" loading="lazy" />
          <img src={`${ASSET}2024/02/Optitex-f-1024x401.png`} alt="Optitex pattern and 3D design system" loading="lazy" />
        </div>
      </section>
      <section className="design-capabilities content-section">
        <SectionHeading eyebrow="ONE-STOP-SHOP DEVELOPMENT" title="Every detail, developed together." centered />
        <div className="capability-grid">
          {[
            ['01', 'CAD design', 'Accurate pattern-making and technical design for considered, production-ready garments.'],
            ['02', '3D draping', 'Explore proportion, shape and fit digitally before moving into physical sampling.'],
            ['03', 'Textile innovation', 'Develop fabrics, prints and finishes that bring a collection’s point of view to life.'],
            ['04', 'Apparel design', 'A connected design-to-production approach for men’s, women’s and children’s apparel.'],
          ].map(([number, title, text]) => <Reveal className="capability-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}
        </div>
      </section>
      <ContactCta title="Let’s bring your next idea to life." />
    </>
  )
}

type LogoItem = { name: string; file: string; detail?: string }

const productCertifications: LogoItem[] = [
  { name: 'GOTS', file: '2024/02/global-organic-1.png', detail: 'Certified to organic production' },
  { name: 'OCS Blended', file: '2024/07/OCS_Blend_Black_GCL.png', detail: 'Certified to produce recycled materials' },
  { name: 'Global Recycled Standard', file: '2024/07/GRS_Black_GCL.png', detail: 'Responsible recycled materials' },
  { name: 'BCI', file: '2024/02/BCI-1.png', detail: 'Sustainably grown cotton' },
  { name: 'Fairtrade', file: '2024/07/Fair-Trade_Cotton_RGB_NEW.png', detail: 'Fair and ethical trading' },
  { name: 'Lenzing', file: '2024/02/WhatsApp-Image-2024-02-02-at-1.04.56-PM.jpeg', detail: 'Innovative, responsible fibres' },
  { name: 'EcoVero', file: '2024/02/ecovero-1.png', detail: 'Sustainable viscose from controlled sources' },
  { name: 'OEKO-TEX', file: '2024/02/okeo-1.png', detail: 'Tested for harmful substances' },
]

const sustainableProducts: GalleryImage[] = [
  ...Array.from({ length: 8 }, (_, index) => ({ src: `2024/02/a1-${index + 1}.png`, alt: `Sustainable garment collection, style ${index + 1}` })),
  { src: '2024/02/s-9.png', alt: 'Sustainable apparel collection style 9' },
  ...Array.from({ length: 4 }, (_, index) => ({ src: `2024/02/a1-${index + 9}.png`, alt: `Sustainable garment collection, style ${index + 10}` })),
]

function LogoCards({ items }: { items: LogoItem[] }) {
  return (
    <div className="logo-grid">
      {items.map((item) => (
        <div className="logo-card" key={item.name}>
          <img src={`${ASSET}${item.file}`} alt={`${item.name} mark`} loading="lazy" />
          <h3>{item.name}</h3>
          {item.detail && <p>{item.detail}</p>}
        </div>
      ))}
    </div>
  )
}

function SustainabilityPage() {
  const environmental: LogoItem[] = [
    { name: 'Higg Index', file: '2024/02/higg-index-logo-B12A2ED862-seeklogo.com_.png', detail: 'Social and environmental performance' },
    { name: 'ISO 14001', file: '2024/02/ISO-14001-Logo.png', detail: 'Environmental management system' },
    { name: 'LEED', file: '2026/01/LEED-Certificate-300x300.jpeg', detail: 'Leadership in energy and environmental design' },
  ]
  const partnerships: LogoItem[] = [
    { name: 'Textile Exchange', file: '2024/02/Member-Textile-Exchange-e1708187969439.png' },
    { name: 'Tirupur Exporters’ Association', file: '2024/02/TEA-LOGO_HD-4.png' },
    { name: 'Apparel Export Promotion Council', file: '2024/02/305304812_188981370192656_4108996962665261335_n.png' },
    { name: 'Confederation of Indian Industries', file: '2024/02/cii.jpg' },
  ]

  return (
    <>
      <PageHero eyebrow="SUSTAINABILITY" title="Responsible by nature. Better by design." image="2024/01/DJI_0017-2-scaled.jpg" className="sustainability-hero">
        <p>Our vision of sustainability is expansive, encompassing far more than just environmental stewardship.</p>
      </PageHero>
      <section className="energy-section">
        <div className="energy-photo" style={{ backgroundImage: `url("${ASSET}2024/02/WhatsApp-Image-2024-02-01-at-5.03.24-PM.jpeg")` }} />
        <div className="energy-copy">
          <span className="eyebrow">OUR PLANET</span>
          <h2>We are aligned with the United Nations Sustainable Development Goals.</h2>
          <p>Presently, we draw 30% of our energy needs directly from our windmills and a solar farm. This initiative is a crucial part of our commitment to environmental stewardship in production. Looking forward, we are steadfast in our dedication to expand our use of green energy, with an ambitious goal to achieve complete reliance on renewable energy sources by 2030.</p>
          <strong className="energy-stat">30% <span>of energy needs from wind and solar</span></strong>
        </div>
      </section>
      <section className="certification-section content-section">
        <SectionHeading eyebrow="CERTIFICATIONS & STANDARDS" title="Better choices, backed by standards." centered />
        <h3 className="group-heading">Products</h3>
        <LogoCards items={productCertifications} />
        <div className="standard-groups">
          <div>
            <h3>Environmental Management</h3>
            <p>Environmental performance guided by recognised standards and measurement.</p>
            <LogoCards items={environmental} />
          </div>
          <div>
            <h3>Social Compliance</h3>
            <p>Systems that support safe, secure and responsible working conditions.</p>
            <LogoCards items={[{ name: 'WRAP', file: '2024/02/Wrap-Logo_2019-e1708047619377.jpg', detail: 'Social compliance and security systems' }]} />
          </div>
          <div>
            <h3>Quality Management</h3>
            <p>Reliable processes and consistent product quality.</p>
            <LogoCards items={[{ name: 'ISO 9001', file: '2024/02/ISO-9001-Logo.jpg', detail: 'Quality management system' }]} />
          </div>
        </div>
      </section>
      <section className="partnership-section">
        <SectionHeading eyebrow="WORKING TOGETHER" title="Key Partnerships" centered />
        <LogoCards items={partnerships} />
      </section>
      <section className="sustainable-range">
        <div className="range-heading">
          <span className="eyebrow">MADE WITH CARE</span>
          <h2>Our Sustainable Product Range</h2>
          <p>Thoughtful fabrics and timeless design, developed with a more responsible future in mind.</p>
        </div>
        <ImageGallery images={sustainableProducts} columns={4} />
      </section>
      <section className="people-planet">
        <div>
          <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-02-at-10.55.30-AM.jpeg`} alt="Esstee team members in their workplace" loading="lazy" />
          <div><span className="eyebrow">OUR PEOPLE</span><h2>We are Responsible for People</h2><p>We invest in skill development and a safe, dignified workplace where people can grow and thrive.</p></div>
        </div>
        <div>
          <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-02-at-10.55.31-AM.jpeg`} alt="Esstee facility and responsible production" loading="lazy" />
          <div><span className="eyebrow">OUR PLANET</span><h2>We are Responsible for Planet</h2><p>We work to reduce our footprint through renewable energy, responsible materials and mindful manufacturing.</p></div>
        </div>
      </section>
      <section className="pefc-callout">
        <div><span className="eyebrow">SUPPLY CHAIN RESPONSIBILITY</span><h2>Statement of Commitment<br />PEFC Chain of Custody</h2></div>
        <a className="button button-light" href="/pefc/">Read our commitment <span aria-hidden="true">↗</span></a>
      </section>
      <ContactCta title="Our vision of sustainability is expansive, encompassing far more than just environmental stewardship." />
    </>
  )
}

function CustomersPage() {
  const logos: GalleryImage[] = [
    { src: '2024/01/Q1.png', alt: 'Salsa' },
    { src: '2024/02/guess-logo-327DCE2621-seeklogo.com_.png', alt: 'Guess' },
    { src: '2024/01/mam-10.png', alt: 'Bel&Bo' },
    { src: '2024/02/Lion_Of_Porches.png', alt: 'Lion of Porches' },
    { src: '2024/02/olsen-768x768.jpg', alt: 'Olsen' },
    { src: '2024/07/JBC1-768x703.png', alt: 'JBC' },
  ]
  return (
    <>
      <PageHero eyebrow="OUR CUSTOMERS" title="Built on trust. Growing together." image="2024/02/guess.jpg" className="customers-hero">
        <p>Long-lasting partnerships with brands who share our passion for quality and thoughtful apparel.</p>
      </PageHero>
      <section className="customers-intro content-section">
        <SectionHeading eyebrow="OUR CUSTOMERS" title="Partnerships that inspire us." centered />
        <p>As Esstee Exports continues to flourish and expand, so too does our diverse portfolio of clients. We take great pride in collaborations with renowned international brands such as Guess and Salsa, serving as a testament to our global partnership success. Anchored by our foundational expertise, we continue to grow through lasting relationships and shared ambition.</p>
      </section>
      <section className="customer-logos">
        <ImageGallery images={logos} columns={3} />
      </section>
      <section className="customer-gallery">
        <img src={`${ASSET}2024/02/WhatsApp-Image-2024-02-01-at-5.03.24-PM.jpeg`} alt="Apparel manufacturing at Esstee Exports" loading="lazy" />
        <div><span className="eyebrow">A PARTNER AT EVERY STEP</span><h2>From the first idea to the final garment.</h2><p>Our teams work side by side with our customers to make development clear, collaborative and dependable.</p><a className="text-link" href="/contact-us-new/">Start a conversation <span aria-hidden="true">→</span></a></div>
      </section>
      <ContactCta title="Let’s make something meaningful together." />
    </>
  )
}

function ContactForm() {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const subject = encodeURIComponent(String(data.get('subject')))
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\n${data.get('message')}`,
    )
    setFeedback('Your email app should open with this message ready to send. If it does not, email hello@essteeexports.com directly.')
    window.open(`mailto:hello@essteeexports.com?subject=${subject}&body=${body}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <div className="form-row">
        <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Subject<input name="subject" required /></label>
      </div>
      <label>Message<textarea name="message" rows={5} required /></label>
      <button className="button button-dark" type="submit">Send <span aria-hidden="true">↗</span></button>
      {feedback && <p className="form-feedback" role="status">{feedback}</p>}
    </form>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="CONTACT US" title="Get in touch" image="2024/01/nastuh-abootalebi-eHD8Y1Znfpk-unsplash-1.jpg" className="contact-hero">
        <p>We’d love to hear what you’re working on.</p>
      </PageHero>
      <section className="contact-intro content-section">
        <div>
          <SectionHeading eyebrow="LET’S TALK" title="Your Gateway to Seamless Communication and Exceptional Service." />
          <p>In need of a reliable clothing manufacturer with top-tier infrastructure? At Esstee Exports, we have a passion for innovative clothing concepts and the expertise to bring your ideas to fruition. We are excited about the prospect of working together with you.</p>
          <p>Feel free to get in touch today to learn more about Esstee Exports and discuss how we can join forces to bring your design visions to reality.</p>
        </div>
        <ContactForm />
      </section>
      <section className="offices-section">
        <SectionHeading eyebrow="VISIT OR CALL" title="We’re here to help." centered />
        <div className="office-grid">
          <article className="office-card">
            <span className="eyebrow">INDIA</span>
            <h3>Esstee Exports India Private Limited</h3>
            <address>8/131, P.G.V Garden, Pooluvapatti post,<br />P.N Road, Tirupur – 641602<br />Tamil Nadu, India</address>
            <a href="tel:+914216613600">T (91) 421 6613600</a>
            <a href="tel:+914216613678">F (91) 421 6613678</a>
          </article>
          <article className="office-card">
            <span className="eyebrow">UNITED KINGDOM</span>
            <h3>Maple Heath</h3>
            <address>Oxford Road, Frilford,<br />Oxfordshire OX13 5NP,<br />United Kingdom</address>
            <a href="tel:+447888655246">T (44) 7888 655246</a>
            <a href="mailto:hello@essteeexports.com">hello@essteeexports.com</a>
          </article>
        </div>
      </section>
    </>
  )
}

function PefcPage() {
  return (
    <section className="pefc-document" aria-label="PEFC chain of custody commitment">
      <img src={`${ASSET}2024/08/PEFC-Commitment-Statement.jpg`} alt="Esstee Exports PEFC Chain of Custody Statement of Commitment" />
    </section>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  if (!visible) return null
  return <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
}

export default function App() {
  const path = currentPath()
  const metadata = pageMeta[path] ?? pageMeta['/']

  useEffect(() => {
    document.title = metadata.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = metadata.description
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = metadata.title
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = metadata.description
  }, [metadata])

  let page: ReactNode
  switch (path) {
    case '/garment-manufacturing/': page = <GarmentPage />; break
    case '/products-services-copy/': page = <ProductsPage />; break
    case '/design-studio-copy/': page = <DesignPage />; break
    case '/sustainability/': page = <SustainabilityPage />; break
    case '/customers-copy/': page = <CustomersPage />; break
    case '/contact-us-new/': page = <ContactPage />; break
    case '/pefc/': page = <PefcPage />; break
    default: page = <HomePage />
  }

  return (
    <>
      <Header path={path} />
      <main id="main-content">{page}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
