import { useState } from "react"
import "./index.css"
import { addItem } from "../../config/firebase"
import { Toaster } from "react-hot-toast"
import { useForm } from "react-hook-form"
import Loader from "../../components/loader"
// import Loader from "../../components/loader"

const Sellitem = () => {
  const [isLoading, setLoading] = useState(false)
  console.log(isLoading);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  // const handleSubmit = async () => {
  //   await addItem({ brand, title, description, category, price })
  // }
  return (
    <div className='max-w-[1000px] mx-auto mt-10'>
       <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <h2 className='text-[32px] mb-2 font-bold '>
        Want to Sell Items...
      </h2>
      <div className=' rounded-md shadow-md drop bg-white py-5 px-5 flex flex-col gap-5'>
          
          <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate
            className="space-y-6"
            onSubmit={handleSubmit(async(data) => {
              
              const image = data.image[0]
              const { brand , title, description, category, price } = data
              // const addProduct =  await addItem({ brand , title, description, category, price, image })
              try {
                setLoading(true)
                const addPr0 =  await addItem({ brand , title, description, category, price, image })
                if (addPr0) {
                setLoading(false) 
              }
              } catch (error) {
              setLoading(false)
                
              }

            })}>
            <div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Brand</label>
          <input type="text" placeholder='Brand' id="brand" className='px-3 py-2  border-2 border-gray-400 rounded-md text-[20px] outline-none' {...register("brand", { required: true })} />
                  {errors.brand && <span className="text-red-500">This brand field is required</span>}
              </div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Title</label>
          <input type="text" placeholder='Title' id="title" className='px-3 py-2 border-2 border-gray-400  rounded-md text-[20px] outline-none' {...register("title", { required: true })} />
                  {errors.title && <span  className="text-red-500">This title field is required</span>}
              </div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Category</label>
          <input type="text" placeholder='Category' id="brand" className='px-3 py-2  border-2 border-gray-400 rounded-md text-[20px] outline-none' {...register("category", { required: true })} />
                  {errors.category && <span  className="text-red-500">This Category field is required</span>}
              </div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Price</label>
          <input type="text" placeholder='Price' id="Price" className='px-3 py-2  border-2 border-gray-400 rounded-md text-[20px] outline-none' {...register("price", { required: true })} />
                  {errors.price && <span  className="text-red-500">This Price field is required</span>}
              </div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Description</label>
          <input type="text" placeholder='Description' id="brand" className='px-3 py-2 border-2 border-gray-400  rounded-md text-[20px] outline-none' {...register("description", { required: true })} />
                  {errors.description && <span  className="text-red-500">This Price field is required</span>}
              </div>
            <div className='flex flex-col gap-1'>
          <label htmlFor="brand" className="text-black font-bold">Description</label>
          <input type="file" placeholder='Description' id="brand" className='px-3 py-2 border-2 border-gray-400  rounded-md text-[20px] outline-none' {...register("image", { required: true })} />
                  {errors.image && <span  className="text-red-500">Select Image</span>}
              </div>
            </div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#002F34] px-3 py-3 text-sm font-semibold  text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                {/* Add item */}
                {isLoading ?  <Loader/>:'Add Item'}
              </button>
          </form>

          
        </div>
      </div>
    </div>
  )
}

export default Sellitem


// import React, { useState } from 'react';

// import { Link } from 'react-router-dom';

// export function Sellitem() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()
//   // console.log(errors);
//   return (
//     <>
     
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <img
//             className="mx-auto h-10 w-auto"
//             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//             alt="Your Company"
//           />
//           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Sign up to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form noValidate
//             className="space-y-6"
//             onSubmit={handleSubmit((data) => {
//               console.log(data);
//             })}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   {...register('email', { required: "email is required", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "email is not valid" } })}
//                   type="email"
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

//               </div>
//             </div>
//             <div className="mt-2">
//               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 {...register('password', {
//                   required: "password is required",
//                   pattern: {
//                     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
//                     message: `- at least 8 characters\n
//                     - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
//                     - Can contain special characters`
//                   }
//                 })}
//                 type="password"
//                 className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//               {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

//             </div>
//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                   Confirm Password
//                 </label>
//                 <div className="text-sm">
//                   <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="confirm-password"
//                   {...register('confirmPassword', {
//                     required: "confirm-password is required", validate: (value, formValues) => value === formValues.password || 'password not matching'
//                   })}
//                   type="password"
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//                 {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
//               </div>

//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <p className="mt-10 text-center text-sm text-gray-500">
//             Already a Member?{' '}
//             <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }