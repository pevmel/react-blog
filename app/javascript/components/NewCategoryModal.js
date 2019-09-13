import React from "react"
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Modal } from 'semantic-ui-react'
import {getCategoriesSuccess} from "./Categories";

const POST_CATEGORY_REQUEST = 'POST_CATEGORY_REQUEST';
const POST_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS';

function postCategory() {
  console.log('postCategory() Action!');
  return dispatch => {
    dispatch({ type: POST_CATEGORY_REQUEST });
    return fetch('v1/categories.json')
      .then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json)))
      .catch(error => console.log(error));
  }
}


class NewCategoryModal extends React.Component {
  render () {
    return (
      <Modal trigger={<Button floated='right'>New Category</Button>}>
        <Modal.Header>New Category</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field required>
                <label>Category name</label>
                <input placeholder='Category name' />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea rows="3" placeholder='Description'></textarea>
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Button type='cancel'>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NewCategoryModal
