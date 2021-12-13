const { SFNClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');
const { pollExecutionHistory } = require('./history');

// AWS SDK v3 - Step Functions Client
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const sfnClient = new SFNClient({ region: AWS_REGION });

// Environment Variable - ARN of the Step Functions State Machine
const STATE_MACHINE_ARN = process.env.STATE_MACHINE_ARN || 'ARN';

/**
 * Starts an execution of an AWS Step Functions State Machine. Passes the input execution.
 * @param {Object} input Input to the state machine execution.
 * @returns An Object containing the AWS Step Functions start execution command output including the execution ARN.
 */
const startExecution = async (input = {}) => {

  console.log('Execution::startExecution');

  const inputStr = JSON.stringify(input);
  const params = {
    stateMachineArn: STATE_MACHINE_ARN,
    input: inputStr
  };
  const response = await sfnClient.send(new StartExecutionCommand(params));
  console.log(`response:\n${JSON.stringify(response, null, 2)}`);

  return response;

};
exports.startExecution = startExecution;

/**
 * Starts an execution of an AWS Step Functions State Machine. Passes the 
 * input parameter to the execution. Polls the event history of the 
 * execution for completion. Returns the output from the final event in 
 * the execution.
 * @param {Object} input Input to the state machine execution.
 * @returns An Object containing the processed output from the AWS Step Function execution.
 */
const startExecutionAndWait = async (input = {}) => {

  console.log('Execution::startExecutionAndWait');

  const execution = await startExecution(input);
  const event = await pollExecutionHistory(execution.executionArn);

  return JSON.parse(event.stateExitedEventDetails.output);

};
exports.startExecutionAndWait = startExecutionAndWait;