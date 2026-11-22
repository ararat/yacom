import React from 'react';
import { render } from '@testing-library/react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('should render markdown content with heading IDs', () => {
    const content = `
# Main Title
## Section One
### Subsection
## Section Two
Some content here.
    `;

    const { container } = render(
      <MarkdownRenderer content={content} className="test-class" />
    );

    // Check that headings have proper IDs
    expect(container.querySelector('#main-title')).toBeInTheDocument();
    expect(container.querySelector('#section-one')).toBeInTheDocument();
    expect(container.querySelector('#subsection')).toBeInTheDocument();
    expect(container.querySelector('#section-two')).toBeInTheDocument();

    // Check that wrapper has correct class
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('should handle special characters in headings', () => {
    const content = `
# Hello, World! & Special Characters?
## Section with "Quotes" and 'Apostrophes'
### 100% Coverage & Success!
    `;

    const { container } = render(
      <MarkdownRenderer content={content} />
    );

    // Check that special characters are properly handled in IDs
    expect(container.querySelector('#hello-world-special-characters')).toBeInTheDocument();
    expect(container.querySelector('#section-with-quotes-and-apostrophes')).toBeInTheDocument();
    expect(container.ownerDocument.getElementById('100-coverage-success')).toBeInTheDocument();
  });

  it('should render empty content gracefully', () => {
    const { container } = render(
      <MarkdownRenderer content="" className="empty" />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('renders real heading elements at each level', () => {
    const content = `
## Layer 1: Keep DORA Intact
Text.

## Layer 2: Keep SPACE Intact
Text.

### Layer 3: The AI Agent & Factory \`Efficiency\` Layer
`;

    const { container } = render(<MarkdownRenderer content={content} />);

    // react-markdown 10 stopped passing a level prop; the old renderer then
    // produced <hundefined> elements instead of headings.
    expect(container.querySelector('hundefined')).toBeNull();
    expect([...container.querySelectorAll('h2')].map((h) => h.id)).toEqual([
      'layer-1-keep-dora-intact',
      'layer-2-keep-space-intact',
    ]);
    expect(container.querySelector('h3')?.id).toBe('layer-3-the-ai-agent-factory-efficiency-layer');
  });
});