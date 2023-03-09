$(document).ready(function(){
    
    let line = 0
    let parag = 0
    let currentLine = 0
    

    let songList = [
        "01MyLife",
        "02DontAskMeWhy",
        "03JustTheWayYouAre",
        "04Lullabye",
        "05Vienna",
        "06Zanzibar",
        "07Honesty",
        "08YouMayBeRight",
        "09MovinOut",
        "10NewYorkStateOfMind",
        "11UptownGirl",
        "12TheLongestTime",
        "13RiverOfDreams",
        "14PianoMan"
    ]

    function clear(){
        $("#titulo").text("");
        $("#content").html("");
        line = 0;
        parag = 0;
        currentLine = 0;
    }

    function cargarLetra(nombre){
        clear()
        $.getJSON('lyrics/'+nombre+'.json',function(lyric){
            $("#titulo").text(lyric.title)
            
            lyric.content.forEach(function(parrafo){
                $("#content").append('<p id="parag'+parag+'"></p>');
                parrafo.forEach(function(linea){
                    $("#parag"+parag).append('<div id="linea'+line+'">'+linea+'</div>')
                    line++;
                })
                parag++;
            })
            
        })
    }
    let currentSong = 0;
    cargarLetra(songList[currentSong]);

    if(currentSong == 0){
        $(".backbtn").attr("id",currentSong)
        currentSong++;
        $(".nextbtn").attr("id",currentSong)
    }

    $(".backbtn").click(function(){
        if(currentSong > 0){ currentSong--; cargarLetra(songList[currentSong]) }
    })
    $(".nextbtn").click(function(){
        if(currentSong < (songList.length -1)){ currentSong++; cargarLetra(songList[currentSong]) }
    })


    $(document).keypress(function (event) {
  
        var key = (event.keyCode ? event.keyCode : event.which);
        var ch = String.fromCharCode(key)
        
        if(ch == "a" || ch == "s" || ch == "d"){
            if(currentLine > 0){
                currentLine--;
                $("#linea"+currentLine).removeClass("active-line")
            }
        }

        if(ch == "k" || ch == "l" || ch == "ñ"){
            if(currentLine < line){
                $("#linea"+currentLine).addClass("active-line")
                currentLine++;
            }
        }

    });

})

