/**
 * Basa Walikan (Hanacaraka Cipher) Engine
 * 
 * Aturan pasangan Hanacaraka Yogyakarta:
 * Baris 1: ha, na, ca, ra, ka
 * Baris 2: da, ta, sa, wa, la
 * Baris 3: pa, dha, ja, ya, nya
 * Baris 4: ma, ga, ba, tha, nga
 * 
 * Pasangan (Baris 1 ⇄ Baris 3, Baris 2 ⇄ Baris 4):
 * h ⇄ p
 * n ⇄ dh
 * c ⇄ j
 * r ⇄ y
 * k ⇄ ny
 * 
 * d ⇄ m
 * t ⇄ g
 * s ⇄ b
 * w ⇄ th
 * l ⇄ ng
 * 
 * Aturan Khusus Vokal Depan (Aksara Swara / Ha):
 * Dalam aksara Jawa, vokal di awal kata atau berdiri sendiri ditulis menggunakan aksara Ha (ꦲ)
 * dengan sandhangan swara. Sehingga:
 * - 'a' dibaca 'ha' ⇄ berpasangan dengan 'pa' (contoh: "aku" ➔ "panyu")
 * - 'i' dibaca 'hi' ⇄ berpasangan dengan 'pi' (contoh: "ibu" ➔ "pisu")
 * - 'u' dibaca 'hu' ⇄ berpasangan dengan 'pu' (contoh: "udan" ➔ "pumadh")
 * - 'e' dibaca 'he' ⇄ berpasangan dengan 'pe' (contoh: "enak" ➔ "pedhany")
 * - 'o' dibaca 'ho' ⇄ berpasangan dengan 'po' (contoh: "omah" ➔ "podap")
 */

export interface WalikanToken {
  id: string;
  original: string;
  converted: string;
  rule: string;
  isChanged: boolean;
  rowPair?: '1 ⇄ 3' | '2 ⇄ 4';
  aksaraOriginal?: string;
  aksaraConverted?: string;
}

export interface HanacarakaPair {
  char1: string;
  aksara1: string;
  nama1: string;
  char2: string;
  aksara2: string;
  nama2: string;
  group: '1 ⇄ 3' | '2 ⇄ 4';
}

export const HANACARAKA_PAIRS: HanacarakaPair[] = [
  // Baris 1 ⇄ Baris 3
  { char1: 'h', aksara1: 'ꦲ', nama1: 'Ha', char2: 'p', aksara2: 'ꦥ', nama2: 'Pa', group: '1 ⇄ 3' },
  { char1: 'n', aksara1: 'ꦤ', nama1: 'Na', char2: 'dh', aksara2: 'ꦝ', nama2: 'Dha', group: '1 ⇄ 3' },
  { char1: 'c', aksara1: 'ꦕ', nama1: 'Ca', char2: 'j', aksara2: 'ꦗ', nama2: 'Ja', group: '1 ⇄ 3' },
  { char1: 'r', aksara1: 'ꦫ', nama1: 'Ra', char2: 'y', aksara2: 'ꦪ', nama2: 'Ya', group: '1 ⇄ 3' },
  { char1: 'k', aksara1: 'ꦏ', nama1: 'Ka', char2: 'ny', aksara2: 'ꦚ', nama2: 'Nya', group: '1 ⇄ 3' },

  // Baris 2 ⇄ Baris 4
  { char1: 'd', aksara1: 'ꦢ', nama1: 'Da', char2: 'm', aksara2: 'ꦩ', nama2: 'Ma', group: '2 ⇄ 4' },
  { char1: 't', aksara1: 'ꦠ', nama1: 'Ta', char2: 'g', aksara2: 'ꦒ', nama2: 'Ga', group: '2 ⇄ 4' },
  { char1: 's', aksara1: 'ꦱ', nama1: 'Sa', char2: 'b', aksara2: 'ꦧ', nama2: 'Ba', group: '2 ⇄ 4' },
  { char1: 'w', aksara1: 'ꦮ', nama1: 'Wa', char2: 'th', aksara2: 'ꦛ', nama2: 'Tha', group: '2 ⇄ 4' },
  { char1: 'l', aksara1: 'ꦭ', nama1: 'La', char2: 'ng', aksara2: 'ꦔ', nama2: 'Nga', group: '2 ⇄ 4' },
];

export const POPULAR_EXAMPLES = [
  { original: 'Aku', walikan: 'Panyu', meaning: 'Saya / diriku (aturan vokal awal a ➔ pa, k ➔ ny)' },
  { original: 'Mas', walikan: 'Dab', meaning: 'Sapaan akrab untuk laki-laki / kawan karib' },
  { original: 'Matamu', walikan: 'Dagadu', meaning: 'Mata Anda (Asal-usul brand Dagadu Djokdja)' },
  { original: 'Bocah', walikan: 'Sojap', meaning: 'Anak / anak muda / kawan sebaya' },
  { original: 'Ibu', walikan: 'Pisu', meaning: 'Ibu tercinta (aturan vokal awal i ➔ pi, b ➔ s)' },
  { original: 'Piye', walikan: 'Hire', meaning: 'Bagaimana (seperti "Piye kabare" -> "Hire sabaye")' },
  { original: 'Omah', walikan: 'Podap', meaning: 'Rumah hunian (aturan vokal awal o ➔ po, m ➔ d, h ➔ p)' },
  { original: 'Mangan', walikan: 'Daladh', meaning: 'Makan santap' },
  { original: 'Turu', walikan: 'Guyu', meaning: 'Tidur terlelap' },
  { original: 'Udan', walikan: 'Pumadh', meaning: 'Hujan (aturan vokal awal u ➔ pu, d ➔ m, n ➔ dh)' },
  { original: 'Ngombe', walikan: 'Lodse', meaning: 'Minum minuman' },
  { original: 'Kowe', walikan: 'Nyothe', meaning: 'Kamu / dirimu' },
  { original: 'Enak', walikan: 'Pedhany', meaning: 'Lezat / nikmat (aturan vokal awal e ➔ pe, n ➔ dh, k ➔ ny)' },
  { original: 'Duit', walikan: 'Muit', meaning: 'Uang / duit' },
  { original: 'Sithik', walikan: 'Biwiny', meaning: 'Sedikit / secuil' },
  { original: 'Wedang', walikan: 'Thedhal', meaning: 'Minuman teh / kopi hangat' },
  { original: 'Bapak', walikan: 'Sahany', meaning: 'Ayahanda' },
  { original: 'Kanca', walikan: 'Nyadhja', meaning: 'Teman / sahabat' },
];

/**
 * Helper to match letter case of original string to target string.
 */
function applyCasing(source: string, target: string): string {
  if (source.length === 1) {
    if (source === source.toUpperCase() && source !== source.toLowerCase()) {
      return target.length > 1 ? target.charAt(0).toUpperCase() + target.slice(1).toLowerCase() : target.toUpperCase();
    }
    return target.toLowerCase();
  }

  const isAllUpper = source === source.toUpperCase();
  const isCapitalized = source.charAt(0) === source.charAt(0).toUpperCase() && source.slice(1) === source.slice(1).toLowerCase();

  if (isAllUpper) {
    return target.toUpperCase();
  }
  if (isCapitalized) {
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  }
  return target.toLowerCase();
}

/**
 * Check if the character at given index is at the start of a word or standing alone.
 */
export function isWordStart(text: string, index: number): boolean {
  if (index === 0) return true;
  const prevChar = text.charAt(index - 1);
  // Non-alphabetic character before this index means a new word starts here
  return !/[a-zA-Z0-9\u00C0-\u024F]/.test(prevChar);
}

/**
 * Maps single phoneme/digraph according to Hanacaraka rule.
 */
interface PhonemeMapResult {
  replacement: string;
  rule: string;
  group: '1 ⇄ 3' | '2 ⇄ 4';
  consumedChars: number;
  aksaraOriginal?: string;
  aksaraConverted?: string;
}

function findPhonemeMapping(
  text: string,
  index: number,
  initialVowelAsHa: boolean = true
): PhonemeMapResult | null {
  const remaining = text.slice(index);
  const remainingLower = remaining.toLowerCase();

  // Special rule: Initial Vowel (a, i, u, e, o) at the beginning of a word or standalone
  // In Aksara Jawa, initial vowels are written with Ha (ꦲ) + sandhangan, so they pair with Pa (ꦥ).
  if (initialVowelAsHa && isWordStart(text, index)) {
    const firstChar = text.charAt(index);
    const firstCharLower = firstChar.toLowerCase();

    const initialVowels: Record<string, { pVowel: string; aksaraOri: string; aksaraConv: string; label: string }> = {
      a: { pVowel: 'pa', aksaraOri: 'ꦲ', aksaraConv: 'ꦥ', label: 'a (dibaca ha) ⇄ pa' },
      i: { pVowel: 'pi', aksaraOri: 'ꦲꦶ', aksaraConv: 'ꦥꦶ', label: 'i (dibaca hi) ⇄ pi' },
      u: { pVowel: 'pu', aksaraOri: 'ꦲꦸ', aksaraConv: 'ꦥꦸ', label: 'u (dibaca hu) ⇄ pu' },
      e: { pVowel: 'pe', aksaraOri: 'ꦲꦼ', aksaraConv: 'ꦥꦼ', label: 'e (dibaca he) ⇄ pe' },
      é: { pVowel: 'pé', aksaraOri: 'ꦺꦲ', aksaraConv: 'ꦺꦥ', label: 'é (dibaca hé) ⇄ pé' },
      è: { pVowel: 'pè', aksaraOri: 'ꦺꦲ', aksaraConv: 'ꦺꦥ', label: 'è (dibaca hè) ⇄ pè' },
      o: { pVowel: 'po', aksaraOri: 'ꦺꦲꦴ', aksaraConv: 'ꦺꦥꦴ', label: 'o (dibaca ho) ⇄ po' },
    };

    if (initialVowels[firstCharLower]) {
      const info = initialVowels[firstCharLower];
      const isUpper = firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
      const nextChar = text.charAt(index + 1);
      const isNextUpper = nextChar && nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();

      let formattedReplacement = info.pVowel;
      if (isUpper && (isNextUpper || !nextChar || !/[a-zA-Z]/.test(nextChar))) {
        formattedReplacement = info.pVowel.toUpperCase();
      } else if (isUpper) {
        formattedReplacement = info.pVowel.charAt(0).toUpperCase() + info.pVowel.slice(1);
      }

      return {
        replacement: formattedReplacement,
        rule: info.label,
        group: '1 ⇄ 3',
        consumedChars: 1,
        aksaraOriginal: info.aksaraOri,
        aksaraConverted: info.aksaraConv,
      };
    }
  }

  // 1. Check 2-letter digraphs first (dh, th, ny, ng)
  if (remainingLower.startsWith('dh')) {
    const raw = remaining.slice(0, 2);
    const converted = applyCasing(raw, 'n');
    return {
      replacement: converted,
      rule: 'dh ⇄ n',
      group: '1 ⇄ 3',
      consumedChars: 2,
      aksaraOriginal: 'ꦝ',
      aksaraConverted: 'ꦤ',
    };
  }

  if (remainingLower.startsWith('th')) {
    const raw = remaining.slice(0, 2);
    const converted = applyCasing(raw, 'w');
    return {
      replacement: converted,
      rule: 'th ⇄ w',
      group: '2 ⇄ 4',
      consumedChars: 2,
      aksaraOriginal: 'ꦛ',
      aksaraConverted: 'ꦮ',
    };
  }

  if (remainingLower.startsWith('ny')) {
    const raw = remaining.slice(0, 2);
    const converted = applyCasing(raw, 'k');
    return {
      replacement: converted,
      rule: 'ny ⇄ k',
      group: '1 ⇄ 3',
      consumedChars: 2,
      aksaraOriginal: 'ꦚ',
      aksaraConverted: 'ꦏ',
    };
  }

  if (remainingLower.startsWith('ng')) {
    const raw = remaining.slice(0, 2);
    const converted = applyCasing(raw, 'l');
    return {
      replacement: converted,
      rule: 'ng ⇄ l',
      group: '2 ⇄ 4',
      consumedChars: 2,
      aksaraOriginal: 'ꦔ',
      aksaraConverted: 'ꦭ',
    };
  }

  // 2. Check 1-letter consonants
  const char1Lower = remainingLower.charAt(0);
  const raw1 = remaining.charAt(0);

  // Row 1 ⇄ Row 3
  if (char1Lower === 'h') {
    return {
      replacement: applyCasing(raw1, 'p'),
      rule: 'h ⇄ p',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦲ',
      aksaraConverted: 'ꦥ',
    };
  }
  if (char1Lower === 'p') {
    return {
      replacement: applyCasing(raw1, 'h'),
      rule: 'p ⇄ h',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦥ',
      aksaraConverted: 'ꦲ',
    };
  }
  if (char1Lower === 'n') {
    const nextChar = remaining.charAt(1);
    const isNextUpper = nextChar && nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
    const isThisUpper = raw1 === raw1.toUpperCase() && raw1 !== raw1.toLowerCase();
    let rep = 'dh';
    if (isThisUpper && isNextUpper) {
      rep = 'DH';
    } else if (isThisUpper) {
      rep = 'Dh';
    }
    return {
      replacement: rep,
      rule: 'n ⇄ dh',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦤ',
      aksaraConverted: 'ꦝ',
    };
  }
  if (char1Lower === 'c') {
    return {
      replacement: applyCasing(raw1, 'j'),
      rule: 'c ⇄ j',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦕ',
      aksaraConverted: 'ꦗ',
    };
  }
  if (char1Lower === 'j') {
    return {
      replacement: applyCasing(raw1, 'c'),
      rule: 'j ⇄ c',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦗ',
      aksaraConverted: 'ꦕ',
    };
  }
  if (char1Lower === 'r') {
    return {
      replacement: applyCasing(raw1, 'y'),
      rule: 'r ⇄ y',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦫ',
      aksaraConverted: 'ꦪ',
    };
  }
  if (char1Lower === 'y') {
    return {
      replacement: applyCasing(raw1, 'r'),
      rule: 'y ⇄ r',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦪ',
      aksaraConverted: 'ꦫ',
    };
  }
  if (char1Lower === 'k') {
    const nextChar = remaining.charAt(1);
    const isNextUpper = nextChar && nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
    const isThisUpper = raw1 === raw1.toUpperCase() && raw1 !== raw1.toLowerCase();
    let rep = 'ny';
    if (isThisUpper && isNextUpper) {
      rep = 'NY';
    } else if (isThisUpper) {
      rep = 'Ny';
    }
    return {
      replacement: rep,
      rule: 'k ⇄ ny',
      group: '1 ⇄ 3',
      consumedChars: 1,
      aksaraOriginal: 'ꦏ',
      aksaraConverted: 'ꦚ',
    };
  }

  // Row 2 ⇄ Row 4
  if (char1Lower === 'd') {
    return {
      replacement: applyCasing(raw1, 'm'),
      rule: 'd ⇄ m',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦢ',
      aksaraConverted: 'ꦩ',
    };
  }
  if (char1Lower === 'm') {
    return {
      replacement: applyCasing(raw1, 'd'),
      rule: 'm ⇄ d',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦩ',
      aksaraConverted: 'ꦢ',
    };
  }
  if (char1Lower === 't') {
    return {
      replacement: applyCasing(raw1, 'g'),
      rule: 't ⇄ g',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦠ',
      aksaraConverted: 'ꦒ',
    };
  }
  if (char1Lower === 'g') {
    return {
      replacement: applyCasing(raw1, 't'),
      rule: 'g ⇄ t',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦒ',
      aksaraConverted: 'ꦠ',
    };
  }
  if (char1Lower === 's') {
    return {
      replacement: applyCasing(raw1, 'b'),
      rule: 's ⇄ b',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦱ',
      aksaraConverted: 'ꦧ',
    };
  }
  if (char1Lower === 'b') {
    return {
      replacement: applyCasing(raw1, 's'),
      rule: 'b ⇄ s',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦧ',
      aksaraConverted: 'ꦱ',
    };
  }
  if (char1Lower === 'w') {
    const nextChar = remaining.charAt(1);
    const isNextUpper = nextChar && nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
    const isThisUpper = raw1 === raw1.toUpperCase() && raw1 !== raw1.toLowerCase();
    let rep = 'th';
    if (isThisUpper && isNextUpper) {
      rep = 'TH';
    } else if (isThisUpper) {
      rep = 'Th';
    }
    return {
      replacement: rep,
      rule: 'w ⇄ th',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦮ',
      aksaraConverted: 'ꦛ',
    };
  }
  if (char1Lower === 'l') {
    const nextChar = remaining.charAt(1);
    const isNextUpper = nextChar && nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
    const isThisUpper = raw1 === raw1.toUpperCase() && raw1 !== raw1.toLowerCase();
    let rep = 'ng';
    if (isThisUpper && isNextUpper) {
      rep = 'NG';
    } else if (isThisUpper) {
      rep = 'Ng';
    }
    return {
      replacement: rep,
      rule: 'l ⇄ ng',
      group: '2 ⇄ 4',
      consumedChars: 1,
      aksaraOriginal: 'ꦭ',
      aksaraConverted: 'ꦔ',
    };
  }

  return null;
}

/**
 * Converts text into Basa Walikan and returns both the full output string
 * and token breakdown for interactive visualization.
 */
export function convertBasaWalikan(
  inputText: string,
  options?: { initialVowelAsHa?: boolean }
): {
  outputText: string;
  tokens: WalikanToken[];
  stats: {
    totalChars: number;
    changedChars: number;
    words: number;
  };
} {
  const initialVowelAsHa = options?.initialVowelAsHa ?? true;

  if (!inputText) {
    return {
      outputText: '',
      tokens: [],
      stats: { totalChars: 0, changedChars: 0, words: 0 },
    };
  }

  const tokens: WalikanToken[] = [];
  let outputText = '';
  let index = 0;
  let tokenCounter = 0;
  let changedChars = 0;

  while (index < inputText.length) {
    const mapping = findPhonemeMapping(inputText, index, initialVowelAsHa);

    if (mapping) {
      const originalSlice = inputText.slice(index, index + mapping.consumedChars);
      tokens.push({
        id: `token-${tokenCounter++}`,
        original: originalSlice,
        converted: mapping.replacement,
        rule: mapping.rule,
        isChanged: true,
        rowPair: mapping.group,
        aksaraOriginal: mapping.aksaraOriginal,
        aksaraConverted: mapping.aksaraConverted,
      });
      outputText += mapping.replacement;
      changedChars += mapping.consumedChars;
      index += mapping.consumedChars;
    } else {
      const char = inputText.charAt(index);
      const isVowel = /[aiueoéèAIUEOÉÈ]/.test(char);
      const isWhitespace = /\s/.test(char);

      let rule = 'Karakter lain';
      if (isVowel) rule = 'Vokal tengah/akhir (Tetap)';
      else if (isWhitespace) rule = 'Spasi';

      tokens.push({
        id: `token-${tokenCounter++}`,
        original: char,
        converted: char,
        rule,
        isChanged: false,
      });
      outputText += char;
      index++;
    }
  }

  const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return {
    outputText,
    tokens,
    stats: {
      totalChars: inputText.length,
      changedChars,
      words,
    },
  };
}

/**
 * Transliterates Indonesian/Javanese Latin text to Aksara Jawa Unicode.
 * Provides a faithful visual representation of Javanese script.
 */
export function latinToAksaraJawa(latin: string): string {
  if (!latin.trim()) return '';

  const carakanMap: Record<string, string> = {
    ha: 'ꦲ', na: 'ꦤ', ca: 'ꦕ', ra: 'ꦫ', ka: 'ꦏ',
    da: 'ꦢ', ta: 'ꦠ', sa: 'ꦱ', wa: 'ꦮ', la: 'ꦭ',
    pa: 'ꦥ', dha: 'ꦝ', ja: 'ꦗ', ya: 'ꦪ', nya: 'ꦚ',
    ma: 'ꦩ', ga: 'ꦒ', ba: 'ꦧ', tha: 'ꦛ', nga: 'ꦔ',
    h: 'ꦲ', n: 'ꦤ', c: 'ꦕ', r: 'ꦫ', k: 'ꦏ',
    d: 'ꦢ', t: 'ꦠ', s: 'ꦱ', w: 'ꦮ', l: 'ꦭ',
    p: 'ꦥ', dh: 'ꦝ', j: 'ꦗ', y: 'ꦪ', ny: 'ꦚ',
    m: 'ꦩ', g: 'ꦒ', b: 'ꦧ', th: 'ꦛ', ng: 'ꦔ',
  };

  const vowelMap: Record<string, string> = {
    i: 'ꦶ',
    u: 'ꦸ',
    e: 'ꦼ',
    é: 'ꦺ',
    è: 'ꦺ',
    o: 'ꦺꦴ',
  };

  const pangkon = '꧀';

  let result = '';
  const text = latin.toLowerCase();
  let i = 0;

  while (i < text.length) {
    const slice3 = text.slice(i, i + 3);
    const slice2 = text.slice(i, i + 2);
    const char = text.charAt(i);

    if (/\s/.test(char)) {
      result += ' ';
      i++;
      continue;
    }

    if (/[.,!?;:-]/.test(char)) {
      result += char;
      i++;
      continue;
    }

    let consonant = '';
    let consLen = 0;

    if (['dha', 'dhi', 'dhu', 'dhe', 'dho', 'tha', 'thi', 'thu', 'the', 'tho', 'nya', 'nyi', 'nyu', 'nye', 'nyo', 'nga', 'ngi', 'ngu', 'nge', 'ngo'].includes(slice3)) {
      consonant = slice3.slice(0, 2);
      consLen = 2;
    } else if (['dh', 'th', 'ny', 'ng'].includes(slice2)) {
      consonant = slice2;
      consLen = 2;
    } else if (carakanMap[char]) {
      consonant = char;
      consLen = 1;
    }

    if (consonant) {
      const baseAksara = carakanMap[consonant] || 'ꦲ';
      const afterConsonant = text.charAt(i + consLen);

      if (['a', 'i', 'u', 'e', 'é', 'è', 'o'].includes(afterConsonant)) {
        if (afterConsonant === 'a') {
          result += baseAksara;
        } else if (afterConsonant === 'o') {
          result += 'ꦺ' + baseAksara + 'ꦴ';
        } else if (afterConsonant === 'é' || afterConsonant === 'è') {
          result += 'ꦺ' + baseAksara;
        } else {
          result += baseAksara + (vowelMap[afterConsonant] || '');
        }
        i += consLen + 1;
      } else {
        const nextChar = text.charAt(i + consLen);
        if (!nextChar || /\s|[.,!?;:-]/.test(nextChar)) {
          if (consonant === 'h') result += 'ꦃ';
          else if (consonant === 'r') result += 'ꦂ';
          else if (consonant === 'ng') result += 'ꦁ';
          else result += baseAksara + pangkon;
        } else {
          result += baseAksara + pangkon;
        }
        i += consLen;
      }
    } else if (['a', 'i', 'u', 'e', 'é', 'è', 'o'].includes(char)) {
      if (char === 'a') result += 'ꦲ';
      else if (char === 'o') result += 'ꦺꦲꦴ';
      else if (char === 'é' || char === 'è') result += 'ꦺꦲ';
      else result += 'ꦲ' + (vowelMap[char] || '');
      i++;
    } else {
      result += char;
      i++;
    }
  }

  return result;
}
