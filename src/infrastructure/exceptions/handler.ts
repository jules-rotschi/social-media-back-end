import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors as vineErrors } from '@vinejs/vine';
import { errors as authErrors } from '@adonisjs/auth';
import { errors as lucidErrors } from '@adonisjs/lucid';
import DomainException from './domain_exception.js';

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    
    if (error instanceof vineErrors.E_VALIDATION_ERROR) {

      type VineErrorMessage = {
        message: string,
        rule: string,
        field: string
      }

      const errors = error.messages.map((error: VineErrorMessage) => {
        return {
          ...error,
          type: "validation"
        }
      })

      const exceptionResponse: ExceptionResponse = { errors };
      ctx.response.status(error.status).send(exceptionResponse);
      return
    }

    if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
      const exceptionResponse: ExceptionResponse = {
        errors: [
          {
            message: "Identifiant ou mot de passe incorrect",
            type: "auth"
          }
        ]
      };
      ctx.response.status(error.status).send(exceptionResponse);
      return
    }

    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      const exceptionResponse: ExceptionResponse = {
        errors: [
          {
            message: "Vous n'êtes pas autorisé à consulter cette ressource",
            type: "auth"
          }
        ]
      };
      ctx.response.status(error.status).send(exceptionResponse);
      return
    }

    if (error instanceof DomainException) {
      const exceptionResponse: ExceptionResponse = {
        errors: [{
          message: error.message,
          type: "domain"
        }]
      };
      ctx.response.status(error.status).send(exceptionResponse);
      return
    }

    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      const exceptionResponse: ExceptionResponse = {
        errors: [{
          message: error.message,
          type: "lucid"
        }]
      };
      ctx.response.status(error.status).send(exceptionResponse);
      return
    }

    // const defaultExceptionResponse: ExceptionResponse = {
    //   errors: [{
    //     message: "Erreur du serveur. Réessayez dans quelques instants.",
    //     type: "server"
    //   }]
    // };
    // ctx.response.status(500).send(defaultExceptionResponse);
    // return

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}

interface ExceptionDescription {
  type: string;
  message: string;
}

interface ExceptionResponse {
  errors: ExceptionDescription[];
}