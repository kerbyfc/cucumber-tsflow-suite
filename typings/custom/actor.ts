interface IActor<T> {
    invoke: () => webdriver.promise.Promise<T>;
    until: (T) => boolean;
    otherwise: (T?) => void;
    during?: number;
    every?: number;
}

