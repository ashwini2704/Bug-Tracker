import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadImagetoCloudinary } from "./uploadCloudinary";

export const Signup = () => {    
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");

  const [formData, setData] = useState({
    name:"",
    email:"",
    password:"",
    avatar:selectedFile
  });

  const navigate = useNavigate()
  const handlleChange = (e) => {
    setData({...formData, [e.target.name] : e.target.value})
  }

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImagetoCloudinary(file);
    
// console.log(data.url)
    setUrl(data.url);
    setSelectedFile(data.url);
    setData({...formData, photo : data.url})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/register`,{
        method:'post',
        headers : {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const {message} = await res.json();

      if(!res.ok) {
        throw new Error(message)
      }
      navigate('/login')
    } catch (error) {
    }
  }

   return (
      <div>
        <div className="first">
          <div className="first-inner">

            <div className="second">
              <h3 className="headng">
                Create an <span style={{color:"var(--color-primary)"}}>account</span>
              </h3>
              <form className='form' onSubmit={submitHandler}>
                <div className='div'>
                  <div>
                    <input className='input' type="text" value={formData.name} placeholder='Full Name' name='name' onChange={handlleChange} required/>
                  </div>
                  <div>
                  <input className='input' type="email" value={formData.email} placeholder='Enter Your Email' name='email' onChange={handlleChange} required/>
                  </div>
                  <div>
                  <input className='input' type="password" value={formData.password} placeholder='Enter Your Password' name='password' onChange={handlleChange} required/>
                  </div>

                  <div className="third">
                    {
                      selectedFile &&
                      <figure className="figure">
                        <img src={url} alt="" />
                      </figure>
                    }
                    <div>
                      <input 
                      type="file"
                      name="photo"
                      id="customFile"
                      accept=".jpg, .png"
                      onChange={handleFileInput}
                      required
                      />
                    </div>
                  </div>
                  <button 
                  className='btn' 
                  type='submit'
                  >
                    Register
                  </button>
                  <p>Already registered? <Link className='Link' to="/login">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   )
}

