import DomainException from "#exceptions/domain_exception";

export class Email {

  constructor(
    private readonly identifier: string,
    private readonly domainName: string,
    private readonly domainExtension: string
  ) {}

  toString(): string {
    return `${this.identifier}@${this.domainName}.${this.domainExtension}`;
  }

  equals(email: Email) {
    return (
      this.identifier === email.identifier
      && this.domainName === email.domainName
      && this.domainExtension === email.domainExtension
    )
  }
}

export class EmailFactory {

  create(emailString: string): Email {

    const [identifier, domain, ...globalErrors] = emailString.split("@");

    if (!identifier || !domain || globalErrors.length) {
      throw new DomainException("Format de l'e-mail invalide");
    }

    const [domainName, domainExtension, ...domainErrors] = domain.split(".");

    if (!domainName || !domainExtension || domainErrors.length) {
      throw new DomainException("Format de l'e-mail invalide");
    }

    return new Email(
      identifier,
      domainName,
      domainExtension
    );
  }
}