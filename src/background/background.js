/* eslint-disable no-undef */
const tabIdsWithEventListeners = new Set();

function addEventListener() {
	const addedElements = [];

	document.addEventListener('mousedown', _event => {
		addedElements.forEach(element => {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		});
		addedElements.length = 0;
	});

	document.addEventListener('mouseup', _event => {
		const selection = window.getSelection();
		const selectedText = selection && selection.toString();
		if (selectedText) {
			const dv = document.createElement('div');
			dv.style.position = 'absolute';
			dv.style.top = '50px';
			dv.style.left = '50px';
			dv.style.border = 'solid 2px red';
			dv.style.backgroundColor = 'pink';
			dv.id = 'myid';
			dv.innerHTML = selectedText;
			document.body.appendChild(dv);
			addedElements.push(dv);
			console.log(dv);
		} else {
			console.log('NO SELECTION');
		}
	});
}

chrome.runtime.onInstalled.addListener(async () => {
	chrome.tabs.onActivated.addListener(({ tabId, _windowId }) => {
		if (!tabIdsWithEventListeners.has(tabId)) {
			chrome.scripting.executeScript({
				target: { tabId },
				function: addEventListener
			});

			tabIdsWithEventListeners.add(tabId);
		}
	});

	// grant access to console.log in developer mode
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostEquals: 'developer.chrome.com' }
					})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});
