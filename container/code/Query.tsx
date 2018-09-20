import * as React from "react";
import { PropertyControls, ControlType, frame } from "framer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

interface Props {
  uri: string;
  query: string;
  index: number;
}

export class Query extends React.Component<Props> {
  static defaultProps = {
    // Use an example endpoint
    endpoint: "https://nx9zvp49q7.lp.gql.zone/graphql"
  };

  static propertyControls: PropertyControls = {
    uri: { type: ControlType.String, title: "uri" },
    query: { type: ControlType.String, title: "query" },
    index: { type: ControlType.Number, title: "index" }
  };

  render() {
    const client = new ApolloClient({
      uri: `${this.props.endpoint}`
    });

    return (
      <ApolloProvider client={client}>
        {this.props.query ? (
          <Query query={gql(`${this.props.query}`)}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :( {error}</div>;
              return <div>{data.dogs[this.props.index].breed}</div>;
            }}
          </Query>
        ) : (
          "Please define a query"
        )}
      </ApolloProvider>
    );
  }
}
