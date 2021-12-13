/**
 * Function: To Uppercase
 * Description: Convert the message to UPPER CASE.
 * Stage: 2
 */
exports.handle = async (event, context) => {

  console.log(`event:\n${JSON.stringify(event, null, 2)}`);
  console.log(`context:\n${JSON.stringify(context, null, 2)}`);

  // the result from the previous step/stage is the event, i.e. the input, for this step/stage
  const result = {
    ...event
  };

  // if the message attribute exists, convert it to UPPERCASE
  if (!!result.message) {
    result.message = result.message.toUpperCase();
  }

  return result;

}