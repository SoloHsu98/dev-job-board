import { getJobsByCategory } from "@/lib/getData";
import React from "react";
import prisma from "@/lib/prisma";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Jobs } from "@/components/Jobs";
const Category = ({ jobs }) => {
  const router = useRouter();
  console.log("jobs", jobs);
  return (
    <Layout>
      <h2 className="text-3xl font-bold text-center">Jobs By Category</h2>
      {jobs?.length > 0 ? (
        <Jobs jobs={jobs} />
      ) : (
        <p className="text-center mt-4">No Jobs For This Category</p>
      )}
    </Layout>
  );
};

export default Category;

export async function getServerSideProps(context) {
  let jobs = await getJobsByCategory(context.params.id, prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
}
