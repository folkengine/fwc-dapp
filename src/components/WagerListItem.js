import React from "react";
import PropTypes from 'prop-types';
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import CountingComponent from "./CountingComponent";
import OfferingContractForm from './OfferingContractForm';
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

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

class WagerListItem extends CountingComponent {
  constructor(props) {
    super(props);
    this.state = {
      actionId: this.props.actionId,
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
          
          return (
            <ListItem alignItems="flex-start">
              <div className="section">
                <span>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <ContractData
                          drizzle={drizzle}
                          drizzleState={drizzleState}
                          contract="V1C"
                          method="getWagerDescription"
                          methodArgs={[this.state.actionId]}
                        />
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                          Status:
                          <ContractData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            contract="V1C"
                            method="getWagerStatus"
                            methodArgs={[this.state.actionId]}
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
  actionId: PropTypes.number.isRequired,
};

export default withStyles(styles)(WagerListItem);
