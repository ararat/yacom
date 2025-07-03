import { loadContentSection, loadAllContentSections } from '../../lib/contentLoader'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Mock dependencies
jest.mock('fs')
jest.mock('path')
jest.mock('gray-matter')

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>
const mockMatter = matter as jest.MockedFunction<typeof matter>

describe('contentLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock process.cwd()
    jest.spyOn(process, 'cwd').mockReturnValue('/mock/cwd')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('loadContentSection', () => {
    test('should load and parse content section successfully', () => {
      const mockFileContent = '---\ntitle: Test\n---\n# Test Content'
      const mockParsedMatter = {
        data: { title: 'Test' },
        content: '# Test Content'
      }

      mockPath.join.mockReturnValue('/mock/cwd/content/test.md')
      mockFs.readFileSync.mockReturnValue(mockFileContent)
      mockMatter.mockReturnValue(mockParsedMatter as any)

      const result = loadContentSection('test')

      expect(mockPath.join).toHaveBeenCalledWith('/mock/cwd', 'content', 'test.md')
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mock/cwd/content/test.md', 'utf8')
      expect(mockMatter).toHaveBeenCalledWith(mockFileContent)
      expect(result).toEqual({
        frontMatter: { title: 'Test' },
        content: '# Test Content'
      })
    })

    test('should handle file reading errors', () => {
      mockPath.join.mockReturnValue('/mock/cwd/content/nonexistent.md')
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      expect(() => {
        loadContentSection('nonexistent')
      }).toThrow('File not found')
    })

    test('should handle matter parsing errors', () => {
      const mockFileContent = 'invalid frontmatter'

      mockPath.join.mockReturnValue('/mock/cwd/content/invalid.md')
      mockFs.readFileSync.mockReturnValue(mockFileContent)
      mockMatter.mockImplementation(() => {
        throw new Error('Invalid frontmatter')
      })

      expect(() => {
        loadContentSection('invalid')
      }).toThrow('Invalid frontmatter')
    })
  })

  describe('loadAllContentSections', () => {
    test('should load all content sections successfully', () => {
      const mockSections = {
        hero: { frontMatter: { title: 'Hero' }, content: '# Hero Content' },
        about: { frontMatter: { title: 'About' }, content: '# About Content' },
        experience: { frontMatter: { title: 'Experience' }, content: '# Experience Content' },
        expertise: { frontMatter: { title: 'Expertise' }, content: '# Expertise Content' }
      }

      // Mock loadContentSection for each file
      mockPath.join
        .mockReturnValueOnce('/mock/cwd/content/hero.md')
        .mockReturnValueOnce('/mock/cwd/content/about.md')
        .mockReturnValueOnce('/mock/cwd/content/experience.md')
        .mockReturnValueOnce('/mock/cwd/content/expertise.md')

      mockFs.readFileSync
        .mockReturnValueOnce('---\ntitle: Hero\n---\n# Hero Content')
        .mockReturnValueOnce('---\ntitle: About\n---\n# About Content')
        .mockReturnValueOnce('---\ntitle: Experience\n---\n# Experience Content')
        .mockReturnValueOnce('---\ntitle: Expertise\n---\n# Expertise Content')

      mockMatter
        .mockReturnValueOnce({ data: { title: 'Hero' }, content: '# Hero Content' } as any)
        .mockReturnValueOnce({ data: { title: 'About' }, content: '# About Content' } as any)
        .mockReturnValueOnce({ data: { title: 'Experience' }, content: '# Experience Content' } as any)
        .mockReturnValueOnce({ data: { title: 'Expertise' }, content: '# Expertise Content' } as any)

      const result = loadAllContentSections()

      expect(result).toEqual(mockSections)
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(4)
    })

    test('should handle missing content files gracefully', () => {
      // Mock console.warn to capture warnings
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

      // Mock successful load for some files, error for others
      mockPath.join
        .mockReturnValueOnce('/mock/cwd/content/hero.md')
        .mockReturnValueOnce('/mock/cwd/content/about.md')
        .mockReturnValueOnce('/mock/cwd/content/experience.md')
        .mockReturnValueOnce('/mock/cwd/content/expertise.md')

      mockFs.readFileSync
        .mockReturnValueOnce('---\ntitle: Hero\n---\n# Hero Content')
        .mockImplementationOnce(() => { throw new Error('File not found') })
        .mockReturnValueOnce('---\ntitle: Experience\n---\n# Experience Content')
        .mockImplementationOnce(() => { throw new Error('File not found') })

      mockMatter
        .mockReturnValueOnce({ data: { title: 'Hero' }, content: '# Hero Content' } as any)
        .mockReturnValueOnce({ data: { title: 'Experience' }, content: '# Experience Content' } as any)

      const result = loadAllContentSections()

      expect(result).toEqual({
        hero: { frontMatter: { title: 'Hero' }, content: '# Hero Content' },
        experience: { frontMatter: { title: 'Experience' }, content: '# Experience Content' }
      })
      expect(warnSpy).toHaveBeenCalledWith('Could not load content file: about.md')
      expect(warnSpy).toHaveBeenCalledWith('Could not load content file: expertise.md')
      
      warnSpy.mockRestore()
    })

    test('should return empty object when all files fail to load', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

      mockPath.join.mockReturnValue('/mock/path')
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      const result = loadAllContentSections()

      expect(result).toEqual({})
      expect(warnSpy).toHaveBeenCalledTimes(4)
      
      warnSpy.mockRestore()
    })
  })
})