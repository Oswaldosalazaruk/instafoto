import * as actionsTypes from './actionsTypes';
import { initial } from './initial';
// Estado Inicial
const initialStore = {
    imagenes: initial,
    pagina: initial.slice(0, 9),
    activa: initial[0],
    indice: 0,
    dir_actual: 1,
    filtro: '',
    filename: '',
    newpost: '',
    loading: false,
    error: ''
};

// Reducer
const storeReducer = (state, action) => {
    function search(rows) {
        return rows.filter(
            (row) => row.post.toLowerCase().indexOf(state.filtro.toLowerCase()) > -1
        );
    }
    const encontradas = search(state.imagenes);
    const puntero = encontradas.length;
    switch (action.type) {
        case actionsTypes.GET_ALBUMS:
            {
                console.log("inicio carga de datos...")
                return {...state, loading: true, error: '' }
            }
        case actionsTypes.FETCH_SUCCES:
            {
                return {...state,
                    imagenes: action.payload,
                    loading: false,
                    error: '',
                    pagina: action.payload.slice(0, 9),
                    indice: 0,
                    activa: action.payload[0]
                }
            }
        case actionsTypes.FETCH_ERROR:
            {
                console.log(action.payload)
                return {...state, error: "error de carga", loading: false }
            }
        case actionsTypes.ACTIVA:
            {
                const act = state.imagenes.find((imagen) => imagen.id === action.payload);
                return {...state, activa: act }
            }
        case actionsTypes.DIR_ACTUAL:
            {
                return {...state, dir_actual: action.payload, indice: 0 }
            }
        case actionsTypes.NEXT_PAG:
            {
                if (state.indice < puntero - 9) {
                    return {...state,
                        indice: state.indice + 9,
                        pagina: encontradas.slice(state.indice + 9, state.indice + 18),
                        activa: encontradas[state.indice + 9]
                    }
                } else {
                    return {...state,
                        indice: 0,
                        pagina: encontradas.slice(0, 9),
                        activa: encontradas[0]
                    }
                }
            }
        case actionsTypes.PREV_PAG:
            {
                if (state.indice > 9) {
                    return {...state,
                        indice: state.indice - 9,
                        pagina: encontradas.slice(state.indice - 9, state.indice),
                        activa: encontradas[state.indice - 9]
                    }
                } else {
                    return {...state,
                        indice: puntero - 9,
                        pagina: encontradas.slice(puntero - 9, puntero),
                        activa: encontradas[state.indice - 9]
                    }
                }
            }
        case actionsTypes.SEARCH:
            {
                return {...state, filtro: action.payload, indice: 0, pagina: encontradas.slice(0, (puntero > 9) ? 9 : puntero) }
            }
        case actionsTypes.NEW_POST:
            {
                return {...state, newpost: action.payload }
            }
        case actionsTypes.HANDLE_NEW_POST:
            {
                return {...state,
                    activa: {...state.activa, post: state.newpost },
                    imagenes: state.imagenes.map(imagen => (imagen._id === state.activa._id) ? {...imagen, post: state.newpost } : imagen),
                    pagina: state.pagina.map(imagen => (imagen._id === state.activa._id) ? {...imagen, post: state.newpost } : imagen)
                }
            }
        case actionsTypes.FILE_NAME:
            {
                return {...state, filename: action.payload }
            }
        case actionsTypes.UPLOAD:
            {
                return {...state, loading: true, error: '' }
            }
        case actionsTypes.UPLOAD_SUCCES:
            {
                return {...state, loading: false, error: '' }
            }
        case actionsTypes.UPLOAD_ERROR:
            {
                return {...state, loading: false, error: 'error subiendo el archivo' }
            }

        default:
            console.log("nada");
            return state
    }
}
export { initialStore };
export default storeReducer;