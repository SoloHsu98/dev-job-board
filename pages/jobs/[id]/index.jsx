import React from "react";
import prisma from "@/lib/prisma";
import { getJob, checkAlreadyApplied } from "@/lib/getData";
import Layout from "@/components/Layout";
import Link from "next/link";
import Job from "@/components/Job";
import { Button } from "@tremor/react";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/pages/api/auth/[...nextauth]";

export default function JobDetail({ job, hasApplied }) {
  return (
    <Layout>
      <section className="px-8">
        <Link href="/" className="font-bold underline">
          Back{" "}
        </Link>
        <Job job={job} />
        {hasApplied ? (
          <Link className="block mt-3 underline " href={`/dashboard`}>
            You already applied! Go to dashboard
          </Link>
        ) : (
          <Link className="mt-3" href={`/jobs/${job.id}/apply`}>
            <Button>Apply for This Job</Button>
          </Link>
        )}
      </section>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const jobId = context.params.id;
  const session = await getServerSession(context.req, context.res, authOption);

  let job = await getJob(jobId, prisma);
  job = JSON.parse(JSON.stringify(job));
  const hasApplied = await checkAlreadyApplied(session.user.id, jobId, prisma);
  return {
    props: {
      job,
      hasApplied,
    },
  };
}
