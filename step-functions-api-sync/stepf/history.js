const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

/**
 * Uses the AWS SDK to obtain the event history for a Step Functions State Machine 
 * Execution. The response is an array of JSON event objects sorted from newest to oldest. 
 * @param {string} executionArn ARN of a Step Function State Machine Execution.
 * @returns An array of event history objects describing the state machine execution status.
 */
const getExecutionHistory = async (executionArn = '') => {
  console.log(`getExecutionHistory for executionArn: ${executionArn}`);
  const params = {
    executionArn,
    maxResults: 0,
    reverseOrder: true
  };
  const events = await stepfunctions.getExecutionHistory(params).promise();
  console.log(`Execution events:\n${JSON.stringify(events, null, 2)}`);
  return events;
};
exports.getExecutionHistory = getExecutionHistory;

/**
 * Returns a Promise which waits for the supplied number of milliseconds and then resolves. 
 * Utility for delaying activities.
 * @param {number} millis The number of milliseconds to delay before resolving the Promise.
 * @returns A Promise.
 */
const timeout = (millis = 0) => {
  return new Promise(resolve => setTimeout(resolve, millis));
};

/**
 * Periodically retrieves the event history for a Step Functions State Machine Execution. 
 * Searches the array of events for one matching the supplied type and name, typically the final 
 * event in a state machine. Once found, polling ceases and the matching event object is returned.
 * @param {string} executionArn ARN of a Step Function State Machine Execution.
 * @param {string} eventType The event type to poll for.
 * @param {string} eventName The event name to poll for.
 * @param {number} interval The interval, in milliseconds, to poll for events.
 * @returns An event history object matching the supplied event type and name.
 */
const pollExecutionHistory = async (executionArn, eventType = 'PassStateExited', eventName = 'EndState', interval = 250) => {
  console.log(`pollExecutionHistory for eventType:${eventType} and eventName:${eventName} at interval:${interval}ms`);
  let event;
  do {
    // Using the timeout function with Promise.all slows the loop, ensuring getExecutionHistory 
    // is invoked just once per interval (e.g. 250ms)
    const [timeoutResult, executionHistory] = await Promise.all([
      timeout(interval),
      getExecutionHistory(executionArn)
    ]);
    event = executionHistory.events.find((event) => event.type === eventType && event.stateExitedEventDetails.name === eventName);
    console.log(`Event:\n${JSON.stringify(event, null, 2)}`);
  } while(!event) // exit the loop if a matching event is found, otherwise poll the event history again
  return event;
};
exports.pollExecutionHistory = pollExecutionHistory;