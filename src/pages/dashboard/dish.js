import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import Client from "../../util/client"

import MenuTableLayout from '../../components/dashboard/menu-table/menu-table-layout';
import { ButtonPrimary, ButtonSecondary } from "../../components/basics"
import { FormTitle, FormSubtitle, FormInput, FormTextArea, FormSplitRow, FormSplitColumn, FormContainer, FormControls } from "../../components/form"
import { FileDrop } from "../../components/file-drop"
import { CategoryDropdown } from "../../components/dashboard/menu-table/form/dropdown"
import { DishTagForm } from "../../components/dashboard/menu-table/form/dish-tag-form"
import Navigation from '../../util/navigation';

const DishPage = ({ location }) => {
    const { state = {} } = location
    if(state === null) {
        navigate('/dashboard/all-menus')
    }
    
    const { menuId, dishId, create } = state
    const [dishData, setDishData] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: 0,
        Tags: []
    })

    const [errorMessage, setErrorMessage] = useState(null)
    const [dishImage, setDishImage] = useState(null)

    const updateCategorySelection = (categoryId) => {
        setDishData({
            ...dishData,
            categoryId: categoryId
        })

        console.log(dishData)
    }

    const setDishTags = (tags) => {
        setDishData({
            ...dishData,
            Tags: tags
        })
    }

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
    
    const initializeForm = () => {
        if(!create) {
            Client.getDish(dishId).then((res) => {
                setDishData(res.data)
            })
        }
    }

    const validateDishData = () => {
        if(dishData.categoryId === 0) {
            return false
        }

        if(dishData.name === "") {
            return false
        }
        return true
    }

    const createOrUpdateDish = async () => {
        // first validate dish form
        if(!validateDishData()) return

        // reformat tags into list of ids
        let tagIds = []
        dishData.Tags.forEach((tag) => {
            tagIds.push(tag.id)
        })

        let postDishData = {
            ...dishData,
            dishTags: tagIds
        }

        try {
            if(create) {
                await Client.createDish(postDishData);
            } else {
                await Client.updateDish(dishId, postDishData);
            }

            navigate('/dashboard/table', { state: { menuId } })
        } catch(error) {
            console.log("could not create dish")
        }
    }
    
    useEffect(() => {
        initializeForm()
    }, [])

    return (
        <MenuTableLayout menuId={ menuId }>
            <FormContainer>
                <FormTitle>
                    { create ?
                        "Create Dish" : "Edit Dish Info"
                    }
                </FormTitle>
                <FormSubtitle>Dish Name</FormSubtitle>
                <FormInput
                    placeholder="Set dish name..."
                    value={ dishData.name }
                    name="name"
                    onChange={ event => {
                        setDishData({
                            ...dishData,
                            name: event.target.value
                        })
                    }}
                />
                <FormSubtitle>Description</FormSubtitle>
                <FormTextArea
                    placeholder="Set description..."
                    value={ dishData.description }
                    name="description"
                    onChange={ event => {
                        setDishData({
                            ...dishData,
                            description: event.target.value
                        })
                    }}
                />
                <FormSplitRow>
                    <FormSplitColumn>
                        <FormSubtitle>Menu Section</FormSubtitle>
                        <CategoryDropdown
                            categoryId={ dishData.categoryId }
                            updateSelection={ updateCategorySelection }
                            menuId={ menuId }
                        />
                    </FormSplitColumn>
                    <FormSplitColumn>
                        <FormSubtitle>Price</FormSubtitle>
                        <FormInput
                            placeholder="Set price..."
                            name="price"
                            value={ dishData.price }
                            onChange={ event => {
                                setDishData({
                                    ...dishData,
                                    price: event.target.value
                                })
                            }}
                        />
                    </FormSplitColumn>
                </FormSplitRow>
                <FormSubtitle>Allergens</FormSubtitle>
                <DishTagForm tags={ dishData.Tags } setTags={ setDishTags }></DishTagForm>
                <FormSubtitle>Image (Optional)</FormSubtitle>
                <FileDrop acceptedFileTypes={ ['.png', '.jpg', '.jpeg', ] } setFile={ setFile } setErrorMessage={ setErrorMessage } clearFile={ clearFile }/>                
                <FormControls>
                    <ButtonSecondary onClick={ ()=>{ Navigation.table(menuId) } }>Cancel</ButtonSecondary>
                    <ButtonPrimary onClick={createOrUpdateDish}>
                        { create ?
                            "Create Dish" : "Update Dish"
                        }
                    </ButtonPrimary>
                </FormControls>
            </FormContainer>
        </MenuTableLayout>
    )
}

export default DishPage
