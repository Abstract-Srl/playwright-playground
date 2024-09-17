import { users } from './users';
import {User} from '../context/MainContext' // Assicurati che il file `users` sia importato correttamente.

export const mockAuth = {
    login: (username: string, password: string): Promise<User | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = users.find(
                    (user) => user.login.username === username && user.login.password === password
                );

                resolve(user);
            }, 500);
        });
    },
    logout: (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    },
};
