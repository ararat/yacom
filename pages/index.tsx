import React from "react";
import { Fragment } from 'react';
import BlogPost from "../components/BlogPost";
import Head from 'next/head';
import Image from '../components/image';
//import Link from 'next/link';
//import styles from '../styles/Home.module.css'
import Navigation from '../components/Navigation';

import matter from 'gray-matter';
import fs from "fs";
import path from "path";
//import Script from 'next/script';


const Home = (props: {
  SiteTitle: string,
  SiteDescription: string,
  posts: [{
    slug: string,
    frontMatter: { [key: string]: string }
  }]
}) => {
  return (
    <Fragment>
      <div className="min-h-full">
        <Head>
          <title>{props.SiteTitle}</title>
          <meta name='description' content={props.SiteDescription} />

        </Head>
      </div>
      <Navigation SiteTitle={props.SiteTitle} SiteDescription={props.SiteDescription} />
      <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll">
        <div className="snap-start bg-amber-600 w-screen h-screen items-center justify-center" id="welcome">

          <div className="relative flex items-center justify-center justify-content-center w-screen h-screen overflow-hidden">
            <video autoPlay
              loop
              muted
              className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
            >
              <source
                src="/vid/site-intro.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="relative z-30 p-8 bg-amber-600 bg-opacity-50 justify-content-center w-3/4 max-w-none prose dark:bg-opacity-70 dark:bg-slate-700 lg:prose-xl dark:prose-invert rounded-xl">
              <h2>Welcome</h2>
              <p >
                Welcome to my humble site!<br /> Here i share my life journey as a digital professional. i also share thoughts about life ocassionally.<br />
                The site is a work in progress while i learn Next.JS, Typescript, Taiilwind and Cloudflare pages.
              </p>
              <p >
                You wonder what makes me take on a complex site ubilding in this form. well, as a digital architect i challenge myself to grasp the technology spectrum in a hands on fashion to be able to converse with my team in close quarters. <br />
                I beleive that as a leader in a technology you should be moving up and down the elevator of the comoany and know how to translate tech to the business and be able to discuss technology that is dear to your team.<br />
              </p>
              <p>
                What currently is top of mind is Component CMS, Hybrid and Headless, static site generators such as this, Rust and WebAssembly, our ever changing java, design thinking and digital strategy, ADKAR and prosci as drivers of change
                and many more layers of how we connect the KBO/OKR to tangible KPI for the business, KPI's for the delivery teams and KPI for the ops teams tying it all together with innovative thinking and conversations.
              </p>

            </div>
          </div>
        </div>
        <div className="snap-start bg-lime-100 w-screen h-screen flex items-center justify-center" id="about">
          <div className="relative z-30 p-8  bg-opacity-0 justify-content-center w-3/4 max-w-none prose lg:prose-xl rounded-xl">

            <Image src="/img/yuval-ararat.png" quality="low" width="200" height="160"></Image>
            <p>
              Hello, I'm Yuval, I created this site to share a bit of myself over the web but also to get with the new way of managing content on the web. well the developer heavy handed way
              as i beleive that every software leader in any level should be able to write code
            </p>
            <p>
              Who am I, well i will try to highlight some aspects and things i like doing. I would describe myself as a servant leader combined with a perpetual learner
              You are in one of my learning experiences ;)
            </p>
            <p>I have many things i find myself doing, I play guitar, Lead people, Write software, Run trails, Tramp (Hiking for americans) the world, photograph birds, motorcycle riding and now picked up pottary</p>
          </div>
        </div>
        <div className="snap-start bg-cyan-500 w-screen h-screen flex items-center justify-center " id="blog">
          <div className="row justify-content-center w-5/6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Recent Thoughts</h2>
            <div className="mt-6 grid grid-cols-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
              {props.posts.map(({ slug, frontMatter: { title, description, thumbnail } }) => (
                <BlogPost key={slug} title={title} slug={slug} description={description} path={`/blog/${slug}`} imageSrc={thumbnail} />
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Fragment >
  )
}

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.filter(filename => filename.includes(".md")).map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      slug,
      frontMatter,
    }
  }).sort((a, b) => (
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));

  return {
    props: {
      SiteTitle: siteConfig.default.title,
      SiteDescription: siteConfig.default.description,
      posts,
    },
  }
}

export default Home