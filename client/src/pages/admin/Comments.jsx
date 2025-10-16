import { useEffect, useState } from 'react'
import React from 'react'
import CommentTableItem from './CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const {axios} = useAppContext()


  const fetchComments = async () => {
    try{
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message )
    } catch (error) {
      toast.error(error.message)

    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 '>
      <div className='flex items-center justify-between max-w-3xl'>
        <h1>All Comments</h1>
        <div className='flex items-center gap-4'>
          <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-xs ${filter === 'Approved' ?'text-primary' : 'text-gray-500' }`}>Approved</button>

           <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-xs ${filter === 'Not Approved' ?'text-primary' : 'text-gray-500' }`}>Not Approved</button>

        </div>

        </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4  bg-white shadow rounded-lg scrollbar-hide'>
      <table>
        <thead className='w-full text-sm text-left text-gray-500'>
          <tr>
            <th scope="col" className='px-6 py-3 max-sm:hidden'>Block Title & Comment</th>
            <th scope="col" className='px-6 py-3'>Date</th>
            <th scope="col" className='px-6 py-3'>Action</th>
          </tr>
        </thead>
        <tbody className='w-full text-sm text-gray-500'>
          {comments.filter((comment) => {
            if(filter === 'Approved') return comment.isApproved === true;
            return comment.isApproved === false;
          }).map((comment, index) => (
            <CommentTableItem key={comment._id} comment={comment} index={index + 1} 
            fetchComments={fetchComments} />
          ))}
        </tbody>
       
      </table>

      </div>
    </div>
  )

}

export default Comments
