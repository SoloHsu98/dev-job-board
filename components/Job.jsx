import { Card } from "@tremor/react";
import Link from "next/link";
import React from "react";

export default function Job({ job }) {
  return (
    <Card decoration="top" decorationColor="green">
      <Link
        href={`/jobs/${job.id}`}
        className="text-xl font-semibold underline"
      >
        {job.title}
      </Link>
      <h2 className="mt-3 text-gray-500 font-normal">
        {job?.description?.substring(0, 100)}...
      </h2>
      <p className="mt-2">
        Posted By{" "}
        <Link
          href={`/companies/${job.author.id}`}
          className="text-base font-medium underline"
        >
          {job.author.name}
        </Link>
      </p>
    </Card>
  );
}
