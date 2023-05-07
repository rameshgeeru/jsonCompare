function handleFileSelect() {
    var file = document.getElementById("file").files[0];
    if(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            var csv = event.target.result;
            displayCSV(csv);
        }
    }
}

function displayCSV(csv) {
    var table = document.createElement("table");
    var rows = csv.split("\n");
    for(var i = 0; i < rows.length-1; i++) {
        var cells = rows[i].split(",");
        if(i == 0) {
            var headerRow = document.createElement("tr");
            for(var j = 0; j < cells.length; j++) {
                var headerCell = document.createElement("th");
                headerCell.innerHTML = cells[j];
                headerRow.appendChild(headerCell);
            }
            table.appendChild(headerRow);
        } else {
            var row = document.createElement("tr");
            for(var j = 0; j < cells.length; j++) {
                var cell = document.createElement("td");
                cell.innerHTML = cells[j];
                row.appendChild(cell);
            }
            var deleteCell = document.createElement("td");
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("onclick", "handleDelete(this)");
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
            table.appendChild(row);
            
        }
    }
    document.getElementById("csv-table").innerHTML = "";
    document.getElementById("csv-table").appendChild(table);
}