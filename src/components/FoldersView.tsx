import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

type folderViewProps = {
    username: string
}
export default class FoldersView extends Component<folderViewProps> {
    constructor(props: folderViewProps) {
        super(props);
    }

    state = {
        loading: true,
        folders: []
    };

    async componentDidMount() {
        const url = "http://localhost:5001/api/todo/folder";
        const response = await fetch(url, {
            credentials: "include"
        });
        const data = await response.json();
        this.setState({ loading: false, folders: data })
        console.log(data);

    }

    render() {
        return (
            <div>
                <h1>{this.props.username}'s Folders</h1>
                <div>
                    {
                        this.state.loading ?
                            <div>loading...</div> :
                            <ul>
                                {
                                    this.state.folders.map((folder: any) => 
                                        <li>
                                            <p>
                                                {folder.name}
                                            </p>
                                            <Link to={"/folders/" + folder.name} >
                                                View items
                                            </Link>
                                            <button>
                                                remove
                                            </button>
                                            
                                        </li>
                                    )
                                }
                            </ul>
                    }
                </div>
            </div>
        )
    }
}