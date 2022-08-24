let id = "no";

displayTask();

function addTask(){
    
    let task = document.getElementById("search").value;

    if(task == ''){
        alert(`Please enter a task!`);
    }
    else{
        
        if(id=='no'){
            let taskArray = getTask();
            if(taskArray == null){
                let data = [task];
                setTask(data);
            } 
            else{
                taskArray.push(task);
                setTask(taskArray);
            }
        }
        else{

            let taskArray = getTask();
            taskArray[id] = task;
            setTask(taskArray);
        }
        displayTask();
    }
 
    document.getElementById("search").value = '';
}

function displayTask(){

    let rowData = getTask();

    if(rowData !== null){
        
        let rowList = ''; 
        let serialNumber = 1;

        for(let row in rowData){
            rowList = rowList + `<tr><td>${serialNumber}</td><td>${rowData[row]}</td><td><a href="javascript:void(0)" onclick="editTask(${row})"><i class="fa-solid fa-pen" style="color:black;"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="deleteTask(${row})"><i class="fa-solid fa-trash" style="font-size:20px;color:red;"></i></a></td></tr>`;
            serialNumber++;
        }
        document.getElementById('rowsData').innerHTML=rowList;
    }

}

function editTask(rowID){
    id = rowID;
    let taskArray = getTask();
    document.getElementById('search').value = taskArray[rowID];
}

function deleteTask(rowID){
    let taskArray = getTask();
    taskArray.splice(rowID,1);
    setTask(taskArray);
    displayTask();
}

function searchTask(){

    let taskArray = getTask();
    let searchQuery = document.getElementById('search').value;
    let rowSelector = [];
    let selectRow = '';

    for(let q=0;q<taskArray.length;q++){
        if(searchQuery == taskArray[q]){
            rowSelector.push(q);
        }
    }

    for(let k=0;k<rowSelector.length;k++){
        let data = rowSelector[k];
            selectRow = selectRow + `<tr><td>${data+1}</td><td>${taskArray[data]}</td><td><a href="javascript:void(0)" onclick="editTask(${data})"><i class="fa-solid fa-pen" style="color:black;"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="deleteTask(${data})"><i class="fa-solid fa-trash" style="font-size:20px;color:red;"></i></a></td></tr>`;
    }

    document.getElementById('rowsData').innerHTML = selectRow;

    document.getElementById('search').value = '';

}

function getTask(){
    let dataArray = JSON.parse(localStorage.getItem('task'));
    return dataArray;
}

function setTask(dataArray){
    localStorage.setItem('task',JSON.stringify(dataArray));
}
