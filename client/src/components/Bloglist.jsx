import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { Blogcard }  from '../components/Blogcard';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const {blogs, input } = useAppContext()

  const filteredBlogs = ()=>{
    if(input === ''){
      return blogs
    }
    return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.
      toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 my-10">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${menu ===item && 
                'text-white px-4 pt-0.5'}`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute inset-x-0 top-0 h-full bg-primary rounded-full -z-10"
                />
              )}
            </button>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 
      mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu)
        .map((blog) =>
          <Blogcard key={blog._id} blog={blog} />
       )}

      </div>
    </div>
  )
};

export default Bloglist;