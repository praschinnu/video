import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Trash2 } from 'react-feather';
import { deleteHistory, getAllHistory } from '../services/allapis';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function History() {
    const [histories, setHistories] = useState([])
    const getHistories = async () => {
        const { data } = await getAllHistory()
        setHistories(data);
    }
    useEffect(() => {
        getHistories()
    }, [])
    // console.log(histories);

const removeItem=async(id)=>{
   await deleteHistory(id)
   getHistories()
}

    return (
        <div>
            <h1 className='text-center p-4'>History</h1>

            {histories.length > 0 ? (
                <Table className='w-85 container pb-5 mb-5' striped bordered hover varient="dark">
                    <thead className='text-center fs-5 border-dark'>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Video Url</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='border-dark'>
                        {
                            histories?.map((i, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{i?.date}</td>
                                    <td>{i?.video_title}</td>
                                    <td>{i?.url}</td>
                                    <td className='text-center'>
                                         <Trash2 onClick={()=>removeItem(i?.id)} size={66} className='btn'>

                                         </Trash2>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>) :
                <h3 className='text-center p-5'>no histroy</h3>
            }
            <div className='text-end pe-5 pb-3'>

               <Link to={'/home'}>
                <Button className='btn btn-dark rounded'>Go Back</Button>
                </Link>
            </div>
        </div>
    )
}

export default History