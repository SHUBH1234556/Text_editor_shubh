// Function to format text content with or without a value
function formatDoc(cmd, value = null) {
	if (value) {
	  document.execCommand(cmd, false, value);
	} else {
	  document.execCommand(cmd);
	}
  }
  
  // Function to add a hyperlink to the selected text
  function addLink() {
	const url = prompt('Insert URL');
	if (url !== null && url !== '') {
	  formatDoc('createLink', url);
	}
  }
  
  // Get the content element by its ID
  const content = document.getElementById('content');
  
  // Add event listeners for mouseenter and mouseleave on anchor elements within the content
  content.addEventListener('mouseenter', function () {
	const anchors = content.querySelectorAll('a');
	anchors.forEach(anchor => {
	  anchor.addEventListener('mouseenter', function () {
		// Disable content editing and open links in a new tab when hovered over
		content.setAttribute('contenteditable', 'false');
		anchor.target = '_blank';
	  });
	  anchor.addEventListener('mouseleave', function () {
		// Re-enable content editing when the mouse leaves the anchor
		content.setAttribute('contenteditable', 'true');
	  });
	});
  });
  
  // Get the show code button by its ID
  const showCode = document.getElementById('show-code');
  let codeViewActive = false;
  
  // Add a click event listener to toggle code view
  showCode.addEventListener('click', function () {
	codeViewActive = !codeViewActive;
	showCode.dataset.active = codeViewActive;
	
	if (codeViewActive) {
	  // Display the HTML tags as text
	  content.textContent = content.innerHTML;
	  content.setAttribute('contenteditable', 'false');
	} else {
	  // Restore the content to its original HTML
	  content.innerHTML = content.textContent;
	  content.setAttribute('contenteditable', 'true');
	}
  });
  
  // Get the filename input field by its ID
  const filename = document.getElementById('filename');
  
  // Function to handle file export
  function fileHandle(value) {
	if (value === 'new') {
	  // Clear the content and set the filename to 'untitled'
	  content.innerHTML = '';
	  filename.value = 'untitled';
	} else if (value === 'txt') {
	  // Convert content to a text blob and provide a download link for a text file
	  const blob = new Blob([content.innerText], { type: 'text/plain' });
	  const url = URL.createObjectURL(blob);
	  const link = document.createElement('a');
	  link.href = url;
	  link.download = `${filename.value}.txt`;
	  link.click();
	} else if (value === 'pdf') {
	  // Save content as a PDF file using an external library (html2pdf)
	  // Ensure you've imported and initialized the library before using this feature
	  html2pdf().from(content).save();
	}
  }
  