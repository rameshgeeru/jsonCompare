function handleAppend() {
    var newData = document.getElementById("new-data").value;
    if(newData) {
        var table = document.getElementById("csv-table");
        var newRow = table.insertRow(table.rows.length);
        var cells = newData.split(",");
        for(var i = 0; i < cells.length; i++) {
            var cell = newRow.insertCell(i);
            cell.innerHTML = cells[i];
        }
        var deleteCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("onclick", "handleDelete(this)");
        deleteCell.appendChild(deleteButton);
        newRow.appendChild(deleteCell);
    }
}



function handleDelete(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
} 

// function downloadCSV() {
    
//     var csvContent = "data:text/csv;charset=utf-8,";
//     var rows = document.querySelectorAll("#csv-table tr");
//     for (var i = 0; i < rows.length; i++) {
//       var cells = rows[i].querySelectorAll("td");
//       var row = "";
//       for (var j = 0; j < cells.length; j++) {
//         row += cells[j].innerText + ",";
//       }
//       row = row.slice(0, -1);
//       csvContent += row + "\r\n";
//     }
  
//     var encodedUri = encodeURI(csvContent);
//     var link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "updated.csv");
//     document.body.appendChild(link);
//     link.click();
//   }
function downloadCSV() {
    var csvContent = "data:text/csv;charset=utf-8,";
    var rows = document.querySelectorAll("#csv-table tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].querySelectorAll("td");
        var row = "";
        for (var j = 0; j < cells.length - 1; j++) { // skip last cell in each row
            row += cells[j].innerText + ",";
        }
        row = row.slice(0, -1);
        csvContent += row + "\r\n";
    }
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "updated.csv");
    document.body.appendChild(link);
    link.click();
}

  