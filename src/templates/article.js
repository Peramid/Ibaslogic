import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ShareItems from "../components/socialShare/shareItems"
import TagLinks from "../components/tagLinks/tagLinks"
import blogPageStyles from "./blogpage.module.scss"
import SEO from "../components/seo"
import NavigatePosts from "../components/navigatePost/navigate"
import TableOfContents from "../components/globals/custom_components/TableOfContents"
import PostMeta from "../components/postMeta"
import ScrollTop from "../components/BlogPage/scrollTop"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import RelatedArticles from "../components/RelatedArticles/relatedArticles"
import Newsletter from "../components/newsletter/newsletter"
import Comment from "../components/comment"
import EditPost from "../components/editPost"
import Write from "../components/hire/write"

export const query = graphql`
  query($slug: String!) {
    siteData: site {
      siteMetadata {
        siteUrl
        twitterHandle
      }
    }
    postsData: mdx(fields: { slug: { name: { eq: $slug } } }) {
      timeToRead
      excerpt(pruneLength: 300)
      tableOfContents
      frontmatter {
        title
        description
        datePublished(formatString: "MMMM DD, YYYY")
        dateUpdated(formatString: "MMMM DD, YYYY")
        tags
      }
      body
    }
  }
`

const Article = ({ data, pageContext }) => {
  const {
    datePublished,
    dateUpdated,
    title,
    description,
    tags
  } = data.postsData.frontmatter
  const { excerpt, timeToRead, tableOfContents, body } = data.postsData
  const { siteUrl, twitterHandle } = data.siteData.siteMetadata

  // Get previous and next link
  const prev = pageContext.prev
    ? {
      url: pageContext.prev.fields.slug.name,
      title: pageContext.prev.frontmatter.title,
    }
    : null
  const next = pageContext.next
    ? {
      url: pageContext.next.fields.slug.name,
      title: pageContext.next.frontmatter.title,
    }
    : null

  const commentBoxRef = React.createRef()

  useEffect(() => {
    const scriptEle = document.createElement("script")
    scriptEle.async = true
    scriptEle.src = "https://utteranc.es/client.js"
    scriptEle.setAttribute("repo", "ibaslogic/comments")
    scriptEle.setAttribute("issue-term", "pathname")
    scriptEle.setAttribute("id", "utterances")
    scriptEle.setAttribute("theme", "github-light")
    scriptEle.setAttribute("crossorigin", "anonymous")
    if (commentBoxRef && commentBoxRef.current) {
      commentBoxRef.current.appendChild(scriptEle)
    } else {
      console.log(`Error with utterances comments on: ${commentBoxRef}`)
    }
  }, [])

  return (
    <Layout>
      <SEO
        title={title}
        excerpt={excerpt}
        description={description}
        isBlogPost
      />
      <div className={`bg_dtl_pp ${blogPageStyles.wrapper}`}>
        <div className={blogPageStyles.inner}>
          <main
            id="primary"
            className={blogPageStyles.siteMain}
            role="main"
          >
            <article className={blogPageStyles.singlePost}>
              <header className={blogPageStyles.entryHeader}>
                <h1>{title}</h1>
                <PostMeta datePublished={datePublished} dateUpdated={dateUpdated} timeToRead={timeToRead} />
              </header>
              <div className={blogPageStyles.content}>
                <MDXProvider
                  components={{
                    TableOfContents: () => (
                      <TableOfContents
                        items={tableOfContents.items}
                        slug={pageContext.slug}
                      ></TableOfContents>
                    ),
                  }}
                >
                  <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
              </div>
            </article>
          </main>
          <aside className={`bg_dtd ${blogPageStyles.aside}`}>
            <div className={blogPageStyles.asideContent}>
              <div className={blogPageStyles.tags}>{tags && <TagLinks tags={tags} />}</div>
              <div className={blogPageStyles.navigateContainer}>
                <NavigatePosts
                  prev={prev}
                  next={next}
                />
              </div>
              <div className={blogPageStyles.editPost}>
                <EditPost pageContext={pageContext} />
              </div>
              <div className={blogPageStyles.share}>
                <ShareItems
                  slug={pageContext.slug}
                  title={title}
                  twitterHandle={twitterHandle}
                  siteUrl={siteUrl}
                  heading="Share"
                />
              </div>
              <div className={blogPageStyles.write}>
                <Write />
              </div>
            </div>
          </aside>
          <section className={blogPageStyles.secondary}>
            <Newsletter />
            {(pageContext.relatedArticles.length && (
              <RelatedArticles articles={pageContext.relatedArticles} />
            )) ||
              null}
            <div className={blogPageStyles.commentSection}>
              <h2 className={`discusion__title ${blogPageStyles.title}`}>
                Discussion
              </h2>
              <Comment commentBoxRef={commentBoxRef} />
            </div>
          </section>
        </div>
      </div>
      <ScrollTop />
    </Layout>
  )
}

export default Article