/**
 * Kill tabs in the background.
 */
browser.tabs.onActivated.addListener(kill_tabs);

function kill_tabs() {
	browser.tabs.query({currentWindow: true}).then(function (tabs) {
		if (!tabs.length) return;

		tabs.map(function(o){
			return {"url": o.url.split("#")[0], "id": o.id}; //!
		}).forEach(function(item, i, arr){
			let z = tabs.filter(function(o) {
				if (item.url == o.url)
					return o.id;
			}).map(function(o) {
				return o.id;
			});

			if (!z.length) return;

			z.shift();
			browser.tabs.remove(z);
		});
	});
}
