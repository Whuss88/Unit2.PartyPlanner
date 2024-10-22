// tell the funtion to run when all dom content loaded so dont have to defer script
document.addEventListener('DOMContentLoaded', () => {
  const state = {
      parties: []
  };
// fetch data from sta
  fetchEvents(state);
// grab form for user input
  const form = document.querySelector('#new-party-form');
// add event listener and tell it what to do
  form.addEventListener('submit', function(event) {
    // prevent the page from refreshing when submitted
      event.preventDefault();
    // grab user input and display values
      const name = document.querySelector('#name').value;
      const date = document.querySelector('#date').value;
      const time = document.querySelector('#time').value;
      const location = document.querySelector('#location').value;
      const description = document.querySelector('#description').value;
    // take all user intput and put into a variable
      const newParty = { name, date, time, location, description };
      // add new party to parties array
      state.parties.push(newParty);
      // display updated info
      render(state);
    // grab the form and reset it
      document.querySelector('#new-party-form').reset();
  });
});
// create function to fetch events from api
const fetchEvents = (state) => {
  fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-FT/events')
      .then(response => response.json())
      .then(data => {
        // if it gets the data 
          if (data.success) {
            // map out how we want the data linked
              state.parties = data.data.map(event => ({
                  name: event.name,
                  date: event.date,
                  time: event.time,
                  location: event.location,
                  description: event.description
              }));
              // display updated state
              render(state);
              // if not then display error
          } else {
              console.error('Error:', data.error);
          }
      })
      .catch(error => console.error('Error fetching events:', error));
}
// create render function 
const render = (state) => {
  // grab party list
  const partyList = document.querySelector('#parties');
  partyList.innerHTML = ''; // Clear the existing list
// for each party in the array
  state.parties.forEach(party => {
    // create a new list item 
      const listItem = document.createElement('li');
      // display this information
      listItem.innerHTML = `
          <strong>${party.name}</strong> <br>
          <em>${party.date} at ${party.time}</em> <br>
          <strong>Location:</strong> ${party.location} <br>
          <p>${party.description}</p>
      `;
      // add new list item to party list
      partyList.appendChild(listItem);
  });
}
