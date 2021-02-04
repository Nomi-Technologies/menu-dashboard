import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import Client from "../../util/client"
import { Colors } from '../../util/colors';

import MenuTableLayout from '../../components/dashboard/menu-table/menu-table-layout';
import { ButtonPrimary, ButtonSecondary } from "../../components/basics"
import { FormTitle, FormSubtitle, FormInput, FormTextArea, FormSplitRow, FormSplitColumn, FormContainer, FormControls } from "../../components/form"
import { FileDrop } from "../../components/file-drop"
import { CategoryDropdown } from "../../components/dashboard/menu-table/form/dropdown"
import { DishTagForm } from "../../components/dashboard/menu-table/form/dish-tag-form"
import ModifierDropDown from '../../components/dashboard/menu-table/form/modifier-dropdown';
import Navigation from '../../util/navigation';

import EditIcon from "../../assets/img/edit-icon.png"
import DeleteIcon from '../../assets/img/delete-icon-red.png'
import styled from 'styled-components';
import { ModificationModal, useModificationModal } from '../../components/dashboard/modal/modification';

const ModifierContainer = styled.div`
    margin: 20px 0;
    padding: 10px 20px;
    border: 1px solid ${Colors.SLATE_LIGHT};
    border-radius: 5px;
`;

const Modifier = styled.div`
    position: relative;
    font-size: 14px;
    margin: 10px 0;

    & span {
        font-family: 'HK Grotesk Light';
        color: ${Colors.GRAY}
    }

    & .edit, & .delete {
        width: 14px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        cursor: pointer;
    }

    & .edit {
        right: 30px;
    }

    & .delete {
        right: 5px;
    }
`;

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
        Tags: [],
        Modifications: [],
    })

    const [errorMessage, setErrorMessage] = useState(null)
    const [dishImage, setDishImage] = useState(null)
    const modificationModalControls = useModificationModal();

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

        let postDishData = {
            ...dishData,
            dishTags: dishData.Tags.map((tag) => tag.id),
            dishModifications: dishData.Modifications.map((mod) => mod.id),
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
                <FormTitle>Dish Modifiers</FormTitle>
                <FormSplitRow>
                    <div style={{
                        padding: '0 10px 0 4px',
                        flex: '0 1 auto',
                        color: `${Colors.SLATE_DARK}`,
                        fontSize: '38px',
                        cursor: 'default',
                    }}>+</div>
                    <ModifierDropDown
                        style={{
                            flex: '1 1 auto',
                        }}
                        onSelect={({ value }) => {
                            const modifications = dishData.Modifications.slice(0);
                            modifications.push(value);
                            setDishData({
                                ...dishData,
                                Modifications: modifications,
                            })
                        }}
                        onCreate={(value) => {
                            modificationModalControls.openModal(value);
                        }}
                    />
                </FormSplitRow>
                {
                    dishData.Modifications ?
                    <ModifierContainer>
                        {
                            dishData.Modifications.map((modification, index) => {
                                return (
                                    <Modifier>
                                        {modification.name}
                                        <span>
                                            , ${modification.price}
                                        </span>
                                        {
                                            modification.addTags.length > 0 ?
                                            <span>
                                                , adds {modification.addTags.map((tag) => tag.name).join(', ')}
                                            </span>
                                            :
                                            null
                                        }
                                        {
                                            modification.removeTags.length > 0 ?
                                            <span>
                                                , removes {modification.removeTags.map((tag) => tag.name).join(', ')}
                                            </span>
                                            :
                                            null
                                        }
                                        <img className='edit' src={EditIcon} alt="edit icon" onClick={() => {
                                            modificationModalControls.openModal(modification);
                                        }} />
                                        <img className='delete' src={DeleteIcon} alt='delete icon' onClick={() => {
                                            console.log(dishData);
                                            const modifications = dishData.Modifications.slice(0);
                                            modifications.splice(index, 1);
                                            setDishData({
                                                ...dishData,
                                                Modifications: modifications,
                                            });
                                        }} />
                                    </Modifier>
                                );
                            })
                        }
                    </ModifierContainer>
                    :
                    null
                }
                <FormControls>
                    <ButtonSecondary onClick={ ()=>{ Navigation.table(menuId) } }>Cancel</ButtonSecondary>
                    <ButtonPrimary onClick={createOrUpdateDish}>
                        { create ?
                            "Create Dish" : "Update Dish"
                        }
                    </ButtonPrimary>
                </FormControls>
            </FormContainer>
            <ModificationModal controls={modificationModalControls} />
        </MenuTableLayout>
    )
}

export default DishPage
