// Mobile screenshot at a true 430 px layout width. Headless Chrome will not open a window
// narrower than about 500 px, so the page is framed in a 430 px iframe and the window cropped.
// Usage: node mshot.js <page.html> <out.png> [height=900] [width=430]
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const [, , src, out, h = "900", w = "430"] = process.argv;
const CH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = "file:///" + path.resolve(src).replace(/\\/g, "/").replace(/ /g, "%20");
const tmp = path.join(process.env.TEMP, "ik-mshot-" + Date.now() + ".html");
fs.writeFileSync(tmp, '<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}iframe{display:block;border:0;width:' + w + "px;height:" + h + 'px}</style><iframe src="' + url + '"></iframe>');
execFileSync(CH, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
  "--user-data-dir=" + path.join(process.env.TEMP, "ik-shots-profile"), "--window-size=" + w + "," + h, "--virtual-time-budget=15000",
  "--screenshot=" + path.resolve(out), "file:///" + tmp.replace(/\\/g, "/")], { stdio: "ignore" });
fs.unlinkSync(tmp);
console.log("wrote " + out + " (" + fs.statSync(out).size + " bytes)");
