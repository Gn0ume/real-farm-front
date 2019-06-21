import React from "react";
import './MyFarms.css';
import {queryMyFarms} from "../../queries/queries";
import {Query} from "react-apollo";
import FarmCard from "./FarmCard";
import Icon from "material-icons-react";
import PageHeader from "./PageHeader";
import {Link} from "react-router-dom";

class MyFarms extends React.Component {
    render() {
        return(
            <Query fetchPolicy="cache-and-network" query={queryMyFarms}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Good things take time....</p>;
                    if (error) console.log(error);
                    const farms = data.me.farms;

                    return (
                        <div>
                            <PageHeader pagename="my farms"/>
                            <div className="farms-box">
                                {farms.map((farm, key) => {
                                   return <FarmCard
                                     key={key}
                                     farmname={farm.name}
                                     farmid={farm.id}
                                     address={farm.address}
                                     photos={farm.photos}/>
                                })}
                                <Link to={`/edit_farm/`}>
                                    <div className="farms-box-item new-farm">
                                        <Icon className="material-icons md-48 md-dark" color="#FFB347" icon="add_circle_outline"/>
                                        Add Farm
                                    </div>
                                </Link>

                            </div>
                        </div>
                    )
                }}
            </Query>
            )
    }
}

export default MyFarms