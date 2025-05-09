// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v6.31.0
// source: proto/email.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "email";

export interface EmailAddress {
  email: string;
}

export interface Response {
  message: string;
  sent: boolean;
}

export interface RejectionEmail {
  email: string;
  reason: string;
}

export const EMAIL_PACKAGE_NAME = "email";

export interface EmailServiceClient {
  sendRestaurantRegConfirmationEmail(request: EmailAddress): Observable<Response>;

  sendRefundConfirmationEmail(request: RejectionEmail): Observable<Response>;

  sendRejectionEmail(request: RejectionEmail): Observable<Response>;

  sendDriverConfirmEmail(request: EmailAddress): Observable<Response>;

  sendDriverRejectEmail(request: RejectionEmail): Observable<Response>;
}

export interface EmailServiceController {
  sendRestaurantRegConfirmationEmail(request: EmailAddress): Promise<Response> | Observable<Response> | Response;

  sendRefundConfirmationEmail(request: RejectionEmail): Promise<Response> | Observable<Response> | Response;

  sendRejectionEmail(request: RejectionEmail): Promise<Response> | Observable<Response> | Response;

  sendDriverConfirmEmail(request: EmailAddress): Promise<Response> | Observable<Response> | Response;

  sendDriverRejectEmail(request: RejectionEmail): Promise<Response> | Observable<Response> | Response;
}

export function EmailServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "sendRestaurantRegConfirmationEmail",
      "sendRefundConfirmationEmail",
      "sendRejectionEmail",
      "sendDriverConfirmEmail",
      "sendDriverRejectEmail",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMAIL_SERVICE_NAME = "EmailService";
