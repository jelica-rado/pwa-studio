import React from 'react';

import { createTestInstance } from '@jelica-rado/peregrine';

import Select from '../select';

jest.mock('@jelica-rado/venia-ui/lib/components/RichContent', () => {
    return props => <mock-RichContent {...props} />;
});

let inputProps = {};

const Component = () => {
    return <Select {...inputProps} />;
};

const givenDefaultValues = () => {
    inputProps = {
        attribute_metadata: {
            label: 'Select Label'
        }
    };
};

describe('#Select', () => {
    it('renders empty when no data is provided', () => {
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders label only when data is missing', () => {
        givenDefaultValues();
        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders options without html when data is provided', () => {
        inputProps = {
            attribute_metadata: {
                label: 'Select Label',
                ui_input: {
                    is_html_allowed: false
                }
            },
            selected_attribute_options: {
                attribute_option: [
                    {
                        label: 'Option 1'
                    },
                    {
                        label: 'Option 2'
                    }
                ]
            }
        };

        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders options with html when data is provided', () => {
        inputProps = {
            attribute_metadata: {
                label: 'Select Label',
                ui_input: {
                    is_html_allowed: true
                }
            },
            selected_attribute_options: {
                attribute_option: [
                    {
                        label: '<span>Option 1</span>'
                    },
                    {
                        label: '<span>Option 2</span>'
                    }
                ]
            }
        };

        const tree = createTestInstance(<Component />);

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
