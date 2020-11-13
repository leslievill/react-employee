import React, { Component } from "react";
import EmployeeRow from "./EmployeeRow";
import moment from "moment";
import API from "../utils/API";
import SearchBox from "./SearchBox";
import Title from "./Title";

class Search extends Component {
    state = {

        sorted: false
    };

  
    // componentDidMount() {
    //     API.getEmployee()
    //     .then(res =>  {
    //         // console.log(res.data)
    //         this.setState({ users: res.data.results, loading: false })
    //     })
    //     .catch(err => console.log(err));
    // }

    handleInputChange = event => {
        // console.log(event.target.value)
        // this.setState({ filterdUsers: event.target.value });
        let { users, search } = this.state;
        let searchEmployee = users.filter(sorted => {
            return (
                sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
                sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
                sorted.email.toLowerCase().includes(search.toLowerCase()) ||
                sorted.cell.toLowerCase().includes(search.toLowerCase()) ||
                sorted.dob.date.toLowerCase().includes(search.toLowerCase()) 
            )
        })
        // this.setState({filteredUsers: searchEmployee})
        // console.log(event.target.value)
        // this.setState({ search: event.target.value });
        // this.setState({ filterdUsers: searchEmployee });
        // console.log(this.state.filterdUsers)
             // console.log(event.target.value)
             this.setState({ sorted: true })
             this.setState({ search: event.target.value });
             this.setState({ filterdUsers: searchEmployee });
             // console.log(this.state.filterdUsers)
    };

    // startSort = event => {
    //     this.setState({ search: event.target.value }, () => {
    //       this.sortEmp();
    //       this.setState({ sorted: true });
    //     });
    //   };

    handleSort = () => {
        let { users, order } = this.state;
        console.log("trying to sort")
        users.sort(function(a, b) {
            // var textA = a.name.first.toLowerCase();
            // var textB = b.name.first.toLowerCase();
            const isReversed = (order === "asc") ? 1 : -1 
            return console.log(isReversed * a.name.first.localeCompare(b.name.first))
                // (textA < textB) ? -1 : (textA > textB) ? 1 : 0

        })
    }


    searchEmployee = () => {
        if (this.state.sorted) {
            return <div>
                {this.state.filterdUsers.map(users=> (
                    <EmployeeRow
                        key={users.dob.date}
                        img={users.picture.medium}
                        name={users.name.first + " " + users.name.last} 
                        phone={users.cell}
                        email={users.email}
                        dob={moment(users.dob.date).format("MM-DD-YYYY")}
                    />
                ))}
            </div>
        }

       
        else if(this.state.loading === false) {
            return <div>
                {this.state.users.map(users=> (
                    <EmployeeRow
                        key={users.dob.date}
                        img={users.picture.medium}
                        name={users.name.first + " " + users.name.last} 
                        phone={users.cell}
                        email={users.email}
                        dob={moment(users.dob.date).format("MM-DD-YYYY")}
                    /> 
            ))}
        </div>

                  
        }


    }

    componentDidMount() {
        API.getEmployee()
        .then(res =>  {
            // console.log(res.data)
            this.setState({ users: res.data.results, loading: false })
        })
        .catch(err => console.log(err));
    }

    render() {
        return ( 

                <div>
                    <SearchBox handleInput={this.handleInputChange}/>
                    <Title click={this.handleSort}/>
                    {this.searchEmployee()}
                </div>    
                


        )
    }
}
export default Search;