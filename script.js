function compareObjects1(obj1, obj2) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const differences = [];
    for (const key of allKeys) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (value1 === undefined) {
        differences.push({
          key1: "",
          key2: key,
          value1: "",
          value2: JSON.stringify(value2),
          keyMatching:"KeyNotMatching",
          valueMatching: "ValueNotMatching"
        });
      } else if (value2 === undefined) {
        differences.push({
          key1: key,
          key2: "",
          value1: JSON.stringify(value1),
          value2: "",
          keyMatching:"KeyNotMatching",
          valueMatching: "ValueNotMatching"
        });
      } else if (typeof value1 === "object" && typeof value2 === "object") {
        const childDifferences = compareObjects1(value1, value2);
        if (childDifferences.length > 0) {
          differences.push(...childDifferences);
        } else {
          differences.push({
            key1: key,
            key2: key,
            value1: JSON.stringify(value1),
            value2: JSON.stringify(value2),
            keyMatching:"KeyMatching",
            valueMatching: "ValueMatching"
          });
        }
      } else if (value1 !== value2) {
        differences.push({
          key1: key,
          key2: key,
          value1: JSON.stringify(value1),
          value2: JSON.stringify(value2),
        
          keyMatching:"Matching",
          valueMatching: "ValueNotMatching"
          
        });
      } else {
        differences.push({
          key1: key,
          key2: key,
          value1: JSON.stringify(value1),
          value2: JSON.stringify(value2),
          keyMatching:"Matching",
          valueMatching: "ValueMatching"
          
         
        });
      }
    }
    return differences;
  }
  
  function compareJSON() {
    // Get the contents of the first file
    const file1 = document.getElementById('file1').files[0];
    const reader1 = new FileReader();
    reader1.readAsText(file1);
    reader1.onload = function () {
      const json1 = JSON.parse(reader1.result);
      document.getElementById('json1').innerHTML = JSON.stringify(json1, null, 2);
      // Get the contents of the second file
      const file2 = document.getElementById('file2').files[0];
      const reader2 = new FileReader();
      reader2.readAsText(file2);
      reader2.onload = function () {
        const json2 = JSON.parse(reader2.result);
        document.getElementById('json2').innerHTML = JSON.stringify(json2, null, 2);
        // Compare the two JSON objects
        const differences = compareObjects1(json1, json2);
        function downloadReport() {
            
        
        // Generate the Excel report
        const workbook = XLSX.utils.book_new();
        // Create a worksheet for the differences
        const worksheet = XLSX.utils.json_to_sheet(differences);
        // Add headers to the worksheet
        XLSX.utils.sheet_add_aoa(worksheet, [['Key 1', 'Key 2', 'Value1 ', 'Value2 ']]);
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Differences');
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, 'differences.xlsx');
      }document.getElementById('download-btn').addEventListener('click', downloadReport);
    }
  }
}