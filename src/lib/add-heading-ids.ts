/**
 * Adds id attributes to h2/h3 elements in HTML content for anchor linking.
 */
export function addHeadingIds(html: string): string {
  return html.replace(
    /<(h[23])>(.*?)<\/h[23]>/gi,
    (_match, tag: string, text: string) => {
      const plainText = text.replace(/<[^>]+>/g, "");
      const id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9äöüß\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      return `<${tag} id="${id}">${text}</${tag}>`;
    }
  );
}
