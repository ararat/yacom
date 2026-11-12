import Head from "next/head";
import styles from "../styles/executive.module.css";

const LINKEDIN = "https://www.linkedin.com/in/yuvalararat";
const SLIDESHARE = "https://www.slideshare.net/ararat";

const STATS = [
  ["20+", "years in software engineering"],
  ["12+", "years in technical and engineering leadership"],
  ["~20", "engineers across multiple squads"],
  ["3,000+", "enterprise customers on our flagship AI release"],
  ["US$43M", "in customer renewal commitments carried"],
];

const TAGS = [
  "Engineering Leadership",
  "Enterprise Architecture",
  "TOGAF 9.2",
  "Prosci Change Management",
  "PRINCE2",
  "Applied AI and MCP",
  "AWS and Cloud",
  "Customer Data Platforms",
];

const CAREER = [
  {
    when: "2021 to Present",
    role: "Senior Engineering Manager, Acting Director of Engineering",
    org: "Adobe · Marketo Engage and Adobe Journey Optimizer B2B",
    note: "Leads a multi-squad, customer-facing engineering organisation and carries accountability for US$43M in customer renewal commitments.",
  },
  {
    when: "2013 to 2021",
    role: "Principal Enterprise Architect, APAC Competency Lead",
    org: "Adobe Consulting Services · Auckland and Melbourne",
    note: "Ran the APAC architecture practice and rebuilt Adobe's New Zealand consulting presence from zero long-term retainers to more than ten multi-year customer commitments.",
  },
  {
    when: "2008 to 2013",
    role: "Senior Consultant to Practice Lead",
    org: "OpenText (Vignette) · Sydney and Melbourne",
    note: "Combined solution architecture, project management and pre-sales on enterprise content programmes.",
  },
  {
    when: "2006 to 2008",
    role: "Senior Engineering Manager",
    org: "Matrix · Israel",
    note: "Embedded as Enterprise Architect under the CIO of Keshet.",
  },
  {
    when: "2004 to 2006",
    role: "Engineering Manager",
    org: "eWave · Israel",
    note: "Engineering management, alongside support for RFPs, demonstrations, supplier management and pricing discussions.",
  },
  {
    when: "2003 to 2004",
    role: "Chief Technology Officer",
    org: "Netschool · Israel",
    note: "Technology leadership of an education-sector startup.",
  },
  {
    when: "2001 to 2003",
    role: "Senior Software Engineer",
    org: "Documenta, for Wachovia · New York",
    note: "Software engineering for Wachovia.",
  },
];

const IMPACT = [
  {
    label: "Applied AI",
    metric: "150 tools",
    text: "Wrote the first iteration of the Marketo MCP server, then productionised it with two engineers. 200 closed-beta customers in four weeks; now generally available to 3,000+ enterprise customers.",
  },
  {
    label: "Talent and retention",
    metric: "100%",
    text: "Team retention through two office closures and reorganisation. Five hires, and onboarding cut from six weeks to three.",
  },
  {
    label: "Predictable delivery",
    metric: "3 releases",
    text: "Major releases shipped on schedule through a significant reorganisation, backed by CI quality gates and DORA-aligned reporting.",
  },
  {
    label: "Technical debt",
    metric: "83%",
    text: "Reduction in the high-priority backlog, including services that had stood still for more than three years.",
  },
  {
    label: "AI-Factory pilot",
    metric: "1–2 → 3–4",
    text: "Features per release cycle on a human-in-the-loop pilot of AI-assisted delivery, on one project.",
  },
  {
    label: "Cloud reliability",
    metric: "99.95% SLA",
    text: "One of the first AEM deployments on AWS (2014): auto-scaling, auto-healing, fourfold lower downtime and eightfold shorter content time-to-market.",
  },
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
  ["About", "#about"],
  ["Track record", "#track-record"],
  ["Career", "#career"],
  ["Impact", "#impact"],
  ["Presentations", "#presentations"],
  ["Writing", "#writing"],
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Yuval Ararat | Engineering Leader</title>
        <meta
          name="description"
          content="Engineering leader turning technology into measurable business advantage. Senior Engineering Manager at Adobe, former Principal Enterprise Architect."
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
          <p className={styles.eyebrow}>
            Engineering Leadership · Enterprise Architecture · Applied AI
          </p>
          <h1>
            Engineering leadership that turns technology into business{" "}
            <em>advantage.</em>
          </h1>
          <p className={styles.lead}>
            Senior Engineering Manager at Adobe, currently Acting Director of
            Engineering for Marketo Engage and Adobe Journey Optimizer B2B. I
            lead multi-squad teams that ship enterprise AI, protect customer
            renewals and keep delivery predictable.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={LINKEDIN}>
              Connect on LinkedIn ↗
            </a>
            <a className={styles.secondary} href="#presentations">
              View presentations →
            </a>
          </div>
        </section>

        <section id="track-record" className={styles.band}>
          <p className={styles.eyebrow}>01 · Track record</p>
          <div className={styles.stats}>
            {STATS.map(([n, label]) => (
              <div key={label} className={styles.stat}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className={styles.section}>
          <p className={styles.eyebrow}>02 · About</p>
          <div className={styles.about}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/yuval-ararat.png"
              alt="Yuval Ararat"
              width={600}
              height={469}
              loading="lazy"
            />
            <div>
              <h2>
                A customer-facing engineering team, run as a <em>value engine.</em>
              </h2>
              <p>
                I lead a forward-deployed team of engineers and solution
                architects, the only customer-facing engineering team in a
                350-person product organisation. We turn top-tier customer
                problems into shipped product and a roadmap customers can buy
                into, so engineering is seen as a source of value, not a cost
                centre.
              </p>
              <p>
                Before that, I spent eight years as a Principal Enterprise
                Architect, five of them leading Adobe&apos;s APAC architecture
                practice and advising CIO and CSO-level stakeholders across
                banking, telecommunications, energy and media.
              </p>
              <ul className={styles.tags}>
                {TAGS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="career" className={styles.sectionAlt}>
          <p className={styles.eyebrow}>03 · Career</p>
          <h2>Two decades of increasing scope.</h2>
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
        </section>

        <section id="impact" className={styles.section}>
          <p className={styles.eyebrow}>04 · Selected impact</p>
          <h2>Outcomes, not activity.</h2>
          <div className={styles.cards}>
            {IMPACT.map((i) => (
              <article key={i.label} className={styles.card}>
                <p className={styles.label}>{i.label}</p>
                <p className={styles.metric}>{i.metric}</p>
                <p>{i.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="presentations" className={styles.sectionAlt}>
          <p className={styles.eyebrow}>05 · Presentations</p>
          <h2>Sharing what works.</h2>
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

        <section id="writing" className={styles.section}>
          <p className={styles.eyebrow}>06 · Thoughts</p>
          <h2>Perspectives.</h2>
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
          <h2>
            Let&apos;s discuss what disciplined engineering can do for your{" "}
            <em>business.</em>
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
        <span>San Jose, California and Auckland, New Zealand</span>
      </footer>
    </div>
  );
}
