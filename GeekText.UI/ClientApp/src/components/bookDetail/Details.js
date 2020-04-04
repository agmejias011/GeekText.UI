import React from 'react';
import { BookConsumer } from './Context';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CardActionArea from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


class Details extends React.Component {

    render() {
        return (
            <BookConsumer>
                {value => {
                    const {
                        id, title, author, publisher, price, rating, description, img_url,genre
                    } = value.bookDetail;

                    return (
                        <div className="container py-5">
                            <div className="row" >
                                    <div className="col-10 mx-auto col-md-4 my-3" >
         
                                        <Zoom>
                                        <img 
                                                className ="img-fluid" 
                                                alt="Responsive image"
                                                src={img_url}
                                                width="400"
                                                height = "600"  
                                            />
                                        </Zoom>
                                     </div>
                                
                                {/* prdoduct info */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h1>{title}</h1>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                              <div className="text-uppercase">
                                            <div className="img-container"
                                                onClick={() => value.populateBooksofAuthorData(id)}
                                            >
                                                <Link to="/BooksOfAuthor">
                                                    by : {author}
                                                </Link>
                                            </div>
                                            
                                        </div>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            <div>  Publisher: {publisher}</div>
                                        </strong>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            <div> price :$ {price}</div>
                                        </strong>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            <div> Genre: {genre} </div>
                                        </strong>
                                    </h4>
                                   
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        Book's Description :
                                    </p>
                                    <p className="text-muted lead">{description}</p>
                                    <Typography gutterBottom variant="h5" component="h5">
                                        Rating:
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h5">
                                        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                                    </Typography>
                                   
                                </div>
                                    
                            </div>
                        </div>
                    );
                }}
            </BookConsumer>
            
        );
    }
}
export default Details
 