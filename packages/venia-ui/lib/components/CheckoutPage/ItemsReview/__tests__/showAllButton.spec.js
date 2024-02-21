import React from 'react';

import createTestInstance from '@jelica-rado/peregrine/lib/util/createTestInstance';

import ShowAllButton from '../showAllButton';

test('Snapshot test', () => {
    const tree = createTestInstance(<ShowAllButton onFooterClick={() => {}} />);

    expect(tree.toJSON()).toMatchSnapshot();
});
