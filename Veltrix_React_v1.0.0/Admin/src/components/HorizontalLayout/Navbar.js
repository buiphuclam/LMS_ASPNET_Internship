import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [ui, setui] = useState(false)

  const [email, setemail] = useState(false)

  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [auth, setauth] = useState(false)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                {/* Dashboard */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="dashboard"
                  >
                    <i className="ti-home me-2" />
                    {props.t("Dashboard")} {props.menuOpen}
                  </Link>

                </li>
                {/* Quản lý hệ thống */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setcomponent(!component)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-package me-2"></i>
                    {props.t("Quản lý hệ thống")}
                  </Link>
                  
                   <div
                    className={classname("dropdown-menu", { show: component })}
                  >
                    <div className="dropdown">
                    <Link
                        to="/Instructors"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Quản lý người dùng")} <div className="arrow-none"></div>
                      </Link>
                        </div>
                      {/* </Col> */}
                      {/* <Col lg={6}>
                        <div>
                          <Link to="ui-lightbox" className="dropdown-item">
                            {props.t("Danh sách khóa học")}
                          </Link>
                        </div>
                      </Col> */}
                  </div>
                </li>
                {/* Quản lý instructor */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setcomponent(!component)
                    }}
                  >
                    <i className="ti-harddrives me-2"></i>
                    {props.t("Quản lý Instructor")}
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: component })}
                  >
                    <div className="dropdown">
                      <Link
                        to="/Instructors"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Danh sách Instructor")} <div className="arrow-none"></div>
                      </Link>
                      <Link
                        to="/ThemKH"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Thêm khóa học")} <div className="arrow-none"></div>
                      </Link>
                      <Link
                        to="/ThemQuizz"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Thêm Quizz")} <div className="arrow-none"></div>
                      </Link>
                    </div>
                  </div>
                </li>
                {/* Quản lý giáo viên */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setcomponent(!component)
                    }}
                  >
                    <i className="ti-harddrives me-2"></i>
                    {props.t("Quản lý giáo viên")}
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: component })}
                  >
                    <div className="dropdown">
                      <Link
                        to="/Teachers"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Danh sách giáo viên")} <div className="arrow-down"></div>
                      </Link>
                    </div>
                  </div>
                </li>
                {/* Quản lý ClassAdmin */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setcomponent(!component)
                    }}
                  >
                    <i className="ti-harddrives me-2"></i>
                    {props.t("Quản lý ClassAdmin")}
                  </Link>
                  
                  <div
                    className={classname("dropdown-menu", { show: component })}
                  >
                    <div className="dropdown">
                      <Link
                        to="/ClassAdmins"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Danh sách Class Admin")} <div className="arrow-none"></div>
                      </Link>
                      <Link
                        to="/danhsachsection"
                        className="dropdown-item dropdown-toggle arrow-none"
                      >
                        {props.t("Danh Sách Lớp học")} <div className="arrow-none"></div>
                      </Link>
                    </div>
                  </div>
                </li>
                {/* Quản lý học sinh */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setcomponent(!component)
                    }}
                  >
                    <i className="ti-harddrives me-2"></i>
                    {props.t("Quản lý học sinh")}
                  </Link>
                  <div
                    className={classname(
                      "dropdown-menu mega-dropdown-menu px-2 dropdown-menu-start dropdown-mega-menu-xl",
                      { show: ui }
                    )}
                  >
                    <Row>
                      <Col lg={4}>
                        <div>
                          <Link to="Students" className="dropdown-item">
                            {props.t("Danh sách học sinh")}
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </li>
                {/* Authentication */}
                <li className="nav-item dropdown mega-dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setauth(!auth)
                    }}
                  >
                    <i className="ti-archive me-2"></i>{" "}
                    {props.t("Authentication")}
                  </Link>
                  <div
                    className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg", { show: auth })}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div>
                          <Link to="pages-login" className="dropdown-item">
                            {props.t("Login")}
                          </Link>
                          <Link to="pages-register" className="dropdown-item">
                            {props.t("Register")}
                          </Link>
                          <Link to="page-recoverpw" className="dropdown-item">
                            {props.t("Recover Password")}
                          </Link>
                          <Link to="auth-lock-screen" className="dropdown-item">
                            {props.t("Lock Screen")}
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <Link to="pages-login-2" className="dropdown-item">
                            {props.t("Login 2")}
                          </Link>
                          <Link to="pages-register-2" className="dropdown-item">
                            {props.t("Register 2")}
                          </Link>
                          <Link to="page-recoverpw-2" className="dropdown-item">
                            {props.t("Recover Password 2")}
                          </Link>
                          <Link to="auth-lock-screen-2" className="dropdown-item">
                            {props.t("Lock Screen 2")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
