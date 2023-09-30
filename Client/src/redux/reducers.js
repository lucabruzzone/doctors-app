import { json } from "react-router-dom";
import { data } from "../data";
import { fullWeek } from "../Functions/Calendar";

const initialState = {
    j: 0,
    newWeek: [],
    selectDate: fullWeek(0)[0],
    inputData: {},
    modalidad: 'presencial',
    prevision: '',
    renderDoctors: data,
    allDoctors: data,
    scrollY: 'bigContainerAbsolute',
    asideBar: 'bigContainerTranslateOut',
    myFavorites: [],
    allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FAV":
            console.log(state)
            state = {...state, allCharacters: [...state.allCharacters, action.payload]};
            state = {...state, myFavorites: [...state.myFavorites, action.payload]};
            return state;

        case "REMOVE_FAV":
            state = {...state, myFavorites: state.myFavorites.filter((char) => char.id !== Number(action.payload))};
            state = {...state, allCharacters: state.myFavorites};
            return state;

        case 'FILTER':
            if(action.payload === 'ALL') state = {...state, myFavorites: state.allCharacters};
            else if(action.payload === 'SELECCIONE') state = {...state};
            else state = {...state, myFavorites: state.allCharacters.filter((char) => char.gender === action.payload)};
            return state;

        case "ORDER":
            let ordered = state.myFavorites.slice().sort((a, b) => {return a.id - b.id});
            if(action.payload === 'B') ordered.reverse();
            if(action.payload === 'SELECCIONE') return state;
            return {...state, myFavorites: ordered};
        
        case 'NEXTWEEK':
            state = {...state, j: state.j + 6};
            return state;

        case 'PREVWEEK':
            state = {...state, j: state.j - 6};
            return state;

        case 'REFRESHCALENDAR':
            state = {...state, j: 0};
            return state;

        case 'NEWWEEK':
            state = {...state, newWeek: action.payload};
            return state;

        case 'SELECTDATE':
            state = {...state, selectDate: action.payload};
            return state;

        case 'INPUTDATA':
            state = {...state, inputData: action.payload};
            return state;

        case 'MODALIDAD':
            state = {...state, modalidad: action.payload};
            return state;

        case 'PREVISION':
            state = {...state, prevision: action.payload};
            return state;

        case 'PREVISIONFILTRO':
            let docsFilter = state.allDoctors.filter(doc => doc.convenio.includes(action.payload))
            state = {...state, renderDoctors: docsFilter};
            return state;

        case 'ALLDOCTORS':
            
            state = {...state, renderDoctors: state.allDoctors};
            return state;

        case 'ASIDESCROLL':
            
            state = {...state, scrollY: action.position};
            return state;

        case 'ASIDETRANSLATE':
            
            state = {...state, asideBar: action.translate};
            return state;

        default:
            return {...state};
    }
};

export default rootReducer;
