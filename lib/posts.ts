import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** One card in the home page's Writing section. */
export type WritingItem = {
  tag: string;
  date: string;
  title: string;
  text: string;
  url: string;
};

type Options = {
  /** Folder of Markdown posts. Defaults to ./posts */
  dir?: string;
  /** Maximum number of cards. Defaults to all. */
  limit?: number;
};

const HIDDEN_STATUSES = new Set(["private", "draft"]);
const SUMMARY_LENGTH = 160;

/**
 * Builds the Writing list from the front matter of every post in posts/,
 * newest first. Runs at build time (from getStaticProps), so publishing an
 * article only means adding a Markdown file.
 *
 * Front matter used:
 *   title        card heading (falls back to the file name)
 *   date         sort order and the "Month Year" label
 *   description  card text (falls back to excerpt, then the first paragraph)
 *   category     card label (falls back to tags / tag, then "Writing")
 *   status       "private" or "draft" keeps a post off the list
 *   hidden       true keeps a post off the list
 */
export function getWritingList({ dir = path.join(process.cwd(), "posts"), limit }: Options = {}): WritingItem[] {
  if (!fs.existsSync(dir)) return [];

  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      const slug = file.replace(/\.md$/, "");
      const time = toTime(data.date);
      return { data, content, slug, time };
    })
    .filter(({ data }) => !data.hidden && !HIDDEN_STATUSES.has(String(data.status ?? "").toLowerCase()))
    .sort((a, b) => b.time - a.time);

  return posts.slice(0, limit).map(({ data, content, slug, time }) => ({
    tag: firstOf(data.category) ?? firstOf(data.tags) ?? firstOf(data.tag) ?? "Writing",
    date: Number.isFinite(time) && time > 0 ? formatMonth(time) : "",
    title: text(data.title) || slug.replace(/-/g, " "),
    text: text(data.description) || text(data.excerpt) || firstParagraph(content),
    url: `/blog/${slug}`,
  }));
}

/** Milliseconds since epoch; undated posts sort last. */
function toTime(value: unknown): number {
  const time = value instanceof Date ? value.getTime() : Date.parse(String(value ?? ""));
  return Number.isFinite(time) ? time : 0;
}

function formatMonth(time: number): string {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(time);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function firstOf(value: unknown): string | undefined {
  const list = Array.isArray(value) ? value : [value];
  const found = list.map(text).find(Boolean);
  return found || undefined;
}

/** First prose paragraph of the post, with Markdown removed, shortened at a word. */
function firstParagraph(markdown: string): string {
  const paragraph =
    markdown
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|!\[|```|\||>|-{3,}|<)/.test(block)) ?? "";

  const plain = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= SUMMARY_LENGTH) return plain;
  return plain.slice(0, plain.lastIndexOf(" ", SUMMARY_LENGTH)).replace(/[,;:.]$/, "") + "…";
}
