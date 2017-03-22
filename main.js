(() => {
    'use strict';


    // On load play t swifty
    getSongs("Taylor Swift");


    /////// Event listeners

    // When the form is submited.
    $('#inputForm').on('submit',submitForm);

    // When a play button is clicked
    $('.songsGoHere').on("click","button",handleButtonClick);




    /////// Functions

    // Get songs
    function getSongs(search) {
        $.ajax({
          url: `https://api.soundcloud.com/tracks/?q=${search}&client_id=03e4633e2d85874a921380e47cac705d`,
          success: (response) => {
            writeToHTML(response);
          }
        })
    }

    // Write songs to html
    function writeToHTML(array){

        let newArray = array.sort((a,b)=>{
            if(a.title>b.title){
                return 1;
            }
            return -1;
        })

        let $songsGoHere = $(".songsGoHere");

        newArray.forEach(song=>{

            if(song.artwork_url===null){
                song.artwork_url = 'http://placehold.it/350x350/000000?text=No Image';
            }

            $songsGoHere.append(`
                <div class="animated rollIn col-md-4">
                    <div class="song">
                        <img class="artwork" src="${song.artwork_url}">
                        <h2>${song.title}</h2>
                        <img class="waveform" src="${song.waveform_url}">
                        <button data-id="${song.id}">Play</button>
                    </div>
                </div>
            `);

        })
    }

    // Handle playing a song.
    function handleButtonClick(){
        let id = $(this).data('id');
        let string = `http://api.soundcloud.com/tracks/${id}/stream?client_id=03e4633e2d85874a921380e47cac705d`;
        $('audio').attr('src',string); 
    }

    // Handle a submitting of the form
    function submitForm(e){
        e.preventDefault();
        $(".songsGoHere").html("");
        let input = $('input').val();
        getSongs(input);
        $("input").val("");
    }

})();