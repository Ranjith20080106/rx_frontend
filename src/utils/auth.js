export class AuthService {
    static TOKEN_KEY = 'resumex_jwt_token';
    static USER_KEY = 'resumex_user_data';

    static saveSession(token, user) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
    }

    static clearSession() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
        }
    }

    static getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    static getUser() {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem(this.USER_KEY);
            return user ? JSON.parse(user) : null;
        }
        return null;
    }

    static isAuthenticated() {
        return this.getToken() !== null;
    }

    static logout(router) {
        this.clearSession();
        if (router) {
            router.push('/login');
        } else if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }
}
