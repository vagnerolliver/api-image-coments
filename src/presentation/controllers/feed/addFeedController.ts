import { HttpRequest, HttpResponse } from '@/presentation/protocols/https'

export class AddFeedController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: url')
    }
  }
}
