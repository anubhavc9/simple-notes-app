console.log("Welcome to notes app. This is app.js");

showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        imp: 0 // by default, all the newly added notes are not important
    }

    notesObj.push(myObj); // notesObj is an array of objects

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    // console.log(notesObj);
    showNotes();
});


// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        // if the imp field for this note is set to 0, don't modify it. Else, make modifications.
        if(notesObj[index]["imp"] == 0){
            html += `
            <div class="noteCard my-2 mx-2 card" style="width: 19rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Note </button>
                        <button id="${index}" onclick="markImp(this.id)" type="button" class="btn btn-danger"> Mark important </button>
                        <button disabled id="${index}" onclick="unmarkImp(this.id)" type="button" class="btn btn-success" style="margin-top: 6px;"> Mark normal </button>
                    </div>
            </div>`;
        }
        else{
            // in case the "imp" field of this note is 1, mark it as important by changing the color, etc.
            html += `
            <div class="noteCard my-2 mx-2 card" style="width: 19rem; background-color: #ff1a1a; color: white; font-weight: bold;">
                    <div class="card-body">
                        <h5 class="card-title" style="font-weight: bold; font-size: 30px;">${element.title}</h5>
                        <p class="card-text" style="font-size: 25px;"> ${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Note </button>
                        <button disabled id="${index}" onclick="markImp(this.id)" type="button" class="btn btn-danger"> Mark important </button>
                        <button id="${index}" onclick="unmarkImp(this.id)" type="button" class="btn btn-success" style="margin-top: 6px;"> Mark normal </button>
                    </div>
            </div>`;
        }
        
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h3 style="color: whitesmoke;">Nothing to show! Use "Add a Note" section above to add notes.</h3>`;
    }
}


// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// function to search for a note using the note content - not note title
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})


// function to mark the "imp" field of a note as 1 (which means important)
function markImp(index){

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // console.log("before marking : ", notesObj[index]["imp"]);
    notesObj[index]["imp"] = 1;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log("after marking : ", notesObj[index]["imp"]);
    showNotes();
}


// function to mark the "imp" field of a note as 0 (which means normal)
function unmarkImp(index){

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    // console.log("before marking : ", notesObj[index]["imp"]);
    notesObj[index]["imp"] = 0;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log("after marking : ", notesObj[index]["imp"]);
    showNotes();
}


/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/