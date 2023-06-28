/*Initial data for the store */
const initialValue = {
    movies: [],
    members: [],
    subscriptions: [],
    users: [],
}

/*state - current state */
/*action - {type(string):'WHAT_TO_DO',Optional[payload:value]} */
const storeReducer = (state = initialValue, action) => {
    switch (action.type) {
        /*Movies */
        case 'LOADMOVIES':
            return { ...state, movies: action.payload };
        case 'UPDATEMOVIE': {
            const updatedMovie = action.payload;
            const updatedMovies = state.movies.map(movie => {
                if (movie._id === updatedMovie._id) {
                    return { ...movie, ...updatedMovie };
                }
                return movie;
            });
            return { ...state, movies: updatedMovies };
        };
        case 'ADDMOVIE': {
            const newMovie = action.payload;
            const updatedMovies = [...state.movies, newMovie];
            return { ...state, movies: updatedMovies };
        };
        case 'DELETEMOVIE': {
            const movieId = action.payload;
            const updatedMovies = state.movies.filter(movie => movie._id !== movieId);
            return { ...state, movies: updatedMovies };
        };
        /*Members */
        case 'LOADMEMBERS':
            return { ...state, members: action.payload };
        case 'UPDATEMEMBERS': {
            const updatedMember = action.payload;
            const updatedMembers = state.members.map(member => {
                if (member._id === updatedMember._id) {
                    return { ...member, ...updatedMember };
                }
                return member;
            });
            return { ...state, members: updatedMembers };
        };
        case 'ADDMEMBER': {
            const newMember = action.payload;
            const updatedMembers = [...state.members, newMember];
            return { ...state, members: updatedMembers };
        };
        case 'DELETEMEMBERS': {
            const memberId = action.payload;
            const updatedMembers = state.members.filter(member => member._id !== memberId);
            return { ...state, members: updatedMembers };
        };
        /*Subscriptions */
        case 'LOADSUBSCRIPTIONS':
            return { ...state, subscriptions: action.payload };
        case 'ADDSUBSCRIPTION': {
            const newSubscription = action.payload;
            const addToMember = state.subscriptions.find((sub) => sub.memberId === newSubscription.memberId);
            if (addToMember) {
                const updatedSubscriptions = state.subscriptions.map(sub => {
                    if (sub.memberId === newSubscription.memberId) {
                        return { ...sub, ...newSubscription };
                    };
                    return sub;
                });
                return { ...state, subscriptions: updatedSubscriptions };
            };
            return { ...state, subscriptions: [...state.subscriptions, action.payload] };
        };
        case 'DELETESUBSCRIPTION': {
            const memberId = action.payload;
            const updatedSubscriptions = state.subscriptions.filter(sub => sub.memberId !== memberId);
            return { ...state, subscriptions: updatedSubscriptions };
        };
        /*Users */
        case 'LOADUSERS':
            return { ...state, users: action.payload };
        case 'UPDATEUSER': {
            const updatedUser = action.payload;
            const updatedUsers = state.users.map(user => {
                if (user.id === updatedUser.id) {
                    return { ...user, ...updatedUser };
                };
                return user;
            });
            return { ...state, users: updatedUsers };
        };
        case 'ADDUSER': {
            const newUser = action.payload;
            const updatedUser = [...state.users, newUser];
            return { ...state, users: updatedUser };
        };
        case 'DELETEUSER': {
            const userId = action.payload;
            const updatedUsers = state.users.fill(user => user.id !== userId);
            return { ...state, users: updatedUsers };
        };
        default:
            return state;
    };
};

export default storeReducer