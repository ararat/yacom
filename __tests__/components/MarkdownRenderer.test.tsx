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
    expect(container.querySelector('#100-coverage-success')).toBeInTheDocument();
  });

  it('should render empty content gracefully', () => {
    const { container } = render(
      <MarkdownRenderer content="" />
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});