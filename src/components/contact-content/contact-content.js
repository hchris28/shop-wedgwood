import React from 'react'
import Obfuscate from 'react-obfuscate'
import { graphql, useStaticQuery } from 'gatsby'

import * as contactContentStyles from './contact-content.module.scss'

const ContactContent = () => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    contactEmail
                }
            }
        }
    `)

    const { contactEmail } = data.site.siteMetadata
    
    return (
        <div className={contactContentStyles.container}>
            <div className={contactContentStyles.header}>
                <h1>Contact Us</h1>
            </div>
            <div className={contactContentStyles.textContent}>
                <p>
                    If you have any questions about the content on this webiste, or if you're a
                    business owner with a request to include or update your business details,
                    please use this form to contact us.
                </p>
                <p>
                    You can also reach out to us at <Obfuscate email={contactEmail} />.
                </p>
            </div>
            <div className={contactContentStyles.formContent}>
                <form
                    action="https://mailthis.to/shop-wedgwood"
                    method="POST"
                    className={contactContentStyles.form}>

                    <input type="hidden" name="_subject" value="Shop Wedgwood Contact Form" />
                    <input type="hidden" name="_after" value="" />
                    <input type="hidden" name="_honeypot" value="" />
                    <input type="hidden" name="_confirmation" value="Thank you, your message was submitted. We will be in touch." />

                    <label className={contactContentStyles.inputContainer}>
                        <span className={contactContentStyles.labelText}>Name</span>
                        <input className={contactContentStyles.input} name="name" type="text" />
                    </label>
                    <label className={contactContentStyles.inputContainer}>
                        <span className={contactContentStyles.labelText}>Email</span>
                        <input className={contactContentStyles.input} name="email" type="text" />
                    </label>
                    <label className={contactContentStyles.inputContainer}>
                        <span className={contactContentStyles.labelText}>Message</span>
                        <textarea className={contactContentStyles.textarea} name="message"></textarea>
                    </label>
                    <button className={contactContentStyles.button}>Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactContent