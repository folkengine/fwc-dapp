import React from "react";
import PropTypes from 'prop-types';
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core";

const { ContractData } = newContextComponents;

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    // alignContent: 'center'
  },
  inline: {
    display: 'inline',
  },
  card: {
    maxWidth: 500,
  },
  media: {
    height: 140,
  },
  bid: {
    padding: 200,
  }
});

class WagerListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wagerId: this.props.wagerId,
      props: props,
    }
  }
  
  render() {
    const { classes } = this.state.props;
    
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return "Loading...";
          }
          
          const wagerId = this.state.wagerId;
          
          return (
            <ListItem alignItems="flex-start">
              <div className="section">
                <span>
                  
                  <ListItemText
                    primary={
                      <React.Fragment>
                        Wager #{wagerId}:&nbsp;
                        <b><ContractData
                          drizzle={drizzle}
                          drizzleState={drizzleState}
                          contract="FWC"
                          method="getWagerDescription"
                          methodArgs={[wagerId]}
                        /></b>&nbsp;
                        Status:
                        <ContractData
                          drizzle={drizzle}
                          drizzleState={drizzleState}
                          contract="FWC"
                          method="getWagerStatus"
                          methodArgs={[wagerId]}
                        />
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                          Bettor:
                          <ContractData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            contract="FWC"
                            method="getWagerBettor"
                            methodArgs={[wagerId]}
                          /><br />
                          Acceptor:
                          <ContractData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            contract="FWC"
                            method="getWagerAcceptor"
                            methodArgs={[wagerId]}
                          />
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </span>
              </div>
            </ListItem>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

WagerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  wagerId: PropTypes.number.isRequired,
};

export default withStyles(styles)(WagerListItem);
