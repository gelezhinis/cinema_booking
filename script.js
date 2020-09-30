const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Save selected movie index & price
const setMovieData = (movieIndex, moviePrice) => {
   localStorage.setItem('selectedMovieIndex', movieIndex);
   localStorage.setItem('ticket price', moviePrice);
}

// Update count and total
const updateSelectedCount = () => {
   const selectedSeats = document.querySelectorAll('.row .seat.selected');

   // Copy selected seats into array
   // Map through array
   // Return a new array indexes
   const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
   
   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

   const selectedSeatsCount = selectedSeats.length;

   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   if (selectedSeats !== null && selectedSeats.length > 0)  {
      seats.forEach((seat, index) => {
         if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
         }
      });
   }
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
   }
}

// Event listeners
// Movie select event
movieSelect.addEventListener('change', (event) => {
   ticketPrice = parseInt(event.target.value);
   setMovieData(event.target.selectedIndex, event.target.value);
   updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (event) => {
   // console.log(event.target);
   if(
      event.target.classList.contains('seat') &&
      !event.target.classList.contains('occupied')
   ) {
     event.target.classList.toggle('selected');

     updateSelectedCount();   
   }
});

// Initial count and total set
updateSelectedCount();