import React, { useState, useEffect } from 'react'
import { urls } from '../../helpers/urlForApi'
import { useFetch } from '../../HOC/useFetch'
import axios from 'axios'
const getDataPosition = (url) => {
  if (url === null) {
    return
  } else {
    return axios
      .get(url)
      .then(({ data }) => {
        return data
      })
      .catch((e) => alert('smt went wrong'))
  }
}

const Position = ({ positionSelect, errors, handlePositionSelecte }) => {
  const [position, setPosition] = useState([])
  const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'

  useEffect(() => {
    getDataPosition(url).then((response) => {
      setPosition(response.positions)
    })
  }, [])

  return (
    <section className="selection_block">
      <h3 className="p1 selection_block--titel">Select your position</h3>
      {position.map((position) => {
        const { id, name } = position
        return (
          <fieldset key={id}>
            <input
              type="radio"
              id="id1"
              checked={id == positionSelect ? true : false}
              onChange={() => handlePositionSelecte(id)}
            />
            <label htmlFor="id1">{name}</label>
          </fieldset>
        )
      })}
      {errors.positionSelect && (
        <p
          className={`helper_text p1 ${
            errors.positionSelect ? 'error_message' : ''
          }`}
        >
          {errors.positionSelect}
        </p>
      )}
    </section>
  )
}

export default Position
