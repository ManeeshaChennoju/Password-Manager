import {Component} from 'react'
import {v4 as uuid4} from 'uuid'

import './index.css'

import PasswordItem from '../PasswordItem'

const websiteImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
const usernameImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
const passwordImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

const noPasswordsImg =
  'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    NewPasswordList: [],
    searchInput: '',
    isChecked: false,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    const {website, username, password} = this.state
    event.preventDefault()
    const newPassword = {
      id: uuid4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      NewPasswordList: [...prevState.NewPasswordList, newPassword],
      passwordsCount: prevState.passwordsCount + 1,
      website: '',
      username: '',
      password: '',
    }))
  }

  onCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onClickDelete = id => {
    const {NewPasswordList} = this.state
    const filteredPasswordsList = NewPasswordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState(prevState => ({
      NewPasswordList: filteredPasswordsList,
      passwordsCount: prevState.passwordsCount - 1,
    }))
  }

  render() {
    const {
      NewPasswordList,
      searchInput,
      isChecked,
      website,
      username,
      password,
    } = this.state
    const searchResults = NewPasswordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(NewPasswordList)
    return (
      <div className="Home_container">
        <div className="app_container">
          <div className="imageLogo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app_logo_image"
            />
          </div>

          <div className="top_container">
            <form
              className="add_password_container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="addNewHeading">Add New Password</h1>
              <div className="website_con">
                <img
                  src={websiteImg}
                  alt="website"
                  className="inputIcon_Images"
                />
                <hr className="hrline" />
                <input
                  value={website}
                  onChange={this.onChangeWebsite}
                  type="text"
                  placeholder="Enter Website"
                  className="inputs"
                />
              </div>
              <br />
              <div className="username_con">
                <img
                  src={usernameImg}
                  alt="username"
                  className="inputIcon_Images"
                />
                <hr className="hrline" />
                <input
                  value={username}
                  onChange={this.onChangeUsername}
                  type="text"
                  placeholder="Enter Username"
                  className="inputs"
                />
              </div>
              <br />
              <div className="password_con">
                <img
                  src={passwordImg}
                  alt="password"
                  className="inputIcon_Images"
                />
                <hr className="hrline" />
                <input
                  value={password}
                  onChange={this.onChangePassword}
                  type="password"
                  placeholder="Enter Password"
                  className="inputs"
                />
              </div>
              <br />
              <div className="add_button">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>

            <div className="image_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="topContainerImage"
              />
            </div>
          </div>

          <div className="bottom_container">
            <div className="yourPassword_con">
              <div className="headingAndCount">
                <h1 className="youPaswrdHeading">Your Passwords</h1>
                <p className="passwords_count">{searchResults.length}</p>
              </div>
              <div>
                <div className="searchIconAndImage">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search_icon_img"
                  />
                  {/* <hr className="hrline" /> */}
                  <input
                    type="search"
                    value={searchInput}
                    placeholder="Search"
                    className="inputs"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="bottomHrLine" />
            <div className="checkBox_container">
              <input
                type="checkbox"
                id="myCheckbox"
                className="check_box"
                onClick={this.onCheckbox}
              />
              <label htmlFor="myCheckbox" className="label_heading">
                Show Passwords
              </label>
              <br />
            </div>
            <ul className="ul_passwords_list_Container">
              {searchResults.length !== 0 ? (
                searchResults.map(eachItem => (
                  <PasswordItem
                    passwordDetails={eachItem}
                    key={eachItem.id}
                    onClickDelete={this.onClickDelete}
                    isChecked={isChecked}
                  />
                ))
              ) : (
                <div className="no_password_container">
                  <img
                    src={noPasswordsImg}
                    alt="no passwords"
                    className="noPasswords_img"
                  />
                  <p className="no_password_text">No Passwords</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
