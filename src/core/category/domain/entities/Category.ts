import AppErros from "@/core/shared/error/AppErros"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

interface ICategory {
  name: string
  description?: string
  id?: string
  activite: boolean
}

export default class Category {
  private _id: string
  private _name: string
  private _description: string
  private _activite: boolean

  constructor(name: string, description: string, activite: boolean, id?: string) {
    this._name = name
    this.setId(id)
    this._description = description || ""
    this._activite = activite
  }

  static factory(category: ICategory): Category {
    return new Category(category.name, category.description || "", category.activite, category.id)
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get activite(): boolean {
    return this._activite
  }

  private setId(id?: string) {
    if (id) {
      this._id = id
    }
  }

  private setName(value: string) {
    if (!value) {
      throw new AppErros(ErrosMessage.INVALID_NAME)
    }
    this._name = value
  }

  private setDescription(value: string) {
    this._description = value
  }

  updateName(newName: string) {
    this.setName(newName)
  }

  updateDescription(newDescription: string) {
    this.setDescription(newDescription)
  }
}
