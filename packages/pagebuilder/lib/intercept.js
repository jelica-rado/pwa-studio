const myName = '@jelica-rado/pagebuilder';
const { Targetables } = require('@jelica-rado/pwa-buildpack');
const CustomContentTypeList = require('./ContentTypes/CustomContentTypeList');
module.exports = targets => {
    const pagebuilder = Targetables.using(targets);
    pagebuilder.setSpecialFeatures('esModules', 'cssModules');
    pagebuilder.defineEnvVars('PageBuilder', [
        {
            name: 'GOOGLE_MAPS_API_KEY',
            type: 'str',
            desc:
                'Specify a Google Maps API token for instantiating a Maps instance for your Page Builder map content type.',
            default: ''
        }
    ]);

    targets
        .of('@jelica-rado/venia-ui')
        .richContentRenderers.tap(richContentRenderers => {
            richContentRenderers.add({
                componentName: 'PageBuilder',
                importPath: myName
            });
        });

    new CustomContentTypeList(pagebuilder);
};
