// function injectFieldNames() {
//     const formElements = document.querySelectorAll('input, textarea');
    
//     formElements.forEach(element => {
//       const wrapper = document.createElement('div');
//       wrapper.style.display = 'flex';
//       wrapper.style.alignItems = 'center';
//       wrapper.style.marginBottom = '5px';
  
//       const input = document.createElement('input');
//       input.type = 'text';
//       input.placeholder = 'Field name';
//       input.style.marginLeft = '5px';
//       input.style.flexGrow = '1';
  
//       const button = document.createElement('button');
//       button.innerText = 'Autofill';
//       button.style.marginLeft = '5px';
  
//       button.addEventListener('click', () => {
//         const fieldName = input.value.trim().toLowerCase();
//         console.log(fieldName);
//         if (fieldName) {
//           chrome.runtime.sendMessage({ action: 'fetchData', key: fieldName }, (response) => {
//             if (response.status === 'success' && response.data) {
//               element.value = response.data;
//             } else {
//               alert('No data found for the given field name.');
//             }
//           });
//         } else {
//           alert('Please enter a field name.');
//         }
//       });
  
//       wrapper.appendChild(element.cloneNode(true));
//       wrapper.appendChild(input);
//       wrapper.appendChild(button);
  
//       element.parentNode.replaceChild(wrapper, element);
//     });
//   }
  
//   injectFieldNames();
  