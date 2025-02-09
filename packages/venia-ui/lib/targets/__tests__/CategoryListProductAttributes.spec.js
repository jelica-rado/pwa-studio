const {
    mockTargetProvider
} = require('@jelica-rado/pwa-buildpack/lib/TestHelpers');
const TargetableSet = require('@jelica-rado/pwa-buildpack/lib/WebpackTools/targetables/TargetableSet');

const CategoryListProductAttributes = require('../CategoryListProductAttributes');

const targets = mockTargetProvider(
    '@jelica-rado/venia-ui',
    (_, dep) =>
        ({
            '@jelica-rado/pwa-buildpack': {
                specialFeatures: {
                    tap: jest.fn()
                },
                transformModules: {
                    tapPromise: jest.fn()
                }
            }
        }[dep])
);
const targetable = TargetableSet.using(targets);

const mockImportName = 'ImportedComponent';
const mockInsertAfterJSX = jest.fn();

beforeAll(() => {
    jest.spyOn(targetable, 'reactComponent').mockImplementation(() => ({
        addImport: () => mockImportName,
        insertAfterJSX: mockInsertAfterJSX
    }));
});

test('inserts component after provided matcher', () => {
    const target = new CategoryListProductAttributes(targetable);
    target.insertAfterJSX({
        matcher: 'SomeComponent',
        importStatement: 'import Woof from "./dog.js"'
    });

    expect(mockInsertAfterJSX.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "SomeComponent",
          "<ImportedComponent item={props.item} />",
        ]
    `);
});
