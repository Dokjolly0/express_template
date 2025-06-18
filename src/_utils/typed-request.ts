import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface TypedRequest<T = unknown, Q = ParsedQs, P = ParamsDictionary>
  extends Request<P, any, T, Q> {}

export type RequestWithBody<B> = TypedRequest<B>;
export type RequestWithQuery<Q> = TypedRequest<unknown, Q>;
export type RequestWithParams<P> = TypedRequest<unknown, unknown, P>;
