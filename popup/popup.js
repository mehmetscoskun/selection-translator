const selectText = document.getElementById('selectText');
selectText.style.backgroundColor = 'blue';

selectText.addEventListener('click', async () => {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			function: setSelectedText
		},
		injResult => {
			document.getElementById('selectedTextContent').textContent = injResult[0].result;
		}
	);
});

const setSelectedText = () => {
	const selectedText = window.getSelection().toString();

	return selectedText;
};
