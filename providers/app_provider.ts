import type { ApplicationService } from '@adonisjs/core/types'
import { UserRepository } from '#contracts/repositories/user-repository';
import { AuthRepository } from '#contracts/repositories/auth-repository';
import { EmailRepository } from '#contracts/repositories/email-repository';

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    const { LucidUserRepository } = await import("#repositories/user/lucid-user-repository");
    const { LucidAuthRepository } = await import("#repositories/auth/lucid-auth-repository");
    const { AdonisEmailRepository } = await import("#repositories/email/adonis-email-repository");
    
    this.app.container.bind(UserRepository, () => {
      return this.app.container.make(LucidUserRepository);
    });
    
    this.app.container.bind(AuthRepository, () => {
      return this.app.container.make(LucidAuthRepository);
    });
    
    this.app.container.bind(EmailRepository, () => {
      return this.app.container.make(AdonisEmailRepository);
    });
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}