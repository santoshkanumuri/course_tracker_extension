chrome.webNavigation.onCompleted.addListener(function(details) {
  // Check if the URL matches the desired URL
  if (details.url === "https://registration.texastech.edu/StudentRegistrationSsb/ssb/classRegistration/classRegistration") {
      // Inject the content script into the tab
      chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ['content.js']
      });
  }
}, {url: [{urlEquals: "https://registration.texastech.edu/StudentRegistrationSsb/ssb/classRegistration/classRegistration"}]});
