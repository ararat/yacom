import React from "react";
import Head from 'next/head';
import { Fragment } from 'react';
import fs from 'fs';
import path from 'path';
import matter, { } from 'gray-matter';
import { marked } from 'marked';

// Configure marked to disable deprecated options
marked.setOptions({
  mangle: false,
  headerIds: false
});
import styles from "../../styles/Home.module.css";
import Image from '../../components/image';
import Navigation from '../../components/Navigation';


const BlogPost = (props: {
    siteTitle: string,
    siteDescription: string,
    post: { [key: string]: string },
    slug: string,
    content: string,
}) => (
    <Fragment>
        <Head>
            <title>{props.siteTitle} - {props.post.title}</title>
            <meta name="description" content={props.post.excerpt} />
        </Head>
        <Navigation SiteTitle={props.siteTitle} SiteDescription={props.siteDescription} />
        <main className="min-h-screen pt-20 sm:pt-22 pb-12 flex justify-center">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className='prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-slate mx-auto'>
                    <Image
                        src={props.post.thumbnail}
                        alt={props.post.title}
                        width={1412}
                        height={460}
                        layout="responsive" />
                    <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
                </div>
            </div>
        </main>
    </Fragment>
);

export default BlogPost;

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.filter(filename => filename.includes(".md")).map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }: never) {
    const siteConfig = await import(`../../data/config.json`);
    const siteTitle = siteConfig.default.title;
    const siteDescription = siteConfig.default.description;
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
    )

    const { data: post, content } = matter(markdownWithMeta);

    return {
        props: {
            siteTitle,
            siteDescription,
            post,
            slug,
            content,
        },
    }
}
