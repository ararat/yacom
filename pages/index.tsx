import Head from "next/head";
import { useEffect, useRef } from "react";
import Shape from "../components/Shape";
import { jsonLd } from "../lib/jsonLd";
import { RECOMMENDATIONS } from "../data/recommendations";
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

/**
 * Drives everything tied to scroll and pointer, in one animation frame:
 * shape rotation/drift, colour fields sliding into place as their section
 * arrives, the progress stripe, the active nav link, and reveal-on-enter.
 * Without JavaScript or with reduced motion the page renders in its final state.
 */
/**
 * Slide-in progress for a section's colour block: 0 while the section is
 * below the screen, 1 once it has risen most of a screen. Smoothstep eases
 * the start and the end so the move feels long and unhurried.
 */
const SLIDE_SPAN = 0.9; // of the screen height
function slideProgress(sectionTop: number, vh: number) {
  const t = Math.min(Math.max((vh - sectionTop) / (vh * SLIDE_SPAN), 0), 1);
  return t * t * (3 - 2 * t);
}

function usePageMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("main > section[id]"));
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-spy]"));
    const progress = root.querySelector<HTMLElement>("[data-progress]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shapes = reduced ? [] : Array.from(root.querySelectorAll<HTMLElement>("[data-shape]"));
    const fields = reduced ? [] : Array.from(root.querySelectorAll<HTMLElement>("[data-field]"));
    const state = { mx: 0, my: 0 };
    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const sy = String(Math.round(window.scrollY));
      const p = (max > 0 ? Math.min(window.scrollY / max, 1) : 0).toFixed(3);
      const mx = state.mx.toFixed(3);
      const my = state.my.toFixed(3);

      // Read layout first, then write styles, to avoid forced reflows.
      const fieldTops = fields.map((f) => f.parentElement!.getBoundingClientRect().top);
      let active = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= vh * 0.4) active = s.id;
      }

      for (const shape of shapes) {
        shape.style.setProperty("--sy", sy);
        shape.style.setProperty("--p", p);
        shape.style.setProperty("--mx", mx);
        shape.style.setProperty("--my", my);
      }
      fields.forEach((field, i) => {
        const v = slideProgress(fieldTops[i], vh);
        field.style.setProperty("--v", v.toFixed(3));
      });
      progress?.style.setProperty("--p", p);
      for (const link of links) {
        if (link.dataset.spy === active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      state.mx = e.clientX / window.innerWidth - 0.5;
      state.my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Pointer drift only makes sense with a mouse or trackpad.
    const finePointer = !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });

    // Reveal blocks as they enter the viewport (once each).
    let observer: IntersectionObserver | undefined;
    if (!reduced && "IntersectionObserver" in window) {
      root.setAttribute("data-js", "");
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-in", "");
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      );
      root.querySelectorAll("[data-reveal]").forEach((el) => observer?.observe(el));
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onMove);
      observer?.disconnect();
      root.removeAttribute("data-js");
    };
  }, []);

  return ref;
}

/**
 * Perspective: the orange block reaches into the text column, and text it
 * passes under turns dark. A dark copy of the text (added client-side,
 * hidden from assistive tech) is clipped to the block; the original is
 * clipped to the purple side. Both follow the same edge every frame, so the
 * split holds while the block slides in. Phones skip it: the block is hidden.
 */
function usePerspectiveSplit() {
  useEffect(() => {
    const section = document.getElementById("perspective");
    const field = section?.querySelector<HTMLElement>("[data-split-field]");
    const overlay = section?.querySelector<HTMLElement>("[data-split-overlay]");
    const text = section?.querySelector<HTMLElement>("[data-split-text]");
    const about = text?.parentElement;
    if (!section || !field || !overlay || !text || !about) return;

    const wide = window.matchMedia("(min-width: 861px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clone = about.cloneNode(true) as HTMLElement;
    clone.querySelector("[data-split-text]")?.removeAttribute("data-split-text");
    clone.setAttribute("inert", "");
    overlay.appendChild(clone);

    // Mirror the reveal animation and tag hovers onto the copy.
    const syncReveal = () => {
      if (about.hasAttribute("data-in")) clone.setAttribute("data-in", "");
    };
    syncReveal();
    const revealObserver = new MutationObserver(syncReveal);
    revealObserver.observe(about, { attributes: true, attributeFilter: ["data-in"] });

    const tags = Array.from(text.querySelectorAll("li"));
    const cloneTags = Array.from(clone.querySelectorAll("li"));
    const hoverOff = tags.map((tag, i) => {
      const on = () => cloneTags[i]?.setAttribute("data-hover", "");
      const off = () => cloneTags[i]?.removeAttribute("data-hover");
      tag.addEventListener("pointerenter", on);
      tag.addEventListener("pointerleave", off);
      return () => {
        tag.removeEventListener("pointerenter", on);
        tag.removeEventListener("pointerleave", off);
      };
    });

    let frame = 0;
    let shown = reduced ? 1 : slideProgress(section.getBoundingClientRect().top, window.innerHeight);
    const layout = () => {
      frame = 0;
      if (!wide.matches) {
        field.style.clipPath = overlay.style.clipPath = text.style.clipPath = "";
        return;
      }
      // Offsets ignore transforms, so the reveal slide doesn't skew the maths.
      const W = section.clientWidth;
      const H = section.offsetHeight;
      const ax = about.offsetLeft;
      const ay = about.offsetTop;
      clone.style.cssText = `position:absolute;left:${ax}px;top:${ay}px;width:${about.offsetWidth}px;margin:0`;

      const paras = text.querySelectorAll("p");
      const first = paras[0];
      const last = paras[paras.length - 1];
      if (!first || !last) return;
      const midY = ay + (first.offsetTop + last.offsetTop + last.offsetHeight) / 2;
      // The edge crosses the paragraphs about 45% of the way in, tilted 15°
      // more than the block's original lean of 7rem from top to bottom.
      const x = ax + first.offsetLeft + first.offsetWidth * 0.45;
      const baseLean = 7 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const lean = H * Math.tan(Math.atan(baseLean / H) + (15 * Math.PI) / 180);
      const vh = window.innerHeight;
      // Ease towards the scroll target each frame, matching the smoothing
      // the other blocks get from their CSS transition.
      const target = reduced ? 1 : slideProgress(section.getBoundingClientRect().top, vh);
      shown = Math.abs(target - shown) < 0.002 ? target : shown + (target - shown) * 0.12;
      if (shown !== target) schedule();
      const v = shown;
      const dx = (1 - v) * -0.33 * W;
      const top = x + lean * (midY / H) + dx;
      const bottom = x - lean * (1 - midY / H) + dx;

      const cut = `polygon(0 0, ${top}px 0, ${bottom}px ${H}px, 0 ${H}px)`;
      field.style.clipPath = cut;
      overlay.style.clipPath = cut;
      const tx = ax + text.offsetLeft;
      const ty = ay + text.offsetTop;
      text.style.clipPath = `polygon(${top - tx}px ${-ty}px, 100000px ${-ty}px, 100000px ${H - ty}px, ${bottom - tx}px ${H - ty}px)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(layout);
    };

    schedule();
    document.fonts?.ready.then(schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    wide.addEventListener("change", schedule);
    const resizeObserver = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(schedule);
    resizeObserver?.observe(section);
    resizeObserver?.observe(text);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
      resizeObserver?.disconnect();
      revealObserver.disconnect();
      hoverOff.forEach((off) => off());
      clone.remove();
      field.style.clipPath = overlay.style.clipPath = text.style.clipPath = "";
    };
  }, []);
}

export default function Home() {
  const pageRef = usePageMotion();
  usePerspectiveSplit();

  const endorsements = RECOMMENDATIONS.filter((r) => r.show);
  const showEndorsements = endorsements.length > 0;
  const num = (n: number) => String(showEndorsements ? n : n - 1).padStart(2, "0");

  return (
    <div className={styles.page} ref={pageRef}>
      <Head>
        <title>Yuval Ararat | AI-Native Engineering Leader</title>
        {/* Paint the page dark from the first frame, before the stylesheet arrives */}
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#1b0b36" />
        <style>{"html,body{background:#1b0b36}"}</style>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href={`${SITE}/`} />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-readable profile" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Yuval Ararat | AI-Native Engineering Leader" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:image" content={`${SITE}/img/yuval-ararat.png`} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(JSON_LD) }} />
      </Head>

      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          Yuval Ararat<span>.</span>
        </a>
        <nav aria-label="Primary">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} data-spy={href.slice(1)}>
              {label}
            </a>
          ))}
          <a className={styles.navCta} href="#contact">
            Get in touch
          </a>
        </nav>
        <span className={styles.progress} data-progress="" aria-hidden="true" />
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroShapes}>
            <Shape k="circle" c={M} c2={V} size="44%" top="2%" right="4%" f={40} fx={["tint"]} />
            <Shape k="tri" c={S} size="34%" top="8%" left="10%" f={-30} r={0.12} fx={["spin"]} />
            <Shape k="quarter" c={T} size="46%" bottom="2%" left="6%" f={20} fx={["turn"]} />
            <Shape k="square" c={C} size="36%" bottom="4%" right="2%" f={-18} r={-0.06} fx={["spin"]} />
            <Shape k="diamond" c={V} c2={A} size="18%" top="44%" left="44%" f={55} fx={["tint", "turn"]} />
            <Shape k="circle" c={A} size="14%" bottom="18%" right="10%" f={70} fx={["hue"]} />
            <Shape k="ring" c={W} size="16%" top="0%" left="48%" f={-50} r={0.2} />
          </div>
          <Shape k="plus" c={T} size="3rem" top="14%" left="60%" r={0.3} fx={["spin"]} />
          <Shape k="zig" c={A} size="7rem" bottom="8%" left="42%" r={0.1} fx={["turn"]} />

          <p className={styles.eyebrow}>AI-native engineering leadership · Adobe</p>
          <h1>
            <span className={styles.name}>Yuval Ararat.</span> Leading engineering into the <em>agentic era.</em>
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

        <section id="perspective" className={`${styles.section} ${styles.headOn}`}>
          <span className={styles.field} data-split-field="" />
          <span className={styles.splitOverlay} data-split-overlay="" aria-hidden="true" />
          <Shape k="plus" c={S} size="3.5rem" top="9%" right="6%" r={0.2} fx={["spin"]} />
          <Shape k="ring" c={W} size="5rem" bottom="1.5rem" right="10%" fx={["turn"]} r={-0.1} />
          <div className={styles.head}>
            <p className={styles.eyebrow}>01 · Perspective</p>
          </div>
          <div className={styles.about} data-reveal="">
            <div className={styles.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/yuval-ararat-600.webp"
                srcSet="/img/yuval-ararat-360.webp 360w, /img/yuval-ararat-600.webp 600w"
                sizes="(max-width: 860px) 14rem, 18rem"
                alt="Yuval Ararat"
                width={600}
                height={469}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div data-split-text="">
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

        <section id="approach" className={styles.section}>
          <span className={styles.field} data-field="" />
          <Shape k="half" c={A} size="clamp(7rem, 13vw, 11rem)" top="12%" right="8%" r={0.1} fx={["turn"]} />
          <Shape k="dots" c={V} size="4.5rem" top="34%" right="24%" fx={["spin"]} />
          <div className={styles.head} data-reveal="">
            <p className={styles.eyebrow}>02 · Approach</p>
            <h2>
              Four principles for an <em className={styles.nobreak}>AI-first</em> engineering organisation.
            </h2>
          </div>
          <div className={`${styles.approach} ${styles.stagger}`} data-reveal="">
            {APPROACH.map((a) => (
              <article key={a.n}>
                <span className={styles.num}>{a.n}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="career" className={styles.section}>
          <span className={styles.field} data-field="" />
          <Shape k="tri" c={C} size="4.5rem" top="12%" right="30%" r={0.18} fx={["spin"]} />
          <Shape k="arch" c={W} size="5rem" bottom="5%" right="4%" fx={["turn"]} />
          <div className={styles.head} data-reveal="">
            <p className={styles.eyebrow}>03 · Career</p>
            <h2>
              Thirteen years at Adobe, from architect to <em>engineering executive.</em>
            </h2>
          </div>
          <ol className={`${styles.timeline} ${styles.stagger}`} data-reveal="">
            {CAREER.map((c) => (
              <li key={c.when}>
                <span className={styles.when}>{c.when}</span>
                <h3>{c.role}</h3>
                <p className={styles.org}>{c.org}</p>
                <p>{c.note}</p>
              </li>
            ))}
          </ol>
          <p className={styles.earlier} data-reveal="">
            <span>Earlier</span> {EARLIER}
          </p>
          <p className={styles.bigstat} data-reveal="">
            <strong>13</strong>
            <span>years at Adobe</span>
          </p>
        </section>

        <section id="impact" className={styles.section}>
          <span className={styles.field} data-field="" />
          <Shape k="zig" c={V} size="7rem" top="4.5rem" right="22%" fx={["turn"]} />
          <Shape k="square" c={W} size="4rem" top="5rem" right="8%" r={0.12} fx={["spin"]} />
          <div className={styles.head} data-reveal="">
            <p className={styles.eyebrow}>04 · Selected impact</p>
            <h2>
              Outcomes, <em>not activity.</em>
            </h2>
          </div>
          <div className={`${styles.cards} ${styles.stagger}`} data-reveal="">
            {IMPACT.map((i) => (
              <article key={i.label} className={i.wide ? `${styles.card} ${styles.wide}` : styles.card}>
                <p className={styles.label}>{i.label}</p>
                <p className={styles.metric}>{i.metric}</p>
                <p>{i.text}</p>
              </article>
            ))}
          </div>
          <div className={`${styles.stats} ${styles.stagger}`} aria-label="Track record" data-reveal="">
            {STATS.map(([n, label]) => (
              <div key={label} className={styles.stat}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {showEndorsements && (
          <section id="endorsements" className={styles.section}>
            <span className={styles.field} data-field="" />
            <Shape k="diamond" c={M} size="4rem" top="14%" right="9%" r={0.15} fx={["spin"]} />
            <Shape k="half" c={W} size="6rem" top="10%" right="24%" r={-0.08} fx={["turn"]} />
            <div className={styles.head} data-reveal="">
              <p className={styles.eyebrow}>05 · Endorsements</p>
              <h2>
                In their <em>words.</em>
              </h2>
            </div>
            <div className={`${styles.quotes} ${styles.stagger}`} data-reveal="">
              {endorsements.map((e) => (
                <figure key={e.name} className={e.featured ? `${styles.quote} ${styles.quoteFeature}` : styles.quote}>
                  <blockquote>{e.excerpt}</blockquote>
                  <figcaption>
                    <strong>{e.name}</strong>
                    <span>{e.title}</span>
                    <span>
                      {e.relationship} · {e.date.slice(0, 4)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <a className={styles.more} href={`${LINKEDIN}/details/recommendations/`} data-reveal="">
              All {RECOMMENDATIONS.length} recommendations on LinkedIn →
            </a>
          </section>
        )}

        <section id="presentations" className={styles.section}>
          <span className={styles.field} data-field="" />
          <Shape k="ring" c={T} size="5rem" top="10%" left="52%" fx={["turn"]} r={0.1} />
          <Shape k="plus" c={W} size="2.75rem" bottom="5%" left="50%" r={0.25} fx={["spin"]} />
          <div className={styles.head} data-reveal="">
            <p className={styles.eyebrow}>{num(6)} · Presentations</p>
            <h2>
              On <em>stage.</em>
            </h2>
          </div>
          <ul className={`${styles.media} ${styles.stagger}`} data-reveal="">
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
          <a className={styles.aside} href={SLIDESHARE} data-reveal="">
            <span>Every deck, in one place.</span>
            All presentations on SlideShare →
          </a>
        </section>

        <section id="writing" className={styles.section}>
          <span className={styles.field} data-field="" />
          <Shape k="ring" c={W} size="4.5rem" top="9%" right="6%" r={0.1} fx={["turn"]} />
          <Shape k="tri" c={S} size="4rem" bottom="3%" right="20%" r={-0.14} fx={["spin"]} />
          <div className={styles.head} data-reveal="">
            <p className={styles.eyebrow}>{num(7)} · Writing</p>
            <h2>
              Notes on where engineering is <em>going.</em>
            </h2>
          </div>
          <div className={`${styles.articles} ${styles.stagger}`} data-reveal="">
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

        <section id="contact" className={styles.cta}>
          <Shape k="circle" c={M} c2={V} size="clamp(10rem, 20vw, 18rem)" bottom="-6rem" left="-4rem" fx={["tint"]} f={25} />
          <Shape k="quarter" c={V} size="clamp(7rem, 13vw, 11rem)" top="0" right="0" fx={["turn"]} f={-20} />
          <Shape k="square" c={C} size="clamp(5rem, 9vw, 8rem)" bottom="-2rem" right="9%" r={0.1} fx={["spin"]} f={-25} />
          <Shape k="tri" c={S} size="5rem" top="18%" left="10%" r={-0.14} fx={["spin"]} f={35} />
          <Shape k="circle" c={A} size="3.5rem" bottom="20%" right="24%" fx={["hue"]} f={-40} />
          <Shape k="ring" c={W} size="4.5rem" top="14%" right="20%" r={0.2} f={30} />
          <div data-reveal="">
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
