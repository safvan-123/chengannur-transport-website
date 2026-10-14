"use client";
import { useEffect, useRef, useState } from "react";
import { business } from "../lib/config";
import {
  localDate,
  phoneHref,
  whatsappHref,
  tripMessage,
  validateTrip,
} from "../lib/enquiry.mjs";
function Icon({ name = "arrow", size = 22 }: { name?: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    phone: (
      <path d="m7 3 3 4-2 3c1 3 3 5 6 6l3-2 4 3c-1 5-5 5-9 3S4 13 3 9s0-6 4-6Z" />
    ),
    chat: (
      <path d="M21 11a9 9 0 0 1-13 8l-5 2 1-6a9 9 0 1 1 17-4ZM8 9h8M8 13h5" />
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    mountain: <path d="m2 19 7-12 4 6 3-8 6 14H2Zm6-10 3 2m4-3 3 2" />,
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" />
      </>
    ),
    bus: (
      <>
        <rect x="4" y="3" width="16" height="16" rx="3" />
        <path d="M4 11h16M8 19v2m8-2v2M8 15h.01M16 15h.01M9 3v8" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M5 12h14M12 5v14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

const initial = {
  name: "",
  pickup: "",
  destination: "Sabarimala (drop point to confirm)",
  date: "",
  time: "",
  passengers: "",
  capacity: "Help me choose",
  trip: "One-way",
  returnDate: "",
  notes: "",
};
const gallery = [
  ["fleet-banner", "Our pilgrimage fleet"],
  ["dzire", "Swift Dzire · 4 seats"],
  ["bus", "Tourist Bus · 49 seats"],
  ["winger", "Tata Winger · 10 seats"],
  ["innova", "Toyota Innova · 7 seats"],
  ["traveller", "Tempo Traveller · 12–26 seats"],
  ["padmanabhaswamy", "Temple journey"],
  ["shiva-temple", "Related temple visit"],
  ["pilgrim-road", "The road to Sabarimala"],
  ["sabarimala-evening", "Sabarimala at evening"],
  ["hero", "Sabarimala pilgrimage"],
];
function Pagination({
  page,
  total,
  onChange,
  label,
}: {
  page: number;
  total: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <nav className="pagination" aria-label={label}>
      <button
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-current={page === i ? "page" : undefined}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === total - 1}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
      <span>
        Page {page + 1} of {total}
      </span>
    </nav>
  );
}
export default function TransportSite() {
  const [menu, setMenu] = useState(false),
    [data, setData] = useState(initial),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [help, setHelp] = useState(""),
    [fallback, setFallback] = useState(""),
    [message, setMessage] = useState(""),
    [today, setToday] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setToday(localDate());
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  const tel = phoneHref(business.phone),
    wa = whatsappHref(
      business.whatsapp,
      "Hello PV TRAVELS, I would like to enquire about Sabarimala pilgrimage transport.",
    );
  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((v) => ({ ...v, [e.target.name]: "" }));
    setFallback("");
  };
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const issues = validateTrip(data);
    setErrors(issues);
    setHelp("");
    setFallback("");
    if (Object.keys(issues).length) {
      setTimeout(
        () =>
          formRef.current
            ?.querySelector<HTMLElement>('[aria-invalid="true"]')
            ?.focus(),
        0,
      );
      return;
    }
    const text = tripMessage(data);
    setMessage(text);
    const link = whatsappHref(business.whatsapp, text);
    if (!link) {
      setHelp(
        "Your enquiry is ready. The operator’s WhatsApp number must be added before it can be sent.",
      );
      return;
    }
    setFallback(link);
    const opened = window.open(link, "_blank", "noopener,noreferrer");
    setHelp(
      opened
        ? "WhatsApp has been opened. Press Send there to submit your enquiry."
        : "Use the link below to continue to WhatsApp. Press Send there to submit your enquiry.",
    );
  }
  const field = (
    name: keyof typeof initial,
    label: string,
    type = "text",
    optional = false,
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {optional && <span> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={data[name]}
        onChange={change}
        required={!optional}
        maxLength={type === "text" ? 120 : undefined}
        min={
          type === "date"
            ? name === "returnDate"
              ? data.date || today
              : today
            : type === "number"
              ? 1
              : undefined
        }
        max={type === "number" ? 49 : undefined}
        step={type === "number" ? 1 : undefined}
        autoComplete={name === "name" ? "name" : "off"}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <small id={`${name}-error`} className="error">
          {errors[name]}
        </small>
      )}
    </div>
  );

  const [templePage, setTemplePage] = useState(0),
    [routePage, setRoutePage] = useState(0),
    [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxClose = useRef<HTMLButtonElement>(null),
    galleryTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (lightbox === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxClose.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((v) => (v === null ? null : (v + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) =>
          v === null ? null : (v + gallery.length - 1) % gallery.length,
        );
      if (e.key === "Tab") {
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const index = buttons.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        e.preventDefault();
        buttons[
          (index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length
        ]?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
      galleryTrigger.current?.focus();
    };
  }, [lightbox]);
  function ContactButton({
    kind = "whatsapp",
    children,
    className = "",
  }: {
    kind?: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a
        className={`button ${className}`}
        href={kind === "call" ? tel : wa}
        {...(kind === "call"
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        <Icon name={kind === "call" ? "phone" : "chat"} size={18} />
        {children}
      </a>
    );
  }
  function choose(values: Partial<typeof initial>) {
    setData((v) => ({ ...v, ...values }));
    document.getElementById("enquiry")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setTimeout(
      () => document.getElementById("name")?.focus({ preventScroll: true }),
      100,
    );
  }
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            Chengannur, Kerala <span className="top-separator">/</span>{" "}
            Sabarimala pilgrimage transport
          </span>
          <a href={tel}>+91 9446055334</a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <a href="#home" className="brand">
            <img
              src="/images/logo.webp"
              alt="PV TRAVELS lion and crown logo"
              width="54"
              height="62"
            />
            <span>PV Travels Chengannur</span>
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
          <nav
            id="navigation"
            className={menu ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {[
              ["home", "Home"],
              ["about", "About Us"],
              ["vehicles", "Our Fleet"],
              ["routes", "Routes"],
              ["gallery", "Gallery"],
              ["contact", "Contact"],
            ].map(([id, name]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))}
            <ContactButton className="gold nav-book">
              Book your journey
            </ContactButton>
          </nav>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero" aria-label="PV Travels pilgrimage fleet">
          <img
            className="hero-bg"
            src="/images/fleet-banner.webp"
            srcSet="/images/fleet-banner-640.webp 640w, /images/fleet-banner-960.webp 960w, /images/fleet-banner-1280.webp 1280w, /images/fleet-banner-1920.webp 1920w"
            sizes="100vw"
            alt="PV Travels Chengannur fleet for Sabarimala pilgrimage transport"
            width={1920}
            height={1079}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="hero-shade" aria-hidden="true" />
        </section>
        <section id="about" className="section pv-intro" aria-labelledby="pv-intro-title">
          <div className="container reveal">
            <h1 id="pv-intro-title">PV TRAVELS</h1>
            <p className="pv-intro-location">Chengannur, Kerala</p>
            <p className="pv-intro-service">Sabarimala Pilgrimage Travel &amp; Transportation</p>
            <p className="pv-intro-description">Comfortable journeys for families and pilgrim groups.</p>
            <p className="pv-intro-seats"><strong>4–49 Seating Options</strong><span aria-hidden="true"> | </span>40–49 seats for large groups</p>
            <div className="actions">
              <ContactButton className="gold">WhatsApp Booking</ContactButton>
              <ContactButton kind="call" className="outline">Call Now</ContactButton>
            </div>
          </div>
        </section>
        <section id="vehicles" className="section fleet-section">
          <div className="container reveal">
            <div className="section-head">
              <div>
                <div className="eyebrow dark">OUR FLEET</div>
                <h2>A seat for every pilgrim.</h2>
              </div>
              <p>
                From four seats to forty-nine. Find a vehicle for your group,
                then enquire about your dates.
              </p>
            </div>
            <div className="vehicle-grid">
              {business.vehicles.map((v) => (
                <article className="vehicle-card" key={v.id}>
                  <div
                    className={`vehicle-image ${v.id === "bus" ? "portrait-vehicle" : ""}`}
                  >
                    <img
                      src={v.image}
                      alt={`${v.name} offered by PV TRAVELS for pilgrimage transport`}
                      width="1600"
                      height="1000"
                      loading="lazy"
                    />
                    <span className="vehicle-tag">{v.capacity}</span>
                  </div>
                  <div className="vehicle-body">
                    <p className="card-eyebrow">{v.type}</p>
                    <h3>{v.name}</h3>
                    <div className="seat">
                      <Icon name="people" size={18} />
                      {v.capacity}
                    </div>
                    <button
                      className="vehicle-button"
                      onClick={() => choose({ capacity: v.preference })}
                    >
                      Enquire about this vehicle <Icon size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              Vehicle and seating availability are confirmed for your travel
              date. Ask about luggage space and your preferred seating
              configuration.
            </p>
          </div>
        </section>
        <section id="routes" className="section container reveal">
          <div className="section-head">
            <div>
              <div className="eyebrow dark">SABARIMALA ROUTES</div>
              <h2>
                Many starting points.
                <br />
                One sacred destination.
              </h2>
            </div>
            <p>
              Choose your departure city to start an enquiry. Plan the exact
              pickup and permitted drop point with PV TRAVELS.
            </p>
          </div>
          <div className="route-grid">
            {business.routes
              .slice(routePage * 6, routePage * 6 + 6)
              .map((r, i) => (
                <button
                  className={`route-card ${r.name === "Chengannur" ? "featured-route" : ""}`}
                  key={r.name}
                  onClick={() =>
                    choose({
                      pickup: r.name,
                      destination: "Sabarimala (drop point to confirm)",
                    })
                  }
                >
                  <div className="route-top">
                    <span>
                      {r.name === "Chengannur"
                        ? "OUR HOME ROUTE"
                        : `ROUTE ${String(routePage * 6 + i + 1).padStart(2, "0")}`}
                    </span>
                    <Icon size={20} />
                  </div>
                  <h3>{r.name}</h3>
                  <div className="route-destination">
                    <span className="route-line" />
                    Sabarimala
                  </div>
                  <div className="route-distance">
                    <strong>{r.km}</strong>
                    <span>km · approx.</span>
                  </div>
                </button>
              ))}
          </div>
          <Pagination
            page={routePage}
            total={2}
            onChange={setRoutePage}
            label="Sabarimala route pages"
          />
          <section id="pickup-points" className="main-pickups" aria-labelledby="pickup-heading">
            <div className="section-head">
              <div>
                <div className="eyebrow dark">OUR MAIN PICKUP POINTS</div>
                <h2 id="pickup-heading">Your journey to Sabarimala starts here.</h2>
              </div>
            </div>
            <div className="pickup-grid">
              {business.mainPickups.map((route) => (
                <article className="temple-photo-card pickup-card" key={route.name}>
                  <div className="pickup-photo">
                    <img
                      src={route.image}
                      srcSet={`${route.image.replace(".webp", "-480.webp")} 480w, ${route.image} 736w`}
                      sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 900px) calc((100vw - 66px) / 2), (max-width: 1100px) calc((100vw - 84px) / 3), 388px"
                      alt={route.imageAlt}
                      width={736}
                      height={1308}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="temple-photo-body">
                    <h3>{route.name}<span className="pickup-destination">→ Sabarimala</span></h3>
                    <a
                      className="vehicle-button"
                      href={whatsappHref(business.whatsapp, `Hello PV TRAVELS, I would like to enquire about ${route.name} to Sabarimala transport. Please confirm pickup arrangements, vehicle availability and the quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp enquiry <Icon name="chat" size={18} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="temple-head">
            <h3>Continue your temple journey</h3>
            <p>Specified related temple routes from Sabarimala.</p>
          </div>
          <div className="temple-grid">
            {business.templeRoutes
              .slice(templePage * 6, templePage * 6 + 6)
              .map((r, i) => (
                <article className="temple-photo-card" key={`${r.name}-${templePage * 6 + i}`}>
                  <div className="temple-photo">
                    <img
                      src={r.image}
                      decoding="async"
                      alt={`${r.name}, ${r.location}`}
                      loading="lazy"
                      width="736"
                      height="1104"
                    />
                    <span className="temple-distance">{r.km == null ? "Enquire for route details" : `${r.km} km · approx.`}</span>
                  </div>
                  <div className="temple-photo-body">
                    <small>
                      FROM SABARIMALA ·{" "}
                      {String(templePage * 6 + i + 1).padStart(2, "0")}
                    </small>
                    <h4>{r.name}</h4>
                    <p>{r.location}</p>
                    <button
                      className="vehicle-button"
                      onClick={() =>
                        choose({
                          pickup: "Sabarimala (pickup point to confirm)",
                          destination: r.name,
                        })
                      }
                    >
                      Enquire about this route <Icon size={18} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
          <Pagination
            page={templePage}
            total={Math.ceil(business.templeRoutes.length / 6)}
            onChange={setTemplePage}
            label="Temple route pages"
          />
          <p className="section-note">
            Distances are approximate client-provided route references. Actual
            distance depends on the route and permitted vehicle access points.
          </p>
        </section>
        <section id="gallery" className="gallery-section section">
          <div className="container reveal">
            <div className="section-head">
              <div>
                <div className="eyebrow">A GLIMPSE OF THE JOURNEY</div>
                <h2>Devotion meets the road.</h2>
              </div>
              <div className="gallery-arrows">
                <button
                  aria-label="Previous gallery slide"
                  onClick={() =>
                    setSlide((slide + gallery.length - 1) % gallery.length)
                  }
                >
                  ←
                </button>
                <button
                  aria-label="Next gallery slide"
                  onClick={() => setSlide((slide + 1) % gallery.length)}
                >
                  →
                </button>
              </div>
            </div>
            <div className="gallery-layout">
              <button
                className="gallery-main"
                onClick={(e) => {
                  galleryTrigger.current = e.currentTarget;
                  setLightbox(slide);
                }}
                aria-label={`Enlarge ${gallery[slide][1]}`}
              >
                <img
                  src={`/images/${gallery[slide][0]}.webp`}
                  data-photo={gallery[slide][0]}
                  alt={gallery[slide][1]}
                  loading="lazy"
                />
                <span className="gallery-caption">
                  <strong>{gallery[slide][1]}</strong>
                  <span>View image ↗</span>
                </span>
              </button>
              <div className="gallery-side">
                {[1, 2].map((offset) => {
                  const i = (slide + offset) % gallery.length;
                  return (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Show ${gallery[i][1]}`}
                    >
                      <img
                        src={`/images/${gallery[i][0]}.webp`}
                        data-photo={gallery[i][0]}
                        alt={gallery[i][1]}
                        loading="lazy"
                      />
                      <span>{gallery[i][1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="gallery-bottom">
              <span aria-live="polite">
                {String(slide + 1).padStart(2, "0")}{" "}
                <span className="muted">/ {gallery.length} images</span>
              </span>
              <div className="gallery-dots">
                {gallery.map((g, i) => (
                  <button
                    key={g[0]}
                    aria-label={`Show image ${i + 1}: ${g[1]}`}
                    aria-pressed={slide === i}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <span>Fleet & pilgrimage moments</span>
            </div>
          </div>
        </section>
        <section id="enquiry" className="section container enquiry-grid reveal">
          <div className="enquiry-copy">
            <div className="eyebrow dark">PLAN YOUR PILGRIMAGE</div>
            <h2>
              Your journey starts
              <br />
              with a conversation.
            </h2>
            <p>
              Tell us where you’re starting, when you’re travelling and how many
              pilgrims are coming with you.
            </p>
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Share your travel plan</strong>
                  <p>Route, dates, group size and vehicle preference.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Send your WhatsApp enquiry</strong>
                  <p>Review the message and press Send in WhatsApp.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Confirm your arrangements</strong>
                  <p>Agree on the vehicle, access points and total fare.</p>
                </div>
              </li>
            </ol>
            <div className="enquiry-call">
              <Icon name="phone" />
              <div>
                Prefer to speak with us?<a href={tel}>+91 9446055334</a>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            className="enquiry-form"
            noValidate
            onSubmit={submit}
          >
            <div className="form-title">
              <h3>Plan your pilgrimage</h3>
              <span>Request a quote</span>
            </div>
            <div className="form-grid">
              {field("name", "Your name")}
              {field("passengers", "Passengers", "number")}
              {field("pickup", "Pickup location")}
              {field("destination", "Destination")}
              {field("date", "Travel date", "date")}
              {field("time", "Pickup time", "time", true)}
              <div className="field">
                <label htmlFor="capacity">Vehicle preference</label>
                <select
                  id="capacity"
                  name="capacity"
                  value={data.capacity}
                  onChange={change}
                  aria-invalid={!!errors.capacity}
                >
                  {[
                    "Help me choose",
                    "Tempo Traveller — 12 seats",
                    "Tempo Traveller — 14 seats",
                    "Tempo Traveller — 17 seats",
                    "Tempo Traveller — 19 seats",
                    "Tempo Traveller — 26 seats",
                  ]
                    .concat(business.vehicles.map((v) => v.preference))
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                </select>
                {errors.capacity && (
                  <small className="error">{errors.capacity}</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="trip">Trip type</label>
                <select
                  id="trip"
                  name="trip"
                  value={data.trip}
                  onChange={change}
                >
                  <option>One-way</option>
                  <option>Return trip</option>
                </select>
              </div>
              {data.trip === "Return trip" &&
                field("returnDate", "Return date", "date")}
              <div className="field full">
                <label htmlFor="notes">
                  Additional details <span>(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={data.notes}
                  onChange={change}
                  rows={3}
                  maxLength={1500}
                  placeholder="Luggage, pickup landmark or anything else we should know"
                />
              </div>
            </div>
            <button type="submit" className="button green submit">
              <Icon name="chat" /> Send enquiry on WhatsApp <Icon size={18} />
            </button>
            <p className="form-note">
              This requests availability and a quote. It does not confirm a
              booking. Your details are not saved on this website.
            </p>
            <div role="status" aria-live="polite">
              {help && <p className="status">{help}</p>}
              {fallback && (
                <a
                  className="fallback"
                  href={fallback}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open your prepared WhatsApp enquiry ↗
                </a>
              )}
              {message && (
                <details className="message-preview">
                  <summary>Review your enquiry message</summary>
                  <pre>{message}</pre>
                </details>
              )}
            </div>
          </form>
        </section>
        <section id="services" className="faq-section section">
          <div className="container faq-grid reveal">
            <div>
              <div className="eyebrow dark">BEFORE YOU TRAVEL</div>
              <h2>
                A little clarity.
                <br />A better journey.
              </h2>
              <p>Answers to common pilgrimage transport questions.</p>
            </div>
            <div className="faq-list">
              {business.faqs.map((f) => (
                <details className="faq" key={f.question}>
                  <summary>
                    {f.question}
                    <Icon name="plus" size={19} />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section container contact-grid reveal">
          <div>
            <div className="eyebrow dark">GET IN TOUCH</div>
            <h2>
              Let’s get you
              <br />
              on your way.
            </h2>
            <p>
              Sabarimala pilgrimage transport, planned directly with PV TRAVELS
              in Chengannur, Kerala.
            </p>
            <div className="contact-links">
              <a href={tel}>
                <Icon name="phone" />
                <div>
                  <small>CALL / WHATSAPP</small>
                  <strong>+91 9446055334</strong>
                </div>
                <Icon size={18} />
              </a>
              <a href={`mailto:${business.email}`}>
                <Icon name="chat" />
                <div>
                  <small>EMAIL US</small>
                  <strong>{business.email}</strong>
                </div>
                <Icon size={18} />
              </a>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" />
                <div>
                  <small>FIND US</small>
                  <strong>Chengannur, Kerala</strong>
                </div>
                <Icon size={18} />
              </a>
            </div>
          </div>
          <div className="map-panel">
            <iframe
              title="Google map of Chengannur, Kerala"
              src="https://maps.google.com/maps?q=Chengannur%2C%20Kerala&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-info">
              <div>
                <strong>PV TRAVELS</strong>
                <span>Chengannur, Kerala</span>
              </div>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open exact location ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <a href="#home" className="brand">
            <img src="/images/logo.webp" alt="" width="48" height="56" />
            <span>
              PV TRAVELS<small>SABARIMALA PILGRIMAGE TRANSPORT</small>
            </span>
          </a>
          <p>
            A sacred destination.
            <br />A journey planned together.
          </p>
          <a href="#enquiry" className="footer-cta">
            Plan your journey ↗
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} PV TRAVELS. All rights reserved.
          </span>
          <span>www.pvtravelschengannur.com</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <div className="mobile-contact">
        <ContactButton kind="call" className="outline">
          Call Now
        </ContactButton>
        <ContactButton className="gold">WhatsApp Booking</ContactButton>
      </div>
      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[lightbox][1]}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button
            ref={lightboxClose}
            className="lightbox-close"
            aria-label="Close image viewer"
            onClick={() => setLightbox(null)}
          >
            <Icon name="close" />
          </button>
          <button
            className="lightbox-prev"
            aria-label="Previous image"
            onClick={() =>
              setLightbox((lightbox + gallery.length - 1) % gallery.length)
            }
          >
            ←
          </button>
          <figure>
            <img
              src={`/images/${gallery[lightbox][0]}.webp`}
              alt={gallery[lightbox][1]}
            />
            <figcaption>
              {gallery[lightbox][1]} · {lightbox + 1} / {gallery.length}
            </figcaption>
          </figure>
          <button
            className="lightbox-next"
            aria-label="Next image"
            onClick={() => setLightbox((lightbox + 1) % gallery.length)}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
