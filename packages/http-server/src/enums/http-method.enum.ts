export enum HttpMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Patch = "patch",
    Delete = "delete",
    Head = "head",
    Options = "options",
    All = "all",
}

export type HttpMethodList = `${HttpMethod}`;
