import Head from "next/head";
import styles from "../styles/executive.module.css";

const LINKEDIN = "https://www.linkedin.com/in/yuvalararat";
const SLIDESHARE = "https://www.slideshare.net/ararat";

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

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Yuval Ararat | AI-Native Engineering Leader</title>
        <meta
          name="description"
          content="AI-native engineering leader at Adobe. Turning agentic AI from experiment into shipped product, operating model and commercial advantage."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <section className={styles.hero}>
          <p className={styles.eyebrow}>AI-native engineering leadership · Adobe</p>
          <h1>
            Leading engineering into the <em>agentic era.</em>
          </h1>
          <p className={styles.lead}>
            Senior Engineering Manager and Acting Director of Engineering for
            Marketo Engage and Adobe Journey Optimizer B2B. I turn AI from
            experiment into shipped product, a new operating model and
            measurable commercial advantage.
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

        <section id="perspective" className={styles.section}>
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
                I lead the only customer-facing engineering team in a
                350-person product organisation: a forward-deployed unit of
                engineers and solution architects that converts top-tier
                customer problems into shipped product. We moved from
                traditional delivery to AI-assisted and AI-driven engineering,
                with people firmly in the loop.
              </p>
              <p>
                Twenty years in software, eight as a Principal Enterprise
                Architect, and an early start as a startup CTO. I bring
                architectural depth to every AI decision and commercial
                discipline to every roadmap.
              </p>
              <ul className={styles.tags}>
                {TAGS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="approach" className={styles.sectionAlt}>
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

        <section id="career" className={styles.section}>
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

        <section id="impact" className={styles.sectionAlt}>
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

        <section className={styles.band} aria-label="Track record">
          <div className={styles.stats}>
            {STATS.map(([n, label]) => (
              <div key={label} className={styles.stat}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="endorsements" className={styles.section}>
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

        <section id="presentations" className={styles.sectionAlt}>
          <p className={styles.eyebrow}>06 · Presentations</p>
          <h2>
            On <em>stage.</em>
          </h2>
          <ul className={styles.media}>
            {MEDIA.map((m) => (
              <li key={m.url}>
                <a href={m.url}>
                  <span className={styles.play} aria-hidden="true">▶</span>
                  <span>
                    <strong>{m.title}</strong>
                    <small>{m.meta}</small>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <a href={SLIDESHARE}>All presentations on SlideShare →</a>
          </p>
        </section>

        <section id="writing" className={styles.section}>
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

        <section id="contact" className={styles.cta}>
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
        <span>San Jose, California · Auckland, New Zealand</span>
      </footer>
    </div>
  );
}
