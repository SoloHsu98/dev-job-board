import React from "react";
import prisma from "@/lib/prisma";
import { getUser, getCompanyJobs } from "@/lib/getData";
import Layout from "@/components/Layout";
import Link from "next/link";
import Job from "@/components/Job";

export default function CompanyDetail({ company, jobs }) {
  return (
    <Layout>
      <sectionm className="px-8">
        <Link href="/" className="font-bold underline">
          Back
        </Link>
        <h2 className="mt-1 text-4xl font-bold text-center">{company.name}</h2>
        <h3 className="mt-3 text-2xl font-semibold">
          Opening Jobs at {company.name}
        </h3>
        <div className="mt-3 space-y-4">
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </sectionm>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  let company = await getUser(params.id, prisma);
  let jobs = await getCompanyJobs(params.id, prisma);
  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      company,
      jobs,
    },
  };
}
