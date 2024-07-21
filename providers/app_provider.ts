import type { ApplicationService } from '@adonisjs/core/types'
import { UserRepository } from '#contracts/repositories/user-repository';

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
    
    this.app.container.bind(UserRepository, () => {
      return this.app.container.make(LucidUserRepository);
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