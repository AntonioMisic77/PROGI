export default class ApiBase {
   protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
   options.headers = {
      ...options.headers,
      Authorization: localStorage.getItem("Bearer token") ?? "",
   };
   return Promise.resolve(options);
   };
}