/* @flow */

import React from 'react';

import typeof IndexStore from 'src/stores/index';


export default function(Component: Object): Function {
  const FluxComponent = (props, context) => {
    const { store } = context;
    const fluxProps: {store: IndexStore; ref?: Function} = {
      store,
    };
    if (props.fluxRef) {
      fluxProps.ref = props.fluxRef;
    }
    return <Component {...props} {...fluxProps} />;
  }
  FluxComponent.contextTypes = {
    store: React.PropTypes.object,
  };
  return FluxComponent;
};

