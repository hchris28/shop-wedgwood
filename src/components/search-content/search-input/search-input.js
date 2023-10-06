import React from 'react'
import CloseIcon from '../../icons/close'
import SearchIcon from '../../icons/search'

import * as styles from './search-input.module.scss'

const SearchInput = ({
    searchState = {},
    onChange = () => { },
    onClear = () => { },
}) => {

    const hasSearch = searchState.queryResults && searchState.query !== ''

    return (
        <div className={styles.searchInput}>
            <input
                type="text"
                aria-label="Search"
                placeholder="Start typing to search..."
                onChange={onChange}
                value={searchState.query}
            />
            {hasSearch &&
                <p className={styles.searchResultsSummary}>
                    Found <span className={styles.searchResultsCount}>{searchState.queryResults.length}</span> businesses
                    matching your search for &apos;{searchState.query}&apos;
                </p>
            }
            <div className={styles.searchIcon}>
                {hasSearch
                    ? (
                        <button
                            className={styles.searchClose}
                            onClick={onClear}>
                            <CloseIcon />
                            <span>Clear</span>
                        </button>
                    )
                    : (
                        <SearchIcon />
                    )
                }
            </div>
        </div>
    )
}

export default SearchInput