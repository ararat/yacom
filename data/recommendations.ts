/**
 * Recommendations received on LinkedIn (linkedin.com/in/yuvalararat),
 * copied 12 November 2026. `text` is the full recommendation exactly as
 * written; `excerpt` is the verbatim passage shown on the site.
 *
 * To change what the site shows, flip `show` (and `featured` for the large
 * quote). Order on the page follows this list.
 */
export type Recommendation = {
  name: string;
  /** Recommender's headline on LinkedIn when copied */
  title: string;
  /** Relationship as LinkedIn states it */
  relationship: string;
  date: string;
  text: string;
  excerpt: string;
  show: boolean;
  featured?: boolean;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Shady Ibrahim",
    title: "Senior Professional Services Consultant, Adobe",
    relationship: "Reported to Yuval directly",
    date: "2025-09-29",
    text: "It's a true pleasure to have worked with Yuval. From the moment I joined Adobe, Yuval impressed me with his genuine and proactive commitment to building relationships. Even during the earlier days when he wasn't my manager, he reached out, creating a connection that made me feel immediately seen and valued, a relationship he consistently nurtured.\n\nBeyond his warmth, Yuval is a true walking encyclopedia, blending profound technical mastery with exceptional managerial humanity. He doesn't just know how to lead projects and solve technical challenges; he knows how to inspire and develop people, ensuring they feel heard and motivated. This rare and wonderful blend of mind and heart makes him an absolutely invaluable leader and colleague.",
    excerpt:
      "Yuval is a true walking encyclopedia, blending profound technical mastery with exceptional managerial humanity. He doesn't just know how to lead projects and solve technical challenges; he knows how to inspire and develop people, ensuring they feel heard and motivated.",
    show: true,
    featured: true,
  },
  {
    name: "Nitin Malhotra",
    title: "Senior AEM Consultant",
    relationship: "Reported to Yuval directly",
    date: "2025-06-24",
    text: "I had the pleasure of working under Yuval for an year at Adobe. They are an exceptional leader who consistently demonstrates strategic thinking, effective communication, and a genuine commitment to team success. Yuval inspires those around them to perform at their best and fosters a positive, collaborative work environment. I highly recommend Yuval for any leadership or managerial roles.",
    excerpt:
      "Yuval inspires those around them to perform at their best and fosters a positive, collaborative work environment. I highly recommend Yuval for any leadership or managerial roles.",
    show: true,
  },
  {
    name: "Craig Broadbent",
    title: "Client Advocate, Professional Services, AI Transformation",
    relationship: "Managed Yuval directly",
    date: "2014-03-13",
    text: "I hired Yuval as a Vignette specialist when I was managing the services group at Vignette. Yuval was a man full of energy and came to us with excellent product knowledge. He was thrown in to a very difficult project but seemed to manage the situation well. He has now progressed to working with the Adobe CMS and I continue to hear great things about his work in the Web/CMS/Digital industry.",
    excerpt:
      "Yuval was a man full of energy and came to us with excellent product knowledge. … I continue to hear great things about his work in the Web/CMS/Digital industry.",
    show: false,
  },
  {
    name: "Melissa Moran",
    title: "Digital Delivery Lead, ahm Health Insurance",
    relationship: "Worked with Yuval on the same team",
    date: "2013-10-23",
    text: "Yuval is an exceptional Adobe consultant who was always able to find a solution to our problems. He was dedicated to the project and put in extra effort when needed. Thanks to his contribution to the team, the project was delivered on time and was a huge success.",
    excerpt:
      "Yuval is an exceptional Adobe consultant who was always able to find a solution to our problems. … Thanks to his contribution to the team, the project was delivered on time and was a huge success.",
    show: true,
  },
  {
    name: "Jeffrey Loudermilk",
    title: "IT leader, securities brokerage",
    relationship: "Yuval's client",
    date: "2008-04-16",
    text: "Yuval was a great asset to our development effort. He brought a wealth of knowledge from both the Mobius products and the VB development environment. I never doubted his commitment to our success (even when he worked for us from half way around the world.) It was a pleasure to work with someone whose dedication to the task rivals your own. I would engage him again, if the opportunity arose.",
    excerpt:
      "I never doubted his commitment to our success (even when he worked for us from half way around the world.) … I would engage him again, if the opportunity arose.",
    show: true,
  },
  {
    name: "Adi Ben-Tsedef",
    title: "Director of Product Management, CommBox",
    relationship: "Managed Yuval directly",
    date: "2007-06-19",
    text: "I've known Yuval for a long time, and had the chance to manage him for a short period.\nI learned to know that Yuval is a true autodidact, who has the patience and capability to learn new subjects and travel to the unknown and come back with the knowledge. Yuval is sharing his knowledge happily with others and creates a great atmosphere in the team.\n\nBeing enthusiastic regarding his job and his tasks, Yuval manages to enjoy his work, do it on the best side and invest every effort to make it succeed. It's been a pleasure to work together.",
    excerpt:
      "Yuval is a true autodidact, who has the patience and capability to learn new subjects and travel to the unknown and come back with the knowledge.",
    show: false,
  },
  {
    name: "Gali Ross-Hasson",
    title: "Global Strategic Partnerships and Business Development Leader",
    relationship: "Worked with Yuval on the same team",
    date: "2007-03-07",
    text: "Yuval is a competent, talented, intelligent worker who's always showed his willingness to put in both the extra effort and the team-work needed to get the job done. He thinks outside the box and will assist a process he is committed to. He will be an asset employee to any company and a fine co-worker.",
    excerpt:
      "Yuval is a competent, talented, intelligent worker who's always showed his willingness to put in both the extra effort and the team-work needed to get the job done.",
    show: false,
  },
  {
    name: "Nimrod Riftin",
    title: "CEO, Belago Technologies",
    relationship: "Senior to Yuval, did not manage him directly",
    date: "2006-10-21",
    text: "Yuval is a great experienced technologist, with a huge knowledge and ability to evaluate and implement old and new technologies using nest practices in the right context. He is a hard-worker, investing successfully at the company and customers needs, with a strong ability to lead projects and complex technological processes.",
    excerpt:
      "He is a hard-worker, investing successfully at the company and customers needs, with a strong ability to lead projects and complex technological processes.",
    show: false,
  },
];
