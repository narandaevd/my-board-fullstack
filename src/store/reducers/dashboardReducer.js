import { addAC } from "../actions/dashboardActions";

const initialState = {
    id: -3,
    lists: [
        {
            name: 'someList',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'Some assignee'
                },
                {
                    header: 'card2',
                    content: 'lorem',
                    assignee: 'some Assignee2'
                },
            ] 
        },
        {
            name: 'someList2',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'Some assignee'
                },
            ] 
        },
        {
            name: 'someList3',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'Some assignee'
                },
                {
                    header: 'card2',
                    content: 'lorem',
                    assignee: 'some Assignee2'
                },
                {
                    header: 'card3',
                    content: 'lorem',
                    assignee: 'some Assignee2'
                },
                {
                    header: 'card4',
                    content: 'lorem',
                    assignee: 'some Assignee2'
                },
            ] 
        },
        {
            name: 'someList4',
            cards: [] 
        },
    ],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            const newState = {...state};
            newState.lists[action.listIndex].cards.push(action.data);
            return {...newState};
        default:
            return state;
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAdd: (card, listIndex) => dispatch(addAC(card, listIndex)),
    }
}

export default reducer;
export { mapStateToProps, mapDispatchToProps };