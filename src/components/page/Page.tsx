import React, { useState, useEffect, ReactNode } from "react";
import classNames from "classnames";
import Loader from "../loader/Loader";
import axios from "axios";

interface PageProps {
  title?: string;
  noCard?: boolean;
  children: ReactNode;
}

export const Page = ({ title, noCard, children }: PageProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5173');
            setData(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    fetchData();
}, []);

  return (
    <div className="container pt-3">
      {title && <h5>{title}</h5>}
      <div className={classNames({ "card bg-white shadow p-3": !noCard })}>
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
};
