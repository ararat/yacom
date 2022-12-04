import React from "react";
import Head from 'next/head';
import { Fragment } from 'react';
import fs from 'fs';
import path from 'path';
import matter, { } from 'gray-matter';
import { marked } from 'marked';
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
        <div className={styles.container}>
            <div className='prose prose-sm sm:prose lg:prose-lg mx-auto prose-slate'>
                <Image
                    src={props.post.thumbnail}
                    alt={props.post.title}
                    width={1412}
                    height={460}
                    layout="responsive" />
                <div dangerouslySetInnerHTML={{ __html: marked(props.content) }} />
            </div>
        </div>
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
