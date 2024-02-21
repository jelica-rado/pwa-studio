module.exports = targets => {
    const { talons } = targets.of('@jelica-rado/peregrine');
    const { specialFeatures } = targets.of('@jelica-rado/pwa-buildpack');

    specialFeatures.tap(flags => {
        /**
         *  Wee need to activate esModules, cssModules and GQL Queries to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {
            esModules: true
        };
    });

    talons.tap(({ App, Header, SearchBar }) => {
        App.useApp.wrapWith('@jelica-rado/experience-platform-connector');
        Header.useAccountMenu.wrapWith(
            '@jelica-rado/experience-platform-connector/src/wrappers/wrapUseAccountMenu'
        );
        SearchBar.useAutocomplete.wrapWith(
            '@jelica-rado/experience-platform-connector/src/wrappers/wrapUseAutocomplete'
        );
    });
};
