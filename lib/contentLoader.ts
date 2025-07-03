import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentSection {
  frontMatter: { [key: string]: any };
  content: string;
}

export function loadContentSection(filename: string): ContentSection {
  const contentPath = path.join(process.cwd(), 'content', `${filename}.md`);
  const fileContents = fs.readFileSync(contentPath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);
  
  return {
    frontMatter,
    content
  };
}

export function loadAllContentSections(): { [key: string]: ContentSection } {
  const contentFiles = ['hero', 'about', 'experience', 'expertise'];
  const content: { [key: string]: ContentSection } = {};
  
  contentFiles.forEach(fileName => {
    try {
      content[fileName] = loadContentSection(fileName);
    } catch (error) {
      console.warn(`Could not load content file: ${fileName}.md`);
    }
  });
  
  return content;
}