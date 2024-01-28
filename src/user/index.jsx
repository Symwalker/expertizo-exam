import { useForm } from "react-hook-form"
import shayan from "../assets/shayan.jpg"
import { auth, getUser, logout, updataUser } from "../config/firebase"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import toast, { Toaster } from "react-hot-toast"
import Loader from "../components/loader"
import { useNavigate } from "react-router-dom"
const User = () => {
    const [userr, setUser] = useState()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [image, setImage] = useState()
    const [isLoading, setLoading] = useState(false)
    const handleupdate =async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const log =  await updataUser(userId,{age, name, image}) 
            setLoading(false) 

            if (log) {
             toast.success("succesfully updated")
            }

            
        } catch (error) {
            setLoading(false) 
            
            
        }
        console.log(age, name, image);
    }

const navigate = useNavigate()
    const loggedOut = async () => {
        const sign = await logout()
        console.log(sign);
        if(sign){
            navigate('/')
        }
       
    }

  
    const [previewImage, setPreviewImage] = useState(null);
    const [userId, setUserId] = useState();
    console.log(userId);
    console.log(userId);

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(userr);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await getUser(user.uid)
                setUserId(user.uid)
                setUser(data)
            }
        })
    }, [])
    
    useEffect(() => {
        if (userr) {
            setName(userr.fullName || '');
            setAge(userr.age || '');
        }
    }, [userr]);
    return (
        <div className='flex max-w-[1400px] mx-auto gap-10 mt-10'>
             <Toaster
          position="top-center"
          reverseOrder={false}
        />
            <div className='w-[35%]  bg-white shadow-md drop-shadow-md px-2 py-10'>

                <img src={userr?.profilePic} className="w-[140px] h-[140px] mx-auto border-[#23E5DB]   border-3 rounded-full" alt="" />
                <p className="font-bold text-[26px]  text-center mt-2">{userr?.fullName}</p>
                <p className="text-[16px] text-center text-gray-500 font-semibold">{userr?.email}</p>
                <p className="text-[20px] text-center   font-bold"> <span>Age</span> : {userr?.age}</p>
                <div className="w-[90%] mx-auto mt-32">
                    <button onClick={loggedOut} className=" w-full  bg-[#000] text-white font-medium text-[22px] p-3 rounded-md ">Logout</button>
                    <button  className=" w-full  bg-red-600 text-white font-medium text-[22px] p-3 rounded-md mt-2 ">Delete</button>

                </div>
            </div>
            <div className='w-[65%]  text-white'>
                <form className="flex  h-full flex-col justify-between " onSubmit={handleupdate}>
                    <div className="mb-5 ">
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Full Name" className=" pr-4 w-full py-3 border-b border-solid border-[#0066ff3c] focus:outline-none focus:border-b-[#0067ff] text-[22px] leading-7 text-black placeholder:text-gray-500 cursor-pointer" required />
                    </div>
                    <div className="mb-5">
                        <input type="email" disabled value={userr?.email} placeholder="salman@gmail.com" className=" pr-4 w-full py-3 border-b border-solid border-[#0066ff3c] focus:outline-none focus:border-b-[#0067ff] text-[22px] leading-7 text-black placeholder:text-gray-500 cursor-pointer" readOnly aria-readonly required />
                    </div>

                    <div className="mb-5">
                        <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age" className=" pr-4 w-full py-3 border-b border-solid border-[#0066ff3c] focus:outline-none focus:border-b-[#0067ff] text-[22px] leading-7 text-black placeholder:text-gray-500 cursor-pointer" />
                    </div>


                    <div className="mb-5 flex items-center gap-3 ">
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067ff] flex items-center justify-center ">
                            <img src={previewImage ? previewImage : userr?.profilePic} className="w-full rounded-full" alt="" />
                        </figure>
                        <div className="relative w-[130px] h-[50px]  ">
                            <input type="file" onChange={handleImageChange} id="customFile" accept=".jpg, .png" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer " />
                            <label htmlFor="customFile" className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-black font-semibold rounded-lg truncate cursor-pointer ">
                                upload Photo
                            </label>
                        </div>

                    </div>
                    <div className="mt-7 ">
                        <button type="submit" onClick={handleupdate} className=" bg-[#002F34] w-full rounded-lg px-4 py-6 text-[21px] leading-[30px]">{isLoading ?  <Loader/>:'Update'}</button>
                        {/* disabled={isLoading && true} */}
                    </div>
                    {/* value={formData.name} onChange={handleInputChange}  */}
                </form>
            </div>
        </div>
    )
}

export default User
