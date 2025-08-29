async function getData() {
    let response = await fetch('/t');

    let data = await response.json();
    createTable(data);
    

}

function createTable(data){
    let txt="";
    for (obj of data){
        if(obj){
            txt += `<tr>` 
            txt+= `<td>${obj.id}</td>`;
            txt+= `<td>${obj.text}</td>`;
            txt+= `<td>${obj.isDone}</td>`;
            txt+= `<td><button>✏️</button</td>`;
            txt+= `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `</tr>` ;
        }
    }
    document.getElementById('myTable').innerHTML= txt;
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

getData();