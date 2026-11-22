import fs from 'fs'
import os from 'os'
import path from 'path'
import { getWritingList } from '../../lib/posts'

const write = (dir: string, name: string, frontMatter: string, body = 'Body text.') =>
  fs.writeFileSync(path.join(dir, name), `---\n${frontMatter}\n---\n\n${body}\n`)

describe('getWritingList', () => {
  let dir: string

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'))
  })

  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }))

  test('lists posts newest first with card fields from front matter', () => {
    write(dir, 'old.md', "title: 'Old one'\ndate: '2017-05-09T16:45:26+12:00'\nexcerpt: 'Old excerpt'\ncategory:\n  - Adobe\n  - AEM")
    write(dir, 'new.md', "title: 'Don''t rewrite DORA for AI'\ndate: '2026-11-21T00:00:00.000Z'\ndescription: 'Measuring engineering is changing.'")

    expect(getWritingList({ dir })).toEqual([
      { tag: 'Writing', date: 'November 2026', title: "Don't rewrite DORA for AI", text: 'Measuring engineering is changing.', url: '/blog/new' },
      { tag: 'Adobe', date: 'May 2017', title: 'Old one', text: 'Old excerpt', url: '/blog/old' },
    ])
  })

  test('skips private, draft and hidden posts, and honours the limit', () => {
    write(dir, 'a.md', "title: A\ndate: '2026-01-01'")
    write(dir, 'b.md', "title: B\ndate: '2025-01-01'")
    write(dir, 'c.md', "title: C\ndate: '2024-01-01'")
    write(dir, 'private.md', "title: P\ndate: '2026-06-01'\nstatus: private")
    write(dir, 'draft.md', "title: D\ndate: '2026-06-01'\nstatus: draft")
    write(dir, 'hidden.md', "title: H\ndate: '2026-06-01'\nhidden: true")

    expect(getWritingList({ dir }).map((p) => p.title)).toEqual(['A', 'B', 'C'])
    expect(getWritingList({ dir, limit: 2 }).map((p) => p.title)).toEqual(['A', 'B'])
  })

  test('falls back to tags and to the first paragraph when there is no description', () => {
    write(
      dir,
      'post.md',
      "title: T\ndate: '2024-07-03'\ntags:\n  - nextjs",
      '# Heading\n\nA **bold** first paragraph with a [link](https://example.com).\n\nSecond paragraph.',
    )

    const [post] = getWritingList({ dir })
    expect(post.tag).toBe('nextjs')
    expect(post.text).toBe('A bold first paragraph with a link.')
  })

  test('returns an empty list when the folder is missing', () => {
    expect(getWritingList({ dir: path.join(dir, 'nope') })).toEqual([])
  })
})
