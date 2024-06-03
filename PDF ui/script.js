async function compareFiles() {
    const url = "http://localhost:8080/api/compare"; // Replace with your API endpoint
  
    // Get file references and validate
    const fileInput1 = document.getElementById("file1");
    const fileInput2 = document.getElementById("file2");
  
    if (!fileInput1.files.length || !fileInput2.files.length) {
      throw new Error("Please select both files");
    }
  
    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];
  
    if (!file1.type.match("application/pdf") || !file2.type.match("application/pdf")) {
      throw new Error("Only PDF files are allowed");
    }
  
    // Create formData and make the request
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // Ensure response is JSON
  
      // Process the response data
      let message = "";
      const ol = document.createElement('ol');
      if (data.mismatchList?.length === 0) {
        message = "The files are identical!";
      } else {
        message = data.numoOfMismatch+` Differences found:\n`;
        for (const diff of data.mismatchList) {
          //message += `- ${diff}\n`;
          const li = document.createElement('li'); // Create a <li> element
          li.textContent = diff; // Set the text content of <li> to the current element
          ol.appendChild(li); // Append <li> to <ul>
        }
        document.body.appendChild(ol);
      }
  
      // Display the message
      document.getElementById("result").textContent = message;
    } catch (error) {
      document.getElementById("result").textContent = `Error: ${error.message}`;
    }
  }
  