export default class AppErros {
  errorCode: number
  message: string
  constructor(message: string, errorCode: number = 400) {
    this.errorCode = errorCode
    this.message = message
  }
}
