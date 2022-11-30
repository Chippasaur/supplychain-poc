import { Middleware as NextConnectMiddleware, RequestHandler as NextConnectRequestHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

export type Middleware<ReturnType = undefined, ExtendedApiRequest = any> = NextConnectMiddleware<
  NextApiRequest & ExtendedApiRequest,
  NextApiResponse<ReturnType>
>

export type RequestHandler<ReturnType = undefined, ExtendedApiRequest = any> = NextConnectRequestHandler<
  NextApiRequest & ExtendedApiRequest,
  NextApiResponse<ReturnType>
>

export interface CustomizedNextApiRequest extends NextApiRequest {
  params: {
    [key: string]: string
  }
}
