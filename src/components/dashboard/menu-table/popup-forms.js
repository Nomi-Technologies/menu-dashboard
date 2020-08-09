import React, { useState, useEffect, useCallback } from 'react';
import { FormInput, PopupFormTitle, DishFormInput} from "../../form"
import { FormButton } from "../../buttons"
import { Dropdown } from "./dropdown"
import Client from '../../../util/client'
import styled from "styled-components"
import { useQRCode } from 'react-qrcode'
import { useDropzone } from 'react-dropzone'
import "../../pages/index.css"
import { Dropdown } from 'semantic-ui-react'
import _ from "lodash";

const StyledModal = styled.div`
    top: 100px;
    position: absolute;
    width: 80%;
    z-index: 100;
    box-shadow: 2px 2px 2px grey;
    border-radius: 5px;
    background-color: white;
    left: 50%;
    transform: translate(-50%, 0);
`

const Container = styled.div`
    display: block;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 95%;
    margin-top: 30px;

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

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    button {
        margin-left: 10px;
    }
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    left: 280px;
    background-color: rgba(10, 10, 10, 0.5);
    z-index: 1;
`

const StyledTagsForm = styled.div`
    h1 {
        display: block;
        font-size: 24px;
        margin-bottom: 10px;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;

        .tag {
            flex-basis: 50%;
            display: flex;
            justify-content: middle;
            box-sizing: border-box;
            padding: 5px 0;

            input {
                display: inline-block;
            }

            p {
                padding-left: 10px;
                display: inline-block;
                margin: 0;
            }
        }
    }
`

const DishFormTitle = styled.div`
    position: static;
    width: 800px;
    
    left: 20px;
    top: 20px;
    font-family: HK Grotesk Bold;
    // font-style: normal;
    //font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: #000000;
    
    align-self: flex-start;
`
const DishFormSubtitle = styled.div`
    position: static;
    width: 800px;
    height: 12px;
    left: 20px;
    font-family: HK Grotesk Regular;
    
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #000000;
    margin-top: 10px;
`

const NewDivider = styled.div`
    border-bottom: 3px solid black;
    border:none;
    display: block;
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    width: 100%;
`

const Divider = ({ color }) => (
    <hr
        style={{
            borderColor: color,
            width: "100%",
        }}
    />
);

const TagsForm = ({ tags, setTags }) => {
    const [allTags, setAllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        Client.getTags().then((response) => {
            setAllTags(response.data);
        })

        if (tags != null) {
            let builtSelectedTags = []
            tags.map((tag) => {
                builtSelectedTags.push(tag.id)
            })

            setSelectedTags(builtSelectedTags)
        }
    }, [])

    let allergenNames = new Array(allTags.length);
    for (let index = 0; index < allTags.length; index++) {
        allergenNames[index] = allTags[index].name;
    }

    const allergenOptions = _.map(allergenNames, (allergen, index) => ({
        key: allergen,
        text: allergen,
        value: allergen
    }));
    console.log("allergen result: ", allergenOptions);

    // update tags based on checkbox
    const updateSelectedTags = (tagId) => {
        let newSelectedTags = [...selectedTags]
        if (!selectedTags.includes(tagId)) {
            newSelectedTags.push(tagId)
            setSelectedTags(newSelectedTags)
        } else {
            const index = selectedTags.indexOf(tagId);
            if (index > -1) {
                newSelectedTags.splice(index, 1);
                setSelectedTags(newSelectedTags)
            }
        }
        // update dishes tags
        setTags(newSelectedTags)
    }

    return (
        <StyledTagsForm>
            <h1 className='header'>
                Allergens
            </h1>
            <div className='tags'>
                {
                    allTags ? allTags.map((item, index) => (
                        <div key={item.id} className='tag'>
                            <input type="checkbox" name={item.id} key={item.id} checked={selectedTags.includes(item.id) ? true : false} onChange={(event) => { updateSelectedTags(item.id) }} />
                            <p>{item.name}</p>
                        </div>
                    )) : null
                }
            </div>
        </StyledTagsForm>
        // <Dropdown
        //     placeholder='Start typing to begin...'
        //     fluid
        //     multiple
        //     search
        //     selection
        //     options={allergenOptions}
        // />
    )
}

const NewDishForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [dishTags, setDishTags] = useState([]);

    const createDish = () => {
        let dishData = {
            name: name,
            description: description,
            categoryId: categoryId,
            dishTags: dishTags,
            price: price,
            menuId: props.menuId,
        }
        console.log("Dishdata", dishData)
        if (name !== '' && description !== '' && categoryId !== 0) {
            Client.createDish(dishData).then((res) => {
                console.log("dish created")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                console.log("error creating dish")
                //show some error on form
            })
        } else {
            console.log("missing field")
            //show some error
        }
    }
    console.log("tags", dishTags);
    const updateCategorySelection = (category) => {
        console.log("category selection updated")
        console.log(category)
        setCategoryId(category.id)
    }

    return (
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <DishFormTitle>Add Dish</DishFormTitle>
                    <DishFormSubtitle>Dish Name</DishFormSubtitle>
                    <DishFormInput placeholder='Type dish name...' name='name' onChange={(event) => { setName(event.target.value) }} />
                    <Divider color="#DCE2E9" />
                    <DishFormSubtitle>Menu Category</DishFormSubtitle>
                    <Dropdown placeholder='*select category*' updateSelection={updateCategorySelection} menuId={props.menuId} />
                    <Divider color="#DCE2E9" />
                    <DishFormSubtitle>Description</DishFormSubtitle>
                    <DishFormInput placeholder='Type description...' name='category' onChange={(event) => { setDescription(event.target.value) }} />
                    <Divider color="#DCE2E9" />
                    <DishFormSubtitle>Price</DishFormSubtitle>
                    <DishFormInput placeholder="12.00" name='price' onChange={(event) => { setPrice(event.target.value) }} />
                    <Divider color="#DCE2E9" />
                    <DishFormSubtitle>Allergen Search</DishFormSubtitle>
                    <TagsForm tags={dishTags} setTags={setDishTags}></TagsForm>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Add Dish' onClick={createDish} />
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}

const EditDishForm = (props) => {
    const [name, setName] = useState(props.dish.name);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState(props.dish.description);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(props.dish.categoryId);
    const [dishTags, setDishTags] = useState(props.dish.Tags);

    console.log(props)

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
            dishTags: dishTags,
            price: price,
            menuId: props.menuId,
        }
        console.log(dishData)
        if (name !== '' && categoryId !== 0) {
            Client.updateDish(props.dish.id, dishData).then((res) => {
                console.log("dish updated")
                console.log(res.data)
                props.toggleForm()
                props.updateMenu()
            }).catch((err) => {
                Client.getDish(props.dish.id).then((oldItem) => {
                    setName(oldItem.name)
                    setDescription(oldItem.description)
                    setCategoryId(oldItem.categoryId)
                    setPrice(oldItem.price)
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
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <FormInput placeholder="Dish Name" value={name} name='name' onChange={ (event) => {setName(event.target.value)} }/>
                    <Dropdown categoryId={categoryId} updateSelection={updateCategorySelection} menuId={props.menuId}/>
                    <FormInput placeholder="Description" value={ description } name='description' onChange={ (event) => {setDescription(event.target.value)} }/>
                    <FormInput placeholder="Price" name='price' onChange={ (event) => { setPrice(event.target.value)} }/>
                    <TagsForm tags={ dishTags } setTags={ setDishTags }></TagsForm>
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm}/>
                        <FormButton text='Submit' onClick = {updateDish} />
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}

const NewCategoryForm = (props) => {
    const [name, setName] = useState('');

    const createCategory = () => {
        let categoryData = {
            name: name,
            menuId: props.menuId,
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
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <FormInput placeholder='category' name='category' onChange={(event) => { setName(event.target.value) }} />
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Submit' onClick={createCategory} />
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}

const EditCategoryForm = (props) => {
    const [name, setName] = useState(props.category.name);

    const updateCategory = () => {
        let categoryData = {
            name: name,
            menuId: props.menuId,
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
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <FormInput placeholder="Name" name='category' value={name} onChange={(event) => { setName(event.target.value) }} />
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.toggleForm} />
                        <FormButton text='Submit' onClick={updateCategory} />
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    )
}


let StyledDeleteConfirmation = styled.div`
    ${StyledModal} {
        width: 50%;
        top: 350px;
    }
`

const DeleteConfirmation = ({ closeForm }) => (
    <StyledDeleteConfirmation>
        <ModalBackground />
        <StyledModal>
            <Container>
                Are you sure you want to delete this item?
                <ButtonRow>
                    <FormButton text='Cancel' theme='light' onClick={ () => { closeForm(false) } }/>
                    <FormButton text='Delete' onClick={ () => { closeForm(true) } }/>
                </ButtonRow>
            </Container>

        </StyledModal>
    </StyledDeleteConfirmation>
)

const QRCode = styled.div`
    display: block;
    margin: 50px auto;
    width: 250px;
    height: 250px;
`;

const QRCodeForm = (props) => {

    const url = `${process.env.GATSBY_SMART_MENU_URL}/${props.uniqueName}`
    const qrCodeDataUrl = useQRCode({
        value: url,
        scale: 128,
        margin: 0,
        type: 'image/png',
    });

    return (
        <>
            <ModalBackground/>
            <StyledModal>
                <Container>
                    <PopupFormTitle>Download QRCode for {props.name}</PopupFormTitle>
                    {
                        props.uniqueName === null ?
                        <QRCode>Generating QR code...</QRCode>
                        :
                        <QRCode as='img' src={qrCodeDataUrl}/>
                    }
                    <ButtonRow>
                        <FormButton text='Cancel' theme='light' onClick={props.closeForm}/>
                        <a
                            href={qrCodeDataUrl}
                            download={`${props.uniqueName}-QRCode`}
                        ><FormButton text='Download as PNG' onClick={() => {}}/></a>
                    </ButtonRow>
                </Container>
            </StyledModal>
        </>
    );
}

const StyledUploadCSVModal = styled.div`
    .file-input {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        margin-bottom: 20px;
        border: 2px dashed grey;
        border-radius: 15px;

        &:focus {
            outline: none;
        }
    }

    .error-msg {
        color: red;
    }
    
    p {
        margin-left: 20px;
        display: inline-block;
    }
`

const UploadCSVModal = (props) => {
    let { show, close, uploadCSV } = props
    let [overwrite, setOverwrite] = useState(false)
    let [content, setContent] = useState(null)
    let [fileName, setFileName] = useState(null)
    let [errorMessage, setErrorMessage] = useState(null)
    
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()      
            reader.onabort = () => console.error('file reading was aborted')
            reader.onerror = () => {
                console.error('file reading has failed')
                setErrorMessage("Error uploading file")
            }
            reader.onload = () => {
            // Do whatever you want with the file contents
              const fileContent = reader.result
              setContent(fileContent)
              setFileName(file.path)
            }

            if(file.path.includes(".csv")) {
                setErrorMessage(null)
                reader.readAsText(file)
            } else {
                console.error("Incorrect file type chosen")
                setErrorMessage("Incorrect file uploaded, please choose a .csv file")
            }
          })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const postCSVFile = () => {
        Client.uploadCSV(content, props.menuId, overwrite).then(() => {
            setErrorMessage(null)
            setFileName(null)
            setContent(null)
            props.updateMenu()
            props.close()
        })
    }

    if(show) {
        return (
            <>
                <ModalBackground/>
                <StyledModal>
                    <Container>
                        <StyledUploadCSVModal>
                        {
                            errorMessage ? <p className='error-msg'>{ errorMessage }</p> : <></>
                        }
                        {
                            content ? 
                            <div>
                                <p>Selected File: { fileName }</p>
                            </div>
                            : 
                            <div className='file-input' {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p>Drop the .csv file here ...</p> :
                                <p>Drag and drop a .csv file here, or click to select a file</p>
                            }
                            </div>
                        }

                        </StyledUploadCSVModal>
                        <ButtonRow>
                            <FormButton text='Cancel' theme='light' onClick={ () => {
                                close()
                            } }
                            />    
                            <FormButton text="Upload CSV" onClick={ () => { 
                                if(content) {
                                    postCSVFile()
                                } else {
                                    setErrorMessage("Please select a file to upload")
                                }
                            } }
                            />    
                        </ButtonRow>
                    </Container>
                </StyledModal>
            </>
        )
    } else {
        return null
    }
}

export {
    NewDishForm,
    NewCategoryForm,
    EditDishForm,
    EditCategoryForm,
    DeleteConfirmation,
    QRCodeForm,
    UploadCSVModal
}
