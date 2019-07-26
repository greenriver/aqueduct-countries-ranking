import * as actions from './actions';

export default {
  [actions.setMap]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setMapBounds]: (state, { payload }) => ({ ...state, bounds: payload }),
  [actions.setBasemap]: (state, { payload }) => ({ ...state, basemap: payload }),
  [actions.setMapStyle]: (state, { payload }) => ({ ...state, mapStyle: payload }),
  [actions.setMapLabels]: (state, { payload }) => ({ ...state, mapLabels: payload }),
  [actions.setMapRoads]: (state, { payload }) => ({ ...state, mapRoads: payload }),
  [actions.setMapViewport]: (state, { payload }) => ({ ...state, viewport: payload }),
  [actions.setMapLoaded]: (state, { payload }) => ({ ...state, settings: { isLoaded: payload } }),
  [actions.setMapFlying]: (state, { payload }) => ({ ...state, settings: { isFlying: payload } })
};
