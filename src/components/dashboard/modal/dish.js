import React, { useState, useEffect } from 'react';
import { CategoryDropdown } from "../menu-table/form/dropdown"
import Client from '../../../util/client'
import { DishFormInput, DishFormTextArea, FormButton, ButtonPrimary, ButtonSecondary } from "../../basics"
import { FileDrop } from "../../file-drop"
import useEventListener from '@use-it/event-listener'
import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"
import { DishTagForm } from "../../../components/dashboard/menu-table/form/dish-tag-form"

const DishModal = ({ dishId, create }) => {
  const [name, setName] = useState(props.dish.name)
  const [description, setDescription] = useState(props.dish.description)
  const [price, setPrice] = useState(props.dish.price)
  const [categoryId, setCategoryId] = useState(props.dish.categoryId)
  const [dishTags, setDishTags] = useState([])
  const [categories, setCategories] = useState([])
  const [dishImage, setDishImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [dishData, setDishData] = useState({})

  const setFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => {
          console.error('file reading has failed')
          setErrorMessage("Error reading file")
      }
      reader.onload = () => {
        const formData = new FormData();
        formData.append('file', file);
        setDishImage(formData);
      }
  }

  const clearFile = () => {
      setDishImage(null)
  }

  initializeForm = () => {
    if(!create) {
      Client.getDish(dishId).then((res) => {
        setDishData(res.data)
      })
    }

    Client.getAllCategoriesByMenu(props.menuId).then(response => {
      setCategories(response.data)
    })
  }

  useEffect(() => {
    initializeForm()
  }, [])

  const createDish = () => {
    if (name !== "" && categoryId !== 0) {
      Client.createDish(dishData)
        .then(res => {
          props.toggleForm();
          props.updateMenu();
          if (dishImage) {
            Client.upsertDishImage(res.data.id, dishImage);
          }
        })
        .catch(err => {
          console.error("error creating dish");
          // TODO: show some error on form
        });
    } else {
      console.error("missing field")
      //show some error
    }
  }

  const updateDish = () => {
    if (name !== "" && categoryId !== 0) {
      Client.updateDish(dishId, dishData)
        .then(res => {
          props.toggleForm()
          props.updateMenu()
        })
        .catch(err => {
          Client.getDish(dishId).then(oldItem => {
            setName(oldItem.name)
            setDescription(oldItem.description)
            setCategoryId(oldItem.categoryId)
          })
          console.error("error updating dish")
          // TODO: show some error on form
        });
      if (dishImage) {
        Client.upsertDishImage(dishId, dishImage)
          .then(res => {
            props.toggleForm();
            props.updateMenu();
          })
          .catch(err => {
            Client.getDish(dishId).then(oldItem => {
              setName(oldItem.name);
              setDescription(oldItem.description);
              setCategoryId(oldItem.categoryId);
            })
            console.error("error updating dish", err);
            // TODO: show some error on form
          });
      }
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
    if (key === 'Escape') {
      props.toggleForm()
    }
    if (key === 'Enter') {
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
            value={ name }
            name="name"
            onChange={ event => {
              setDishData({
                ...dishData,
                name: event.target.value
              })
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Menu Category</FormSubtitle>
          <CategoryDropdown
            categoryId={ dishData.categoryId }
            updateSelection={ updateCategorySelection }
            menuId={ props.menuId }
            categories={ categories }
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Description</FormSubtitle>
          <DishFormTextArea
            placeholder="Change description..."
            value={ dishData.description }
            name="description"
            onChange={ event => {
              setDishData({
                ...dishData,
                description: event.target.value
              })
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Image (Optional)</FormSubtitle>
          <FileDrop acceptedFileTypes={ ['.png', '.jpg', '.jpeg', ] } setFile={ setFile } setErrorMessage={ setErrorMessage } clearFile={ clearFile }/>
          <Divider color="#DCE2E9" />
          <FormSubtitle>Price</FormSubtitle>
          <DishFormInput
            placeholder="Change price..."
            name="price"
            value={ dishData.price }
            onChange={ event => {
              setDishData({
                ...dishData,
                price: event.target.value
              })
            }}
          />
          <Divider color="#DCE2E9" />
          <FormSubtitle>Allergen Search</FormSubtitle>
          <TagsForm tags={ dishData.Tags } setTags={setDishTags}></TagsForm>
          <ButtonRow>
            <ButtonSecondary onClick={props.toggleForm}>Cancel</ButtonSecondary>
            <ButtonPrimary onClick={updateDish}>Update Dish</ButtonPrimary>
          </ButtonRow>
        </Container>
      </Modal>
    </>
  )
}

export { DishModal }
