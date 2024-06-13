import { IdGenerator } from "@/core/shared/GeneratorID/IdGenerator"
import { v4 as uuid } from "uuid"

export default class Id implements IdGenerator {
  gerar(): string {
    return uuid()
  }
}
