import React, { useEffect, useState } from 'react'
import Header from './Components/header/Header'
import Introduction from './Components/introduction/Introduction'
import Position from './Components/positionList/Position'
import UserList from './Components/userList/userListBlock/UserList'
import { regex, reg } from './helpers/regex'
import { AppProvider } from './HOC/TooltipContext'
import './media.css'
import UploadingFile from './Components/form/UploadingFile'
import { urls } from './helpers/urlForApi'
import { useFetch } from './HOC/useFetch'
import { formDataValue, postData } from './helpers/formData'
import Registration from './Components/Registration'
function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [positionSelect, setPosition] = useState('')
  const { getNewListOfUsers } = useFetch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)

  const handleFile = (file) => {
    setSelectedFile(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (name.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        name: 'Name field is required',
      }))
    } else if (name.length < 2 || name.length > 60) {
      setErrors((prevState) => ({
        ...prevState,
        name: 'Username should contain 2-60 characters',
      }))
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: null,
      }))
    }

    if (email.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email field is required',
      }))
    } else if (!regex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email should contains @/.com/.mail ...',
      }))
    } else if (email.length < 2 || email.length > 100) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email should contain 2-100 characters',
      }))
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: null,
      }))
    }

    const str = String(phone)
    if (phone.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        phone: 'Phone field is required',
      }))
    } else if (!reg.test(str)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: 'Number should start with code of Ukraine +380 and 10 digits',
      }))
    }

    if (positionSelect === '') {
      setErrors((prevState) => ({
        ...prevState,
        positionSelect: 'Position field is required',
      }))
    }

    let obj = {
      name: name,
      email: email,
      phone: phone,
      position_id: positionSelect,
      photo: selectedFile,
    }
    let formDataVAlue = formDataValue(obj)
    postData(formDataVAlue).then((response) => {
      if (response.success) {
        setOpen(true)
        getNewListOfUsers(urls.GET)
      } else {
        setErrors((prevState) => ({
          ...prevState,
          response: response,
        }))
      }
    })
  }

  const handlePositionSelecte = (id) => {
    setPosition(id)
  }

  return (
    <>
      {' '}
      <AppProvider>
        <Header />
        <Introduction />
        <UserList />
        {open ? (
          <Registration />
        ) : (
          <div className="block_post  content_center " id="user_create">
            <h2 className="h1">Working with POST request</h2>
            {errors.response && (
              <p className="p1 message">{errors.response.message}</p>
            )}
            <form id="form" onSubmit={handleSubmit}>
              <section className="block_post--form">
                <div class="input-container ic1">
                  <input
                    id="firstname"
                    className={`input p1 ${errors.name ? 'error_input' : ''}`}
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label
                    htmlFor="firstname"
                    className={`placeholder p1 ${
                      errors.name ? 'error_cut' : ''
                    }`}
                  >
                    Your name
                  </label>
                  {errors.name && (
                    <p
                      className={`helper_text p1 ${
                        errors.name ? 'error_message' : ''
                      }`}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="input-container ic1">
                  <input
                    id="email"
                    className={`input p1 ${errors.email ? 'error_input' : ''}`}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label
                    htmlFor="firstname"
                    className={`placeholder p1 ${
                      errors.email ? 'error_cut' : ''
                    }`}
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p
                      className={`helper_text p1 ${
                        errors.email ? 'error_message' : ''
                      }`}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="input-container ic1">
                  <input
                    id="phone"
                    className={`input p1 ${errors.phone ? 'error_input' : ''}`}
                    type="phone"
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className={`cut cut1 `}></div>
                  <label
                    htmlFor="firstname"
                    className={`placeholder p1 ${
                      errors.phone ? 'error_cut' : ''
                    }`}
                  >
                    Phone
                  </label>
                  {!errors.phone && (
                    <p className="helper_text p1">+38 (XXX) XXX - XX - XX</p>
                  )}
                  {errors.phone && (
                    <p
                      className={`helper_text p1 ${
                        errors.phone ? 'error_message' : ''
                      }`}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </section>
              <Position
                handlePositionSelecte={handlePositionSelecte}
                positionSelect={positionSelect}
                errors={errors}
              />
              <UploadingFile handleFile={handleFile} />
              <section className="btn_sub-block">
                <button type="submit" className="btn btn_submit p1">
                  Sing up
                </button>
              </section>
            </form>
          </div>
        )}
      </AppProvider>
    </>
  )
}

export default App
