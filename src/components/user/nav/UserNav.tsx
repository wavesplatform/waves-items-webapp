import React, { Component, ReactNode } from 'react'
import cn from 'classnames'
import './UserNav.scss'
import { AuthConsumer, IAuthContext } from '../../../contexts/auth/AuthContext'
import { Link } from 'react-router-dom'
import UserImage from '../image/UserImage'


const displayName = 'UserNav'

interface IProps {
}

export class UserNav extends Component<IProps> {
  componentWillMount(): void {
  }

  render(): ReactNode {
    console.log('UserNav render()')
    const classes = cn(
      displayName
    )

    return (
      <div className={classes}>
        <AuthConsumer>
          {({ user, signOut }: IAuthContext) => (
            <>
              {user ? (
                <>
                  <div className={`${displayName}-dropdown`}>
                    <Link to={'/'} className={`${displayName}-link`}>
                      {user.name || user.address}
                      <div className={`${displayName}-image`}>
                        <UserImage address={user.address}/>
                      </div>
                    </Link>
                  </div>
                  <span onClick={signOut}>Sign Out</span>
                </>
              ) : (
                <>
                  <Link to={'/signin'}>
                    Sign In
                  </Link>
                </>
              )}
            </>
          )}
        </AuthConsumer>
      </div>
    )
  }
}

export default UserNav
