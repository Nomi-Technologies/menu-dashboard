import React, { useState, useEffect } from 'react';

import {FormInput} from "../form"
import { FormButton, ButtonRow } from "../buttons" 

import {Dropdown} from "./dropdown"

import Client from '../../util/client'

import styled from "styled-components"

const StyledModal = styled.div`
    position: fixed;
    z-index: 100;
    box-shadow: 2px 2px 2px grey;
    background-color: white;
`

const Container = styled.div`
    margin-top: 24px;
    display: flex;
    margin: 0 auto;
    width: 90%; 
    flex-direction: column;
    max-width: 400px;

    input {
        border: none;
        background-color: #F4F4F4;
    }

    .error {
        color: red;
        padding: 0;
        margin: 0;
    }
` 

const NewDishForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

    const createDish = () => {
        let dishData = {
            name: name,
            description: description,
            categoryId: categoryId,
        }
        console.log(dishData)
        if (name !== '' && description !== '' && categoryId !== 0) {
            Client.createDish(dishData).then((res) => {
                console.log("dish created")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu(categoryId)
            }).catch((err) => {
                console.log("error creating dish")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }

    const updateCategorySelection = (category) => {
        console.log("category selection updated")
        console.log(category)
        setCategoryId(category.id)
    }

    return (
        <StyledModal>
            <Container>
                <FormInput placeholder='dish name' name='name' onChange={ (event) => {setName(event.target.value)} }/>
                <Dropdown placeholder='*select category*' updateSelection={updateCategorySelection}/>
                <FormInput placeholder='description' name='category' onChange={ (event) => {setDescription(event.target.value)} }/>
                <FormInput placeholder="00.00" name='price' onChange={ (event) => {setPrice(event.target.value)} }/>
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                    <FormButton text='Submit' onClick = {createDish} />    
                </ButtonRow>
            </Container>
        </StyledModal>
    )
}

const EditDishForm = (props) => {
    const [name, setName] = useState(props.dish.name);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState(props.dish.description);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(props.dish.categoryId);

    useEffect(() => {
        Client.getCategory(categoryId).then((res) => {
            console.log(res.data)
            setCategory(res.data.name)
        })
    }, []);

    const updateDish = () => {
        console.log("here")
        let dishData = {
            name: name,
            description: description,
            categoryId: categoryId,
        }
        console.log(dishData)
        if (name !== '' && description !== '' && categoryId !== 0) {
            Client.updateDish(props.dish.id, dishData).then((res) => {
                console.log("dish updated")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu(categoryId)
            }).catch((err) => {
                Client.getDish(props.dish.id).then((oldItem) => {
                    setName(oldItem.name)
                    setDescription(oldItem.description)
                    setCategoryId(oldItem.categoryId)
                })
                console.log("error updating dish")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }

    const updateCategorySelection = (category) => {
        console.log("category selection updated")
        console.log(category)
        setCategoryId(category.id)
    }

    return (
        <StyledModal>
            <Container>
                <FormInput placeholder={name} name='name' onChange={ (event) => {setName(event.target.value)} }/>
                <Dropdown categoryId={categoryId} updateSelection={updateCategorySelection}/>
                <FormInput placeholder={description} name='category' onChange={ (event) => {setDescription(event.target.value)} }/>
                <FormInput placeholder="00.00" name='price' onChange={ (event) => {setPrice(event.target.value)} }/>
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                    <FormButton text='Submit' onClick = {updateDish} />    
                </ButtonRow>
            </Container>
        </StyledModal>
    )
}

const NewCategoryForm = (props) => {
    const [name, setName] = useState('');

    const createCategory = () => {
        let categoryData = {
            name: name,
        }
        console.log(categoryData)
        if (name !== '') {
            Client.createCategory(categoryData).then((res) => {
                console.log("category created")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                console.log("error creating category")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }

    return (
        <StyledModal>
            <Container>
                <FormInput placeholder='category' name='category' onChange={ (event) => {setName(event.target.value)} }/>
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                    <FormButton text='Submit' onClick = {createCategory} />    
                </ButtonRow>
            </Container>
        </StyledModal>
    )
}

const EditCategoryForm = (props) => {
    const [name, setName] = useState(props.category.name);

    const updateCategory = () => {
        let categoryData = {
            name: name,
        }
        console.log(categoryData)
        if (name !== '') {
            Client.updateCategory(props.category.id, categoryData).then((res) => {
                console.log("category updated")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                Client.getCategory(props.category.id).then((oldCategory) => {
                    setName(oldCategory.name)
                })
                console.log("error updating category")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }

    return (
        <StyledModal>
            <Container>
                <FormInput placeholder={name} name='category' onChange={ (event) => {setName(event.target.value)} }/>
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>    
                    <FormButton text='Submit' onClick = {updateCategory} />    
                </ButtonRow>
            </Container>
        </StyledModal>
    )
}

export {NewDishForm, NewCategoryForm, EditDishForm, EditCategoryForm}