const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const businessTemplate = path.resolve('./src/templates/business/business.js')
    const directoryTemplate = path.resolve('./src/templates/directory/directory.js')
    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: businessTemplate,
            path: `/business/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })

    const categories = ['eat-drink', 'shop', 'services']
    categories.forEach((category) => {
        createPage({
            component: directoryTemplate,
            path: `/directory/${category}`,
            context: {
                category: category
            }
        })
    })
}

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
     resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
        },
      },
    })
  }