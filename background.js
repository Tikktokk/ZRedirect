const site = "https://kb.evetools.org";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    if (details.originUrl && details.originUrl.match(/^https?:\/\/(\w+\.)?zkillboard.com/)) {
		return;
	}
	return { redirectUrl: site + url.pathname + url.search + url.hash };
  },
  {
    urls: [
      "*://zkillboard.com/kill/*"
    ],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other",
    ],
  },
  ["blocking"]
);
