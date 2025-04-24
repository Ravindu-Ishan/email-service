import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailAddress, EmailServiceController, EmailServiceControllerMethods, Response } from './types/email';
import { Observable } from 'rxjs';

@Controller()
@EmailServiceControllerMethods()
export class AppController implements EmailServiceController {
  constructor(private readonly appService: AppService) {}
  
  sendRestaurantRegConfirmationEmail(request: EmailAddress): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendRestaurantRegistrationMail(request.email)
  }
  sendRefundConfirmationEmail(request: EmailAddress): Promise<Response> | Observable<Response> | Response {
    throw new Error('Method not implemented.');
  }

  
}
