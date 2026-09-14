// Syntax-checks every inline <script> block in the given HTML files.
// Usage: node check.js file1.html file2.html ...
const fs = require("fs");
const vm = require("vm");
let bad = 0;
for (const f of process.argv.slice(2)) {
  const html = fs.readFileSync(f, "utf8");
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m, n = 0;
  while ((m = re.exec(html))) {
    n++;
    try { new vm.Script(m[1], { filename: f + "#script" + n }); }
    catch (e) { bad++; console.log("SYNTAX ERROR in " + f + " (script " + n + "): " + e.message); }
  }
  const marker = html.includes("<!-- /head -->") ? "marker ok" : "NO HEAD MARKER";
  const openStyle = (html.match(/<style/g) || []).length, closeStyle = (html.match(/<\/style>/g) || []).length;
  console.log(f + ": " + n + " script(s) checked, " + marker + ", style tags " + openStyle + "/" + closeStyle);
}
process.exit(bad ? 1 : 0);
