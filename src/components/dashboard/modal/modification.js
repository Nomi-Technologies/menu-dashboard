import React, { useState } from 'react';
import Client from '../../../util/client';
import { ButtonPrimary, ButtonSecondary } from '../../basics';
import { FormControls, FormInput, FormSplitColumn, FormSplitRow, FormSubtitle, FormTitle } from '../../form';
import { DishTagForm } from "../menu-table/form/dish-tag-form"

import { Modal, useModal } from './modal';

export const useModificationModal = () => {
    const [open, _openModal, closeModal] = useModal();
    const [modification, setModification] = useState();
    const [create, setCreate] = useState(true);

    const createModification = async (mod) => {
        try {
            const res = await Client.createModification(mod);
            if (res) {
                closeModal();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateModification = async (mod) => {
        try {
            const res = await Client.updateModification(mod.id, mod);
            if (res) {
                closeModal();
            }
        } catch (err) {
            console.log(err);
        }

    };

    const saveModification = async () => {
        const mod = {
            ...modification,
            addTags: modification.addTags.map((tag) => tag.id),
            removeTags: modification.removeTags.map((tag) => tag.id),
        }
        create ?
        createModification(mod)
        :
        updateModification(mod);
    }

    const openModal = (modificationOrName) => {
        if (typeof modificationOrName === 'string') {
            setModification({
                name: modificationOrName,
                price: '',
                addTags: [],
                removeTags: [],
            });
            setCreate(true);
        } else {
            setModification(modificationOrName);
            setCreate(false);
        }
        _openModal();
    }

    return {open, openModal, create, setCreate, closeModal, modification, setModification, saveModification};

};

export const ModificationModal = ({ controls: {
    open,
    closeModal,
    create,
    modification,
    setModification,
    saveModification
}}) => {
    return (
        <Modal open={open} closeModal={closeModal}>
            {
                create ?
                <FormTitle>Add New Dish Modifier</FormTitle>
                :
                <FormTitle>Edit Dish Modifier</FormTitle>
            }
            <FormSplitRow>
                <FormSplitColumn style={{ flex: '1 1 auto' }}>
                    <FormSubtitle>Modification Description</FormSubtitle>
                    <FormInput
                        placeholder='Set modifier description...'
                        value={modification?.name}
                        name='name'
                        onChange={(e) => {
                            setModification({
                                ...modification,
                                name: e.target.value
                            })
                        }}
                    />
                </FormSplitColumn>
                <FormSplitColumn style={{
                    flex: '0 1 auto',
                    width: '90px',
                    marginLeft: '24px',
                }}>
                    <FormSubtitle>Upcharge</FormSubtitle>
                    <FormInput
                        placeholder='1'
                        value={modification?.price}
                        name='price'
                        onChange={(e) => {
                            setModification({
                                ...modification,
                                price: e.target.value
                            })
                        }}
                    />
                </FormSplitColumn>
            </FormSplitRow>
            <FormSubtitle>Adds the Following Allergens</FormSubtitle>
            <DishTagForm tags={modification?.addTags} setTags={(selected) => {
                setModification({
                    ...modification,
                    addTags: selected,
                })
            }}></DishTagForm>
            <FormSubtitle>Removes the Following Allergens</FormSubtitle>
            <DishTagForm tags={modification?.removeTags} setTags={(selected) => {
                setModification({
                    ...modification,
                    removeTags: selected,
                })
            }}></DishTagForm>
            <FormControls>
                <ButtonSecondary onClick={closeModal}>Cancel</ButtonSecondary>
                <ButtonPrimary onClick={saveModification}>Save Modifier</ButtonPrimary>
            </FormControls>
        </Modal>
    )
};