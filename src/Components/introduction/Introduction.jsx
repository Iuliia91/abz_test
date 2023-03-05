import React from 'react'
import './introduction.css'
import { Link } from 'react-scroll'
function Introduction() {
  return (
    <div className="introduction content_center">
      <div className="introduction_block">
        <h1 className="h1 introduction_header">
          Test assignment <span></span> for front-end<span> developer</span>
        </h1>
        <p className="p1 paragraf">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className="p1 btn">
          <Link to="user_create" smooth={true} offset={50}>
            Sing up
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Introduction
