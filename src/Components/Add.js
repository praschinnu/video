import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import  uniqid from 'uniqid';
import { addVideo } from '../services/allapis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


function Add({update}) {

  //state to hold input datas
  const [inputs, setInputs] = useState({
    id: "",
    Caption: "",
    cover_image: "",
    video_url: ""
  })

  //create a state to hold input data's

  const setValues = (e) => {
    // console.log(e.target.value);
    //value that we want save inside key
    let { value, name } = e.target
    // console.log(value,name);

    //key
    // console.log(e.target.name);
    // let name=e.target.name
    setInputs({ ...inputs, [name]: value })
  }
  //fn to extract video_url
  const extractUrl = (e) => {
    let videoUrl = e.target.value
    //  console.log(videoUrl);
    if (videoUrl.includes("v=")) {
      // let index=videoUrl.indexOf("v=")
      // // console.log(index);
      // let subUrl=videoUrl.slice(index+2,index+13)
      // console.log(subUrl);
      let subUrl = videoUrl.split("v=")[1]
      // console.log(subUrl);
      let finalUrl =`https://www.youtube.com/embed/${subUrl}?autoplay=1`
        setInputs({ ...inputs, ["video_url"]: finalUrl })
        

    }
  }



  const addhandle = async () => {
    let id = uniqid()
    setInputs({ ...inputs, ["id"]: id })

    const {caption,cover_image,video_url}=inputs
    if(caption=="" || cover_image=="" || video_url==""){
      toast.error("all inputs are required", {
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
    else{
      const result = await addVideo(inputs)
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        //update state of home
        update(result.data)
        
        toast.success('video added', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setShow(false)
    }
    }

   
  }
  console.log(inputs);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>

      <i onClick={handleShow} class="fa-solid fa-square-plus fa-beat fa-xl text-dark"></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1>upload video</h1></Modal.Title>



        </Modal.Header>
        <Modal.Body>


          <FloatingLabel
            controlId="floatingInput"
            label="Video caption"
            className="mb-3"
          >
            <Form.Control name='caption' onChange={(e) =>setValues(e)} type="email" placeholder="name@example.com" />
          </FloatingLabel>


          <FloatingLabel controlId="floatingInput1" label="Cover Image URL" className="mb-3">
            <Form.Control name='cover_image' onChange={(e) => setValues(e)} type="text" />
          </FloatingLabel>


          <FloatingLabel controlId="floatingInput2" label="youtube video URL" className="mb-3">
            <Form.Control onChange={(e)=>extractUrl(e)} type="text" />
          </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addhandle}> 
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Add