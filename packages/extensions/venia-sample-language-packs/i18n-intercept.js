module.exports = targets => {
    const builtins = targets.of('@jelica-rado/pwa-buildpack');

    builtins.specialFeatures.tap(features => {
        features[targets.name] = { i18n: true };
    });
};
