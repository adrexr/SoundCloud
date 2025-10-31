import React, { createContext, useState, useContext } from 'react';

const translations = {
    es: {
        // General
        home: 'Inicio',
        feed: 'Feed',
        library: 'Librería',
        upload: 'Subir',
        tryArtistPro: 'Probar para Artistas',
        forArtist: 'Para Artistas',
        searchPlaceholder: 'Buscar artistas, bandas, pistas...',
        language: 'Idioma',
        signOut: 'Cerrar sesión',
        noNewNotifications: 'No hay notificaciones nuevas.',
        noNewMessages: 'No hay mensajes nuevos.',
        // Home
        artistsToWatch: 'Artistas a seguir',
        curatedForYou: 'Seleccionado para tu gusto',
        artistTools: 'Herramientas de artistas',
        amplify: 'Amplificar',
        replace: 'Sustituir',
        distribute: 'Distribuir',
        master: 'Masterizar',
        artistsToFollow: 'Artistas a seguir',
        refresh: 'Refrescar',
        listeningHistory: 'Historial de Escucha',
        // Feed
        feedTitle: 'Escucha las últimas publicaciones de la gente que sigues:',
        feedEmpty: 'Tu feed está actualmente vacío. Ve a buscar, a inicio o usa las sugerencias a continuación para encontrar creadores a seguir.',
        refreshList: 'Refrescar lista',
        follow: 'Seguir',
        following: 'Siguiendo',
        // Library
        searchInLibrary: 'Buscar en tu librería...',
        overview: 'Resumen',
        likes: 'Me gusta',
        playlists: 'Playlists',
        albums: 'Álbumes',
        stations: 'Estaciones',
        history: 'Historial',
        // Upload Page
        uploadTitle: 'Sube tus archivos de audio.',
        uploadDescription: 'Para obtener la mejor calidad, utiliza WAV, FLAC, AIFF o ALAC. El tamaño máximo del archivo es de 4 GB sin comprimir.',
        uploadLearnMore: 'Más información.',
        selectAudioFile: 'Seleccionar archivo de audio',
        uploading: 'Subiendo...',
        uploadSong: 'Subir canción',
        // Login Modal
        loginTitle: 'Inicia sesión o crea una cuenta',
        loginTerms: 'Al hacer clic en cualquiera de los botones “Continuar” a continuación, aceptas los Términos de Uso de SoundCloud y reconoces nuestra Política de privacidad.',
        continueWithFacebook: 'Continuar con Facebook',
        continueWithGoogle: 'Continuar con Google',
        continueWithApple: 'Continuar con Apple',
        orByEmail: 'O por correo electrónico',
        yourEmail: 'Tu dirección de email',
        yourPassword: 'Tu contraseña',
        continue: 'Continuar',
    },
    en: {
        // General
        home: 'Home',
        feed: 'Feed',
        library: 'Library',
        upload: 'Upload',
        tryArtistPro: 'Try Artist Pro',
        forArtist: 'For Artist',
        searchPlaceholder: 'Search for artists, bands, tracks...',
        language: 'Language',
        signOut: 'Sign out',
        noNewNotifications: 'No new notifications.',
        noNewMessages: 'No new messages.',
        // Home
        artistsToWatch: 'Artists to watch out for',
        curatedForYou: 'Curated for your taste',
        artistTools: 'Artist Tools',
        amplify: 'Amplify',
        replace: 'Replace',
        distribute: 'Distribute',
        master: 'Master',
        artistsToFollow: 'Artists to follow',
        refresh: 'Refresh',
        listeningHistory: 'Listening History',
        // Feed
        feedTitle: 'Hear the latest posts from the people you’re following:',
        feedEmpty: 'Your feed is currently empty. Go to search, home or use the suggestions below to find creators to follow.',
        refreshList: 'Refresh list',
        follow: 'Follow',
        following: 'Following',
        // Library
        searchInLibrary: 'Search in your library...',
        overview: 'Overview',
        likes: 'Likes',
        playlists: 'Playlists',
        albums: 'Albums',
        stations: 'Stations',
        history: 'History',
        // Upload Page
        uploadTitle: 'Upload your audio files.',
        uploadDescription: 'For best quality, use WAV, FLAC, AIFF or ALAC. The maximum file size is 4 GB uncompressed.',
        uploadLearnMore: 'Learn more.',
        selectAudioFile: 'Select audio file',
        uploading: 'Uploading...',
        uploadSong: 'Upload song',
        // Login Modal
        loginTitle: 'Sign in or create an account',
        loginTerms: 'By clicking any of the "Continue" buttons below, you agree to SoundCloud\'s Terms of Use and acknowledge our Privacy Policy.',
        continueWithFacebook: 'Continue with Facebook',
        continueWithGoogle: 'Continue with Google',
        continueWithApple: 'Continue with Apple',
        orByEmail: 'Or by email',
        yourEmail: 'Your email address',
        yourPassword: 'Your password',
        continue: 'Continue',
    },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('es');

    const t = (key) => {
        return translations[currentLanguage][key] || translations['en'][key];
    };

    return (
        <LanguageContext.Provider value={{ t, currentLanguage, setCurrentLanguage, languages: Object.keys(translations).map(code => ({ code, name: translations[code].language })) }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);