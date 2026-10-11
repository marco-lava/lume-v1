import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Leaf, Check, MapPin, Clock } from "lucide-react";

const services = [
  {
    name: "Trattamenti viso",
    tag: "LA TUA LUCE NATURALE",
    text: "Rituali mirati che ascoltano la tua pelle. Detersione, idratazione e cura per ritrovare un viso fresco e luminoso.",
    detail: "Pulizia del viso · Idratazione · Rituali illuminanti",
  },
  {
    name: "Trattamenti corpo",
    tag: "SENTIRSI BENE, NELLA PROPRIA PELLE",
    text: "Un percorso di cura che avvolge il corpo, rinnova la pelle e restituisce una piacevole sensazione di leggerezza.",
    detail: "Esfoliazione · Rituali nutrienti · Cura personalizzata",
  },
  {
    name: "Massaggi",
    tag: "IL PIACERE DI LASCIARSI ANDARE",
    text: "Gesti lenti, oli delicati e un tempo tutto tuo. Massaggi dedicati al rilassamento e al benessere quotidiano.",
    detail: "Massaggio rilassante · Aromatico · Decontratturante",
  },
  {
    name: "Manicure e pedicure",
    tag: "LA BELLEZZA È NEI DETTAGLI",
    text: "Mani e piedi curati con attenzione, per un risultato ordinato e naturale che accompagna ogni tuo gesto.",
    detail: "Manicure · Pedicure estetico · Semipermanente",
  },
  {
    name: "Epilazione",
    tag: "DELICATEZZA, PRIMA DI TUTTO",
    text: "Una pelle morbida e liscia, con un approccio attento alle tue esigenze e al comfort di ogni trattamento.",
    detail: "Epilazione viso · Corpo · Zone delicate",
  },
];
function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 220" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M90 214C101 167 79 127 111 38M92 179C58 151 45 121 27 100M94 151C127 128 137 99 152 76M99 115C75 91 63 60 61 29" />
        <path d="M109 58C95 27 109 13 127 5C133 25 124 47 109 58ZM101 90C123 64 142 59 161 61C153 83 128 94 101 90ZM91 136C69 128 64 107 68 87C88 93 98 113 91 136ZM78 158C44 159 26 143 21 124C42 121 65 132 78 158ZM105 171C116 143 139 132 160 134C156 154 134 174 105 171ZM48 129C17 119 8 97 14 78C36 89 48 105 48 129ZM100 201C126 179 149 179 166 189C152 208 123 215 100 201ZM86 191C65 179 40 185 33 198C52 211 73 208 86 191ZM72 69C50 64 38 45 43 25C65 28 78 47 72 69Z" />
      </g>
    </svg>
  );
}

export default function Lume() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [summary, setSummary] = useState<Record<string, string> | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const dateNow = new Date();
  const today = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, "0")}-${String(dateNow.getDate()).padStart(2, "0")}`;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  const choose = (service: string) => {
    setSelected(service);
    setSummary(null);
    document.getElementById("appuntamento")?.scrollIntoView({ behavior: "smooth" });
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(
      Array.from(data.entries()).map(([key, value]) => [key, String(value)]),
    );
    setDraft(values);
    setSummary(values);
  };
  return (
    <>
      <section className="hero" id="inizio">
        <img
          className="hero-photo"
          src="/images/hero.webp"
          alt="Un momento di relax durante un massaggio al viso"
          fetchPriority="high"
        />
        <header className="navigation">
          <a className="wordmark" href="#inizio" aria-label="Lumé, torna all'inizio">
            lumé<span>BEAUTY & WELLNESS</span>
          </a>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            <a href="#filosofia">La nostra filosofia</a>
            <a href="#servizi">I trattamenti</a>
            <a href="#esperienza">L’esperienza Lumé</a>
          </nav>
          <a className="pill nav-book" href="#appuntamento">
            Prenota un momento <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </header>
        {menuOpen && (
          <nav id="mobile-menu" className="mobile-nav" aria-label="Navigazione mobile">
            {[
              ["#filosofia", "La nostra filosofia"],
              ["#servizi", "I trattamenti"],
              ["#esperienza", "L’esperienza Lumé"],
              ["#appuntamento", "Prenota un momento"],
            ].map(([href, text]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                {text}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </nav>
        )}
        <div className="hero-content">
          <div className="hero-topline">
            <p>
              RALLENTA. RESPIRA.
              <br />
              RITROVA LA TUA BELLEZZA.
            </p>
            <span>
              IL TUO SPAZIO DI CURA,
              <br />
              IL TUO TEMPO PER TE.
            </span>
          </div>
          <h1>
            La bellezza di <i>sentirsi bene.</i>
          </h1>
          <div className="hero-bottom">
            <span>CENTRO ESTETICO & BENESSERE</span>
            <span className="hero-entry-text">Entra nel mondo Lumé</span>
          </div>
        </div>
      </section>
      <main>
        <section id="filosofia" className="intro section container reveal">
          <div className="eyebrow">
            <span>01 / LA NOSTRA FILOSOFIA</span>
          </div>
          <h2 className="statement">
            Dove la bellezza
            <br />
            <span className="statement-mid">
              <img
                src="/images/detail.webp"
                alt="La delicatezza di un trattamento viso"
                loading="lazy"
              />{" "}
              incontra
            </span>
            il tuo <i>equilibrio.</i>
          </h2>
          <div className="intro-note">
            <span className="tiny-line" />
            <p>
              Crediamo in una bellezza che nasce dal sentirsi bene. In gesti attenti, piccoli
              rituali e un tempo che, finalmente, è solo tuo.
            </p>
          </div>
          <div className="philosophy-grid">
            <div className="photo-collage">
              <img
                className="collage-small"
                src="/images/face.webp"
                alt="Un rituale di cura della pelle"
                loading="lazy"
              />
              <img
                className="collage-main"
                src="/images/interior.webp"
                alt="Atmosfera calda e naturale, immagine di ispirazione del centro"
                loading="lazy"
              />
              <Botanical className="collage-leaf" />
              <span className="photo-caption">UNO SPAZIO DA VIVERE, NON SOLO DA VISITARE.</span>
            </div>
            <div className="philosophy-copy">
              <span className="eyebrow">IL BENESSERE COMINCIA DALL’ASCOLTO</span>
              <h3>
                La cura della pelle.
                <br />
                La calma della mente.
                <br />
                <i>Un nuovo modo di brillare.</i>
              </h3>
              <p>
                Da Lumé, ogni trattamento è un incontro. Ascoltiamo le tue esigenze e diamo forma a
                un rituale di bellezza pensato per te, con attenzione, sensibilità e gesti
                consapevoli.
              </p>
              <p>
                Dal viso al corpo, dai piccoli dettagli al relax più profondo: ti invitiamo a
                lasciare fuori la fretta e a ritrovare il piacere di prenderti cura di te.
              </p>
              <a className="text-link" href="#servizi">
                Scopri i nostri trattamenti <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="quote-section reveal">
          <Botanical />
          <span className="eyebrow">IL NOSTRO MODO DI INTENDERE LA BELLEZZA</span>
          <p>
            Non cambiare chi sei.
            <br />
            Prenditi il tempo di <i>ritrovarti.</i>
          </p>
          <span className="quote-signature">— La filosofia Lumé</span>
        </section>
        <section className="services-section section container reveal" id="servizi">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / I NOSTRI TRATTAMENTI</span>
              <h2>
                Piccoli rituali.
                <br />
                <i>Grandi sensazioni.</i>
              </h2>
            </div>
            <p>
              Cinque modi per prenderti cura di te.
              <br />
              Un’unica attenzione: il tuo benessere.
            </p>
          </div>
          <div className="services-list">
            {services.map((s, i) => (
              <article className="service" key={s.name}>
                <span className="service-number">0{i + 1}</span>
                <div className="service-title">
                  <span className="eyebrow">{s.tag}</span>
                  <h3>{s.name}</h3>
                </div>
                <div className="service-description">
                  <p>{s.text}</p>
                  <span>{s.detail}</span>
                </div>
                <button
                  className="circle-button"
                  aria-label={`Richiedi ${s.name}`}
                  onClick={() => choose(s.name)}
                >
                  <ArrowUpRight size={22} />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="experience" id="esperienza">
          <article className="experience-panel">
            <img
              src="/images/face.webp"
              alt="Applicazione delicata di un trattamento viso"
              loading="lazy"
            />
            <div className="experience-copy reveal">
              <span className="eyebrow">03 / L’ESPERIENZA LUMÉ</span>
              <h2>
                Lascia parlare
                <br />
                <i>la tua luce.</i>
              </h2>
              <p>
                Texture avvolgenti e gesti delicati. Un rituale viso che mette al centro la tua
                pelle, la sua storia e le sue esigenze.
              </p>
              <button className="pill" onClick={() => choose("Trattamenti viso")}>
                Il tuo rituale viso <ArrowUpRight size={16} />
              </button>
            </div>
            <span className="panel-label">01 — CURA & LUMINOSITÀ</span>
          </article>
          <article className="experience-panel reverse">
            <img
              src="/images/massage.webp"
              alt="Mani che eseguono un massaggio rilassante alla schiena"
              loading="lazy"
            />
            <div className="experience-copy reveal">
              <span className="eyebrow">UN TEMPO CHE APPARTIENE A TE</span>
              <h2>
                Spegni il rumore.
                <br />
                <i>Ascolta il corpo.</i>
              </h2>
              <p>
                Il ritmo si fa lento, le tensioni si allentano. Concediti una pausa di autentico
                benessere e riscopri il piacere della leggerezza.
              </p>
              <button className="pill" onClick={() => choose("Massaggi")}>
                Il tuo momento di relax <ArrowUpRight size={16} />
              </button>
            </div>
            <span className="panel-label">02 — EQUILIBRIO & RELAX</span>
          </article>
        </section>
        <section className="ritual-section container section reveal">
          <span className="eyebrow">SEMPLICE, COME PRENDERSI CURA DI SÉ</span>
          <h2>
            Il tuo momento, <i>in tre gesti.</i>
          </h2>
          <div className="ritual-grid">
            {[
              [
                "01",
                "Raccontaci di te",
                "Scegli un trattamento o lasciati guidare. Ogni percorso parte dalle tue esigenze.",
              ],
              [
                "02",
                "Trova il tuo tempo",
                "Indica il giorno e la fascia oraria che preferisci per il tuo momento di benessere.",
              ],
              [
                "03",
                "Lasciati accogliere",
                "Nel centro, non dovresti pensare ad altro. Solo al piacere di sentirti bene.",
              ],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span className="ritual-num">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="booking-section" id="appuntamento">
          <div className="booking-inner container">
            <div className="booking-copy">
              <span className="eyebrow">04 / UN APPUNTAMENTO CON TE</span>
              <h2>
                Il resto può aspettare.
                <br />
                <i>Tu, no.</i>
              </h2>
              <p>
                Ritaglia uno spazio nella tua giornata.
                <br />
                Il primo passo verso il benessere comincia qui.
              </p>
              <Botanical className="booking-leaf" />
            </div>
            <div className="booking-form-wrap">
              {summary ? (
                <output className="booking-summary">
                  <div className="summary-check">
                    <Check size={24} />
                  </div>
                  <span className="eyebrow">IL TUO RIEPILOGO DIMOSTRATIVO</span>
                  <h3>
                    Un momento per te,
                    <br />
                    <i>{summary.name}.</i>
                  </h3>
                  <dl>
                    <div>
                      <dt>Trattamento</dt>
                      <dd>{summary.service}</dd>
                    </div>
                    <div>
                      <dt>Giorno preferito</dt>
                      <dd>
                        {new Date(`${summary.date}T12:00:00`).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt>Fascia oraria</dt>
                      <dd>{summary.time}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{summary.email}</dd>
                    </div>
                    {summary.notes && (
                      <div>
                        <dt>Note</dt>
                        <dd>{summary.notes}</dd>
                      </div>
                    )}
                  </dl>
                  <p className="summary-disclaimer">
                    Nessuna richiesta è stata inviata. Questo è soltanto un riepilogo locale; la
                    disponibilità non è verificata.
                  </p>
                  <button className="button-primary" onClick={() => setSummary(null)}>
                    Modifica il riepilogo <ArrowRight size={18} />
                  </button>
                </output>
              ) : (
                <form ref={formRef} onSubmit={submit}>
                  <div className="form-heading">
                    <h3>Richiedi il tuo momento</h3>
                    <span>* CAMPI OBBLIGATORI</span>
                  </div>
                  <div className="form-grid">
                    <label>
                      Nome e cognome *
                      <input
                        name="name"
                        aria-label="Nome e cognome"
                        placeholder="Come ti chiami?"
                        autoComplete="name"
                        required
                        maxLength={100}
                        defaultValue={draft.name}
                      />
                    </label>
                    <label>
                      Email *
                      <input
                        name="email"
                        aria-label="Email"
                        type="email"
                        placeholder="La tua email"
                        autoComplete="email"
                        required
                        maxLength={160}
                        defaultValue={draft.email}
                      />
                    </label>
                    <label className="full">
                      Il tuo trattamento *
                      <select
                        name="service"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Scegli il tuo rituale
                        </option>
                        {services.map((s) => (
                          <option key={s.name}>{s.name}</option>
                        ))}
                        <option>Vorrei un consiglio</option>
                      </select>
                    </label>
                    <label>
                      Giorno preferito *
                      <input
                        name="date"
                        aria-label="Giorno preferito"
                        type="date"
                        min={today}
                        required
                        defaultValue={draft.date}
                      />
                    </label>
                    <label>
                      Fascia oraria *
                      <select name="time" required defaultValue={draft.time || ""}>
                        <option value="" disabled>
                          Quando preferisci?
                        </option>{" "}
                        <option>Mattina · 09:00–13:00</option>
                        <option>Pomeriggio · 14:00–18:00</option>
                        <option>Indifferente</option>
                      </select>
                    </label>
                    <label className="full">
                      Qualcosa che dovremmo sapere?
                      <textarea
                        name="notes"
                        aria-label="Note o esigenze"
                        placeholder="Desideri, esigenze o semplicemente un saluto…"
                        rows={2}
                        maxLength={600}
                        defaultValue={draft.notes}
                      />
                    </label>
                  </div>
                  <p className="consent">
                    Questo è un modulo dimostrativo e non verrà inviata alcuna richiesta
                  </p>
                  <button className="button-primary" type="submit">
                    Crea il riepilogo della richiesta <ArrowUpRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-main container">
          <div>
            <a href="#inizio" className="wordmark footer-logo">
              lumé<span>BEAUTY & WELLNESS</span>
            </a>
            <p>
              La bellezza comincia
              <br />
              da come ti senti.
            </p>
          </div>
          <div>
            <span className="eyebrow">VIENI A TROVARCI</span>
            <p>
              <MapPin size={14} /> Via del Benessere 12, Milano
            </p>
            <p>
              <Clock size={14} /> Lun–Sab · 09:00–18:00
            </p>
            <span className="contact-demo">Indirizzo e orari dimostrativi</span>
          </div>
          <div>
            <span className="eyebrow">RESTIAMO IN CONTATTO</span>
            <p>lume@example.com</p>
            <p>+39 02 0000 0000</p>
            <span className="contact-demo">Contatti dimostrativi</span>
          </div>
          <a href="#inizio" className="footer-up" aria-label="Torna all'inizio">
            <ArrowUpRight size={24} />
          </a>
        </div>
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} Lumé</span>
          <span>Progetto dimostrativo</span>
        </div>
      </footer>
    </>
  );
}
