// Structural edits on the exported Framer bundle (minified ES modules + SSR HTML).
//
// Every JSX element in the compiled modules is a call annotated with
// `/*#__PURE__*/ fn(Component,{props…})`. To remove an element we locate the
// innermost such call that encloses a unique anchor (e.g. its className) and
// replace the whole call with `null`, which React renders as nothing.
// The matching server-rendered element is removed from the HTML so hydration
// still lines up.

const PURE = "/*#__PURE__*/ ";

// Index of the bracket that closes the one at `open` ( "(" "[" "{" ),
// skipping strings, template literals (with nested ${…}), comments and regexes.
export function matchBracket(src, open) {
  const pairs = { "(": ")", "[": "]", "{": "}" };
  const stack = [pairs[src[open]]];
  let i = open + 1;
  const tplStack = []; // depth of `{` stack when a ${ started inside a template
  while (i < src.length) {
    const c = src[i];
    if (c === "'" || c === '"') {
      i++;
      while (src[i] !== c) i += src[i] === "\\" ? 2 : 1;
      i++;
      continue;
    }
    if (c === "`") {
      i = skipTemplate(src, i + 1, tplStack, stack);
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      i = src.indexOf("*/", i + 2) + 2;
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = src.indexOf("\n", i);
      continue;
    }
    if (c === "/" && /[(,=:[!&|?{};]\s*$/.test(src.slice(Math.max(0, i - 3), i))) {
      // regex literal
      i++;
      let cls = false;
      while (i < src.length) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === "[") cls = true;
        else if (src[i] === "]") cls = false;
        else if (src[i] === "/" && !cls) break;
        i++;
      }
      i++;
      continue;
    }
    if (pairs[c]) stack.push(pairs[c]);
    else if (c === ")" || c === "]" || c === "}") {
      if (c === "}" && tplStack.length && tplStack[tplStack.length - 1] === stack.length) {
        // end of ${…} inside a template literal: resume the template
        tplStack.pop();
        stack.pop();
        i = skipTemplate(src, i + 1, tplStack, stack);
        continue;
      }
      if (stack.pop() !== c) throw new Error(`bracket mismatch at ${i}`);
      if (!stack.length) return i;
    }
    i++;
  }
  throw new Error("unclosed bracket");
}

function skipTemplate(src, i, tplStack, stack) {
  while (i < src.length) {
    if (src[i] === "\\") { i += 2; continue; }
    if (src[i] === "`") return i + 1;
    if (src[i] === "$" && src[i + 1] === "{") {
      stack.push("}");
      tplStack.push(stack.length);
      return i + 2;
    }
    i++;
  }
  throw new Error("unclosed template");
}

// [start, end) of the innermost PURE call enclosing src.indexOf(anchor).
export function callRange(src, anchor) {
  const at = src.indexOf(anchor);
  if (at < 0) throw new Error(`anchor not found: ${anchor}`);
  if (src.indexOf(anchor, at + 1) >= 0) throw new Error(`anchor not unique: ${anchor}`);
  let s = src.lastIndexOf(PURE, at);
  while (s >= 0) {
    const open = src.indexOf("(", s + PURE.length);
    const end = matchBracket(src, open);
    if (end > at) return [s, end + 1];
    s = src.lastIndexOf(PURE, s - 1);
  }
  throw new Error(`no enclosing call for ${anchor}`);
}

export function removeCall(src, anchor) {
  const [s, e] = callRange(src, anchor);
  return src.slice(0, s) + "null" + src.slice(e);
}

// Remove the innermost call around every occurrence of a (possibly repeated) anchor.
export function removeAllCalls(src, anchor) {
  let count = 0;
  for (let at = src.indexOf(anchor); at >= 0; at = src.indexOf(anchor)) {
    let s = src.lastIndexOf(PURE, at), range;
    while (s >= 0 && !range) {
      const end = matchBracket(src, src.indexOf("(", s + PURE.length));
      if (end > at) range = [s, end + 1];
      else s = src.lastIndexOf(PURE, s - 1);
    }
    if (!range) throw new Error(`no enclosing call for ${anchor}`);
    src = src.slice(0, range[0]) + "null" + src.slice(range[1]);
    count++;
  }
  return { src, count };
}

// Framer's hydration data (<script id="__framer__handoverData">) is a flat
// devalue-style array: objects/arrays hold indices into the same array.
// Drop entries from the root query Map and blank every string that is no
// longer reachable, so removed content doesn't linger in the page source.
export function pruneHandover(html, dropIf) {
  const re = /(<script type="framer\/handover" id="__framer__handoverData">)(.*?)(<\/script>)/s;
  const m = re.exec(html);
  if (!m) throw new Error("handover data not found");
  const a = JSON.parse(m[2]);
  const strings = (i, seen = new Set(), out = []) => {
    if (seen.has(i) || typeof i !== "number" || i < 0) return out;
    seen.add(i);
    const v = a[i];
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.slice(typeof v[0] === "string" ? 1 : 0).forEach((x) => strings(x, seen, out));
    else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, seen, out));
    return out;
  };
  const map = a[a[0]["0"]]; // ["Map", k1, v1, k2, v2, …]
  let dropped = 0;
  for (let i = map.length - 2; i >= 1; i -= 2) {
    if (dropIf(a[map[i]], strings(map[i + 1]))) { map.splice(i, 2); dropped++; }
  }
  const reach = new Set();
  const mark = (i) => {
    if (reach.has(i) || typeof i !== "number" || i < 0) return;
    reach.add(i);
    const v = a[i];
    if (Array.isArray(v)) v.slice(typeof v[0] === "string" ? 1 : 0).forEach(mark);
    else if (v && typeof v === "object") Object.values(v).forEach(mark);
  };
  mark(0);
  let blanked = 0;
  a.forEach((v, i) => { if (!reach.has(i) && typeof v === "string" && v) { a[i] = ""; blanked++; } });
  const json = JSON.stringify(a).replace(/</g, "\\u003c");
  return { html: html.replace(re, (_, o, __, c) => o + json + c), dropped, blanked };
}

// Remove the HTML element whose start tag contains `anchor` (all occurrences),
// together with directly surrounding React Suspense markers <!--$--> … <!--/$-->.
export function removeHtmlElement(html, anchor) {
  let count = 0;
  for (;;) {
    const at = html.indexOf(anchor);
    if (at < 0) break;
    const start = html.lastIndexOf("<", at);
    const tag = /^<([a-zA-Z0-9-]+)/.exec(html.slice(start))[1];
    const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
    re.lastIndex = start + 1;
    let depth = 1, m, end;
    while ((m = re.exec(html))) {
      depth += m[0].startsWith("</") ? -1 : 1;
      if (!depth) { end = m.index + m[0].length; break; }
    }
    if (end === undefined) throw new Error(`unbalanced <${tag}> for ${anchor}`);
    let s = start, e = end;
    if (html.slice(s - 8, s) === "<!--$-->" && html.slice(e, e + 9) === "<!--/$-->") { s -= 8; e += 9; }
    html = html.slice(0, s) + html.slice(e);
    count++;
  }
  return { html, count };
}
