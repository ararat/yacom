import Head from "next/head";
import { useEffect, useRef } from "react";
import Shape from "../components/Shape";
import styles from "../styles/executive.module.css";

const SITE = "https://yuvalararat.com";
const LINKEDIN = "https://www.linkedin.com/in/yuvalararat";
const SLIDESHARE = "https://www.slideshare.net/ararat";
const GITHUB = "https://github.com/ararat";

const M = "#ff3d8b";
const T = "#ff8a3d";
const S = "#ffc93c";
const A = "#2ec4b6";
const C = "#3d5afe";
const V = "#8b5cf6";
const I = "#120820";
const W = "#ffffff";

const TAGS = [
  "AI-Native Engineering",
  "Agentic Systems and MCP",
  "Engineering Excellence",
  "Enterprise Architecture · TOGAF 9.2",
  "Change Leadership · Prosci",
  "Cloud Platforms · AWS",
  "Customer Data at Scale",
];

const APPROACH = [
  {
    n: "01",
    title: "AI-native delivery",
    text: "Agentic, human-in-the-loop engineering as the default operating model. Our AI-Factory pilot moved one project from 1–2 to 3–4 features per release cycle.",
  },
  {
    n: "02",
    title: "Forward-deployed innovation",
    text: "Engineers embedded with top-tier customers, packaged as an innovation hub and roadmap accelerator that customers invest in.",
  },
  {
    n: "03",
    title: "Engineering excellence",
    text: "DORA-aligned measurement, pull-request quality gates, blameless reviews and architecture guardrails that scale without becoming bottlenecks.",
  },
  {
    n: "04",
    title: "Talent that compounds",
    text: "Growth ladders, succession pipelines and weekly coaching. High performance and personal ownership, without burnout.",
  },
];

const CAREER = [
  {
    when: "2021 to Present",
    role: "Senior Engineering Manager · Acting Director of Engineering",
    org: "Adobe · Marketo Engage and Adobe Journey Optimizer B2B",
    note: "Leads a multi-squad, forward-deployed engineering organisation inside a 350-person product group. Took the team from traditional delivery to AI-assisted and AI-driven engineering, shipped the Marketo MCP server, and carries accountability for US$43M in customer renewal commitments.",
  },
  {
    when: "2013 to 2021",
    role: "Principal Enterprise Architect · APAC Competency Lead",
    org: "Adobe Consulting Services · Auckland and Melbourne",
    note: "Led the APAC architecture practice for five years and advised CIO and CSO-level leaders across banking, telecommunications, energy and media. Rebuilt Adobe's New Zealand consulting presence from zero long-term retainers to more than ten multi-year customer commitments.",
  },
];

const EARLIER = "Practice Lead, OpenText (2008–2013) · Chief Technology Officer, Netschool (2003–2004)";

const IMPACT = [
  {
    label: "Agentic AI in production",
    metric: "150 tools · 3,000+ customers",
    text: "Wrote the first iteration of the Marketo Model Context Protocol server, then productionised it with two engineers. 200 closed-beta customers in four weeks, now generally available and serving millions of API calls a day.",
    wide: true,
  },
  {
    label: "Predictable delivery",
    metric: "3 of 3",
    text: "Major releases shipped on schedule through a significant reorganisation.",
  },
  {
    label: "Platform health",
    metric: "−83%",
    text: "High-priority technical debt, unblocking services that had stood still for three years.",
  },
  {
    label: "Talent",
    metric: "100%",
    text: "Retention through two office closures. Onboarding halved from six weeks to three.",
  },
  {
    label: "Cloud first",
    metric: "99.95% SLA",
    text: "One of the first AEM deployments on AWS (2014): self-healing, auto-scaling, chaos-tested in production.",
  },
];

const STATS = [
  ["20+", "years in software"],
  ["12+", "years leading engineering"],
  ["~20", "engineers across squads"],
  ["3,000+", "enterprise customers on our AI release"],
  ["US$43M", "renewal commitments carried"],
];

/* Placeholder endorsements. Replace each quote, name and role with a real,
   attributed quote before this section goes live. */
const ENDORSEMENTS = [
  { quote: "Quote to be added.", name: "Name", role: "Title, Company" },
  { quote: "Quote to be added.", name: "Name", role: "Title, Company" },
  { quote: "Quote to be added.", name: "Name", role: "Title, Company" },
];

const MEDIA = [
  {
    title: "Integration Patterns in AEM 6",
    meta: "SlideShare · 27 slides",
    url: "https://www.slideshare.net/slideshow/integration-patterns-in-aem-6/42784625",
  },
  {
    title: "Melbourne User Group: Oak and MongoDB",
    meta: "SlideShare · 24 slides · November 2014",
    url: "https://www.slideshare.net/slideshow/mug-112014/41751127",
  },
  {
    title: "MongoDB and MongoMK, Source Event",
    meta: "SlideShare · 31 slides · co-presented with MongoDB",
    url: "https://www.slideshare.net/slideshow/mongodb-and-mongomk-source-event/41750593",
  },
  {
    title: "Adobe Power Session ANZ: The need for speed is getting real",
    meta: "Presenter · 2018",
    url: "https://landing.adobe.com/acs/2018/apac/power-session/anz-event-registration-quarter2-phase2.html",
  },
];

const WRITING = [
  {
    tag: "Engineering and AI",
    date: "April 2025",
    title: "Software Engineers: Leaving the Cubicle",
    text: "AI is changing who we are as engineers, not only how fast we ship.",
    url: "/blog/2025-04-software-engineers-leaving-the-cubicle",
  },
  {
    tag: "Architecture",
    date: "May 2017",
    title: "Stress Testing Customisations on AEM Author with Siege",
    text: "A practical method for proving performance and stability under load.",
    url: "/blog/2020-07-stress-testing-customisations-on-aem-author-with-siege",
  },
];

const NAV = [
  ["Perspective", "#perspective"],
  ["Approach", "#approach"],
  ["Career", "#career"],
  ["Impact", "#impact"],
  ["Presentations", "#presentations"],
  ["Writing", "#writing"],
];

const DESCRIPTION =
  "Yuval Ararat is an AI-native engineering leader at Adobe: Senior Engineering Manager and Acting Director of Engineering for Marketo Engage and Adobe Journey Optimizer B2B, and former Principal Enterprise Architect and APAC Competency Lead.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Yuval Ararat",
      url: SITE,
      image: `${SITE}/img/yuval-ararat.png`,
      jobTitle: "Senior Engineering Manager, Acting Director of Engineering",
      worksFor: { "@type": "Organization", name: "Adobe", url: "https://www.adobe.com" },
      description: DESCRIPTION,
      knowsAbout: [
        "Engineering leadership",
        "AI-assisted software engineering",
        "Model Context Protocol (MCP)",
        "Agentic AI systems",
        "Enterprise architecture",
        "Change management",
        "Adobe Experience Manager",
        "Marketo Engage",
        "Adobe Journey Optimizer B2B",
        "Cloud platforms on AWS",
      ],
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "TOGAF 9.2 Certified" },
        { "@type": "EducationalOccupationalCredential", name: "Prosci Certified Change Practitioner" },
        { "@type": "EducationalOccupationalCredential", name: "PRINCE2 Practitioner" },
      ],
      homeLocation: [
        { "@type": "Place", name: "San Jose, California" },
        { "@type": "Place", name: "Auckland, New Zealand" },
      ],
      sameAs: [LINKEDIN, SLIDESHARE, GITHUB],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profile`,
      url: SITE,
      name: "Yuval Ararat | AI-Native Engineering Leader",
      description: DESCRIPTION,
      mainEntity: { "@id": `${SITE}/#person` },
      inLanguage: "en",
    },
  ],
};

function useMotionVars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.setProperty("--sy", String(Math.round(window.scrollY)));
        el.style.setProperty("--p", (max > 0 ? window.scrollY / max : 0).toFixed(4));
      });
    };
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
      el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return ref;
}

export default function Home() {
  const pageRef = useMotionVars();

  return (
    <div className={styles.page} ref={pageRef}>
      <Head>
        <title>Yuval Ararat | AI-Native Engineering Leader</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href={`${SITE}/`} />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-readable profile" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Yuval Ararat | AI-Native Engineering Leader" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:image" content={`${SITE}/img/yuval-ararat.png`} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </Head>

      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          Yuval Ararat<span>.</span>
        </a>
        <nav aria-label="Primary">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a className={styles.navCta} href="#contact">
            Get in touch
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={`${styles.hero} ${styles.themeInk}`}>
          <div className={styles.heroShapes}>
            <Shape k="circle" c={M} c2={V} size="44%" top="2%" right="4%" f={40} fx={["tint"]} />
            <Shape k="tri" c={S} size="34%" top="8%" left="10%" f={-30} r={0.12} fx={["spin"]} />
            <Shape k="quarter" c={T} size="46%" bottom="2%" left="6%" f={20} fx={["turn"]} />
            <Shape k="square" c={C} size="36%" bottom="4%" right="2%" f={-18} r={-0.06} fx={["spin"]} />
            <Shape k="diamond" c={V} c2={A} size="18%" top="44%" left="44%" f={55} fx={["tint", "turn"]} />
            <Shape k="circle" c={A} size="14%" bottom="18%" right="10%" f={70} fx={["hue"]} />
            <Shape k="ring" c={W} size="16%" top="0%" left="48%" f={-50} r={0.2} />
          </div>
          <Shape k="zig" c={A} size="7rem" bottom="8%" left="42%" r={0.1} fx={["turn"]} />
          <Shape k="plus" c={T} size="3rem" top="22%" left="45%" r={0.3} fx={["spin"]} />
          <Shape k="dots" c={V} size="4.5rem" top="42%" left="-1.5rem" fx={["hue"]} />

          <p className={styles.eyebrow}>AI-native engineering leadership · Adobe</p>
          <h1>
            Leading engineering into the <em>agentic era.</em>
          </h1>
          <p className={styles.lead}>
            Senior Engineering Manager and Acting Director of Engineering for Marketo Engage and Adobe
            Journey Optimizer B2B. I turn AI from experiment into shipped product, a new operating model
            and measurable commercial advantage.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={LINKEDIN}>
              Connect on LinkedIn ↗
            </a>
            <a className={styles.secondary} href="#impact">
              See the impact →
            </a>
          </div>
        </section>

        <section id="perspective" className={`${styles.section} ${styles.themeInk}`}>
          <Shape k="quarter" c={T} size="clamp(8rem, 16vw, 14rem)" bottom="-3rem" right="-3rem" r={0.08} fx={["hue"]} />
          <Shape k="plus" c={A} size="3.5rem" top="9%" right="6%" fx={["spin", "tint"]} c2={S} />
          <Shape k="pill" c={M} size="6rem" bottom="4%" left="40%" r={-0.15} fx={["turn"]} />
          <p className={styles.eyebrow}>01 · Perspective</p>
          <div className={styles.about}>
            <div className={styles.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/yuval-ararat.png" alt="Yuval Ararat" width={600} height={469} loading="lazy" />
            </div>
            <div>
              <h2>
                Engineering is not a cost centre. It is the <em>value engine.</em>
              </h2>
              <p>
                I lead the only customer-facing engineering team in a 350-person product organisation: a
                forward-deployed unit of engineers and solution architects that converts top-tier customer
                problems into shipped product. We moved from traditional delivery to AI-assisted and
                AI-driven engineering, with people firmly in the loop.
              </p>
              <p>
                Twenty years in software, eight as a Principal Enterprise Architect, and an early start as
                a startup CTO. I bring architectural depth to every AI decision and commercial discipline to
                every roadmap.
              </p>
              <ul className={styles.tags}>
                {TAGS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="approach" className={`${styles.section} ${styles.themeCobalt}`}>
          <Shape k="half" c={S} size="clamp(9rem, 18vw, 16rem)" top="-3rem" right="6%" r={0.1} fx={["turn"]} />
          <Shape k="ring" c={M} size="9rem" bottom="-3rem" left="-2rem" r={-0.15} fx={["tint"]} c2={T} />
          <Shape k="dots" c={W} size="4.5rem" top="2rem" left="48%" fx={["spin"]} />
          <p className={styles.eyebrow}>02 · Approach</p>
          <h2>
            Four principles for an <em>AI-first</em> engineering organisation.
          </h2>
          <div className={styles.approach}>
            {APPROACH.map((a) => (
              <article key={a.n}>
                <span className={styles.num}>{a.n}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="career" className={`${styles.section} ${styles.themeInk}`}>
          <Shape k="circle" c={V} size="clamp(14rem, 30vw, 26rem)" top="10%" right="-8rem" fx={["hue"]} />
          <Shape k="tri" c={S} size="5rem" top="16%" right="22%" r={0.18} fx={["spin"]} />
          <Shape k="arch" c={A} c2={M} size="7rem" bottom="8%" right="12%" fx={["tint", "turn"]} />
          <p className={styles.eyebrow}>03 · Career</p>
          <h2>
            Thirteen years at Adobe, from architect to <em>engineering executive.</em>
          </h2>
          <ol className={styles.timeline}>
            {CAREER.map((c) => (
              <li key={c.when}>
                <span className={styles.when}>{c.when}</span>
                <h3>{c.role}</h3>
                <p className={styles.org}>{c.org}</p>
                <p>{c.note}</p>
              </li>
            ))}
          </ol>
          <p className={styles.earlier}>
            <span>Earlier</span> {EARLIER}
          </p>
        </section>

        <section id="impact" className={`${styles.section} ${styles.themeInk2}`}>
          <Shape k="square" c={A} size="6rem" top="5rem" right="8%" r={0.12} fx={["spin"]} />
          <Shape k="zig" c={S} size="8rem" top="3rem" right="24%" fx={["turn"]} />
          <p className={styles.eyebrow}>04 · Selected impact</p>
          <h2>
            Outcomes, <em>not activity.</em>
          </h2>
          <div className={styles.cards}>
            {IMPACT.map((i) => (
              <article key={i.label} className={i.wide ? `${styles.card} ${styles.wide}` : styles.card}>
                <p className={styles.label}>{i.label}</p>
                <p className={styles.metric}>{i.metric}</p>
                <p>{i.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.band} ${styles.themeSun}`} aria-label="Track record">
          <Shape k="circle" c={M} size="5rem" top="-2rem" left="4%" r={0.1} fx={["tint"]} c2={V} />
          <Shape k="diamond" c={C} size="4rem" bottom="-1.5rem" right="6%" r={-0.2} fx={["spin"]} />
          <div className={styles.stats}>
            {STATS.map(([n, label]) => (
              <div key={label} className={styles.stat}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="endorsements" className={`${styles.section} ${styles.themeMagenta}`}>
          <Shape k="circle" c={S} c2={A} size="clamp(8rem, 16vw, 14rem)" top="-3rem" right="5%" fx={["tint"]} />
          <Shape k="diamond" c={I} size="4.5rem" bottom="10%" left="2%" r={0.15} fx={["spin"]} />
          <Shape k="half" c={V} size="7rem" top="20%" right="28%" r={-0.08} fx={["turn"]} />
          <p className={styles.eyebrow}>05 · Endorsements</p>
          <h2>
            In their <em>words.</em>
          </h2>
          <div className={styles.quotes}>
            {ENDORSEMENTS.map((e, i) => (
              <figure key={i} className={styles.quote}>
                <blockquote>{e.quote}</blockquote>
                <figcaption>
                  <strong>{e.name}</strong>
                  <span>{e.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="presentations" className={`${styles.section} ${styles.themeInk}`}>
          <Shape k="arch" c={T} size="clamp(9rem, 18vw, 15rem)" bottom="-1rem" right="6%" fx={["hue"]} />
          <Shape k="plus" c={M} size="3rem" top="22%" right="30%" r={0.25} fx={["spin"]} />
          <Shape k="ring" c={A} size="5rem" top="12%" right="10%" fx={["tint"]} c2={S} />
          <p className={styles.eyebrow}>06 · Presentations</p>
          <h2>
            On <em>stage.</em>
          </h2>
          <ul className={styles.media}>
            {MEDIA.map((m) => (
              <li key={m.url}>
                <a href={m.url}>
                  <span className={styles.play} aria-hidden="true">
                    ▶
                  </span>
                  <span>
                    <strong>{m.title}</strong>
                    <small>{m.meta}</small>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <a href={SLIDESHARE}>All presentations on SlideShare →</a>
          </p>
        </section>

        <section id="writing" className={`${styles.section} ${styles.themeAqua}`}>
          <Shape k="quarter" c={C} size="clamp(8rem, 16vw, 13rem)" top="0" right="0" r={0.06} fx={["turn"]} />
          <Shape k="dots" c={I} size="4.5rem" bottom="10%" right="8%" fx={["spin"]} />
          <Shape k="tri" c={M} c2={S} size="4rem" top="2.5rem" right="24%" fx={["tint", "spin"]} />
          <p className={styles.eyebrow}>07 · Writing</p>
          <h2>
            Notes on where engineering is <em>going.</em>
          </h2>
          <div className={styles.articles}>
            {WRITING.map((w) => (
              <a key={w.url} className={styles.article} href={w.url}>
                <p className={styles.label}>
                  {w.tag} · {w.date}
                </p>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span>Read essay →</span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className={`${styles.cta} ${styles.themeViolet}`}>
          <Shape k="circle" c={M} c2={T} size="clamp(10rem, 20vw, 18rem)" bottom="-6rem" left="-4rem" fx={["tint"]} f={25} />
          <Shape k="square" c={S} size="clamp(6rem, 12vw, 10rem)" top="-2rem" right="-1rem" r={0.1} fx={["spin"]} f={-25} />
          <Shape k="tri" c={A} size="5rem" top="18%" left="10%" r={-0.14} fx={["turn"]} f={35} />
          <Shape k="ring" c={I} size="5rem" bottom="12%" right="12%" fx={["hue"]} f={-40} />
          <p className={styles.eyebrow}>What&apos;s next</p>
          <h2>
            Let&apos;s build the engineering organisation <em>AI makes possible.</em>
          </h2>
          <div className={styles.actions}>
            <a className={styles.primary} href={LINKEDIN}>
              LinkedIn ↗
            </a>
            <a className={styles.secondary} href={SLIDESHARE}>
              SlideShare ↗
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Yuval Ararat</span>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>San Jose, California · Auckland, New Zealand</span>
      </footer>
    </div>
  );
}
