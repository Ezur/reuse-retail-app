// Generates src/data/taxonomy.js from the category CSV exported from the
// "Category & Donor List Examples" spreadsheet.
//
// Usage: node scripts/generate-taxonomy.js (ES module)
//
// Rules:
// - Column A "Name (CODE)" starts a category; it applies to following rows.
// - Column B "CODE, Subcategory" rows belong to the current category.
// - Column C "CODE, Sub, Leaf" rows belong to the current subcategory.
// - "Magic Test Grouping (ZZZ)" is test data and is skipped.
// - The trailing "UNK, Other UNK" row has no category header; it becomes the
//   "Other / Unknown" (UNK) category.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV = path.join(__dirname, '..', 'src', 'data', 'Category & Donor List Examples  - All Subcategories.csv');
const OUT = path.join(__dirname, '..', 'src', 'data', 'taxonomy.js');

function parseCSV(text) {
  const rows = []; let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false;
      } else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const rows = parseCSV(fs.readFileSync(CSV, 'utf8')).slice(1);
const categories = [];
const subcategories = {};
const subsubs = {};
let code = null, sub = null;

for (const r of rows) {
  const [a, b, c] = [r[0]?.trim() ?? '', r[1]?.trim() ?? '', r[2]?.trim() ?? ''];
  if (a) {
    const m = a.match(/^(.*)\s+\(([A-Z]+)\)$/);
    if (m) {
      const [, name, catCode] = m;
      if (catCode === 'ZZZ') { code = null; sub = null; continue; } // test grouping
      code = catCode;
      categories.push({ code, name: name.trim() });
      subcategories[code] = [];
      sub = null;
    } else if (/^UNK,/.test(a)) {
      // Trailing UNK subcategory row without a category header
      code = 'UNK';
      if (!subcategories.UNK) {
        categories.push({ code: 'UNK', name: 'Other / Unknown' });
        subcategories.UNK = [];
      }
      sub = a.replace(/^UNK,\s*/, '');
      subcategories.UNK.push(sub);
      continue;
    } else {
      console.warn('Skipping unrecognized category row:', a);
      code = null; sub = null;
      continue;
    }
  }
  if (b && code) {
    sub = b.replace(new RegExp('^' + code + ',\\s*'), '');
    subcategories[code].push(sub);
  }
  if (c && code && sub) {
    let leaf = c.replace(new RegExp('^' + code + ',\\s*'), '');
    if (leaf.startsWith(sub + ',')) leaf = leaf.slice(sub.length + 1).trim();
    const key = code + '::' + sub;
    (subsubs[key] = subsubs[key] || []).push(leaf);
  }
}

const banner =
  '// GENERATED — do not edit by hand.\n' +
  '// Source: src/data/Category & Donor List Examples  - All Subcategories.csv\n' +
  '// Regenerate with: node scripts/generate-taxonomy.js\n\n';

fs.writeFileSync(OUT, banner
  + 'export const CATEGORIES = ' + JSON.stringify(categories, null, 2) + ';\n\n'
  + 'export const SUBCATEGORIES = ' + JSON.stringify(subcategories, null, 2) + ';\n\n'
  + '// Keyed by "CODE::Subcategory name" — only entries that have sub-subcategories\n'
  + 'export const SUB_SUBCATEGORIES = ' + JSON.stringify(subsubs, null, 2) + ';\n');

console.log('Categories:', categories.length,
  '| Subcategories:', Object.values(subcategories).reduce((n, x) => n + x.length, 0),
  '| Sub-subcategory groups:', Object.keys(subsubs).length,
  '| Leaves:', Object.values(subsubs).reduce((n, x) => n + x.length, 0));
console.log('Codes:', categories.map(x => x.code).join(', '));
