import React, { useState ,useRef} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
import { toggleLoader } from '../redux/loaderSlice';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { END_POINT } from '../utils/constants';
const EditAdminProfile= () => {
    const userData = useSelector((state)=>state.user.user)
    const loader = useSelector((state)=>state.loader.loader)
const dispatch = useDispatch();
const navigate = useNavigate();
   // console.log(userData)
    const [user, setUser] = useState({
        photo: "",
        name: userData?.fullName||"",
        email: userData?.email||"",
        phone: userData?.phoneNumber||"",
      });
      const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        const maxSize = 500*1024;
        //console.log(file);
        if(file && file.size > maxSize){
          toast("File size exceeded")
          return;
        }
        if (e.target.name === 'photo') {
            setUser({ ...user, photo: file }); 
        }
    };
    
   
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    const checkPhone = ()=>{
        const regexp = /^[1-9]\d{9}$/
        return regexp.test(user.phone)
    }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!checkPhone()){
            toast.error("Incorrect Phone number")
            return;
        }
        const formData = new FormData();
        formData.append("fullName", user.name || "");
        formData.append("phoneNumber", user.phone || "");
        formData.append("profilePhoto", user.photo || "");
       
        // formData.forEach((value,key)=>{
        //   console.log(`${key}:${value}`)
        // })

        try {
          dispatch(toggleLoader(true));
          //console.log("request send")
            const response = await fetch(`${END_POINT}/user/profile/update`, {
                method: "POST",
                credentials: "include",
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
             
              //console.log(data)
              dispatch(addUser(data?.user))
                //console.log("Data sent successfully");
                navigate("/adminprofile")
            } else {
                toast.error(data.message)
                //console.log("Data couldn't be sent successfully");
            }
        } catch (error) {
            toast.error("Profile Update Failed !!!")
            //console.log(error);
        }
        finally{
          dispatch(toggleLoader(false));
        }
    };
    
      return loader ? <Loader/>:(
        
        <div className="p-6 max-w-lg mx-auto  text-white bg-[#0f172a]  rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
  <div>
    <label className="block text-xs md:text-[16px] text-lime-500">Photo URL</label>
    <input
      type="file"
      name="photo"
      onChange={handleFileChange}
      className="w-full h-8 md:h-10 p-2 text-xs my-1 md:text-[16px] border rounded bg-[#213155] text-white"
    />
    <p className='text-xs md:text-[12px] text-red-500'>*Add image only if you want to update it</p>
  </div>

  <div>
    <label className="block text-xs md:text-[16px] text-lime-500">Name</label>
    <input
      type="text"
      name="name"
      value={user.name}
      onChange={handleChange}
      className="w-full h-8 md:h-10 p-2 text-xs my-1 md:text-[16px] border rounded bg-[#213155] text-white"
    />
  </div>

  <div>
    <label className="block text-xs md:text-[16px] text-lime-500">Phone</label>
    <input
      type="text"
      name="phone"
      value={user.phone}
      onChange={handleChange}
      className="w-full h-8 md:h-10 p-2 text-xs my-1 md:text-[16px] border rounded bg-[#213155] text-white"
    />
  </div>

  <button
    type="submit"
    className="w-full h-8 md:h-10 p-2 bg-blue-500 text-white rounded"
  >
    Save Changes
  </button>
</form>

          <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
/>
        </div>
      );
    };
    
    export default EditAdminProfile