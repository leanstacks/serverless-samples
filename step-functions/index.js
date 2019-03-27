/**
 * Function: Create Message
 * Description: Create a simple message using supplied 'audience' attribute if present.
 * Stage: 1
 */
exports.createMessage = async (event, context) => {
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);
  console.log(`context:\n${JSON.stringify(context, null, 2)}`);

  const audience = event.audience || 'World';

  const createdAt = new Date().getTime();
  const message = `Hello ${audience}!`;

  const result = {
    message,
    createdAt
  };

  return result;
}

/**
 * Function: To Uppercase
 * Description: Convert the message to UPPER CASE.
 * Stage: 2
 */
exports.toUppercase = async (event, context) => {
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);
  console.log(`context:\n${JSON.stringify(context, null, 2)}`);

  /* The result from the previous Step Function Stage is the event, i.e. the input, for this Stage. */
  const result = {
    ...event
  };

  if (!!result.message) {
    result.message = result.message.toUpperCase();
  }

  return result;
}