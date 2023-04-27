import { Jobs } from "./../components/Jobs";
import { getCategories, getJobs, getUser } from "@/lib/getData";
import prisma from "@/lib/prisma";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Badge, Button, Card, List, ListItem, Title } from "@tremor/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOption } from "./api/auth/[...nextauth]";

export default function Home({ jobs, user, categories }) {
  console.log("categories", categories);
  const { data: session, status } = useSession();
  const router = useRouter();
  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <Layout>
      <section>
        {!session ? (
          <Link href="/api/auth/signin">
            <Button color="green">Login</Button>
          </Link>
        ) : null}
        <h2 className="text-5xl font-bold text-center">
          Software Developer Job
        </h2>
        {session ? (
          <section className="my-10 text-center mx-auto">
            <h3>
              Welcome, {user?.name}{" "}
              {user?.isCompany ? <Badge>Company</Badge> : null}
            </h3>
            <div className="flex items-center justify-center gap-4 mt-4">
              {user?.isCompany ? (
                <>
                  <Link href="/new">
                    <Button>Post A New Job</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button>View Job You`ve Posted</Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button>View Job You`ve Applied</Button>
                </Link>
              )}
            </div>
          </section>
        ) : null}
      </section>
      <section className="flex gap-4 flex-col-reverse sm:flex-row">
        <Jobs jobs={jobs} />
        <aside className="sm:w-80 w-full">
          <Card>
            <Title>Browse By Category</Title>
            <List>
              {categories?.map((category) => (
                <ListItem key={category.id}>
                  <Link href={`/jobs/category/${category?.id}`}>
                    {category?.name}
                  </Link>
                  <span>{category?.jobs?.length}</span>
                </ListItem>
              ))}
            </List>
          </Card>
        </aside>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOption);
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  let categories = await getCategories(prisma);
  categories = JSON.parse(JSON.stringify(categories));

  if (!session) {
    return {
      props: {
        jobs,
        categories,
      },
    };
  }

  let user = await getUser(session?.user?.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
      categories,
    },
  };
}
