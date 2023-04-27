import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button, TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const New = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.post("/api/jobs", { ...formData, userId: session.user.id });
    reset({ title: "", description: "", salary: "", location: "" });
    setLoading(false);
    router.push("/dashboard");
  };
  return (
    <Layout>
      <section className="max-w-lg mx-auto">
        <h2>Post New Job</h2>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("title", {
              required: true,
            })}
            className="mt-1"
            placeholder="Job Title"
          ></TextInput>

          <TextInput
            {...register("salary", {
              required: true,
            })}
            className="mt-4"
            placeholder="Salary"
          ></TextInput>
          <TextInput
            {...register("location", {
              required: true,
            })}
            className="mt-4"
            placeholder="Location"
          ></TextInput>
          <textarea
            {...register("description", {
              required: true,
            })}
            className="mt-4 w-full px-4 py-2 text-sm font-medium bg-transparent border rounded outline-none hover:outline-none focus:ring-blue-200 focus:ring"
            placeholder="description"
          ></textarea>
          <Button className="mt-4" color="indigo" loading={loading}>
            Save
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default New;
