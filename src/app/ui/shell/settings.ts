import { Injectable, inject } from '@angular/core';
import { I18nService } from '@app/shared/i18n/i18n';
import type { Language } from '@app/shared/i18n/i18n';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    private readonly i18n = inject(I18nService);

    readonly language = this.i18n.language;

    setLanguage(language: Language): void {
        this.i18n.setLanguage(language);
    }
}
