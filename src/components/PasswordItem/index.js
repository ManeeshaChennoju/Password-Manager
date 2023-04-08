import {Component} from 'react'
import './index.css'

const starsImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
const deleteIconImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

class PasswordItem extends Component {
  onDelete = () => {
    const {passwordDetails, onClickDelete} = this.props
    const {id} = passwordDetails
    onClickDelete(id)
  }

  render() {
    const {passwordDetails, isChecked} = this.props
    const {website, username, password} = passwordDetails
    const initial = username[0].toUpperCase()

    return (
      <li className="password_card">
        <h1 className="user_initial">{initial}</h1>
        <div className="passwordDetails_con">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {isChecked === true ? (
            <p className="password">{password}</p>
          ) : (
            <img src={starsImg} alt="stars" className="stars_image" />
          )}
        </div>
        <button type="button" data-testid="delete" onClick={this.onDelete}>
          <img src={deleteIconImg} alt="delete" className="delete_iconImg" />
        </button>
      </li>
    )
  }
}

export default PasswordItem
