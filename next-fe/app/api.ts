import useSWR from 'swr';

export type RequestPayload = Record<
  string,
  string | Date | RequestPayload[] | number | boolean
>;

type FetcherProps = {
  path: string;
} & Partial<{
  options: RequestInit;
  data: RequestPayload | RequestPayload[];
}>;

type apiRes = {
  data?: any;
  errror?: any;
  isLoading: any;
};

class ApiClient {
  constructor() {}

  // https://stackoverflow.com/questions/63313799/typescript-argument-cant-use-any-in-fetch
  private fetcher = async <T>(options: FetcherProps): Promise<T> => {
    const { path, options: _options, data } = options;

    let fetchOpts = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'getToken()',
      },
      ..._options,
    };

    if (data) {
      fetchOpts.body = JSON.stringify(data);
    }

    const fullPath: string = path.includes('http')
      ? path
      : 'localhost:3000' + path;

    return fetch(fullPath, fetchOpts).then((res) => res.json());
  };

  sendRequest = (opts: any): apiRes => useSWR(this.fetcher, opts);

  getSoldiers = async (opts: any) =>
    this.sendRequest({ path: '/soldiers', method: 'GET', ...opts });
}

const apiClient = new ApiClient();

export default apiClient;
