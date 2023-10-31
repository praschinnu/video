import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';
import uniqid from 'uniqid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCat, getAllCat, getVideo, updateCategory } from '../services/allapis';
import { Trash } from 'react-feather';




function Categorise() {
  //state to hold inputs , id and vide array
  const [catInputs, setCatInputs] = useState({
    id: "",
    name: "",
    videos: []
  })

  const [categories, setCategories] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInputs = (e) => {
    const { value, name } = e.target
    setCatInputs({ ...catInputs, [name]: value })
  }
  console.log(catInputs);

  const addData = async () => {
    let id = uniqid()
    setCatInputs({ ...catInputs, ["id"]: id })

    const { name } = catInputs
    if (name == "") {
      toast.error("Add caption in inputs", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      //api call
      const result = await addCategory(catInputs)
      if (result.status >= 200 && result.status < 300) {
        setShow(false);
        getAllCategories()
        toast.success(`${result.data.name} added`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }


    }
  }
  const getAllCategories = async () => {
    const result = await getAllCat()
    if (result.status >= 200 && result.status < 300) {

      setCategories(result.data);
    }

  }
  // console.log(categories);
  const removeCategories = async (id) => {
    const result = await deleteCat(id)
    if (result.status >= 200 && result.status < 300) {
      //refresh category list
      getAllCategories()
    }
  }


  useEffect(() => {
    getAllCategories()
  }, [])

  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragged over the category...");
  }
  const dropped = async (e, id) => {
    console.log("dropped ...cat id" + id);
    //video id access
    const videoId = e.dataTransfer.getData("cardId")
    console.log(videoId);

    //access video data from backend

    const { data } = await getVideo(videoId)
    console.log(data);


    //select dropped categories from all categories

    const selectedCategory = categories.find(i => i.id == id)
    console.log(selectedCategory);

    //update category object with video data
    selectedCategory.videos.push(data)
    console.log(selectedCategory);

    //api call to update the changed categories in backend
    await updateCategory(id, selectedCategory)
    getAllCategories()
  }




  return (
    <div>
      <Button onClick={handleShow} variant="primary" className='w-100'>
        Add Category
      </Button>

      {
        categories.length > 0 ? (
          categories.map(i => (


  
              <div droppable
                onDragOver={(e) => dragOver(e)}
                onDrop={(e) => dropped(e, i?.id)}
                className='border border-dark mt-2 p-1'>
  
  
  

              <p className='fs-3 text-dark'>{i.name}  </p>
              <div className='text-end'>
                <Trash size={65} className='btn' onClick={() => { removeCategories(i.id) }}></Trash>
              
              </div>
              
              
              {
                i.videos.map(j=>(
                 
                    <div>
                      <img style={{height:'60px', width:'60px',padding:'5px'}} 
                      src={j.cover_image} alt="" />
                    </div>
                
                ))
              }
            </div>
          ))
        ) : <h3>no categories added yet</h3>

      }

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <Modal.Title><h1 className='m-2 ms-1' style={{ color: 'black' }}>Add New Category</h1></Modal.Title>

        </ModalHeader>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Category name"
            className="mb-3 mt-2"
          >
            <Form.Control onChange={(e) => setInputs(e)} name='name' type="text" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={addData}>
            Add
          </Button>

        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </div>
  )
}

export default Categorise