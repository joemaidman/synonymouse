//Global variables
var dataReturned;

var synTable = document.getElementById("synTable");
var simTable = document.getElementById("simTable");
var relTable = document.getElementById("relTable");
var antTable = document.getElementById("antTable");

var hasSynResults = false;
var hasSimResults = false;
var hasRelResults = false;
var hasAntResults = false;

var listNounsSyn = [];
var listVerbsSyn = [];
var listAdverbsSyn = [];
var listAdjectivesSyn = [];

var listNounsSim = [];
var listVerbsSim = [];
var listAdverbsSim = [];
var listAdjectivesSim = [];

var listNounsRel = [];
var listVerbsRel = [];
var listAdverbsRel = [];
var listAdjectivesRel = [];

var listNounsAnt = [];
var listVerbsAnt = [];
var listAdverbsAnt = [];
var listAdjectivesAnt = [];

//**MAIN APP LOOP**

function main() {
    createSpinner();
    fetchData();
}


function createSpinner(){


// Create the Spinner with options
var spinner = new Spinner({
    lines: 8, // The number of lines to draw
    length: 0, // The length of each line
    width: 4, // The line thickness
    radius: 14, // The radius of the inner circle
    color: '#FFFFFF', // #rbg or #rrggbb
    speed: 1, // Rounds per second
    trail: 46, // Afterglow percentage
    shadow: false // Whether to render a shadow
}).spin(document.getElementById("spinner")); // Place in DOM node called "ajaxContentHolder"

        document.getElementById('synDiv').style.visibility = "Collapse";
        document.getElementById('simDiv').style.visibility = "Collapse";
        document.getElementById('relDiv').style.visibility = "Collapse";
        document.getElementById('antDiv').style.visibility = "Collapse";
        document.getElementById('synDiv').style.height = "0px";
        document.getElementById('simDiv').style.height = "0px";
        document.getElementById('relDiv').style.height = "0px";
        document.getElementById('antDiv').style.height = "0px";
        document.getElementById('spinnerDiv').style.visibility = "Visible";
        document.getElementById('spinnerDiv').style.height = "auto";
}

//**MAIN LOGIC FUNCTIONS**

//AJAX request to fetch data from API.
function fetchData() {

    synTable.innerHTML = "";
    simTable.innerHTML = "";
    relTable.innerHTML = "";
    antTable.innerHTML = "";

    listNounsSyn = [];
    listVerbsSyn = [];
    listAdverbsSyn = [];
    listAdjectivesSyn = [];

    listNounsSim = [];
    listVerbsSim = [];
    listAdverbsSim = [];
    listAdjectivesSim = [];

    listNounsRel = [];
    listVerbsRel = [];
    listAdverbsRel = [];
    listAdjectivesRel = [];

    listNounsAnt = [];
    listVerbsAnt = [];
    listAdverbsAnt = [];
    listAdjectivesAnt = [];

    var word = document.getElementById("word").value;
    //Change the link below to point to your PHP capabale web server. 
    var url = "http://joesshed.com/synonymouse/getResponse.php/?word=" + word;



    $.ajax({
        crossOrigin: true,
        url: url,
        dataType: "jsonp",
        success: function(data) {
            try {
                dataReturned = JSON.parse(data);
            } catch (err) {
                var dummy = {};
                dataReturned = dummy;
            }
            processData();
        },
        failure: function(data) {
            alert("The endpoint could not be reached");

        },
        error: function(data) {
            alert("An error occurred");

        }

    });

}

function processData() {

    //Clear down current tables
    hasSynResults = false;
    hasSimResults = false;
    hasRelResults = false;
    hasAntResults = false;

    console.log(dataReturned);
    if (dataReturned.noun) {

        listNounsSyn = dataReturned.noun.syn;
        listNounsSim = dataReturned.noun.sim;
        listNounsRel = dataReturned.noun.rel;
        listNounsAnt = dataReturned.noun.ant;

        if (listNounsSyn) {
            listNounsSyn.sort(sortAlpha);
            hasSynResults = true;
        }
        if (listNounsSim) {
            listNounsSim.sort(sortAlpha);
            hasSimResults = true;
        }
        if (listNounsRel) {
            listNounsRel.sort(sortAlpha);
            hasRelResults = true;
        }
        if (listNounsAnt) {
            listNounsAnt.sort(sortAlpha);
            hasAntResults = true;
        }
    }

  if (dataReturned.verb) {

        listVerbsSyn = dataReturned.verb.syn;
        listVerbsSim = dataReturned.verb.sim;
        listVerbsRel = dataReturned.verb.rel;
        listVerbsAnt = dataReturned.verb.ant;

        if (listVerbsSyn) {
            listVerbsSyn.sort(sortAlpha);
            hasSynResults = true;
        }
        if (listVerbsSim) {
            listVerbsSim.sort(sortAlpha);
            hasSimResults = true;
        }
        if (listVerbsRel) {
            listVerbsRel.sort(sortAlpha);
            hasRelResults = true;
        }
        if (listVerbsAnt) {
            listVerbsAnt.sort(sortAlpha);
            hasAntResults = true;
        }
    }

     if (dataReturned.adverb) {

        listAdverbsSyn = dataReturned.adverb.syn;
        listAdverbsSim = dataReturned.adverb.sim;
        listAdverbsRel = dataReturned.adverb.rel;
        listAdverbsAnt = dataReturned.adverb.ant;

        if (listAdverbsSyn) {
            listAdverbsSyn.sort(sortAlpha);
            hasSynResults = true;
        }
        if (listAdverbsSim) {
            listAdverbsSim.sort(sortAlpha);
            hasSimResults = true;
        }
        if (listAdverbsRel) {
            listAdverbsRel.sort(sortAlpha);
            hasRelResults = true;
        }
        if (listAdverbsAnt) {
            listAdverbsAnt.sort(sortAlpha);
            hasAntResults = true;
        }
    }

      if (dataReturned.adjective) {

        listAdjectivesSyn = dataReturned.adjective.syn;
        listAdjectivesSim = dataReturned.adjective.sim;
        listAdjectivesRel = dataReturned.adjective.rel;
        listAdjectivesAnt = dataReturned.adjective.ant;

        if (listAdjectivesSyn) {
            listAdjectivesSyn.sort(sortAlpha);
            hasSynResults = true;
        }
        if (listAdjectivesSim) {
            listAdjectivesSim.sort(sortAlpha);
            hasSimResults = true;
        }
        if (listAdjectivesRel) {
            listAdjectivesRel.sort(sortAlpha);
            hasRelResults = true;
        }
        if (listAdjectivesAnt) {
            listAdjectivesAnt.sort(sortAlpha);
            hasAntResults = true;
        }
    }

    drawData();
}

function drawData() {

    var keepTheCount = 0;
    if (listNounsSyn) {
        listNounsSyn.forEach(function(it) {

            var row = synTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "noun";

        });
    }
    
    var keepTheCount = 0;
        if (listNounsSim) {
        listNounsSim.forEach(function(it) {

            var row = simTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "noun";

        });
    }

    var keepTheCount = 0;
        if (listNounsRel) {
        listNounsRel.forEach(function(it) {

            var row = relTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "noun";

        });
    }

    keepTheCount = 0;
    if (listNounsAnt) {
        listNounsAnt.forEach(function(it) {

            var row = antTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "noun";

        });
    }
    keepTheCount = 0;
    if (listVerbsSyn) {
        listVerbsSyn.forEach(function(it) {

            var row = synTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "verb";

        });
    }
    
    var keepTheCount = 0;
        if (listVerbsSim) {
        listVerbsSim.forEach(function(it) {

            var row = simTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "verb";

        });
    }

    var keepTheCount = 0;
        if (listVerbsRel) {
        listVerbsRel.forEach(function(it) {

            var row = relTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "verb";

        });
    }

    keepTheCount = 0;

    if (listVerbsAnt) {
        listVerbsAnt.forEach(function(it) {

            var row = antTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "verb";

        });
    }

    keepTheCount = 0;
    if (listAdverbsSyn) {
        listAdverbsSyn.forEach(function(it) {

            var row = synTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adverb";

        });
    }

    var keepTheCount = 0;
        if (listAdverbsSim) {
        listAdverbsSim.forEach(function(it) {

            var row = simTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adverb";

        });
    }

    var keepTheCount = 0;
        if (listAdverbsRel) {
        listAdverbsRel.forEach(function(it) {

            var row = relTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adverb";

        });
    }

    keepTheCount = 0;
    if (listAdverbsAnt) {
        listAdverbsAnt.forEach(function(it) {

            var row = antTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adverb";

        });
    }
    keepTheCount = 0;
    if (listAdjectivesSyn) {
        listAdjectivesSyn.forEach(function(it) {

            var row = synTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adj";

        });
    }


    var keepTheCount = 0;
        if (listAdjectivesSim) {
        listAdjectivesSim.forEach(function(it) {

            var row = simTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adj";

        });
    }

    var keepTheCount = 0;
        if (listAdjectivesRel) {
        listAdjectivesRel.forEach(function(it) {

            var row = relTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adj";

        });
    }

    keepTheCount = 0;
    if (listAdjectivesAnt) {
        listAdjectivesAnt.forEach(function(it) {

            var row = antTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = it;
            cell2.innerHTML = "adj";

        });
    }

    if(synTable.rows.length == 0){
  var row = synTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            
           cell1.innerHTML = "<p style=\"font-style:italic;\">Nothing found</p>";
           
            cell2.innerHTML = "";

    }

        if(simTable.rows.length == 0){
  var row = simTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = "<p style=\"font-style:italic;\">Nothing found</p>";
        
            cell2.innerHTML = "";

    }

            if(relTable.rows.length == 0){
  var row = relTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "<p style=\"font-style:italic;\">Nothing found</p>";
            cell2.innerHTML = "";

    }

    if(antTable.rows.length == 0){
  var row = antTable.insertRow(keepTheCount);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
           cell1.innerHTML = "<p style=\"font-style:italic;\">Nothing found</p>";
            cell2.innerHTML = "";

    }



    $("#synTable tbody").prepend("<tr><th>Word</th><th>Type</th></tr>");

    $("#simTable tbody").prepend("<tr><th>Word</th><th>Type</th></tr>");

    $("#relTable tbody").prepend("<tr><th>Word</th><th>Type</th></tr>");

    $("#antTable tbody").prepend("<tr><th>Word</th><th>Type</th></tr>");


    if (hasSynResults != true && hasAntResults != true && hasSimResults != true && hasRelResults != true) {

        document.getElementById('tempText').style.visibility = "Visible";
        document.getElementById('tempText').style.height = "auto";

        document.getElementById('tempTextValue').innerHTML = "Nothing found!";

        document.getElementById('synDiv').style.visibility = "Collapse";
        document.getElementById('simDiv').style.visibility = "Collapse";
        document.getElementById('relDiv').style.visibility = "Collapse";
        document.getElementById('antDiv').style.visibility = "Collapse";
        document.getElementById('synDiv').style.height = "0px";
        document.getElementById('simDiv').style.height = "0px";
        document.getElementById('relDiv').style.height = "0px";
        document.getElementById('antDiv').style.height = "0px";

    }
    else{
        document.getElementById('tempText').style.visibility = "Collapse";
        document.getElementById('tempText').style.height = "0px";
 document.getElementById('synDiv').style.visibility = "Visible";
        document.getElementById('synDiv').style.height = "auto";
document.getElementById('simDiv').style.visibility = "Visible";
        document.getElementById('simDiv').style.height = "auto";
        document.getElementById('relDiv').style.visibility = "Visible";
        document.getElementById('relDiv').style.height = "auto";
        document.getElementById('antDiv').style.visibility = "Visible";
        document.getElementById('antDiv').style.height = "auto";
    }

     document.getElementById('spinnerDiv').style.visibility = "Collapse";
        document.getElementById('spinnerDiv').style.height = "0px";

}

//**CONTROL EVENT FUNCTIONS**

$("#btnGetWords").click(function(e) {
    main();
});

$("#word").on('keyup', function(e) {
    if (e.which == 13) {
        main();
        e.preventDefault();
    }
});

//**GENERIC FUNCTIONS**

function sortAlpha(a, b) {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
}