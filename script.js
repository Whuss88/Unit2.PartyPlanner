// tell the funtion to run when all dom content loaded so dont have to defer script
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
    // grab form 
    const form = document.querySelector('#new-party-form')
    // add submit event listener for form
    form.addEventListener('submit', function(event) {
      // prevent from refreshing
        event.preventDefault();
        // grab all elements of user inputs and show value
        const name = document.querySelector('#name').value;
        const date = document.querySelector('#date').value;
        const time = document.querySelector('#time').value;
        const location = document.querySelector('#location').value;
        const description = document.querySelector('#description').value;
        // run function to add party details
        addParty(name, date, time, location, description);
        // resets user input fields
        document.querySelector('#new-party-form').reset();
    });
});
// create a function to fetch events from api
const fetchEvents= () => {
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-FT/events')
    // turns fetched info into data
        .then(response => response.json())
        .then(data => {
          // if data was retrieved successfully then 
            if (data.success) {
              // for each
                data.data.forEach(event => {
                  // run add party function 
                  addParty(event.name, event.date, event.time, event.location, event.description);
                });
            } else {
                console.error('Error:', data.error);
            }
        })
        .catch(error => console.error('Error fetching events:', error));
}
// create addparty function which adds user input into party list
const addParty = (name, date, time, location, description) => {
  // grab the partylist 
    const partyList = document.querySelector('#parties');
    // create new list item
    const listItem = document.createElement('li');
    // fill list item with user input
    listItem.innerHTML = `
        <strong>${name}</strong> <br>
        <em>${date} at ${time}</em> <br>
        <strong>Location:</strong> ${location} <br>
        <p>${description}</p>
    `;
    // add new list item into partylist
    partyList.appendChild(listItem);
}
