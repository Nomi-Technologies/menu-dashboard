import { FormButton } from "../../buttons"
import React, { useState, useEffect, useCallback } from 'react';
import { FormInput, PopupFormTitle, DishFormInput, DishFormTextArea } from "../../form"
import { CategoryDropdown } from "./dropdown"
import Client from '../../../util/client'
import styled from "styled-components"
import { useDropzone } from 'react-dropzone'
import _ from "lodash";
import { useQRCode } from 'react-qrcode'
let MultiSelectDropdown;
if (typeof window !== `undefined`) {
    const { Multiselect } = require('multiselect-react-dropdown');
    MultiSelectDropdown = Multiselect;
}

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

        &::placeholder {
          color: grey;
        }   
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

const DishFormTitle = styled.div`
    position: static;
    width: 800px;
    
    left: 20px;
    top: 20px;
    font-family: HK Grotesk Bold;
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

let Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #DCE2E9;
`
let StyledButton = styled.button`
  display: block;
  margin: 20px 0;
  font-size: 14px;
  color: ${props => (props.theme === "light" ? "#F3A35C" : "white")};
  padding: 12px 30px;
  background: ${props => (props.theme === "light" ? "white" : "#F3A35C")};
  border-radius: 8px;
  border: 2px solid #f3a35c;
  transition: 0.3s ease-in-out;
  font-family: "HK Grotesk Bold";
  font-size: 14px;
  &:hover {
    background: rgba(242, 153, 74, 0.2);
  }
`
const TagsForm = ({ tags, setTags }) => {
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    Client.getTags().then(response => {
      setAllTags(response.data)
      console.log(response.data)
    })
  }, [])

  // convert list of tag objects to ids to set in parent form
  const tagIds = (tagList) => {
    let ids = []
    tagList.map(tag => {
      ids.push(tag.id)
    })
    return ids
  }

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList)
    setTags(tagIds(selectedList))
  }

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList)
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

const NewDishForm = props => {
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
}, [])

  const createDish = () => {
    let dishData = {
      name: name,
      description: description,
      categoryId: categoryId,
      dishTags: dishTags,
      price: price,
      menuId: props.menuId,
    }
    console.log(dishData)
    if (name !== "" && categoryId !== 0) {
      Client.createDish(dishData)
        .then(res => {
          console.log("dish created")
          console.log(res.data)
          props.toggleForm()
          props.updateMenu()
        })
        .catch(err => {
          console.log("error creating dish")
          //show some error on form
        })
    } else {
      console.log("missing field")
      //show some error
    }
  }

  const updateCategorySelection = category => {
    console.log("category selection updated")
    console.log(category)
    setCategoryId(category)
  }

  return (
    <>
      <ModalBackground />
      <StyledModal>
        <Container>
          <DishFormTitle>Add Dish</DishFormTitle>
          <DishFormSubtitle>Dish Name</DishFormSubtitle>
          <DishFormInput
            placeholder="Type dish name..."
            name="name"
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Menu Category</DishFormSubtitle>
          <CategoryDropdown
            placeholder="*select category*"
            updateSelection={updateCategorySelection}
            menuId={props.menuId}
            categories={ categories }
            categoryId={ categoryId }
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Description</DishFormSubtitle>
          <DishFormTextArea
            placeholder="Type description..."
            name="category"
            onChange={event => {
              setDescription(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Price</DishFormSubtitle>
          <DishFormInput
            placeholder="12.00"
            name="price"
            onChange={event => {
              setPrice(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Allergen Search</DishFormSubtitle>
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
      </StyledModal>
    </>
  )
}

const EditDishForm = props => {
  const [name, setName] = useState(props.dish.name)
  const [description, setDescription] = useState(props.dish.description)
  const [price, setPrice] = useState(props.dish.price)
  const [categoryId, setCategoryId] = useState(props.dish.categoryId)
  const [dishTags, setDishTags] = useState(props.dish.Tags)
  const [categories, setCategories] = useState([])

  useEffect(() => {
      Client.getAllCategoriesByMenu(props.menuId).then(response => {
          setCategories(response.data)
      })
  }, [])

  const updateDish = () => {
    let dishData = {
      name: name,
      description: description,
      categoryId: categoryId,
      dishTags: dishTags,
      menuId: props.menuId,
    }
    if (name !== "" && description !== "" && categoryId !== 0) {
      Client.updateDish(props.dish.id, dishData)
        .then(res => {
          console.log(res.data)
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

  return (
    <>
      <ModalBackground />
      <StyledModal>
        <Container>
          <DishFormTitle>Update Dish</DishFormTitle>
          <DishFormSubtitle>Dish Name</DishFormSubtitle>
          <DishFormInput
            placeholder="Change dish name..."
            value={name}
            name="name"
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Menu Category</DishFormSubtitle>
          <CategoryDropdown
            categoryId={ categoryId }
            updateSelection={ updateCategorySelection }
            menuId={ props.menuId }
            categories={ categories }
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Description</DishFormSubtitle>
          <DishFormTextArea
            placeholder="Change description..."
            value={description}
            name="description"
            onChange={event => {
              setDescription(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Price</DishFormSubtitle>
          <DishFormInput
            placeholder="Change price..."
            name="price"
            value={price}
            onChange={event => {
              setPrice(event.target.value)
            }}
          />
          <Divider color="#DCE2E9" />
          <DishFormSubtitle>Allergen Search</DishFormSubtitle>
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
      </StyledModal>
    </>
  )
}

const NewCategoryForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createCategory = () => {
        let categoryData = {
            name: name,
            description: description,
            menuId: props.menuId
        }
        console.log(categoryData)
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

    return (
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <DishFormTitle>Add Category</DishFormTitle>
                    <DishFormSubtitle>Category Name</DishFormSubtitle>
                    <DishFormInput placeholder='Type a category name (e.g. Appetizers, Entrees)...' name='category' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <DishFormSubtitle>Description (Optional)</DishFormSubtitle>
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
            </StyledModal>
        </>
    )
}

const EditCategoryForm = (props) => {
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

    return (
        <>
            <ModalBackground />
            <StyledModal>
                <Container>
                    <DishFormTitle>Edit Category</DishFormTitle>
                    <DishFormSubtitle>Category Name</DishFormSubtitle>
                    <DishFormInput placeholder='Type a category name (e.g. Appetizers, Entrees)...' name='category' value={ name } onChange={(event) => { setName(event.target.value) }}/>
                    <Divider/>
                    <DishFormSubtitle>Description (Optional)</DishFormSubtitle>
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
