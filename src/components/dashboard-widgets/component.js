import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'components/widget';
import Bar from 'components/bar';
import {
  palette,
  chartOrder,
  tableClasses
} from './constants';

const DashboardWidgets = ({title, buttonText, data: widget, onSelect}) => {
  const { data, stats} = widget;

  if (!data.length || data.length === 0) {
    return null;
  }

  const headerIndicators = Object.entries(data[0].indicators)
    .filter(data => chartOrder.includes(data[0]))
    .sort((a, b) => chartOrder.indexOf(a[0]) - chartOrder.indexOf(b[0]));

  const indicatorsLegend = headerIndicators.map((data, i) => (
    <div className="widgets--content-legend" key={data}>
      <Bar className="widgets--content-bullet" fill={palette[i]} />
      {data[1].name}
    </div>
  ));

  const minLength = 1;
  const maxLength = 76;
  const chartConfig = {
    fields: chartOrder,
    palette,
    length: value => minLength + ((value - stats.min) / stats.max) * (maxLength - minLength)
  };

  const sortedData = data.sort((a, b) => {
    const {Tot:aTot, Pop:aPop} = a.indicators;
    const {Tot:bTot, Pop:bPop} = b.indicators;
    
    if (aTot && bTot && aTot.score && bTot.score) {
      if (bTot.score === 'NO DATA' && aTot === 'NO DATA') {
        return 0
      } else if (bTot.score === 'NO DATA') {
        return -1
      } else if (aTot.score === 'NO DATA') {
        return 1
      }
      return parseFloat(bTot.score) - parseFloat(aTot.score);
    } else if (aPop && bPop && aPop.score && bPop.score) {
      return parseFloat(bPop.score) - parseFloat(aPop.score);
    }

    return 0;
  });

  return (
    <div className="c-widgets">
      <div className="widgets--header">
        <span className="-uppercase">{title}</span>
        <button type="button" onClick={onSelect}>{buttonText}</button>
      </div>
      <div className="widgets--content-wrapper">
        <div className="widgets--content-header">
          <div className={tableClasses.columns[0]}>Rank</div>
          <div className={tableClasses.columns[1]}>Name</div>
          <div className={tableClasses.columns[2]}>Sectoral Score{indicatorsLegend}</div>
          {Object.values(sortedData[0].indicators).length > 1 ? <div className={tableClasses.columns[3]}>Total Score</div> : null}
        </div>
        <div className="widgets--content-body">
        {sortedData.map((country, index) => {
          return (
              <Widget
                classes={tableClasses}
                key={country.iso}
                rowNumber={index + 1}
                country={country}
                chartConfig={chartConfig}
              />
          );
        })}
        </div>
      </div>
    </div>
  );
};

DashboardWidgets.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    stats: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  }).isRequired
};

DashboardWidgets.defaultProps = {
  title: 'Water Usage (Score)',
  buttonText: 'Download ranking'
};

export default DashboardWidgets;
