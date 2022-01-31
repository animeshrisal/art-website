import React, { useMemo, useState } from "react";
import debounce from 'lodash/debounce';
import { Select, Spin } from "antd";

function DebounceSelect({ fetchOptions, debounceTimeout = 500, isLoading, search, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            search(value)
            if (isLoading) {
                setOptions([]);
                setFetching(true)
            } else {
                setOptions(fetchOptions)
                setFetching(false)
            }
        }

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout, isLoading, search])
    return (
        <Select
        notFoundContent={fetching ? <Spin size="small" /> : null}
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            {...props}
            options={options}
        />
    );
} // Usage of DebounceSelect

export default DebounceSelect