// Converts a PNG screenshot to JPEG (optionally downscaled) using headless Chrome's canvas.
// Usage: node tojpg.js input.png output.jpg [maxWidth]
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const [, , src, out, maxW] = process.argv;
const CH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const abs = path.resolve(src).replace(/\\/g, "/").replace(/ /g, "%20");
const html = '<!doctype html><meta charset="utf-8"><img id="i" src="file:///' + abs + '"><pre id="o"></pre><script>' +
  'var i=document.getElementById("i");i.onload=function(){var w=Math.min(i.naturalWidth,' + (parseInt(maxW, 10) || 1280) + ');var s=w/i.naturalWidth;' +
  'var c=document.createElement("canvas");c.width=w;c.height=Math.round(i.naturalHeight*s);c.getContext("2d").drawImage(i,0,0,c.width,c.height);' +
  'document.getElementById("o").textContent=c.toDataURL("image/jpeg",0.82);};</script>';
const tmp = path.join(process.env.TEMP, "ik-conv-" + Date.now() + ".html");
fs.writeFileSync(tmp, html);
const dom = execFileSync(CH, [
  "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-first-run",
  "--user-data-dir=" + path.join(process.env.TEMP, "ik-conv-profile"),
  "--virtual-time-budget=8000", "--dump-dom", "file:///" + tmp.replace(/\\/g, "/")
], { maxBuffer: 64 * 1024 * 1024 }).toString();
fs.unlinkSync(tmp);
const m = dom.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/);
if (!m) { console.error("no image data produced for " + src); process.exit(1); }
fs.writeFileSync(out, Buffer.from(m[1], "base64"));
console.log("wrote " + out + " (" + fs.statSync(out).size + " bytes)");
