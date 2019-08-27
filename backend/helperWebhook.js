function handleEventCreated(obj){
    console.log("created event is",obj)
}

function handleEventCanceled(obj){
    console.log("canceled event is",obj)
}

module.exports = { handleEventCreated, handleEventCanceled }