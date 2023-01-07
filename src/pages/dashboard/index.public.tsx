import { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../service/api";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../../service/clientApi";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // api.get("/user/me").then((res) => setUserData(res.data));
  }, []);

  return (
    <>
      <div>
        <h1>Olá {user?.name}</h1>
      </div>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const apiClient = getAPIClient(ctx);
//   const { ["nextauth.token"]: token } = parseCookies(ctx);
//
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//
//   await apiClient.get("/user/me");
//
//   return {
//     props: {},
//   };
// };
