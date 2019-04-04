
/**
 * Function: To Uppercase
 * Description: Convert the message to UPPER CASE.
 * Stage: 2
 */
exports.handle = async (event, context) => {
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