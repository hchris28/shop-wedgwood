require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        siteUrl: 'http://shop.wedgwoodcc.org',
        title: 'Shop Wedgwood!',
        contactEmail: 'info@wedgwoodcc.org',
        googleMapsKey: process.env.GATSBY_GOOGLE_API_KEY
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1024,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        },
        "gatsby-plugin-use-query-params"
    ],
};
