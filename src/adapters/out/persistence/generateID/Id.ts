import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { v4 as uuid } from "uuid"

export default class Id implements IIdGenerator {
  gerar(): string {
    return uuid()
  }
}
