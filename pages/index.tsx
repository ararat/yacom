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
    backgroundVideo: "/vid/site-intro.mp4",
    videoPoster: "/img/yuval-ararat.png",
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

      <div className="snap-y snap-mandatory min-h-full h-screen w-auto overflow-y-scroll overflow-x-hidden bg-white dark:bg-dark-bg transition-colors duration-300">
        <Navigation
          variant="standard"
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
            <div key={section.id}>
              <MarkdownContentComponent
                section={section}
                content={props.content[section.contentFile]}
              />
            </div>
          ))}

        {/* Blog Section - Endless Scroll */}
        <div
          className="snap-start bg-cyan-500 dark:bg-cyan-600 w-screen min-h-screen transition-colors duration-300"
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
  try {
    // Load site configuration with error handling
    let siteConfig;
    try {
      siteConfig = await import(`../data/config.json`);
    } catch (configError) {
      console.error('Failed to load site configuration:', configError);
      // Provide fallback configuration
      siteConfig = {
        default: {
          title: 'Portfolio',
          description: 'Personal portfolio and blog'
        }
      };
    }

    // Get files from the posts dir with error handling
    let files: string[] = [];
    try {
      if (fs.existsSync(path.join("posts"))) {
        files = fs.readdirSync(path.join("posts"));
      } else {
        console.warn('Posts directory does not exist, creating empty posts array');
      }
    } catch (postsError) {
      console.error('Failed to read posts directory:', postsError);
      // Continue with empty posts array
    }

    const posts = files
      .filter((filename) => filename.includes(".md"))
      .map((filename) => {
        try {
          // Create slug
          const slug = filename.replace(".md", "");

          const markdownWithMeta = fs.readFileSync(
            path.join("posts", filename),
            "utf-8"
          );

          const { data: frontMatter } = matter(markdownWithMeta);

          // Validate required frontmatter fields
          if (!frontMatter.title) {
            console.warn(`Post ${filename} missing title, using filename`);
            frontMatter.title = slug.replace(/-/g, ' ');
          }

          if (!frontMatter.date) {
            console.warn(`Post ${filename} missing date, using current date`);
            frontMatter.date = new Date().toISOString();
          }

          return {
            slug,
            frontMatter,
          };
        } catch (postError) {
          console.error(`Failed to process post ${filename}:`, postError);
          // Return null for failed posts, filter out later
          return null;
        }
      })
      .filter((post) => post !== null) // Remove failed posts
      .sort((a, b) => {
        try {
          const dateA = new Date(a.frontMatter.date).getTime();
          const dateB = new Date(b.frontMatter.date).getTime();
          
          // Handle invalid dates
          if (isNaN(dateA) || isNaN(dateB)) {
            console.warn('Invalid date found in posts, using alphabetical sort');
            return a.slug.localeCompare(b.slug);
          }
          
          return dateB - dateA;
        } catch (sortError) {
          console.error('Error sorting posts:', sortError);
          return 0;
        }
      });

    // Load content for all sections that have contentFile with error handling
    let content = {};
    try {
      content = loadAllContentSections();
    } catch (contentError) {
      console.error('Failed to load content sections:', contentError);
      // Provide fallback empty content
      content = {};
    }

    return {
      props: {
        SiteTitle: siteConfig.default.title || 'Portfolio',
        SiteDescription: siteConfig.default.description || 'Personal portfolio and blog',
        posts,
        content,
      },
    };
  } catch (error) {
    console.error('Critical error in getStaticProps:', error);
    
    // Return minimal props to prevent build failure
    return {
      props: {
        SiteTitle: 'Portfolio',
        SiteDescription: 'Personal portfolio and blog',
        posts: [],
        content: {},
      },
    };
  }
}

export default Home;
