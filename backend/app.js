/** Express app for calendly demo. */
const express = require("express");
const app = express();
const { handleEventCreated, handleEventCanceled } = require("./helperWebhook")
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Match the raw body to content type application/json
app.post('/',function (req, res, next)  {
    // console.log("I am here and here is my request.body", request.body)
  let event;

  try {
    //   console.log("i tried",JSON.parse(request.body) )
    event = req.body
  }
  catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.event) {
    case 'invitee.created':
      const createdEvent = event.payload;
      handleEventCreated(createdEvent);
      break;
    case 'invitee.canceled':
      const canceledEvent = event.payload;
      handleEventCanceled(canceledEvent);
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});

module.exports = app;