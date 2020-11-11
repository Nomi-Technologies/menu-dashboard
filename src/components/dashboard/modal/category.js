import { FormButton } from "../../buttons"
import React, { useState } from 'react';
import { DishFormInput, DishFormTextArea } from "../../form"
import Client from '../../../util/client'
import {
  Modal, Container, ButtonRow, ModalBackground, FormTitle, FormSubtitle, Divider
} from "./modal"
import useEventListener from '@use-it/event-listener'

const NewCategoryModal = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createCategory = () => {
        let categoryData = {
            name: name,
            description: description,
            menuId: props.menuId
        }
        if (name !== '') {
            Client.createCategory(categoryData).then((res) => {
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                console.error("error creating category")
                //show some error on form
            })
        } else {
            console.error("missing field")
            //show some error
        }
    }

    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if (key === 'Escape') {
            props.toggleForm()
        }
        if (key === 'Enter') {
            createCategory()
        }
    }

    useEventListener('keydown', handler);
    return (
        <>
            <ModalBackground />
            <Modal>
                <Container>
                    <FormTitle>Add Category</FormTitle>
                    <FormSubtitle>Category Name</FormSubtitle>
                    <DishFormInput placeholder='Type a category name (e.g. Appetizers, Entrees)...' name='category' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <FormSubtitle>Description (Optional)</FormSubtitle>
                    <DishFormTextArea
                      placeholder="Change description..."
                      value={ description }
                      name="description"
                      onChange={event => {
                        setDescription(event.target.value)
                      }}
                    />
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Submit' onClick={createCategory} />
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

const EditCategoryModal = (props) => {
    const [name, setName] = useState(props.category.name);
    const [description, setDescription] = useState(props.category.description);

    const updateCategory = () => {
        let categoryData = {
          name: name,
          description: description,
          menuId: props.menuId
        }
        if (name !== '') {
            Client.updateCategory(props.category.id, categoryData).then((res) => {
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                Client.getCategory(props.category.id).then((oldCategory) => {
                    setName(oldCategory.name)
                    setDescription(oldCategory.description)
                })
                console.error("error updating category")
            })
        } else {
            console.error("missing field")
        }
    }

    //press escape to exit the form, press enter to submit
    function handler({ key }) {
        if (key === 'Escape') {
            props.toggleForm()
        }
        if (key === 'Enter') {
            updateCategory()
        }
    }
    
    useEventListener('keydown', handler);

    return (
        <>
            <ModalBackground />
            <Modal>
                <Container>
                    <FormTitle>Edit Category</FormTitle>
                    <FormSubtitle>Category Name</FormSubtitle>
                    <DishFormInput placeholder='Type a category name (e.g. Appetizers, Entrees)...' name='category' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <FormSubtitle>Description (Optional)</FormSubtitle>
                    <DishFormTextArea
                      placeholder="Change description..."
                      value={ description }
                      name="description"
                      onChange={event => {
                        setDescription(event.target.value)
                      }}
                    />
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Submit' onClick={updateCategory} />
                    </ButtonRow>
                </Container>
            </Modal>
        </>
    )
}

export { EditCategoryModal, NewCategoryModal }