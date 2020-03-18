import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

class Unregister extends React.Component {
  handleClick = () => {
    console.log('handleCLick')
  }

  render() {
    return (
      <div>
        <Typography
          variant="h3"
          component="h4"
          align="center"
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          Unregister
        </Typography>
        <Card style={{ margin: 'auto', marginTop: 70, maxWidth: 400 }} variant="outlined">
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Unregistering was successful and your account has been deleted. Thank you
              for visiting our page and we hope to see you again later if you wish to
              do some more shopping online!
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleClick}>
              Back to main page
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default Unregister