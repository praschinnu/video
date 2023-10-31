import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../services/allapis'
import { Col, Row } from 'react-bootstrap'


function View({updatedState}) {

  const [allViddeos, setAllVideos] = useState([])

  //state to update delete 
  const [deleteUpdate,setDeleteUpdate]=useState({})

  const accessAllVideos = async () => {
    const result = await getAllVideos()
    if (result.status >= 200 && result.status < 300) {
      setAllVideos(result.data)
    }
    //console.log(result.data);
  }
  console.log(allViddeos);
  useEffect(() => {
    accessAllVideos()
  }, [updatedState,deleteUpdate])


  return (
    <Row>

      {
        allViddeos.length > 0 ? (
          allViddeos.map(i => (
           <Col > <VideoCard deleteFunc={setDeleteUpdate} video={i}></VideoCard></Col>
          ))
        ) : <h1>no video in your collection</h1>
      }


    </Row>
  )
}

export default View