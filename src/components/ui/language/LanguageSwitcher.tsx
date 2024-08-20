import { useTranslation } from 'react-i18next';
import s from './LanguageSwitcher.module.scss';
import { useState } from 'react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setSelectedLanguage(lng);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={s.languageSwitcher}>
            <div className={s.selectedLanguage} onClick={toggleDropdown}>
                <img src={`/${selectedLanguage}.svg`} alt={selectedLanguage} />
            </div>
            {isOpen && (
                <ul className={s.languageList}>
                    <li onClick={() => changeLanguage('en')}>
                        <img src="/en.svg" alt="en" /> 
                    </li>
                    <li onClick={() => changeLanguage('ru')}>
                        <img src="/ru.svg" alt="ru" /> 
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;