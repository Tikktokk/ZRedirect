const kbSite = "https://kb.evetools.org";
const brSite = "https://br.evetools.org";

function isBrRedirectPath(path) {
	
	// examples URL match
	// https://zkillboard.com/related/30004283/202006282000/
	
	if(path.match(/^\/related\/\d+\/\d+\/?$/)) {
		return true;
	}
	return false;
}
function isKbRedirectPath(path) {
	
	// examples of each URL match
	// https://zkillboard.com/character/90361251/
	// https://zkillboard.com/character/90361251/kills/
	// https://zkillboard.com/character/90361251/losses/
	// https://zkillboard.com/corporation/1831131676/
	// https://zkillboard.com/corporation/1831131676/kills/
	// https://zkillboard.com/corporation/1831131676/losses/
	// https://zkillboard.com/alliance/99005839/
	// https://zkillboard.com/alliance/99005839/kills/
	// https://zkillboard.com/alliance/99005839/losses/
	// https://zkillboard.com/faction/500002/
	// https://zkillboard.com/faction/500002/kills/
	// https://zkillboard.com/faction/500002/losses/
	// https://zkillboard.com/ship/33397/
	// https://zkillboard.com/ship/33397/kills/
	// https://zkillboard.com/ship/33397/kills/
	// https://zkillboard.com/group/830/
	// https://zkillboard.com/group/830/kills/
	// https://zkillboard.com/group/830/losses/
	if(path.match(/^\/(character|corporation|alliance|faction|ship|group)\/\d+(\/(losses|kills))?\/?$/)) {
		return true;
	}
	
	// examples of each URL match
	// https://zkillboard.com/kill/85260689/
	// https://zkillboard.com/system/30004283/
	// https://zkillboard.com/constellation/20000626/
	// https://zkillboard.com/region/10000054/
	if(path.match(/^\/(kill|system|constellation|region)\/\d+\/?$/)) {
		return true;
	}

	return false;
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
	
	//ignore if origin is zkillboard.com or evetools.org
    if (details.originUrl && details.originUrl.match(/^https?:\/\/(\w+\.)?zkillboard.com|evetools.org/)) {
		return;
	}
	
	// try to redirect to killboard
	if(isKbRedirectPath(url.pathname)) {
		return { redirectUrl: kbSite + url.pathname + url.search + url.hash };
	}
	
	// try to redirect to battle report
	if(isBrRedirectPath(url.pathname)) {
		return { redirectUrl: brSite + url.pathname + url.search + url.hash };
	}
  },
  {
    urls: [
      "*://zkillboard.com/*",
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
