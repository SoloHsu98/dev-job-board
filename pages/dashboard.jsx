import Layout from "@/components/Layout";
import {
  getCategories,
  getJobsPosted,
  getUser,
  getUserApplications,
} from "@/lib/getData";
import {
  Badge,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Title,
  Text,
  Card,
  Button,
} from "@tremor/react";
import { getServerSession } from "next-auth/next";
import React from "react";
import { authOption } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Dashboard({ user, jobs, applications, categories }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleClick(task, jobId) {
    await axios.patch("/api/jobs", {
      id: jobId,
      task: task,
    });

    //router.push(window.location.pathname);
    router.replace(router.asPath);
  }

  const handleDelete = async (id) => {
    const job = await axios.delete(`/api/jobs/${id}`);
    toast.success(job.message);
  };
  return (
    <Layout>
      <section className="mt-4 text-center">
        <Title className="text-4xl">Dashboard</Title>

        {user?.isCompany ? (
          <Badge className="mt-4" color="indigo">
            Company
          </Badge>
        ) : null}

        {user?.isCompany ? (
          <Card className="mt-4">
            <Title>List of Swiss Federal Councillours</Title>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Applications</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell>{item.title}</TableCell>

                    <TableCell>
                      <Text>{item.description}</Text>
                    </TableCell>
                    <TableCell>
                      {item.published ? (
                        <Badge
                          className="cursor-pointer"
                          onClick={() => handleClick("unpublish", item.id)}
                          color="green"
                        >
                          Published
                        </Badge>
                      ) : (
                        <Badge
                          className="cursor-pointer"
                          onClick={() => handleClick("publish", item.id)}
                          color="red"
                        >
                          Unpublished
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.applications.length > 0 ? (
                        <p>{item.applications.length}applications</p>
                      ) : (
                        <p>No application so far </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button color="red" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <>
            {applications.map((item, index) => (
              <div
                className="flex justify-center gap-6 mt-10 mb-4"
                key={item.id}
              >
                <Card className="w-full px-4 sm:w-1/2">
                  <Link
                    className="text-xl font-bold underline"
                    href={`/jobs/${item.job.id}`}
                  >
                    {item.job.title}
                  </Link>
                  <p className="mt-3 text-base font-normal">
                    {item.coverletter}
                  </p>
                </Card>
              </div>
            ))}
          </>
        )}
      </section>
      {/* {session ? (
        <h3 className="mt-4 text-2xl font-semibold">
          {user?.isCompany ? "Jobs You Posted" : "Your Job Applications"}
        </h3>
      ) : null} */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOption);
  let user = await getUser(session?.user?.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  let jobs = [];
  let applications = [];
  if (user.isCompany) {
    jobs = await getJobsPosted(user?.id, prisma);
    jobs = JSON.parse(JSON.stringify(jobs));
  } else {
    applications = await getUserApplications(user.id, prisma);
    applications = JSON.parse(JSON.stringify(applications));
  }
  return {
    props: {
      user,
      jobs,
      applications,
    },
  };
}
