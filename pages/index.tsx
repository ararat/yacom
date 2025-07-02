import React from "react";
import { Fragment } from "react";
import BlogPost from "../components/BlogPost";
import Head from "next/head";
import Image from "../components/image";
import Navigation from "../components/Navigation";
import Link from "next/link";
import LazyVideo from "../components/LazyVideo";

import matter from "gray-matter";
import fs from "fs";
import path from "path";
import MarkdownContentComponent, {
  SectionConfig,
  ContentData,
} from "../components/MarkdownContentComponent";
import { loadAllContentSections } from "../lib/contentLoader";
import BlogSection from "../components/BlogSection";

// Sections configuration
const SECTIONS_CONFIG: SectionConfig[] = [
  {
    id: "welcome",
    navTitle: "Welcome",
    backgroundColor: "bg-amber-600",
    contentFile: "hero",
    enabled: true,
    hideFromNav: false
  },
  {
    id: "about",
    navTitle: "About",
    backgroundColor: "bg-lime-100",
    contentFile: "about",
    hasImage: true,
    imageConfig: {
      src: "/img/yuval-ararat.png",
      alt: "Yuval Ararat",
      width: "200",
      height: "160",
    },
    enabled: true,
    hideFromNav: false
  },
  {
    id: "expertise",
    navTitle: "Expertise",
    backgroundColor: "bg-slate-100",
    contentFile: "expertise",
    enabled: true,
    hideFromNav: false
  },
];

const Home = (props: {
  SiteTitle: string;
  SiteDescription: string;
  posts: [
    {
      slug: string;
      frontMatter: { [key: string]: string };
    }
  ];
  content: { [key: string]: ContentData };
}) => {
  return (
    <Fragment>
      <div className="min-h-full">
        <Head>
          <title>{props.SiteTitle}</title>
          <meta name="description" content={props.SiteDescription} />
          <meta itemProp="name" content="Yuval Ararat" />
          <meta itemProp="url" content="//www.yuvalararat.com" />
        </Head>
      </div>

      <div className="snap-y snap-mandatory min-h-full h-screen w-auto overflow-y-scroll overflow-x-hidden">
        <Navigation
          SiteTitle={props.SiteTitle}
          SiteDescription={props.SiteDescription}
          sections={[
            ...(SECTIONS_CONFIG || [])
              .filter(s => s?.enabled && !s?.hideFromNav),
            { id: "blog", navTitle: "Thoughts", enabled: true }
          ].filter(Boolean)}
        />
        {/* All Markdown Sections */}
        {SECTIONS_CONFIG
          .filter(section => section.enabled)
          .map(section => (
            <MarkdownContentComponent
              key={section.id}
              section={section}
              content={props.content[section.contentFile]}
            />
          ))}

        {/* Blog Section - Endless Scroll */}
        <div
          className="snap-start bg-cyan-500 w-screen min-h-screen"
          id="blog"
        >
          <BlogSection posts={props.posts} />
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`);

  // Get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  const posts = files
    .filter((filename) => filename.includes(".md"))
    .map((filename) => {
      // Create slug
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data: frontMatter } = matter(markdownWithMeta);

      return {
        slug,
        frontMatter,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    );

  // Load content for all sections that have contentFile
  const content = loadAllContentSections();

  return {
    props: {
      SiteTitle: siteConfig.default.title,
      SiteDescription: siteConfig.default.description,
      posts,
      content,
    },
  };
}

export default Home;
