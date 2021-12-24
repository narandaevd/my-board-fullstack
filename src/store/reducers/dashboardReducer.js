const initialState = {
    id: -3,
    lists: [
        {
            name: 'someList',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ'
                },
                {
                    header: 'card2',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ2'
                },
            ] 
        },
        {
            name: 'someList2',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ'
                },
            ] 
        },
        {
            name: 'someList3',
            cards: [
                {
                    header: 'card1',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ'
                },
                {
                    header: 'card2',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ2'
                },
                {
                    header: 'card3',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ2'
                },
                {
                    header: 'card4',
                    content: 'lorem',
                    assignee: 'СУКА ТВАРЬ2'
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
        onAdd: () => dispatch({type: 'ADD'}),
    }
}

export default reducer;
export { mapStateToProps, mapDispatchToProps };