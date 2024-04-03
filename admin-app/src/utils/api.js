export const redirectUserBackToHomeIfLoggedIn = (history) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        history.push('/');
    }
}