import axios from 'axios'

export const formDataValue = (formValues, file) => {
  let formData = new FormData()
  const regEx = /[^\d\+]/g
  let b = formValues.phone.replace(regEx, '')
  let email = formValues.email.toLowerCase()

  formData.append('name', `${formValues.name}`)
  formData.append('email', `${email}`)
  formData.append('phone', `${b}`)
  formData.append('position_id', `${formValues.position_id}`)
  formData.append('photo', formValues.photo)

  return formData
}

export const getToken = async () => {
  return axios
    .get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then(({ data }) => {
      return data
    })
    .catch(() => {})
}

export const postData = async (formData, url) => {
  const token = await getToken()

  return await axios({
    method: 'POST',
    url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
    headers: {
      Token: token.token,
      'Content-type': 'multipart/form-data',
    },

    data: formData,
  })
    .then((response) => {
      let obj = {
        success: response.data.success,
        message: response.data.message,
      }

      return obj
    })

    .catch((error) => {
      let obj = {
        success: error.response.data.success,
        message: error.response.data.message,
      }
      return obj
    })
}
