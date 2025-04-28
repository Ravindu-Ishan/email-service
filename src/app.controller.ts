import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  EmailAddress,
  EmailServiceController,
  EmailServiceControllerMethods,
  RejectionEmail,
  Response,
} from './types/email';
import { Observable } from 'rxjs';

@Controller()
@EmailServiceControllerMethods()
export class AppController implements EmailServiceController {
  constructor(private readonly appService: AppService) {}

  sendRestaurantRegConfirmationEmail(
    request: EmailAddress,
  ): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendRestaurantRegistrationMail(request.email);
  }

  sendRejectionEmail(
    request: RejectionEmail,
  ): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendRestaurantRejectionEmail(
      request.email,
      request.reason,
    );
  }

  sendDriverConfirmEmail(
    request: EmailAddress,
  ): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendDriverRegistrationEmail(request.email);
  }
  sendDriverRejectEmail(
    request: RejectionEmail,
  ): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendDriverRejectionEmail(
      request.email,
      request.reason,
    );
  }

  sendRefundConfirmationEmail(
    request: RejectionEmail,
  ): Promise<Response> | Observable<Response> | Response {
    return this.appService.sendRefundEmail(
      request.email,
      request.reason);
  }
}
