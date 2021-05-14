import React from "react";
import axios from "axios";
import Error from "next/error";

class Index extends React.Component {
  static async getInitialProps() {
    let stories = {};
    try {
      stories = await axios.get("https://node-hnapi.herokuapp.com/news?page=1");
    } catch (error) {
      stories.data = [];
    }
    return { stories: stories.data };
  }
  render() {
    const { stories } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <div>
        <h1>Hacker Next</h1>
        <div>
          {stories.map((story) => (
            <h2 key={story.id}>{story.title}</h2>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;
