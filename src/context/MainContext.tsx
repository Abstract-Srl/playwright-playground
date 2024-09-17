import React, { createContext, useState, useContext } from 'react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

export type User = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number | string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string | null;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
};


interface CartContextType {
    cart: CartItem[];
    user: User | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateCartItemQuantity: (id: number, newQuantity: number) => void;
    login: (user: User) => void;
    logout: () => void;
}

const MainContext = createContext<CartContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null); // Stato per l'utente

    // Funzione per aggiungere articoli al carrello
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Funzione per rimuovere articoli dal carrello
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateCartItemQuantity = (id: number, newQuantity: number) => {
        setCart((prevCart) => {
            if (newQuantity <= 0) {
                return prevCart.filter((item) => item.id !== id);
            }
            return prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // Funzione per autenticare l'utente
    const login = (newUser: User) => {
        setUser(newUser);
    };

    // Funzione per eseguire il logout
    const logout = () => {
        setUser(null);
        setCart([]); // Resetta anche il carrello al logout
    };

    return (
        <MainContext.Provider value={{ cart, user, addToCart, removeFromCart, login, logout, updateCartItemQuantity }}>
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => {
    const context = useContext(MainContext);
    if (context === undefined) {
        throw new Error('useMainContext must be used within a MainProvider');
    }
    return context;
};
