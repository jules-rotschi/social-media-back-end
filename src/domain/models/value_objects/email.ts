import DomainException from "#exceptions/domain_exception";

export class Email {

  constructor(
    private readonly identifier: string,
    private readonly domain: string
  ) {}

  toString(): string {
    return `${this.identifier}@${this.domain}`;
  }

  equals(email: Email) {
    return (
      this.identifier === email.identifier
      && this.domain === email.domain
    )
  }
}

export class EmailFactory {

  create(emailString: string): Email {

    const [identifier, domain, ...globalErrors] = emailString.split("@");

    if (!identifier || !domain || globalErrors.length) {
      throw new DomainException("Format de l'e-mail invalide");
    }

    return new Email(
      identifier,
      domain
    );
  }
}