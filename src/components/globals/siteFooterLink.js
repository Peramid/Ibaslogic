import React from 'react'
import footerStyles from "./footer.module.scss"

const SiteFooterLink = ({ twitterHandle, github, siteUrl, author }) => {
  return (
    <ul className={`dml ${footerStyles.list}`}>
      <li>&copy; {new Date().getFullYear().toString()}{" "}
        <a
          href={`https://twitter.com/${twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          title="twitter" 
        >
          {author}
        </a></li>
      <li><a
        href={`https://github.com/${github}/Ibaslogic`}
        target="_blank"
        rel="noopener noreferrer"
        title="contribute"
      >
        Open Source
        </a></li>
      <li>
        <a
          href={`${siteUrl}/rss.xml`}
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
        </a>
      </li>
      <li>
        <a
          href="https://ko-fi.com/ibasmajid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
      </li>
    </ul>
  )
}
export default SiteFooterLink
