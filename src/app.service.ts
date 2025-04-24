import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;
  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      secure: true, 
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  async sendRestaurantRegistrationMail(to: string) {
    const email = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Restaurant Registration Confirmation',
      html: `
      <h4>Dear user,</h4>
      <h3>Thank you for registering with <b>QuickGrubs</b></h3>
      <h3>We are excited to have you on board!</h3>
      <h4>Best Regards,</h4>
      <h4>The QuickGrubs Team</h4>`,
    });

    if (email.response.includes('250')) {
      console.log('Email sent successfully:', email.response);

      return {
        message: email.response,
        sent: true,
      };
    } else {
      console.log('Error sending email:', email.response);
      return {
        message: email.response,
        sent: false,
      };
    }
  }
}
