export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

/**
 * Extracts table of contents from markdown content
 * @param markdown - The markdown content string
 * @returns Array of TOC items with hierarchy
 */
export function extractTableOfContents(markdown: string): TOCItem[] {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

  const headings: TOCItem[] = [];
  
  // Regex to match markdown headings (# ## ### etc.)
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Count # characters
    const title = match[2].trim();
    
    // Generate URL-friendly ID from title
    const id = generateHeadingId(title);
    
    headings.push({
      id,
      title,
      level,
    });
  }

  // Build hierarchical structure
  return buildHierarchy(headings);
}

/**
 * Generates a URL-friendly ID from heading text
 * @param text - The heading text
 * @returns URL-friendly ID string
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Builds a hierarchical structure from flat heading list
 * @param headings - Flat array of heading items
 * @returns Hierarchical array of TOC items
 */
function buildHierarchy(headings: TOCItem[]): TOCItem[] {
  if (headings.length === 0) return [];

  const result: TOCItem[] = [];
  const stack: TOCItem[] = [];

  for (const heading of headings) {
    // Find the correct parent level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // This is a top-level heading
      result.push(heading);
    } else {
      // This is a child heading
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(heading);
    }

    stack.push(heading);
  }

  return result;
}

/**
 * Flattens hierarchical TOC structure into a flat array
 * @param toc - Hierarchical TOC structure
 * @returns Flat array of TOC items
 */
export function flattenTOC(toc: TOCItem[]): TOCItem[] {
  const result: TOCItem[] = [];
  
  function flatten(items: TOCItem[]) {
    for (const item of items) {
      result.push({ ...item, children: undefined }); // Remove children for flat structure
      if (item.children) {
        flatten(item.children);
      }
    }
  }
  
  flatten(toc);
  return result;
}

/**
 * Adds IDs to markdown headings for table of contents navigation
 * @param markdown - The original markdown content
 * @returns Markdown with heading IDs added
 */
export function addHeadingIds(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return markdown;
  }

  return markdown.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const id = generateHeadingId(title.trim());
    return `${hashes} ${title.trim()} {#${id}}`;
  });
}

/**
 * Gets the first heading from markdown content
 * @param markdown - The markdown content
 * @returns The first heading or null if none found
 */
export function getFirstHeading(markdown: string): string | null {
  if (!markdown || typeof markdown !== 'string') {
    return null;
  }

  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Counts total headings in markdown content
 * @param markdown - The markdown content
 * @returns Number of headings found
 */
export function countHeadings(markdown: string): number {
  if (!markdown || typeof markdown !== 'string') {
    return 0;
  }

  const matches = markdown.match(/^#{1,6}\s+.+$/gm);
  return matches ? matches.length : 0;
}