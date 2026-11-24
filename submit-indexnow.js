// Automated IndexNow Submission Script
// Submits all site URLs to Bing & IndexNow API for instant indexing.
const https = require("https");
const fs = require("fs");
const path = require("path");

const HOST = "www.calipartner.site";
const KEY = "b8f9a2e64c1d30587e9b0a2f4c6d8e1a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read all URLs from sitemap.xml
const sitemap = fs.readFileSync(path.join(__dirname, "sitemap.xml"), "utf8");
const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g);
if (!urlMatches || urlMatches.length === 0) {
  console.error("No URLs found in sitemap.xml");
  process.exit(1);
}

const urlList = urlMatches.map((m) => m.replace(/<\/?loc>/g, "").trim());
console.log(`Found ${urlList.length} URLs to submit to IndexNow.`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList,
});

const endpoints = [
  { hostname: "api.indexnow.org", path: "/indexnow" },
  { hostname: "www.bing.com", path: "/indexnow" },
];

function submitToEndpoint(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: endpoint.hostname,
      port: 443,
      path: endpoint.path,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log(`[${endpoint.hostname}] Response Status: ${res.statusCode} ${res.statusMessage || ""}`);
        if (data) {
          console.log(`[${endpoint.hostname}] Body:`, data);
        }
        resolve({ endpoint: endpoint.hostname, status: res.statusCode });
      });
    });

    req.on("error", (err) => {
      console.error(`[${endpoint.hostname}] Request error:`, err.message);
      resolve({ endpoint: endpoint.hostname, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`Submitting IndexNow payload for host: ${HOST}`);
  console.log(`Key location: ${KEY_LOCATION}`);
  for (const ep of endpoints) {
    await submitToEndpoint(ep);
  }
  console.log("IndexNow submission sequence completed.");
}

run();
