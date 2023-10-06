
## Quick Start

This website was created with Gatsby. Some familiarity with Gatsby and React will be very helpful. 

1.  **Install Node.js and npm**

    Installed via an installer or nvm.

    - [Node.js Installer](https://nodejs.org/en/)
    - [npmjs docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. **Install Gatsby CLI**

    Installed via npm.

    - [Gatsby CLI docs](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)

3.  **Install all dependencies for the project**

    Be sure you are in the project directory when installing dependencies.

    ```shell
    npm install
    ```

4.  **Set up your environment files**

    Create 2 files in the project root.

    - .env.deploy

      This file containstghe following variables for deployment:

      ```shell
      LIVE_DEPLOY = true
      FTP_HOST = shop.wedgwoodcc.org
      FTP_USER = YOUR_USER_NAME
      FTP_PASSWORD = YOUR_PASSWORD
      ```

    - .env.development

      This file variables for the development environment. There is nothing required
      in this file at this time.

      You can use the following to use an improved [GraphQL IDE](https://www.gatsbyjs.com/docs/using-graphql-playground/):

      ```shell
      GATSBY_GRAPHQL_IDE=playground
      ```

5.  **Running the site locally**

    To run the site locally run the command...

      ```shell
      npm run develop
      ```

      You can then view the site at http://localhost:8000/.
      To view and query data use http://localhost:8000/___graphql.

      You can also run the site locally in production using...

      ```shell
      npm run serve
      ```

      If you just want to build the site without starting the server use...

      ```shell
      npm run build
      ```

6.  **Deploying the site**

    The site is deployed each time a commit is pushed to the master branch or a pull request is merged into the master branch. The workflow is defined in .github/workflows/build_and_deploy.yml.

    To deploy the site from your local working copy run the command...

      ```shell
      npm run deploy
      ```

      This will build the site and deploy it via ftp using the settings found in .env.deploy.