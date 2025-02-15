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
              className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
            ></LazyVideo>

            <div className="relative z-30 pt-20 p-8 bg-amber-600 bg-opacity-50 items-center justify-center justify-content-center w-3/4 max-w-none prose dark:bg-opacity-70 dark:bg-slate-700 lg:prose-xl dark:prose-invert rounded-xl text-ellipsis max-h-[90vh] overflow-y-auto">
              <h2>Welcome</h2>
              <p>
                Hi visitor, thank you for visiting my humble new site
                <br /> Here i share my journey and thoughts about leading
                businesses and teams through the complexities of the enterprise
                digital landscape. I may also share thoughts about life
                ocassionally and i appologise in advance if you are not looking
                for that from me.
                <br />
                I am rebuilding my site with Next.JS, Typescript, Tailwind and
                Cloudflare pages taking Markdown and making it pretty&apos;ish
                <br />
                This is a work in progress and i may break things along the
                way... I&apos;m learning, challenging myself as a way of life.
                <br /> Hope you enjoy and recommend my blog to your friends or
                let me know what you think.
              </p>
              <p>
                It is a strong beleif i carry that if you want to understand
                your business you must understand the whole spectrum of
                activities, so i decided to movie up and down the role elevator
                to get a good grasp of what is the view from multiple
                perspectives,
                <br />
                As a manager in technology I want to know how to translate tech
                to the business and business to the tech so the agility and
                comprehension is retained.
                <br />
              </p>
              <p className="hidden md:block mx-auto">
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
          <div className="relative z-30 p-8  bg-opacity-0 justify-content-center w-3/4 max-w-none prose lg:prose-xl rounded-xl text-ellipsis">
            <Image
              alt="Yuval Ararat"
              src="/img/yuval-ararat.png"
              quality="low"
              width="200"
              height="160"
            ></Image>
            <p>
              Hello, I&apos;m Yuval, I lead a team of amazing developers on my
              daily, I love helping my customers navigtagte their journey of
              digitalisation and been at it for 20 years.
              <br />
              I love technology, when it impacts our life positively, and I
              enjoy the human aspects of technology adoption.
              <br />
            </p>
            <p>
              What I would describe myself as a servant leader combined with a
              perpetual learner in all aspects of life (This site is one of my
              learning experiences), aspiring to grow a better community
              wherever I go.
            </p>
            <p className="hidden md:block mx-auto">
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
          className="snap-start bg-cyan-500 w-screen h-screen flex items-center justify-center text-ellipsis"
          id="blog"
        >
          <div className="row justify-content-center w-5/6 ">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Recent Thoughts
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
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
