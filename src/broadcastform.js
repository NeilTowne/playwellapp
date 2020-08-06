import React from 'react';
import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid';
import { Form, Header, Segment } from 'semantic-ui-react';

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';
import { Component } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload'


import RequestSchema from './broadcast';

import {
  AutoField,
  AutoForm,
  ErrorsField,
  DateField,
  RadioField,
  LongTextField,
  SubmitField,
  SelectField
} from 'uniforms-semantic';

const professions = [
  {
    label: 'Developer',
    value: 'developer'
  },
  {
    label: 'Tester',
    value: 'tester'
  },
  {
    label: 'Product owner',
    value: 'product-owner'
  },
  {
    label: 'Project manager',
    value: 'project-manager'
  },
  {
    label: 'Businessman',
    value: 'businessman'
  }
];

const style = {
  margin: 200,
};

var handleAdd = (doc) => {

  // generate unique request# and file name for S3
  var requestID = uuidv4();
  var s3fileName = 'storedmedia/request-' + requestID + '.json' 
  console.log('Request ID:', requestID)
  console.log('File Name:', s3fileName);

  console.log("Here is the document",doc)
  //api.posts.createPost({ post: post}).then(json => displayMessage(json))

  // save the form data to S3 cloud Storage
  var addToStorage = () => {
    Storage.put(s3fileName, doc)
      .then (result => {
        console.log('result: ', result)
      })
      .catch(err => console.log('error: ', err));
  }
  addToStorage();

  //write data to the API using Graphql
    // (async () => {
    //   const newRequest = await API.graphql(graphqlOperation(mutations.createRequest, {input: doc}));
    // })();
}

export default function RequestForm() {

  return (
    <form>
    <AutoForm style={style} schema={RequestSchema} onSubmit={model => alert(JSON.stringify(model, null, 2))}>
      <Form.Group widths="equal">
      <LongTextField name="videoTitle" />
      <LongTextField name="videoDescription" />
       </Form.Group>
      <Form.Group>
        <LongTextField name="weekDays" />
        <DateField name="activityFromDate" />
        <label for="item-1">
   		<input type="checkbox" name="items[]" id="item-1" value="Repeat Weekly"/> Repeat Weekly
		</label>
      <FileUpload />
        <SubmitField value='Submit Request'/>
      </Form.Group>
      <h2>Or input a stream URL </h2>
        <Form.Group widths="equal">
        <LongTextField name="streamKey" />
        <SubmitField value='Submit Request'/>
      </Form.Group>
    </AutoForm>
    </form>
  );
}