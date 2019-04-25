import React from "react";
import './MyFarms.css';
import {queryMyFarms} from "../../queries/queries";
import {Query} from "react-apollo";
import FarmCard from "./FarmCard";
import Icon from "material-icons-react";

class MyFarms extends React.Component {
    render() {
        return(
            <Query query={queryMyFarms}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Good things take time....</p>;
                    if (error) console.log(error);
                    const farms = data.me.farms;

                    return (
                        <div>
                            <div className="page-name-box">
                                <span className="page-name">My Farms</span>
                            </div>
                            <div className="farms-box">
                                {farms.map((farm, key) => {
                                   return <FarmCard key={key} farmname={farm.name} address={farm.address} photos={farm.photos}/>
                                })}
                                <div className="farms-box-item new-farm">
                                    <Icon className="material-icons md-48 md-dark" color="#FFB347" icon="add_circle_outline"/>
                                    Add Farm
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Query>
            )

    }
}

export default MyFarms