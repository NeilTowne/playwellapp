import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Ajv from 'ajv';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

// NOTE:  Uniforms tutorial omitted this line below, needed to compile
import {LongTextField, DateField} from 'uniforms-semantic';

const simpleRequestSchema = new SimpleSchema({
  videoTitle: { label: 'Title of Video', type: String },
  videoDescription: { label: 'Video Description', type: String },
  activityFromDate: { label: 'Date Range From:', type: Date, defaultValue: new Date() },
  streamKey: { label: 'Stream URL', type: String },
  weekDays: { label: 'Day', type: String, defaultValue: 'Monday' },
});



const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

  };
}

const schemaValidator = createValidator(simpleRequestSchema);

const bridge = new SimpleSchema2Bridge(simpleRequestSchema, schemaValidator);

export default bridge;


