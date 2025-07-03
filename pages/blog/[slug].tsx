import React from "react";
import Head from 'next/head';
import { Fragment } from 'react';
import fs from 'fs';
import path from 'path';
import matter, { } from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from "../../styles/Home.module.css";
import Image from '../../components/image';
import Navigation from '../../components/Navigation';
import TableOfContents from '../../components/TableOfContents';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { extractTableOfContents } from '../../lib/tableOfContents';


const BlogPost = (props: {
    siteTitle: string,
    siteDescription: string,
    post: { [key: string]: string },
    slug: string,
    content: string,
    toc?: any[],
}) => (
    <Fragment>
        <Head>
            <title>{`${props.siteTitle} - ${props.post.title}`}</title>
            <meta name="description" content={props.post.excerpt} />
        </Head>
        <Navigation variant="blogPost" siteTitle={props.siteTitle} postTitle={props.post.title} />
        <main className="min-h-screen pt-32 sm:pt-36 pb-12 flex justify-center bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Table of Contents - Desktop sidebar */}
                    {props.toc && props.toc.length > 0 && (
                        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                            <div className="sticky top-24">
                                <TableOfContents 
                                    toc={props.toc} 
                                    collapsible={false}
                                    className="mb-8"
                                />
                            </div>
                        </aside>
                    )}
                    
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        {/* Table of Contents - Mobile */}
                        {props.toc && props.toc.length > 0 && (
                            <div className="lg:hidden mb-8">
                                <TableOfContents 
                                    toc={props.toc} 
                                    collapsible={true}
                                    defaultCollapsed={true}
                                />
                            </div>
                        )}
                        
                        <article className='prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-slate dark:prose-invert mx-auto'>
                            <Image
                                src={props.post.thumbnail}
                                alt={props.post.title}
                                width={1412}
                                height={460}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }} />
                            <MarkdownRenderer content={props.content} />
                        </article>
                    </div>
                </div>
            </div>
        </main>
    </Fragment>
);

export default BlogPost;

export async function getStaticPaths() {
    try {
        // Check if posts directory exists
        if (!fs.existsSync(path.join('posts'))) {
            console.warn('Posts directory does not exist, returning empty paths');
            return {
                paths: [],
                fallback: false,
            };
        }

        const files = fs.readdirSync(path.join('posts'));

        const paths = files
            .filter(filename => filename.includes(".md"))
            .map((filename) => {
                try {
                    const slug = filename.replace('.md', '');
                    
                    // Validate that the file can be read
                    fs.accessSync(path.join('posts', filename), fs.constants.R_OK);
                    
                    return {
                        params: { slug },
                    };
                } catch (fileError) {
                    console.error(`Cannot access file ${filename}:`, fileError);
                    return null;
                }
            })
            .filter(path => path !== null); // Remove invalid paths

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.error('Error in getStaticPaths:', error);
        return {
            paths: [],
            fallback: false,
        };
    }
}

interface StaticPropsParams {
    slug: string;
}

export async function getStaticProps({ params: { slug } }: { params: StaticPropsParams }) {
    try {
        // Load site configuration with error handling
        let siteConfig;
        try {
            siteConfig = await import(`../../data/config.json`);
        } catch (configError) {
            console.error('Failed to load site configuration:', configError);
            siteConfig = {
                default: {
                    title: 'Blog',
                    description: 'Blog post'
                }
            };
        }

        const siteTitle = siteConfig.default.title || 'Blog';
        const siteDescription = siteConfig.default.description || 'Blog post';

        // Check if the post file exists
        const postPath = path.join('posts', slug + '.md');
        if (!fs.existsSync(postPath)) {
            console.error(`Post file not found: ${postPath}`);
            return {
                notFound: true,
            };
        }

        let markdownWithMeta: string;
        try {
            markdownWithMeta = fs.readFileSync(postPath, 'utf-8');
        } catch (readError) {
            console.error(`Failed to read post file ${postPath}:`, readError);
            return {
                notFound: true,
            };
        }

        let post, content;
        try {
            const parsed = matter(markdownWithMeta);
            post = parsed.data;
            content = parsed.content;

            // Validate required post data
            if (!post.title) {
                console.warn(`Post ${slug} missing title, using slug`);
                post.title = slug.replace(/-/g, ' ');
            }

            if (!post.excerpt && !post.description) {
                console.warn(`Post ${slug} missing excerpt/description`);
                post.excerpt = content.substring(0, 200) + '...';
            }

        } catch (parseError) {
            console.error(`Failed to parse markdown for ${slug}:`, parseError);
            return {
                notFound: true,
            };
        }

        // Generate table of contents
        const toc = extractTableOfContents(content);

        return {
            props: {
                siteTitle,
                siteDescription,
                post,
                slug,
                content,
                toc,
            },
        };
    } catch (error) {
        console.error(`Critical error in getStaticProps for ${slug}:`, error);
        return {
            notFound: true,
        };
    }
}
