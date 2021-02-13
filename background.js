let color = "#3aa757";

chrome.runtime.onInstalled.addListener(async () => {
	chrome.storage.sync.set({ color });
	console.log("Default background color set to %cgreen", `color: ${color}`);

	// grant access to console.log in developer mode
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostEquals: "developer.chrome.com" },
					}),
				],
				actions: [new chrome.declarativeContent.ShowPageAction()],
			},
		]);
	});
});
