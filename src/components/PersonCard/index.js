import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlertContainer from 'containers/AlertContainer';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import defaultAvatar from 'images/blank-avatar.png';

import './PersonCard.css';

class PersonCard extends Component {
  constructor(props) {
    super(props);

    this.moreClickHandler = this.moreClickHandler.bind(this);
    this.deleteClickHandler = this.deleteClickHandler.bind(this);
  }

  moreClickHandler() {
    if (this.props.personView) {
      this.props.personView(this.props.objectId);
    }
  }

  deleteClickHandler() {
    if (this.props.personDelete) {
      this.props.personDelete(this.props.objectId);
    }
  }

  render() {
    const {
      avatar, birthDateFormatted, deathDateFormatted, firstName, lastName, occupation
    } = this.props;

    const name = `${firstName} ${lastName}`;
    const image = avatar ? avatar.url : defaultAvatar;

    return (
      <Card className="person-card" onClick={this.moreClickHandler}>
        <AlertContainer />
        <CardMedia
          className="person-card-image"
          image={image}
          title={name}
        />
        <CardContent className="person-card-content">
          <Typography type="headline" component="h2" className="person-card-title">
            {name}
          </Typography>
          { occupation && <Typography component="h3">
            Occupation: {occupation}
          </Typography> }
          { birthDateFormatted && <Typography component="h3">
            Birth date: {birthDateFormatted}
          </Typography> }
          { deathDateFormatted && <Typography component="h3">
            Death date: {deathDateFormatted}
          </Typography> }
        </CardContent>
        <CardActions>
          <Button dense color="primary" onClick={this.moreClickHandler}>
            More
          </Button>
          <Button dense color="accent" onClick={this.deleteClickHandler}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PersonCard.propTypes = {
  avatar: PropTypes.shape({
    url: PropTypes.string
  }),
  birthDateFormatted: PropTypes.string,
  deathDateFormatted: PropTypes.string,
  firstName: PropTypes.string,
  objectId: PropTypes.string,
  lastName: PropTypes.string,
  occupation: PropTypes.string,

  personDelete: PropTypes.func.isRequired,
  personView: PropTypes.func.isRequired
};

PersonCard.defaultProps = {
  avatar: '',
  birthDateFormatted: null,
  deathDateFormatted: null,
  firstName: '',
  objectId: null,
  isLoadingPerson: false,
  lastName: '',
  occupation: '',
  params: null
};

export default PersonCard;
