import string from "@adonisjs/core/helpers/string";
import { BaseModel, CamelCaseNamingStrategy } from "@adonisjs/lucid/orm";

export class ModelNamingStrategy extends CamelCaseNamingStrategy {

  tableName(model: typeof BaseModel) {
    const snakeCased = string.snakeCase(model.name);
    const parts = snakeCased.split('_');
    parts.splice(-1);
    const finalSnakeCased = parts.join('_');
    return string.pluralize(finalSnakeCased);
  }

}