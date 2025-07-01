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

const Home = (props: {
  SiteTitle: string;
  SiteDescription: string;
  posts: [
    {
      slug: string;
      frontMatter: { [key: string]: string };
    }
  ];
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
        />
        <div
          className="snap-start bg-amber-600 w-screen h-screen items-center justify-center "
          id="welcome"
        >
          <div className="relative flex items-center justify-center justify-content-center w-screen h-screen overflow-hidden">
            <LazyVideo
              src="/vid/site-intro.mp4"
              type="video/mp4"
              poster="/img/yuval-ararat.png"
              preload="metadata"
              className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
            ></LazyVideo>

            <div className="relative z-30 pt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 bg-amber-600 bg-opacity-50 items-center justify-center w-auto prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:bg-opacity-70 dark:bg-slate-700 dark:prose-invert rounded-xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto max-w-none">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left">Welcome</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
                Hi visitor, thank you for visiting my humble new site.
                <br className="hidden sm:block" /> 
                <span className="block sm:inline">Here I share my journey and thoughts about leading businesses and teams through the complexities of the enterprise digital landscape.</span> 
                <span className="block mt-2 sm:mt-0 sm:inline">I may also share thoughts about life occasionally and I apologise in advance if you are not looking for that from me.</span>
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
                I am rebuilding my site with Next.JS, Typescript, Tailwind and Cloudflare pages taking Markdown and making it pretty&apos;ish.
                <br className="hidden sm:block" />
                <span className="block sm:inline">This is a work in progress and I may break things along the way...</span> 
                <span className="block sm:inline">I&apos;m learning, challenging myself as a way of life.</span>
                <br className="hidden sm:block" /> 
                <span className="block sm:inline">Hope you enjoy and recommend my blog to your friends or let me know what you think.</span>
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
                It is a strong belief I carry that if you want to understand your business you must understand the whole spectrum of activities, so I decided to move up and down the role elevator to get a good grasp of what is the view from multiple perspectives.
                <br className="hidden sm:block" />
                <span className="block sm:inline">As a manager in technology I want to know how to translate tech to the business and business to the tech so the agility and comprehension is retained.</span>
              </p>
              <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
                What currently is top of mind for me in my space is composing
                large scale solutions to large enterprises through the lenses of
                business context alignment with soft contracts and API driven
                deliveries. A Component CMS, Edge Computing such as the image
                components on this site, Hybrid and Headless elements, Server
                side rendition generators such as this, Rust and WebAssembly for
                amazing client side compute stability, design thinking and
                digital strategy, change management throught the lenses of{" "}
                <Link href="https://www.prosci.com/">prosci</Link>, CIO
                evolution throught the view points of Digital Enterprise
                Architecture and many more layers of how we connect the business
                goals (KBO/OKR) to tangible KPI for the business IT and Delivery
                partners leading to a scaled change across the growth of the
                technology industry.
              </p>
            </div>
          </div>
        </div>
        <div
          className="snap-start bg-lime-100 w-screen h-screen flex items-center justify-center"
          id="about"
        >
          <div className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 bg-opacity-0 justify-content-center w-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl rounded-xl max-w-none">
            <div className="flex justify-center sm:justify-start mb-6">
              <Image
                alt="Yuval Ararat"
                src="/img/yuval-ararat.png"
                quality="low"
                width="200"
                height="160"
                className="rounded-lg shadow-md"
              ></Image>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
              Hello, I&apos;m Yuval, I lead a team of amazing developers on my daily, I love helping my customers navigate their journey of digitalisation and been at it for 20 years.
              <br className="hidden sm:block" />
              <span className="block sm:inline">I love technology, when it impacts our life positively, and I enjoy the human aspects of technology adoption.</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-4 sm:mb-6">
              What I would describe myself as a servant leader combined with a perpetual learner in all aspects of life (This site is one of my learning experiences), aspiring to grow a better community wherever I go.
            </p>
            <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
              Things I do when I don&apos;t work I have found my way to many
              hobbies, some are more prominent and some were experiments that
              stuck, I... play the guitar and managed to release a few albums
              with a band in my 20s, write software, Run trails, Tramp (Hiking
              for Americans) remote places, photograph things, motorcycle riding
              and lately ventured to pottery.{" "}
            </p>
          </div>
        </div>
        <div
          className="snap-start bg-cyan-500 w-screen min-h-screen flex items-center justify-center py-16 sm:py-20"
          id="blog"
        >
          <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
              Recent Thoughts
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 auto-rows-fr">
              {props.posts.map(
                ({ slug, frontMatter: { title, description, thumbnail } }) => (
                  <BlogPost
                    key={slug}
                    title={title}
                    slug={slug}
                    description={description}
                    path={`/blog/${slug}`}
                    imageSrc={thumbnail}
                    className="w-full"
                  />
                )
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`);
  //Get files from the posts dir
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
  // Get files from the posts dir
  // const files: string[] = await globby("posts/**/*.md");
  // //console.log(files);//.filter((filename) => filename.lastIndexOf(".md") > 0).toString());
  // //const posts = files.filter(filename => filename.includes(".md")).map((filename) => {
  // // iterate over the md files found in the posts folder
  // const posts = files
  //   .filter((filename) => filename.lastIndexOf(".md") > 0)
  //   .map((filename) => {
  //     //console.log(filename);
  //     // Create slug
  //     const slug = filename.replace('.md', '');

  //     const markdownWithMeta = fs.readFileSync(
  //       //path.join('posts', filename),
  //       filename,
  //       'utf-8'
  //     )
  //     //console.log(markdownWithMeta);

  //     const {data: frontMatter } = matter(markdownWithMeta)
  //     //console.log(frontMatter);
  //     return {
  //       slug,
  //       frontMatter,
  //     }
  //   });
  return {
    props: {
      SiteTitle: siteConfig.default.title,
      SiteDescription: siteConfig.default.description,
      posts,
    },
  };
}

export default Home;
