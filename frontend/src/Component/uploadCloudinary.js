export const uploadImagetoCloudinary = async file=> {
      const uploadData = new FormData();

      uploadData.append('file', file)
      uploadData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
      uploadData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME)

      // console.log(process.env.REACT_APP_UPLOAD_PRESET, process.env.REACT_APP_CLOUD_NAME)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method : 'post',
            body : uploadData,
      });

      const data = await res.json();

      return data;
}