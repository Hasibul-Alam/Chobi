import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme:dark)',
    ).matches;
    const storedMode = Boolean(localStorage.getItem('darkTheme'));
    return prefersDarkMode || storedMode;
};

export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState('cat');
    const themeToggle = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }, [isDarkTheme]);

    return (
        <AppContext.Provider
            value={{ isDarkTheme, themeToggle, searchTerm, setSearchTerm }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
