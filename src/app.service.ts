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
      subject: 'Restaurant Registration Verified',
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">QuickGrubs</h2>
        <p style="font-size: 14px; color: #777;">Fast. Fresh. Delivered.</p>
      </div>

      <p>Dear Valued Partner,</p>

      <p>We are thrilled to welcome you to the <strong>QuickGrubs</strong> family!</p>
      
      <p>Thank you for choosing to register your restaurant with us. Our team is excited to help you reach more customers and grow your business. We are committed to providing you with the best service and support every step of the way.</p>

      <p>Next Steps:</p>
      <ul>
        <li>Explore your dashboard to manage your menu and orders.</li>
        <li>Reach out to our support team anytime at <a href="mailto:support@quickgrubs.com">support@quickgrubs.com</a>.</li>
        <li>Stay tuned for our partner newsletters and updates!</li>
      </ul>

      <p>We look forward to a successful partnership!</p>

      <br>
      <p>Best regards,</p>
      <p><strong>The QuickGrubs Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        QuickGrubs Inc. | <a href="https://quickgrubs.com" style="color: #aaa; text-decoration: none;">Visit our website</a> | All rights reserved © 2025
      </p>
    </div>
`,
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

  async sendRestaurantRejectionEmail(to: string, reason: string) {
    const email = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Restaurant Verification Rejected',
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">QuickGrubs</h2>
        <p style="font-size: 14px; color: #777;">Fast. Fresh. Delivered.</p>
      </div>

      <p>Dear Valued Partner,</p>

      <p>Thank you for your interest in partnering with <strong>QuickGrubs</strong>.</p>

      <p>After a careful review, we regret to inform you that we are unable to approve your restaurant registration at this time.</p>

      <p><strong>Reason for Rejection:</strong></p>
      <p style="background-color: #ffe6e6; padding: 10px; border-radius: 6px;">${reason}</p>

      <p>If you believe this decision was made in error, or if you would like to discuss further, please don't hesitate to contact our partner support team at <a href="mailto:support@quickgrubs.com">support@quickgrubs.com</a>.</p>

      <p>We truly appreciate your interest and hope to have the opportunity to work together in the future.</p>

      <br>
      <p>Best regards,</p>
      <p><strong>The QuickGrubs Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        QuickGrubs Inc. | <a href="https://quickgrubs.com" style="color: #aaa; text-decoration: none;">Visit our website</a> | All rights reserved © 2025
      </p>
    </div>
      `,
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


  async sendDriverRegistrationEmail(to: string) {
    const email = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Driver Registration Verified',
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">QuickGrubs</h2>
        <p style="font-size: 14px; color: #777;">Fast. Fresh. Delivered.</p>
      </div>

      <p>Dear Valued Partner,</p>

      <p>We are thrilled to welcome you to the <strong>QuickGrubs</strong> family!</p>
      
      <p>Thank you for choosing to work and earn with us. Our team is excited to have you on board as a delivery crew member. We are committed to providing you with the best service and support every step of the way.</p>

      <p>Next Steps:</p>
      <ul>
        <li>Get ongoing delivery requests and start delivering those grubs !</li>
        <li>Reach out to our support team anytime at <a href="mailto:support@quickgrubs.com">support@quickgrubs.com</a>.</li>
        <li>Stay tuned for our partner newsletters and updates!</li>
      </ul>

      <p>We look forward to a successful partnership!</p>

      <br>
      <p>Best regards,</p>
      <p><strong>The QuickGrubs Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        QuickGrubs Inc. | <a href="https://quickgrubs.com" style="color: #aaa; text-decoration: none;">Visit our website</a> | All rights reserved © 2025
      </p>
    </div>
`,
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
  

  async sendDriverRejectionEmail(to: string, reason: string) {
    const email = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Driver Verification Rejected',
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">QuickGrubs</h2>
        <p style="font-size: 14px; color: #777;">Fast. Fresh. Delivered.</p>
      </div>

      <p>Dear Valued Partner,</p>

      <p>Thank you for your interest in partnering with <strong>QuickGrubs</strong>.</p>

      <p>After a careful review, we regret to inform you that we are unable to approve your driver registration at this time.</p>

      <p><strong>Reason for Rejection:</strong></p>
      <p style="background-color: #ffe6e6; padding: 10px; border-radius: 6px;">${reason}</p>

      <p>If you believe this decision was made in error, or if you would like to discuss further, please don't hesitate to contact our partner support team at <a href="mailto:support@quickgrubs.com">support@quickgrubs.com</a>.</p>

      <p>We truly appreciate your interest and hope to have the opportunity to work together in the future.</p>

      <br>
      <p>Best regards,</p>
      <p><strong>The QuickGrubs Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        QuickGrubs Inc. | <a href="https://quickgrubs.com" style="color: #aaa; text-decoration: none;">Visit our website</a> | All rights reserved © 2025
      </p>
    </div>
      `,
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


  async sendRefundEmail(to: string, reason: string) {
    const email = await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Order Refund Processed',
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4CAF50;">QuickGrubs</h2>
        <p style="font-size: 14px; color: #777;">Fast. Fresh. Delivered.</p>
      </div>

      <p>Dear Valued Partner,</p>

      <p>Your order refund request has been processed and refunded to your account !.</p>

      <p><strong>Reason for Refund:</strong></p>
      <p style="background-color:rgb(173, 192, 255); padding: 10px; border-radius: 6px;">${reason}</p>

      <br>
      <p>Best regards,</p>
      <p><strong>The QuickGrubs Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        QuickGrubs Inc. | <a href="https://quickgrubs.com" style="color: #aaa; text-decoration: none;">Visit our website</a> | All rights reserved © 2025
      </p>
    </div>
      `,
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
