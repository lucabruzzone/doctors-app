
export const addFav = (character) => {
    return {type: "ADD_FAV", payload: character}
}

export const removeFav = (id) => {
    return {type: "REMOVE_FAV", payload: id}
}

export const filterCards = (gender) => {
    return {type: "FILTER", payload: gender}
}

export const orderCards = (orden) => {
    return {type: "ORDER", payload: orden}
}

export const nextWeek = (next) => {
    return {type: "NEXTWEEK"}
}

export const prevWeek = (next) => {
    return {type: "PREVWEEK"}
}

export const newWeek = (week) => {
    return {type: "NEWWEEK", payload: week}
}

export const dateSelection = (date) => {
    return {type: "SELECTDATE", payload: date}
}

export const inputData = (objData) => {
    return {type: "INPUTDATA", payload: objData}
}

export const switchModalidad = (modalidad) => {
    return {type: "MODALIDAD", payload: modalidad}
}

export const refreshCalendar = () => {
    return {type: "REFRESHCALENDAR"}
}

export const previsionSelection = (prevision) => {
    return {type: "PREVISION", payload: prevision}
}

export const previsionFiltro = (prevision) => {
    return {type: "PREVISIONFILTRO", payload: prevision}
}

export const showAllDoctors = () => {
    return {type: "ALLDOCTORS"}
}

export const asideScroll = (scroll) => {
    return {type: "ASIDESCROLL", position: scroll}
}

export const asideTranslate = (trans) => {
    return {type: "ASIDETRANSLATE", translate: trans}
}
