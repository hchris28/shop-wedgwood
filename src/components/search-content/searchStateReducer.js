
export const VIEW_CARD = 'card'
export const VIEW_MAP = 'map'

export const initialSearchState = {
    query: '',
    queryResults: [],
    viewState: VIEW_CARD,
    recenterMap: false,
    activeShop: {
        markerKey: '',
        card: null
    }
}

export const searchStateReducer = (state, action) => {
    let newState = state
    switch (action.type) {
        case 'searchChange':
            newState = {
                ...state,
                query: action.payload.query,
                queryResults: action.payload.queryResults,
                recenterMap: true,
                activeShop: {
                    markerKey: '',
                    card: null
                }
            }
            break;
        case 'viewStateChange':
            newState = {
                ...state,
                viewState: action.payload.viewState,
                recenterMap: false
            }
            break;
        case 'markerClick':
            newState = {
                ...state,
                recenterMap: false,
                activeShop: {
                    markerKey: action.payload.markerKey,
                    card: action.payload.card
                }
            }
            break;
        case 'mapDetailClose':
            newState = {
                ...state,
                recenterMap: false,
                activeShop: {
                    markerKey: '',
                    card: null
                }
            }
            break;
        default:
            throw new Error();
    }

    return newState;
}