const AWS = require('aws-sdk');
const { pollExecutionHistory } = require('./history');

// AWS SDK - StepFunctions
const stepfunctions = new AWS.StepFunctions();

// Environment Variable - ARN of the Step Functions State Machine
const STATE_MACHINE_ARN = process.env.STATE_MACHINE_ARN || 'ARN';

/**
 * Starts an execution of an AWS Step Functions State Machine. Passes the 
 * inputObj parameter to the execution.
 * @param {*} inputObj Input to the state machine execution.
 */
const startExecution = async (inputObj = {}) => {
  console.log(`startExecution`);
  const input = JSON.stringify(inputObj);
  const params = {
    stateMachineArn: STATE_MACHINE_ARN,
    input
  };
  const execution = await stepfunctions.startExecution(params).promise();
  console.log(`execution:\n${JSON.stringify(execution, null, 2)}`);
  return execution;
};
exports.startExecution = startExecution;

/**
 * Starts an execution of an AWS Step Functions State Machine. Passes the 
 * inputObj parameter to the execution. Polls the event history of the 
 * execution for completion. Returns the output from the final event in 
 * the execution.
 * @param {*} inputObj Input to the state machine execution.
 * @returns Output from the state machine execution as JSON.
 */
const startExecutionAndWait = async (inputObj = {}) => {
  console.log(`startExecutionAndWait`);
  const execution = await startExecution(inputObj);
  const event = await pollExecutionHistory(execution.executionArn);
  return JSON.parse(event.stateExitedEventDetails.output);
};
exports.startExecutionAndWait = startExecutionAndWait;