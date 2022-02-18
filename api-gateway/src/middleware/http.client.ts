import { Service } from 'typedi';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

type ServerError = { errorMessage: string };

@Service()
export class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      timeout: 15000
    });
  }

  private handleResponse({ data }: AxiosResponse) {
    return data;
  }

  protected handleError(error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return Promise.reject(serverError.response.data);
      }
    }

    return Promise.reject(error);
  }

  public async get<T>(url: string): Promise<T> {
    return this.instance
      .get(url)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  public async post<T>(url: string, data: any): Promise<T> {
    return this.instance
      .post(url, data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
