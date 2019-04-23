import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import WagerListItem from "./WagerListItem";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    alignContent: 'stretch'
  },
  inline: {
    display: 'inline',
  },
});

class WagerList extends React.Component {
  constructor(props) {
    super(props);
    const { drizzle } = this.props;
    this.state = {
      countDataKey: drizzle.contracts.FWC.methods.getId.cacheCall(),
      props: props,
    }
  }
  
  createWagersList = count => {
    const { drizzle, drizzleState } = this.props;
    let rows = [];
    
    for (let x = 1; x <= count; x++) {
      let row = (
        <WagerListItem
          key={x}
          drizzle={drizzle}
          drizzleState={drizzleState}
          wagerId={x}/>
      );
      rows.push(row);
    }
    return rows;
  };
  
  render() {
    const { drizzleState, classes } = this.props;
    
    const { FWC } = drizzleState.contracts;
    if (!FWC.initialized) {
      return <span>Initializing...</span>;
    }
    
    if (!(this.state.countDataKey in FWC.getId)) {
      return <span>Fetching...</span>;
    }
    
    let count = parseInt(
      FWC.getId[this.state.countDataKey].value
    );
    
    return (
      <List className={classes.root}>
        {this.createWagersList(count)}
      </List>
    );
  }
}

WagerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WagerList);
