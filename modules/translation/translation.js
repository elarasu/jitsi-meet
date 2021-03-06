/* @flow */

import jqueryI18next from 'jquery-i18next';

import { DEFAULT_LANGUAGE, i18next } from '../../react/features/base/i18n';

declare var $: Function;

/**
 * Notifies that the {@link i18next} instance has finished its initialization.
 *
 * @returns {void}
 * @private
 */
function _onI18nInitialized() {
    $('[data-i18n]').localize();
}

/**
 *
 */
class Translation {
    /**
     *
     */
    addLanguageChangedListener(listener: Function) {
        i18next.on('languageChanged', listener);
    }

    /**
     *
     */
    generateTranslationHTML(key: string, options: Object) {
        const optAttr
            = options ? ` data-i18n-options='${JSON.stringify(options)}'` : '';

        // XXX i18next expects undefined if options are missing.
        const text = i18next.t(key, options ? options : undefined);

        return `<span data-i18n="${key}"${optAttr}>${text}</span>`;
    }

    /**
     *
     */
    getCurrentLanguage() {
        return i18next.lng();
    }

    /**
     *
     */
    init() {
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });

        if (i18next.isInitialized) {
            _onI18nInitialized();
        } else {
            i18next.on('initialized', _onI18nInitialized);
        }
    }

    /**
     *
     */
    setLanguage(language: string = DEFAULT_LANGUAGE) {
        i18next.setLng(language, {}, _onI18nInitialized);
    }

    /**
     * 
     */
    translateElement(selector: Object, options: Object) {
        // XXX i18next expects undefined if options are missing.
        selector.localize(options ? options : undefined);
    }
}

export default new Translation();
