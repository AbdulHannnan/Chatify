import {resendClient, sender} from '../lib/resend.js';
import dotenv from 'dotenv';
dotenv.config();
import {WelcomeEmailTemplate} from '../Email/EmailTemplate.js';

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from : `${sender.name} <${sender.email}>`,
        to : email,
        subject : 'Welcome to Messenger!',
        html : welcomeEmailTemplate(name, clientURL)
    }); 

    if(error){
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    } else{
        console.log('Welcome email sent successfully:', data);
        return data;}
}