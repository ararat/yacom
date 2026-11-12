/**
 * Serialise data for an inline <script type="application/ld+json"> block.
 * Escapes "<" so a value containing "</script>" cannot close the tag.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
