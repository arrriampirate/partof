export function translit(text, divider) {
  divider = divider || '';
  text = text.toLowerCase();

  const transl = [];
  let result = '';
  let i;

  transl['а'] = 'a';
  transl['б'] = 'b';
  transl['в'] = 'v';
  transl['г'] = 'g';
  transl['д'] = 'd';
  transl['е'] = 'e';
  transl['ё'] = 'yo';
  transl['ж'] = 'zh';
  transl['з'] = 'z';
  transl['и'] = 'i';
  transl['й'] = 'j';
  transl['к'] = 'k';
  transl['л'] = 'l';
  transl['м'] = 'm';
  transl['н'] = 'n';
  transl['о'] = 'o';
  transl['п'] = 'p';
  transl['р'] = 'r';
  transl['с'] = 's';
  transl['т'] = 't';
  transl['у'] = 'u';
  transl['ф'] = 'f';
  transl['х'] = 'h';
  transl['ц'] = 'c';
  transl['ч'] = 'ch';
  transl['ш'] = 'sh';
  transl['щ'] = 'sh';
  transl['ъ'] = '';
  transl['ы'] = 'y';
  transl['ь'] = '';
  transl['э'] = 'e';
  transl['ю'] = 'yu';
  transl['я'] = 'ya';
  transl['"'] = '';
  transl['_'] = '-';
  transl['\''] = '';
  transl['*'] = '';
  transl['\/'] = '';
  transl[':'] = '';
  transl[';'] = '';
  transl['{'] = '';
  transl[']'] = '';
  transl['['] = '';
  transl['}'] = '';
  transl['«'] = '';
  transl['»'] = '';
  transl['&'] = '';
  transl['?'] = '';
  transl['.'] = '';
  transl[','] = '';
  transl['!'] = '';
  transl['~'] = '';
  transl['`'] = '';
  transl['“'] = '';
  transl['”'] = '';
  transl['—'] = '-';
  transl['%'] = '';
  transl['$'] = '';
  transl['–'] = '-';
  transl['@'] = '';
  transl['#'] = '';
  transl['№'] = '-';
  transl['^'] = '';
  transl['#'] = '';
  transl[' '] = divider;
  for (i = 0; i < text.length; i++) {
    if (transl[text[i]] !== undefined) {
      result += transl[text[i]];
    } else {
      result += text[i];
    }
  }
  return result;
}

export function getPath(image) {
  return `/uploads/${image.section}/${image.src}`;
}