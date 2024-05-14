export class UserHelper {
    static getUserId(): number {
        const userId = +localStorage.getItem('lastUserId')! + 1;
        localStorage.setItem('lastUserId', userId.toString());
        return userId;
    }
}
