
const searchResults = $('#search-results');

let keyTimer;
$('#search').on('keyup', () => {
  clearTimeout(keyTimer)
  if ($('#search').val().length >= 3) {
    keyTimer = setTimeout(() => {
      console.log(`/api/search?q=${$('#search').val()}`);
      $.ajax({
        url: `/api/search?q=${$('#search').val()}`,
        method: 'GET',
        timeout: 0,
      }).done((response) => {
        console.log(response);
        if (response.length < 1) {
          const blah = $(`<li><h3>No Search Results</h3></li>`);
          blah.appendTo(searchResults);
        }
        // push li's to the modal
        searchResults.empty();
        for (let i = 0; i < response.length; i++) {
          const blah = $(`<li>${response[i].title}</li>`);
          blah.appendTo(searchResults);
        }
      });
    }, 500);
  }
});