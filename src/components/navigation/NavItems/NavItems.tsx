import React from 'react'
import { useTranslation } from 'react-i18next'

import classes from './NavItems.module.scss'
import { NavLink } from 'react-router-dom'
interface INavItemsProps {
  isAuth: boolean,
}

const NavItems: React.FunctionComponent<INavItemsProps> = (props) => {
  const { t } = useTranslation()

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
  <NavLink exact to="/" className={classes.link} activeClassName={classes.link___active}>{t('nav.builder')}</NavLink>
      </li>
      {props.isAuth
        ? <li className={classes.item}>
          <NavLink exact to="/orders" className={classes.link} activeClassName={classes.link___active}>{t('nav.orders')}</NavLink>
        </li>
        : null}

      {props.isAuth
        ? <li className={classes.item}>
          <NavLink exact to="/logout" className={classes.link} activeClassName={classes.link___active}>{t('nav.logout')}</NavLink>
        </li>
        : <li className={classes.item}>
          <NavLink exact to="/auth" className={classes.link} activeClassName={classes.link___active}>{t('nav.auth')}</NavLink>
        </li>}

    </ul>
  )
}

export default NavItems
