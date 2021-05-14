import React from "react";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories = {};
    let page;
    try {
      page = Number(query.page) || 1;
      stories = await axios.get(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
    } catch (error) {
      console.log(error);
      stories.data = [];
    }
    return { stories: stories.data, page };
  }
  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout
        title="Hacker Next"
        description="A Hacker News clone made with Next.js"
      >
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }

          footer a {
            color: black;
            font-weight: bold;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
