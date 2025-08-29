async function getData() {
    let response = await fetch('/t');

    let data = await response.json();
    createTable(data);
    

}

function createTable(data) {
    let txt = "";
    for (let obj of data) {
        if (obj) {
            txt += `<tr>` 
            txt+= `<td>${obj.id}</td>`;
            txt+= `<td>${obj.text}</td>`;
            txt+= `<td>
                      <input type="checkbox" ${obj.isDone ? "checked" : ""} 
                        onchange="toggleTask(${obj.id}, this.checked)">
                   </td>`;
            txt+= `<td><button onclick="editTask(${obj.id}, this)">✏️</button></td>`;
            txt+= `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `</tr>` ;
        }
    }
    document.getElementById('myTable').innerHTML = txt;
}


async function addTasx() {
   
    try{
        let txt =document.getElementById('txt').value;
        let response = await fetch('/t',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({txt})
      })
    //   if(response.ok){
    //     alert("נוסף בהצלחה")
    //   }
    if(response.status==201){
        alert("נוסף בהצלחה");
    }
     getData();
     document.getElementById('txt').value="";
    }catch(err){
        alert(err);
    }

}
async function deleteTask(id) {
    if (!confirm("למחוק את המשימה?")) return;
    try {
        let response = await fetch(`/t/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            alert("נמחק בהצלחה");
            getData(); 
        } else {
            let res = await response.json();
            alert("שגיאה: " + res.message);
        }
    } catch (err) {
        alert("שגיאה: " + err);
    }
}

function editTask(id, btn) {
    const row = btn.closest('tr');
    const currentText = row.cells[1].innerText;

    const input = document.getElementById("txt");
    input.value = currentText;
    input.focus();

    const addBtn = document.getElementById("addBtn");
    addBtn.textContent = "send";
    addBtn.onclick = function () { updateTask(id); };
}

async function updateTask(id) {
    let newText = document.getElementById("txt").value;
    if (!newText) return alert("לא הכנסת טקסט");

    let response = await fetch(`/t/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txt: newText })
    });
    if (response.ok) {
        alert("עודכן בהצלחה");
        document.getElementById("txt").value = "";
        document.querySelector("button").onclick = addTasx; 
        getData();
    }
}


async function toggleTask(id, isDone) {
    let response = await fetch(`/t/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone })
    });
    if (response.ok) {
        getData();
    }
}
function searchTasks() {
    let filter = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#myTable tr");
    rows.forEach(row => {
        let text = row.cells[1].innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}


getData();