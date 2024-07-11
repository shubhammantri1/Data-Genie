document.addEventListener('DOMContentLoaded', function() {
    let db;
  
    // Open (or create) the database
    let request = indexedDB.open('myDatabase', 1);
  
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      let objectStore = db.createObjectStore('dataStore', { keyPath: 'key' });
      objectStore.transaction.oncomplete = function(event) {
        console.log('ObjectStore created.');
      };
    };
  
    request.onsuccess = function(event) {
      db = event.target.result;
      console.log('Database opened.');
    };
  
    request.onerror = function(event) {
      console.log('Error opening database: ', event.target.errorCode);
    };
  
    // Adjust textarea height based on content
    const textarea = document.getElementById('value');
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  
    // Save data to the database
    document.getElementById('saveBtn').addEventListener('click', function() {
      let key = document.getElementById('key').value.toLowerCase();
      let value = document.getElementById('value').value;
      if (key && value) {
        let transaction = db.transaction(['dataStore'], 'readwrite');
        let objectStore = transaction.objectStore('dataStore');
        let request = objectStore.put({ key: key, value: value });
  
        request.onsuccess = function(event) {
          console.log('Data saved.');
          document.getElementById('key').value = '';
          document.getElementById('value').value = '';
          showStatusMessage('Information saved successfully!');
        };
  
        request.onerror = function(event) {
          console.log('Error saving data: ', event.target.errorCode);
        };
      } else {
        alert('Please enter both key and value.');
      }
    });
  
    // Retrieve data from the database
    document.getElementById('retrieveBtn').addEventListener('click', function() {
      let key = document.getElementById('retrieveKey').value.toLowerCase();
      if (key) {
        let transaction = db.transaction(['dataStore'], 'readonly');
        let objectStore = transaction.objectStore('dataStore');
        let request = objectStore.get(key);
  
        request.onsuccess = function(event) {
          if (request.result) {
            let value = request.result.value;
            document.getElementById('result').innerText = value;
            document.getElementById('resultContainer').style.display = 'block';
            document.getElementById('copyBtn').style.display = 'inline';
            document.getElementById('retrieveKey').value = '';
            showStatusMessage('Information retrieved successfully!');
          } else {
            document.getElementById('result').innerText = 'No value found';
            document.getElementById('resultContainer').style.display = 'none';
            document.getElementById('copyBtn').style.display = 'none';
            showStatusMessage('No value found');
          }
        };
  
        request.onerror = function(event) {
          console.log('Error retrieving data: ', event.target.errorCode);
          document.getElementById('result').innerText = 'Error retrieving data';
          document.getElementById('resultContainer').style.display = 'none';
          document.getElementById('copyBtn').style.display = 'none';
        };
      } else {
        alert('Please enter a key.');
      }
    });
  
    // Copy to clipboard
    document.getElementById('copyBtn').addEventListener('click', function() {
      let text = document.getElementById('result').innerText;
      navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
        showStatusMessage('Text copied to clipboard');
      }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showStatusMessage('Failed to copy text');
      });
    });
  
    // Event listeners for tab buttons
    document.getElementById('saveTabButton').addEventListener('click', function(event) {
      openTab(event, 'saveTab');
    });
  
    document.getElementById('retrieveTabButton').addEventListener('click', function(event) {
      openTab(event, 'retrieveTab');
    });
  
    // Initialize the "Retrieve" tab as active
    document.getElementById('retrieveTabButton').click();
  });
  
  // Function to switch between tabs
  function openTab(event, tabName) {
    let i, tabcontent, tabbuttons;
  
    // Hide all tab content
    tabcontent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
  
    // Remove the active class from all tab buttons
    tabbuttons = document.getElementsByClassName('tab-button');
    for (i = 0; i < tabbuttons.length; i++) {
      tabbuttons[i].className = tabbuttons[i].className.replace(' active', '');
    }
  
    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';
  }
  
  // Function to show status message
  function showStatusMessage(message) {
    let statusMessage = document.getElementById('statusMessage');
    statusMessage.innerText = message;
    statusMessage.style.display = 'block';
  
    setTimeout(function() {
      statusMessage.style.display = 'none';
    }, 3000);
  }
  