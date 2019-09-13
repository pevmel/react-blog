import React from "react"
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Accordion, Icon, Button, Item, Grid} from 'semantic-ui-react'
import NewCategoryModal from './NewCategoryModal'

const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

function getCategories() {
  return dispatch => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    return fetch('v1/categories.json')
      .then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json)))
      .catch(error => console.log(error));
  }
}

export function getCategoriesSuccess(json) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories: json
  }
}

class Categories extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentDidMount() {
    this.props.getCategories()
  }

  render () {
    const { activeIndex } = this.state;

    const { categories } = this.props;
    const categoriesList = categories.map((category) => {
      return (
        <React.Fragment key={category.id}>
          <Accordion.Title
            active={activeIndex === category.id}
            index={category.id}
            onClick={this.handleClick}
          >
            <Item.Group>
              <Item>
                <Icon name='dropdown' />
                <Item.Content verticalAlign='top'>
                  <Item.Header>{category.name}</Item.Header>
                  <Item.Description>{category.description}</Item.Description>
                </Item.Content>
                <Item.Extra floated='right'>
                  <Button floated='right'>Delete</Button>
                  <Button floated='right'>Edit</Button>
                </Item.Extra>
              </Item>
            </Item.Group>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === category.id}>
            <p>
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many
              households across the world.
            </p>
          </Accordion.Content>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column floated='left' width={10}>
            <h1>Categories</h1>
          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <NewCategoryModal />
          </Grid.Column>
        </Grid>
        <Accordion>{ categoriesList }</Accordion>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  categories: state => state.categories
});

const mapDispatchToProps = { getCategories };

export default connect(structuredSelector, mapDispatchToProps)(Categories);
