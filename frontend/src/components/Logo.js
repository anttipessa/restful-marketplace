import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import tori from '../tori.png';

class Logo extends React.Component {

    render() {
        return (
            <Card >
                    <CardMedia
                        component="img"
                        image={tori}
                        title="Best marketplace in town"
                        height="150"
                    />
            </Card>
        )
    }

}

export default Logo;