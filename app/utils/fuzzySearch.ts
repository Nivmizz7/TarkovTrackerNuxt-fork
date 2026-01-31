function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
export function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;
  if (!text) return false;
  const textLower = normalize(text);
  const queryLower = normalize(query);
  if (textLower.includes(queryLower)) return true;
  const words = queryLower.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words.every((word) => textLower.includes(word));
  }
  let textIndex = 0;
  let queryIndex = 0;
  while (textIndex < textLower.length && queryIndex < queryLower.length) {
    if (textLower[textIndex] === queryLower[queryIndex]) {
      queryIndex++;
    }
    textIndex++;
  }
  return queryIndex === queryLower.length;
}
export function fuzzyMatchScore(text: string, query: string): number {
  if (!query) return 1;
  if (!text) return 0;
  const textLower = normalize(text);
  const queryLower = normalize(query);
  if (textLower === queryLower) return 1;
  if (textLower.startsWith(queryLower)) return 0.9;
  if (textLower.includes(queryLower)) return 0.8;
  const words = queryLower.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const matchedWords = words.filter((word) => textLower.includes(word));
    return (matchedWords.length / words.length) * 0.7;
  }
  let textIndex = 0;
  let queryIndex = 0;
  let consecutiveMatches = 0;
  let maxConsecutive = 0;
  while (textIndex < textLower.length && queryIndex < queryLower.length) {
    if (textLower[textIndex] === queryLower[queryIndex]) {
      queryIndex++;
      consecutiveMatches++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
    } else {
      consecutiveMatches = 0;
    }
    textIndex++;
  }
  if (queryIndex < queryLower.length) return 0;
  return 0.3 + (maxConsecutive / queryLower.length) * 0.3;
}
