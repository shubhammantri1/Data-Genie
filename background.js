chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchData') {
      let db;
      let openRequest = indexedDB.open('myDatabase', 1);
  
      openRequest.onsuccess = function(event) {
        db = openRequest.result;
        let transaction = db.transaction(['dataStore'], 'readonly');
        let objectStore = transaction.objectStore('dataStore');
        let getRequest = objectStore.get(request.key);
  
        getRequest.onsuccess = function(event) {
          if (getRequest.result) {
            sendResponse({ status: 'success', data: getRequest.result.value });
          } else {
            sendResponse({ status: 'error', message: 'No data found' });
          }
        };
  
        getRequest.onerror = function(event) {
          sendResponse({ status: 'error', message: 'Error fetching data' });
        };
      };
  
      openRequest.onerror = function(event) {
        sendResponse({ status: 'error', message: 'Error opening database' });
      };
  
      return true; // Keep the message channel open for sendResponse
    }
  });
  