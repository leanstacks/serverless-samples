/**
 * Function: Format Message
 * Description: Create a simple message using supplied 'audience' attribute if present.
 * Stage: 1
 */
exports.handle = async (event, context) => {

  console.log(`event:\n${JSON.stringify(event, null, 2)}`);
  console.log(`context:\n${JSON.stringify(context, null, 2)}`);

  const audience = event.audience || 'World';

  const createdAt = new Date().toISOString();
  const message = `Hello ${audience}!`;

  const result = {
    message,
    createdAt
  };

  return result;

}
