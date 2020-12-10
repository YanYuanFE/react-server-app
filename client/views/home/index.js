import React from 'react';
import { Helmet } from 'react-helmet';
import { Async } from 'react-async';
import Counter from './Counter';

const fetchPerson = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    });
  });
  if (!response) throw new Error();
  return response;
};

const Home = ({ count }) => {
  return (
    <Async promiseFn={fetchPerson} initialValue={count}>
      <Async.Pending>Loading...</Async.Pending>
      <Async.Rejected>{(error) => <div>{error}</div>}</Async.Rejected>
      <Async.Fulfilled>{(data) => <div>{data}</div>}</Async.Fulfilled>
      <div>
        <Helmet>
          <title>
            主页
          </title>
          <meta name="description" content="This is home" />
        </Helmet>
        <Counter />
      </div>
    </Async>
  );
};

Home.getInitialProps = async (props) => {
  console.log(props);
  const count = await fetchPerson();
  return { count };
};

export default Home;
