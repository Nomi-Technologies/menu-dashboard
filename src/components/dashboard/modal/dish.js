import { FormButton } from "../../buttons"
import React, { useState, useEffect } from 'react';
import { DishFormInput, DishFormTextArea } from "../../form"
import { CategoryDropdown } from "./dropdown"
import Client from '../../../util/client'
import useEventListener from '@use-it/event-listener'

import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"

let MultiSelectDropdown;

if (typeof window !== `undefined`) {
    const { Multiselect } = require('multiselect-react-dropdown');
    MultiSelectDropdown = Multiselect;
}

const TagsForm = ({ tags, setTags }) => {
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    Client.getTags().then(response => {
      setAllTags(response.data)
    })
  }, [])

  // convert list of tag objects to ids to set in parent form
  const tagIds = (tagList) => {
    let ids = []
    tagList.forEach(tag => {
      ids.push(tag.id)
    })
    return ids
  }

  const onSelect = (selectedList, selectedItem) => {
    setTags(tagIds(selectedList))
  }

  const onRemove = (selectedList, removedItem) => {
    setTags(tagIds(selectedList))
  }

  const css = {
    "searchBox": {
      "border": "none",
      "background-color": "#E1E7EC",
      "padding": "10px",
      "padding-left": "20px",
      "font-size": "14px",
      "margin": "10px 0",
    },
    "chips": {
      "background-color": "#F3A35C",
      "color": "white",
      "padding": "8px 15px",
      "border-radius": "5px"
    },
    "optionContainer": {
      "max-height": "180px"
    }
  }

  return (
    <MultiSelectDropdown
      options={ allTags }
      selectedValues={ tags }
      displayValue="name"
      placeholder="Start typing to begin..."
      onSelect={ onSelect }
      onRemove={ onRemove }
      style={ css }
      closeIcon="cancel"
    />
  )
}

//Keyboard accessbilities
const ESCAPE_KEYS = ['27', 'Escape'];
const ENTER_KEYS = ['13', 'Enter'];

const NewDishModal = props => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [dishTags, setDishTags] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Client.getAllCategoriesByMenu(props.menuId).then(response => {
        if (response.data.length > 0) {
            setCategories(response.data)
            setCategoryId(response.data[0].id)
        }
    })
}, [props.menuId])

  const createDish = () => {
    let dishData = {
      name: name,
      description: description,
      categoryId: categoryId,
      dishTags: dishTags,
      price: price,
      menuId: props.menuId,
    }
    if (name !== "" && categoryId !== 0) {
      Client.createDish(dishData)
        .then(res => {
          props.toggleForm()
          props.updateMenu()
        })
        .catch(err => {
          console.error("error creating dish")
          //show some error on form
        })
    } else {
      console.error("missing field")
      //show some error
    }
  }

  const updateCategorySelection = category => {
    setCategoryId(category)
  }
  
  //press escape to exit the form, press enter to submit
  function handler({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
      props.toggleForm()
    }
    if(ENTER_KEYS.includes(String(key))){
      createDish()
    }
  }

  useEventListener('keydown', handler);

  return (
    <>
      <ModalBackground />
      <Modal>
        <Container>
          <FormTitle>Add Dish</FormTitle>
          <FormSubtitle>Dish Name</FormSubtitle>
          <DishFormInput
            placeholder="Type dish name..."
            name="name"
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Menu Category</FormSubtitle>
          <CategoryDropdown
            placeholder="*select category*"
            updateSelection={updateCategorySelection}
            menuId={props.menuId}
            categories={ categories }
            categoryId={ categoryId }
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Description</FormSubtitle>
          <DishFormTextArea
            placeholder="Type description..."
            name="category"
            onChange={event => {
              setDescription(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Price</FormSubtitle>
          <DishFormInput
            placeholder="12.00"
            name="price"
            onChange={event => {
              setPrice(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Allergen Search</FormSubtitle>
          <TagsForm setTags={setDishTags}></TagsForm>
          <ButtonRow>    
            <FormButton
              text="Cancel"
              theme="light"
              onClick={props.toggleForm}
            />
            <FormButton text="Add Dish" onClick={createDish} />
          </ButtonRow>
        </Container>
      </Modal>
    </>
  )
}

const EditDishModal = props => {
  const [name, setName] = useState(props.dish.name)
  const [description, setDescription] = useState(props.dish.description)
  const [price, setPrice] = useState(props.dish.price)
  const [categoryId, setCategoryId] = useState(props.dish.categoryId)
  const [dishTags, setDishTags] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
      Client.getAllCategoriesByMenu(props.menuId).then(response => {
          setCategories(response.data)
      })

      let tagIds = []
      props.dish.Tags.forEach((tag) => {
        tagIds.push(tag.id);
      })

      setDishTags(tagIds)

  }, [props.menuId])

  const updateDish = () => {
    let dishData = {
      name: name,
      description: description,
      categoryId: categoryId,
      dishTags: dishTags,
      price: price,
      menuId: props.menuId,
    }
    if (name !== "" && categoryId !== 0) {
      Client.updateDish(props.dish.id, dishData)
        .then(res => {
          props.toggleForm()
          props.updateMenu()
        })
        .catch(err => {
          Client.getDish(props.dish.id).then(oldItem => {
            setName(oldItem.name)
            setDescription(oldItem.description)
            setCategoryId(oldItem.categoryId)
          })
          console.error("error updating dish")
          // TODO: show some error on form
        })
    } else {
      console.error("missing field")
      // TODO: show some error
    }
  }

  const updateCategorySelection = category => {
    setCategoryId(category)
  }

  //press escape to exit the form, press enter to submit
  function handler({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
      props.toggleForm()
    }
    if(ENTER_KEYS.includes(String(key))){
      updateDish()
    }
  }

  useEventListener('keydown', handler);

  return (
    <>
      <ModalBackground />
      <Modal>
        <Container>
          <FormTitle>Update Dish</FormTitle>
          <FormSubtitle>Dish Name</FormSubtitle>
          <DishFormInput
            placeholder="Change dish name..."
            value={name}
            name="name"
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Menu Category</FormSubtitle>
          <CategoryDropdown
            categoryId={ categoryId }
            updateSelection={ updateCategorySelection }
            menuId={ props.menuId }
            categories={ categories }
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Description</FormSubtitle>
          <DishFormTextArea
            placeholder="Change description..."
            value={description}
            name="description"
            onChange={event => {
              setDescription(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Price</FormSubtitle>
          <DishFormInput
            placeholder="Change price..."
            name="price"
            value={price}
            onChange={event => {
              setPrice(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Allergen Search</FormSubtitle>
          <TagsForm tags={props.dish.Tags} setTags={setDishTags}></TagsForm>
          <ButtonRow>
            <FormButton
              text="Cancel"
              theme="light"
              onClick={props.toggleForm}
            />
            <FormButton text="Update Dish" onClick={updateDish} />
          </ButtonRow>
        </Container>
      </Modal>
    </>
  )
}

export { EditDishModal, NewDishModal }