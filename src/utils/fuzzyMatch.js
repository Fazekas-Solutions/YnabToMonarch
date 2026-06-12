// Loose, "best guess" name matching used to auto-pair YNAB accounts with
// existing Monarch accounts. YNAB names often carry emojis or extra punctuation
// that a Monarch account wouldn't, so we normalize those away and score the
// remaining text by similarity rather than requiring an exact match.

/**
 * Lowercases and strips everything that isn't a letter, digit, or whitespace
 * (emojis, punctuation, symbols), then collapses whitespace. Digits are kept
 * because they're often the only thing distinguishing otherwise-identical
 * names (e.g. "Scotia Passport (30th)" vs "Scotia Passport (10th)").
 */
export function normalizeName(str) {
  return String(str ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function bigrams(str) {
  const grams = new Map();
  for (let i = 0; i < str.length - 1; i++) {
    const g = str.slice(i, i + 2);
    grams.set(g, (grams.get(g) || 0) + 1);
  }
  return grams;
}

/**
 * Sørensen–Dice coefficient over character bigrams. Returns 0–1, where 1 is an
 * exact match. Robust for short strings and minor edits/typos.
 */
export function diceCoefficient(a, b) {
  if (a === b) return a.length ? 1 : 0;
  if (a.length < 2 || b.length < 2) return 0;

  const A = bigrams(a);
  const B = bigrams(b);
  let total = 0;
  let overlap = 0;
  A.forEach(count => { total += count; });
  B.forEach(count => { total += count; });
  A.forEach((count, gram) => { overlap += Math.min(count, B.get(gram) || 0); });
  return (2 * overlap) / total;
}

/**
 * Similarity of two names on a 0–1 scale, normalizing away emojis/digits/
 * punctuation first. A full containment of one name by the other is treated as
 * a strong match even when the raw bigram overlap is modest.
 *
 * @param {string} query
 * @param {string} name
 */
export function nameMatchScore(query, name) {
  const q = normalizeName(query);
  const cn = normalizeName(name);
  if (!q || !cn) return 0;

  let score = diceCoefficient(q, cn);
  if (q === cn) score = 1;
  else if (cn.includes(q) || q.includes(cn)) score = Math.max(score, 0.9);
  return score;
}

/**
 * Returns the best-scoring candidate for `query`, or null if none clears
 * `threshold`. Candidates are objects with a `name`; the returned object is the
 * matched candidate plus a `score`.
 *
 * @param {string} query
 * @param {Array<{name: string}>} candidates
 * @param {{threshold?: number}} [opts]
 */
export function bestNameMatch(query, candidates, { threshold = 0.6 } = {}) {
  if (!normalizeName(query)) return null;

  let best = null;
  for (const candidate of candidates || []) {
    if (!normalizeName(candidate.name)) continue;
    const score = nameMatchScore(query, candidate.name);
    if (!best || score > best.score) best = { ...candidate, score };
  }

  return best && best.score >= threshold ? best : null;
}
