import { Injectable, signal } from '@angular/core';
import i18next from 'i18next';
import en from '@app/shared/i18n/en.json';
import es from '@app/shared/i18n/es.json';

export type Language = 'en' | 'es';

export type TranslationParams = Record<string, unknown>;

const LANGUAGE_STORAGE_KEY = 'angular-rpg.language';
const DEFAULT_LANGUAGE: Language = 'en';

const storedLanguage = typeof localStorage === 'undefined'
    ? null
    : localStorage.getItem(LANGUAGE_STORAGE_KEY);
const initialLanguage: Language = storedLanguage === 'es' ? 'es' : DEFAULT_LANGUAGE;

void i18next.init({
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    resources: {
        en: { translation: en },
        es: { translation: es }
    }
});

@Injectable({ providedIn: 'root' })
export class I18nService {
    readonly language = signal<Language>(initialLanguage);

    translate(key: string, params: TranslationParams = {}): string {
        return String(i18next.t(key, params));
    }

    setLanguage(language: Language): void {
        this.language.set(language);
        void i18next.changeLanguage(language);
        // TODO: persist settings through the data layer using browser SQLite.
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        }
    }
}

export function i18nTranslation(
    key: string,
    params: Record<string, () => unknown>
): string {

    return String(i18next.t(key, {
        ...Object.fromEntries(
            Object.entries(params).map(([key, getter]) => [
                key,
                getter()
            ])
        )
    }));
    
}
