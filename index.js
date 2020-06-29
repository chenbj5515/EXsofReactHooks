import {useRef, useEffect, useState, useCallback} from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import usePersistFn from './usePersistFn';
// 实现swr的缓存函数,代码在下面
import {getCache, setCache} from './cache';

const DEFAULT_KEY = 'USE_API_DEFAULT_KEY';

class Fetch {
    that = this;

    // 请求时序
    count = 0;

    state = {
        loading: false,
        data: undefined,
        error: undefined,
        parmas: [],
        run: this.run.bind(this.that),
        refresh: this.refresh.bind(this.that),
    };

    // 增加initState参数，协助实现缓存功能
    constructor(service, config, subscribe, initState) {
        this.service = service;
        this.config = config;
        this.subscribe = subscribe;
        if (initState) {
            this.state = {
                ...this.state,
                ...initState,
            };
        }
        this.debounceRun = this.config.debounceInterval ? debounce(this._run, this.config.debounceInterval) : undefined;
        this.throttleRun = this.config.throttleInterval ? throttle(this._run, this.config.throttleInterval) : undefined;
    }

    setState(s = {}) {
        this.state = {
            ...this.state,
            ...s
        };
        // 重要，改变状态的时候触发订阅，触发hooks的重新加载
        this.subscribe(this.state);
    }

    _run(...args) {
        this.count += 1;
        // 闭包存储当次请求的 count
        const currentCount = this.count;
        this.setState({
            loading: true,
            params: args
        });
        return this.service(...args).then(data => {
            if (currentCount === this.count) {
                this.setState({
                    data,
                    error: undefined,
                    loading: false
                });
                if (this.config.onSuccess) {
                    this.config.onSuccess(data, args);
                }
                return data;
            }
        })
            .catch(error => {
                if (currentCount === this.count) {
                    this.setState({
                        data: undefined,
                        error,
                        loading: false
                    });
                    if (this.config.onError) {
                        this.config.onError(error, args);
                    }
                    return error;
                }
            });
    }

    run(...args) {
        if (this.debounceRun) {
            this.debounceRun(...args);
            // 如果 options 存在 debounceInterval，或 throttleInterval，则 run 和 refresh 不会返回 Promise;。
            return;
        }
        if (this.throttleRun) {
            this.throttleRun(...args);
            return;
        }
        return this._run(...args);
    }

    refresh() {
        return this.run(...this.state.params);
    }
}

// 接收一个promise(service请求)，返回data,pager，loading等信息
export default function useRequest(service, options) {

    const _options = options || {};
    const {
        manual = false,
        defaultParams = [],
        onSuccess = () => {},
        onError = () => {},
        debounceInterval,
        throttleInterval,
        cacheKey,
    } = _options;
    const newstFetchKey = useRef(DEFAULT_KEY);

    // 持久化一些函数
    const servicePersist = usePersistFn(service);
    const onSuccessPersist = usePersistFn(onSuccess);
    const onErrorPersist = usePersistFn(onError);

    // Fetch需要的配置
    const config = {
        onSuccess: onSuccessPersist,
        onError: onErrorPersist,
        debounceInterval,
        throttleInterval,
    };

    // 订阅函数
    const subscribe = usePersistFn((key, data) => {
        // eslint-disable-next-line no-use-before-define
        setFeches(s => {
            s[key] = data;
            return {...s};
        });
    }, []);

    // 缓存处理重点，初始化的时候获取缓存数据
    const [fetches, setFeches] = useState(() => {
        // 如果有缓存
        if (cacheKey) {
            const cache = getCache(cacheKey);
            if (cache) {
                newstFetchKey.current = cache.newstFetchKey;
                const newFetches = {};
                Object.keys(cache.fetches).forEach(key => {
                    const cachedFetch = cache.fetches[key];
                    // 将缓存的loading，params，data等赋值到新的Fetch实例中，这样用户一进来就会显示上次的结果
                    const newFetch = new Fetch(
                        servicePersist,
                        config,
                        subscribe.bind(null, key),
                        {
                            loading: cachedFetch.loading,
                            params: cachedFetch.params,
                            data: cachedFetch.data,
                            error: cachedFetch.error
                        }
                    );
                    newFetches[key] = newFetch.state;
                });
                return newFetches;
            }
        }
        return [];
    });

    const fetchesRef = useRef(fetches);
    fetchesRef.current = fetches;

    // 手动执行函数
    const run = useCallback((...args) => {
        const currentFetchKey = newstFetchKey.current;
        let currentFetch = fetchesRef.current[currentFetchKey];
        if (!currentFetch) {
            const newFetch =  new Fetch(
                servicePersist,
                config,
                subscribe.bind(null, currentFetchKey),
            );
            currentFetch = newFetch.state;
            setFeches(s => {
                s[currentFetchKey] = currentFetch;
                return {...s};
            });
        }
        return currentFetch.run(...args);
    }, [subscribe]);

    // 缓存处理，每次setFetches都会触发，将当前的fetches缓存起来
    useEffect(() => {
        if (cacheKey) {
            setCache(cacheKey, {
                fetches,
                newstFetchKey: newstFetchKey.current
            });
        }
    }, [cacheKey, fetches]);

    useEffect(() => {
        // 如果不是手动执行，默认请求一次
        if (!manual) {
            // 如果有缓存
            if (Object.keys(fetches).length > 0) {

                /* 重新执行所有的 */
                Object.values(fetches).forEach(f => {
                    f.refresh();
                });
            }
            else {
                // 第一次默认执行，可以通过 defaultParams 设置参数
                run(...defaultParams);
            }
        }
    }, []);

    return {
        loading: !manual,
        data: undefined,
        error: undefined,
        ...(fetches[newstFetchKey.current] || {}),
        run,
    };
}
