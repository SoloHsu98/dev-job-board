import Layout from "@/components/Layout";
import { getJob } from "@/lib/getData";
import { Button } from "@tremor/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Apply = ({ job }) => {
  const [coverletter, setCoverletter] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    await axios.post("/api/application", {
      coverletter,
      job: job?.id,
      userId: parseInt(session.user.id),
    });
    setLoading(false);
    router.push("/dashboard");
  };

  if (!session) {
    return null;
  }
  return (
    <Layout>
      <section className="px-8 max-w-lg mx-auto">
        <div>
          <Link href="/" className="font-bold underline">
            Back{" "}
          </Link>
          <h2 className="mt-3 text-2xl text-center">{job.title}</h2>
          <p className="mt-3 font-normal">{job.description}</p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <textarea
            className="w-full h-24 px-4 py-2 text-xl font-medium border rounded"
            rows={10}
            placeholder="Cover Letter"
            required
            value={coverletter}
            onChange={(e) => setCoverletter(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-6">
            <Button loading={loading} color="green" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Apply;

export async function getServerSideProps(context) {
  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}
