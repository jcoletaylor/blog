import React from 'react'
import { Follow } from 'react-twitter-widgets'
import styles from './Bio.module.scss'

const Bio = ({ config, expanded }) => (
  <>
    <img
      className={styles.avatar}
      src={config.userAvatar}
      alt={config.userName}
    />
    <p>
      <strong>{config.userName}</strong> would like to be in the woods, on the cushion, or writing code.
      <Follow
        username={config.userTwitter}
        options={{ count: expanded ? true : 'none' }}
      />
    </p>
  </>
)

export default Bio
