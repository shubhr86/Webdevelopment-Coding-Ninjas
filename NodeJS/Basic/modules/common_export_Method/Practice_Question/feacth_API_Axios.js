import axios from 'axios';


// Define the API URL
const apiUrl = 'https://api.codingninjas.com/api/v3/event_tags';

// Make an HTTP GET request
axios.get(apiUrl)
  .then((response) => {
    // Retrieve the response data
    const responseData = response.data;

    // Print the response data to the console
    console.log(responseData);
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
