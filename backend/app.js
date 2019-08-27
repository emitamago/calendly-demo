/** Express app for calendly demo. */
const express = require("express");
const app = express();
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.event) {
    case 'invitee.created':
      const createdEvent = event.data.object;
      handleEventCreated(createdEvent);
      break;
    case 'invitee.canceled':
      const canceledEvent = event.data.object;
      handleEventCanceled(canceledEvent);
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

module.exports = app;