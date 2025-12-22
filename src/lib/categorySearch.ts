// Shared helper for Category page + prefetching.
export function buildCategorySearchQuery(category: string, subcategory?: string, child?: string): string {
  const searchTerm = child || subcategory || category;
  const words = searchTerm
    .toLowerCase()
    .split(/[\s&,]+/)
    .filter((w) => w.length > 2);

  if (words.length > 0) {
    const queries = words.map((w) => `(title:*${w}* OR tag:*${w}* OR product_type:*${w}*)`);
    return queries.join(' OR ');
  }

  return `title:*${searchTerm}*`;
}
