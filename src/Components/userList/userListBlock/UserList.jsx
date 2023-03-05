import React, { useReducer, useEffect, useRef } from 'react'

import { useFetch } from '../../../HOC/useFetch'

import { urls } from '../../../helpers/urlForApi'
import './userList.css'
import { useOpenTooltip } from '../../../HOC/TooltipContext'
import LodingComponent from '../../LodingComponent'

function UserList() {
  const {
    users,
    links,
    total_pages,
    page,
    getNewListOfUsers,
    isLastPages,
    loading,
  } = useFetch(urls.GET)
  const { openTooltip, text, closeTooltip } = useOpenTooltip()

  const displaypopupMessage = (e, text) => {
    let element = e.target.getBoundingClientRect()
    const center = (element.left + element.right) / 2

    const botton = e.pageY + 10
    openTooltip(text, { center, botton })
  }

  return (
    <div className="block_get content_center " id="user_list">
      <h2 className="h1" onClick={() => {}}>
        Working with GET request
      </h2>
      <section className="block_get--list">
        {loading && <LodingComponent />}
        {users.map((user, index) => {
          const { name, photo, position, email, phone } = user
          return (
            <div className="card" key={index}>
              {' '}
              <figure>
                <img src={photo} alt="human" loading="lazy" />
              </figure>
              <h3
                className="p1"
                onMouseOut={() => closeTooltip()}
                onMouseOver={(e) => displaypopupMessage(e, name)}
              >
                {name}
              </h3>
              <div className="card_info">
                <h3
                  className="p1"
                  onMouseOut={() => closeTooltip()}
                  onMouseOver={(e) => displaypopupMessage(e, position)}
                >
                  {position}
                </h3>
                <h3
                  className="p1"
                  onMouseOut={() => closeTooltip()}
                  onMouseOver={(e) => displaypopupMessage(e, email)}
                >
                  {email}
                </h3>
                <h3
                  className="p1"
                  onMouseOut={() => closeTooltip()}
                  onMouseOver={(e) => displaypopupMessage(e, phone)}
                >
                  {phone}
                </h3>
              </div>
            </div>
          )
        })}
      </section>
      {text !== '' && <PopupMessage />}
      <button
        className={`${
          isLastPages ? 'p1 btn show_btn finished' : 'p1 btn show_btn'
        }`}
        onClick={() => {
          getNewListOfUsers(links.next_url, total_pages, page)
        }}
      >
        Show more
      </button>
    </div>
  )
}

const PopupMessage = () => {
  const { location, text, isTooltipOpen } = useOpenTooltip()

  const container = useRef(null)

  useEffect(() => {
    const element = container.current
    const { center, botton } = location

    element.style.left = `${center}px`
    element.style.top = `${botton}px`
  }, [location, text])

  return (
    <>
      {
        <div
          ref={container}
          className={`${isTooltipOpen ? 'tooltip_show' : 'tooltip'}`}
        >
          {text}
        </div>
      }
    </>
  )
}

export default UserList
