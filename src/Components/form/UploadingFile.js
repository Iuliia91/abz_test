import React, { useEffect, useState } from 'react'

const UploadingFile = ({ handleFile }) => {
  const [errors, setErrors] = useState({})
  const [fileName, setFileName] = useState('Upload your photo')
  const [file, setFile] = useState(null)
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const allowTypes = ['image/jpeg', 'image/jpg']
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result

      img.onload = () => {
        const width = img.width
        const height = img.height
        const fileSize = file.size
        const fileType = file.type

        if (width < 70 || height < 70) {
          setErrors((prevState) => ({
            ...prevState,
            file: 'Image width or height is less 70px',
          }))
        } else if (fileSize > 5000000) {
          setErrors((prevState) => ({
            ...prevState,
            file: 'Image file size is too large',
          }))
        }
      }

      if (!allowTypes.includes(file.type)) {
        setErrors((prevState) => ({
          ...prevState,
          file: 'Invalid image file type',
        }))
      } else {
        setFile(file)
        setFileName(file.name)
        setErrors((prevState) => ({
          ...prevState,
          file: null,
        }))
      }
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (file !== null) {
      handleFile(file)
    }
  }, [file])
  return (
    <section className="uploading_photo">
      <fieldset>
        <label className="file_upload">
          <span className="block_upload p1">Upload</span>
          <span className="block_name p1">{fileName}</span>
        </label>
        <input
          id="file"
          name="photo"
          type="file"
          onChange={(event) => {
            handleImageUpload(event)
          }}
        />
        {errors.file && <p class="error">{errors.file}</p>}
      </fieldset>
    </section>
  )
}

export default UploadingFile
